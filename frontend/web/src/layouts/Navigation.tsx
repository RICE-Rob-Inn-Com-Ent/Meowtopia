import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { USER_ROUTES, ADMIN_ROUTES, AppRoute } from "@/routes";
import { Link, useLocation } from "react-router-dom";

type NavigationProps = {
  role: "user" | "admin";
};

const Navigation: React.FC<NavigationProps> = ({ role }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const links: AppRoute[] = role === "admin" ? ADMIN_ROUTES : USER_ROUTES;
  const location = useLocation();

  // Obsługa kliknięcia poza nawigacją
  useEffect(() => {
    if (!openMenu) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openMenu]);

  // Sidebar dla admina
  if (role === "admin") {
    return (
      <nav
        ref={navRef}
        className={`
          fixed left-0 top-0 z-30 h-screen bg-[#134e4a] text-white shadow-2xl border-r-4 border-[#134e4a] transition-all duration-300
          flex flex-col items-center
          ${openMenu ? "" : "justify-center"}
          ${openMenu ? "w-[22vw] min-w-[320px] max-w-[480px]" : "w-[5vw] min-w-[64px] max-w-[80px]"}
        `}
        style={{ fontSize: openMenu ? "1.5rem" : "1rem" }}
      >
        {/* Górny pasek/przycisk menu */}
        <div className={openMenu
          ? "w-full flex flex-row items-center gap-2 px-0 py-0 bg-[#134e4a] rounded-b-2xl shadow-lg border-b-2 border-[#134e4a] min-h-[64px]"
          : "w-full flex flex-col items-center py-2"
        }>
          <button
            type="button"
            onClick={() => setOpenMenu((v) => !v)}
            className={`
              flex items-center justify-center rounded-xl transition
              bg-[#134e4a]
              ${openMenu ? "p-3" : "p-0"}
              shadow-md
            `}
            style={{ fontSize: openMenu ? "2rem" : "1.5rem", border: "none" }}
          >
            <span className={`transition-transform duration-300 ${openMenu ? "rotate-90" : "rotate-0"}`}>
              <Icon
                icon={
                  openMenu
                    ? "material-symbols-light:close-rounded"
                    : "material-symbols-light:menu-rounded"
                }
                className={`text-[${openMenu ? "3vw" : "2vw"}] text-[#fafaf9]`}
                style={{
                  minWidth: openMenu ? "2.5rem" : "2rem",
                  minHeight: openMenu ? "2.5rem" : "2rem"
                }}
              />
            </span>
          </button>
          {openMenu && (
            <span className="flex items-center gap-2 font-semibold text-[2rem] text-[#fafaf9] transition-all duration-300 ml-2 min-h-[40px]">
              Panel
              <img src="/svg/logo.svg" alt="Logo" className="h-[3vw] w-[3vw] min-w-[2.5rem] min-h-[2.5rem]" />
            </span>
          )}
        </div>
        {/* Linki nawigacyjne */}
        <ul
          className="flex flex-col items-start gap-[2vw] px-0 pl-0 ml-0 transition-all duration-300 flex-1 mt-[2vw] list-none"
          style={{
            listStyle: "none",
            paddingLeft: 0,
            marginLeft: 0,
            marginTop: "2vw"
          }}
        >
          {links.map((link) =>
            <li key={link.path} className="w-full flex justify-start m-0 p-0">
              <Link
                to={link.path}
                className={`
                  flex items-center justify-start rounded-2xl transition
                  hover:bg-white
                  focus:outline-none
                  active:outline-none
                  visited:text-inherit
                  ${location.pathname === link.path ? "bg-white text-[#fcd34d] font-bold" : "text-[#fafaf9]"}
                  ${openMenu ? "gap-[1vw] px-[1vw] py-[1vw] w-full" : "py-[1vw] w-full"}
                  shadow
                `}
                style={{
                  fontSize: openMenu ? "1.5rem" : "0",
                  textDecoration: "none",
                  WebkitTapHighlightColor: "transparent",
                  margin: 0,
                  padding: 0
                }}
                tabIndex={0}
                draggable={false}
              >
                <Icon
                  icon={`material-symbols-light:${link.icon}`}
                  className={`text-[${openMenu ? "2.5vw" : "2vw"}] ${location.pathname === link.path ? "text-[#fcd34d]" : "text-[#fafaf9]"}`}
                  style={{
                    minWidth: openMenu ? "2.5rem" : "2rem",
                    minHeight: openMenu ? "2.5rem" : "2rem"
                  }}
                />
                {openMenu && (
                  <span className={`font-bold tracking-wide text-[2rem] ml-2 ${location.pathname === link.path ? "text-[#fcd34d]" : "text-[#fafaf9]"}`}>
                    {link.label}
                  </span>
                )}
              </Link>
            </li>
          )}
        </ul>
        {/* Pasek dolny z marką */}
        <div className="w-full py-4 px-2 flex items-center justify-center bg-[#134e4a] border-t-2 border-[#134e4a]">
          <span className="text-white font-bold text-lg tracking-widest">CatHouseCaffe</span>
        </div>
      </nav>
    );
  }

  // Pasek nawigacji na dole dla usera
  return (
    <nav
      className="relative bottom-0 left-0 w-full z-50 p-2 bg-[#134e4a] text-white shadow-inner border-t border-[#134e4a]"
    >
      <ul className="flex flex-row gap-2 w-full justify-around items-center">
        {links.map((link) =>
          <li key={link.path} className="flex-1 flex justify-center">
            <Link
              to={link.path}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 rounded-md transition
                hover:bg-white hover:text-[#134e4a]
                ${location.pathname === link.path ? "bg-white text-[#fcd34d] font-bold" : "text-white"}
              `}
            >
              <Icon
                icon={`material-symbols-light:${link.icon}`}
                className={`text-4xl ${location.pathname === link.path ? "text-[#fcd34d]" : "text-white"}`}
              />
              <span className={`font-bold tracking-wide text-2xl ${location.pathname === link.path ? "text-[#fcd34d]" : "text-white"}`}>
                {link.label}
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
