using barbershouse.api.Models;

namespace barbershouse.api.Services;

public interface IBookingService 
{
    Task<IEnumerable<Booking>> GetBookingsForBarberByDateAsync(int barberId, DateTime date);
}