namespace barbershouse.api.ViewModels;

public class AvailableTimeSlotRequestViewModel
{
    public DateTime SelectedDate { get; set; } 
    public int SelectedBarberId { get; set; } 
    public int[] SelectedServiceIds { get; set; } 
}