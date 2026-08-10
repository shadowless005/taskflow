import { Link, useNavigate } from "react-router";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../context/useTasks";

function CreateTaskPage() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  return (
    <div className="page-container page-narrow">
      <div className="page-navigation">
        <Link to="/" className="back-link">
          ← Dashboard
        </Link>
      </div>

      <section className="page-heading">
        <p className="hero-label">TaskFlow</p>
        <h1>Create a new task.</h1>

        <p className="page-description">
          Add the information below and keep your work organized.
        </p>
      </section>

      <section className="dashboard-panel">
        <TaskForm
          onAddTask={(title, description, status, priority, dueDate) => {
            addTask(title, description, status, priority, dueDate);

            navigate("/");
          }}
          onUpdateTask={() => {}}
          taskToEdit={null}
          onCancelEdit={() => navigate("/")}
        />
      </section>
    </div>
  );
}

export default CreateTaskPage;
