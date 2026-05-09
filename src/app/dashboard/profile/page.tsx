import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default async function ProfileSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="py-20 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Office
        </Link>
      </div>

      <div className="mb-16">
        <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block">Account Management</span>
        <h1 className="font-display text-5xl text-white italic mb-3">Profile Settings</h1>
        <p className="text-on-surface-variant font-light text-sm tracking-wide">
          Manage your identity and security coordinates within the Atelier.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Identity Section */}
          <section className="space-y-8">
             <div className="flex items-center gap-4">
                <h3 className="font-display text-2xl text-white italic">Personal Identity</h3>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold ml-1">Email Coordinates</label>
                   <div className="bg-white/5 border border-white/10 px-6 py-4 text-white text-sm font-light tracking-wide flex justify-between items-center opacity-60 cursor-not-allowed">
                      {user.email}
                      <span className="material-symbols-outlined text-sm">lock</span>
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold ml-1">Display Name</label>
                   <input type="text" defaultValue={user.email?.split('@')[0]} className="w-full bg-surface border border-white/10 px-6 py-4 text-white text-sm font-light tracking-wide focus:outline-none focus:border-primary/50 transition-all" />
                </div>
             </div>
          </section>

          {/* Security Section */}
          <section className="space-y-8">
             <div className="flex items-center gap-4">
                <h3 className="font-display text-2xl text-white italic">Security Protocols</h3>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
             </div>
             
             <div className="bg-surface/30 border border-white/5 p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                   <h4 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Password Update</h4>
                   <p className="text-on-surface-variant text-xs font-light tracking-wide">Regularly update your credentials to maintain dossier security.</p>
                </div>
                <Link href="/update-password" title="update-password" className="px-8 py-4 bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all font-bold">
                   Change Password
                </Link>
             </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-8">
           <div className="p-8 bg-surface/30 border border-white/5 relative overflow-hidden group">
              <div className="relative z-10">
                 <h4 className="font-display text-xl text-white italic mb-4">Member Tier</h4>
                 <div className="flex items-center gap-3 text-primary mb-6">
                    <span className="material-symbols-outlined text-xl">diamond</span>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Private Concierge</span>
                 </div>
                 <p className="text-on-surface-variant text-[10px] tracking-wide leading-relaxed">
                    You have full access to our global artisan network and priority booking channels.
                 </p>
              </div>
              <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-7xl text-white/5 group-hover:text-primary/10 transition-colors">workspace_premium</span>
           </div>
        </aside>
      </div>
    </div>
  );
}
