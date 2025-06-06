import React from "react";
import ReactDOM from "react-dom/client";
import App from "./layouts/App";
import { USER_ROUTES } from "./routes";

const root = ReactDOM.createRoot(document.getElementById("user-app")!);
root.render(
  <React.StrictMode>
    <App role="user" routes={USER_ROUTES} defaultPath={USER_ROUTES[0]?.path || "/"} />
  </React.StrictMode>
);
