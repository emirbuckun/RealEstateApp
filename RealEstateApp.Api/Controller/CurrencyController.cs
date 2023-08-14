using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Auth;
using RealEstateApp.Api.DTO.Currency;
using RealEstateApp.Api.DatabaseContext;

namespace RealEstateApp.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class CurrencyController : ControllerBase
  {
    private readonly RealEstateContext _realEstateContext;

    public CurrencyController(RealEstateContext realEstateContext)
    {
      _realEstateContext = realEstateContext;
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    [Route("list")]
    public async Task<IActionResult> GetAll()
    {
      var result = await _realEstateContext.Currencies.Where(x => !x.IsDeleted).ToListAsync();
      if (result == null) return NotFound();
      var list = new List<InfoCurrency>();
      result.ForEach(x => list.Add(new InfoCurrency(x)));
      return Ok(list);
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
      var result = await _realEstateContext.Currencies.SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
      if (result != null) return Ok(new InfoCurrency(result));
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] NewCurrency request)
    {
      var username = User.Claims.First(x => x.Type == "username").Value;

      var newItem = request.ToCurrency();
      newItem.CreatedAt = DateTime.Now;
      newItem.CreatedBy = username;

      var result = _realEstateContext.Currencies.Add(newItem);
      await _realEstateContext.SaveChangesAsync();
      return Ok(result.Entity);
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    public async Task<IActionResult> Put([FromBody] EditCurrency request)
    {
      var item = await _realEstateContext.Currencies.SingleOrDefaultAsync(x => x.Id == request.Id && !x.IsDeleted);
      if (item != null)
      {
        var username = User.Claims.First(x => x.Type == "username").Value;

        item.Name = request.Name;
        item.Code = request.Code;
        item.UpdatedBy = username;
        item.UpdatedAt = DateTime.Now;

        var result = await _realEstateContext.SaveChangesAsync();
        return Ok(new InfoCurrency(item));
      }
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
      var item = await _realEstateContext.Currencies.SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
      if (item != null)
      {
        var username = User.Claims.First(x => x.Type == "username").Value;

        item.IsDeleted = true;
        item.UpdatedBy = username;
        item.UpdatedAt = DateTime.Now;

        var result = await _realEstateContext.SaveChangesAsync();
        return NoContent();
      }
      return NotFound();
    }
  }
}
