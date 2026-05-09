"use client";

import { motion } from "framer-motion";

export function Testimonials() {
  return (
    <section className="py-32 bg-surface relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <span className="text-xs uppercase tracking-widest text-primary mb-8 block">
          Words of Praise
        </span>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <p className="font-display text-3xl md:text-5xl text-white leading-tight mb-12">
            "Your Occasion transformed our vision into an ethereal reality. The way they integrated our heritage with modern luxury was simply breathtaking."
          </p>
          <div className="flex flex-col items-center">
            <span className="uppercase tracking-widest text-sm text-white font-medium">Ananya & Rohan Kapoor</span>
            <span className="text-on-surface-variant font-light text-sm mt-1">Udaipur Palace Wedding, 2024</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
