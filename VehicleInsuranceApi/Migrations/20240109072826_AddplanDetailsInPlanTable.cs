using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleInsuranceApi.Migrations
{
    /// <inheritdoc />
    public partial class AddplanDetailsInPlanTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PlanDetails",
                table: "Plans",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlanDetails",
                table: "Plans");
        }
    }
}
