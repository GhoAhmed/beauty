import { Badge } from "lucide-react";
import { STEPS } from "../../constants";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#1E293B]/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="pink">How it works</Badge>
          <h2 className="text-4xl font-bold mt-4 mb-4">
            Up and running in 10 minutes
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            No technical setup. No training needed. Just a better way to manage
            your beauty business.
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
  );
};

export default HowItWorks;
