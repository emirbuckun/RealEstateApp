using System.Security.Claims;
using EntityFrameworkCoreMock;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Controllers;
using RealEstateApp.Api.DatabaseContext;
using RealEstateApp.Api.Entity;

namespace RealEstateApp.Tests
{
  public class ControllerBuilder
  {
    private readonly ClaimsIdentity _identity;
    private readonly ClaimsPrincipal _user;
    private readonly ControllerContext _controllerContext;

    public ControllerBuilder()
    {
      _identity = new ClaimsIdentity();
      _user = new ClaimsPrincipal(_identity);
      _controllerContext = new ControllerContext { HttpContext = new DefaultHttpContext { User = _user } };
    }

    public ControllerBuilder WithClaims(IDictionary<string, string> claims)
    {
      _identity.AddClaims(claims.Select(c => new Claim(c.Key, c.Value)));
      return this;
    }

    public ControllerBuilder WithIdentity(string username)
    {
      _identity.AddClaims(new[]
      {
          new Claim("username", username)
      });
      return this;
    }

    public ControllerBuilder WithDefaultIdentity()
    {
      _identity.AddClaims(new[]
      {
          new Claim("username", "emirbuckun")
      });
      return this;
    }

    public EstateTypeController Build()
    {
      DbContextMock<RealEstateContext> dbContextMock = GetDbContext(GetInitialDbEntities());
      return EstateTypeControllerInit(dbContextMock);
    }

    private static DbContextMock<RealEstateContext> GetDbContext(EstateType[] initialEntities)
    {
      DbContextMock<RealEstateContext> dbContextMock = new(new DbContextOptionsBuilder<RealEstateContext>().Options);
      dbContextMock.CreateDbSetMock(x => x.EstateTypes, initialEntities);
      return dbContextMock;
    }

    private EstateTypeController EstateTypeControllerInit(DbContextMock<RealEstateContext> dbContextMock)
    {
      return new EstateTypeController(dbContextMock.Object)
      {
        ControllerContext = _controllerContext
      };
    }

    public static EstateType[] GetInitialDbEntities()
    {
      return new EstateType[]
      {
        new EstateType {Id = 1, Name="Test1" },
        new EstateType {Id = 2, Name="Test2" },
        new EstateType {Id = 3, Name="Test3"},
      };
    }
  }
}