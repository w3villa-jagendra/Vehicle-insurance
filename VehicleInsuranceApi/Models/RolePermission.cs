using System.ComponentModel.DataAnnotations;

namespace VehicleInsuranceApi.Models
{
    public class RolePermission
{
    public long ID { get; set; }
    public long RoleID { get; set; }
    public long PermissionID { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    // Navigation properties
    public Role? Role { get; set; }
    public Permission? Permission { get; set; }
}

}