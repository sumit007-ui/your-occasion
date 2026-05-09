import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-20 items-start">
        <div className="md:w-1/2 space-y-12">
          <div>
            <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Inquiries</span>
            <h1 className="font-display text-7xl text-white italic leading-tight mb-8">Contact the Atelier</h1>
            <p className="text-on-surface-variant text-sm font-light leading-relaxed tracking-wide max-w-md">
              For general inquiries, press, or partnership proposals, please reach out to our executive team. For event bookings, please use our dedicated inquiry flow.
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex items-start gap-6 group">
               <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <span className="material-symbols-outlined text-xl">location_on</span>
               </div>
               <div>
                  <h4 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-2">London Office</h4>
                  <p className="text-on-surface-variant text-sm font-light">12 Mayfair Square, London, W1J 8AJ</p>
               </div>
            </div>
            <div className="flex items-start gap-6 group">
               <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <span className="material-symbols-outlined text-xl">mail</span>
               </div>
               <div>
                  <h4 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Electronic Mail</h4>
                  <p className="text-on-surface-variant text-sm font-light italic">concierge@youroccasion.co.uk</p>
               </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          <Card className="bg-surface/30 border-white/5 backdrop-blur-2xl p-12 rounded-none relative overflow-hidden">
             <div className="relative z-10 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold ml-1">Identity</label>
                    <input type="text" placeholder="FULL NAME" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-white focus:outline-none focus:border-primary/50 transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold ml-1">Coordinates</label>
                    <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-white focus:outline-none focus:border-primary/50 transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold ml-1">Subject</label>
                    <input type="text" placeholder="NATURE OF INQUIRY" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-white focus:outline-none focus:border-primary/50 transition-all" />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold ml-1">Message</label>
                    <textarea rows={5} placeholder="YOUR MESSAGE..." className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-white focus:outline-none focus:border-primary/50 transition-all resize-none"></textarea>
                </div>
                <button className="w-full py-5 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-primary transition-all duration-500">
                   Dispatch Inquiry
                </button>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          </Card>
        </div>
      </div>
    </div>
  );
}
