namespace RealEstateApp.Api.DTO.AuthDto
{
  public class NewUser
  {
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public NewUser(string username, string email, string password)
    {
      Username = username;
      Email = email;
      Password = password;
    }
  }
}
