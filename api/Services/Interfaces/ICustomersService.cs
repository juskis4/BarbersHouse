using barbershouse.api.Models;

namespace barbershouse.api.Services;

public interface ICustomersService
{
    Task<Customer?> GetOrCreateCustomerAsync(string customerName, string customerEmail);
}