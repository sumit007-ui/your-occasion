import { createClient } from "@/utils/supabase/server";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function BookingsManagement() {
  const supabase = await createClient();

  // Fetch confirmed inquiries (Active Events)
  const { data: activeEvents } = await supabase
    .from('inquiries')
    .select('*')
    .eq('status', 'confirmed')
    .order('event_date', { ascending: true });

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Archive: Confirmed</span>
          <h1 className="font-display text-5xl text-white italic">Active Events</h1>
        </div>
        <div className="text-right">
          <p className="text-on-surface-variant font-light text-[10px] tracking-[0.3em] uppercase">Monitor curated productions</p>
        </div>
      </div>

      {!activeEvents || activeEvents.length === 0 ? (
        <div className="bg-surface/10 border border-dashed border-white/10 py-32 text-center">
          <span className="material-symbols-outlined text-primary/20 text-5xl mb-6 block">event_busy</span>
          <p className="text-on-surface-variant font-light text-sm tracking-widest uppercase">No active productions scheduled.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeEvents.map((event) => (
            <div key={event.id} className="relative group overflow-hidden bg-surface/30 border border-white/5 hover:border-primary/30 transition-all duration-700 p-10">
               {/* Aesthetic background accent */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] group-hover:bg-primary/10 transition-colors pointer-events-none" />
               
               <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold block mb-2">{event.event_type}</span>
                    <h3 className="font-display text-3xl text-white group-hover:text-primary transition-colors">{event.full_name}</h3>
                  </div>
                  <span className="material-symbols-outlined text-primary text-3xl opacity-20 group-hover:opacity-100 transition-all">verified</span>
               </div>

               <div className="grid grid-cols-2 gap-8 mb-10">
                  <div className="space-y-1">
                     <span className="text-on-surface-variant text-[8px] uppercase tracking-widest block font-bold">Event Date</span>
                     <span className="text-white text-sm font-light tracking-wide">{new Date(event.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-on-surface-variant text-[8px] uppercase tracking-widest block font-bold">Venue / Location</span>
                     <span className="text-white text-sm font-light tracking-wide">{event.location || 'Central London'}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-on-surface-variant text-[8px] uppercase tracking-widest block font-bold">Guest List</span>
                     <span className="text-white text-sm font-light tracking-wide">{event.guest_count} Attendees</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-on-surface-variant text-[8px] uppercase tracking-widest block font-bold">Project Status</span>
                     <span className="text-primary text-xs font-bold tracking-[0.1em] uppercase italic">In Production</span>
                  </div>
               </div>

               <div className="flex gap-4 pt-8 border-t border-white/5">
                  <Link href={`/admin/bookings/${event.id}`} className="flex-grow text-center py-4 bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all font-bold">
                     View Dossier
                  </Link>
                  <button className="px-6 border border-white/5 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center">
                     <span className="material-symbols-outlined text-xl">more_vert</span>
                  </button>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
