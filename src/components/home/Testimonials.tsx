"use client";

import { motion } from "framer-motion";

export function Testimonials() {
  return (
    <section className="py-40 bg-surface relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[40rem] italic text-primary select-none whitespace-nowrap">
            Legacy
          </span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col items-center text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.4em] text-primary mb-12 block font-semibold">
          Voices of Grandeur
        </span>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <div className="relative">
            <span className="absolute -top-16 -left-8 font-display text-[12rem] text-primary/10 select-none">"</span>
            <p className="font-display text-4xl md:text-6xl text-white leading-[1.1] mb-16 italic">
              Your Occasion transformed our vision into an ethereal reality. The way they integrated our heritage with modern luxury was simply breathtaking.
            </p>
            <span className="absolute -bottom-24 -right-8 font-display text-[12rem] text-primary/10 select-none">"</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-[1px] bg-primary/40 mb-8" />
            <span className="uppercase tracking-[0.2em] text-sm text-white font-bold">Ananya & Rohan Kapoor</span>
            <span className="text-on-surface-variant font-light text-xs mt-2 uppercase tracking-widest">
              Udaipur Palace Wedding • Winter 2024
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
