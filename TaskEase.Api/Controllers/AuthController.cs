using Microsoft.AspNetCore.Mvc;

namespace TaskEase.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config)
    {
        _config = config;
    }

    [HttpPost("verify")]
    public IActionResult VerifyPin([FromBody] PinRequest request)
    {
        var expectedPin = _config["OwnerPin"];
        if (!string.IsNullOrEmpty(expectedPin) && request.Pin == expectedPin)
        {
            return Ok(new { authenticated = true });
        }
        return Unauthorized(new { message = "Incorrect PIN" });
    }
}

public record PinRequest(string Pin);