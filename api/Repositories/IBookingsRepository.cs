using barbershouse.api.Models;

namespace barbershouse.api.Repositories;

public interface IBookingsRepository
{
    Task<IEnumerable<Booking?>> GetBookingsForBarberByDateAsync(int barberId, DateTime date);
    Task AddBookingAsync(Booking booking);
    Task<Booking?> GetBookingByIdAsync(int bookingId);
    
    Task SaveChangesAsync();
}