using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace barbershouse.api.Models;

[Table("customers", Schema = "public")]
public class Customer
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("customer_id")]
    public int CustomerID { get; set; }

    [Required]
    [Column("customer_name")]
    public string CustomerName { get; set; }

    [Required]
    [Column("customer_email")]
    public string CustomerEmail { get; set; }
}
