import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { Users, Mail, Shield, Calendar, Search } from "lucide-react";
import { DeleteUserButton } from "@/components/admin/DeleteUserButton";

export default async function UserDirectory() {
  const supabase = await createClient();

  // Fetch all profiles
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching profiles:", error);
  }

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Management</span>
          <h1 className="font-display text-5xl text-white italic">All Users</h1>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH USERS..." 
              className="bg-surface/30 border border-white/5 pl-12 pr-6 py-3 text-[10px] uppercase tracking-[0.3em] text-white focus:outline-none focus:border-primary/50 transition-all w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-surface/30 border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[8px] uppercase tracking-[0.4em] text-on-surface-variant font-bold text-left">
                <th className="p-8">User Name</th>
                <th className="p-8">Email</th>
                <th className="p-8">Role</th>
                <th className="p-8">Joined Date</th>
                <th className="p-8 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {profiles?.map((profile) => (
                <tr key={profile.id} className="group hover:bg-white/[0.02] transition-all">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center font-display text-white text-lg italic group-hover:border-primary/30 transition-colors">
                        {profile.email?.[0].toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium tracking-tight">
                          {profile.first_name} {profile.lastName}
                        </p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                          ID: {profile.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-2 text-on-surface-variant group-hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="text-[11px] tracking-wide font-light">{profile.email}</span>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-2">
                      <Shield className={`w-3.5 h-3.5 ${profile.role === 'admin' ? 'text-primary' : 'text-white/20'}`} />
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${profile.role === 'admin' ? 'text-primary' : 'text-white/40'}`}>
                        {profile.role || 'Member'}
                      </span>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-2 text-white/40">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-light italic">
                        {profile.created_at ? format(new Date(profile.created_at), 'MMMM dd, yyyy') : 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="p-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] uppercase tracking-[0.2em] font-bold">
                        <div className="w-1 h-1 rounded-full bg-emerald-400" />
                        Verified
                      </span>
                      {profile.role !== 'admin' && (
                        <DeleteUserButton userId={profile.id} userName={`${profile.first_name} ${profile.lastName}`} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {(!profiles || profiles.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                    <Users className="w-10 h-10 text-white/10 mx-auto mb-4" />
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] italic">No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
