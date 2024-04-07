using barbershouse.api.Models;

namespace barbershouse.api.Repositories;

public interface IServicesRepository
{
    Task<Service?> GetServicesByIdAsync(int serviceId);

    Task SaveChangesAsync();
}
