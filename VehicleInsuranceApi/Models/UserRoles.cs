using System.ComponentModel.DataAnnotations;


namespace VehicleInsuranceApi.Models
{
    public class UserRole
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long RoleId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        // public User? User { get; set; }
        // public Role? Role { get; set; }
    }

}