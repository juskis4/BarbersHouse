using Microsoft.AspNetCore.Mvc;
using barbershouse.api.Services;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using barbershouse.api.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace barbershouse.api.Controllers;

[ApiController]
[Route("[controller]")]
public class BarbersController(IBarbersService barbersService) : ControllerBase
{
    private readonly IBarbersService _barbersService = barbersService;

    [HttpGet("{barberId}", Name = "GetBarberById")] 
    public async Task<ActionResult<Barber>> GetBarberById(int barberId) 
    {
        var barber = await _barbersService.GetBarberByIdAsync(barberId);
        return barber;
    }

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

    [HttpPost]
    [Authorize(Policy = "IsAdmin")]
    public async Task<IActionResult> AddBarber([FromBody] AddBarberViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var newBarber = await _barbersService.AddBarberAsync(model);
            return CreatedAtAction(nameof(GetBarberById), new { barberId = newBarber.BarberID }, newBarber);
        }
        catch (Exception ex) 
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
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

    [HttpPatch("{barberId}")]
    [Authorize(Policy = "IsAdmin")]
    public async Task<IActionResult> UpdateBarber(int barberId, [FromBody] JsonPatchDocument<Barber> patchDoc)
    {
        try
        {
            await _barbersService.UpdateBarberAsync(barberId, patchDoc);
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
