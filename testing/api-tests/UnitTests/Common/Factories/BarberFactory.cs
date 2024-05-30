using barbershouse.api.Models;

namespace barbershouse.api.Tests.Common.Factories;

public class BarberFactory
{
    public static Barber CreateBarber(
        int id = 1,
        string name = "Test Barber",
        string email = "test@example.com",
        string? bio = "Test bio",
        string? photoUrl = null)
    {
        return new Barber
        {
            BarberID = id,
            Name = name,
            Email = email,
            Bio = bio,
            PhotoUrl = photoUrl
        };
    }

    public static List<Barber> CreateBarbersList(int count, bool withServices = false)
    {
        var barbers = new List<Barber>();
        for (int i = 1; i <= count; i++)
        {
            var barber = CreateBarber(id: i, name: $"Test Barber {i}");
            if (withServices)
            {
                barber.Services = new List<Service>
                    {
                        new Service { Title = "Haircut", Duration = 30, Price = 25 },
                        new Service { Title = "Beard Trim", Duration = 15, Price = 15 }
                    };
            }
            barbers.Add(barber);
        }
        return barbers;
    }
}
