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
using VehicleInsuranceApi.DTOs;
using VehicleInsuranceApi.Services;
namespace VehicleInsuranceApi.Controllers

{
    [Route("api/[controller]")]
    [ApiController]

    public class AdminController : ControllerBase
    {
        private readonly VehicleDbContext _context;
        private readonly TokenService _tokenService;

        public AdminController(VehicleDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpGet("Users/{page}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers(int page)
        {

            if (_context.Users == null)
            {
                return NotFound();
            }

            var pageResults = 3f;
            var pageCount = Math.Ceiling(_context.Users.Count() / pageResults);



            var users = await _context.Users
            .Skip((page - 1) * (int)pageResults)
            .Take((int)pageResults)
            .ToListAsync();

            var response = new UserListDto{
                Users = users,
                CurrentPage = page,
                Pages = (int)pageCount,
                

            };

            return Ok(response);
        }

    }
}