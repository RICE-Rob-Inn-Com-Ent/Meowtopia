import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

interface LoginResponse {
  message?: string;
  error?: string;
}

interface LoginProps {
  onLoginSuccess: () => void;
  variant?: "admin" | "user";
}

const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess, variant = "user" }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    const getCookie = (name: string): string => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()!.split(";").shift() || "";
      return "";
    };
    setCsrfToken(getCookie("csrfToken"));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post<LoginResponse>(
        "/accounts/login/",
        { email, password, remember_me: rememberMe },
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      onLoginSuccess();
    } catch (error: any) {
      setError(
        error.response?.data?.error ||
          "Wystąpił błąd logowania. Spróbuj ponownie."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900/80 via-stone-50 to-cyan-400/40">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-teal-900 p-8 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center w-20 h-20 rounded-full bg-teal-900 shadow-lg ring-4 ring-cyan-400">
          <Icon icon="mdi:lock-outline" className="text-4xl text-white" />
        </div>
        <div className="relative flex py-8 items-center">
          <div className="grow border-t border-[1px] border-gray-200"></div>
          <span className="shrink mx-4 font-medium text-gray-500">OR</span>
          <div className="grow border-t border-[1px] border-gray-200"></div>
        </div>
        <form>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-base font-medium text-[#111827]"
              >
                Email
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  {/* Mail SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                  placeholder="name@company.com"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-base font-medium text-[#111827]"
              >
                Password
              </label>
              <div className="relative text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                  {/* Password SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-square-asterisk"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M12 8v8"></path>
                    <path d="m8.5 14 7-4"></path>
                    <path d="m8.5 10 7 4"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••••"
                  className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-[#061212] bg-[#22d3ee] focus:ring-4 focus:outline-hidden focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
            >
              Login
            </button>
            <div className="text-sm font-light text-[#6B7280] text-center">
              Don't have an accout yet?{" "}
              <a
                href="#"
                className="font-medium text-[#22d3ee] hover:underline"
              >
                Sign Up
              </a>
            </div>
          </div>
        </form>
        <div className="relative flex py-8 items-center">
          <div className="grow border-t border-[1px] border-gray-200"></div>
          <span className="shrink mx-4 font-medium text-gray-500">OR</span>
          <div className="grow border-t border-[1px] border-gray-200"></div>
        </div>
        <form>
          <div className="flex flex-row gap-2 justify-center">
            <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
              {/* Github SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              <span className="font-medium mx-auto">Github</span>
            </button>
            <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
              {/* Twitter SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="font-medium mx-auto">Twitter</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
