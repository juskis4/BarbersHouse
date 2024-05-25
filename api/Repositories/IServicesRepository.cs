using barbershouse.api.Models;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Repositories;

public interface IServicesRepository
{
    Task<IEnumerable<GetServiceViewModel>> GetAllServicesAsync();
    Task<Service?> GetServiceByIdAsync(int serviceId);
    Task<IEnumerable<int>> GetDurationsForServicesAsync(IEnumerable<int> serviceIds); 
    Task DeleteServiceAsync(Service service);
    Task UpdateServiceAsync(Service service);
    Task AddServiceAsync(Service service);

    Task SaveChangesAsync();
}
