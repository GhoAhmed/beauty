import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  StatCard,
  Card,
  Badge,
  Button,
  Table,
  Avatar,
  Modal,
} from "../components/ui";
import {
  DollarSign,
  Users,
  Calendar,
  Star,
  Plus,
  ChevronRight,
  MoreHorizontal,
  Scissors,
  Phone,
} from "lucide-react";

const APPOINTMENTS_TODAY = [
  {
    id: 1,
    client: "Maria Garcia",
    service: "Balayage + Blow Dry",
    time: "09:00",
    duration: "2h",
    status: "confirmed",
    amount: "$185",
  },
  {
    id: 2,
    client: "Aisha Patel",
    service: "French Manicure",
    time: "11:00",
    duration: "45m",
    status: "confirmed",
    amount: "$65",
  },
  {
    id: 3,
    client: "Sophie Chen",
    service: "Facial Treatment",
    time: "12:30",
    duration: "1h",
    status: "in-progress",
    amount: "$120",
  },
  {
    id: 4,
    client: "Julia Roberts",
    service: "Hair Cut & Style",
    time: "14:00",
    duration: "1h",
    status: "pending",
    amount: "$90",
  },
  {
    id: 5,
    client: "Emma Wilson",
    service: "Lash Extensions",
    time: "15:30",
    duration: "1.5h",
    status: "confirmed",
    amount: "$150",
  },
];

const CLIENTS = [
  {
    name: "Maria Garcia",
    visits: 14,
    spent: "$2,340",
    last: "2 days ago",
    loyalty: "Gold",
  },
  {
    name: "Aisha Patel",
    visits: 8,
    spent: "$980",
    last: "Today",
    loyalty: "Silver",
  },
  {
    name: "Sophie Chen",
    visits: 22,
    spent: "$4,100",
    last: "1 week ago",
    loyalty: "Platinum",
  },
  {
    name: "Julia Roberts",
    visits: 3,
    spent: "$360",
    last: "3 weeks ago",
    loyalty: "Bronze",
  },
  {
    name: "Emma Wilson",
    visits: 11,
    spent: "$1,650",
    last: "Yesterday",
    loyalty: "Silver",
  },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEK_SLOTS = [
  {
    day: 0,
    time: "09:00",
    client: "Maria G.",
    color: "bg-purple-500/20 border-purple-500/30 text-purple-300",
  },
  {
    day: 0,
    time: "11:00",
    client: "Aisha P.",
    color: "bg-pink-500/20 border-pink-500/30 text-pink-300",
  },
  {
    day: 1,
    time: "10:00",
    client: "Sophie C.",
    color: "bg-indigo-500/20 border-indigo-500/30 text-indigo-300",
  },
  {
    day: 1,
    time: "14:00",
    client: "Emma W.",
    color: "bg-amber-500/20 border-amber-500/30 text-amber-300",
  },
  {
    day: 2,
    time: "09:00",
    client: "Julia R.",
    color: "bg-rose-500/20 border-rose-500/30 text-rose-300",
  },
  {
    day: 3,
    time: "11:00",
    client: "Chloe M.",
    color: "bg-teal-500/20 border-teal-500/30 text-teal-300",
  },
  {
    day: 4,
    time: "15:00",
    client: "Nina K.",
    color: "bg-purple-500/20 border-purple-500/30 text-purple-300",
  },
  {
    day: 5,
    time: "10:00",
    client: "Maria G.",
    color: "bg-pink-500/20 border-pink-500/30 text-pink-300",
  },
  {
    day: 5,
    time: "13:00",
    client: "Aisha P.",
    color: "bg-amber-500/20 border-amber-500/30 text-amber-300",
  },
];

const REVENUE_BARS = [65, 45, 80, 55, 90, 70, 85];

const LOYALTY_COLORS = {
  Platinum: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  Gold: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  Silver: "bg-slate-500/10 text-slate-300 border-slate-400/20",
  Bronze: "bg-orange-500/10 text-orange-300 border-orange-500/20",
};

export default function OwnerDashboard() {
  const [showNewAppt, setShowNewAppt] = useState(false);

  const statusMap = {
    confirmed: {
      label: "Confirmed",
      cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    },
    pending: {
      label: "Pending",
      cls: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    },
    "in-progress": {
      label: "In Progress",
      cls: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    },
    cancelled: {
      label: "Cancelled",
      cls: "bg-red-500/10 text-red-300 border-red-500/20",
    },
  };

  return (
    <DashboardLayout role="owner" title="Owner Dashboard">
      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Today's Revenue"
          value="$2,450"
          change="+12% vs yesterday"
          icon={DollarSign}
          color="purple"
        />
        <StatCard
          label="Appointments"
          value="8"
          change="+3 from last week"
          icon={Calendar}
          color="pink"
        />
        <StatCard
          label="Active Clients"
          value="142"
          change="+5 this month"
          icon={Users}
          color="amber"
        />
        <StatCard
          label="Avg Rating"
          value="4.9 ★"
          change="Top 5%"
          icon={Star}
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Today's Appointments</h2>
                <p className="text-sm text-slate-400">Monday, April 28</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowNewAppt(true)}
              >
                <Plus size={14} /> New booking
              </Button>
            </div>

            <div className="space-y-3">
              {APPOINTMENTS_TODAY.map((appt) => {
                const s = statusMap[appt.status];
                return (
                  <div
                    key={appt.id}
                    className="flex items-center gap-4 p-3.5 rounded-xl bg-[#0F172A]/40 border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="text-center w-14 shrink-0">
                      <p className="text-sm font-bold text-white">
                        {appt.time}
                      </p>
                      <p className="text-xs text-slate-500">{appt.duration}</p>
                    </div>
                    <div className="h-8 w-px bg-gradient-to-b from-purple-500/40 to-pink-500/40 rounded shrink-0" />
                    <Avatar name={appt.client} gradient size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {appt.client}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {appt.service}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${s.cls}`}
                    >
                      {s.label}
                    </span>
                    <span className="text-sm font-semibold text-white shrink-0">
                      {appt.amount}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-200 transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Revenue mini chart + quick actions */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Weekly Revenue</h3>
              <Badge variant="green">+18%</Badge>
            </div>
            <p className="text-3xl font-black mb-6">$14,280</p>
            <div className="flex items-end gap-1.5 h-24">
              {REVENUE_BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-full rounded-t-lg transition-all ${i === 4 ? "bg-gradient-to-t from-purple-600 to-pink-500" : "bg-white/10"}`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-slate-500">
                    {WEEK_DAYS[i].slice(0, 1)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  icon: Plus,
                  label: "New Booking",
                  color: "text-purple-400",
                  bg: "bg-purple-500/10",
                },
                {
                  icon: Users,
                  label: "Add Client",
                  color: "text-pink-400",
                  bg: "bg-pink-500/10",
                },
                {
                  icon: Scissors,
                  label: "Add Service",
                  color: "text-amber-400",
                  bg: "bg-amber-500/10",
                },
                {
                  icon: Phone,
                  label: "Send SMS",
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/10",
                },
              ].map((a) => (
                <button
                  key={a.label}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl ${a.bg} hover:brightness-125 transition-all`}
                >
                  <a.icon size={18} className={a.color} />
                  <span className="text-xs font-medium text-slate-300">
                    {a.label}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Weekly Calendar */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Weekly Calendar</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              ← Prev
            </Button>
            <span className="text-sm font-medium">Apr 28 – May 4, 2025</span>
            <Button variant="ghost" size="sm">
              Next →
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 gap-3 min-w-[640px]">
            {WEEK_DAYS.map((day, di) => {
              const dayAppts = WEEK_SLOTS.filter((s) => s.day === di);
              return (
                <div
                  key={di}
                  className={`rounded-xl p-3 ${di === 0 ? "bg-purple-600/10 border border-purple-500/20" : "bg-[#0F172A]/40 border border-white/5"}`}
                >
                  <p className="text-xs text-slate-400 mb-1">{day}</p>
                  <p
                    className={`text-lg font-bold mb-3 ${di === 0 ? "text-purple-300" : ""}`}
                  >
                    {28 + di}
                  </p>
                  <div className="space-y-1.5">
                    {dayAppts.map((appt, ai) => (
                      <div
                        key={ai}
                        className={`text-[10px] font-medium px-2 py-1.5 rounded-lg border ${appt.color} truncate`}
                      >
                        {appt.time} {appt.client}
                      </div>
                    ))}
                    {dayAppts.length === 0 && (
                      <div className="text-[10px] text-slate-600 text-center py-2">
                        Free
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Clients table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Top Clients</h2>
          <Button variant="ghost" size="sm">
            View all <ChevronRight size={14} />
          </Button>
        </div>
        <Table
          headers={[
            "Client",
            "Visits",
            "Total Spent",
            "Last Visit",
            "Loyalty",
            "Actions",
          ]}
          rows={CLIENTS.map((c) => [
            <div className="flex items-center gap-3">
              <Avatar name={c.name} gradient size="sm" />
              <span className="font-medium text-sm">{c.name}</span>
            </div>,
            <span className="text-slate-300">{c.visits}</span>,
            <span className="text-emerald-400 font-medium">{c.spent}</span>,
            <span className="text-slate-400 text-xs">{c.last}</span>,
            <span
              className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${LOYALTY_COLORS[c.loyalty]}`}
            >
              {c.loyalty}
            </span>,
            <button className="text-purple-400 hover:text-purple-300 text-xs font-medium">
              View →
            </button>,
          ])}
        />
      </Card>

      {/* New Booking Modal */}
      <Modal
        isOpen={showNewAppt}
        onClose={() => setShowNewAppt(false)}
        title="New Appointment"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">
                Client
              </label>
              <select className="w-full bg-[#0F172A]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20">
                <option>Select client...</option>
                {CLIENTS.map((c) => (
                  <option key={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">
                Service
              </label>
              <select className="w-full bg-[#0F172A]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20">
                <option>Select service...</option>
                <option>Balayage + Blow Dry</option>
                <option>French Manicure</option>
                <option>Facial Treatment</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">Date</label>
              <input
                type="date"
                className="w-full bg-[#0F172A]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">Time</label>
              <input
                type="time"
                className="w-full bg-[#0F172A]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Notes</label>
            <textarea
              rows={3}
              placeholder="Special requests or notes..."
              className="w-full bg-[#0F172A]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowNewAppt(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => setShowNewAppt(false)}
            >
              Create Booking
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
