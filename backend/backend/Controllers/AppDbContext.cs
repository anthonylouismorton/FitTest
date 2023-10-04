using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Company> Companies { get; set; }
    // Define DbSet properties for other entities if needed

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
}
