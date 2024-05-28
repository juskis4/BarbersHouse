namespace barbershouse.api.ViewModels;

public class GetBookingDetailsViewModel
{
    public int BookingId { get; set; }
    public BarberWithServicesViewModel Barber { get; set; } 
    public int CustomerId { get; set; }
    public string CustomerName { get; set; }
    public string CustomerEmail { get; set; }
    public ServiceViewModel Service { get; set; }
    public DateTimeOffset BookingDateTime { get; set; }
    public string Status { get; set; } 
}
