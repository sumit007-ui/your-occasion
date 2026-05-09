"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Password updated successfully.");
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-8">
      <div className="space-y-3">
        <Label htmlFor="password" name="password-label" id="password-label" className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 font-medium">New Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="bg-white/[0.03] border-white/10 focus:border-primary/50 focus:ring-0 text-white font-light rounded-none h-14 placeholder:text-white/10 transition-all duration-500 hover:bg-white/[0.05]"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-on-primary hover:bg-primary/90 h-14 rounded-none text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-700 hover:tracking-[0.5em] shadow-[0_10px_20px_rgba(242,202,80,0.15)] relative overflow-hidden group/btn"
      >
        <span className="relative z-10">{loading ? "Updating..." : "Update Credentials"}</span>
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
      </Button>
    </form>
  );
}
