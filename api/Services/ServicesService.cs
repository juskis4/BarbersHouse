using AutoMapper;
using barbershouse.api.Models;
using barbershouse.api.Repositories;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Services;

public class ServicesService(IServicesRepository servicesRepository, IBarbersRepository barbersRepository, IMapper mapper) : IServicesService
{
    private readonly IServicesRepository _servicesRepository = servicesRepository;
    private readonly IBarbersRepository _barbersRepository = barbersRepository;
    private readonly IMapper _mapper = mapper;

    public async Task<ServiceViewModel> GetServiceByIdAsync(int serviceId)
    {
        var service = await _servicesRepository.GetServicesByIdAsync(serviceId);
        if (service == null)
        {
            throw new KeyNotFoundException($"A service with the ID {serviceId} was not found.");
        }

        return _mapper.Map<ServiceViewModel>(service); ;
    }

    public async Task AddServiceForBarberAsync(int barberId, Service service)
    {
        var barber = await _barbersRepository.GetBarberByIdAsync(barberId);
        if (barber == null)
        {
            throw new KeyNotFoundException("Barber not found.");
        }

        barber.Services.Add(service);
        await _barbersRepository.SaveChangesAsync();
    }

    public async Task<int> GetServicesDuration(IEnumerable<int> serviceIds)
    {
        var durations = await _servicesRepository.GetDurationsForServicesAsync(serviceIds); 
        return durations.Sum();
    }
}