using EntityFrameworkCoreMock;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Controllers;
using RealEstateApp.Api.DatabaseContext;
using RealEstateApp.Api.DTO.EstateType;
using RealEstateApp.Api.Entity;

namespace RealEstateApp.Tests
{
  public class EstateTypeControllerTests
  {
    private static DbContextMock<RealEstateContext> GetDbContext(EstateType[] initialEntities)
    {
      DbContextMock<RealEstateContext> dbContextMock = new(new DbContextOptionsBuilder<RealEstateContext>().Options);
      dbContextMock.CreateDbSetMock(x => x.EstateTypes, initialEntities);
      return dbContextMock;
    }

    private static EstateTypeController EstateTypeControllerInit(DbContextMock<RealEstateContext> dbContextMock)
    {
      return new EstateTypeController(dbContextMock.Object);
    }

    private static EstateType[] GetInitialDbEntities()
    {
      return new EstateType[]
      {
        new EstateType {Id = 1, Name="Test1" },
        new EstateType {Id = 2, Name="Test2" },
        new EstateType {Id = 3, Name="Test3"},
      };
    }

    [Fact]
    public async void GetAll_DataExist_ReturnsOK()
    {
      // Arrange
      DbContextMock<RealEstateContext> dbContextMock = GetDbContext(GetInitialDbEntities());
      EstateTypeController estateTypeController = EstateTypeControllerInit(dbContextMock);

      // Act
      var result = await estateTypeController.GetAll();

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
    }
  }
}