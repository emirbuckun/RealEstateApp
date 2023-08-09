using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Auth;
using RealEstateApp.Api.DTO.Estate;
using RealEstateApp.Api.DatabaseContext;
using System.Security.Claims;

namespace RealEstateApp.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class EstateController : ControllerBase
  {
    private readonly RealEstateContext _realEstateContext;

    public EstateController(RealEstateContext realEstateContext)
    {
      _realEstateContext = realEstateContext;
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    [Route("list")]
    public async Task<IActionResult> GetAll()
    {
      var result = await _realEstateContext.Estates
        .Include(x => x.EstateType)
        .Include(x => x.EstateStatus)
        .Include(x => x.Photos)
        .Include(x => x.Prices)
        .ThenInclude(price => price.Currency)
        .Where(x => !x.IsDeleted)
        .ToListAsync();

      if (result == null) return NotFound();

      var list = new List<InfoEstate>();
      result.ForEach(x => list.Add(new InfoEstate(x)));
      return Ok(list);
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
      var result = await _realEstateContext.Estates
        .Include(x => x.EstateType)
        .Include(x => x.EstateStatus)
        .Where(x => !x.IsDeleted)
        .SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
      if (result != null) return Ok(new InfoEstate(result));
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] NewEstate request)
    {
      var username = User.Claims.First(x => x.Type == ClaimTypes.Name).Value;
      var currentTime = DateTime.Now;

      var newItem = request.ToEstate();
      newItem.StartDate = currentTime;
      newItem.CreatedAt = currentTime;
      newItem.CreatedBy = username;
      var result = _realEstateContext.Estates.Add(newItem);
      await _realEstateContext.SaveChangesAsync();

      var newEntity = _realEstateContext.Estates
        .Include(x => x.EstateType)
        .Include(x => x.EstateStatus)
        .Where(x => !x.IsDeleted)
        .Single(x => x.Id == result.Entity.Id);
      return Ok(new InfoEstate(newEntity));
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    public async Task<IActionResult> Put([FromBody] EditEstate request)
    {
      var item = await _realEstateContext.Estates
        .Include(x => x.EstateType)
        .Include(x => x.EstateStatus)
        .Where(x => !x.IsDeleted)
        .SingleOrDefaultAsync(x => x.Id == request.Id && !x.IsDeleted);

      if (item != null)
      {
        var username = User.Claims.First(x => x.Type == ClaimTypes.Name).Value;

        item.Name = request.Name;
        item.Latitude = request.Latitude;
        item.Longitude = request.Longitude;
        // item.StartDate = request.StartDate;
        item.EndDate = request.EndDate;
        item.EstateTypeId = request.EstateTypeId;
        item.EstateStatusId = request.EstateStatusId;
        item.UpdatedBy = username;
        item.UpdatedAt = DateTime.Now;

        var result = await _realEstateContext.SaveChangesAsync();
        return Ok(new InfoEstate(item));
      }
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
      var item = await _realEstateContext.Estates.SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
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
