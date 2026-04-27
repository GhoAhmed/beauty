import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { StatCard, Card, Badge, Button, Modal } from "../components/ui";
import {
  Calendar,
  Clock,
  Star,
  Heart,
  ChevronRight,
  MapPin,
  Scissors,
  Check,
} from "lucide-react";

const SERVICES = [
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

const HISTORY = [
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

const UPCOMING = [
  {
    service: "Lash Extensions",
    salon: "Eye Candy",
    date: "Apr 30, 2025",
    time: "2:00 PM",
    status: "confirmed",
  },
];

const CATS = ["All", "Hair", "Skin", "Nails", "Lashes", "Brows", "Wellness"];

export default function ClientDashboard() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [showBook, setShowBook] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookStep, setBookStep] = useState(1);

  const filtered =
    selectedCat === "All"
      ? SERVICES
      : SERVICES.filter((s) => s.category === selectedCat);

  return (
    <DashboardLayout role="client" title="My Dashboard">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-purple-600/20 via-pink-500/10 to-transparent rounded-2xl p-6 border border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Good morning ✨</p>
            <h2 className="text-2xl font-bold">Emma Johnson</h2>
            <p className="text-slate-400 text-sm mt-1">
              You have 1 upcoming appointment
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 mb-1">Loyalty Points</p>
            <p className="text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              840
            </p>
            <p className="text-xs text-amber-400">Silver Member</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Bookings"
          value="18"
          icon={Calendar}
          color="purple"
        />
        <StatCard
          label="Total Spent"
          value="$2,180"
          icon={Heart}
          color="pink"
        />
        <StatCard label="Fav Salons" value="4" icon={Star} color="amber" />
        <StatCard
          label="Next Visit"
          value="2 days"
          icon={Clock}
          color="emerald"
        />
      </div>

      {/* Upcoming */}
      {UPCOMING.length > 0 && (
        <Card>
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          {UPCOMING.map((appt, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-purple-600/10 rounded-xl border border-purple-500/20"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Scissors size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{appt.service}</p>
                <p className="text-sm text-slate-400">{appt.salon}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar size={11} /> {appt.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock size={11} /> {appt.time}
                  </span>
                </div>
              </div>
              <Badge variant="green">Confirmed</Badge>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Reschedule
                </Button>
                <Button variant="danger" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Book a service */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Book a Service</h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all
                  ${selectedCat === cat ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((svc, i) => (
            <div
              key={i}
              className="bg-[#0F172A]/50 rounded-xl p-4 border border-white/5 hover:border-purple-500/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <Badge variant="purple">{svc.category}</Badge>
                <button className="text-slate-500 hover:text-pink-400 transition-colors">
                  <Heart size={14} />
                </button>
              </div>
              <h3 className="font-semibold text-sm mb-1">{svc.name}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                <MapPin size={10} /> {svc.salon}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {svc.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-amber-400" /> {svc.rating}
                  </span>
                </div>
                <span className="text-lg font-bold text-white">
                  {svc.price}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-purple-600/20"
                onClick={() => {
                  setSelectedService(svc);
                  setShowBook(true);
                  setBookStep(1);
                }}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* History */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Booking History</h2>
          <Button variant="ghost" size="sm">
            View all <ChevronRight size={14} />
          </Button>
        </div>
        <div className="space-y-3">
          {HISTORY.map((h, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3.5 rounded-xl bg-[#0F172A]/40 border border-white/5"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Check size={16} className="text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{h.service}</p>
                <p className="text-xs text-slate-400">
                  {h.salon} · {h.date}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: h.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={11}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-emerald-400">
                {h.amount}
              </span>
              <Button variant="ghost" size="sm">
                Rebook
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Booking Modal */}
      <Modal
        isOpen={showBook}
        onClose={() => setShowBook(false)}
        title={
          selectedService ? `Book ${selectedService.name}` : "Book Service"
        }
        size="lg"
      >
        {selectedService && (
          <div>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-1 rounded-full ${bookStep >= s ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/10"}`}
                />
              ))}
            </div>

            {bookStep === 1 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-slate-300 mb-4">
                  Select a date and time
                </p>
                <div className="grid grid-cols-7 gap-1.5 mb-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (d, i) => (
                      <button
                        key={d}
                        className={`flex flex-col items-center py-2 px-1 rounded-xl text-xs transition-all ${i === 2 ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}
                      >
                        <span>{d}</span>
                        <span className="font-bold mt-0.5">{28 + i}</span>
                      </button>
                    ),
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    "9:00 AM",
                    "10:00 AM",
                    "11:00 AM",
                    "1:00 PM",
                    "2:00 PM",
                    "3:00 PM",
                    "4:00 PM",
                    "5:00 PM",
                  ].map((t, i) => (
                    <button
                      key={t}
                      className={`py-2 rounded-xl text-xs font-medium transition-all ${i === 3 ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white" : i === 1 || i === 5 ? "bg-white/5 text-slate-500 line-through cursor-not-allowed" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setBookStep(2)}
                >
                  Continue
                </Button>
              </div>
            )}

            {bookStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-slate-300 mb-4">
                  Any special requests?
                </p>
                <textarea
                  rows={4}
                  placeholder="Tell your stylist about your preferences, allergies, or special requests..."
                  className="w-full bg-[#0F172A]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-500/60 resize-none"
                />
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setBookStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => setBookStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {bookStep === 3 && (
              <div className="space-y-4">
                <div className="bg-[#0F172A]/50 rounded-xl p-4 border border-white/5">
                  <h3 className="font-semibold mb-3">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Service</span>
                      <span>{selectedService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Salon</span>
                      <span>{selectedService.salon}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date</span>
                      <span>Wed, Apr 30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Time</span>
                      <span>1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration</span>
                      <span>{selectedService.duration}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t border-white/5 mt-2">
                      <span>Total</span>
                      <span className="text-purple-400">
                        {selectedService.price}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setBookStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => setShowBook(false)}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
