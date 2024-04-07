using Microsoft.AspNetCore.Mvc;
using barbershouse.api.Services;
using barbershouse.api.Models;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Controllers;

[ApiController]
[Route("[controller]")]
public class ServicesController(IServicesService servicesService) : ControllerBase
{
    private readonly IServicesService _servicesService = servicesService;

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceViewModel>> GetService(int id)
    {
        var service = await _servicesService.GetServiceByIdAsync(id);

        if (service == null)
        {
            return NotFound();
        }

        return service;
    }

    [HttpPost("{barberId}/services")]
    public async Task<IActionResult> AddServiceForBarber(int barberId, [FromBody] AddServiceViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var service = new Service
        {
            Title = model.Title,
            Description = model.Description,
            Duration = model.Duration,
            Price = model.Price,
            BarberId = barberId
        };

        try
        {
            await _servicesService.AddServiceForBarberAsync(barberId, service);
            return Ok();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }


}
