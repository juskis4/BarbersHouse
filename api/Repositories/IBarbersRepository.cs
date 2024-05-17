using barbershouse.api.Models;

namespace barbershouse.api.Repositories;

public interface IBarbersRepository
{
    Task<IEnumerable<Barber>> GetAllBarbersAsync();
    Task<IEnumerable<Barber>> GetAllBarbersWithServicesAsync();
    Task<Barber?> GetBarberByIdAsync(int barberId);
    Task<IEnumerable<BarberWorkHours>> GetWorkHoursByBarberIdAsync(int barberId);
    Task<BarberWorkHours> GetWorkHoursByBarberIdAndDayOfWeekAsync(int barberId, DayOfWeek dayOfWeek);
    Task AddWorkHoursToBarberAsync(BarberWorkHours workHours);
    Task DeleteWorkHoursAsync(IEnumerable<BarberWorkHours> workHours);
    Task DeleteBarberAsync(Barber barber);
    Task UpdateBarberAsync(Barber barber);

    Task SaveChangesAsync();
}