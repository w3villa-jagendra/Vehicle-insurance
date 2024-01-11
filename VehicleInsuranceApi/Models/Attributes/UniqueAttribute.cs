using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace VehicleInsuranceApi.Models
{
    public class UniqueAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value == null || !(value is string currentValue))
        {
            // Handle null or non-string values as needed
            return ValidationResult.Success;
        }

        var dbContext = (VehicleDbContext?)validationContext?.GetService(typeof(VehicleDbContext));

        if (dbContext != null)
        {
            var isUsernameUnique = !dbContext.Users.Any(u => u.Username == currentValue);

            if (!isUsernameUnique)
            {
                return new ValidationResult(ErrorMessage);
            }
        }

        return ValidationResult.Success;
    }
}


}
