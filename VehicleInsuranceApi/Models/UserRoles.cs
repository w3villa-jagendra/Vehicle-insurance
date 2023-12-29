using System.ComponentModel.DataAnnotations;


namespace VehicleInsuranceApi.Models
{
    public class UserRole
    {
        public long ID { get; set; }
        public long UserID { get; set; }
        public long RoleID { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public User? User { get; set; }
        public Role? Role { get; set; }
    }

}