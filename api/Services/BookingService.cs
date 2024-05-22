using AutoMapper;
using barbershouse.api.Models;
using barbershouse.api.Repositories;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Services;

public class BookingService(IBookingsRepository bookingsRepository, IMapper mapper) : IBookingService
{
    private readonly IBookingsRepository _bookingsRepository = bookingsRepository;
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
        if(bookingViewModel.ServiceId == null)
        {
            
        }
        
        var booking = _mapper.Map<Booking>(bookingViewModel);
        booking.Status = "Pending";

        await _bookingsRepository.AddBookingAsync(booking);
    }

    public async Task ConfirmBooking(int barberId, int bookingId)
    {
        var booking = await _bookingsRepository.GetBookingByIdAsync(bookingId);

        if (booking == null || booking.BarberId != barberId)
        {
            throw new ArgumentException("Booking not found for the specified barber.");
        }

        booking.Status = "Confirmed";
        await _bookingsRepository.SaveChangesAsync();
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
}
