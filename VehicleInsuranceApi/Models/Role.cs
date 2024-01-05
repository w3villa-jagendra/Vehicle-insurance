using System.ComponentModel.DataAnnotations;

namespace VehicleInsuranceApi.Models
{
    public class Role
    {
        public long Id { get; set; }
        public string? RoleName { get; set; }
        public string? Code { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        // public ICollection<UserRole>? UserRoles { get; set; }
        // public ICollection<RolePermission>? RolePermissions { get; set; }
    }

}