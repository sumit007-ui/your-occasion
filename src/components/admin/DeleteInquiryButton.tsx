"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Trash2, AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteInquiryButtonProps {
  inquiryId: string;
  onDelete?: () => void;
}

export function DeleteInquiryButton({ inquiryId, onDelete }: DeleteInquiryButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("inquiries")
        .delete()
        .eq("id", inquiryId);

      if (error) throw error;

      toast.success("Inquiry deleted successfully.");
      setShowConfirm(false);
      
      if (onDelete) {
        onDelete();
      } else {
        router.refresh();
      }
    } catch (error: any) {
      toast.error("Failed to delete: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting}
        className="w-10 h-10 flex items-center justify-center border border-white/5 text-on-surface-variant hover:text-red-500 hover:border-red-500/30 transition-all disabled:opacity-50"
        title="Delete Inquiry"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Custom Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-md bg-[#131313] border border-white/10 p-10 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Luxury Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative">
                   <div className="absolute inset-0 bg-red-500/5 blur-xl" />
                   <AlertTriangle className="w-8 h-8 text-red-500/80 relative z-10" />
                </div>
                
                <h3 className="font-display text-4xl text-white italic mb-4 tracking-tight">Confirm Removal</h3>
                <p className="text-on-surface-variant text-[11px] uppercase tracking-[0.2em] font-light leading-relaxed mb-10 max-w-[280px]">
                  This record will be permanently purged from the archive. This action is irreversible.
                </p>
                
                <div className="flex flex-col gap-4 w-full">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full py-5 bg-red-600/90 text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-red-600 transition-all duration-500 disabled:opacity-50"
                  >
                    {isDeleting ? "Processing..." : "Confirm Deletion"}
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="w-full py-5 border border-white/10 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white hover:bg-white/5 transition-all duration-500 font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Close Icon */}
              <button 
                onClick={() => setShowConfirm(false)}
                className="absolute top-6 right-6 text-white/10 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
