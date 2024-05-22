using barbershouse.api.Data;
using barbershouse.api.Models;
using Microsoft.EntityFrameworkCore;

namespace barbershouse.api.Repositories;

public class BookingsRepository(DbDataContext context) : IBookingsRepository
{
    private readonly DbDataContext _context = context;

    public async Task AddBookingAsync(Booking booking)
    {
        await _context.Bookings.AddAsync(booking);

        await SaveChangesAsync();
    }

    public async Task<IEnumerable<Booking?>> GetBookingsForBarberByDateAsync(int barberId, DateTime date)
    {
        return await _context.Bookings
                         .Where(b => b.Status != "Canceled")
                         .Where(b => b.BarberId == barberId &&
                                     b.BookingDateTime.Date == date.Date)
                         .Include(b => b.Customer)
                         .Include(b => b.Service)
                         .ToListAsync();
    }

    public async Task<Booking?> GetBookingByIdWithDetailsAsync(int bookingId)
    {
        return await _context.Bookings
                            .Include(b => b.Customer)
                            .Include(b => b.Service)
                            .Include(b => b.Barber)
                            .Include(b => b.Customer)
                            .FirstOrDefaultAsync(b => b.BookingID == bookingId);
    }

    public async Task<IEnumerable<Booking?>> GetBookingsAsync(int? barberId = null, DateTimeOffset? startDate = null, DateTimeOffset? endDate = null)
    {
        var query = _context.Bookings
            .Where(b => b.Status != "Canceled")
            .Include(b => b.Customer)
            .Include(b => b.Service)
            .Include(b => b.Barber)
            .AsQueryable();

        if (barberId.HasValue)
        {
            query = query.Where(b => b.BarberId == barberId.Value);
        }

        if (startDate.HasValue)
        {
            query = query.Where(b => b.BookingDateTime >= startDate.Value);
        }

        if (endDate.HasValue)
        {
            query = query.Where(b => b.BookingDateTime <= endDate.Value);
        }

        return await query.ToListAsync();
    }

    public async Task<Booking?> GetBookingByIdAsync(int bookingId)
    {
        return await _context.Bookings.FindAsync(bookingId);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}