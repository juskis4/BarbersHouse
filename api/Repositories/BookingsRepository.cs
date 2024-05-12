using barbershouse.api.Data;
using barbershouse.api.Models;
using Microsoft.EntityFrameworkCore;

namespace barbershouse.api.Repositories;

public class BookingsRepository : IBookingsRepository
{
    private readonly DbDataContext _context;

    public BookingsRepository(DbDataContext context)
    {
        _context = context;
    }

    public async Task AddBookingAsync(Booking booking)
    {
        await _context.Bookings.AddAsync(booking);

        await SaveChangesAsync();
    }

    public async Task<IEnumerable<Booking?>> GetBookingsForBarberByDateAsync(int barberId, DateTime date)
    {
        return await _context.Bookings
                         .Where(b => b.BarberId == barberId && 
                                     b.BookingDateTime.Date == date.Date)
                         .Include(b => b.Customer)
                         .Include(b => b.Service)
                         .ToListAsync();
        // return await _context.Bookings
        //              .Where(b => b.BarberId == barberId && 
        //                      b.BookingDateTime.Date.Year == date.Date.Year && 
        //                      b.BookingDateTime.Date.Month == date.Date.Month && 
        //                      b.BookingDateTime.Date.Day == date.Date.Day) 
        //              .Include(b => b.Customer)
        //              .Include(b => b.Service)
        //              .ToListAsync();
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