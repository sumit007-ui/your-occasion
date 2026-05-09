import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function ArtisanNetwork() {
  const artisans = [
    { name: "The Savoy", type: "Venue", location: "London", status: "Premium Partner" },
    { name: "Alexander & James", type: "Floral Art", location: "Surrey", status: "Verified" },
    { name: "Couture Cakes", type: "Pâtisserie", location: "Kensington", status: "Verified" },
    { name: "Global Jets", type: "Logistics", location: "Global", status: "Concierge Tier" },
  ];

  return (
    <div className="space-y-12 animate-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Archive: Network</span>
          <h1 className="font-display text-5xl text-white italic">Artisan Network</h1>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-primary text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all">
           <span className="material-symbols-outlined text-sm">add_circle</span>
           Enlist Artisan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {artisans.map((artisan, idx) => (
          <Card key={idx} className="bg-surface/30 border-white/5 p-8 rounded-none group hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[8px] uppercase tracking-[0.2em] text-primary/60 font-bold mb-4 block">{artisan.type}</span>
              <h3 className="font-display text-2xl text-white mb-6 italic">{artisan.name}</h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-on-surface-variant text-[10px] uppercase tracking-widest">
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  {artisan.location}
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant text-[10px] uppercase tracking-widest">
                  <span className="material-symbols-outlined text-xs text-primary">verified</span>
                  {artisan.status}
                </div>
              </div>

              <button className="w-full py-3 border border-white/10 text-[8px] uppercase tracking-[0.3em] text-white hover:border-primary transition-all">
                 View Portfolio
              </button>
            </div>
            <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-6xl text-white/5 group-hover:text-primary/10 transition-colors">diamond</span>
          </Card>
        ))}
      </div>

      {/* Decorative Section */}
      <div className="pt-20">
         <div className="border border-white/5 bg-surface/10 p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
               <h3 className="font-display text-3xl text-white italic mb-4">Global Venue Registry</h3>
               <p className="max-w-xl mx-auto text-on-surface-variant text-xs font-light tracking-wide leading-relaxed mb-8">
                  Access our private list of unlisted venues across Europe and the Middle East. Each location is vetted for exclusive event productions.
               </p>
               <button className="text-primary text-[10px] uppercase tracking-[0.3em] border-b border-primary/30 pb-1 hover:border-primary transition-all">
                  Access Private Registry
               </button>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('/images/venue.png')] bg-cover bg-center" />
         </div>
      </div>
    </div>
  );
}
