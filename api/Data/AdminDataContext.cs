using barbershouse.api.Models;
using Microsoft.EntityFrameworkCore;

namespace barbershouse.api.Data;

public class AdminDataContext : DbContext
{
    public DbSet<Admins> Admins { get; set; }

    public AdminDataContext()
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="AdminDataContext"/> class using the specified options
    /// </summary>
    /// <param name="options">The options to be used by a <see cref="DbContext"/></param>
#pragma warning disable 8618
    public AdminDataContext(DbContextOptions<AdminDataContext> options) : base(options)
#pragma warning restore 8618
    {

    }

    /// <summary>
    /// Configures the database to be used for this context
    /// </summary>
    /// <param name="optionsBuilder">A builder used to create or modify options for this context</param>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();
        var conn = configuration.GetConnectionString("DefaultConnection");
        if (conn == null)
        {
            throw new Exception("ConnectionString environment variable not found");
        }
        optionsBuilder.UseNpgsql(conn);
    }
}

