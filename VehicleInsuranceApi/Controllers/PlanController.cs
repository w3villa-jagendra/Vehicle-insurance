using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VehicleInsuranceApi.Models;
using Microsoft.EntityFrameworkCore;
using VehicleInsuranceApi.Services;

namespace VehicleInsuranceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanController : ControllerBase
    {
        private readonly VehicleDbContext _context;

        private readonly TokenService _tokenService;

        public PlanController(VehicleDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plan>>> GetPlan()
        {
            return await _context.Plans.ToListAsync();
        }



        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Plan>>> GetPlansByUserId(int userId)
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

                        
                        var userPlans = await _context.Plans
                                         .Where(p => p.UserId == userId)
                                         .ToListAsync();

                        if (userPlans == null || userPlans.Count == 0)
                        {
                            return NotFound($"No plans found for the user with ID: {userId}");
                        }

                        return userPlans;
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


        //GET Plan by PlanId
        [HttpGet("{id}")]
        public async Task<ActionResult<Plan>> GetPlanById(long id)
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
                        var plan = await _context.Plans.FindAsync(id);

                        if (plan == null)
                        {
                            return NotFound($"Plan with ID {id} not found");
                        }

                        return plan;
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




        [HttpPost]
        public async Task<ActionResult<Plan>> PostPlan(Plan plan)
        {
            try
            {
                // Assuming you have a reference to the associated User, you can set it here
                // If UserId is coming from the request, you may need to adjust this accordingly
                // plan.UserId = ...;

                Plan newPlan = new Plan
                {
                    UserId = plan.UserId,
                    VehicleId = plan.VehicleId,
                    IsActive = plan.IsActive,
                    VehicleType = plan.VehicleType,
                    CompanyName = plan.CompanyName,
                    PlanDetails = plan.PlanDetails,
                    BasePrice = plan.BasePrice,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Plans.Add(newPlan);


                await _context.SaveChangesAsync();


                return CreatedAtAction("GetPlan", new { id = newPlan.PlanId }, newPlan);
            }
            catch (Exception ex)
            {

                return BadRequest($"Error: {ex.Message}");
            }
        }




        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlan(long id, Plan updatedPlan)
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
                        var existingPlan = await _context.Plans.FindAsync(id);

                        if (existingPlan == null)
                        {
                            return NotFound($"Plan with ID {id} not found");
                        }

                        // Update the existing plan properties



                        existingPlan.VehicleType = updatedPlan.VehicleType;
                        existingPlan.CompanyName = updatedPlan.CompanyName;
                        existingPlan.PlanDetails = updatedPlan.PlanDetails;
                        existingPlan.BasePrice = updatedPlan.BasePrice;
                        existingPlan.UpdatedAt = DateTime.UtcNow;

                        // Mark the plan as modified and save changes
                        _context.Entry(existingPlan).State = EntityState.Modified;
                        await _context.SaveChangesAsync();

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


                // Assuming you have a reference to the associated User, you can set it here
                // If UserId is coming from the request, you may need to adjust this accordingly
                // updatedPlan.UserId = ...;




            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

    }
}
