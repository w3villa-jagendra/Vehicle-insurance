namespace VehicleInsuranceApi.Models
{
    public class InsurancePlan
    {
       
        public int PlanID { get; set; }
        public int VendorID { get; set; }
        public User? Vendor { get; set; }
        public VehicleType Type { get; set; }
        public decimal BasePrice { get; set; }
        public  required string  CompanyName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Details { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<Transaction>? Transactions { get; set; }
    }

}