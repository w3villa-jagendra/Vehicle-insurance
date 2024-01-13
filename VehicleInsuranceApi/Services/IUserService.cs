using System.Collections.Generic;
using VehicleInsuranceApi.Models;



namespace VehicleInsuranceApi.Services
{
    public interface IUserService
    {

        List<User> GetUsers();
        User GetUserById(long userId);
        // string GenerateToken(long userId, string username, int expirationHours = 15);
        // bool ValidateToken(string token);


    }



}

