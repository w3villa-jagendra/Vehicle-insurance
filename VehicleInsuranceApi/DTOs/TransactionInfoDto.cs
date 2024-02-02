namespace VehicleInsuranceApi.DTOs
{
    public class TransactionInfoDto
    {
        public string? CompanyName { get; set; }
        public string? PlanDetails { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime TransactionDate { get; set; }
        public string? VehicleNumber { get; set; }
    }
}

