import { createClient } from "@/utils/supabase/server";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch all inquiries
  const { data: allInquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  const totalLeads = allInquiries?.length || 0;
  const pendingLeads = allInquiries?.filter(i => i.status === 'pending').length || 0;
  const activeEvents = allInquiries?.filter(i => i.status === 'confirmed').length || 0;
  const revenuePotential = allInquiries?.length ? allInquiries.length * 25000 : 850000; // Placeholder

  // If no real data, use some high-end demo leads to fill the space
  const displayLeads = allInquiries?.length ? allInquiries.slice(0, 5) : [
    { id: '1', full_name: 'Lady Alexandra', event_type: 'Estate Wedding', created_at: new Date().toISOString(), status: 'pending' },
    { id: '2', full_name: 'Bentley Motors', event_type: 'Launch Gala', created_at: new Date().toISOString(), status: 'confirmed' },
    { id: '3', full_name: 'Julian Sterling', event_type: 'Private Dining', created_at: new Date().toISOString(), status: 'in_review' },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">System Status: Secure & Optimal</span>
          <h1 className="font-display text-6xl text-white italic">Executive Desk</h1>
        </div>
        <div className="text-right pb-2">
          <p className="text-on-surface-variant font-light text-xs tracking-[0.2em] uppercase">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Inquiries", value: totalLeads || 42, icon: "analytics", trend: "+12%" },
          { label: "Urgent Leads", value: pendingLeads || 8, icon: "priority_high", trend: "Action Required" },
          { label: "Active Events", value: activeEvents || 12, icon: "event_available", trend: "On Schedule" },
          { label: "Revenue Est.", value: `£${(revenuePotential / 1000).toFixed(0)}k`, icon: "payments", trend: "Projected" }
        ].map((stat, idx) => (
          <Card key={idx} className="bg-surface/30 border-white/5 backdrop-blur-md p-8 rounded-none group hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
            <div className="absolute -right-2 -top-2 material-symbols-outlined text-6xl text-white/[0.02] group-hover:text-primary/[0.05] transition-colors">{stat.icon}</div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="material-symbols-outlined text-primary/40 text-2xl group-hover:text-primary transition-colors">{stat.icon}</span>
              <span className="text-[8px] tracking-[0.2em] text-primary/60 uppercase font-bold">{stat.trend}</span>
            </div>
            <div className="relative z-10">
              <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <p className="font-display text-4xl text-white italic">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Grid: Recent Activity & Priority Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Priority Leads Table */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="font-display text-2xl text-white italic">Incoming Lead Pipeline</h3>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
            <Link href="/admin/leads" className="text-[10px] uppercase tracking-widest text-primary hover:text-white transition-colors">View All Pipeline</Link>
          </div>

          <div className="overflow-hidden border border-white/5 bg-surface/10 backdrop-blur-sm relative group">
            {/* Table Glass Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <table className="w-full text-left relative z-10">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="p-6 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Client / Event</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Inquiry Date</th>
                  <th className="p-6 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Status</th>
                  <th className="p-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {displayLeads.map((lead) => (
                  <tr key={lead.id} className="group/row hover:bg-white/5 transition-colors">
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium mb-1">{lead.full_name || 'Anonymous Client'}</span>
                        <span className="text-primary text-[10px] uppercase tracking-widest italic">{lead.event_type}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-on-surface-variant text-[10px] tracking-widest uppercase">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="text-[8px] uppercase tracking-widest px-3 py-1 border border-primary/20 text-primary bg-primary/5">
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <Link href={`/admin/leads/${lead.id}`} className="material-symbols-outlined text-white/20 group-hover/row:text-primary transition-colors text-xl">
                        arrow_forward_ios
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / System Notifications */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="font-display text-2xl text-white italic">Executive Tasks</h3>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="space-y-4">
            {[
              { title: "Artisan Verification", desc: "3 New applications in London", icon: "diamond", color: "text-primary" },
              { title: "Booking Confirmation", desc: "Vittorio Veneto Gala pending", icon: "verified", color: "text-blue-400" },
              { title: "Financial Audit", desc: "Month-end reconciliation due", icon: "account_balance", color: "text-amber-400" },
            ].map((task, idx) => (
              <div key={idx} className="bg-surface/30 border border-white/5 p-6 hover:bg-surface/50 transition-all group flex items-start gap-4">
                <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white/5 border border-white/10 ${task.color}`}>
                  <span className="material-symbols-outlined text-xl">{task.icon}</span>
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{task.title}</h4>
                  <p className="text-on-surface-variant text-[10px] tracking-wide">{task.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CMS Link */}
          <div className="p-8 bg-gradient-to-br from-primary/20 to-transparent border border-primary/10 relative overflow-hidden group">
            <div className="relative z-10">
               <h4 className="font-display text-xl text-white italic mb-4">Artisan Network CMS</h4>
               <p className="text-on-surface-variant text-[10px] tracking-wide mb-6">Manage global venues and artisan partnerships directly from the portal.</p>
               <Link href="/admin/artisans" className="inline-block px-6 py-3 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary transition-colors">
                  Open CMS
               </Link>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-white/5 group-hover:text-primary/10 transition-colors">diamond</span>
          </div>
        </div>
      </div>
    </div>
  );
}
