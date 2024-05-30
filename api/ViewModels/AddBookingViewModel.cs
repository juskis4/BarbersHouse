using System.ComponentModel.DataAnnotations;

namespace barbershouse.api.ViewModels;

public class AddBookingViewModel
{
    [Required(ErrorMessage = "Barber ID is required.")]
    public int BarberId { get; set; }

    [Required(ErrorMessage = "Customer name is required.")]
    public required string CustomerName { get; set; }

    [Required(ErrorMessage = "Customer email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email address.")]
    public required string CustomerEmail { get; set; }

    public int? ServiceId { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Duration must be a positive number.")] 
    public int? Duration { get; set; } // In minutes

    [Required(ErrorMessage = "Start time is required.")]
    public DateTime StartTime { get; set; }
}
