import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-20 max-w-[1440px] mx-auto overflow-hidden">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 lg:gap-32 items-center mb-16 md:mb-32 relative">
        <div className="relative group order-2 md:order-1">
          <div className="absolute -inset-4 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl text-primary italic leading-tight mb-6 md:mb-8 relative">
            Our <br /> Heritage
          </h1>
          <p className="text-on-surface-variant font-light text-base md:text-lg leading-relaxed max-w-lg mb-8 md:mb-12 relative">
            Since our inception, Your Occasion has been dedicated to the pursuit of perfection.
            We don&apos;t just plan events; we architect legacies. Our expertise is rooted in the grand tradition of Indian hospitality, elevated by global luxury standards.
          </p>
          <div className="flex gap-8 md:gap-12 relative">
            <div>
              <span className="block font-display text-3xl md:text-4xl text-primary mb-1 md:mb-2">15+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant">Years of Excellence</span>
            </div>
            <div>
              <span className="block font-display text-3xl md:text-4xl text-primary mb-1 md:mb-2">500+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant">Bespoke Events</span>
            </div>
          </div>
        </div>

        <div className="relative order-1 md:order-2">
          <div className="aspect-[4/3] md:aspect-[4/5] bg-surface-container-low border border-white/5 overflow-hidden group relative">
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-50 z-10 pointer-events-none" />
            <Image
              src="/images/heritage.png"
              alt="Heritage Architecture"
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-8 md:-bottom-12 -right-4 md:-right-12 w-40 md:w-56 h-40 md:h-56 border border-primary/20 backdrop-blur-3xl hidden sm:flex items-center justify-center p-6 md:p-8 text-center group z-20">
            <div className="absolute inset-2 border border-primary/10" />
            <div className="relative">
              <span className="block font-display text-primary text-lg italic mb-1">Since</span>
              <span className="block font-display text-primary text-3xl md:text-4xl">2009</span>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-on-surface-variant mt-3">India &amp; The World</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="mb-16 md:mb-32">
        <div className="text-center mb-10 md:mb-20">
          <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold mb-3 md:mb-4 block">The Philosophy</span>
          <h2 className="font-display text-3xl md:text-6xl text-white italic">
            Heritage &amp; <span className="text-primary not-italic font-bold">Innovation</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
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
            <div key={idx} className="p-8 md:p-12 border border-white/5 bg-surface/30 backdrop-blur-2xl hover:border-primary/40 transition-all duration-700 group">
              <span className="material-symbols-outlined text-primary text-3xl md:text-4xl mb-4 md:mb-6 block group-hover:scale-110 transition-transform">{item.icon}</span>
              <h3 className="font-display text-xl md:text-2xl text-white mb-3 md:mb-4">{item.title}</h3>
              <p className="text-on-surface-variant font-light leading-relaxed text-sm md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="mb-12 md:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center bg-surface/10 border border-white/5 p-6 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-3 md:mb-4 block">Our Presence</span>
            <h2 className="font-display text-2xl md:text-5xl text-white italic mb-6 md:mb-8">
              Rooted in Heritage, <br /> Global in Scale
            </h2>
            <p className="text-on-surface-variant font-light leading-relaxed max-w-md mb-8 md:mb-12 text-sm md:text-base">
              With our headquarters in New Delhi and ateliers in major luxury hubs, we bring Indian opulence to the world's most iconic stages.
            </p>
            <div className="grid grid-cols-2 gap-6 md:gap-12">
              {[
                { city: "New Delhi", region: "Flagship HQ" },
                { city: "Udaipur", region: "Heritage Atelier" },
                { city: "London", region: "Global Liaison" },
                { city: "Dubai", region: "Middle East Hub" }
              ].map((loc, idx) => (
                <div key={idx} className="border-l border-primary/20 pl-4 md:pl-6 py-2">
                  <span className="block text-white font-display text-xl md:text-2xl mb-1">{loc.city}</span>
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
            <div className="absolute -bottom-6 md:-bottom-8 -left-4 md:-left-8 bg-background/80 border border-white/10 p-5 md:p-8 backdrop-blur-2xl z-20">
              <span className="material-symbols-outlined text-primary text-3xl md:text-4xl mb-2 md:mb-3 block">public</span>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white font-bold">24/7 Royal Concierge</p>
              <p className="text-[9px] text-on-surface-variant mt-1">International Support Network</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
