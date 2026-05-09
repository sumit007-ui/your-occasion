import Image from "next/image";

export default function ServicesPage() {
  const services = [
    {
      title: "Couture Weddings",
      category: "Celebrations",
      image: "/images/couture_wedding.png",
      description: "Transcend the traditional with a wedding experience designed as a unique work of art, rooted in royal Indian grandeur."
    },
    {
      title: "Heritage Galas",
      category: "Excellence",
      image: "/images/jaipur_palace.png",
      description: "Sophisticated brand narratives brought to life through immersive environments in India's most iconic palaces."
    },
    {
      title: "Royal Banquets",
      category: "Intimacy",
      image: "/images/royal_dining.png",
      description: "Michelin-starred excellence and traditional thali experiences in the comfort of your most private sanctuaries."
    },
    {
      title: "Artistic Showcases",
      category: "Culture",
      image: "/images/wedding_mandap.png",
      description: "Dynamic platforms for expression, curated with an eye for the avant-garde and traditional craftsmanship."
    }
  ];

  return (
    <main className="min-h-screen pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-20 max-w-[1440px] mx-auto">
      <header className="mb-12 md:mb-24 text-center md:text-left">
        <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold mb-3 md:mb-4 block">The Collections</span>
        <h1 className="font-display text-3xl sm:text-5xl md:text-7xl text-white italic max-w-4xl leading-[1.1]">
          Bespoke Curations for{" "}
          <span className="not-italic text-primary font-bold">Life&apos;s Grandest Moments</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-12">
        {services.map((service, idx) => (
          <div key={idx} className="group relative overflow-hidden aspect-[4/3] md:aspect-[16/9] border border-white/5">
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority={idx === 0}
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 50vw"
            />
            {/* Always-visible overlay on mobile, hover-triggered on desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12 z-10 md:transition-all md:duration-500 md:translate-y-4 md:group-hover:translate-y-0">
              <span className="text-primary text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 font-medium md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-700 md:delay-100">
                {service.category}
              </span>
              <h3 className="font-display text-xl md:text-3xl text-white mb-2 md:mb-4">{service.title}</h3>
              <p className="text-white/70 font-light text-xs md:text-sm max-w-md md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-700 md:delay-200 line-clamp-2 md:line-clamp-none">
                {service.description}
              </p>
              <button className="mt-4 md:mt-8 flex items-center gap-2 text-primary text-[10px] md:text-xs uppercase tracking-widest group/btn md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-700 md:delay-300 cursor-pointer w-fit">
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
