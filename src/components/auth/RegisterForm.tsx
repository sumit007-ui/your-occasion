"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, MailCheck } from "lucide-react";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isWaitingForEmail, setIsWaitingForEmail] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Inquiry received. Please check your email.");
    setIsWaitingForEmail(true);
  };

  // Poll to check if email is confirmed
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isWaitingForEmail) {
      interval = setInterval(async () => {
        const { data } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (data?.session) {
          clearInterval(interval);
          toast.success("Email Confirmed! Welcome to Your Occasion.");
          router.push("/dashboard");
          router.refresh();
        }
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [isWaitingForEmail, formData.email, formData.password, router, supabase]);

  return (
    <AnimatePresence mode="wait">
      {!isWaitingForEmail ? (
        <motion.div
          key="register-form"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <form onSubmit={handleRegister} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="firstName" className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-medium">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Alex"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-0 text-white font-light rounded-none h-14 placeholder:text-white/10 transition-all duration-500 hover:bg-white/[0.05]"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName" className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-medium">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Morgan"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-0 text-white font-light rounded-none h-14 placeholder:text-white/10 transition-all duration-500 hover:bg-white/[0.05]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="curator@youroccasion.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-0 text-white font-light rounded-none h-14 placeholder:text-white/10 transition-all duration-500 hover:bg-white/[0.05]"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-0 text-white font-light rounded-none h-14 placeholder:text-white/10 transition-all duration-500 hover:bg-white/[0.05]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary hover:bg-primary/90 h-14 rounded-none text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-700 hover:tracking-[0.5em] shadow-[0_10px_20px_rgba(242,202,80,0.15)] relative overflow-hidden group/btn"
            >
              <span className="relative z-10">{loading ? "Processing..." : "Submit Inquiry"}</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
            </Button>
          </form>

          <div className="mt-12 text-center pt-8 border-t border-white/5">
            <p className="text-[10px] text-on-surface-variant/40 font-light uppercase tracking-[0.2em]">
              Already a member?{" "}
              <Link href="/login" className="text-primary/80 hover:text-primary transition-all duration-300 ml-1 font-medium">
                Enter Portfolio
              </Link>
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="waiting-state"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center space-y-8 w-full py-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            <MailCheck className="w-16 h-16 text-primary relative z-10" strokeWidth={0.5} />
          </div>
          
          <div>
            <h2 className="font-display text-2xl text-white italic mb-3 tracking-tight">Check Your Email</h2>
            <p className="text-on-surface-variant/70 text-sm font-light leading-relaxed max-w-[320px] mx-auto tracking-wide">
              A secure verification link has been sent to <br/>
              <span className="text-primary font-medium">{formData.email}</span>.
            </p>
          </div>

          <div className="flex items-center space-x-4 text-on-surface-variant/80 bg-white/[0.03] px-6 py-4 rounded-none border border-white/10 backdrop-blur-sm">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span className="text-[9px] tracking-[0.3em] uppercase font-medium">Awaiting Confirmation</span>
          </div>
          
          <p className="text-[9px] text-on-surface-variant/30 mt-8 uppercase tracking-[0.2em] max-w-[280px] leading-loose">
            This office will automatically grant access <br/> upon successful verification.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
