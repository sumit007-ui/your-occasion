"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  Users, 
  Clock, 
  Calendar, 
  ArrowRight, 
  AlertCircle,
  MessageSquare,
  TrendingUp,
  History
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface Inquiry {
  id: string;
  full_name: string;
  email: string;
  event_type: string;
  status: string;
  created_at: string;
  location: string;
  vision: string;
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    {
      label: "Total Inquiries",
      value: inquiries.length,
      icon: Users,
      trend: "All-time reach",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      label: "Urgent Leads",
      value: inquiries.filter(i => 
        i.status === 'pending' && 
        new Date().getTime() - new Date(i.created_at).getTime() > 24 * 60 * 60 * 1000
      ).length,
      icon: AlertCircle,
      trend: "Pending > 24h",
      color: "from-red-500/20 to-orange-500/20"
    },
    {
      label: "Confirmed Events",
      value: inquiries.filter(i => i.status === 'confirmed').length,
      icon: Calendar,
      trend: "Current Pipeline",
      color: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  const staleLeads = inquiries.filter(i => 
    i.status === 'pending' && 
    (new Date().getTime() - new Date(i.created_at).getTime()) > 24 * 60 * 60 * 1000
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.5em]">
            Central Operations Portfolio
          </p>
          <h1 className="text-5xl md:text-6xl font-display text-white italic tracking-tight">
            Executive Desk
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-none flex items-center gap-3 backdrop-blur-xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
              Real-time Database Sync: Active
            </span>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <div 
            key={idx}
            className="relative group overflow-hidden bg-surface/30 border border-white/5 p-8 rounded-none backdrop-blur-md transition-all duration-500 hover:border-primary/20"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <div className="relative flex justify-between items-start mb-8">
              <div className="p-3 bg-white/5 rounded-none border border-white/10 group-hover:border-primary/30 transition-colors">
                <stat.icon className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-[9px] text-white/40 font-bold uppercase tracking-[0.2em]">
                {stat.trend}
              </span>
            </div>
            
            <div className="relative">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-3">
                {stat.label}
              </h3>
              <p className="text-5xl font-display text-white italic tabular-nums">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Urgent Follow-ups Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-2xl text-white italic">Urgent Tasks</h2>
            <div className="h-[1px] flex-grow bg-white/5" />
          </div>

          <div className="space-y-4">
            {staleLeads.length > 0 ? (
              staleLeads.slice(0, 4).map((lead) => (
                <div 
                  key={lead.id}
                  className="p-6 bg-surface/30 border border-white/5 hover:bg-white/[0.05] transition-all rounded-none group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex-shrink-0 bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">
                        SLA Breach: {lead.full_name}
                      </h4>
                      <p className="text-[10px] text-on-surface-variant tracking-wide leading-relaxed">
                        Inquiry received on {format(new Date(lead.created_at), 'MMM d')} has been pending for over 24 hours.
                      </p>
                      <div className="flex items-center gap-4 mt-4">
                        <Link 
                          href="/admin/leads"
                          className="inline-flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/50 font-bold hover:text-primary transition-colors"
                        >
                          Details <ArrowRight className="w-3 h-3" />
                        </Link>
                        <StatusBadge 
                          leadId={lead.id} 
                          initialStatus={lead.status} 
                          onStatusUpdate={fetchDashboardData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 bg-surface/20 border border-dashed border-white/10 text-center">
                <TrendingUp className="w-8 h-8 text-emerald-500/30 mx-auto mb-4" />
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">All leads are current</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Pipeline Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-2xl text-white italic">Recent Activity</h2>
            <div className="h-[1px] flex-grow bg-white/5" />
            <Link href="/admin/leads" className="text-[9px] uppercase tracking-[0.2em] text-primary hover:text-white transition-colors font-bold">
              View Database
            </Link>
          </div>

          <div className="bg-surface/30 border border-white/5 overflow-hidden">
            <div className="divide-y divide-white/5">
              {inquiries.slice(0, 6).map((inquiry) => (
                <div 
                  key={inquiry.id}
                  className="p-6 hover:bg-white/[0.03] transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center font-display text-white text-lg italic group-hover:border-primary/30 transition-colors">
                      {inquiry.full_name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-white text-sm font-medium tracking-tight">
                          {inquiry.full_name}
                        </h4>
                        <StatusBadge 
                          leadId={inquiry.id} 
                          initialStatus={inquiry.status} 
                          onStatusUpdate={fetchDashboardData}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-on-surface-variant tracking-wide italic opacity-70">
                        <span className="line-clamp-1">
                          {inquiry.vision || "New inquiry received"}
                        </span>
                        {inquiry.location && (
                          <span className="flex items-center gap-1 shrink-0 text-primary/60 border-l border-white/10 pl-2">
                             <TrendingUp className="w-2.5 h-2.5" /> {inquiry.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">
                      {format(new Date(inquiry.created_at), 'MMM d')}
                    </p>
                    <p className="text-[9px] text-primary/50 tracking-tighter uppercase flex items-center justify-end gap-2">
                      {inquiry.event_type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {inquiries.length === 0 && (
              <div className="p-20 text-center">
                <History className="w-10 h-10 text-white/10 mx-auto mb-4" />
                <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] italic">No activity recorded</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
