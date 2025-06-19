export type AppRoute = {
  path: string;
  label: string;
  icon: string;
  element?: string;
  submenu?: AppRoute[];
};

export const AUTH_ROUTES: AppRoute[] = [
  { path: "/login", label: "Logowanie", icon: "login", element: "login" },
  {
    path: "/register",
    label: "Rejestracja",
    icon: "person-add",
    element: "register",
  },
  { path: "/rules", label: "Regulamin", icon: "gavel", element: "rules" },
];
