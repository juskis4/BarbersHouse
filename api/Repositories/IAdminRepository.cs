using barbershouse.api.Models;

namespace barbershouse.api.Repositories;

public interface IAdminRepository
{
    Task<Admin?> GetAdminByUsernameAsync(string username);
    Task<bool> CheckPasswordAsync(Admin admin, string password);
    Task AddAdminAsync(Admin admin);

    Task SaveChangesAsync();
}