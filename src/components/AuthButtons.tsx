import { useAuth0 } from "@auth0/auth0-react";

function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();

  if (isLoading) {
    return <span className="auth-loading">Loading...</span>;
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-actions">
        <button
          className="secondary-button"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>

        <button
          className="primary-button"
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                screen_hint: "signup",
              },
            })
          }
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="auth-user">
      <div className="user-info">
        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase() ?? "U"}
        </div>

        <div>
          <p className="user-name">{user?.name ?? "User"}</p>

          <p className="user-email">{user?.email}</p>
        </div>
      </div>

      <button
        className="secondary-button"
        onClick={() =>
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })
        }
      >
        Log Out
      </button>
    </div>
  );
}

export default AuthButtons;
