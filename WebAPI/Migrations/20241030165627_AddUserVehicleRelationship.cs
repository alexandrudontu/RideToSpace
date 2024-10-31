using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddUserVehicleRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_PostedBy",
                table: "Vehicles",
                column: "PostedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Users_PostedBy",
                table: "Vehicles",
                column: "PostedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Users_PostedBy",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_PostedBy",
                table: "Vehicles");
        }
    }
}
