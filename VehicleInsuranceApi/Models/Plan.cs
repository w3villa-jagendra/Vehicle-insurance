using System;
using System.Text.Json.Serialization;

namespace VehicleInsuranceApi.Models
{
    public class Plan
    {
        public long PlanId { get; set; }
        public long UserId { get; set; }
        public long? VehicleId { get; set; }
       

        public bool IsActive { get; set; }
        public string? VehicleType { get; set; }
        public string? CompanyName { get; set; }
        public string? PlanDetails { get; set; }
        public  float? BasePrice { get; set; }
      
       

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

        [JsonIgnore]
        public ICollection<Transaction>? Transactions { get; set; }

    }
}
