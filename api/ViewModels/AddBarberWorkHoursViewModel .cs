
using System.ComponentModel.DataAnnotations;

namespace barbershouse.api.ViewModels;

public class AddBarberWorkHoursViewModel 
{
    [Required]
    public DayOfWeek DayOfWeek { get; set; } 

    [Required]
    public TimeSpan StartTime { get; set; }

    [Required]
    public TimeSpan EndTime { get; set; }
}