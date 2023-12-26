

namespace VehicleInsuranceApi.Models
{

public class Vehicle
{
     
    public int VehicleID { get; set; }
    public int UserID { get; set; }
    public required User User { get; set; }
    public VehicleType Type { get; set; }
    public  string? EngineNumber { get; set; }
    public DateTime MakeDate { get; set; }
    public string? OwnerDetails { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public ICollection<Transaction>?  Transactions { get; set; }
}

}