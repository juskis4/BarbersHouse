using barbershouse.api.Data;
using barbershouse.api.Models;
using Microsoft.EntityFrameworkCore;

namespace barbershouse.api.Repositories;

public class BarbersRepository(DbDataContext context) : IBarbersRepository
{
    private readonly DbDataContext _context = context;

    public async Task<IEnumerable<Barber>> GetAllBarbersWithServicesAsync()
    {
        return await _context.Barbers
                             .Include(b => b.Services)
                             .ToListAsync();
    }

    public async Task<Barber?> GetBarberByIdAsync(int barberId)
    {
        return await _context.Barbers
                             .Include(b => b.Services)
                             .FirstOrDefaultAsync(b => b.BarberID == barberId);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}