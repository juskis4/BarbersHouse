namespace barbershouse.api.ViewModels;

public class AddBookingViewModel
{
    public int BarberId { get; set; }
    public string CustomerName {get; set;}
    public string CustomerEmail {get; set;}
    public int? ServiceId { get; set; } 
    public int? Duration { get; set; }
    public DateTime StartTime {get; set;}
}