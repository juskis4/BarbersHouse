using barbershouse.api.Models;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Services;

public interface IBarbersService {

    Task<IEnumerable<Barber>> GetBarbersAsync();

    Task<IEnumerable<BarberViewModel>> GetAllBarbersWithServicesAsync();

}