using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Auth;
using RealEstateApp.Api.DTO.EstateStatus;
using RealEstateApp.Api.DatabaseContext;
using System.Security.Claims;

namespace RealEstateApp.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class EstateStatusController : ControllerBase
  {
    private readonly RealEstateContext _realEstateContext;

    public EstateStatusController(RealEstateContext realEstateContext)
    {
      _realEstateContext = realEstateContext;
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    [Route("list")]
    public async Task<IActionResult> GetAll()
    {
      var result = await _realEstateContext.EstateStatuses.Where(x => !x.IsDeleted).ToListAsync();
      if (result == null) return NotFound();
      var list = new List<InfoEstateStatus>();
      result.ForEach(x => list.Add(new InfoEstateStatus(x)));
      return Ok(list);
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
      var result = await _realEstateContext.EstateStatuses.SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
      if (result != null) return Ok(new InfoEstateStatus(result));
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] NewEstateStatus request)
    {
      var username = User.Claims.First(x => x.Type == ClaimTypes.Name).Value;

      var newItem = request.ToEstateStatus();
      newItem.CreatedAt = DateTime.Now;
      newItem.CreatedBy = username;

      var result = _realEstateContext.EstateStatuses.Add(newItem);
      await _realEstateContext.SaveChangesAsync();
      return Ok(result.Entity);
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    public async Task<IActionResult> Put([FromBody] EditEstateStatus request)
    {
      var item = await _realEstateContext.EstateStatuses.SingleOrDefaultAsync(x => x.Id == request.Id && !x.IsDeleted);
      if (item != null)
      {
        var username = User.Claims.First(x => x.Type == ClaimTypes.Name).Value;

        item.Name = request.Name;
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
      var item = await _realEstateContext.EstateStatuses.SingleOrDefaultAsync(x => x.Id == id);
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
