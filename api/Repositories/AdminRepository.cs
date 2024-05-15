using barbershouse.api.Data;
using barbershouse.api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace barbershouse.api.Repositories;

public class AdminRepository(DbDataContext context, IPasswordHasher<Admin> passwordHasher) : IAdminRepository
{
    private readonly DbDataContext _context = context;
    private readonly IPasswordHasher<Admin> _passwordHasher = passwordHasher;

    public async Task<Admin?> GetAdminByUsernameAsync(string username)
    {
        return await _context.Admins.FirstOrDefaultAsync(a => a.Username == username);
    }

    public async Task<bool> CheckPasswordAsync(Admin admin, string password)
    {
        var result = _passwordHasher.VerifyHashedPassword(admin, admin.Password, password);
        return result == PasswordVerificationResult.Success;
    }

    public async Task AddAdminAsync(Admin admin)
    {
        await _context.Admins.AddAsync(admin);

        await SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}