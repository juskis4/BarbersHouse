using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace barbershouse.api.Models;

[Table("barbers", Schema = "public")]
    public class Barber
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("barber_id")]
        public int BarberID { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; }

        [Column("bio")]
        public string Bio { get; set; }

        [Column("photo_url")]
        public string PhotoUrl { get; set; }

        public ICollection<Service> Services { get; set; } 
        //public ICollection<BarberWorkHours> BarberWorkHours { get; set; }
        //public ICollection<Booking> Bookings { get; set; }
    }