namespace RealEstateApp.Api.DTO.AuthDto
{
  public class RegisterRequest
  {
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public RegisterRequest(string username, string email, string password)
    {
      Username = username;
      Email = email;
      Password = password;
    }
  }
}
