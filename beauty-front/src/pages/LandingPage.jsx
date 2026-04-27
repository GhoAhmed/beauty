import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Badge } from "../components/ui";
import {
  Sparkles,
  Star,
  CheckCircle,
  ArrowRight,
  Globe,
  InspectionPanel,
  X,
} from "lucide-react";
import { FEATURES, NAV_LINKS, PLANS, STEPS, TESTIMONIALS } from "../constants";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const toDashboard = () => {
    if (user?.role === "admin") navigate("/dashboard/admin");
    else if (user?.role === "client") navigate("/dashboard/client");
    else navigate("/dashboard/owner");
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] overflow-x-hidden">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] bg-pink-500/8 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-600/8 rounded-full blur-[100px]" />
      </div>

      {/* ── NAVBAR ─────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Glamora
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            {NAV_LINKS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <Button variant="primary" size="sm" onClick={toDashboard}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/register")}
                >
                  Get started free
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────── */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-8">
              <Sparkles size={12} />
              The all-in-one beauty business platform
              <ArrowRight size={12} />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 max-w-4xl">
              Run your beauty
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                business effortlessly
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              Glamora gives salons and freelancers the tools to book more
              clients, manage appointments, and grow revenue — all from one
              beautiful dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {user ? (
                <Button variant="primary" size="xl" onClick={toDashboard}>
                  Go to Dashboard <ArrowRight size={18} />
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="xl"
                    onClick={() => navigate("/register")}
                  >
                    Start for free <ArrowRight size={18} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="xl"
                    onClick={() => scrollTo("features")}
                  >
                    See how it works
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              {[
                "No credit card required",
                "14-day free trial",
                "Cancel anytime",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-400" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10 rounded-2xl" />
            <div className="bg-[#1E293B] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-purple-900/20">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0F172A]/50 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 bg-[#0F172A] rounded-lg px-3 py-1 text-xs text-slate-500 max-w-xs mx-auto text-center">
                  app.glamora.io/dashboard
                </div>
              </div>

              <div className="p-6 grid grid-cols-4 gap-4">
                {[
                  {
                    label: "Today's Revenue",
                    value: "$2,450",
                    change: "+12%",
                    color: "from-purple-500/20 to-purple-600/10",
                  },
                  {
                    label: "Appointments",
                    value: "8",
                    change: "+3",
                    color: "from-pink-500/20 to-pink-600/10",
                  },
                  {
                    label: "Active Clients",
                    value: "142",
                    change: "+5",
                    color: "from-amber-500/20 to-amber-600/10",
                  },
                  {
                    label: "Avg Rating",
                    value: "4.9 ★",
                    change: "Top 5%",
                    color: "from-emerald-500/20 to-emerald-600/10",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 border border-white/5`}
                  >
                    <p className="text-xs text-slate-400 mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-emerald-400 mt-1">
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>

              <div className="px-6 pb-6 grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-2 text-center ${i === 2 ? "bg-purple-600/30 border border-purple-500/30" : "bg-white/3 border border-white/5"}`}
                    >
                      <p className="text-xs text-slate-400 mb-1">{day}</p>
                      <p
                        className={`text-sm font-bold ${i === 2 ? "text-purple-300" : "text-slate-300"}`}
                      >
                        {14 + i}
                      </p>
                      <div className="mt-1 space-y-0.5">
                        {Array.from({ length: [2, 1, 3, 2, 1, 0, 0][i] }).map(
                          (_, j) => (
                            <div
                              key={j}
                              className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-70"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ───────────────────────────── */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-slate-500 mb-8 uppercase tracking-widest">
            Trusted by 12,000+ beauty professionals worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-40">
            {[
              "Luxe Salon",
              "Studio Amara",
              "The Beauty Bar",
              "Bloom Spa",
              "Elite Cuts",
              "Glow Studio",
            ].map((brand) => (
              <span key={brand} className="text-lg font-bold text-slate-300">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="purple">Features</Badge>
            <h2 className="text-4xl font-bold mt-4 mb-4">
              Everything you need to thrive
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Purpose-built tools for beauty professionals. No fluff, just what
              actually grows your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => {
              const colorMap = {
                purple:
                  "bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:bg-purple-500/15",
                pink: "bg-pink-500/10 text-pink-400 border-pink-500/20 group-hover:bg-pink-500/15",
                amber:
                  "bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:bg-amber-500/15",
                indigo:
                  "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 group-hover:bg-indigo-500/15",
                emerald:
                  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/15",
                rose: "bg-rose-500/10 text-rose-400 border-rose-500/20 group-hover:bg-rose-500/15",
              };
              return (
                <div
                  key={i}
                  className="group bg-[#1E293B] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transition-all ${colorMap[feat.color]}`}
                  >
                    <feat.icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 bg-[#1E293B]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="pink">How it works</Badge>
            <h2 className="text-4xl font-bold mt-4 mb-4">
              Up and running in 10 minutes
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              No technical setup. No training needed. Just a better way to
              manage your beauty business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-pink-500/40 to-transparent" />
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-500/20 border border-purple-500/20 flex flex-col items-center justify-center mb-6">
                  <span className="text-2xl font-black bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {step.n}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────── */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="amber">Testimonials</Badge>
            <h2 className="text-4xl font-bold mt-4 mb-4">
              Loved by beauty pros everywhere
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-[#1E293B] rounded-2xl p-6 border border-white/5"
              >
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6 bg-[#1E293B]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="purple">Pricing</Badge>
            <h2 className="text-4xl font-bold mt-4 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees, ever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-6 border transition-all ${
                  plan.popular
                    ? "bg-gradient-to-b from-purple-600/20 to-pink-500/10 border-purple-500/40 scale-105"
                    : "bg-[#1E293B] border-white/5"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      Most popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className="text-slate-400 text-sm">
                      /{plan.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2.5 text-sm text-slate-300"
                    >
                      <CheckCircle
                        size={15}
                        className="text-emerald-400 shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "primary" : "secondary"}
                  className="w-full"
                  onClick={() => (user ? toDashboard() : navigate("/register"))}
                >
                  {user ? "Go to Dashboard" : plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-indigo-500/20 rounded-3xl p-16 border border-purple-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-500/5" />
            <Sparkles
              size={40}
              className="mx-auto mb-6 text-purple-400 relative"
            />
            <h2 className="text-4xl font-bold mb-4 relative">
              Ready to grow your beauty business?
            </h2>
            <p className="text-slate-400 text-lg mb-8 relative">
              Join 12,000+ beauty professionals already using Glamora to fill
              their calendars and delight clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              {user ? (
                <Button variant="primary" size="xl" onClick={toDashboard}>
                  Go to Dashboard <ArrowRight size={18} />
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="xl"
                    onClick={() => navigate("/register")}
                  >
                    Start for free <ArrowRight size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="xl"
                    onClick={() => navigate("/login")}
                  >
                    Sign in instead
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles size={13} className="text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Glamora
              </span>
            </div>

            <div className="flex gap-6 text-sm text-slate-500">
              {["Privacy", "Terms", "Support", "Blog", "Careers"].map(
                (item) => (
                  <button
                    key={item}
                    className="hover:text-slate-300 transition-colors"
                  >
                    {item}
                  </button>
                ),
              )}
            </div>

            <div className="flex items-center gap-4 text-slate-500">
              <button className="hover:text-purple-400 transition-colors">
                <InspectionPanel size={18} />
              </button>
              <button className="hover:text-purple-400 transition-colors">
                <X size={18} />
              </button>
              <button className="hover:text-purple-400 transition-colors">
                <Globe size={18} />
              </button>
            </div>
          </div>
          <p className="text-center text-slate-600 text-sm mt-8">
            © 2025 Glamora. Built with love for beauty professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}
