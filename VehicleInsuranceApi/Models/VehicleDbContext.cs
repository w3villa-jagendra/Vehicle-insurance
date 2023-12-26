using Microsoft.EntityFrameworkCore;
using System;
namespace VehicleInsuranceApi.Models;

public class VehicleDbContext : DbContext
{


    public DbSet<User> Users { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<InsurancePlan> InsurancePlans { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<PaymentHistory> PaymentHistories { get; set; }
    public DbSet<AddOn> AddOns { get; set; }

    public VehicleDbContext(DbContextOptions<VehicleDbContext> options)
      : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
        .HasMany(u => u.Vehicles)
        .WithOne(v => v.User)
        .HasForeignKey(v => v.UserID)
        .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Transactions)
            .WithOne(v => v.User)
            .HasForeignKey(f => f.UserID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
               .HasMany(u => u.PaymentHistories)
               .WithOne(ph => ph.User)
               .HasForeignKey(ph => ph.UserID)
               .OnDelete(DeleteBehavior.Cascade);

     

        modelBuilder.Entity<Vehicle>()
            .HasMany(v => v.Transactions)
            .WithOne(t => t.Vehicle)
            .HasForeignKey(t => t.VehicleID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<InsurancePlan>()
            .HasMany(ip => ip.Transactions)
            .WithOne(t => t.InsurancePlan)
            .HasForeignKey(t => t.PlanID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Transaction>()
            .HasMany(t => t.PaymentHistories)
            .WithOne(ph => ph.Transaction)
            .HasForeignKey(ph => ph.TransactionID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AddOn>()
            .HasMany(a => a.Users)
            .WithMany(u => u.AddOns)
            .UsingEntity(j => j.ToTable("UserAddOns"));



        base.OnModelCreating(modelBuilder);
    }
    public enum UserType
    {
        Customer,
        Vendor
    }

}