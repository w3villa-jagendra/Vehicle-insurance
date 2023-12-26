namespace VehicleInsuranceApi.Models
{
    public class AddOn
    {

        public int AddOnID { get; set; }
        public required string Name { get; set; }
        public  required VehicleType Type { get; set; }
        public required decimal? Price { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public ICollection<User>? Users { get; set; }
    }

  

}