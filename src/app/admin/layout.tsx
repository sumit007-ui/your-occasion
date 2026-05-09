import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Basic role check - in a real app, you'd check a 'role' column in your profiles table
  // For now, let's assume we can check if it's the admin email or just let it through if it's logged in for dev
  if (!user) {
    redirect("/login");
  }

  // Strict Admin Check
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect("/dashboard");
  }

  const navItems = [
    { label: "Executive Desk", href: "/admin", icon: "dashboard_customize" },
    { label: "Lead Pipeline", href: "/admin/leads", icon: "rebase_edit" },
    { label: "Active Events", href: "/admin/bookings", icon: "event_seat" },
    { label: "Artisan Network", href: "/admin/artisans", icon: "diamond" },
    { label: "Financial Records", href: "/admin/finance", icon: "payments" },
  ];

  return (
    <div className="min-h-screen bg-surface-dim flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-72 bg-surface/50 backdrop-blur-3xl border-r border-white/5 flex flex-col z-50">
        <div className="p-8 border-b border-white/5">
          <Link href="/" className="group inline-block">
            <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Your Occasion</span>
            <span className="font-display text-2xl text-white italic group-hover:text-primary transition-colors">Executive Hub</span>
          </Link>
        </div>

        <nav className="flex-grow p-6 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-white hover:bg-white/5 transition-all group border-l-2 border-transparent hover:border-primary/50"
            >
              <span className="material-symbols-outlined text-xl group-hover:text-primary transition-colors">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-4 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-lg font-light">account_circle</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-[10px] font-bold tracking-widest uppercase truncate max-w-[140px]">Admin Office</span>
              <span className="text-on-surface-variant text-[8px] tracking-tight uppercase truncate max-w-[140px]">{user.email}</span>
            </div>
          </div>
          <form action={async () => {
            "use server";
            const supabase = await createClient();
            await supabase.auth.signOut();
            redirect("/");
          }}>
            <button className="w-full flex items-center gap-3 px-6 py-3 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all group">
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">logout</span>
              Exit Desk
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow relative overflow-y-auto">
         <div className="max-w-7xl mx-auto p-8 md:p-12">
            {children}
         </div>
      </main>
    </div>
  );
}
