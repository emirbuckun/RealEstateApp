using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateApp.Api.Controllers;
using RealEstateApp.Api.DTO.Estate;

namespace RealEstateApp.Tests
{
  public class EstateControllerTests
  {
    [Fact]
    public async void GetAll_ReturnsOkAndListOfItems()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateController>().Build();

      // Act
      var result = await controller.GetAll();

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<List<InfoEstate>>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
    }

    [Fact]
    public async void GetById_ValidId_ReturnsOkAndCorrectItem()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateController>().Build();
      int validId = 1;

      // Act
      var result = await controller.GetById(validId);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<DetailEstate>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedItem = okResult.Value as DetailEstate;
      Assert.Equal(validId, returnedItem?.Id);
    }

    [Fact]
    public async void GetById_InvalidId_ReturnsNotFound()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateController>().Build();
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
      var controller = new ControllerBuilder<EstateController>().WithDefaultIdentity().Build();
      NewEstate toBeAdded = new() { Name = "Estate#4", EstateTypeId = 1, EstateStatusId = 1 };

      // Act
      var result = await controller.Post(toBeAdded);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<InfoEstate>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedItem = okResult.Value as InfoEstate;
      Assert.Equal(toBeAdded.Name, returnedItem?.Name);
    }

    [Fact]
    public async void Post_InvalidInput_ReturnsNotFoundObjectResult()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateController>().WithDefaultIdentity().Build();
      NewEstate invalidType = new() { Name = "Estate#5", EstateTypeId = 15, EstateStatusId = 1 };
      NewEstate invalidStatus = new() { Name = "Estate#6", EstateTypeId = 1, EstateStatusId = 15 };

      // Act
      var invalidTypeResult = await controller.Post(invalidType);
      var invalidStatusResult = await controller.Post(invalidStatus);

      // Assert
      Assert.IsType<NotFoundObjectResult>(invalidTypeResult);
      Assert.IsType<NotFoundObjectResult>(invalidStatusResult);
    }

    [Fact]
    public async void Put_ValidInput_ReturnsOkAndUpdatedItem()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateController>().WithDefaultIdentity().Build();
      EditEstate toBeUpdated = new() { Id = 3, Name = "Estate#3", EstateTypeId = 1, EstateStatusId = 1 };
      toBeUpdated.Name = "New Name";

      // Act
      var result = await controller.Put(toBeUpdated);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<InfoEstate>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedItem = okResult.Value as InfoEstate;
      Assert.Equal(toBeUpdated.Id, returnedItem?.Id);
      Assert.Equal(toBeUpdated.Name, returnedItem?.Name);
    }

    [Fact]
    public async void Put_InvalidInput_ReturnsNotFoundObjectResult()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateController>().WithDefaultIdentity().Build();
      EditEstate invalidId = new() { Id = 0, Name = "Estate#5", EstateTypeId = 15, EstateStatusId = 1 };
      EditEstate invalidType = new() { Id = 1, Name = "Estate#5", EstateTypeId = 15, EstateStatusId = 1 };
      EditEstate invalidStatus = new() { Id = 2, Name = "Estate#6", EstateTypeId = 1, EstateStatusId = 15 };

      // Act
      var invalidIdResult = await controller.Put(invalidId);
      var invalidTypeResult = await controller.Put(invalidType);
      var invalidStatusResult = await controller.Put(invalidStatus);

      // Assert
      Assert.IsType<NotFoundObjectResult>(invalidIdResult);
      Assert.IsType<NotFoundObjectResult>(invalidTypeResult);
      Assert.IsType<NotFoundObjectResult>(invalidStatusResult);
    }

    [Fact]
    public async void Delete_ValidId_ReturnsNoContent()
    {
      // Arrange
      var controller = new ControllerBuilder<EstateController>().WithDefaultIdentity().Build();
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
      var controller = new ControllerBuilder<EstateController>().WithDefaultIdentity().Build();
      int invalidId = 0;

      // Act
      var result = await controller.Delete(invalidId);

      // Assert
      Assert.IsType<NotFoundResult>(result);
    }
  }
}