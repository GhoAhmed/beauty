/* eslint-disable react-hooks/static-components */
import { useState, useEffect } from "react";
import { Avatar } from "../ui";
import {
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  X,
  Menu,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { NAV_ADMIN, NAV_CLIENT, NAV_OWNER } from "../../constants";

// Mobile sidebar toggle button — exported so Navbar can render it
export function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
      aria-label="Open menu"
    >
      <Menu size={20} />
    </button>
  );
}

export default function Sidebar({
  role = "owner",
  activeId,
  setActiveId,
  mobileOpen,
  setMobileOpen,
}) {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const navItems =
    role === "owner" ? NAV_OWNER : role === "admin" ? NAV_ADMIN : NAV_CLIENT;

  // Derive display name from auth user or fallback
  const userName =
    user?.name ||
    (role === "owner"
      ? "Salon Owner"
      : role === "admin"
        ? "Admin User"
        : "Client");
  const userRole =
    role === "owner"
      ? "Salon Owner"
      : role === "admin"
        ? "Platform Admin"
        : "Client";

  // Close mobile sidebar on ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setMobileOpen?.(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [setMobileOpen]);

  // Prevent body scroll when mobile sidebar open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const SidebarContent = ({ isOverlay = false }) => (
    <aside
      className={`
        flex flex-col bg-[#1E293B] border-r border-white/5 h-full
        ${isOverlay ? "w-72" : `transition-all duration-300 ease-in-out ${collapsed ? "w-16" : "w-64"} shrink-0 relative`}
      `}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 p-5 border-b border-white/5 ${!isOverlay && collapsed ? "justify-center px-3" : ""}`}
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-white" />
        </div>
        {(isOverlay || !collapsed) && (
          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent whitespace-nowrap">
            Glamora
          </span>
        )}
        {isOverlay && (
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveId?.(item.id);
                setMobileOpen?.(false); // close mobile sidebar on nav
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left group relative
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600/30 to-pink-500/20 text-white border border-purple-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }
                ${!isOverlay && collapsed ? "justify-center px-2" : ""}`}
            >
              <item.icon
                size={18}
                className={isActive ? "text-purple-400" : ""}
              />
              {(isOverlay || !collapsed) && (
                <>
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="ml-auto bg-pink-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {!isOverlay && collapsed && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
              )}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-r" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/5 space-y-2">
        <button
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all ${!isOverlay && collapsed ? "justify-center" : ""}`}
        >
          <Settings size={18} />
          {(isOverlay || !collapsed) && (
            <span className="text-sm font-medium">Settings</span>
          )}
        </button>

        {(isOverlay || !collapsed) && (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/3 border border-white/5">
            <Avatar name={userName} gradient size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">
                {userName}
              </p>
              <p className="text-xs text-slate-500 truncate">{userRole}</p>
            </div>
            <button
              onClick={logout}
              className="text-slate-500 hover:text-red-400 transition-colors"
              title="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Desktop collapse toggle */}
      {!isOverlay && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[#1E293B] border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors shadow-lg z-10"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      )}
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex h-full">
        <SidebarContent isOverlay={false} />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Sidebar panel — slides in from left */}
          <div
            className="relative h-full"
            style={{
              animation: "slideInLeft 0.25s cubic-bezier(0.4,0,0.2,1) forwards",
            }}
          >
            <SidebarContent isOverlay={true} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0.6; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
