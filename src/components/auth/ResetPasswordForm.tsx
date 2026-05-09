"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Password reset instructions sent to your email.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleReset} className="space-y-8">
      <div className="space-y-3">
        <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-medium">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="curator@youroccasion.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-0 text-white font-light rounded-none h-14 placeholder:text-white/10 transition-all duration-500 hover:bg-white/[0.05]"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-on-primary hover:bg-primary/90 h-14 rounded-none text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-700 hover:tracking-[0.5em] shadow-[0_10px_20px_rgba(242,202,80,0.15)] relative overflow-hidden group/btn"
      >
        <span className="relative z-10">{loading ? "Requesting..." : "Send Recovery Link"}</span>
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
      </Button>

      <div className="mt-12 text-center pt-8 border-t border-white/5">
        <Link href="/login" className="text-[10px] text-on-surface-variant/40 hover:text-primary transition-all duration-300 uppercase tracking-[0.2em] group flex items-center justify-center gap-4">
          <span className="w-8 h-[1px] bg-white/10 group-hover:bg-primary/50 transition-all duration-500"></span>
          Return to Login
          <span className="w-8 h-[1px] bg-white/10 group-hover:bg-primary/50 transition-all duration-500"></span>
        </Link>
      </div>
    </form>
  );
}
