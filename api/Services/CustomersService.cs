using barbershouse.api.Repositories;
using barbershouse.api.Models;

namespace barbershouse.api.Services;

public class CustomersService(ICustomersRepository customersRepository) : ICustomersService
{
    private readonly ICustomersRepository _customersRepository = customersRepository;

    public async Task<Customer?> GetOrCreateCustomerAsync(string customerName, string customerEmail)
    {
        var existingCustomer = await _customersRepository.GetCustomerByEmailAsync(customerEmail);
        if (existingCustomer != null)
            return existingCustomer;

        var newCustomer = new Customer
        {
            CustomerName = customerName,
            CustomerEmail = customerEmail
        };

        await _customersRepository.AddCustomerAsync(newCustomer);
        return newCustomer;
    }
}