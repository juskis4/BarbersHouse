using System.ComponentModel.DataAnnotations;

namespace barbershouse.api.ViewModels;

public class AddBarberViewModel
{
    [Required(ErrorMessage = "Name is required.")]
    public required string Name { get; set; }

    [EmailAddress(ErrorMessage = "Invalid email address.")]
    [Required(ErrorMessage = "Email is required.")]
    public required string Email { get; set; }

    [Required(ErrorMessage = "Bio is required.")]
    public required string Bio { get; set; } 

    [Required(ErrorMessage = "PhotoUrl is required.")]
    public required string PhotoUrl { get; set; } 
}
