import { useEffect, useState, type ReactNode } from "react";
import type { Task, TaskPriority, TaskStatus } from "../types/Task";
import { TaskContext } from "./TaskContext";

interface TaskProviderProps {
  children: ReactNode;
}

const starterTasks: Task[] = [
  {
    id: "1",
    title: "Finish TypeScript assignment",
    description: "Complete the task management project",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-08-15",
  },
  {
    id: "2",
    title: "Update README",
    description: "Add setup and usage instructions",
    status: "pending",
    priority: "medium",
    dueDate: "2026-08-16",
  },
];

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      try {
        return JSON.parse(savedTasks) as Task[];
      } catch {
        return starterTasks;
      }
    }

    return starterTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    dueDate: string,
  ) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      priority,
      dueDate,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function updateTask(
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    dueDate: string,
  ) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              description,
              status,
              priority,
              dueDate,
            }
          : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function getTaskById(id: string) {
    return tasks.find((task) => task.id === id);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
