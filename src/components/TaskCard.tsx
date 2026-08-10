import { Link } from "react-router";
import type { Task } from "../types/Task";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <div className="task-card">
      <div className="task-card-main">
        <div>
          <h2>{task.title}</h2>

          <p className="task-description">
            {task.description || "No description provided."}
          </p>
        </div>

        <div className="badge-row">
          <span className={`badge status-${task.status}`}>{task.status}</span>

          <span className={`badge priority-${task.priority}`}>
            {task.priority}
          </span>
        </div>

        <p className="muted task-date">Due {task.dueDate}</p>

        <div className="button-row">
          <Link to={`/tasks/${task.id}`} className="secondary-button">
            Details
          </Link>

          <Link to={`/tasks/${task.id}/edit`} className="secondary-button">
            Edit
          </Link>

          <button className="danger-button" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
