import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import Auth from "./modules/Auth";
import "./tailwind.css";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:2000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<null | boolean>(null);

  useEffect(() => {
    api
      .get("/accounts/check-auth/")
      .then((res) => setIsAuth(res.data.authenticated))
      .catch(() => setIsAuth(false));
  }, []);
  if (isAuth === null) return <div>Loading...</div>;
  if (!isAuth) return <Auth />;
  return <div>Lets Go!</div>;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
