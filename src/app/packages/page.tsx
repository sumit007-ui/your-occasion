export default function PackagesPage() {
  const packages = [
    {
      name: "The Atelier",
      tier: "Bespoke",
      price: "Inquire",
      features: [
        "Full Concept Development",
        "Artisanal Venue Scouting",
        "Master Vendor Curation",
        "On-Site Concierge Team",
        "Private Digital Archive"
      ],
      description: "A meticulously crafted experience for those who seek the extraordinary in every detail."
    },
    {
      name: "The Maison",
      tier: "Prestige",
      price: "Inquire",
      features: [
        "Global Destination Management",
        "Exclusive Talent Acquisition",
        "Bespoke Gifting Suites",
        "Executive Protection Services",
        "Year-Round Event Advisory"
      ],
      description: "Unrivaled access and comprehensive management for the world's most discerning hosts."
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-8 md:px-20 max-w-[1440px] mx-auto overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <header className="mb-24 relative">
        <span className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Private Office</span>
        <h1 className="font-display text-5xl md:text-7xl text-on-surface italic max-w-4xl leading-tight">
          Exclusive Engagement <br /> for the Discerning
        </h1>
        <p className="mt-8 text-on-surface-variant font-light text-lg max-w-2xl">
          Our Private Office provides a direct conduit to our most senior curators and restricted resources. 
          Engagement is strictly limited to ensure uncompromising attention.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
        {packages.map((pkg, idx) => (
          <div key={idx} className="p-12 border border-white/5 bg-surface/30 backdrop-blur-3xl relative group hover:border-primary/20 transition-all duration-700">
            <div className="flex justify-between items-start mb-12">
              <div>
                <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block">{pkg.tier}</span>
                <h2 className="font-display text-4xl text-on-surface">{pkg.name}</h2>
              </div>
              <div className="text-right">
                <span className="text-on-surface-variant font-light text-sm uppercase tracking-widest block mb-1">Starting At</span>
                <span className="font-display text-2xl text-primary">{pkg.price}</span>
              </div>
            </div>
            
            <p className="text-on-surface-variant font-light leading-relaxed mb-12 border-l border-primary/20 pl-6 italic">
              "{pkg.description}"
            </p>

            <ul className="space-y-6 mb-16">
              {pkg.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-4 text-on-surface-variant group/item">
                  <span className="material-symbols-outlined text-primary text-sm opacity-40 group-hover/item:opacity-100 transition-opacity">check_circle</span>
                  <span className="font-light tracking-wide text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-primary text-on-primary py-5 text-xs uppercase tracking-[0.3em] font-semibold hover:opacity-90 transition-all duration-300">
              Apply for Consultation
            </button>
          </div>
        ))}
      </div>

      <section className="mt-32 p-16 border border-primary/10 bg-primary/5 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-display text-3xl text-primary italic mb-6">Bespoke Inquiries</h3>
          <p className="text-on-surface-variant font-light max-w-xl mx-auto mb-10">
            For requirements that transcend our standard tiers, our principal curators are available for 
            discreet discussions regarding your unique vision.
          </p>
          <a href="/book" className="text-primary text-xs uppercase tracking-[0.3em] border-b border-primary/30 pb-2 hover:border-primary transition-all">
            Direct Line to Principal
          </a>
        </div>
      </section>
    </main>
  );
}
