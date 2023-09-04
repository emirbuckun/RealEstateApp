using EmailService;
using Microsoft.AspNetCore.Mvc;

namespace RealEstateApp.Api.Controller
{
  [ApiController]
  [Route("[controller]")]
  public class EmailController : ControllerBase
  {
    private readonly IEmailSender _emailSender;

    public EmailController(IEmailSender emailSender)
    {
      _emailSender = emailSender;
    }

    [HttpGet]
    [Route("default")]
    public void SendDefaultEmail()
    {
      var message = new Message(new string[]
      { "emirbuckun@hotmail.com" },
        "Test email",
        "This is the content from our email.");
      _emailSender.SendEmail(message);
    }

    [HttpGet]
    [Route("defaultAsync")]
    public async void SendDefaultEmailAsync()
    {
      var message = new Message(new string[]
      { "emirbuckun@hotmail.com" },
        "Test Email Async",
        "This is the content from our email.");
      await _emailSender.SendEmailAsync(message);
    }

    [HttpGet]
    public void SendEmail(string to, string subject, string body)
    {
      var message = new Message(new string[] { to }, subject, body);
      _emailSender.SendEmail(message);
    }

    [HttpGet]
    [Route("async")]
    public void SendEmailAsync(string to, string subject, string body)
    {
      var message = new Message(new string[] { to }, subject, body);
      _emailSender.SendEmailAsync(message);
    }
  }
}