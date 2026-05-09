"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Check, Clock } from "lucide-react";

interface StatusBadgeProps {
  inquiryId: string;
  initialStatus: string;
  onStatusUpdate?: () => void;
}

export function StatusBadge({ inquiryId, initialStatus, onStatusUpdate }: StatusBadgeProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const toggleStatus = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    const newStatus = status === "pending" ? "confirmed" : "pending";
    
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({ status: newStatus })
        .eq("id", inquiryId);

      if (error) throw error;

      setStatus(newStatus);
      toast.success(`Status updated to ${newStatus}`);
      if (onStatusUpdate) onStatusUpdate();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleStatus}
      disabled={loading}
      className={`group relative flex items-center gap-2 px-3 py-1.5 border transition-all duration-300 ${
        status === "confirmed"
          ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10"
          : "border-blue-500/20 text-blue-400 bg-blue-500/5 hover:bg-blue-500/10"
      }`}
    >
      <span className="text-[8px] uppercase tracking-[0.2em] font-bold">
        {loading ? "Updating..." : status}
      </span>
      {status === "confirmed" ? (
        <Check className="w-3 h-3 text-emerald-400" />
      ) : (
        <Clock className="w-3 h-3 text-blue-400" />
      )}
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-[8px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
        Click to toggle status
      </div>
    </button>
  );
}
