using VehicleInsuranceApi.Models;

namespace VehicleInsuranceApi.DTOs
{

    public class UserListDto
    {
        public List<User> Users { get; set; } = new List<User>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}


