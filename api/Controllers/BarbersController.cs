using Microsoft.AspNetCore.Mvc;
using barbershouse.api.Services;
using barbershouse.api.Models;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Controllers;

[ApiController]
[Route("[controller]")]
public class BarbersController(IBarbersService barbersService) : ControllerBase
{
    private readonly IBarbersService _barbersService = barbersService;

    [HttpGet(Name = "Barbers")]
    public async Task<IEnumerable<Barber>> GetBarbersAsync()
    {
        return await _barbersService.GetBarbersAsync();
    }

    [HttpGet("Services", Name = "GetBarbersWithServices")]
    public async Task<IEnumerable<BarberViewModel>> GetBarbersWithServicesAsyncAAA()
    {
        return await _barbersService.GetAllBarbersWithServicesAsync();
    }

}
