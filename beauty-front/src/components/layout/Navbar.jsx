import { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Sparkles,
  Menu,
} from "lucide-react";
import { Avatar, Badge } from "../ui";
import { useAuth } from "../../context/AuthContext";
import { notifs } from "../../constants";

export default function Navbar({ title, role = "owner", onMobileMenuToggle }) {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const userName =
    user?.name ||
    (role === "owner"
      ? "Sarah Mitchell"
      : role === "admin"
        ? "Admin User"
        : "Emma Johnson");

  return (
    <header className="h-16 bg-[#1E293B]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-[#F8FAFC]">{title}</h1>
      </div>

      <div className="flex-1 max-w-sm mx-8 hidden md:block">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            placeholder="Search clients, services..."
            className="w-full bg-[#0F172A]/60 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifs(!showNotifs);
              setShowProfile(false);
            }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full" />
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 bg-[#1E293B] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-sm font-semibold">Notifications</span>
                <Badge variant="pink">3 new</Badge>
              </div>
              <div className="divide-y divide-white/5">
                {notifs.map((n, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-white/3 transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`}
                    />
                    <div>
                      <p className="text-sm text-slate-200">{n.text}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-white/5">
                <button className="text-xs text-purple-400 hover:text-purple-300 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifs(false);
            }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all"
          >
            <Avatar name={userName} gradient size="sm" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-slate-200 leading-tight">
                {userName}
              </p>
              <p className="text-xs text-slate-500 capitalize">{role}</p>
            </div>
            <ChevronDown size={14} className="text-slate-500 hidden md:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-56 bg-[#1E293B] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm font-semibold text-slate-200">
                  {userName}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {role} account
                </p>
              </div>
              <div className="p-1.5">
                {[
                  { icon: User, label: "Profile" },
                  { icon: Settings, label: "Settings" },
                  { icon: Sparkles, label: "Upgrade Plan", accent: true },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors
                    ${item.accent ? "text-purple-400 hover:bg-purple-500/10" : "text-slate-300 hover:bg-white/5"}`}
                  >
                    <item.icon size={15} />
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="p-1.5 border-t border-white/5">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
