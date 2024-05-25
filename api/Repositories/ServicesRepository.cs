using AutoMapper;
using barbershouse.api.Data;
using barbershouse.api.Models;
using barbershouse.api.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace barbershouse.api.Repositories;

public class ServicesRepository(DbDataContext context, IMapper mapper) : IServicesRepository
{
    private readonly DbDataContext _context = context;
    private readonly IMapper _mapper = mapper;

    public async Task<IEnumerable<GetServiceViewModel>> GetAllServicesAsync()
    {
        var services = await _context.Services
            .Where(b => b.Title != "Blocked")
            .Include(s => s.Barber) 
            .ToListAsync(); 

        return _mapper.Map<IEnumerable<GetServiceViewModel>>(services);
    }

    public async Task<IEnumerable<int>> GetDurationsForServicesAsync(IEnumerable<int> serviceIds)
    {
        return await _context.Services
                 .Where(s => serviceIds.Contains(s.ServiceID))
                 .Where(b => b.Title != "Blocked")
                 .Select(s => s.Duration)
                 .ToListAsync();
    }

    public async Task<Service?> GetServiceByIdAsync(int serviceId)
    {
        return await _context.Services
            .FirstOrDefaultAsync(s => s.ServiceID == serviceId);
    }

    public async Task DeleteServiceAsync(Service service)
    {
        _context.Services.Remove(service); 
        await _context.SaveChangesAsync();
    }

    public async Task UpdateServiceAsync(Service service)
    {
        _context.Entry(service).State = EntityState.Modified; 
        await _context.SaveChangesAsync(); 
    }

    public async Task AddServiceAsync(Service service)
    {
        _context.Services.Add(service);
        await _context.SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}