import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";
import { TaskProvider } from "./context/TaskProvider";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <TaskProvider>
          <App />
        </TaskProvider>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
);
