using barbershouse.api.Models;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.JsonPatch;

namespace barbershouse.api.Services;

public interface IBookingService
{
    Task<IEnumerable<Booking?>> GetBookingsForBarberByDateAsync(int barberId, DateTime date);
    Task<GetBookingDetailsViewModel?> GetBookingByIdAsync(int bookingId);
    Task<List<GetBookingsViewModel>> GetBookingsAsync(int? barberId = null, DateTimeOffset? startDate = null, DateTimeOffset? endDate = null);
    Task AddBookingAsync(AddBookingViewModel booking);
    Task CancelBooking(int barberId, int bookingId);
    Task DeleteBookingAsync(int bookingId);
    Task UpdateBookingAsync(int bookingId, JsonPatchDocument<Booking> patchDoc);
    Task<BookingStatisticsViewModel> GetBookingStatisticsAsync();
}