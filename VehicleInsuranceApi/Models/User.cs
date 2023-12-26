using System.ComponentModel.DataAnnotations;

namespace VehicleInsuranceApi.Models
{
 
    public class User
{
    [Key]
    public  long UserID { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; } // Hashed
    public required string Name { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public required UserType UserType { get; set; }

    public ICollection<Vehicle>? Vehicles { get; set; }
    public ICollection<Transaction>? Transactions { get; set; }
    public ICollection<PaymentHistory>? PaymentHistories { get; set; }
    public ICollection<AddOn>? AddOns { get; set; }
}

    public enum UserType
    {
        Customer,
        Vendor
       
    }

}


