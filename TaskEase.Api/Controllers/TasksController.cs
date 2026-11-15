using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskEase.Api.Data;
using TaskEase.Api.DTOs;
using TaskEase.Api.Models;
using TaskStatus = TaskEase.Api.Models.TaskStatus;
using TaskEase.Api.Filters;

namespace TaskEase.Api.Controllers;

[ServiceFilter(typeof(OwnerAuthFilter))]
[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks(
        [FromQuery] TaskStatus? status,
        [FromQuery] TaskPriority? priority,
        [FromQuery] string? search)
    {
        var query = _context.Tasks.AsQueryable();

        if (status.HasValue)
            query = query.Where(t => t.Status == status.Value);

        if (priority.HasValue)
            query = query.Where(t => t.Priority == priority.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(t => t.Title.ToLower().Contains(search.ToLower()));

        var tasks = await query.OrderByDescending(t => t.CreatedAt).ToListAsync();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItem>> GetTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();
        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskItem>> CreateTask(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            Priority = dto.Priority,
            DueDate = dto.DueDate.HasValue ? DateTime.SpecifyKind(dto.DueDate.Value, DateTimeKind.Utc) : null,
            CreatedAt = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto dto)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.Status = dto.Status;
        task.Priority = dto.Priority;
        task.DueDate = dto.DueDate.HasValue ? DateTime.SpecifyKind(dto.DueDate.Value, DateTimeKind.Utc) : null;

        await _context.SaveChangesAsync();
        return Ok(task);
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateTaskStatus(int id, UpdateTaskStatusDto dto)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        task.Status = dto.Status;
        await _context.SaveChangesAsync();
        return Ok(task);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}