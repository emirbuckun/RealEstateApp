using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Auth;
using RealEstateApp.Api.DTO.Photo;
using RealEstateApp.Api.DatabaseContext;
using System.Security.Claims;
using RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class PhotoController : ControllerBase
  {
    private readonly RealEstateContext _realEstateContext;

    public PhotoController(RealEstateContext realEstateContext)
    {
      _realEstateContext = realEstateContext;
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    [Route("list")]
    public async Task<IActionResult> GetAll()
    {
      var result = await _realEstateContext.Photos
        .Include(x => x.Estate)
        .Where(x => !x.IsDeleted)
        .ToListAsync();

      if (result == null) return NotFound();
      var list = new List<InfoPhoto>();
      result.ForEach(x => list.Add(new InfoPhoto(x)));
      return Ok(list);
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    [Route("byEstate")]
    public async Task<IActionResult> GetPhotosByEstate(int id)
    {
      var result = await _realEstateContext.Photos
        .Include(x => x.Estate)
        .Where(x => x.EstateId == id && !x.IsDeleted)
        .ToListAsync();

      if (result == null) return NotFound();

      var list = new List<InfoPhoto>();
      result.ForEach(x => list.Add(new InfoPhoto(x)));
      return Ok(list);
    }

    [Authorize(Roles = UserRoles.User)]
    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
      var result = await _realEstateContext.Photos
        .Include(x => x.Estate)
        .SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

      if (result != null)
        return Ok(new InfoPhoto(result));
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    public async Task<IActionResult> Post([FromForm] int estateId, IFormFile file)
    {
      var username = User.Claims.First(x => x.Type == ClaimTypes.Name).Value;

      if (file.Length > 0)
      {
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        // Upload the file if less than 2 MB
        if (memoryStream.Length < 2097152)
        {
          var bytes = memoryStream.ToArray();
          var photoExists = await _realEstateContext.Photos
            .Include(x => x.Estate)
            .SingleOrDefaultAsync(x => x.Bytes == bytes && !x.IsDeleted);

          if (photoExists == null)
          {
            var newPhoto = new NewPhoto()
            {
              Bytes = memoryStream.ToArray(),
              Description = file.FileName,
              FileExtension = Path.GetExtension(file.FileName),
              Size = file.Length,
              EstateId = estateId,
            };

            var addPhoto = newPhoto.ToPhoto();
            addPhoto.CreatedBy = username;
            addPhoto.CreatedAt = DateTime.Now;

            var result = _realEstateContext.Photos.Add(addPhoto);
            await _realEstateContext.SaveChangesAsync();
            return Ok(new InfoPhoto(addPhoto));
          }
          else return BadRequest("Photo already exists.");
        }
        else return BadRequest("Photo is too large.");
      }
      else return BadRequest("Photo is empty.");
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
      var item = await _realEstateContext.Photos
        .Include(x => x.Estate)
        .SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

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
