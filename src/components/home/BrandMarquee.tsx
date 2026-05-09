"use client";

import { motion } from "framer-motion";

const brands = [
  "Vogue Events",
  "Elite Weddings",
  "Royal Galas",
  "Luxury Retreats",
  "Signature Soirees",
  "Grand Occasions",
  "Heritage Celebrations",
  "Ethereal Moments",
];

export function BrandMarquee() {
  return (
    <section className="py-20 bg-background/50 border-y border-primary/10 overflow-hidden relative">
      {/* Gradient Mask for smooth fade-in/out edges */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-16 md:gap-24 items-center"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
        >
          {brands.map((brand, i) => (
            <div key={i} className="flex items-center gap-16 md:gap-24">
              <span className="text-3xl md:text-5xl font-display text-primary/30 tracking-[0.2em] uppercase hover:text-primary transition-colors duration-700 cursor-default select-none">
                {brand}
              </span>
              <div className="w-2 h-2 rounded-full bg-primary/20" />
            </div>
          ))}
        </motion.div>
        
        {/* Duplicate for infinite loop */}
        <motion.div
          className="flex gap-16 md:gap-24 items-center"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
        >
          {brands.map((brand, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-16 md:gap-24">
              <span className="text-3xl md:text-5xl font-display text-primary/30 tracking-[0.2em] uppercase hover:text-primary transition-colors duration-700 cursor-default select-none">
                {brand}
              </span>
              <div className="w-2 h-2 rounded-full bg-primary/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
