namespace barbershouse.api.ViewModels;

public class GetBookingsViewModel
{
    public int BookingId { get; set; }
    public int BarberId { get; set; }
    public string BarberName { get; set; }
    public int CustomerId { get; set; }
    public string CustomerName { get; set; }
    public string CustomerEmail { get; set; }
    public int ServiceId { get; set; }
    public string ServiceTitle { get; set; }
    public DateTimeOffset BookingDateTime { get; set; }
    public string Status { get; set; } 
    public int Duration { get; set; }
}
