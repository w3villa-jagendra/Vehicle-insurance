using System.ComponentModel.DataAnnotations;

namespace VehicleInsuranceApi.Models
{
    public class User
    {
        [Key]
        public long Id { get; set; }  // <-- Added 'set' to allow modification

        public string? Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
