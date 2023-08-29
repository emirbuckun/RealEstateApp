using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Auth;
using RealEstateApp.Api.DTO.Price;
using RealEstateApp.Api.DatabaseContext;

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
      var result = await _realEstateContext.Prices
        .Include(x => x.Currency)
        .Include(x => x.Estate)
        .Where(x => !x.IsDeleted)
        .ToListAsync();

      if (result == null) return NotFound();
      var list = new List<InfoPrice>();
      result.ForEach(x => list.Add(new InfoPrice(x)));
      return Ok(list);
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
      var result = await _realEstateContext.Prices
        .Include(x => x.Currency)
        .Include(x => x.Estate)
        .SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
      if (result != null) return Ok(new DetailPrice(result));
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] NewPrice request)
    {
      var username = User.Claims.First(x => x.Type == "username").Value;
      var estate = await _realEstateContext.Estates.Where(x => !x.IsDeleted && x.Id == request.EstateId).SingleOrDefaultAsync();
      var currency = await _realEstateContext.Currencies.Where(x => !x.IsDeleted && x.Id == request.CurrencyId).SingleOrDefaultAsync();

      if (estate == null || currency == null)
        return NotFound("Estate or currency is not found!");

      var newItem = request.ToPrice();
      newItem.CreatedAt = DateTime.Now;
      newItem.CreatedBy = username;

      await _realEstateContext.Prices.AddAsync(newItem);
      await _realEstateContext.SaveChangesAsync();
      return Ok(new InfoPrice(newItem));
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    public async Task<IActionResult> Put([FromBody] EditPrice request)
    {
      var estate = await _realEstateContext.Estates.Where(x => !x.IsDeleted && x.Id == request.EstateId).SingleOrDefaultAsync();
      var currency = await _realEstateContext.Currencies.Where(x => !x.IsDeleted && x.Id == request.CurrencyId).SingleOrDefaultAsync();

      if (estate == null || currency == null)
        return NotFound("Estate or currency is not found!");

      var item = await _realEstateContext.Prices
              .Include(x => x.Currency)
              .Include(x => x.Estate)
              .SingleOrDefaultAsync(x => x.Id == request.Id && !x.IsDeleted);

      if (item != null)
      {
        var username = User.Claims.First(x => x.Type == "username").Value;

        item.Amount = request.Amount;
        item.CurrencyId = request.CurrencyId;
        item.EstateId = request.EstateId;
        item.UpdatedBy = username;
        item.UpdatedAt = DateTime.Now;

        await _realEstateContext.SaveChangesAsync();
        return Ok(new InfoPrice(item));
      }
      return NotFound("Price is not found!");
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
      var item = await _realEstateContext.Prices
        .Include(x => x.Currency)
        .Include(x => x.Estate)
        .SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
      if (item != null)
      {
        var username = User.Claims.First(x => x.Type == "username").Value;

        item.IsDeleted = true;
        item.UpdatedBy = username;
        item.UpdatedAt = DateTime.Now;

        await _realEstateContext.SaveChangesAsync();
        return NoContent();
      }
      return NotFound();
    }
  }
}
