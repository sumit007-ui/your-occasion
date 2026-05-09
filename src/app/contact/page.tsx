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

            <div className="flex items-start gap-6 group">
               <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <span className="material-symbols-outlined text-xl">phone</span>
               </div>
               <div>
                  <h4 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Direct Line</h4>
                  <p className="text-on-surface-variant text-sm font-light">+91 79732 9328</p>
               </div>
            </div>
            <div className="flex items-start gap-6 group">
               <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-primary group-hover:bg-[#25D366] group-hover:text-white transition-all">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.436 1.096 3.393L6.447 18.5l3.275-1.073c.691.311 1.464.484 2.277.484 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.735-5.767zm4.331 8.273c-.156.444-.793.805-1.107.84-.282.031-.647.051-1.034-.074-.241-.082-.541-.186-.921-.341-1.616-.659-2.731-2.284-2.813-2.392-.082-.108-.667-.887-.667-1.691 0-.803.419-1.196.569-1.354.15-.158.33-.198.441-.198.111 0 .221 0 .318.005.102.004.235-.04.368.281.137.332.467 1.144.508 1.226.041.082.068.178.014.288-.054.111-.081.178-.162.274-.081.096-.169.215-.242.288-.083.082-.169.172-.072.339.096.166.428.706.918 1.144.63.565 1.161.739 1.328.823.166.084.264.07.362-.041.098-.111.419-.487.53-.655.111-.166.221-.138.368-.082.148.055.938.441 1.099.522.161.081.269.121.309.191.04.07.04.409-.116.853z"/></svg>
               </div>
               <div>
                  <h4 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-2">WhatsApp</h4>
                  <p className="text-on-surface-variant text-sm font-light">+91 99151 10524</p>
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
