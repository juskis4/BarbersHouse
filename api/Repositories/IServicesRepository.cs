using barbershouse.api.Models;

namespace barbershouse.api.Repositories;

public interface IServicesRepository
{
    Task<Service?> GetServicesByIdAsync(int serviceId);

    Task<IEnumerable<int>> GetDurationsForServicesAsync(IEnumerable<int> serviceIds); 

    Task SaveChangesAsync();
}
