import { Link, useNavigate, useParams } from "react-router";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../context/useTasks";

function EditTaskPage() {
  const { id } = useParams();
  const { getTaskById, updateTask } = useTasks();
  const navigate = useNavigate();

  if (!id) {
    return (
      <div className="page-container page-narrow">
        <section className="dashboard-panel centered-message">
          <h1>Task not found.</h1>

          <Link to="/" className="primary-button">
            Back to Dashboard
          </Link>
        </section>
      </div>
    );
  }

  const task = getTaskById(id);

  if (!task) {
    return (
      <div className="page-container page-narrow">
        <section className="dashboard-panel centered-message">
          <p className="hero-label">TaskFlow</p>
          <h1>Task not found.</h1>

          <p className="muted">
            This task may have been deleted or no longer exists.
          </p>

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
        <Link to={`/tasks/${task.id}`} className="back-link">
          ← Task Details
        </Link>
      </div>

      <section className="page-heading">
        <p className="hero-label">TaskFlow</p>
        <h1>Edit your task.</h1>

        <p className="page-description">
          Make your changes and save when you're finished.
        </p>
      </section>

      <section className="dashboard-panel">
        <TaskForm
          key={task.id}
          onAddTask={() => {}}
          onUpdateTask={(id, title, description, status, priority, dueDate) => {
            updateTask(id, title, description, status, priority, dueDate);

            navigate(`/tasks/${id}`);
          }}
          taskToEdit={task}
          onCancelEdit={() => navigate(`/tasks/${task.id}`)}
        />
      </section>
    </div>
  );
}

export default EditTaskPage;
