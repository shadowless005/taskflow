import { useAuth0 } from "@auth0/auth0-react";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return <p>Redirecting to login...</p>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
