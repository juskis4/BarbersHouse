using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace barbershouse.api.Models;

[Table("barberWorkHours", Schema = "public")]
public class BarberWorkHours
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("work_hour_id")]
    public int WorkHourID { get; set; }

    [Required]
    [ForeignKey("BarberId")]
    [Column("barber_id")]
    public int BarberId { get; set; }

    [Required]
    [Column("day_of_week")]
    public DayOfWeek DayOfWeek { get; set; }

    [Required]
    [Column("start_time")]
    public TimeSpan StartTime { get; set; } 

    [Required]
    [Column("end_time")]
    public TimeSpan EndTime { get; set; } 

    public virtual Barber Barber { get; set; }
}