import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Icon } from "@iconify/react";
import { AUTH_ROUTES } from "../routes";
import remarkGfm from "remark-gfm";
import terms from "../../policies/general.md?raw";
import privacy from "../../policies/privacy.md?raw";
import cookies from "../../policies/cookies.md?raw";
import marketing from "../../policies/marketing.md?raw";
import loyalty from "../../policies/loyalty.md?raw";
import community from "../../policies/community.md?raw";
import cafe from "../../policies/cafe.md?raw";
import refund from "../../policies/refund.md?raw";
import content from "../../policies/content.md?raw";
import security from "../../policies/security.md?raw";
import support from "../../policies/support.md?raw";
import cats from "../../policies/cats.md?raw";
import faq from "../../policies/faq.md?raw";

const styles = {
  container: "flex items-center justify-center min-h-screen min-w-screen",
  form: "flex flex-col items-center bg-[#01634A] w-[70vw] h-[80vh] p-[1.5rem] rounded-[1rem] shadow-[0_1rem_2rem_0_#01634A]",
  label: "relative flex flex-row items-center m-[1rem] text-[#f0f0f0]",
  input: "border-[#eabd6e] rounded-[0.5rem] p-[0.5rem]",
  btnEye: "absolute right-[0] border-none bg-transparent cursor-pointer",
  checkbox: "w-4 h-4",
  submitBtn: "",
  link: "text-[#eabd6e] underline cursor-pointer",
  policyList: "w-full max-w-2xl mx-auto p-4 bg-[#f0f0f0] rounded-lg mb-4",
  policyItem:
    "block text-lg text-[#01634A] underline mb-2 cursor-pointer hover:text-[#eabd6e]",
  policyContent:
    "w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow mb-4 prose prose-slate prose-h1:text-2xl prose-h2:text-xl prose-p:mb-2 prose-a:text-[#01634A] prose-a:underline",
  backBtn: "mt-4 text-[#eabd6e] underline cursor-pointer",
};

const POLICIES = [
  { slug: "terms", title: "Ogólne Warunki Korzystania" },
  { slug: "privacy", title: "Polityka Prywatności" },
  { slug: "cookies", title: "Polityka Cookies" },
  { slug: "marketing", title: "Polityka Marketingowa" },
  { slug: "blockchain", title: "Polityka Blockchain" },
  { slug: "crypto", title: "Polityka Kryptowalut" },
  { slug: "loyalty", title: "Program Lojalnościowy" },
  { slug: "game", title: "Regulamin Gry" },
  { slug: "community", title: "Zasady Społeczności" },
  { slug: "cafe", title: "Regulamin Kawiarni" },
  { slug: "refund", title: "Polityka Zwrotów" },
  { slug: "content", title: "Polityka Treści Użytkowników" },
  { slug: "security", title: "Polityka Bezpieczeństwa" },
  { slug: "support", title: "Polityka Wsparcia" },
  { slug: "team", title: "Zespół i Partnerzy" },
  { slug: "cats", title: "Współpraca z Fundacjami" },
  { slug: "roadmapa", title: "Roadmapa" },
  { slug: "tokenizacja", title: "Tokenizacja" },
  { slug: "stack", title: "Stack Technologiczny" },
  { slug: "faq", title: "FAQ" },
  { slug: "kontakt", title: "Kontakt" },
];

const POLICY_CONTENT: Record<string, string> = {
  terms,
  privacy,
  cookies,
  marketing,
  loyalty,
  community,
  cafe,
  refund,
  content,
  security,
  support,
  cats,
  faq,
};

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [agree, setAgree] = useState<boolean>(false);

  return (
    <form className={styles.form}>
      <img src="/img/logos/chc-logo-color.png" alt="Cat House Caffè logo" />
      <label className={styles.label}>
        <Icon icon="material-symbols-light:alternate-email-rounded" />
        <p>Email:</p>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="przykład@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        <Icon icon="material-symbols-light:lock-open-outline-rounded" />
        <p>Hasło:</p>
        <input
          className={styles.input}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className={styles.btnEye}
          tabIndex={-1}
          onClick={() => setShowPassword((v) => !v)}
        >
          <Icon
            icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
          />
        </button>
      </label>
      <label className={styles.label}>
        <Icon icon="material-symbols-light:lock-outline" />
        <p>Potwierdź hasło:</p>
        <input
          className={styles.input}
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          className={styles.btnEye}
          tabIndex={-1}
          onClick={() => setShowConfirmPassword((v) => !v)}
        >
          <Icon
            icon={
              showConfirmPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"
            }
          />
        </button>
      </label>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={agree}
          onChange={() => setAgree((v) => !v)}
          className={styles.checkbox}
        />
        <p>
          Zgadzam się z{" "}
          <Link className={styles.link} to="/rules">
            zasadami korzystania
          </Link>
        </p>
      </label>
      <button type="submit" className={styles.submitBtn}>
        Zarejestruj
        <Icon icon="material-symbols-light:person-add-outline" />
      </button>
      <div>
        <button type="button">
          <Icon icon="simple-icons:google" />
          Google
        </button>
        <button type="button">
          <Icon icon="simple-icons:meta" />
          Meta
        </button>
      </div>
      <div>
        Już masz konto?{" "}
        <Link className={styles.link} to="/login">
          Zaloguj się
        </Link>
      </div>
    </form>
  );
};

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  return (
    <form className={styles.form}>
      <img src="/img/logos/chc-logo-color.png" alt="Cat House Caffè logo" />
      <label className={styles.label}>
        <Icon icon="material-symbols-light:alternate-email-rounded" />
        <p>Email:</p>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="przykład@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        <Icon icon="material-symbols-light:lock-open-outline-rounded" />
        <p>Hasło:</p>
        <input
          className={styles.input}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className={styles.btnEye}
          tabIndex={-1}
          onClick={() => setShowPassword((v) => !v)}
        >
          <Icon
            icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
          />
        </button>
      </label>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={() => setRememberMe((v) => !v)}
          className={styles.checkbox}
        />
        Pamiętaj mnie
      </label>
      <button type="submit" className={styles.submitBtn}>
        Login
        <Icon icon="material-symbols-light:login-outline-rounded" />
      </button>
      <div>
        <button type="button">
          <Icon icon="simple-icons:google" />
          Google
        </button>
        <button type="button">
          <Icon icon="simple-icons:meta" />
          Meta
        </button>
      </div>
      <div>
        Nie masz jeszcze konta?{" "}
        <Link className={styles.link} to="/register">
          Zarejestruj się
        </Link>
      </div>
    </form>
  );
};

const PolicyList: React.FC = () => (
  <div className={styles.policyList}>
    <h2 className="text-2xl mb-4">Dokumentacja i Polityki</h2>
    {POLICIES.map((p) => (
      <Link key={p.slug} className={styles.policyItem} to={`/rules/${p.slug}`}>
        {p.title}
      </Link>
    ))}
    <Link className={styles.backBtn} to="/login">
      Powrót do logowania
    </Link>
  </div>
);

const PolicyView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const content =
    slug && POLICY_CONTENT[slug]
      ? POLICY_CONTENT[slug]
      : "Nie znaleziono dokumentu.";
  return (
    <div className={styles.policyContent}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Powrót
      </button>
    </div>
  );
};

const Rules: React.FC = () => (
  <Routes>
    <Route path="/" element={<PolicyList />} />
    <Route path=":slug" element={<PolicyView />} />
  </Routes>
);

const authComponentMap: Record<string, React.ReactNode> = {
  login: <Login />,
  register: <Register />,
  rules: <Rules />,
};

const Auth: React.FC = () => (
  <div className={styles.container}>
    <Routes>
      {AUTH_ROUTES.map(
        (route) =>
          route.element && (
            <Route
              key={route.path}
              path={route.path}
              element={authComponentMap[route.element]}
            />
          )
      )}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </div>
);

export default function AuthWithRouter() {
  return (
    <BrowserRouter>
      <Auth />
    </BrowserRouter>
  );
}
