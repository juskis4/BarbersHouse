using barbershouse.api.Models;
using Microsoft.EntityFrameworkCore;

namespace barbershouse.api.Data;

public class DbDataContext : DbContext
{
    public DbSet<Admins> Admins { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Barber> Barbers { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Booking> Bookings { get; set; } 

    public DbDataContext()
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="DbDataContext"/> class using the specified options
    /// </summary>
    /// <param name="options">The options to be used by a <see cref="DbContext"/></param>
#pragma warning disable 8618
    public DbDataContext(DbContextOptions<DbDataContext> options) : base(options)
#pragma warning restore 8618
    {

    }

    // /// <summary>
    // /// Configures the database to be used for this context
    // /// </summary>
    // /// <param name="optionsBuilder">A builder used to create or modify options for this context</param>
    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    // {
    //     var configuration = new ConfigurationBuilder()
    //         .SetBasePath(Directory.GetCurrentDirectory())
    //         .AddJsonFile("appsettings.json")
    //         .Build();
    //     var conn = configuration.GetConnectionString("DefaultConnection");
    //     Console.WriteLine("Connection String: " + conn);
    //     if (conn == null)
    //     {
    //         throw new Exception("ConnectionString environment variable not found");
    //     }
    //     optionsBuilder.UseNpgsql(conn);
    // }
}

