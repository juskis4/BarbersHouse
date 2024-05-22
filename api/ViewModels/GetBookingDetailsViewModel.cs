namespace barbershouse.api.ViewModels;

public class GetBookingDetailsViewModel
{
    public int BookingId { get; set; }
    public BarberViewModel Barber { get; set; } 
    public int CustomerId { get; set; }
    public string CustomerName { get; set; }
    public ServiceViewModel Service { get; set; }
    public DateTimeOffset BookingDateTime { get; set; }
    public string Status { get; set; } 
}