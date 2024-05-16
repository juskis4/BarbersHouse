using barbershouse.api.Models;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Services;

public interface IBarbersService {

    Task<IEnumerable<Barber>> GetBarbersAsync();

    Task<IEnumerable<BarberViewModel>> GetAllBarbersWithServicesAsync();

    Task AddBarberWorkHoursAsync(int barberId, AddBarberWorkHoursViewModel workHours);

    Task<IEnumerable<BarberWorkHours>> GetWorkHoursByBarberIdAsync(int barberId);  

    Task<BarberWorkHours> GetWorkHoursByBarberIdAndDayOfWeekAsync(int barberId, DayOfWeek dayOfWeek);

    Task DeleteBarberAsync(int barberId);
}