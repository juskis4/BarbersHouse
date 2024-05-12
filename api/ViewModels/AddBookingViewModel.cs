namespace barbershouse.api.ViewModels;

public class AddBookingViewModel
{
    public int BarberId { get; set; }
    public int CustomerId { get; set; }
    public int ServiceId { get; set; } 
    public DateTime StartTime {get; set;}
}