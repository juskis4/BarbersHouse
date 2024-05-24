using barbershouse.api.Models;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Services;

public interface IServicesService {

    Task<IEnumerable<GetServiceViewModel>> GetAllServicesAsync();
    Task<ServiceViewModel> GetServiceByIdAsync(int id);
    Task AddServiceForBarberAsync(int barberId, Service service);
    Task<int> GetTotalDurationForServicesAsync(IEnumerable<int> serviceIds);

}