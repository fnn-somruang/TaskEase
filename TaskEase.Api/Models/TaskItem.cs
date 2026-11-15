namespace TaskEase.Api.Models;

public enum TaskStatus
{
    Todo = 0,
    InProgress = 1,
    Review = 2,
    Done = 3
}

public enum TaskPriority
{
    Low = 0,
    Medium = 1,
    High = 2
}

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public TaskStatus Status { get; set; } = TaskStatus.Todo;
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    public DateTime? DueDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}