import { useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../types/Task";

interface TaskFormProps {
  onAddTask: (
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    dueDate: string,
  ) => void;

  onUpdateTask: (
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    dueDate: string,
  ) => void;

  taskToEdit: Task | null;
  onCancelEdit: () => void;
}

function TaskForm({
  onAddTask,
  onUpdateTask,
  taskToEdit,
  onCancelEdit,
}: TaskFormProps) {
  const [title, setTitle] = useState(taskToEdit?.title ?? "");
  const [description, setDescription] = useState(taskToEdit?.description ?? "");
  const [status, setStatus] = useState<TaskStatus>(
    taskToEdit?.status ?? "pending",
  );
  const [priority, setPriority] = useState<TaskPriority>(
    taskToEdit?.priority ?? "medium",
  );
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!dueDate) {
      alert("Due date is required");
      return;
    }

    if (taskToEdit) {
      onUpdateTask(
        taskToEdit.id,
        title,
        description,
        status,
        priority,
        dueDate,
      );
    } else {
      onAddTask(title, description, status, priority, dueDate);
    }

    setTitle("");
    setDescription("");
    setStatus("pending");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <p className="hero-label">{taskToEdit ? "Update task" : "New task"}</p>

        <h2 className="section-title">
          {taskToEdit ? "Edit Task" : "Create Task"}
        </h2>

        <p className="muted form-description">
          {taskToEdit
            ? "Update the details below and save your changes."
            : "Add the details below to create a new task."}
        </p>
      </div>

      <div className="form-main-row">
        <div className="form-group">
          <label htmlFor="task-title">Title</label>

          <input
            id="task-title"
            type="text"
            placeholder="Enter a task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-description">Description</label>

          <textarea
            id="task-description"
            placeholder="What needs to get done?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-status">Status</label>

          <select
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>

          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-date">Due Date</label>

          <input
            id="task-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="button-row">
        <button className="primary-button" type="submit">
          {taskToEdit ? "Save Changes" : "Create Task"}
        </button>

        {taskToEdit && (
          <button
            className="secondary-button"
            type="button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
