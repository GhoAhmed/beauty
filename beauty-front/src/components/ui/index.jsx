// ── Button ──────────────────────────────────────────────────────────────
export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-40 disabled:cursor-not-allowed";
  const sizes = {
    sm: "px-4 py-1.5 text-sm gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5",
    xl: "px-10 py-4 text-lg gap-3",
  };
  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-900/40 hover:shadow-purple-800/60 hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-[#1E293B] text-[#F8FAFC] border border-white/10 hover:bg-[#263348] hover:border-white/20 active:scale-[0.98]",
    ghost:
      "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 active:scale-[0.98]",
    accent:
      "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg shadow-pink-900/40 hover:shadow-pink-800/60 hover:scale-[1.02] active:scale-[0.98]",
    danger:
      "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 active:scale-[0.98]",
    success:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 active:scale-[0.98]",
    outline:
      "border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 active:scale-[0.98]",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

// ── Input ────────────────────────────────────────────────────────────────
export function Input({
  label,
  icon: Icon,
  error,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
          {required && <span className="text-pink-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon size={16} className="text-slate-500" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-[#0F172A]/60 border ${error ? "border-red-500/60" : "border-white/10"} rounded-xl text-[#F8FAFC] placeholder-slate-500 text-sm transition-all duration-200
            focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20
            ${Icon ? "pl-10 pr-4 py-3" : "px-4 py-3"}
          `}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">{error}</p>
      )}
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────
export function Card({
  children,
  className = "",
  glass = false,
  gradient = false,
}) {
  const base = "rounded-2xl p-6 transition-all duration-200";
  const style = glass
    ? "bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20"
    : gradient
      ? "bg-gradient-to-br from-purple-600/20 to-pink-500/10 border border-purple-500/20 hover:border-purple-400/30"
      : "bg-[#1E293B] border border-white/5 hover:border-white/10";
  return <div className={`${base} ${style} ${className}`}>{children}</div>;
}

// ── Badge ─────────────────────────────────────────────────────────────────
export function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-white/10 text-slate-300",
    purple: "bg-purple-500/15 text-purple-300 border border-purple-500/20",
    pink: "bg-pink-500/15 text-pink-300 border border-pink-500/20",
    green: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
    amber: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
    red: "bg-red-500/15 text-red-300 border border-red-500/20",
    blue: "bg-blue-500/15 text-blue-300 border border-blue-500/20",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────
export function Avatar({ name, src, size = "md", gradient = false }) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };
  const initials = name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold flex-shrink-0 ${gradient ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white" : "bg-purple-600/30 text-purple-300"}`}
    >
      {src ? (
        <img src={src} className="w-full h-full rounded-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────
export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  color = "purple",
}) {
  const colors = {
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      icon: "text-purple-400",
    },
    pink: {
      bg: "bg-pink-500/10",
      text: "text-pink-400",
      icon: "text-pink-400",
    },
    amber: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      icon: "text-amber-400",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      icon: "text-emerald-400",
    },
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      icon: "text-blue-400",
    },
  };
  const c = colors[color];
  const isPositive = change?.startsWith("+");
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <div className={`${c.bg} rounded-xl p-2.5`}>
          <Icon size={20} className={c.icon} />
        </div>
        {change && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}
          >
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-[#F8FAFC] mb-1">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
      <div
        className={`absolute -bottom-6 -right-6 w-24 h-24 ${c.bg} rounded-full opacity-50`}
      />
    </Card>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────
export function Modal({ isOpen, onClose, title, children, size = "md" }) {
  if (!isOpen) return null;
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${sizes[size]} bg-[#1E293B] border border-white/10 rounded-2xl shadow-2xl shadow-black/50`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold text-[#F8FAFC]">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────
export function Table({ headers, rows, emptyMessage = "No data available" }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-12 text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-white/5 hover:bg-white/2 transition-colors group"
              >
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3.5 text-sm text-slate-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── Section Title ──────────────────────────────────────────────────────────
export function SectionTitle({ label, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      {label && (
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
