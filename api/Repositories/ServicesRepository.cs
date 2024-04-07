using barbershouse.api.Data;
using barbershouse.api.Models;
using Microsoft.EntityFrameworkCore;

namespace barbershouse.api.Repositories;

public class ServicesRepository(DbDataContext context) : IServicesRepository
{
    private readonly DbDataContext _context = context;

    public async Task<Service?> GetServicesByIdAsync(int serviceId)
    {
        return await _context.Services
            .FirstOrDefaultAsync(s => s.ServiceID == serviceId);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}