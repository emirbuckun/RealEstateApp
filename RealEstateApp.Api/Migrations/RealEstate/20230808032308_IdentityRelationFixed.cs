using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateApp.Api.Migrations.RealEstate
{
    /// <inheritdoc />
    public partial class IdentityRelationFixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Currencies_IdentityUser_CreatedById1",
                table: "Currencies");

            migrationBuilder.DropForeignKey(
                name: "FK_Currencies_IdentityUser_UpdatedById1",
                table: "Currencies");

            migrationBuilder.DropForeignKey(
                name: "FK_EstatePhotos_IdentityUser_CreatedById1",
                table: "EstatePhotos");

            migrationBuilder.DropForeignKey(
                name: "FK_EstatePhotos_IdentityUser_UpdatedById1",
                table: "EstatePhotos");

            migrationBuilder.DropForeignKey(
                name: "FK_EstatePrices_IdentityUser_CreatedById1",
                table: "EstatePrices");

            migrationBuilder.DropForeignKey(
                name: "FK_EstatePrices_IdentityUser_UpdatedById1",
                table: "EstatePrices");

            migrationBuilder.DropForeignKey(
                name: "FK_Estates_IdentityUser_CreatedById1",
                table: "Estates");

            migrationBuilder.DropForeignKey(
                name: "FK_Estates_IdentityUser_UpdatedById1",
                table: "Estates");

            migrationBuilder.DropForeignKey(
                name: "FK_EstateStatuses_IdentityUser_CreatedById1",
                table: "EstateStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_EstateStatuses_IdentityUser_UpdatedById1",
                table: "EstateStatuses");

            migrationBuilder.DropForeignKey(
                name: "FK_EstateTypes_IdentityUser_CreatedById1",
                table: "EstateTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_EstateTypes_IdentityUser_UpdatedById1",
                table: "EstateTypes");

            migrationBuilder.DropTable(
                name: "IdentityUser");

            migrationBuilder.DropIndex(
                name: "IX_EstateTypes_CreatedById1",
                table: "EstateTypes");

            migrationBuilder.DropIndex(
                name: "IX_EstateTypes_UpdatedById1",
                table: "EstateTypes");

            migrationBuilder.DropIndex(
                name: "IX_EstateStatuses_CreatedById1",
                table: "EstateStatuses");

            migrationBuilder.DropIndex(
                name: "IX_EstateStatuses_UpdatedById1",
                table: "EstateStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Estates_CreatedById1",
                table: "Estates");

            migrationBuilder.DropIndex(
                name: "IX_Estates_UpdatedById1",
                table: "Estates");

            migrationBuilder.DropIndex(
                name: "IX_EstatePrices_CreatedById1",
                table: "EstatePrices");

            migrationBuilder.DropIndex(
                name: "IX_EstatePrices_UpdatedById1",
                table: "EstatePrices");

            migrationBuilder.DropIndex(
                name: "IX_EstatePhotos_CreatedById1",
                table: "EstatePhotos");

            migrationBuilder.DropIndex(
                name: "IX_EstatePhotos_UpdatedById1",
                table: "EstatePhotos");

            migrationBuilder.DropIndex(
                name: "IX_Currencies_CreatedById1",
                table: "Currencies");

            migrationBuilder.DropIndex(
                name: "IX_Currencies_UpdatedById1",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "EstateTypes");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "EstateTypes");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "EstateTypes");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "EstateTypes");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "EstateStatuses");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "EstateStatuses");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "EstateStatuses");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "EstateStatuses");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Estates");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "Estates");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "Estates");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "Estates");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "EstatePrices");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "EstatePrices");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "EstatePrices");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "EstatePrices");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "EstatePhotos");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "EstatePhotos");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "EstatePhotos");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "EstatePhotos");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "UpdatedById",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "Currencies");

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "EstateTypes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "EstateTypes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "EstateStatuses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "EstateStatuses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Estates",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "Estates",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "EstatePrices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "EstatePrices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "EstatePhotos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "EstatePhotos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Currencies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "Currencies",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "EstateTypes");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "EstateTypes");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "EstateStatuses");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "EstateStatuses");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Estates");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Estates");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "EstatePrices");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "EstatePrices");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "EstatePhotos");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "EstatePhotos");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Currencies");

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "EstateTypes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "EstateTypes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedById",
                table: "EstateTypes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "EstateTypes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "EstateStatuses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "EstateStatuses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedById",
                table: "EstateStatuses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "EstateStatuses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "Estates",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "Estates",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedById",
                table: "Estates",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "Estates",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "EstatePrices",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "EstatePrices",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedById",
                table: "EstatePrices",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "EstatePrices",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "EstatePhotos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "EstatePhotos",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedById",
                table: "EstatePhotos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "EstatePhotos",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedById",
                table: "Currencies",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "Currencies",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedById",
                table: "Currencies",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "Currencies",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "IdentityUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityUser", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EstateTypes_CreatedById1",
                table: "EstateTypes",
                column: "CreatedById1");

            migrationBuilder.CreateIndex(
                name: "IX_EstateTypes_UpdatedById1",
                table: "EstateTypes",
                column: "UpdatedById1");

            migrationBuilder.CreateIndex(
                name: "IX_EstateStatuses_CreatedById1",
                table: "EstateStatuses",
                column: "CreatedById1");

            migrationBuilder.CreateIndex(
                name: "IX_EstateStatuses_UpdatedById1",
                table: "EstateStatuses",
                column: "UpdatedById1");

            migrationBuilder.CreateIndex(
                name: "IX_Estates_CreatedById1",
                table: "Estates",
                column: "CreatedById1");

            migrationBuilder.CreateIndex(
                name: "IX_Estates_UpdatedById1",
                table: "Estates",
                column: "UpdatedById1");

            migrationBuilder.CreateIndex(
                name: "IX_EstatePrices_CreatedById1",
                table: "EstatePrices",
                column: "CreatedById1");

            migrationBuilder.CreateIndex(
                name: "IX_EstatePrices_UpdatedById1",
                table: "EstatePrices",
                column: "UpdatedById1");

            migrationBuilder.CreateIndex(
                name: "IX_EstatePhotos_CreatedById1",
                table: "EstatePhotos",
                column: "CreatedById1");

            migrationBuilder.CreateIndex(
                name: "IX_EstatePhotos_UpdatedById1",
                table: "EstatePhotos",
                column: "UpdatedById1");

            migrationBuilder.CreateIndex(
                name: "IX_Currencies_CreatedById1",
                table: "Currencies",
                column: "CreatedById1");

            migrationBuilder.CreateIndex(
                name: "IX_Currencies_UpdatedById1",
                table: "Currencies",
                column: "UpdatedById1");

            migrationBuilder.AddForeignKey(
                name: "FK_Currencies_IdentityUser_CreatedById1",
                table: "Currencies",
                column: "CreatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Currencies_IdentityUser_UpdatedById1",
                table: "Currencies",
                column: "UpdatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstatePhotos_IdentityUser_CreatedById1",
                table: "EstatePhotos",
                column: "CreatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstatePhotos_IdentityUser_UpdatedById1",
                table: "EstatePhotos",
                column: "UpdatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstatePrices_IdentityUser_CreatedById1",
                table: "EstatePrices",
                column: "CreatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstatePrices_IdentityUser_UpdatedById1",
                table: "EstatePrices",
                column: "UpdatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Estates_IdentityUser_CreatedById1",
                table: "Estates",
                column: "CreatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Estates_IdentityUser_UpdatedById1",
                table: "Estates",
                column: "UpdatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstateStatuses_IdentityUser_CreatedById1",
                table: "EstateStatuses",
                column: "CreatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstateStatuses_IdentityUser_UpdatedById1",
                table: "EstateStatuses",
                column: "UpdatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstateTypes_IdentityUser_CreatedById1",
                table: "EstateTypes",
                column: "CreatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EstateTypes_IdentityUser_UpdatedById1",
                table: "EstateTypes",
                column: "UpdatedById1",
                principalTable: "IdentityUser",
                principalColumn: "Id");
        }
    }
}
