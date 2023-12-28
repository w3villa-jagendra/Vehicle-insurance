using System.ComponentModel.DataAnnotations;

namespace VehicleInsuranceApi.Models
{
 
    public class User
{
    [Key]
    public  int UserID { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; } 
    public required string Name { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public  UserType? UserType { get; set; }

    // public ICollection<Vehicle>? Vehicles { get; set; }
     
}

    public enum UserType
    {
        Customer,
        Vendor
       
    }

}


