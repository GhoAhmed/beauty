import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { StatCard, Card, Table, Avatar } from "../components/ui";
import {
  Users,
  DollarSign,
  Scissors,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react";

const USERS = [
  {
    name: "Sarah Mitchell",
    email: "sarah@luxestudio.com",
    role: "Owner",
    salons: 2,
    joined: "Jan 12, 2025",
    status: "active",
    revenue: "$12,450",
  },
  {
    name: "Aisha Patel",
    email: "aisha@glowspa.com",
    role: "Owner",
    salons: 1,
    joined: "Feb 3, 2025",
    status: "active",
    revenue: "$8,200",
  },
  {
    name: "Marcus Thompson",
    email: "marcus@hairelite.com",
    role: "Owner",
    salons: 3,
    joined: "Dec 8, 2024",
    status: "suspended",
    revenue: "$0",
  },
  {
    name: "Emma Johnson",
    email: "emma.j@gmail.com",
    role: "Client",
    salons: 0,
    joined: "Mar 1, 2025",
    status: "active",
    revenue: "-",
  },
  {
    name: "Nina Kowalski",
    email: "nina@nailbar.pl",
    role: "Owner",
    salons: 1,
    joined: "Apr 2, 2025",
    status: "pending",
    revenue: "$0",
  },
  {
    name: "Carlos Mendez",
    email: "carlos@barberkings.es",
    role: "Owner",
    salons: 1,
    joined: "Apr 18, 2025",
    status: "active",
    revenue: "$3,100",
  },
];

const PLATFORM_STATS = [
  { month: "Jan", bookings: 1200, revenue: 48000 },
  { month: "Feb", bookings: 1450, revenue: 58000 },
  { month: "Mar", bookings: 1300, revenue: 52000 },
  { month: "Apr", bookings: 1800, revenue: 72000 },
];

const RECENT_ACTIVITY = [
  {
    text: "New salon registered: Bloom Beauty Bar",
    time: "5m ago",
    type: "new",
  },
  {
    text: "Payout processed: $2,400 to Sarah M.",
    time: "12m ago",
    type: "payment",
  },
  { text: "Dispute opened: Order #8841", time: "1h ago", type: "alert" },
  {
    text: "New client milestone: 12,000 users",
    time: "2h ago",
    type: "success",
  },
  {
    text: "Subscription upgrade: Marcus T. → Pro",
    time: "3h ago",
    type: "new",
  },
];

const STATUS_MAP = {
  active: {
    label: "Active",
    cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  suspended: {
    label: "Suspended",
    cls: "bg-red-500/10 text-red-300 border-red-500/20",
  },
  pending: {
    label: "Pending",
    cls: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
};

const ACTIVITY_ICONS = {
  new: { icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
  payment: {
    icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  alert: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10" },
  success: { icon: CheckCircle, color: "text-blue-400", bg: "bg-blue-500/10" },
};

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = USERS.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      u.status === filter ||
      u.role.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  const maxRevenue = Math.max(...PLATFORM_STATS.map((s) => s.revenue));

  return (
    <DashboardLayout role="admin" title="Admin Panel">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value="12,480"
          change="+324 this month"
          icon={Users}
          color="purple"
        />
        <StatCard
          label="Platform Revenue"
          value="$230K"
          change="+18% MoM"
          icon={DollarSign}
          color="pink"
        />
        <StatCard
          label="Active Salons"
          value="1,842"
          change="+47 new"
          icon={Scissors}
          color="amber"
        />
        <StatCard
          label="Bookings Today"
          value="4,291"
          change="↑ 12%"
          icon={TrendingUp}
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Platform Revenue</h2>
                <p className="text-slate-400 text-sm">Monthly overview</p>
              </div>
              <div className="flex gap-2">
                {["3M", "6M", "1Y"].map((t) => (
                  <button
                    key={t}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all ${t === "6M" ? "bg-purple-600/30 text-purple-300 border border-purple-500/30" : "text-slate-400 hover:bg-white/5"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end gap-4 h-40 mb-3">
              {PLATFORM_STATS.map((stat, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full relative rounded-t-xl overflow-hidden"
                    style={{ height: `${(stat.revenue / maxRevenue) * 100}%` }}
                  >
                    <div
                      className={`w-full h-full ${i === 3 ? "bg-gradient-to-t from-purple-600 to-pink-500" : "bg-white/10 hover:bg-white/15"} transition-all`}
                    />
                  </div>
                  <span className="text-xs text-slate-400">{stat.month}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/5">
              {PLATFORM_STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-xs text-slate-400">
                    {stat.month} Bookings
                  </p>
                  <p className="font-bold text-sm">
                    {stat.bookings.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Activity feed */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Live Activity</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-400">Live</span>
            </div>
          </div>

          <div className="space-y-3">
            {RECENT_ACTIVITY.map((a, i) => {
              const meta = ACTIVITY_ICONS[a.type];
              return (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl ${meta.bg} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <meta.icon size={14} className={meta.color} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 leading-snug">
                      {a.text}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock size={10} /> {a.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Users table */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold">User Management</h2>
            <p className="text-sm text-slate-400">
              {filtered.length} users found
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#0F172A]/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 w-48"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#0F172A]/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-purple-500/40"
            >
              <option value="all">All roles</option>
              <option value="owner">Owners</option>
              <option value="client">Clients</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <Table
          headers={[
            "User",
            "Role",
            "Salons",
            "Revenue",
            "Joined",
            "Status",
            "Actions",
          ]}
          rows={filtered.map((u) => {
            const st = STATUS_MAP[u.status];
            return [
              <div className="flex items-center gap-3">
                <Avatar name={u.name} gradient size="sm" />
                <div>
                  <p className="text-sm font-medium text-white">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
              </div>,
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${u.role === "Owner" ? "bg-purple-500/10 text-purple-300" : "bg-blue-500/10 text-blue-300"}`}
              >
                {u.role}
              </span>,
              <span className="text-slate-300">{u.salons || "—"}</span>,
              <span
                className={
                  u.revenue !== "-" && u.revenue !== "$0"
                    ? "text-emerald-400 font-medium"
                    : "text-slate-500"
                }
              >
                {u.revenue}
              </span>,
              <span className="text-slate-400 text-xs">{u.joined}</span>,
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full border ${st.cls}`}
              >
                {st.label}
              </span>,
              <div className="flex gap-1.5">
                <button className="text-xs text-purple-400 hover:text-purple-300 px-2 py-1 rounded-lg hover:bg-purple-500/10 transition-all">
                  View
                </button>
                {u.status !== "suspended" ? (
                  <button className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded-lg hover:bg-red-500/10 transition-all">
                    Suspend
                  </button>
                ) : (
                  <button className="text-xs text-emerald-400 hover:text-emerald-300 px-2 py-1 rounded-lg hover:bg-emerald-500/10 transition-all">
                    Restore
                  </button>
                )}
              </div>,
            ];
          })}
        />
      </Card>

      {/* Platform health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Server Health",
            value: "99.9%",
            color: "emerald",
            desc: "All systems operational",
          },
          {
            label: "API Response",
            value: "142ms",
            color: "blue",
            desc: "Average response time",
          },
          {
            label: "Error Rate",
            value: "0.02%",
            color: "amber",
            desc: "Last 24 hours",
          },
        ].map((metric, i) => {
          const colors = {
            emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          };
          return (
            <div
              key={i}
              className={`rounded-2xl p-4 border ${colors[metric.color]}`}
            >
              <p className="text-xs font-medium opacity-70 mb-1">
                {metric.label}
              </p>
              <p className="text-2xl font-black">{metric.value}</p>
              <p className="text-xs mt-1 opacity-60">{metric.desc}</p>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
