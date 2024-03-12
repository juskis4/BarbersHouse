namespace barbershouse.api.ViewModels;

public class BarberViewModel
{
    public int BarberId { get; set; }
    public string Name { get; set; }
    public string Bio { get; set; }
    public string PhotoUrl { get; set; }
    public IEnumerable<ServiceViewModel> Services { get; set; } 
}