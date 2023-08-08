using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateApp.Api.Migrations.RealEstate
{
    /// <inheritdoc />
    public partial class AddCreatedUpdatedBy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "EstateTypes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "EstateTypes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "EstateStatuses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "EstateStatuses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Estates",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "Estates",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "EstatePrices",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "EstatePrices",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "EstatePhotos",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "EstatePhotos",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Currencies",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById",
                table: "Currencies",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "IdentityUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityUser", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EstateTypes_CreatedById",
                table: "EstateTypes",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EstateTypes_UpdatedById",
                table: "EstateTypes",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EstateStatuses_CreatedById",
                table: "EstateStatuses",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EstateStatuses_UpdatedById",
                table: "EstateStatuses",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Estates_CreatedById",
                table: "Estates",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Estates_UpdatedById",
                table: "Estates",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EstatePrices_CreatedById",
                table: "EstatePrices",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EstatePrices_UpdatedById",
                table: "EstatePrices",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EstatePhotos_CreatedById",
                table: "EstatePhotos",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EstatePhotos_UpdatedById",
                table: "EstatePhotos",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Currencies_CreatedById",
                table: "Currencies",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Currencies_UpdatedById",
                table: "Currencies",
                column: "UpdatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Currencies_IdentityUser_CreatedById",
                table: "Currencies",
                column: "CreatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Currencies_IdentityUser_UpdatedById",
                table: "Currencies",
                column: "UpdatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstatePhotos_IdentityUser_CreatedById",
                table: "EstatePhotos",
                column: "CreatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstatePhotos_IdentityUser_UpdatedById",
                table: "EstatePhotos",
                column: "UpdatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstatePrices_IdentityUser_CreatedById",
                table: "EstatePrices",
                column: "CreatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstatePrices_IdentityUser_UpdatedById",
                table: "EstatePrices",
                column: "UpdatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Estates_IdentityUser_CreatedById",
                table: "Estates",
                column: "CreatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Estates_IdentityUser_UpdatedById",
                table: "Estates",
                column: "UpdatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstateStatuses_IdentityUser_CreatedById",
                table: "EstateStatuses",
                column: "CreatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstateStatuses_IdentityUser_UpdatedById",
                table: "EstateStatuses",
                column: "UpdatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstateTypes_IdentityUser_CreatedById",
                table: "EstateTypes",
                column: "CreatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstateTypes_IdentityUser_UpdatedById",
                table: "EstateTypes",
                column: "UpdatedById",
                principalTable: "IdentityUser",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Currencies_IdentityUser_CreatedById",
                table: "Currencies");

            migrationBuilder.DropForeignKey(
                name: "FK_Currencies_IdentityUser_UpdatedById",
                table: "Currencies");

            migrationBuilder.DropForeignKey(
                name: "FK_EstatePhotos_IdentityUser_CreatedById",
                table: "EstatePhotos");

            migrationBuilder.DropForeignKey(
                name: "FK_EstatePhotos_IdentityUser_UpdatedById",
                table: "EstatePhotos");

            migrationBuilder.DropForeignKey(
                name: "FK_EstatePrices_IdentityUser_CreatedById",
                table: "EstatePrices");

            migrationBuilder.DropForeignKey(
                name: "FK_EstatePrices_IdentityUser_UpdatedById",
                table: "EstatePrices");

            migrationBuilder.DropForeignKey(
                name: "FK_Estates_IdentityUser_CreatedById",
                table: "Estates");

            migrationBuilder.DropForeignKey(
                name: "FK_Estates_IdentityUser_UpdatedById",
                table: "Estates");

            migrationBuilder.DropForeignKey(
                name: "FK_EstateStatuses_IdentityUser_CreatedById",
                table: "EstateStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_EstateStatuses_IdentityUser_UpdatedById",
                table: "EstateStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_EstateTypes_IdentityUser_CreatedById",
                table: "EstateTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_EstateTypes_IdentityUser_UpdatedById",
                table: "EstateTypes");

            migrationBuilder.DropTable(
                name: "IdentityUser");

            migrationBuilder.DropIndex(
                name: "IX_EstateTypes_CreatedById",
                table: "EstateTypes");

            migrationBuilder.DropIndex(
                name: "IX_EstateTypes_UpdatedById",
                table: "EstateTypes");

            migrationBuilder.DropIndex(
                name: "IX_EstateStatuses_CreatedById",
                table: "EstateStatuses");

            migrationBuilder.DropIndex(
                name: "IX_EstateStatuses_UpdatedById",
                table: "EstateStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Estates_CreatedById",
                table: "Estates");

            migrationBuilder.DropIndex(
                name: "IX_Estates_UpdatedById",
                table: "Estates");

            migrationBuilder.DropIndex(
                name: "IX_EstatePrices_CreatedById",
                table: "EstatePrices");

            migrationBuilder.DropIndex(
                name: "IX_EstatePrices_UpdatedById",
                table: "EstatePrices");

            migrationBuilder.DropIndex(
                name: "IX_EstatePhotos_CreatedById",
                table: "EstatePhotos");

            migrationBuilder.DropIndex(
                name: "IX_EstatePhotos_UpdatedById",
                table: "EstatePhotos");

            migrationBuilder.DropIndex(
                name: "IX_Currencies_CreatedById",
                table: "Currencies");

            migrationBuilder.DropIndex(
                name: "IX_Currencies_UpdatedById",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "EstateTypes");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "EstateTypes");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "EstateStatuses");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "EstateStatuses");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Estates");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "Estates");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "EstatePrices");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "EstatePrices");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "EstatePhotos");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "EstatePhotos");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "Currencies");
        }
    }
}
