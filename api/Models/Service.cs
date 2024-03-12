using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace barbershouse.api.Models;

[Table("services", Schema = "public")]
public class Service
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("service_id")]
    public int ServiceID { get; set; }

    [Required]
    [Column("title")]
    public string Title { get; set; }

    [Column("description")]
    public string Description { get; set; }

    [Column("duration")]
    public int Duration { get; set; } 

    [Column("price")]
    public decimal Price { get; set; }

    [Required] 
    [ForeignKey("BarberId")] 
    [Column("barber_id")]
    public int BarberId { get; set; }

    public Barber Barber { get; set; }  
}
