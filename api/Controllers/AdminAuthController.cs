using Microsoft.AspNetCore.Mvc;
using barbershouse.api.Services;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace barbershouse.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminAuthController(IAdminAuthService adminAuthService) : ControllerBase
{
    private readonly IAdminAuthService _adminAuthService = adminAuthService;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginViewModel model)
    {
        try
        {
            var result = await _adminAuthService.LoginAsync(model);

            if (!result.Success)
            {
                return Unauthorized(result);
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("register")]
    [Authorize(Policy = "IsAdmin")]
    public async Task<IActionResult> Register([FromBody] RegisterAdminViewModel model)
    {
        try
        {
            var result = await _adminAuthService.RegisterAsync(model);
            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
