using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateApp.Api.Auth;
using RealEstateApp.Api.DTO.AuthDto;

namespace RealEstateApp.Api.Controller
{
  [ApiController]
  [Route("[controller]")]
  public class UserController : ControllerBase
  {
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public UserController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
      _userManager = userManager;
      _roleManager = roleManager;
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpGet]
    [Route("list")]
    public async Task<IActionResult> GetAll()
    {
      var result = await _userManager.Users.ToListAsync();
      if (result != null) return Ok(result);
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpGet]
    public async Task<IActionResult> GetById(string id)
    {
      var result = await _userManager.FindByIdAsync(id);
      if (result != null) return Ok(result);
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpGet]
    [Route("getByName")]
    public async Task<IActionResult> GetByName(string name)
    {
      var result = await _userManager.FindByNameAsync(name);
      if (result != null) return Ok(result);
      return NotFound();
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] NewUser request)
    {
      var userExists = await _userManager.FindByNameAsync(request.Username);
      if (userExists != null)
        return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto { Status = "Error", Message = "User already exists!" });

      IdentityUser user = new()
      {
        Email = request.Email,
        UserName = request.Username,
        SecurityStamp = Guid.NewGuid().ToString()
      };

      var result = await _userManager.CreateAsync(user, request.Password);
      if (!result.Succeeded)
        return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto { Status = "Error", Message = "User creation failed! Please check user details and try again." });

      await _userManager.AddToRoleAsync(user, UserRoles.User);

      return Ok(new ResponseDto { Status = "Success", Message = "User created successfully!" });
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    [Route("admin")]
    public async Task<IActionResult> PostAdmin([FromBody] NewUser request)
    {
      var userExists = await _userManager.FindByNameAsync(request.Username);
      if (userExists != null)
        return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto { Status = "Error", Message = "User already exists!" });

      IdentityUser user = new()
      {
        Email = request.Email,
        UserName = request.Username,
        SecurityStamp = Guid.NewGuid().ToString()
      };
      var result = await _userManager.CreateAsync(user, request.Password);
      if (!result.Succeeded)
        return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto { Status = "Error", Message = "User creation failed! Please check user details and try again." });

      if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
        await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
      if (!await _roleManager.RoleExistsAsync(UserRoles.User))
        await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));

      if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
        await _userManager.AddToRoleAsync(user, UserRoles.Admin);
      if (await _roleManager.RoleExistsAsync(UserRoles.User))
        await _userManager.AddToRoleAsync(user, UserRoles.User);

      return Ok(new ResponseDto { Status = "Success", Message = "User created successfully!" });
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    public async Task<IActionResult> Put([FromBody] EditUser request)
    {
      var user = await _userManager.FindByNameAsync(request.Username);
      if (user == null)
        return StatusCode(StatusCodes.Status404NotFound, new ResponseDto { Status = "Error", Message = "User is not found!" });

      user.Email = request.Email;

      var result = await _userManager.UpdateAsync(user);
      if (!result.Succeeded)
        return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto { Status = "Error", Message = "User updating failed! Please check user details and try again." });

      return Ok(new ResponseDto { Status = "Success", Message = "User updated successfully!" });
    }

    [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    public async Task<IActionResult> Delete(string id)
    {
      var user = await _userManager.FindByIdAsync(id);

      if (user == null)
        return StatusCode(StatusCodes.Status404NotFound, new ResponseDto { Status = "Error", Message = "User is not found!" });

      var result = await _userManager.DeleteAsync(user);
      if (!result.Succeeded)
        return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDto { Status = "Error", Message = "User deleting failed! Please check user details and try again." });

      return Ok(new ResponseDto { Status = "Success", Message = "User deleted successfully!" });
    }
  }
}