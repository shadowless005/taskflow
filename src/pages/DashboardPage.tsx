import { useState } from "react";
import type { Task } from "../types/Task";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/useTasks";
import AuthButtons from "../components/AuthButtons";

function DashboardPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  function startEditing(task: Task) {
    setTaskToEdit(task);
  }

  function cancelEditing() {
    setTaskToEdit(null);
  }

  function handleUpdateTask(
    id: string,
    title: string,
    description: string,
    status: Task["status"],
    priority: Task["priority"],
    dueDate: string,
  ) {
    updateTask(id, title, description, status, priority, dueDate);
    setTaskToEdit(null);
  }

  return (
    <div className="page-container">
      <header className="app-header">
        <div>
          <p className="hero-label">TaskFlow</p>
          <h1 className="app-title">Task Dashboard</h1>
        </div>

        <div className="header-right">
          <AuthButtons />
        </div>
      </header>

      <section className="hero">
        <h2>Make space for what matters.</h2>

        <p className="hero-description">
          Organize your tasks, track your progress, and keep your work moving
          forward.
        </p>
      </section>

      <section className="dashboard-panel">
        <TaskForm
          key={taskToEdit?.id ?? "new-task"}
          onAddTask={addTask}
          onUpdateTask={handleUpdateTask}
          taskToEdit={taskToEdit}
          onCancelEdit={cancelEditing}
        />
      </section>

      <section className="dashboard-panel form-panel">
        <div className="dashboard-header">
          <div>
            <h2 className="section-title">Your Tasks</h2>

            <p className="muted">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks yet</h3>
            <p>Create your first task to get started.</p>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onEdit={startEditing}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
