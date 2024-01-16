using Microsoft.AspNetCore.Mvc;
using VehicleInsuranceApi.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;




namespace VehicleInsuranceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly VehicleDbContext _context;

        public TransactionController(VehicleDbContext context)
        {
            _context = context;
        }

        // GET: api/Transaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions.ToListAsync();
        }

        // POST: api/Transaction
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransactions), new { id = transaction.TransactionId }, transaction);
        }
    }
}
