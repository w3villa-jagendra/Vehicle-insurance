using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace VehicleInsuranceApi.Models
{

    public class User
    {
        public long Id { get; set; }
        public required string Username { get; set; }
        public  string? Email { get; set; }
        public required string HashedPassword { get; set; }
        public  string? Salt { get; set; }

        public bool IsActive { get; set; }
        public bool IsEmailVerified { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        // public UserProfile? Profile { get; set; }

    
    //    [JsonIgnore] 
        // public ICollection<UserRole>? UserRoles { get; set; }
    }



}


