import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem("glamora_token"),
  );
  const [loading, setLoading] = useState(true);

  const decodeToken = (t) => {
    try {
      return JSON.parse(atob(t.split(".")[1]));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        const stored = localStorage.getItem("glamora_user");
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setUser(stored ? JSON.parse(stored) : decoded);
        } catch {
          setUser(decoded);
        }
      } else {
        localStorage.removeItem("glamora_token");
        localStorage.removeItem("glamora_user");
        setToken(null);
      }
    }
    setLoading(false);
  }, []);

  const navigateToDashboard = useCallback(
    (role) => {
      if (role === "admin") navigate("/dashboard/admin");
      else if (role === "client") navigate("/dashboard/client");
      else navigate("/dashboard/owner");
    },
    [navigate],
  );

  const login = useCallback(
    async (email, password) => {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("glamora_token", data.token);
      localStorage.setItem("glamora_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      navigateToDashboard(data.user.role);
      return data.user;
    },
    [navigateToDashboard],
  );

  const register = useCallback(
    async ({ name, email, password, role }) => {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      localStorage.setItem("glamora_token", data.token);
      localStorage.setItem("glamora_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      navigateToDashboard(data.user.role);
      return data.user;
    },
    [navigateToDashboard],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("glamora_token");
    localStorage.removeItem("glamora_user");
    setToken(null);
    setUser(null);
    navigate("/");
  }, [navigate]);

  const authFetch = useCallback(
    async (path, options = {}) => {
      const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
      });
      if (res.status === 401) {
        logout();
        throw new Error("Session expired.");
      }
      return res;
    },
    [token, logout],
  );

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, authFetch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
