using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VehicleInsuranceApi.Models;


namespace VehicleInsuranceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class VehicleController : ControllerBase
    {
        private readonly VehicleDbContext _context;

        public VehicleController(VehicleDbContext context)
        {
            _context = context;
        }


        // GET: api/Vehicle
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        {

            // return Ok("Vehicle");
            return await _context.Vehicles.ToListAsync();
        }



        [HttpGet("{userId}")]
        public async Task<IActionResult> GetVehiclesByUserId(long userId)
        {
            try
            {
                // Retrieve the user's vehicles
                var vehicles = await _context.Vehicles
                    .Where(v => v.UserId == userId)
                    .ToListAsync();

                return Ok(vehicles);
            }
            catch (Exception)
            {
                // Handle exceptions appropriately, e.g., log the error and return a 500 response
                return StatusCode(500, "Error retrieving vehicles");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
        {
            try
            {
                // Find the existing user by Id
                var user = _context.Users.Find(vehicle.UserId);

                if (user == null)
                {
                    return BadRequest("User not found");
                }

                // Create a new vehicle
                var newVehicle = new Vehicle
                {
                    VehicleType = vehicle.VehicleType,
                    EngineNumber = vehicle.EngineNumber,
                    VehicleNumber = vehicle.VehicleNumber,
                    UserId = vehicle.UserId,
                    User = user,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                // Add the new vehicle to the context
                _context.Vehicles.Add(newVehicle);

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return the created vehicle
                return CreatedAtAction(nameof(GetVehicles), new { id = newVehicle.VehicleId }, newVehicle);
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately (log, return error response, etc.)
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


    }
}