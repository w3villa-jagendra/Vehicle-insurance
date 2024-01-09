using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleInsuranceApi.Migrations
{
    /// <inheritdoc />
    public partial class RenameRoleFieldtoUserRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Role",
                table: "Users",
                newName: "UserRole");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserRole",
                table: "Users",
                newName: "Role");
        }
    }
}
