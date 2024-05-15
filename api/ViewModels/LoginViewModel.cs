using System.ComponentModel.DataAnnotations;

namespace barbershouse.api.ViewModels;

public class LoginViewModel
{
    [Required(ErrorMessage = "Username is required")]
    public required string Username { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public required string Password { get; set; }
}