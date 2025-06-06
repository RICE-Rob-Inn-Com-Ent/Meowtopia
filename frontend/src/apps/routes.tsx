import React from "react";

export type AppRoute = {
  path: string;
  label: string;
  icon: string;
  element?: React.ReactNode;
  submenu?: AppRoute[];
  onClick?: () => void;
};

export const USER_ROUTES: AppRoute[] = [
  {
    path: "/cafe/menu",
    label: "Menu",
    icon: "menu-book",
  },
  {
    path: "/cafe/reservations",
    label: "Rezerwacje",
    icon: "event-available",
  },
  {
    path: "/cafe/cats",
    label: "Koty",
    icon: "pets",
  },
  {
    path: "/cafe/shop",
    label: "Sklep",
    icon: "shopping-bag",
  },
  {
    path: "",
    label: "More",
    icon: "more-horiz",
    submenu: [
      {
        path: "/accounts/profile",
        label: "Profil",
        icon: "account-circle",
      },
      {
        path: "/accounts/settings",
        label: "Opcje",
        icon: "settings",
      },
      {
        path: "/accounts/logout",
        label: "Wyloguj",
        icon: "logout",
      },
    ],
  },
];

export const ADMIN_ROUTES: AppRoute[] = [
  {
    path: "/accounts",
    label: "Użytkownicy",
    icon: "groups-rounded",
  },
  {
    path: "/cafe",
    label: "Kawiarnia",
    icon: "local-cafe-rounded",
  },
  {
    path: "/finance",
    label: "Finanse",
    icon: "finance-rounded",
  },
  {
    path: "/inventory",
    label: "Inwentarz",
    icon: "inventory-rounded",
  },
];
