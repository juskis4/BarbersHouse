using Microsoft.AspNetCore.Mvc;
using barbershouse.api.Services;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace barbershouse.api.Controllers;

[ApiController]
[Route("[controller]")]
public class BarbersController(IBarbersService barbersService) : ControllerBase
{
    private readonly IBarbersService _barbersService = barbersService;

    [HttpGet(Name = "Barbers")]
    public async Task<IEnumerable<BarberResultViewModel>> GetBarbersAsync()
    {
        return await _barbersService.GetAllBarbersAsync();
    }

    [HttpGet("Services", Name = "GetBarbersWithServices")]
    public async Task<IEnumerable<BarberViewModel>> GetBarbersWithServicesAsyncAAA()
    {
        return await _barbersService.GetAllBarbersWithServicesAsync();
    }

    [HttpPost("{barberId}/workhours")]
    public async Task<IActionResult> AddBarberWorkHoursAsync(int barberId, [FromBody] AddBarberWorkHoursViewModel workHours)
    {
        try
        {
            await _barbersService.AddBarberWorkHoursAsync(barberId, workHours);

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

    [HttpDelete("{barberId}")]
    [Authorize(Policy = "IsAdmin")] 
    public async Task<IActionResult> DeleteBarber(int barberId)
    {
        try
        {
            await _barbersService.DeleteBarberAsync(barberId);

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
