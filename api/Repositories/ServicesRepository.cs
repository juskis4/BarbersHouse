using barbershouse.api.Data;
using barbershouse.api.Models;
using Microsoft.EntityFrameworkCore;

namespace barbershouse.api.Repositories;

public class ServicesRepository(DbDataContext context) : IServicesRepository
{
    private readonly DbDataContext _context = context;

    public async Task<IEnumerable<int>> GetDurationsForServicesAsync(IEnumerable<int> serviceIds)
    {
        return await _context.Services
                 .Where(s => serviceIds.Contains(s.ServiceID))
                 .Select(s => s.Duration)
                 .ToListAsync();
    }

    public async Task<Service?> GetServicesByIdAsync(int serviceId)
    {
        return await _context.Services
            .FirstOrDefaultAsync(s => s.ServiceID == serviceId);
    }

    public async Task DeleteServicesAsync(IEnumerable<Service> services)
    {
        _context.Services.RemoveRange(services);
        await SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}