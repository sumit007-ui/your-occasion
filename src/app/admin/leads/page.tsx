import { createClient } from "@/utils/supabase/server";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function LeadsManagement() {
  const supabase = await createClient();

  // Fetch all inquiries
  const { data: leads } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Archive: Inbound</span>
          <h1 className="font-display text-5xl text-white italic">Lead Pipeline</h1>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm group-focus-within:text-primary transition-colors">search</span>
            <input 
              type="text" 
              placeholder="SEARCH DOSSIERS..." 
              className="bg-surface/30 border border-white/5 pl-12 pr-6 py-3 text-[10px] uppercase tracking-[0.3em] text-white focus:outline-none focus:border-primary/50 transition-all w-64"
            />
          </div>
          <button className="flex items-center gap-3 px-6 py-3 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-white transition-all">
             <span className="material-symbols-outlined text-sm">filter_list</span>
             Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-1">
        {/* Table Header - for visual structure */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-8 border-b border-white/10 text-[8px] uppercase tracking-[0.4em] text-on-surface-variant font-bold">
           <div className="col-span-3">Client Identity / Location</div>
           <div className="col-span-3">Contact Coordinates</div>
           <div className="col-span-2">Event Archetype</div>
           <div className="col-span-2">Investment</div>
           <div className="col-span-2 text-right">Action</div>
        </div>

        {!leads || leads.length === 0 ? (
          <div className="bg-surface/10 border border-dashed border-white/10 py-32 text-center">
            <span className="material-symbols-outlined text-primary/20 text-5xl mb-6 block">folder_off</span>
            <p className="text-on-surface-variant font-light text-sm tracking-widest uppercase">No inquiries filed in the system.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="group bg-surface/20 border border-white/5 hover:bg-surface/40 hover:border-primary/20 transition-all duration-500">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-8">
                  {/* Client Info */}
                  <div className="col-span-3 flex items-center gap-6">
                     <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-700 shrink-0">
                        <span className="material-symbols-outlined text-xl italic font-display">
                           {lead.full_name ? lead.full_name[0] : 'U'}
                        </span>
                     </div>
                     <div className="flex flex-col overflow-hidden">
                        <span className="text-white text-base font-medium mb-1 tracking-wide truncate">{lead.full_name || 'Unidentified Client'}</span>
                        <span className="text-on-surface-variant text-[10px] uppercase tracking-widest flex items-center gap-2">
                           <span className="material-symbols-outlined text-[12px]">location_on</span>
                           {lead.location || 'Location Undisclosed'}
                        </span>
                     </div>
                  </div>

                  {/* Contact Info */}
                  <div className="col-span-3 flex flex-col gap-1">
                     <div className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[12px]">mail</span>
                        <span className="text-[10px] tracking-wider truncate">{lead.email}</span>
                     </div>
                     <div className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[12px]">call</span>
                        <span className="text-[10px] tracking-wider">{lead.phone}</span>
                     </div>
                  </div>

                  {/* Event Type */}
                  <div className="col-span-2 flex flex-col">
                     <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-1 italic truncate">{lead.event_type}</span>
                     <span className="text-on-surface-variant text-[8px] uppercase tracking-[0.2em]">{lead.event_date ? new Date(lead.event_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'TBD'}</span>
                  </div>

                  {/* Investment / Budget */}
                  <div className="col-span-2 flex flex-col">
                     <span className="text-white text-xs font-bold tracking-widest mb-1">{lead.budget_range || 'TBD'}</span>
                     <StatusBadge leadId={lead.id} initialStatus={lead.status} />
                  </div>

                  {/* Action */}
                  <div className="col-span-2 flex justify-end gap-3">
                     <a href={`mailto:${lead.email}`} className="w-10 h-10 flex items-center justify-center border border-white/5 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all">
                        <span className="material-symbols-outlined text-lg">mail</span>
                     </a>
                     <Link href={`/admin/leads/${lead.id}`} className="px-6 py-3 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary transition-colors">
                        Inspect
                     </Link>
                  </div>

                  {/* Vision Preview - Optional: Only show on hover or in a separate row */}
                  {lead.vision && (
                    <div className="col-span-12 mt-4 pt-4 border-t border-white/5 opacity-40 group-hover:opacity-80 transition-opacity">
                      <p className="text-[10px] italic font-light tracking-wide text-on-surface-variant line-clamp-1">
                        &quot;{lead.vision}&quot;
                      </p>
                    </div>
                  )}
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
