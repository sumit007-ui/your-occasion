import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-8 md:px-20 max-w-[1440px] mx-auto overflow-hidden">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32 items-center mb-32 relative">
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <h1 className="font-display text-6xl md:text-8xl text-primary italic leading-tight mb-8 relative">
            Our <br /> Heritage
          </h1>
          <p className="text-on-surface-variant font-light text-lg leading-relaxed max-w-lg mb-12 relative">
            Since our inception, Your Occasion has been dedicated to the pursuit of perfection. 
            We don't just plan events; we architect legacies. Our expertise is rooted in the grand tradition of Indian hospitality, elevated by global luxury standards.
          </p>
          <div className="flex gap-12 relative">
            <div>
              <span className="block font-display text-4xl text-primary mb-2">15+</span>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant">Years of Excellence</span>
            </div>
            <div>
              <span className="block font-display text-4xl text-primary mb-2">500+</span>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant">Bespoke Events</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] bg-surface-container-low border border-white/5 overflow-hidden group relative">
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-50 z-10 pointer-events-none" />
            <Image 
              src="/images/heritage_about.png" 
              alt="Heritage Architecture" 
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-12 -right-12 w-56 h-56 border border-primary/20 backdrop-blur-3xl hidden md:flex items-center justify-center p-8 text-center group z-20">
            <div className="absolute inset-2 border border-primary/10" />
            <div className="relative">
              <span className="block font-display text-primary text-xl italic mb-1">Since</span>
              <span className="block font-display text-primary text-4xl">2009</span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mt-4">India & The World</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-32">
        <div className="text-center mb-20">
          <span className="text-primary text-xs uppercase tracking-[0.4em] font-semibold mb-4 block">The Philosophy</span>
          <h2 className="font-display text-4xl md:text-6xl text-white italic">Heritage & <span className="text-primary not-italic font-bold">Innovation</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Regal Curations",
              desc: "We blend India's rich royal heritage with avant-garde design to create timeless celebrations.",
              icon: "auto_awesome"
            },
            {
              title: "Artisanal Craft",
              desc: "From hand-woven drapes to custom silver thalis, we collaborate with India's finest master artisans.",
              icon: "diamond"
            },
            {
              title: "Iconic Venues",
              desc: "Unparalleled access to the world's most exclusive heritage palaces, private islands, and luxury estates.",
              icon: "castle"
            }
          ].map((item, idx) => (
            <div key={idx} className="p-12 border border-white/5 bg-surface/30 backdrop-blur-2xl hover:border-primary/40 transition-all duration-700 group">
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block group-hover:scale-110 transition-transform">{item.icon}</span>
              <h3 className="font-display text-2xl text-white mb-4">{item.title}</h3>
              <p className="text-on-surface-variant font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Presence Section - Focused on India & Major Hubs */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-surface/10 border border-white/5 p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <span className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Our Presence</span>
            <h2 className="font-display text-4xl md:text-5xl text-white italic mb-8">Rooted in Heritage, <br /> Global in Scale</h2>
            <p className="text-on-surface-variant font-light leading-relaxed max-w-md mb-12">
              With our headquarters in New Delhi and ateliers in major luxury hubs, we bring Indian opulence to the world's most iconic stages.
            </p>
            <div className="grid grid-cols-2 gap-12">
              {[
                { city: "New Delhi", region: "Flagship HQ" },
                { city: "Udaipur", region: "Heritage Atelier" },
                { city: "London", region: "Global Liaison" },
                { city: "Dubai", region: "Middle East Hub" }
              ].map((loc, idx) => (
                <div key={idx} className="border-l border-primary/20 pl-6 py-2">
                  <span className="block text-white font-display text-2xl mb-1">{loc.city}</span>
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-primary/70">{loc.region}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="aspect-[4/3] bg-surface-container border border-white/10 relative overflow-hidden shadow-2xl">
              <Image 
                src="/images/lake_palace.png" 
                alt="Global Events Presence" 
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-background/80 border border-white/10 p-8 backdrop-blur-2xl z-20">
               <span className="material-symbols-outlined text-primary text-4xl mb-3">public</span>
               <p className="text-[11px] uppercase tracking-[0.3em] text-white font-bold">24/7 Royal Concierge</p>
               <p className="text-[9px] text-on-surface-variant mt-1">International Support Network</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
