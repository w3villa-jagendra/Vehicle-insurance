using System;
using System.Text.Json.Serialization;
namespace VehicleInsuranceApi.Models
{
    public class Vehicle
    {
        public long VehicleId { get; set; }
        public long UserId { get; set; }
        public int? PlanId { get; set; }
        public long? OwnerId { get; set; }

        public bool IsActive { get; set; }
        public string? VehicleType { get; set; }
        public string? EngineNumber { get; set; }
        public string? VehicleNumber { get; set; }
        public DateTime? MakeDate { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

        [JsonIgnore]
        public Plan? Plans { get; set; }

        [JsonIgnore]
        public VehicleOwner? Owner { get; set; }

        [JsonIgnore]
        public ICollection<Transaction>? Transactions { get; set; }


    }
}
