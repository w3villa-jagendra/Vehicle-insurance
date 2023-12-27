using System.ComponentModel.DataAnnotations;

namespace VehicleInsuranceApi.Models
{

    public class Vehicle
    {

        public long ID { get; set; }
        public long OwnerID { get; set; }
        public string? EngineNumber { get; set; }
        public string? VehicleNumber { get; set; }
        public int VehicleType { get; set; }
        public DateTime MfdDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation properties
        public User? Owner { get; set; }



    }

}