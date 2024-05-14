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

    public async Task AddBookingAsync(AddBookingViewModel bookingViewModel)
    {
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
}
