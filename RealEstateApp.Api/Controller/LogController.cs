using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using RealEstateApp.Api.Model;
using RealEstateApp.Api.Service;

namespace RealEstateApp.Api.Controller
{
  [ApiController]
  [Route("[controller]")]
  public class LogController : ControllerBase
  {
    private readonly LogService _logService;

    public LogController(LogService logService) => _logService = logService;

    [Route("/ws")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public async Task Get()
    {
      if (HttpContext.WebSockets.IsWebSocketRequest)
      {
        using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

        while (true)
        {
          var message = _logService.GetLastRecords();
          var messageSerialized = JsonSerializer.Serialize(message);
          var bytes = Encoding.UTF8.GetBytes(messageSerialized);
          var arraySegment = new ArraySegment<byte>(bytes, 0, bytes.Length);

          if (webSocket.State == WebSocketState.Open)
            await webSocket.SendAsync(arraySegment,
              WebSocketMessageType.Text, true, CancellationToken.None);

          else if (webSocket.State == WebSocketState.Closed ||
            webSocket.State == WebSocketState.Aborted)
            break;

          Thread.Sleep(5000);
        }
      }
      else HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Log>> Get(string id)
    {
      var log = await _logService.GetAsync(id);
      if (log is null) return NotFound();
      return log;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Log newLog)
    {
      await _logService.CreateAsync(newLog);
      return CreatedAtAction(nameof(Get), new { id = newLog.Id }, newLog);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Log updatedLog)
    {
      var log = await _logService.GetAsync(id);
      if (log is null) return NotFound();

      updatedLog.Id = log.Id;
      await _logService.UpdateAsync(id, updatedLog);
      return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
      var log = await _logService.GetAsync(id);
      if (log is null) return NotFound();

      await _logService.RemoveAsync(id);
      return NoContent();
    }
  }
}