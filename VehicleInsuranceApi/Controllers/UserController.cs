using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
using VehicleInsuranceApi.Models;
using VehicleInsuranceApi.Services;



namespace VehicleInsuranceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly VehicleDbContext _context;
        private readonly TokenService _tokenService;

        public UserController(VehicleDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }


        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }




        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            try
            {
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                if (authorizationHeader != null && authorizationHeader.StartsWith("Bearer "))
                {
                    var token = authorizationHeader.Substring("Bearer ".Length).Trim();

                    var claimsPrincipal = _tokenService.GetClaimsPrincipal(token);

                    if (claimsPrincipal != null)
                    {
                        var userId = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                        var username = claimsPrincipal.FindFirst(ClaimTypes.Name)?.Value;
                        var userRole = claimsPrincipal.FindFirst(ClaimTypes.Role)?.Value;

                        var userProfile = new { UserId = userId, Username = username, UserRole = userRole };

                        return Ok(userProfile);
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
                return StatusCode(500, ex);
            }
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(long id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/User/signUp
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("signUp")]
        public async Task<ActionResult<User>> PostUser(User user)
        {

            string salt = BCrypt.Net.BCrypt.GenerateSalt();

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.HashedPassword, salt);


            // Create a new User instance with the extracted data
            User newUser = new User
            {
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                HashedPassword = hashedPassword,
                UserRole = user.UserRole,
                Salt = salt,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };


            _context.Users.Add(newUser);

            await _context.SaveChangesAsync();

            // Return a response with the created user data
            return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUser);
        }




        [HttpPost("login")]
        public async Task<IActionResult> PostLogin(User user)
        {
            var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.Username == user.Username);

            if (existingUser == null)
            {
                return NotFound();
            }

            if (BCrypt.Net.BCrypt.Verify(user.HashedPassword, existingUser.HashedPassword))
            {

                var userRole = existingUser.UserRole ?? "customer";
                var tokenString = _tokenService.GenerateToken(existingUser.Id, existingUser.Username, existingUser.UserRole);

                // Return token to the frontend
                return Ok(new { token = tokenString });

            }
            else
            {
                return Unauthorized();
            }
        }




        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(long id)
        {
            return _context.Users.Any(e => e.Id == id);

        }
    }
}
