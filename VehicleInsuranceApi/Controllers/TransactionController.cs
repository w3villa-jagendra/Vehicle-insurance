using Microsoft.AspNetCore.Mvc;
using VehicleInsuranceApi.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using VehicleInsuranceApi.Services;




namespace VehicleInsuranceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly VehicleDbContext _context;

        private readonly TokenService _tokenService;

        public TransactionController(VehicleDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // GET: api/Transaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            try
            {
                string headerToken = HttpContext.Request.Headers["Authorization"].FirstOrDefault()!;

                var tokenResponse = _tokenService.IsTokenValid(headerToken!);
                if (tokenResponse)
                {
                    return await _context.Transactions.ToListAsync();
                }
                else
                {
                    return BadRequest("Invalid Authorization header format");
                }

            }
            catch (Exception)
            {

                return StatusCode(500, "Internal server error");
            }



        }


        //GET Plan by TransactionId
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransactionById(long id)
        {
            try
            {


                string headerToken = HttpContext.Request.Headers["Authorization"].FirstOrDefault()!;

                var tokenResponse = _tokenService.IsTokenValid(headerToken)!;
                if (headerToken != null && tokenResponse)
                {
                    var transaction = await _context.Transactions.FindAsync(id);

                    if (transaction == null)
                    {
                        return NotFound($"Transaction with ID {id} not found");
                    }

                    return transaction;

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


        // POST: api/Transaction
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
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
                        _context.Transactions.Add(transaction);
                        await _context.SaveChangesAsync();

                        return CreatedAtAction(nameof(GetTransactions), new { id = transaction.TransactionId }, transaction);
                    }
                    else
                    {
                        return StatusCode(400, "token Not valid");
                    }

                }
                else
                {
                    
                    return StatusCode(401, "Unauthorized");
                }

            }
            catch (System.Exception)
            {

                throw;
            }

        }
    }
}
