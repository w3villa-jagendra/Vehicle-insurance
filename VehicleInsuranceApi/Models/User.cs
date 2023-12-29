using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VehicleInsuranceApi.Models
{

    public class User
    {
        public long ID { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public bool IsActive { get; set; }
        public bool IsEmailVerified { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public UserProfile? Profile { get; set; }
        public ICollection<UserRole>? UserRoles { get; set; }
    }



}


