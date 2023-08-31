namespace RealEstateApp.Api.DTO.AuthDto
{
  public class EditUser
  {
    public string Username { get; set; }
    public string Email { get; set; }
    public EditUser(string username, string email)
    {
      Username = username;
      Email = email;
    }
  }
}
