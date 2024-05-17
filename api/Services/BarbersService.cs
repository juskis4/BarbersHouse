
using System.Linq.Expressions;
using AutoMapper;
using barbershouse.api.Models;
using barbershouse.api.Repositories;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;

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

    public async Task<Barber?> GetBarberByIdAsync(int barberId)
    {
        return await _barbersRepository.GetBarberByIdAsync(barberId);
    }

    public async Task<IEnumerable<BarberViewModel>> GetAllBarbersWithServicesAsync()
    {
        var barbers = await _barbersRepository.GetAllBarbersWithServicesAsync();
        return _mapper.Map<IEnumerable<BarberViewModel>>(barbers);
    }

    public async Task<Barber> AddBarberAsync(AddBarberViewModel model)
    {
        var barber = _mapper.Map<Barber>(model); 

        await _barbersRepository.AddBarberAsync(barber);
        return barber;
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

    public async Task UpdateBarberAsync(int barberId, JsonPatchDocument<Barber> patchDoc)
    {
        var barber = await _barbersRepository.GetBarberByIdAsync(barberId);

        if (barber == null)
        {
            throw new ArgumentException("Barber not found.");
        }

        var allowedProperties = new Dictionary<string, Expression<Func<Barber, object>>>()
        {
            { "/Name", b => b.Name },
            { "/Email", b => b.Email },
            { "/Bio", b => b.Bio }
        };

        // Filter and validate the patch operations
        var filteredPatchDoc = new JsonPatchDocument<Barber>();
        foreach (var op in patchDoc.Operations)
        {
            if (allowedProperties.TryGetValue(op.path, out var propertyExpression) && op.OperationType == OperationType.Replace)
            {
                filteredPatchDoc.Add(propertyExpression, op.value);
            }
            else
            {
                throw new ArgumentException($"Invalid patch operation: {op.OperationType} on {op.path} is not allowed.");
            }
        }

        filteredPatchDoc.ApplyTo(barber);

        await _barbersRepository.UpdateBarberAsync(barber);
    }
}