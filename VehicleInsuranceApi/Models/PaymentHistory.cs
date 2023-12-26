
namespace VehicleInsuranceApi.Models
{

public class PaymentHistory
{
     
    public int PaymentID { get; set; }
    public int UserID { get; set; }
    public required User User { get; set; }
    public int TransactionID { get; set; }
    public required Transaction Transaction { get; set; }
    public DateTime PaymentDate { get; set; }
    public decimal PaymentAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

}