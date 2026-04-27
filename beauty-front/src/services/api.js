/**
 * Glamora API Service
 *
 * Base URL: http://localhost:3000/api  (or VITE_API_URL env var)
 *
 * All authenticated requests send:  Authorization: Bearer <token>
 * Your backend error shape:         { error: "..." }
 * Your backend success shape:       { message, token?, user?, ... }
 */

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("glamora_token");
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  // 401 → session gone, force reload so AuthContext clears state
  if (res.status === 401) {
    localStorage.removeItem("glamora_token");
    localStorage.removeItem("glamora_user");
    window.location.reload();
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Your API always returns { error: "..." } for failures
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data;
}

// ── Auth ─────────────────────────────────────────────────────────────────
// POST /api/login    → { message, token, user }
// POST /api/register → { message, token, user }
export const auth = {
  login: (email, password) =>
    request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (name, email, password, role) =>
    request("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
    }),
};

// ── Future endpoints (add as you build them) ──────────────────────────────
export const appointments = {
  list: (params = {}) =>
    request(`/appointments?${new URLSearchParams(params)}`),
  create: (data) =>
    request("/appointments", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    request(`/appointments/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  cancel: (id) => request(`/appointments/${id}`, { method: "DELETE" }),
};

export const clients = {
  list: (params = {}) => request(`/clients?${new URLSearchParams(params)}`),
  getById: (id) => request(`/clients/${id}`),
  create: (data) =>
    request("/clients", { method: "POST", body: JSON.stringify(data) }),
};

export const analytics = {
  dashboard: () => request("/analytics/dashboard"),
  revenue: (period = "week") => request(`/analytics/revenue?period=${period}`),
};

export default { auth, appointments, clients, analytics };
