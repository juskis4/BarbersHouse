using System.Linq.Expressions;
using AutoMapper;
using barbershouse.api.Models;
using barbershouse.api.Repositories;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;

namespace barbershouse.api.Services;

public class ServicesService(IServicesRepository servicesRepository, IBarbersRepository barbersRepository, IBookingsRepository bookingsRepository, IMapper mapper) : IServicesService
{
    private readonly IServicesRepository _servicesRepository = servicesRepository;
    private readonly IBarbersRepository _barbersRepository = barbersRepository;
    private readonly IBookingsRepository _bookingsRepository = bookingsRepository;
    private readonly IMapper _mapper = mapper;

    public async Task<IEnumerable<GetServiceViewModel>> GetAllServicesAsync()
    {
        return await _servicesRepository.GetAllServicesAsync(); 
    }

    public async Task<ServiceViewModel> GetServiceByIdAsync(int serviceId)
    {
        var service = await _servicesRepository.GetServiceByIdAsync(serviceId);
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

    public async Task<int> GetTotalDurationForServicesAsync(IEnumerable<int> serviceIds)
    {
        var durations = await _servicesRepository.GetDurationsForServicesAsync(serviceIds); 
        return durations.Sum();
    }

    public async Task UpdateServiceAsync(int serviceId, JsonPatchDocument<Service> patchDoc)
    {
        var service = await _servicesRepository.GetServiceByIdAsync(serviceId);
        
        if (service == null)
        {
            throw new ArgumentException("Service not found.");
        }

        var allowedProperties = new Dictionary<string, Expression<Func<Service, object>>>()
        {
            { "/title", s => s.Title },
            { "/description", s => s.Description },
            { "/duration", s => s.Duration },
            { "/price", s => s.Price },
        };

        // Filter and validate the patch operations (Similar to the barber example)
        var filteredPatchDoc = new JsonPatchDocument<Service>();
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

        filteredPatchDoc.ApplyTo(service); 
        
        await _servicesRepository.UpdateServiceAsync(service); 
    }

    public async Task DeleteServiceAsync(int serviceId)
    {
        if (await _bookingsRepository.AnyBookingsWithServiceAsync(serviceId))
        {
            throw new InvalidOperationException("Cannot delete service because it has existing bookings.");
        }

        var service = await _servicesRepository.GetServiceByIdAsync(serviceId);

        if (service == null)
        {
            throw new ArgumentException("Service not found.");
        }

        await _servicesRepository.DeleteServiceAsync(service);
    }
}