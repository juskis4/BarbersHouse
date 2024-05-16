using AutoMapper;
using barbershouse.api.Models;
using barbershouse.api.Repositories;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Services;

public class BarbersService(IBarbersRepository barbersRepository, IMapper mapper) : IBarbersService
{
    private readonly IBarbersRepository _barbersRepository = barbersRepository;
    private readonly IMapper _mapper = mapper;

    public async Task<IEnumerable<BarberResultViewModel>> GetAllBarbersAsync()
    {
        var barbers = await _barbersRepository.GetAllBarbersAsync();
        return _mapper.Map<IEnumerable<BarberResultViewModel>>(barbers);
    }

    public async Task<IEnumerable<BarberViewModel>> GetAllBarbersWithServicesAsync()
    {
        var barbers = await _barbersRepository.GetAllBarbersWithServicesAsync();
        return _mapper.Map<IEnumerable<BarberViewModel>>(barbers);
    }

    public async Task AddBarberWorkHoursAsync(int barberId, AddBarberWorkHoursViewModel workHours)
    {
        var barberWorkHours = _mapper.Map<BarberWorkHours>(workHours);
        barberWorkHours.BarberId = barberId;

        await _barbersRepository.AddWorkHoursToBarberAsync(barberWorkHours);
    }

    public async Task<IEnumerable<BarberWorkHours>> GetWorkHoursByBarberIdAsync(int barberId)
    {
        var barberWorkHours = await _barbersRepository.GetWorkHoursByBarberIdAsync(barberId);

        return barberWorkHours;
    }

    public async Task<BarberWorkHours> GetWorkHoursByBarberIdAndDayOfWeekAsync(int barberId, DayOfWeek dayOfWeek)
    {
        var barberWorkHours = await _barbersRepository.GetWorkHoursByBarberIdAndDayOfWeekAsync(barberId, dayOfWeek);

        return barberWorkHours;
    }

    public async Task DeleteBarberAsync(int barberId)
    {
        var barber = await _barbersRepository.GetBarberByIdAsync(barberId);

        if (barber == null)
        {
            throw new ArgumentException("Barber not found.");
        }

        var workHours = await _barbersRepository.GetWorkHoursByBarberIdAsync(barberId);
        await _barbersRepository.DeleteWorkHoursAsync(workHours);

        await _barbersRepository.DeleteBarberAsync(barber);
    }
}