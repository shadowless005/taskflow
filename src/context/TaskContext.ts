import { createContext } from "react";
import type { Task, TaskPriority, TaskStatus } from "../types/Task";

export interface TaskContextType {
  tasks: Task[];

  addTask: (
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    dueDate: string,
  ) => void;

  updateTask: (
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    dueDate: string,
  ) => void;

  deleteTask: (id: string) => void;

  getTaskById: (id: string) => Task | undefined;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);
