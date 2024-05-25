namespace barbershouse.api.ViewModels;

public class GetServiceViewModel
{
    public int ServiceId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int Duration { get; set; } // In minutes
    public decimal Price { get; set; }
    public int BarberId { get; set; }
    public string BarbersName { get; set; }
}
