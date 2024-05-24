using barbershouse.api.Models;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Repositories;

public interface IServicesRepository
{
    Task<IEnumerable<GetServiceViewModel>> GetAllServicesAsync();
    Task<Service?> GetServicesByIdAsync(int serviceId);
    Task<IEnumerable<int>> GetDurationsForServicesAsync(IEnumerable<int> serviceIds); 
    Task DeleteServicesAsync(IEnumerable<Service> services);

    Task SaveChangesAsync();
}
