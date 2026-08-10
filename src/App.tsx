import { Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks/new"
        element={
          <ProtectedRoute>
            <CreateTaskPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks/:id"
        element={
          <ProtectedRoute>
            <TaskDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks/:id/edit"
        element={
          <ProtectedRoute>
            <EditTaskPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
