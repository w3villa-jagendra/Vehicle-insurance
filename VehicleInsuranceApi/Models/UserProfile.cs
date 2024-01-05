using System.ComponentModel.DataAnnotations;

namespace VehicleInsuranceApi.Models
{
    public class UserProfile
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    // public long UserId { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation properties
    // public User? User { get; set; }
}

}