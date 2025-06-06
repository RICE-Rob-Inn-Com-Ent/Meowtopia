import React from "react";
import ReactDOM from "react-dom/client";
import App from "./layouts/App";
import { ADMIN_ROUTES } from "./routes";

const root = ReactDOM.createRoot(document.getElementById("admin-app")!);
root.render(
  <React.StrictMode>
    <App role="admin" routes={ADMIN_ROUTES} defaultPath={ADMIN_ROUTES[0]?.path || "/"} />
  </React.StrictMode>
);
