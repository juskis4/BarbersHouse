using Microsoft.AspNetCore.Mvc;
using barbershouse.api.Services;
using barbershouse.api.Models;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;

namespace barbershouse.api.Controllers;

[ApiController]
[Route("[controller]")]
public class ServicesController(IServicesService servicesService) : ControllerBase
{
    private readonly IServicesService _servicesService = servicesService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ServiceViewModel>>> GetAllServices()
    {
        var services = await _servicesService.GetAllServicesAsync();
        return Ok(services);
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "IsAdmin")]
    public async Task<ActionResult<ServiceViewModel>> GetService(int id)
    {
        var service = await _servicesService.GetServiceByIdAsync(id);

        if (service == null)
        {
            return NotFound();
        }

        return Ok(service); 
    }

    [HttpPost("{barberId}/services")]
    [Authorize(Policy = "IsAdmin")]
    public async Task<IActionResult> AddServiceForBarber(int barberId, [FromBody] AddServiceViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var service = await _servicesService.AddServiceForBarberAsync(barberId, model);
            return Ok();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error. {ex.Message}");
        }
    }

    [HttpPatch("{serviceId}")]
    [Authorize(Policy = "IsAdmin")]
    public async Task<IActionResult> UpdateService(int serviceId, [FromBody] JsonPatchDocument<Service> patchDoc)
    {
        try
        {
            await _servicesService.UpdateServiceAsync(serviceId, patchDoc);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{serviceId}")]
    [Authorize(Policy = "IsAdmin")]
    public async Task<IActionResult> DeleteService(int serviceId)
    {
        try
        {
            await _servicesService.DeleteServiceAsync(serviceId);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
