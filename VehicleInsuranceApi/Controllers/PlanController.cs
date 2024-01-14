using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VehicleInsuranceApi.Models;
using Microsoft.EntityFrameworkCore;


namespace VehicleInsuranceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanController : ControllerBase
    {
        private readonly VehicleDbContext _context;

        public PlanController(VehicleDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plan>>> GetPlan()
        {
            return await _context.Plans.ToListAsync();
        }



        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Plan>>> GetPlansByUserId(int userId)
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
    }
}
