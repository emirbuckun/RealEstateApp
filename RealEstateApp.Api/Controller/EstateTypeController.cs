using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Auth;
using RealEstateApp.Api.DTO.EstateType;
using RealEstateApp.Api.DatabaseContext;

namespace RealEstateApp.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class EstateTypeController : ControllerBase
  {
    private readonly RealEstateContext _realEstateContext;

    public EstateTypeController(RealEstateContext realEstateContext)
    {
      _realEstateContext = realEstateContext;
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    [Route("list")]
    public async Task<IActionResult> GetAll()
    {
      var result = await _realEstateContext.EstateTypes.Where(x => !x.IsDeleted).ToListAsync();
      if (result == null) return NotFound();
      var list = new List<InfoEstateType>();
      result.ForEach(x => list.Add(new InfoEstateType(x)));
      return Ok(list);
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
      var result = await _realEstateContext.EstateTypes.SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
      if (result != null) return Ok(new InfoEstateType(result));
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] NewEstateType request)
    {
      var username = User.Claims.First(x => x.Type == "username").Value;

      var newItem = request.ToEstateType();
      newItem.CreatedAt = DateTime.Now;
      newItem.CreatedBy = username;

      await _realEstateContext.EstateTypes.AddAsync(newItem);
      await _realEstateContext.SaveChangesAsync();
      return Ok(new InfoEstateType(newItem));
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    public async Task<IActionResult> Put([FromBody] EditEstateType request)
    {
      var item = await _realEstateContext.EstateTypes.SingleOrDefaultAsync(x => x.Id == request.Id && !x.IsDeleted);
      if (item != null)
      {
        var username = User.Claims.First(x => x.Type == "username").Value;

        item.Name = request.Name;
        item.UpdatedBy = username;
        item.UpdatedAt = DateTime.Now;

        await _realEstateContext.SaveChangesAsync();
        return Ok(new InfoEstateType(item));
      }
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
      var item = await _realEstateContext.EstateTypes.SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
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
