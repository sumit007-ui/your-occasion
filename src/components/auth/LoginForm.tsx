"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role === 'admin') {
        toast.success("Access Granted. Welcome, Administrator.");
        router.push("/admin");
      } else {
        toast.success("Welcome back to Your Occasion.");
        router.push("/dashboard");
      }
    } else {
      router.push("/dashboard");
    }
    
    router.refresh();
  };

  return (
    <form onSubmit={handleLogin} className="space-y-8">
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
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-medium">Password</Label>
          <Link href="/reset-password" id="forgot-password" className="text-[10px] uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-all duration-300">
            Forgot?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-0 text-white font-light rounded-none h-14 placeholder:text-white/10 transition-all duration-500 hover:bg-white/[0.05]"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-on-primary hover:bg-primary/90 h-14 rounded-none text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-700 hover:tracking-[0.5em] shadow-[0_10px_20px_rgba(242,202,80,0.15)] relative overflow-hidden group/btn"
      >
        <span className="relative z-10">{loading ? "Authenticating..." : "Access Portfolio"}</span>
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
      </Button>

      <div className="mt-12 text-center pt-8 border-t border-white/5">
        <p className="text-[10px] text-on-surface-variant/40 font-light uppercase tracking-[0.2em]">
          Not a member?{" "}
          <Link href="/register" className="text-primary/80 hover:text-primary transition-all duration-300 ml-1 font-medium">
            Inquire Here
          </Link>
        </p>
      </div>
    </form>
  );
}
