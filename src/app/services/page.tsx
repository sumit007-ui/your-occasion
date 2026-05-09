export default function ServicesPage() {
  const services = [
    {
      title: "Couture Weddings",
      category: "Celebrations",
      image: "/images/couture_wedding.png",
      description: "Transcend the traditional with a wedding experience designed as a unique work of art."
    },
    {
      title: "Corporate Galas",
      category: "Excellence",
      image: "/images/gala.png",
      description: "Sophisticated brand narratives brought to life through immersive, high-stakes environments."
    },
    {
      title: "Private Dining",
      category: "Intimacy",
      image: "/images/dining.png",
      description: "Michelin-starred excellence in the comfort of your most private sanctuaries."
    },
    {
      title: "Artistic Showcases",
      category: "Culture",
      image: "/images/showcase.png",
      description: "Dynamic platforms for expression, curated with an eye for the avant-garde."
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-8 md:px-20 max-w-[1440px] mx-auto">
      <header className="mb-24">
        <span className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">The Collections</span>
        <h1 className="font-display text-5xl md:text-7xl text-on-surface italic max-w-3xl leading-tight">
          Bespoke Curations for <br /> Life's Grandest Moments
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {services.map((service, idx) => (
          <div key={idx} className="group relative overflow-hidden aspect-[16/9] border border-white/5">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-12 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <span className="text-primary text-xs uppercase tracking-widest mb-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">{service.category}</span>
              <h3 className="font-display text-3xl text-white mb-4">{service.title}</h3>
              <p className="text-white/70 font-light text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                {service.description}
              </p>
              <button className="mt-8 flex items-center gap-2 text-primary text-xs uppercase tracking-widest group/btn opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                Explore Curation
                <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">north_east</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
