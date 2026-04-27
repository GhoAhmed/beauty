const SocialProof = () => {
  return (
    <section className="py-12 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm text-slate-500 mb-8 uppercase tracking-widest">
          Trusted by 12,000+ beauty professionals worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-40">
          {[
            "Luxe Salon",
            "Studio Amara",
            "The Beauty Bar",
            "Bloom Spa",
            "Elite Cuts",
            "Glow Studio",
          ].map((brand) => (
            <span key={brand} className="text-lg font-bold text-slate-300">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
