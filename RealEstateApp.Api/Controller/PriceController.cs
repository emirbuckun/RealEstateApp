using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Auth;
using RealEstateApp.Api.DTO.Price;
using RealEstateApp.Api.DatabaseContext;
using System.Security.Claims;

namespace RealEstateApp.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class PriceController : ControllerBase
  {
    private readonly RealEstateContext _realEstateContext;

    public PriceController(RealEstateContext realEstateContext)
    {
      _realEstateContext = realEstateContext;
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    [Route("list")]
    public async Task<IActionResult> GetAll()
    {
      var result = await _realEstateContext.Prices.Where(x => !x.IsDeleted).ToListAsync();
      if (result == null) return NotFound();
      var list = new List<InfoPrice>();
      result.ForEach(x => list.Add(new InfoPrice(x)));
      return Ok(list);
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
      var result = await _realEstateContext.Prices.SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
      if (result != null) return Ok(new InfoPrice(result));
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] NewPrice request)
    {
      var username = User.Claims.First(x => x.Type == ClaimTypes.Name).Value;

      var newItem = request.ToPrice();
      newItem.CreatedAt = DateTime.Now;
      newItem.CreatedBy = username;

      var result = _realEstateContext.Prices.Add(newItem);
      await _realEstateContext.SaveChangesAsync();
      return Ok(result.Entity);
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    public async Task<IActionResult> Put([FromBody] EditPrice request)
    {
      var item = await _realEstateContext.Prices.SingleOrDefaultAsync(x => x.Id == request.Id && !x.IsDeleted);
      if (item != null)
      {
        var username = User.Claims.First(x => x.Type == ClaimTypes.Name).Value;

        item.Amount = request.Amount;
        item.CurrencyId = request.CurrencyId;
        item.UpdatedBy = username;
        item.UpdatedAt = DateTime.Now;

        var result = await _realEstateContext.SaveChangesAsync();
        return Ok(item);
      }
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
      var item = await _realEstateContext.Prices.SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
      if (item != null)
      {
        var username = User.Claims.First(x => x.Type == ClaimTypes.Name).Value;

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
