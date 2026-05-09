import Image from "next/image";

export default function GalleryPage() {
  const images = [
    { url: "/images/wedding_mandap.png", span: "md:col-span-2 md:row-span-2", title: "Udaipur Mandap", priority: true },
    { url: "/images/jaipur_palace.png", span: "md:col-span-1 md:row-span-1", title: "Jaipur Soirée", priority: true },
    { url: "/images/sangeet_decor.png", span: "md:col-span-1 md:row-span-1", title: "Royal Sangeet", priority: true },
    { url: "/images/royal_dining.png", span: "md:col-span-1 md:row-span-1", title: "Heritage Banquet" },
    { url: "/images/lake_palace.png", span: "md:col-span-1 md:row-span-1", title: "Island Venue" },
    { url: "/images/baraat.png", span: "md:col-span-1 md:row-span-1", title: "Grand Procession" },
    { url: "/images/couture_wedding.png", span: "md:col-span-1 md:row-span-1", title: "Bridal Couture" },
    { url: "/images/gala.png", span: "md:col-span-1 md:row-span-1", title: "Heritage Gala" },
    { url: "/images/showcase.png", span: "md:col-span-1 md:row-span-1", title: "Artistic Showcase" },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-8 md:px-20 max-w-[1440px] mx-auto bg-background">
      <header className="mb-24 text-center">
        <span className="text-primary text-xs uppercase tracking-[0.4em] font-semibold mb-4 block">The Indian Collection</span>
        <h1 className="font-display text-5xl md:text-7xl text-white italic">A Symphony of Moments</h1>
        <p className="mt-8 text-on-surface-variant font-light text-lg max-w-2xl mx-auto">
          A perfectly curated collection of our most evocative experiences. Heritage, grandeur, and cinematic celebration.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px] md:auto-rows-[350px]">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`relative group overflow-hidden border border-white/5 bg-surface ${img.span}`}
          >
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex flex-col items-center justify-center p-6 text-center">
               <span className="material-symbols-outlined text-primary text-4xl transform scale-50 group-hover:scale-100 transition-transform duration-500 mb-4">fullscreen</span>
               <h3 className="font-display text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">{img.title}</h3>
            </div>
            <Image 
              src={img.url} 
              alt={img.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={img.priority}
              className="object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-20 text-center">
        <button className="border border-primary/30 px-12 py-4 text-[10px] uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-on-primary transition-all duration-700 cursor-pointer">
          Request Portfolio Access
        </button>
      </div>
    </main>
  );
}
