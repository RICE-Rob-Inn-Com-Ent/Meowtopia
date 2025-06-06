import '../tailwind.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import LoginPage from "../pages/shared/LoginPage";

type RouteType = {
  path: string;
  element?: React.ReactNode;
  submenu?: RouteType[];
};

type AppProps = {
  role: "admin" | "user";
  routes: RouteType[];
  defaultPath: string;
};

const App: React.FC<AppProps> = ({ role, routes, defaultPath }) => {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    axios.defaults.baseURL = window.location.origin.includes("localhost")
      ? "http://localhost:3000"
      : "https://your-production-url.com";
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.interceptors.request.use((config) => {
      const getCookie = (name: string): string => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()!.split(";").shift() || "";
        return "";
      };
      config.headers["X-CSRFToken"] = getCookie("csrfToken");
      return config;
    });
  }, []);

  useEffect(() => {
    axios
      .get("/accounts/check-auth/", { withCredentials: true })
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  return auth ? (
    <BrowserRouter>
      {role === "admin" ? (
        <div className="flex bg-base min-h-screen">
          <Navigation role={role} />
          <main className="flex-1">
            <Routes>
              {routes.map((route) =>
                route.submenu ? (
                  route.submenu.map((sub) =>
                    sub.element ? (
                      <Route
                        key={sub.path}
                        path={sub.path}
                        element={sub.element}
                      />
                    ) : null
                  )
                ) : route.element ? (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ) : null
              )}
            </Routes>
          </main>
        </div>
      ) : (
        <div className="min-h-screen bg-base flex flex-col">
          <main className="flex-1 pb-24">
            <Routes>
              {routes.map((route) =>
                route.submenu ? (
                  route.submenu.map((sub) =>
                    sub.element ? (
                      <Route
                        key={sub.path}
                        path={sub.path}
                        element={sub.element}
                      />
                    ) : null
                  )
                ) : route.element ? (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ) : null
              )}
              {/* Dodaj domyślną stronę */}
              <Route path="*" element={<div className="p-8 text-center text-gray-400">Witaj w CatHouseCaffe!</div>} />
            </Routes>
          </main>
          <Navigation role={role} />
        </div>
      )}
    </BrowserRouter>
  ) : (
    <LoginPage onLoginSuccess={() => setAuth(true)} />
  );
};

export default App;
