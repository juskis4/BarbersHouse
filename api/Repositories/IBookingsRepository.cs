using barbershouse.api.Models;

namespace barbershouse.api.Repositories;

public interface IBookingsRepository
{
    Task<IEnumerable<Booking?>> GetBookingsForBarberByDateAsync(int barberId, DateTime date);
    Task<Booking?> GetBookingByIdWithDetailsAsync(int bookingId);
    Task AddBookingAsync(Booking booking);
    Task<Booking?> GetBookingByIdAsync(int bookingId);
    Task<IEnumerable<Booking?>> GetBookingsAsync(int? barberId = null, DateTimeOffset? startDate = null, DateTimeOffset? endDate = null);
    Task UpdateBookingAsync(Booking booking);
    
    Task SaveChangesAsync();
}