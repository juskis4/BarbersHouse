using System.ComponentModel.DataAnnotations;

namespace barbershouse.api.ViewModels;

public class AddServiceViewModel
{
    [Required(ErrorMessage = "Title is required.")]
    public required string Title { get; set; } 

    public string? Description { get; set; } 

    [Range(1, int.MaxValue, ErrorMessage = "Duration must be a positive number.")]
    public int Duration { get; set; } // In minutes

    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be a positive value.")]
    public decimal Price { get; set; }
}