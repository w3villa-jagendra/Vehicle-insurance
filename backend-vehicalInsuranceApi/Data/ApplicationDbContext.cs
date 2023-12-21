
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    // Other DbSet properties for additional entities...

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure your model if needed...
    }
}
