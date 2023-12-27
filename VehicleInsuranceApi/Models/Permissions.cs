using System.ComponentModel.DataAnnotations;

namespace VehicleInsuranceApi.Models
{
    public class Permission
{
    public long ID { get; set; }
    public string? Name { get; set; }
    public string? Code { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation properties
    public ICollection<RolePermission>? RolePermissions { get; set; }
}

}