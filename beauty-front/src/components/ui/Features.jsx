import { Badge } from "lucide-react";
import { FEATURES } from "../../constants";

const Features = () => {
  return (
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
  );
};

export default Features;
