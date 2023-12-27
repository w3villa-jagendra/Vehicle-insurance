using Microsoft.EntityFrameworkCore;
using System;
namespace VehicleInsuranceApi.Models;

public class VehicleDbContext : DbContext
{


    public DbSet<User> Users { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
  

    public VehicleDbContext(DbContextOptions<VehicleDbContext> options)
      : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // modelBuilder.Entity<User>()
        // .HasMany(u => u.Vehicles)
        // .WithOne(v => v.User)
        // .HasForeignKey(v => v.UserID)
        // .OnDelete(DeleteBehavior.Cascade);

  



        base.OnModelCreating(modelBuilder);
    }
   

}