using barbershouse.api.Repositories;
using barbershouse.api.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace barbershouse.api.Services;

public class AdminAuthService(IConfiguration configuration, IAdminRepository adminRepository, IPasswordHasher<Admin> passwordHasher) : IAdminAuthService
{
    private readonly IConfiguration _configuration = configuration;
    private readonly IAdminRepository _adminRepository = adminRepository;
    private readonly IPasswordHasher<Admin> _passwordHasher = passwordHasher;

    public async Task<LoginResultViewModel> LoginAsync(LoginViewModel model)
    {
        var admin = await _adminRepository.GetAdminByUsernameAsync(model.Username);
        if (admin == null || !await _adminRepository.CheckPasswordAsync(admin, model.Password))
        {
            return new LoginResultViewModel { Success = false, Message = "Invalid username or password" };
        }

        var tokenHandler = new JwtSecurityTokenHandler();

        // Retrieves the JWT secret key from google cloud run image environment
        var jwtKey = Environment.GetEnvironmentVariable("jwt");
        if (string.IsNullOrEmpty(jwtKey))
        {
            throw new InvalidOperationException("The JWT Key environment variable is not set !!!");
        }

        var key = Encoding.ASCII.GetBytes(jwtKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity([new Claim("id", admin.AdminID.ToString())]),
            Expires = DateTime.UtcNow.AddDays(3),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return new LoginResultViewModel { Success = true, Token = tokenHandler.WriteToken(token) };
    }

    public async Task<RegistrationResultViewModel> RegisterAsync(RegisterAdminViewModel model)
    {
        var existingAdmin = await _adminRepository.GetAdminByUsernameAsync(model.Username);
        if (existingAdmin != null)
        {
            return new RegistrationResultViewModel { Success = false, Message = "Username already exists" };
        }

        var newAdmin = new Admin
        {
            Username = model.Username,
            Password = ""
        };

        newAdmin.Password = _passwordHasher.HashPassword(newAdmin, model.Password);

        try
        {
            await _adminRepository.AddAdminAsync(newAdmin);
            return new RegistrationResultViewModel { Success = true };
        }
        catch (Exception ex)
        {
            return new RegistrationResultViewModel { Success = false, Message = $"Error registering admin: {ex.Message}" };
        }
    }
}
