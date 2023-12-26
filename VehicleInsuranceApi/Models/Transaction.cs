namespace VehicleInsuranceApi.Models
{
 
public class Transaction
{
     
    public int TransactionID { get; set; }
    public int UserID { get; set; }
    public required User User { get; set; }
    public int VehicleID { get; set; }
    public required Vehicle Vehicle { get; set; }
    public int PlanID { get; set; }
    public InsurancePlan? InsurancePlan { get; set; }
    public DateTime TransactionDate { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public ICollection<PaymentHistory>? PaymentHistories { get; set; }
}

}