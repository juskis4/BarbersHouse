using barbershouse.api.Models;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.JsonPatch;

namespace barbershouse.api.Services;

public interface IBarbersService {

    Task<IEnumerable<BarberResultViewModel>> GetAllBarbersAsync();
    Task<Barber?> GetBarberByIdAsync(int barberId);
    Task<IEnumerable<BarberWithServicesViewModel>> GetAllBarbersWithServicesAsync();
    Task AddBarberWorkHoursAsync(int barberId, AddBarberWorkHoursViewModel workHours);
    Task<Barber> AddBarberAsync(AddBarberViewModel model);
    Task<IEnumerable<BarberWorkHours>> GetWorkHoursByBarberIdAsync(int barberId);  
    Task<BarberWorkHours> GetWorkHoursByBarberIdAndDayOfWeekAsync(int barberId, DayOfWeek dayOfWeek);
    Task UpdateBarberAsync(int barberId, JsonPatchDocument<Barber> patchDoc);
    Task DeleteBarberAsync(int barberId);
}