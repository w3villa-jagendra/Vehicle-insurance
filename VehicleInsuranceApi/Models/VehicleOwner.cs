using System;
namespace VehicleInsuranceApi.Models
{
    public class VehicleOwner
    {
        public long OwnerId { get; set; }

        public bool? IsActive { get; set; }
        public string? OwnerName { get; set; }
        public string? OwnerAddress { get; set; }
        public string? OwnerPhone { get; set; }


        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }


        public Vehicle? Vehicle { get; set; }

    }
}
