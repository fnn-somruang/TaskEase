using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TaskEase.Api.Filters;

public class OwnerAuthFilter : IActionFilter
{
    private readonly IConfiguration _config;

    public OwnerAuthFilter(IConfiguration config)
    {
        _config = config;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        var expectedPin = _config["OwnerPin"];
        if (string.IsNullOrEmpty(expectedPin)) return;

        if (!context.HttpContext.Request.Headers.TryGetValue("X-Owner-Pin", out var providedPin) ||
            providedPin != expectedPin)
        {
            context.Result = new UnauthorizedObjectResult(new { message = "Invalid or missing Owner PIN" });
        }
    }

    public void OnActionExecuted(ActionExecutedContext context) { }
}