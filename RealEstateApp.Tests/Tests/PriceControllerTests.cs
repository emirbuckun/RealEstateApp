using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateApp.Api.Controllers;
using RealEstateApp.Api.DTO.Price;

namespace RealEstateApp.Tests
{
  public class PriceControllerTests
  {
    [Fact]
    public async void GetAll_ReturnsOkAndListOfItems()
    {
      // Arrange
      var controller = new ControllerBuilder<PriceController>().Build();

      // Act
      var result = await controller.GetAll();

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<List<InfoPrice>>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);
    }

    [Fact]
    public async void GetById_ValidId_ReturnsOkAndCorrectItem()
    {
      // Arrange
      var controller = new ControllerBuilder<PriceController>().Build();
      int validId = 1;

      // Act
      var result = await controller.GetById(validId);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<DetailPrice>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedItem = okResult.Value as DetailPrice;
      Assert.Equal(validId, returnedItem?.Id);
    }

    [Fact]
    public async void GetById_InvalidId_ReturnsNotFound()
    {
      // Arrange
      var controller = new ControllerBuilder<PriceController>().Build();
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
      var controller = new ControllerBuilder<PriceController>().WithDefaultIdentity().Build();
      NewPrice toBeAdded = new() { Amount = 400, CurrencyId = 3, EstateId = 2 };

      // Act
      var result = await controller.Post(toBeAdded);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<InfoPrice>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedItem = okResult.Value as InfoPrice;
      Assert.Equal(toBeAdded.Amount, returnedItem?.Amount);
    }

    [Fact]
    public async void Post_InvalidInput_ReturnsNotFoundObjectResult()
    {
      // Arrange
      var controller = new ControllerBuilder<PriceController>().WithDefaultIdentity().Build();
      NewPrice invalidCurrency = new() { Amount = 50, CurrencyId = 15, EstateId = 1 };
      NewPrice invalidEstate = new() { Amount = 50, CurrencyId = 1, EstateId = 15 };

      // Act
      var invalidCurrencyResult = await controller.Post(invalidCurrency);
      var invalidEstateResult = await controller.Post(invalidEstate);

      // Assert
      Assert.IsType<NotFoundObjectResult>(invalidCurrencyResult);
      Assert.IsType<NotFoundObjectResult>(invalidEstateResult);
    }

    [Fact]
    public async void Put_ValidInput_ReturnsOkAndUpdatedItem()
    {
      // Arrange
      var controller = new ControllerBuilder<PriceController>().WithDefaultIdentity().Build();
      EditPrice toBeUpdated = new() { Id = 1, Amount = 100, CurrencyId = 1, EstateId = 1 };
      toBeUpdated.Amount = 500;
      toBeUpdated.CurrencyId = 3;

      // Act
      var result = await controller.Put(toBeUpdated);

      // Assert
      var okResult = Assert.IsType<OkObjectResult>(result);
      Assert.NotNull(okResult);
      Assert.IsType<InfoPrice>(okResult.Value);
      Assert.Equal(StatusCodes.Status200OK, okResult.StatusCode);

      var returnedItem = okResult.Value as InfoPrice;
      Assert.Equal(toBeUpdated.Id, returnedItem?.Id);
      Assert.Equal(toBeUpdated.Amount, returnedItem?.Amount);
    }

    [Fact]
    public async void Put_InvalidInput_ReturnsNotFoundObjectResult()
    {
      // Arrange
      var controller = new ControllerBuilder<PriceController>().WithDefaultIdentity().Build();
      EditPrice invalidId = new() { Id = 0, Amount = 50, CurrencyId = 1, EstateId = 1 };
      EditPrice invalidCurrency = new() { Id = 1, Amount = 50, CurrencyId = 15, EstateId = 1 };
      EditPrice invalidEstate = new() { Id = 1, Amount = 50, CurrencyId = 1, EstateId = 15 };

      // Act
      var invalidIdResult = await controller.Put(invalidId);
      var invalidCurrencyResult = await controller.Put(invalidCurrency);
      var invalidEstateResult = await controller.Put(invalidEstate);

      // Assert
      Assert.IsType<NotFoundObjectResult>(invalidIdResult);
      Assert.IsType<NotFoundObjectResult>(invalidCurrencyResult);
      Assert.IsType<NotFoundObjectResult>(invalidEstateResult);
    }

    [Fact]
    public async void Delete_ValidId_ReturnsNoContent()
    {
      // Arrange
      var controller = new ControllerBuilder<PriceController>().WithDefaultIdentity().Build();
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
      var controller = new ControllerBuilder<PriceController>().WithDefaultIdentity().Build();
      int invalidId = 0;

      // Act
      var result = await controller.Delete(invalidId);

      // Assert
      Assert.IsType<NotFoundResult>(result);
    }
  }
}