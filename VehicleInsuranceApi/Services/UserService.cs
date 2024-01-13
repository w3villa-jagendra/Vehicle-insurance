
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using VehicleInsuranceApi.Models;

namespace VehicleInsuranceApi.Services
{
    public class UserService : IUserService
{
    private readonly VehicleDbContext _context;

    public UserService(VehicleDbContext context)
    {
        _context = context;
    }


    public List<User> GetUsers()
    {
        return _context.Users.ToList();
    }

    public User GetUserById(long userId)
    {
        return _context.Users.Find(userId)!;
    }



    // public List<Vehicle> GetVehiclesForUser(long userId)
    // {
    //     var user = _context.Users
    //         .Include(u => u.Vehicles)
    //         .FirstOrDefault(u => u.Id == userId);

    //     return user?.Vehicles.ToList() ?? new List<Vehicle>();
    // }
}

}
