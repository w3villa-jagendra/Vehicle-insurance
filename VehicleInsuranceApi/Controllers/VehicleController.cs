using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VehicleInsuranceApi.Models;
using VehicleInsuranceApi.Services;


namespace VehicleInsuranceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class VehicleController : ControllerBase
    {
        private readonly VehicleDbContext _context;
        private readonly TokenService _tokenService;

        public VehicleController(VehicleDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }


        // GET: api/Vehicle
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        {

            // return Ok("Vehicle");
            return await _context.Vehicles.ToListAsync();
        }



        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetVehiclesByUserId(long userId)
        {
            try
            {
                
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


        // Get Plan id by Vehicle ID

        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicleById(long id)
        {
            try
            {
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                if (authorizationHeader != null && authorizationHeader.StartsWith("Bearer "))
                {
                    var token = authorizationHeader.Substring("Bearer ".Length).Trim();

                    var validToken = _tokenService.ValidateToken(token);

                    if (validToken)
                    {

                        var vehicle = await _context.Vehicles.FindAsync(id);

                        if (vehicle == null)
                        {
                            return NotFound($"Plan with ID {id} not found");
                        }

                        return vehicle;
                    }
                    else
                    {
                        return BadRequest("Invalid token");
                    }
                }
                else
                {
                    return BadRequest("Invalid Authorization header format");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }


        //PUT for VehicleID

        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicle(long id, Vehicle updatedVehicle)
        {
            try
            {
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                if (authorizationHeader != null && authorizationHeader.StartsWith("Bearer "))
                {
                    var token = authorizationHeader.Substring("Bearer ".Length).Trim();

                    var validToken = _tokenService.ValidateToken(token);

                    if (validToken)
                    {
                        // Retrieve the existing vehicle by ID
                        var existingVehicle = await _context.Vehicles.FindAsync(id);

                        if (existingVehicle == null)
                        {
                            return NotFound($"Vehicle with ID {id} not found");
                        }

                        // Update the existing vehicle properties
                        existingVehicle.VehicleType = updatedVehicle.VehicleType;
                        existingVehicle.EngineNumber = updatedVehicle.EngineNumber;
                        existingVehicle.VehicleNumber = updatedVehicle.VehicleNumber;
                        existingVehicle.UpdatedAt = DateTime.UtcNow;

                        // Mark the vehicle as modified and save changes
                        _context.Entry(existingVehicle).State = EntityState.Modified;
                        await _context.SaveChangesAsync();

                        // Return a NoContent response
                        return NoContent();
                    }
                    else
                    {
                        return BadRequest("Invalid token");
                    }
                }
                else
                {
                    return BadRequest("Invalid Authorization header format");
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately, e.g., log the error and return a 500 response
                return StatusCode(500, $"Error updating vehicle: {ex.Message}");
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