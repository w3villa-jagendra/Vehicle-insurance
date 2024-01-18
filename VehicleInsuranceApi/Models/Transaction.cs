using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace VehicleInsuranceApi.Models
{
    public class Transaction
    {
        public long TransactionId { get; set; }

        [Required]
        public long UserId { get; set; }

        [Required]
        public long PlanId { get; set; }

        [Required]
        public long VehicleId { get; set; }


        public decimal TotalAmount { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }


        public DateTime TransactionDate { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

        [JsonIgnore]

        public Plan? TransactionPlan { get; set; }

        [JsonIgnore]
        public Vehicle? TransactionVehicle { get; set; }
    }
}