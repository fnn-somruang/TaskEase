using System.ComponentModel.DataAnnotations;
using TaskEase.Api.Models;
using TaskStatus = TaskEase.Api.Models.TaskStatus;

namespace TaskEase.Api.DTOs;

public class CreateTaskDto
{
    [Required]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public TaskStatus Status { get; set; } = TaskStatus.Todo;
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    public DateTime? DueDate { get; set; }
}

public class UpdateTaskDto
{
    [Required]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public TaskStatus Status { get; set; }
    public TaskPriority Priority { get; set; }
    public DateTime? DueDate { get; set; }
}

public class UpdateTaskStatusDto
{
    [Required]
    public TaskStatus Status { get; set; }
}