import { useEffect, type ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !error) {
      void loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, error]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Unable to sign in. Please refresh and try again.</p>;
  }

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
