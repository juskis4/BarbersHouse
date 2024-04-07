using barbershouse.api.Models;

namespace barbershouse.api.Repositories;

public interface IBarbersRepository
{
    Task<IEnumerable<Barber>> GetAllBarbersWithServicesAsync();

    Task<Barber?> GetBarberByIdAsync(int barberId);

    Task SaveChangesAsync();
}