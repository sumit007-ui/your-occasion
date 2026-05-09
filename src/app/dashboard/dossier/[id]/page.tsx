import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CancelInquiryModal } from "@/components/dashboard/CancelInquiryModal";

// Fix: params must be awaited in Next.js 15+
export default async function DossierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: inquiry } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!inquiry) notFound();

  const statusColor: Record<string, string> = {
    pending:        "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
    proposal_sent:  "text-blue-400  border-blue-400/20  bg-blue-400/5",
    confirmed:      "text-primary   border-primary/20   bg-primary/5",
    declined:       "text-red-400   border-red-400/20   bg-red-400/5",
    cancelled:      "text-white/30  border-white/10     bg-white/5",
  };
  const statusClass = statusColor[inquiry.status] ?? statusColor.pending;

  return (
    <div className="py-10 md:py-20 animate-in fade-in duration-1000">
      {/* Back nav */}
      <div className="flex items-center gap-4 mb-8 md:mb-12">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Office
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
        <div>
          <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block">
            Dossier ID: {inquiry.id.slice(0, 8)}
          </span>
          <h1 className="font-display text-3xl md:text-5xl text-white italic mb-3">
            {inquiry.event_type}
          </h1>
          <p className="text-on-surface-variant font-light text-sm tracking-wide">
            Detailed tracking of your curated production.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <span
            className={`text-[10px] uppercase tracking-[0.3em] border px-5 py-2.5 ${statusClass}`}
          >
            {inquiry.status.replace("_", " ")}
          </span>
          <span className="text-[10px] text-on-surface-variant font-light tracking-widest uppercase">
            Filed on {new Date(inquiry.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Main */}
        <div className="lg:col-span-2 space-y-10 md:space-y-12">
          {/* Core Details */}
          <div className="bg-surface/30 border border-white/5 p-6 md:p-12 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold mb-5 md:mb-6">
                  Engagement Details
                </h4>
                <div className="space-y-5 md:space-y-6">
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest">Event Date</span>
                    <span className="text-white text-sm font-light">
                      {new Date(inquiry.event_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest">Location</span>
                    <span className="text-white text-sm font-light">{inquiry.location || "Undisclosed"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest">Guest Count</span>
                    <span className="text-white text-sm font-light">{inquiry.guest_count} Attendees</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold mb-5 md:mb-6">
                  Concierge Notes
                </h4>
                <p className="text-white/60 text-sm font-light leading-relaxed italic">
                  &ldquo;{inquiry.message || "No additional requirements specified at time of filing."}&rdquo;
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] pointer-events-none" />
          </div>

          {/* Cancellation message (if cancelled) */}
          {inquiry.status === "cancelled" && inquiry.cancellation_message && (
            <div className="bg-red-500/5 border border-red-500/15 p-6 md:p-8">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-red-400/70 font-bold mb-4">
                Cancellation Note
              </h4>
              <p className="text-white/50 text-sm font-light italic leading-relaxed">
                &ldquo;{inquiry.cancellation_message}&rdquo;
              </p>
              {inquiry.cancelled_at && (
                <span className="block mt-4 text-[9px] uppercase tracking-widest text-on-surface-variant/40">
                  Submitted {new Date(inquiry.cancelled_at).toLocaleDateString()}
                </span>
              )}
            </div>
          )}

          {/* Timeline */}
          <div className="space-y-6 md:space-y-8">
            <h3 className="font-display text-2xl md:text-3xl text-white italic">
              Production Timeline
            </h3>
            <div className="space-y-6 md:space-y-8 pl-6 border-l border-white/5">
              {[
                { step: "Inquiry Received", date: new Date(inquiry.created_at).toLocaleDateString("en-GB"), status: "Completed" },
                { step: "Initial Consultation", date: "TBD", status: inquiry.status === "confirmed" ? "Completed" : "Upcoming" },
                { step: "Artisan Selection", date: "TBD", status: "Pending" },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1 w-2 h-2 bg-primary rounded-full" />
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-white text-sm font-bold uppercase tracking-widest mb-1">
                        {item.step}
                      </h5>
                      <p className="text-on-surface-variant text-[10px] tracking-widest">{item.date}</p>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-primary italic font-bold">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 md:space-y-8">
          {/* Executive Support */}
          <div className="bg-surface/50 border border-white/10 p-8 md:p-10 backdrop-blur-xl">
            <h4 className="font-display text-xl md:text-2xl text-white italic mb-6 md:mb-8">
              Executive Support
            </h4>
            <p className="text-on-surface-variant text-xs font-light leading-relaxed mb-6 md:mb-8">
              Your dedicated event coordinator is available for direct consultation.
            </p>
            <button className="w-full py-4 bg-primary text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all mb-4">
              Request Briefing
            </button>
            <button className="w-full py-4 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-white hover:border-primary transition-all mb-4">
              Download PDF Dossier
            </button>

            {/* Cancel Inquiry */}
            <CancelInquiryModal
              inquiryId={inquiry.id}
              inquiryTitle={inquiry.event_type}
              status={inquiry.status}
            />
          </div>

          {/* Budget estimate */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/5">
            <h5 className="text-white text-[10px] uppercase tracking-widest font-bold mb-4">
              Current Estimates
            </h5>
            <div className="flex justify-between items-end">
              <span className="text-on-surface-variant text-[8px] uppercase tracking-widest">
                Projected Budget
              </span>
              <span className="text-white font-display text-2xl">₹--</span>
            </div>
            <p className="mt-4 text-[8px] text-primary uppercase tracking-widest font-bold italic">
              Awaiting Proposal Confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
