using System.ComponentModel.DataAnnotations;

namespace barbershouse.api.ViewModels;
public class RegisterAdminViewModel
{
    [Required]
    public required string Username { get; set; }

    [Required]
    public required string Password { get; set; }
}