import { Globe, InspectionPanel, Sparkles, X } from "lucide-react";

const Footer = () => {
  return (
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
            {["Privacy", "Terms", "Support", "Blog", "Careers"].map((item) => (
              <button
                key={item}
                className="hover:text-slate-300 transition-colors"
              >
                {item}
              </button>
            ))}
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
  );
};

export default Footer;
