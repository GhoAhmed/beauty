import { useState } from "react";
import { Button, Input } from "../components/ui";
import {
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowLeft,
  CheckCircle,
  Building,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ROLES = [
  {
    id: "owner",
    label: "Salon Owner",
    desc: "Manage my salon & team",
    icon: Building,
  },
  {
    id: "freelancer",
    label: "Freelancer",
    desc: "Solo beauty professional",
    icon: User,
  },
  {
    id: "client",
    label: "Client",
    desc: "Book beauty services",
    icon: CheckCircle,
  },
];

// "freelancer" isn't in your DB allowedRoles, so we map it to "owner"
const ROLE_MAP = { owner: "owner", freelancer: "owner", client: "client" };

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
    setApiError("");
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleRegister = async () => {
    const e = validateStep2();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const user = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: ROLE_MAP[role] || "client",
      });

      // ✅ Redirect based on role
      if (user.role === "owner") navigate("/dashboard/owner");
      else if (user.role === "client") navigate("/dashboard/client");
      else navigate("/");
    } catch (err) {
      setApiError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-pink-500/6 rounded-full blur-[80px]" />
      </div>

      <div className="relative w-full max-w-lg">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to home
        </button>

        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Glamora
          </span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${step >= s ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white" : "bg-white/5 text-slate-500 border border-white/10"}`}
              >
                {step > s ? <CheckCircle size={16} /> : s}
              </div>
              {s < 2 && (
                <div
                  className={`h-px w-24 transition-all ${step > s ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/10"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#1E293B] rounded-2xl border border-white/5 p-8">
          {/* ── Step 1: Role ─────────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Choose your role</h1>
              <p className="text-slate-400 mb-6">
                Tell us how you'll use Glamora so we can personalize your
                experience.
              </p>
              <div className="space-y-3 mb-8">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left
                      ${role === r.id ? "bg-purple-600/15 border-purple-500/40 shadow-sm shadow-purple-500/10" : "bg-[#0F172A]/40 border-white/5 hover:border-white/10"}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === r.id ? "bg-purple-500/20" : "bg-white/5"}`}
                    >
                      <r.icon
                        size={18}
                        className={
                          role === r.id ? "text-purple-400" : "text-slate-400"
                        }
                      />
                    </div>
                    <div>
                      <p
                        className={`font-semibold text-sm ${role === r.id ? "text-white" : "text-slate-200"}`}
                      >
                        {r.label}
                      </p>
                      <p className="text-xs text-slate-400">{r.desc}</p>
                    </div>
                    {role === r.id && (
                      <CheckCircle
                        size={16}
                        className="ml-auto text-purple-400"
                      />
                    )}
                  </button>
                ))}
              </div>
              <Button
                variant="primary"
                className="w-full"
                size="lg"
                disabled={!role}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          )}

          {/* ── Step 2: Account details ───────────────────────────────── */}
          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Create your account</h1>
              <p className="text-slate-400 mb-6">
                You're joining as a{" "}
                <span className="text-purple-400 capitalize">{role}</span>.
              </p>

              {apiError && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                  {apiError}
                </div>
              )}

              <div className="space-y-4">
                <Input
                  label="Full name"
                  icon={User}
                  placeholder="Sarah Mitchell"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  error={errors.name}
                  required
                />

                <Input
                  label="Email address"
                  icon={Mail}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  error={errors.email}
                  required
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Password"
                    icon={Lock}
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    error={errors.password}
                    required
                  />
                  <Input
                    label="Confirm"
                    icon={Lock}
                    type="password"
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={(e) => update("confirm", e.target.value)}
                    error={errors.confirm}
                    required
                  />
                </div>

                {/* Password strength meter */}
                {form.password && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            form.password.length >= i * 3
                              ? i <= 1
                                ? "bg-red-400"
                                : i <= 2
                                  ? "bg-amber-400"
                                  : i <= 3
                                    ? "bg-yellow-400"
                                    : "bg-emerald-400"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      {form.password.length < 4
                        ? "Too weak"
                        : form.password.length < 7
                          ? "Weak"
                          : form.password.length < 10
                            ? "Medium"
                            : "Strong"}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 mb-6">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <div className="w-4 h-4 mt-0.5 rounded border border-purple-500/50 bg-purple-500/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-sm bg-purple-400" />
                  </div>
                  <span className="text-xs text-slate-400">
                    I agree to the{" "}
                    <button className="text-purple-400 hover:underline">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="text-purple-400 hover:underline">
                      Privacy Policy
                    </button>
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  size="lg"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  className="flex-2"
                  size="lg"
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
