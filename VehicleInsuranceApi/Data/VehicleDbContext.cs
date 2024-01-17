using Microsoft.EntityFrameworkCore;
using System;
namespace VehicleInsuranceApi.Models;

public class VehicleDbContext : DbContext
{


  public DbSet<User> Users { get; set; }
  public DbSet<Vehicle> Vehicles { get; set; }
  public DbSet<VehicleOwner> VehicleOwners { get; set; }
  public DbSet<Plan> Plans { get; set; }
  public DbSet<Transaction> Transactions { get; set; }




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



    modelBuilder.Entity<User>()
         .HasIndex(u => u.Username)
         .IsUnique();



    modelBuilder.Entity<VehicleOwner>()
        .HasKey(vo => vo.OwnerId);

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


    modelBuilder.Entity<Transaction>()
              .Property(t => t.TotalAmount)
              .HasPrecision(18, 2);

   modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

   modelBuilder.Entity<Transaction>()
                .HasOne(t => t.TransactionPlan)
                .WithMany(p => p.Transactions)
                .HasForeignKey(t => t.PlanId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.TransactionVehicle)
                .WithMany(v => v.Transactions)
                .HasForeignKey(t => t.VehicleId)
                .OnDelete(DeleteBehavior.Restrict);
                
              
          
           base.OnModelCreating(modelBuilder);
  }


}