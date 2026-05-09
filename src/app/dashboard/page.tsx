import { createClient } from "@/utils/supabase/server";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  // Fetch inquiries for this user
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  const activeInquiries = inquiries?.filter(i => i.status !== 'confirmed' && i.status !== 'declined').length || 0;
  const confirmedInquiries = inquiries?.filter(i => i.status === 'confirmed').length || 0;
  const pendingProposals = inquiries?.filter(i => i.status === 'proposal_sent').length || 0;

  return (
    <div className="py-20 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 relative z-10">
        <div>
          <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block">Access Granted</span>
          <h1 className="font-display text-5xl text-white italic mb-3">Private Office</h1>
          <p className="text-on-surface-variant font-light text-sm tracking-wide">
            Welcome back, {user.email?.split('@')[0]}. Monitoring your curated experiences.
          </p>
        </div>
        <form action={async () => {
          "use server";
          const supabase = await createClient();
          await supabase.auth.signOut();
          redirect("/");
        }}>
          <button className="flex items-center gap-3 px-6 py-3 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all group">
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">logout</span>
            Depart Atelier
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative z-10">
        {[
          { label: "Active Inquiries", value: activeInquiries, icon: "hourglass_empty" },
          { label: "Confirmed Inquiries", value: confirmedInquiries, icon: "verified" },
          { label: "Pending Proposals", value: pendingProposals, icon: "description" }
        ].map((stat, idx) => (
          <Card key={idx} className="bg-surface/30 border-white/5 backdrop-blur-2xl p-10 rounded-none hover:border-primary/20 transition-all duration-700 group">
            <div className="flex justify-between items-start mb-6">
               <span className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-medium group-hover:text-primary transition-colors">{stat.label}</span>
               <span className="material-symbols-outlined text-primary text-xl opacity-40 group-hover:opacity-100 transition-opacity">{stat.icon}</span>
            </div>
            <p className="font-display text-5xl text-white">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <h3 className="font-display text-3xl text-white italic">Recent Dossiers</h3>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        
        {!inquiries || inquiries.length === 0 ? (
          <div className="bg-surface/10 border border-dashed border-white/10 py-32 text-center backdrop-blur-sm">
            <span className="material-symbols-outlined text-primary/20 text-5xl mb-6 block">event_busy</span>
            <p className="text-on-surface-variant font-light text-sm tracking-widest uppercase">
              The archive is currently empty.
            </p>
            <Link href="/book" className="mt-8 inline-block text-primary text-[10px] uppercase tracking-[0.3em] border-b border-primary/20 pb-1 hover:border-primary transition-all">
              Initiate New Inquiry
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {inquiries.map((inquiry) => (
              <Link 
                key={inquiry.id} 
                href={`/dashboard/dossier/${inquiry.id}`}
                className="bg-surface/30 border border-white/5 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:bg-surface/50 hover:border-primary/30 transition-all duration-500"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:border-primary/40 transition-colors">
                     <span className="material-symbols-outlined text-primary/40 text-2xl group-hover:text-primary transition-colors">celebration</span>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl text-white mb-2 group-hover:text-primary transition-colors">{inquiry.event_type}</h4>
                    <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-widest text-on-surface-variant font-medium">
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-xs">calendar_today</span>{new Date(inquiry.event_date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-xs">groups</span>{inquiry.guest_count} Guests</span>
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-xs">location_on</span>{inquiry.location || 'Undisclosed Location'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary border border-primary/20 px-4 py-2 bg-primary/5 whitespace-nowrap">
                    {inquiry.status.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-light tracking-widest">
                    FILED {new Date(inquiry.created_at).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Profile/Settings Quick Link */}
      <div className="mt-20 pt-10 border-t border-white/5 flex justify-center">
         <Link href="/dashboard/profile" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-on-surface-variant hover:text-primary transition-all group">
            <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform duration-500">settings</span>
            Executive Account Settings
         </Link>
      </div>
    </div>
  );
}
