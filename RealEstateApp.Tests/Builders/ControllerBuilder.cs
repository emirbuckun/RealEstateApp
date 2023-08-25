using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RealEstateApp.Tests
{
  public class ControllerBuilder<T> where T : ControllerBase
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

    public ControllerBuilder<T> WithClaims(IDictionary<string, string> claims)
    {
      _identity.AddClaims(claims.Select(c => new Claim(c.Key, c.Value)));
      return this;
    }

    public ControllerBuilder<T> WithIdentity(string username)
    {
      _identity.AddClaims(new[]
      {
          new Claim("username", username)
      });
      return this;
    }

    public ControllerBuilder<T> WithDefaultIdentity()
    {
      _identity.AddClaims(new[]
      {
          new Claim("username", "emirbuckun")
      });
      return this;
    }

    public T Build()
    {
      var dbContextMock = ContextBuilder.Build();
      var controllerInstance = Activator.CreateInstance(typeof(T), dbContextMock.Object) as T;
      controllerInstance!.ControllerContext = _controllerContext;
      return controllerInstance;
    }
  }
}