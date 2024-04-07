namespace barbershouse.api.ViewModels;

public class AddServiceViewModel
{
    public string Title { get; set; }
    public string Description { get; set; }
    public int Duration { get; set; } // In minutes
    public decimal Price { get; set; }
}
