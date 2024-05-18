using barbershouse.api.Models;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Services;

public interface IBookingService
{
    Task<IEnumerable<Booking?>> GetBookingsForBarberByDateAsync(int barberId, DateTime date);
    Task<List<GetBookingsViewModel>> GetBookingsAsync(int? barberId = null, DateTimeOffset? startDate = null, DateTimeOffset? endDate = null);
    Task AddBookingAsync(AddBookingViewModel booking);
    Task ConfirmBooking(int barberId, int bookingId);
}