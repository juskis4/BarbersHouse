using AutoMapper;
using barbershouse.api.Models;
using barbershouse.api.Repositories;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Services;

public class BarbersService(IBarbersRepository barbersRepository, IMapper mapper) : IBarbersService
{
    private readonly IBarbersRepository _barbersRepository = barbersRepository;
    private readonly IMapper _mapper = mapper;

    public async Task<IEnumerable<Barber>> GetBarbersAsync()
    {
        return await _barbersRepository.GetAllBarbersWithServicesAsync();
    }

    public async Task<IEnumerable<BarberViewModel>> GetAllBarbersWithServicesAsync()
    {
        var barbers = await _barbersRepository.GetAllBarbersWithServicesAsync();
        return _mapper.Map<IEnumerable<BarberViewModel>>(barbers);
    }
}