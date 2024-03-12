using barbershouse.api.Models;
using barbershouse.api.Repositories;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Services;

public class BarbersService(IBarbersRepository barbersRepository) : IBarbersService
{
    private readonly IBarbersRepository _barbersRepository = barbersRepository;

    public async Task<IEnumerable<Barber>> GetBarbersAsync()
    {
        return await _barbersRepository.GetAllBarbersWithServicesAsync();
    }

    public async Task<IEnumerable<BarberViewModel>> GetAllBarbersWithServicesAsync()
    {
        var barbers = await _barbersRepository.GetAllBarbersWithServicesAsync();
        return barbers.Select(b => MapToBarberViewModel(b)); 
    }

    private BarberViewModel MapToBarberViewModel(Barber barber)
{
    return new BarberViewModel
    {
        BarberId = barber.BarberID,
        Name = barber.Name,
        Bio = barber.Bio,
        PhotoUrl = barber.PhotoUrl,
        Services = barber.Services.Select(service => new ServiceViewModel
        {
            ServiceId = service.ServiceID,
            Title = service.Title,
            Description = service.Description,
            Duration = service.Duration,
            Price = service.Price
        })
    };
}
}