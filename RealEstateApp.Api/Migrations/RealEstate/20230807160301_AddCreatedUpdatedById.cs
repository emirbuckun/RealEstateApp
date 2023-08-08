using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstateApp.Api.Migrations.RealEstate
{
    /// <inheritdoc />
    public partial class AddCreatedUpdatedById : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<Guid>(
                name: "UpdatedById",
                table: "EstateTypes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedById",
                table: "EstateTypes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "EstateTypes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "EstateTypes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "UpdatedById",
                table: "EstateStatuses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedById",
                table: "EstateStatuses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "EstateStatuses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "EstateStatuses",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "UpdatedById",
                table: "Estates",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedById",
                table: "Estates",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "Estates",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "Estates",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "UpdatedById",
                table: "EstatePrices",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedById",
                table: "EstatePrices",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "EstatePrices",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "EstatePrices",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "UpdatedById",
                table: "EstatePhotos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedById",
                table: "EstatePhotos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "EstatePhotos",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "EstatePhotos",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "UpdatedById",
                table: "Currencies",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedById",
                table: "Currencies",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById1",
                table: "Currencies",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedById1",
                table: "Currencies",
                type: "nvarchar(450)",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "CreatedById1",
                table: "EstateTypes");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "EstateTypes");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "EstateStatuses");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "EstateStatuses");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "Estates");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "Estates");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "EstatePrices");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "EstatePrices");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "EstatePhotos");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "EstatePhotos");

            migrationBuilder.DropColumn(
                name: "CreatedById1",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "UpdatedById1",
                table: "Currencies");

            migrationBuilder.AlterColumn<string>(
                name: "UpdatedById",
                table: "EstateTypes",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "EstateTypes",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "UpdatedById",
                table: "EstateStatuses",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "EstateStatuses",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "UpdatedById",
                table: "Estates",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Estates",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "UpdatedById",
                table: "EstatePrices",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "EstatePrices",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "UpdatedById",
                table: "EstatePhotos",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "EstatePhotos",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "UpdatedById",
                table: "Currencies",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Currencies",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

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
    }
}
