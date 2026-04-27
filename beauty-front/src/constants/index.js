import {
  AlertCircle,
  BarChart3,
  Calendar,
  CalendarDays,
  CheckCircle,
  DollarSign,
  LayoutDashboard,
  MessageSquare,
  Scissors,
  Shield,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const notifs = [
  { text: "New booking from Maria G.", time: "2m ago", dot: "bg-purple-400" },
  { text: "Payment received $85", time: "14m ago", dot: "bg-emerald-400" },
  { text: "3 appointments tomorrow", time: "1h ago", dot: "bg-amber-400" },
];

export const NAV_OWNER = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: CalendarDays, label: "Appointments", id: "appointments", badge: 3 },
  { icon: Scissors, label: "Services", id: "services" },
  { icon: Users, label: "Clients", id: "clients" },
  { icon: TrendingUp, label: "Analytics", id: "analytics" },
  { icon: Star, label: "Reviews", id: "reviews" },
  { icon: MessageSquare, label: "Messages", id: "messages", badge: 2 },
];

export const NAV_CLIENT = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: CalendarDays, label: "Book Now", id: "book" },
  { icon: Star, label: "My Bookings", id: "bookings" },
  { icon: MessageSquare, label: "Messages", id: "messages" },
];

export const NAV_ADMIN = [
  { icon: LayoutDashboard, label: "Overview", id: "dashboard" },
  { icon: Users, label: "Users", id: "users" },
  { icon: Scissors, label: "Salons", id: "salons" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: ShieldCheck, label: "Moderation", id: "moderation" },
];

export const USERS = [
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

export const PLATFORM_STATS = [
  { month: "Jan", bookings: 1200, revenue: 48000 },
  { month: "Feb", bookings: 1450, revenue: 58000 },
  { month: "Mar", bookings: 1300, revenue: 52000 },
  { month: "Apr", bookings: 1800, revenue: 72000 },
];

export const RECENT_ACTIVITY = [
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

export const STATUS_MAP = {
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

export const ACTIVITY_ICONS = {
  new: { icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
  payment: {
    icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  alert: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10" },
  success: { icon: CheckCircle, color: "text-blue-400", bg: "bg-blue-500/10" },
};

export const SERVICES = [
  {
    name: "Balayage & Blow Dry",
    salon: "Luxe Studio",
    duration: "2h",
    price: "$185",
    rating: 4.9,
    category: "Hair",
  },
  {
    name: "Classic Facial",
    salon: "Glow Spa",
    duration: "1h",
    price: "$120",
    rating: 4.8,
    category: "Skin",
  },
  {
    name: "French Manicure",
    salon: "Nail Bar",
    duration: "45m",
    price: "$65",
    rating: 4.7,
    category: "Nails",
  },
  {
    name: "Lash Extensions",
    salon: "Eye Candy",
    duration: "1.5h",
    price: "$150",
    rating: 5.0,
    category: "Lashes",
  },
  {
    name: "Deep Tissue Massage",
    salon: "Zen Spa",
    duration: "1h",
    price: "$100",
    rating: 4.9,
    category: "Wellness",
  },
  {
    name: "Brow Lamination",
    salon: "Brow Studio",
    duration: "45m",
    price: "$75",
    rating: 4.8,
    category: "Brows",
  },
];

export const HISTORY = [
  {
    service: "Balayage & Blow Dry",
    salon: "Luxe Studio",
    date: "Apr 20, 2025",
    amount: "$185",
    status: "completed",
    rating: 5,
  },
  {
    service: "French Manicure",
    salon: "Nail Bar",
    date: "Apr 10, 2025",
    amount: "$65",
    status: "completed",
    rating: 5,
  },
  {
    service: "Classic Facial",
    salon: "Glow Spa",
    date: "Mar 28, 2025",
    amount: "$120",
    status: "completed",
    rating: 4,
  },
];

export const UPCOMING = [
  {
    service: "Lash Extensions",
    salon: "Eye Candy",
    date: "Apr 30, 2025",
    time: "2:00 PM",
    status: "confirmed",
  },
];

export const CATS = [
  "All",
  "Hair",
  "Skin",
  "Nails",
  "Lashes",
  "Brows",
  "Wellness",
];

export const FEATURES = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    desc: "AI-powered booking that fills your calendar and reduces no-shows by 60%.",
    color: "purple",
  },
  {
    icon: Users,
    title: "Client Management",
    desc: "Build lasting relationships with detailed client profiles, preferences & history.",
    color: "pink",
  },
  {
    icon: TrendingUp,
    title: "Revenue Analytics",
    desc: "Real-time insights on earnings, popular services, and growth opportunities.",
    color: "amber",
  },
  {
    icon: Scissors,
    title: "Service Catalog",
    desc: "Showcase your services beautifully with custom pricing, duration, and photos.",
    color: "indigo",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "Accept payments effortlessly with automated invoicing and tips management.",
    color: "emerald",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    desc: "Keep clients engaged with smart reminders, confirmations, and follow-ups.",
    color: "rose",
  },
];

export const STEPS = [
  {
    n: "01",
    title: "Create your profile",
    desc: "Set up your salon, add services, and customize your booking page in minutes.",
  },
  {
    n: "02",
    title: "Share your link",
    desc: "Give clients your unique booking URL or embed it on your existing website.",
  },
  {
    n: "03",
    title: "Manage & grow",
    desc: "Track appointments, payments, and client relationships from one dashboard.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Amira Hassan",
    role: "Hair Studio Owner, Paris",
    avatar: "AH",
    text: "Glamora transformed how I run my salon. Bookings are up 40% and I spend 3 fewer hours on admin every day.",
    rating: 5,
  },
  {
    name: "Sofia Reyes",
    role: "Freelance MUA, Madrid",
    avatar: "SR",
    text: "The client management features are incredible. My clients love being able to book instantly at midnight!",
    rating: 5,
  },
  {
    name: "Jessica Park",
    role: "Nail Artist, Seoul",
    avatar: "JP",
    text: "Switched from 3 different apps to just Glamora. My calendar has never been more organized.",
    rating: 5,
  },
];

export const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "Perfect for freelancers",
    features: [
      "Up to 30 bookings/mo",
      "1 staff member",
      "Basic analytics",
      "Client management",
    ],
    cta: "Start free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    desc: "For growing salons",
    features: [
      "Unlimited bookings",
      "Up to 5 staff",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "SMS reminders",
    ],
    cta: "Start 14-day trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$89",
    period: "per month",
    desc: "Multi-location businesses",
    features: [
      "Everything in Pro",
      "Unlimited staff",
      "Multi-location",
      "API access",
      "Dedicated support",
      "White-label",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

// Map nav labels to section IDs
export const NAV_LINKS = [
  { label: "Features", id: "features" },
  { label: "Pricing", id: "pricing" },
  { label: "How it works", id: "how-it-works" },
  { label: "Testimonials", id: "testimonials" },
];

export const APPOINTMENTS_TODAY = [
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

export const CLIENTS = [
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

export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const WEEK_SLOTS = [
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

export const REVENUE_BARS = [65, 45, 80, 55, 90, 70, 85];

export const LOYALTY_COLORS = {
  Platinum: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  Gold: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  Silver: "bg-slate-500/10 text-slate-300 border-slate-400/20",
  Bronze: "bg-orange-500/10 text-orange-300 border-orange-500/20",
};
