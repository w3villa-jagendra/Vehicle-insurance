using Microsoft.EntityFrameworkCore;
using System;
namespace VehicleInsuranceApi.Models;

public class VehicleDbContext : DbContext
{


  public DbSet<User> Users { get; set; }
  public DbSet<Vehicle> Vehicles { get; set; }
  public DbSet<VehicleOwner> VehicleOwners { get; set; }
  public DbSet<Plan> Plans { get; set; }





  public VehicleDbContext(DbContextOptions<VehicleDbContext> options)
    : base(options)
  {
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<User>()
    .HasMany(u => u.Vehicles)
    .WithOne(v => v.User)
    .HasForeignKey(v => v.UserId)
    .OnDelete(DeleteBehavior.Cascade);

    //  modelBuilder.Entity<User>()
    //  .HasMany(u => u.Vehicles)
    //  .WithOne(v => v.User)
    //  .HasForeignKey(v => v.UserId)
    //  .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<User>()
         .HasIndex(u => u.Username)
         .IsUnique();

   

    modelBuilder.Entity<VehicleOwner>()
        .HasKey(vo => vo.OwnerId);  // Define the primary key for VehicleOwner

    modelBuilder.Entity<Vehicle>()
        .HasOne(v => v.User)
        .WithMany(u => u.Vehicles)
        .HasForeignKey(v => v.UserId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Vehicle>()
    .HasOne(v => v.Owner)
    .WithOne(o => o.Vehicle)
    .HasForeignKey<Vehicle>(v => v.OwnerId)
    .OnDelete(DeleteBehavior.Cascade);


    base.OnModelCreating(modelBuilder);
  }


}