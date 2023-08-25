using EntityFrameworkCoreMock;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.DatabaseContext;
using RealEstateApp.Api.Entity;

namespace RealEstateApp.Tests
{
  public class ContextBuilder
  {
    public static DbContextMock<RealEstateContext> Build() => GetDbContext();

    private static DbContextMock<RealEstateContext> GetDbContext()
    {
      DbContextMock<RealEstateContext> dbContextMock = new(new DbContextOptionsBuilder<RealEstateContext>().Options);
      dbContextMock.CreateDbSetMock(x => x.EstateTypes, GetInitialEstateTypes());
      dbContextMock.CreateDbSetMock(x => x.EstateStatuses, GetInitialEstateStatuses());
      dbContextMock.CreateDbSetMock(x => x.Currencies, GetInitialCurrencies());
      dbContextMock.CreateDbSetMock(x => x.Prices, GetInitialPrices());
      dbContextMock.CreateDbSetMock(x => x.Estates, GetInitialEstates());
      return dbContextMock;
    }

    private static EstateType[] GetInitialEstateTypes()
    {
      return new EstateType[]
      {
        new EstateType { Id = 1, Name = "Villa" },
        new EstateType { Id = 2, Name = "Apartment" },
        new EstateType { Id = 3, Name = "Land" },
      };
    }

    private static EstateStatus[] GetInitialEstateStatuses()
    {
      return new EstateStatus[]
      {
        new EstateStatus { Id = 1, Name = "Sale" },
        new EstateStatus { Id = 2, Name = "Rent" },
      };
    }

    private static Currency[] GetInitialCurrencies()
    {
      return new Currency[]
      {
        new Currency { Id = 1, Name = "Turkish Liras", Code = "TRY" },
        new Currency { Id = 2, Name = "Euro", Code = "EUR" },
        new Currency { Id = 3, Name = "Dolar", Code = "USD" },
      };
    }

    private static Price[] GetInitialPrices()
    {
      return new Price[]
      {
        new Price { Id = 1, Amount = 100, CurrencyId = 1, EstateId = 1 },
        new Price { Id = 2, Amount = 200, CurrencyId = 2, EstateId = 2 },
        new Price { Id = 3, Amount = 300, CurrencyId = 3, EstateId = 3 },
      };
    }

    private static Estate[] GetInitialEstates()
    {
      return new Estate[]
      {
        new Estate { Id = 1, Name = "Estate#1", Latitude = 15, Longitude = 20, StartDate = DateTime.Now, EndDate = DateTime.Today.AddDays(1), EstateTypeId = 1, EstateStatusId = 1 },
        new Estate { Id = 2, Name = "Estate#2", Latitude = 15, Longitude = 20, StartDate = DateTime.Now, EndDate = DateTime.Today.AddDays(1), EstateTypeId = 2, EstateStatusId = 2 },
        new Estate { Id = 3, Name = "Estate#3", Latitude = 15, Longitude = 20, StartDate = DateTime.Now, EndDate = DateTime.Today.AddDays(1), EstateTypeId = 3, EstateStatusId = 1 },
      };
    }
  }
}