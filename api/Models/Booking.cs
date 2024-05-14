using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace barbershouse.api.Models;

[Table("bookings", Schema = "public")]
public class Booking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("booking_id")]
    public int BookingID { get; set; }

    [Required] 
    [ForeignKey("CustomerId")] 
    [Column("customer_id")]
    public int CustomerId { get; set; }
    public virtual Customer Customer { get; set; }

    [Required] 
    [ForeignKey("BarberId")] 
    [Column("barber_id")]
    public int BarberId { get; set; }
    public virtual Barber Barber { get; set; }

    [Required] 
    [ForeignKey("ServiceId")] 
    [Column("service_id")]
    public int ServiceId { get; set; }
    public virtual Service Service { get; set; }

    [Column("booking_date_time")]
    public DateTime BookingDateTime { get; set; }

    [Column("status")]
    public string Status { get; set; } 
}
