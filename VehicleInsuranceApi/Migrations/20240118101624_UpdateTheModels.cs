using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleInsuranceApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTheModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plans_Users_UserId",
                table: "Plans");

            migrationBuilder.AddColumn<int>(
                name: "PlanId",
                table: "Vehicles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "PlansPlanId",
                table: "Vehicles",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_PlansPlanId",
                table: "Vehicles",
                column: "PlansPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_Users_UserId",
                table: "Plans",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Plans_PlansPlanId",
                table: "Vehicles",
                column: "PlansPlanId",
                principalTable: "Plans",
                principalColumn: "PlanId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plans_Users_UserId",
                table: "Plans");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Plans_PlansPlanId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_PlansPlanId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "PlanId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "PlansPlanId",
                table: "Vehicles");

            migrationBuilder.AddForeignKey(
                name: "FK_Plans_Users_UserId",
                table: "Plans",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
