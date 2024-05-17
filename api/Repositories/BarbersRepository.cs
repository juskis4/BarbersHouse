using barbershouse.api.Data;
using barbershouse.api.Models;
using Microsoft.EntityFrameworkCore;

namespace barbershouse.api.Repositories;

public class BarbersRepository(DbDataContext context) : IBarbersRepository
{
    private readonly DbDataContext _context = context;

    public async Task AddWorkHoursToBarberAsync(BarberWorkHours workHours)
    {
        var barber = await _context.Barbers
                                    .Include(b => b.BarberWorkHours)
                                    .FirstOrDefaultAsync(b => b.BarberID == workHours.BarberId);

        if (barber == null)
        {
            throw new ArgumentException("Barber not found");
        }

        if (barber.BarberWorkHours.Any(wh => wh.DayOfWeek == workHours.DayOfWeek))
        {
            throw new ArgumentException($"Work hours for barber id: {workHours.BarberId} on {workHours.DayOfWeek} day, already exist.");
        }

        barber.BarberWorkHours.Add(workHours);

        await SaveChangesAsync();
    }

    public async Task<IEnumerable<Barber>> GetAllBarbersAsync()
    {
        return await _context.Barbers
                             .ToListAsync();
    }

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

    public async Task<BarberWorkHours> GetWorkHoursByBarberIdAndDayOfWeekAsync(int barberId, DayOfWeek dayOfWeek)
    {
        var allWorkHours = await GetWorkHoursByBarberIdAsync(barberId);

        var workHoursForSelectedDay = allWorkHours.FirstOrDefault(wh => wh.DayOfWeek == dayOfWeek);

        return workHoursForSelectedDay;
    }

    public async Task<IEnumerable<BarberWorkHours>> GetWorkHoursByBarberIdAsync(int barberId)
    {
        return await _context.BarberWorkHours
                             .Where(wh => wh.BarberId == barberId)
                             .ToListAsync();
    }

    public async Task DeleteWorkHoursAsync(IEnumerable<BarberWorkHours> workHours)
    {
        _context.BarberWorkHours.RemoveRange(workHours);
        await SaveChangesAsync();
    }

    public async Task DeleteBarberAsync(Barber barber)
    {
        _context.Barbers.Remove(barber);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateBarberAsync(Barber barber)
    {
        _context.Entry(barber).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync(); 
        }
        catch (DbUpdateConcurrencyException ex)
        {
            // handling concurrency conflicts 
            var entry = ex.Entries.Single();
            var databaseValues = entry.GetDatabaseValues();

            if (databaseValues == null)
            {
                // The entity has been deleted since it was fetched
                throw new ArgumentException("Barber not found.");
            }

            throw new DbUpdateConcurrencyException("The barber was updated by another user. Please try again.");
        }
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}