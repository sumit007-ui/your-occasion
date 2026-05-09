import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default async function DossierDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: inquiry } = await supabase
    .from('inquiries')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!inquiry) {
    notFound();
  }

  return (
    <div className="py-20 animate-in fade-in duration-1000">
      <div className="flex items-center gap-4 mb-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Office
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block">Dossier ID: {inquiry.id.slice(0, 8)}</span>
          <h1 className="font-display text-5xl text-white italic mb-3">{inquiry.event_type}</h1>
          <p className="text-on-surface-variant font-light text-sm tracking-wide">
            Detailed tracking of your curated production.
          </p>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[10px] uppercase tracking-[0.3em] text-primary border border-primary/20 px-6 py-3 bg-primary/5 mb-2">
             {inquiry.status.replace('_', ' ')}
           </span>
           <span className="text-[10px] text-on-surface-variant font-light tracking-widest uppercase">
             Filed on {new Date(inquiry.created_at).toLocaleDateString()}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Core Details */}
          <div className="bg-surface/30 border border-white/5 p-12 relative overflow-hidden">
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                   <h4 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold mb-6">Engagement Details</h4>
                   <div className="space-y-6">
                      <div className="flex justify-between border-b border-white/5 pb-4">
                         <span className="text-white/40 text-[10px] uppercase tracking-widest">Event Date</span>
                         <span className="text-white text-sm font-light">{new Date(inquiry.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-4">
                         <span className="text-white/40 text-[10px] uppercase tracking-widest">Location</span>
                         <span className="text-white text-sm font-light">{inquiry.location || 'Undisclosed'}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-4">
                         <span className="text-white/40 text-[10px] uppercase tracking-widest">Guest Count</span>
                         <span className="text-white text-sm font-light">{inquiry.guest_count} Attendees</span>
                      </div>
                   </div>
                </div>
                <div>
                   <h4 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold mb-6">Concierge Notes</h4>
                   <p className="text-white/60 text-sm font-light leading-relaxed italic">
                      "{inquiry.message || 'No additional requirements specified at time of filing.'}"
                   </p>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] pointer-events-none" />
          </div>

          {/* Timeline Placeholder */}
          <div className="space-y-8">
            <h3 className="font-display text-3xl text-white italic">Production Timeline</h3>
            <div className="space-y-8 pl-6 border-l border-white/5">
               {[
                 { step: "Inquiry Received", date: "09 May 2024", status: "Completed" },
                 { step: "Initial Consultation", date: "12 May 2024", status: "Upcoming" },
                 { step: "Artisan Selection", date: "TBD", status: "Pending" },
               ].map((item, idx) => (
                 <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-2 h-2 bg-primary rounded-full" />
                    <div className="flex justify-between items-start">
                       <div>
                          <h5 className="text-white text-sm font-bold uppercase tracking-widest mb-1">{item.step}</h5>
                          <p className="text-on-surface-variant text-[10px] tracking-widest">{item.date}</p>
                       </div>
                       <span className="text-[8px] uppercase tracking-widest text-primary italic font-bold">{item.status}</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Actions */}
        <div className="space-y-8">
          <div className="bg-surface/50 border border-white/10 p-10 backdrop-blur-xl">
             <h4 className="font-display text-2xl text-white italic mb-8">Executive Support</h4>
             <p className="text-on-surface-variant text-xs font-light leading-relaxed mb-8">
                Your dedicated event coordinator is available for direct consultation.
             </p>
             <button className="w-full py-4 bg-primary text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all mb-4">
                Request Briefing
             </button>
             <button className="w-full py-4 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-white hover:border-primary transition-all">
                Download PDF Dossier
             </button>
          </div>

          <div className="p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/5">
             <h5 className="text-white text-[10px] uppercase tracking-widest font-bold mb-4">Current Estimates</h5>
             <div className="flex justify-between items-end">
                <span className="text-on-surface-variant text-[8px] uppercase tracking-widest">Projected Budget</span>
                <span className="text-white font-display text-2xl">₹--</span>
             </div>
             <p className="mt-4 text-[8px] text-primary uppercase tracking-widest font-bold italic">Awaiting Proposal Confirmation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
