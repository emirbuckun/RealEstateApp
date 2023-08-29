using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateApp.Api.Controllers;
using RealEstateApp.Api.DTO.EstateStatus;
using RealEstateApp.Api.DTO.EstateType;

namespace RealEstateApp.Tests
{
  public class EstateStatusControllerTests
  {
    [Fact]
    public async void GetAll_ReturnsOkAndListOfItems()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateStatusController>().Build();

      // Act
      var result = await controller.GetAll();

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<List<InfoEstateStatus>>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
    }

    [Fact]
    public async void GetById_ValidId_ReturnsOkAndCorrectItem()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateStatusController>().Build();
      int validId = 1;

      // Act
      var result = await controller.GetById(validId);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<InfoEstateStatus>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedItem = okResult.Value as InfoEstateStatus;
      Assert.Equal(validId, returnedItem?.Id);
    }

    [Fact]
    public async void GetById_InvalidId_ReturnsNotFound()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateStatusController>().Build();
      int invalidId = 0;

      // Act
      var result = await controller.GetById(invalidId);

      // Assert
      Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async void Post_ValidInput_ReturnsOkAndAddedItem()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateStatusController>().WithDefaultIdentity().Build();
      NewEstateStatus toBeAdded = new() { Name = "Test4" };

      // Act
      var result = await controller.Post(toBeAdded);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<InfoEstateStatus>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedItem = okResult.Value as InfoEstateStatus;
      Assert.Equal(toBeAdded.Name, returnedItem?.Name);
    }

    [Fact]
    public async void Put_ValidInput_ReturnsOkAndUpdatedItem()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateStatusController>().WithDefaultIdentity().Build();
      EditEstateStatus toBeUpdated = new() { Id = 2, Name = "Rent" };
      toBeUpdated.Name = "New Name";

      // Act
      var result = await controller.Put(toBeUpdated);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<InfoEstateStatus>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedItem = okResult.Value as InfoEstateStatus;
      Assert.Equal(toBeUpdated.Id, returnedItem?.Id);
      Assert.Equal(toBeUpdated.Name, returnedItem?.Name);
    }

    [Fact]
    public async void Put_InvalidInput_ReturnsNotFound()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateStatusController>().WithDefaultIdentity().Build();
      EditEstateStatus toBeUpdated = new() { Id = 0, Name = "Test" };

      // Act
      var result = await controller.Put(toBeUpdated);

      // Assert
      Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async void Delete_ValidId_ReturnsNoContent()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateStatusController>().WithDefaultIdentity().Build();
      int validId = 2;

      // Act
      var result = await controller.Delete(validId);

      // Assert
      Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async void Delete_InvalidId_ReturnsNotFound()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateStatusController>().WithDefaultIdentity().Build();
      int invalidId = 0;

      // Act
      var result = await controller.Delete(invalidId);

      // Assert
      Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async void Delete_WithRelation_ReturnsBadRequestObjectResult()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateStatusController>().WithDefaultIdentity().Build();
      int invalidId = 1;

      // Act
      var result = await controller.Delete(invalidId);

      // Assert
      Assert.IsType<NotFoundResult>(result);
    }
  }
}