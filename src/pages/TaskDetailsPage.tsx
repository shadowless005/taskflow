import { Link, useParams } from "react-router";
import { useTasks } from "../context/useTasks";

function TaskDetailsPage() {
  const { id } = useParams();
  const { getTaskById } = useTasks();

  const task = id ? getTaskById(id) : undefined;

  if (!task) {
    return (
      <div className="page-container page-narrow">
        <section className="dashboard-panel centered-message">
          <p className="hero-label">TaskFlow</p>

          <h1>Task not found.</h1>

          <p className="muted">The task you're looking for doesn't exist.</p>

          <Link to="/" className="primary-button">
            Back to Dashboard
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page-container page-narrow">
      <div className="page-navigation">
        <Link to="/" className="back-link">
          ← Dashboard
        </Link>
      </div>

      <section className="details-card">
        <div className="details-top">
          <div>
            <p className="hero-label">Task Details</p>

            <h1>{task.title}</h1>

            <p className="details-description">
              {task.description || "No description provided."}
            </p>
          </div>

          <div className="badge-row">
            <span className={`badge status-${task.status}`}>{task.status}</span>

            <span className={`badge priority-${task.priority}`}>
              {task.priority} priority
            </span>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Status</span>
            <strong>{task.status}</strong>
          </div>

          <div className="detail-item">
            <span className="detail-label">Priority</span>
            <strong>{task.priority}</strong>
          </div>

          <div className="detail-item">
            <span className="detail-label">Due Date</span>
            <strong>{task.dueDate}</strong>
          </div>
        </div>

        <div className="button-row">
          <Link to={`/tasks/${task.id}/edit`} className="primary-button">
            Edit Task
          </Link>

          <Link to="/" className="secondary-button">
            Back to Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}

export default TaskDetailsPage;
