"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthWrapper({ children, title, subtitle }: AuthWrapperProps) {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center relative overflow-hidden pt-40 pb-20 px-4">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[5%] left-[5%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-[5%] right-[5%] w-[700px] h-[700px] bg-primary/5 rounded-full blur-[160px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Decorative Texture/Grain */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Branding */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl text-white italic tracking-[0.2em] mb-4">Your Occasion</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full border border-primary/40 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-primary" />
            </div>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="glass-card p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden group border border-white/10"
        >
          {/* Card Glass Polish Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          {/* Card Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl text-white italic mb-4 tracking-tight">{title}</h1>
            <p className="text-on-surface-variant/60 text-xs font-light tracking-widest leading-relaxed uppercase">
              {subtitle}
            </p>
          </div>

          {children}
        </motion.div>
      </div>
    </main>
  );
}
