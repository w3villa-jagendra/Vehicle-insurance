using System;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using VehicleInsuranceApi.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using VehicleInsuranceApi.Services;
using VehicleInsuranceApi.DTOs;



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



        // Get transaction Info for purchase details
        [HttpGet("transactionInfo/{userId}")]
        public async Task<ActionResult<IEnumerable<TransactionInfoDto>>> GetTransactionInfo(long userId)
        {
            try
            {
                string headerToken = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                if (headerToken != null)
                {
                    var transactions = await _context.Transactions
                        .Where(t => t.UserId == userId)
                        .Join(
                            _context.Plans,
                            t => t.PlanId,
                            tp => tp.PlanId,
                            (t, tp) => new { t, tp }
                        )
                        .Join(
                            _context.Vehicles,
                            temp => temp.t.VehicleId,
                            tv => tv.VehicleId,
                            (temp, tv) => new TransactionInfoDto
                            {
                                CompanyName = temp.tp.CompanyName,
                                PlanDetails = temp.tp.PlanDetails,
                                TotalAmount = temp.t.TotalAmount,
                                TransactionDate = temp.t.TransactionDate,
                                VehicleNumber = tv.VehicleNumber
                            }
                        )
                        .ToListAsync();

                    return transactions;
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

                        Transaction newTransaction = new Transaction
                        {

                            UserId = transaction.UserId,
                            PlanId = transaction.PlanId,
                            VehicleId = transaction.VehicleId,
                            TotalAmount = transaction.TotalAmount,
                            TransactionDate = DateTime.UtcNow,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow

                        };

                        _context.Transactions.Add(newTransaction);
                        await _context.SaveChangesAsync();

                        return CreatedAtAction(nameof(GetTransactions), new { id = newTransaction.TransactionId }, newTransaction);
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
