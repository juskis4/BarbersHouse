using barbershouse.api.Models;

namespace barbershouse.api.Repositories;

public interface ICustomersRepository
{
    Task<Customer?> GetCustomerByEmailAsync(string email);
    Task AddCustomerAsync(Customer customer);
    Task SaveChangesAsync();
}
