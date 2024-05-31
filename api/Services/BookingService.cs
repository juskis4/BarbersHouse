using System.Linq.Expressions;
using AutoMapper;
using barbershouse.api.Hubs;
using barbershouse.api.Models;
using barbershouse.api.Repositories;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Microsoft.AspNetCore.SignalR;

namespace barbershouse.api.Services;

public class BookingService(IBookingsRepository bookingsRepository, ICustomersService customersService, IServicesService servicesService, IHubContext<BookingHub> hubContext, IMapper mapper) : IBookingService
{
    private readonly IBookingsRepository _bookingsRepository = bookingsRepository;
    private readonly ICustomersService _customersService = customersService; 
    private readonly IServicesService _serviceService = servicesService;
    private readonly IHubContext<BookingHub> _hubContext = hubContext; 
    private readonly IMapper _mapper = mapper;

    public async Task<IEnumerable<Booking?>> GetBookingsForBarberByDateAsync(int barberId, DateTime date)
    {
        var bookings = await _bookingsRepository.GetBookingsForBarberByDateAsync(barberId, date);
        return bookings;
    }

    public async Task<GetBookingDetailsViewModel?> GetBookingByIdAsync(int bookingId)
    {
        var booking = await _bookingsRepository.GetBookingByIdWithDetailsAsync(bookingId);
        var bookingDetails = _mapper.Map<GetBookingDetailsViewModel>(booking);
        bookingDetails.Barber.Services = null; 
        return bookingDetails;
    }

    public async Task<List<GetBookingsViewModel>> GetBookingsAsync(int? barberId = null, DateTimeOffset? startDate = null, DateTimeOffset? endDate = null)
    {
        var bookings = await _bookingsRepository.GetBookingsAsync(barberId, startDate, endDate);
        return _mapper.Map<List<GetBookingsViewModel>>(bookings);
    }
    
    public async Task AddBookingAsync(AddBookingViewModel bookingViewModel)
    {
        // Manual "Blocking" time booking
        if((bookingViewModel.ServiceId == 0 || bookingViewModel.ServiceId == null) && bookingViewModel.Duration != null)
        {
            var blockServiceViewModel = new AddServiceViewModel 
            {
                Title = "Blocked",
                Duration = (int)bookingViewModel.Duration,
            };

            var blockService = await _serviceService.AddServiceForBarberAsync(bookingViewModel.BarberId, blockServiceViewModel); 
            bookingViewModel.ServiceId = blockService.ServiceId;
            var blockedBooking = _mapper.Map<Booking>(bookingViewModel);

            blockedBooking.Status = "Blocked";
            blockedBooking.CustomerId = 12; // Ghost customer in DB

            await _bookingsRepository.AddBookingAsync(blockedBooking);
            await _hubContext.Clients.All.SendAsync("BookingChanged");
        }
        else {
            var customer = await _customersService.GetOrCreateCustomerAsync(bookingViewModel.CustomerName, bookingViewModel.CustomerEmail);
            var booking = _mapper.Map<Booking>(bookingViewModel);
            booking.Status = "Confirmed";
            booking.CustomerId = customer.CustomerID; 
            
            await _bookingsRepository.AddBookingAsync(booking);
            await _hubContext.Clients.All.SendAsync("BookingChanged");
        }
    }

    public async Task CancelBooking(int barberId, int bookingId)
    {
        var booking = await _bookingsRepository.GetBookingByIdAsync(bookingId);

        if (booking == null || booking.BarberId != barberId)
        {
            throw new ArgumentException("Booking not found for the specified barber.");
        }

        booking.Status = "Canceled";
        await _bookingsRepository.SaveChangesAsync();
    }

    public async Task UpdateBookingAsync(int bookingId, JsonPatchDocument<Booking> patchDoc)
    {
        var booking = await _bookingsRepository.GetBookingByIdAsync(bookingId);

        if (booking == null)
        {
            throw new ArgumentException("Booking not found.");
        }

        var allowedProperties = new Dictionary<string, Expression<Func<Booking, object>>>()
        {
            { "/bookingDateTime", b => b.BookingDateTime },
            { "/status", b => b.Status }
        };

        // Filter and validate the patch operations
        var filteredPatchDoc = new JsonPatchDocument<Booking>();
        foreach (var op in patchDoc.Operations)
        {
            if (allowedProperties.TryGetValue(op.path, out var propertyExpression) && op.OperationType == OperationType.Replace)
            {
                filteredPatchDoc.Add(propertyExpression, op.value);
            }
            else
            {
                throw new ArgumentException($"Invalid patch operation: {op.OperationType} on {op.path} is not allowed.");
            }
        }

        filteredPatchDoc.ApplyTo(booking);

        await _bookingsRepository.UpdateBookingAsync(booking);
    }

    public async Task<BookingStatisticsViewModel> GetBookingStatisticsAsync()
    {
        var now = DateTime.UtcNow;
        var lastMonthStart = new DateTime(now.Year, now.Month - 1, 1, 0, 0, 0, DateTimeKind.Utc);
        var lastMonthEnd = lastMonthStart.AddMonths(1).AddDays(-1);
        var thisMonthStart = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);

        var lastMonthBookings = await _bookingsRepository.GetBookingsAsync(startDate: lastMonthStart, endDate: lastMonthEnd);
        var thisMonthBookings = await _bookingsRepository.GetBookingsAsync(startDate: thisMonthStart, endDate: now);

        var totalBookingsCurrentMonth = thisMonthBookings.Count(); 
        var thisMonthRevenue = thisMonthBookings.Sum(b => b.Service.Price);
        var bookingPercentageChange = lastMonthBookings.Count() == 0
                                        ? 0
                                        : (thisMonthBookings.Count() - lastMonthBookings.Count()) / (decimal)lastMonthBookings.Count() * 100;

        return new BookingStatisticsViewModel
        {
            TotalBookingsCurrentMonth = totalBookingsCurrentMonth, 
            BookingPercentageChange = bookingPercentageChange,
            CurrentMonthRevenue = thisMonthRevenue
        };
    }

    public async Task DeleteBookingAsync(int bookingId)
    {
        var booking = await _bookingsRepository.GetBookingByIdAsync(bookingId);
        if (booking == null)
        {
            throw new ArgumentException("Booking not found");
        }

        await _bookingsRepository.DeleteBookingAsync(booking);
    }
}
