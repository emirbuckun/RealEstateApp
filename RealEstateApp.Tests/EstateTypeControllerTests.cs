using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateApp.Api.DTO.EstateType;
using RealEstateApp.Api.Entity;

namespace RealEstateApp.Tests
{
  public class EstateTypeControllerTests
  {
    [Fact]
    public async void GetAll_ReturnsOK()
    {
      // Arrange
      var estateTypeController = new ControllerBuilder().WithDefaultIdentity().Build();

      // Act
      var result = await estateTypeController.GetAll();

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<List<InfoEstateType>>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
    }

    [Fact]
    public async void GetById_ValidId_ReturnsCorrectResult()
    {
      // Arrange
      int expectedId = 1;
      var estateTypeController = new ControllerBuilder().WithDefaultIdentity().Build();

      // Act
      var result = await estateTypeController.GetById(expectedId);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<InfoEstateType>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedEstateType = okResult.Value as InfoEstateType;
      Assert.Equal(expectedId, returnedEstateType?.Id);
    }

    [Fact]
    public async void GetById_InvalidId_ReturnsNotFound()
    {
      // Arrange
      int invalidId = 0;
      var estateTypeController = new ControllerBuilder().WithDefaultIdentity().Build();

      // Act
      var result = await estateTypeController.GetById(invalidId);

      // Assert
      Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async void Post_ValidInput_ReturnsOKAndAddedItem()
    {
      // Arrange
      var estateTypeController = new ControllerBuilder().WithDefaultIdentity().Build();
      NewEstateType toBeAdded = new() { Name = "Test4" };

      // Act
      var result = await estateTypeController.Post(toBeAdded);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<EstateType>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedEstateType = okResult.Value as EstateType;
      Assert.Equal(toBeAdded.Name, returnedEstateType?.Name);
    }

    [Fact]
    public async void Put_ValidInput_ReturnsOKAndUpdatedItem()
    {
      // Arrange
      var estateTypeController = new ControllerBuilder().WithDefaultIdentity().Build();
      EditEstateType toBeUpdated = new() { Id = 3, Name = "Test3" };
      toBeUpdated.Name = "New Name";

      // Act
      var result = await estateTypeController.Put(toBeUpdated);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<InfoEstateType>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedEstateType = okResult.Value as InfoEstateType;
      Assert.Equal(toBeUpdated.Id, returnedEstateType?.Id);
      Assert.Equal(toBeUpdated.Name, returnedEstateType?.Name);
    }

    [Fact]
    public async void Put_InvalidInput_ReturnsNotFound()
    {
      // Arrange
      var estateTypeController = new ControllerBuilder().WithDefaultIdentity().Build();
      EditEstateType toBeUpdated = new() { Id = 0, Name = "Test" };

      // Act
      var result = await estateTypeController.Put(toBeUpdated);

      // Assert
      Assert.IsType<NotFoundResult>(result);
    }
  }
}