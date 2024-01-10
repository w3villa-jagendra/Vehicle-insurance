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



namespace VehicleInsuranceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly VehicleDbContext _context;

        public UserController(VehicleDbContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("profile")]
        [Authorize] // This attribute requires a valid JWT token to access the endpoint
        public IActionResult GetProfile()
        {
            // Access user claims
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var username = User.FindFirst(ClaimTypes.Name)?.Value;

            // You can use the user information as needed
            var userProfile = new { UserId = userId, Username = username };

            return Ok(userProfile);
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


        //JWT token
        public class TokenService
        {
            private static TokenService? _instance;
            private readonly string _secretKey;


            public TokenService(string secretKey)
            {
                _secretKey = secretKey;
            }
            public static TokenService Instance
            {
                get
                {
                    if (_instance == null)
                    {
                        // Initialize the instance with your default secret key
                        _instance = new TokenService("your_secret_key_your_strong_secret_key_of_at_least_16_characters");
                    }

                    return _instance;
                }
            }

            // Generate Jwt token
            public string GenerateToken(long userId, string username, int expirationHours = 15)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_secretKey);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Name, username)
                    }),
                    Expires = DateTime.UtcNow.AddHours(expirationHours),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return tokenString;
            }

            // Verify the token
            public bool ValidateToken(string token)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_secretKey);

                try
                {
                    tokenHandler.ValidateToken(token, new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false, // Set to true if you want to validate the issuer
                        ValidateAudience = false, // Set to true if you want to validate the audience
                        ClockSkew = TimeSpan.Zero // Set to zero if you want to handle the expiration time exactly
                    }, out _);

                    return true;
                }
                catch
                {
                    return false;
                }
            }
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
                // var tokenService = new TokenService("your_secret_key_your_strong_secret_key_of_at_least_16_characters");
                var tokenService = TokenService.Instance;

                // Generate JWT token using the token service
                var tokenString = tokenService.GenerateToken(existingUser.Id, existingUser.Username);

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
