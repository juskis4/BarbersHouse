namespace barbershouse.api.ViewModels;

public class BarberWithServicesViewModel
{
    public int BarberId { get; set; }
    public string Name { get; set; }
    public string Email {get; set;}
    public string Bio { get; set; }
    public string PhotoUrl { get; set; }
    public IEnumerable<ServiceViewModel> Services { get; set; } 
}