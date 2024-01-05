using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleInsuranceApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTablesIdName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RolePermission_Permission_PermissionID",
                table: "RolePermission");

            migrationBuilder.DropForeignKey(
                name: "FK_RolePermission_Role_RoleID",
                table: "RolePermission");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProfile_Users_UserID",
                table: "UserProfile");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRole_Role_RoleID",
                table: "UserRole");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRole_Users_UserID",
                table: "UserRole");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Users_OwnerID",
                table: "Vehicles");

            migrationBuilder.RenameColumn(
                name: "OwnerID",
                table: "Vehicles",
                newName: "OwnerId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Vehicles",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_OwnerID",
                table: "Vehicles",
                newName: "IX_Vehicles_OwnerId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "UserRole",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "RoleID",
                table: "UserRole",
                newName: "RoleId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "UserRole",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_UserRole_UserID",
                table: "UserRole",
                newName: "IX_UserRole_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserRole_RoleID",
                table: "UserRole",
                newName: "IX_UserRole_RoleId");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "UserProfile",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "UserProfile",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_UserProfile_UserID",
                table: "UserProfile",
                newName: "IX_UserProfile_UserId");

            migrationBuilder.RenameColumn(
                name: "RoleID",
                table: "RolePermission",
                newName: "RoleId");

            migrationBuilder.RenameColumn(
                name: "PermissionID",
                table: "RolePermission",
                newName: "PermissionId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "RolePermission",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_RolePermission_RoleID",
                table: "RolePermission",
                newName: "IX_RolePermission_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_RolePermission_PermissionID",
                table: "RolePermission",
                newName: "IX_RolePermission_PermissionId");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Role",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Permission",
                newName: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RolePermission_Permission_PermissionId",
                table: "RolePermission",
                column: "PermissionId",
                principalTable: "Permission",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RolePermission_Role_RoleId",
                table: "RolePermission",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfile_Users_UserId",
                table: "UserProfile",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRole_Role_RoleId",
                table: "UserRole",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRole_Users_UserId",
                table: "UserRole",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Users_OwnerId",
                table: "Vehicles",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RolePermission_Permission_PermissionId",
                table: "RolePermission");

            migrationBuilder.DropForeignKey(
                name: "FK_RolePermission_Role_RoleId",
                table: "RolePermission");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProfile_Users_UserId",
                table: "UserProfile");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRole_Role_RoleId",
                table: "UserRole");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRole_Users_UserId",
                table: "UserRole");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Users_OwnerId",
                table: "Vehicles");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Vehicles",
                newName: "OwnerID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Vehicles",
                newName: "ID");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_OwnerId",
                table: "Vehicles",
                newName: "IX_Vehicles_OwnerID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Users",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserRole",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "UserRole",
                newName: "RoleID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UserRole",
                newName: "ID");

            migrationBuilder.RenameIndex(
                name: "IX_UserRole_UserId",
                table: "UserRole",
                newName: "IX_UserRole_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_UserRole_RoleId",
                table: "UserRole",
                newName: "IX_UserRole_RoleID");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserProfile",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UserProfile",
                newName: "ID");

            migrationBuilder.RenameIndex(
                name: "IX_UserProfile_UserId",
                table: "UserProfile",
                newName: "IX_UserProfile_UserID");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "RolePermission",
                newName: "RoleID");

            migrationBuilder.RenameColumn(
                name: "PermissionId",
                table: "RolePermission",
                newName: "PermissionID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "RolePermission",
                newName: "ID");

            migrationBuilder.RenameIndex(
                name: "IX_RolePermission_RoleId",
                table: "RolePermission",
                newName: "IX_RolePermission_RoleID");

            migrationBuilder.RenameIndex(
                name: "IX_RolePermission_PermissionId",
                table: "RolePermission",
                newName: "IX_RolePermission_PermissionID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Role",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Permission",
                newName: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_RolePermission_Permission_PermissionID",
                table: "RolePermission",
                column: "PermissionID",
                principalTable: "Permission",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RolePermission_Role_RoleID",
                table: "RolePermission",
                column: "RoleID",
                principalTable: "Role",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfile_Users_UserID",
                table: "UserProfile",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRole_Role_RoleID",
                table: "UserRole",
                column: "RoleID",
                principalTable: "Role",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRole_Users_UserID",
                table: "UserRole",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Users_OwnerID",
                table: "Vehicles",
                column: "OwnerID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
