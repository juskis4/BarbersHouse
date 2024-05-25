using barbershouse.api.Models;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.JsonPatch;

namespace barbershouse.api.Services;

public interface IServicesService {

    Task<IEnumerable<GetServiceViewModel>> GetAllServicesAsync();
    Task<ServiceViewModel> GetServiceByIdAsync(int id);
    Task<ServiceViewModel> AddServiceForBarberAsync(int barberId, AddServiceViewModel model);
    Task<int> GetTotalDurationForServicesAsync(IEnumerable<int> serviceIds);
    Task UpdateServiceAsync(int serviceId, JsonPatchDocument<Service> patchDoc);
    Task DeleteServiceAsync(int serviceId);

}