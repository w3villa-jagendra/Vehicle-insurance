using System.ComponentModel.DataAnnotations;

namespace VehicleInsuranceApi.Models
{
    public class RolePermission
{
    public long Id { get; set; }
    // public long RoleId { get; set; }
    public long PermissionId { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation properties
    // public Role? Role { get; set; }
    // public Permission? Permission { get; set; }
}

}