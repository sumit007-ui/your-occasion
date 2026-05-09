"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cancelInquiryAction } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";
import { AlertTriangle, MessageSquare, X, Loader2 } from "lucide-react";

interface Props {
  inquiryId: string;
  inquiryTitle: string;
  status: string;
}

export function CancelInquiryModal({ inquiryId, inquiryTitle, status }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{ error?: string; success?: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isConfirmed = status === "confirmed";
  const isCancelled = status === "cancelled";

  if (isCancelled) return (
    <div className="w-full py-4 border border-white/5 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40 text-center cursor-not-allowed">
      Inquiry Already Cancelled
    </div>
  );

  if (isConfirmed) return (
    <div className="w-full py-4 border border-white/5 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40 text-center cursor-not-allowed">
      Confirmed — Cannot Cancel
    </div>
  );

  function handleCancel() {
    startTransition(async () => {
      const res = await cancelInquiryAction(inquiryId, message);
      setResult(res);
      if (res.success) {
        setTimeout(() => {
          setIsOpen(false);
          router.push("/dashboard");
        }, 1600);
      }
    });
  }

  return (
    <>
      {/* Trigger */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        className="w-full py-4 border border-red-500/20 text-[10px] uppercase tracking-[0.3em] text-red-400/70 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 hover:bg-red-500/5"
      >
        Request Cancellation
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isPending && setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            />

            {/* Panel — slides up on mobile, centers on desktop */}
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 md:inset-0 md:flex md:items-center md:justify-center z-[60] pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto bg-[#0d0d0d] border border-white/10 w-full md:max-w-lg p-8 md:p-12 relative"
              >
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-6 h-[1px] bg-red-400/40" />
                <div className="absolute top-0 left-0 w-[1px] h-6 bg-red-400/40" />
                <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-red-400/40" />
                <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-red-400/40" />

                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-5 right-5 text-on-surface-variant hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Success state */}
                <AnimatePresence mode="wait">
                  {result?.success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center text-center py-4 gap-4"
                    >
                      <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
                      <p className="text-white font-display text-2xl italic">Cancellation Sent</p>
                      <p className="text-on-surface-variant text-xs">Redirecting to your Private Office…</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-8">
                        <div className="w-10 h-10 flex items-center justify-center border border-red-500/20 bg-red-500/5 shrink-0">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <h3 className="font-display text-xl text-white italic mb-1">Cancel Inquiry</h3>
                          <p className="text-on-surface-variant text-xs leading-relaxed">
                            You are requesting cancellation for{" "}
                            <span className="text-primary">{inquiryTitle}</span>. Our team will be notified.
                          </p>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="mb-8">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-3">
                          <MessageSquare className="w-3 h-3" />
                          Message to Our Team <span className="text-primary/40">(Optional)</span>
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                          maxLength={500}
                          placeholder="Let us know your reason for cancellation, or any changes you'd like to make instead…"
                          className="w-full bg-surface/40 border border-white/10 text-white text-sm font-light px-4 py-3 resize-none placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-colors"
                        />
                        <div className="flex justify-end mt-1">
                          <span className="text-[9px] text-on-surface-variant/40">{message.length}/500</span>
                        </div>
                      </div>

                      {/* Error */}
                      {result?.error && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-400 text-xs mb-6 border border-red-500/20 bg-red-500/5 px-4 py-3"
                        >
                          {result.error}
                        </motion.p>
                      )}

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => setIsOpen(false)}
                          disabled={isPending}
                          className="flex-1 py-3.5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-white hover:border-white/30 transition-all"
                        >
                          Keep Inquiry
                        </button>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={handleCancel}
                          disabled={isPending}
                          className="flex-1 py-3.5 bg-red-500/10 border border-red-500/30 text-[10px] uppercase tracking-[0.3em] text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isPending ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              Processing…
                            </>
                          ) : (
                            "Confirm Cancellation"
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
