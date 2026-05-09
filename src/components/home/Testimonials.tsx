"use client";

import { motion } from "framer-motion";

export function Testimonials() {
  return (
    <section className="py-20 md:py-40 bg-surface relative overflow-hidden">
      {/* Breathing ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-primary rounded-full blur-[80px] md:blur-[120px] pointer-events-none"
      />

      {/* Background word accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.025] pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="font-display text-[18rem] md:text-[40rem] italic text-primary select-none whitespace-nowrap"
          >
            Legacy
          </motion.span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col items-center text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary mb-8 md:mb-12 block font-semibold"
        >
          Voices of Grandeur
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl w-full"
        >
          <div className="relative px-4 md:px-0">
            {/* Quote mark left */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -top-6 md:-top-16 -left-1 md:-left-8 font-display text-[5rem] md:text-[12rem] text-primary/10 select-none leading-none"
            >
              &ldquo;
            </motion.span>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="font-display text-2xl sm:text-3xl md:text-5xl text-white leading-[1.25] md:leading-[1.1] mb-10 md:mb-16 italic"
            >
              Your Occasion transformed our vision into an ethereal reality. The
              way they integrated our heritage with modern luxury was simply
              breathtaking.
            </motion.p>

            {/* Quote mark right */}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-10 md:-bottom-24 right-0 md:-right-8 font-display text-[5rem] md:text-[12rem] text-primary/10 select-none leading-none"
            >
              &rdquo;
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center mt-6 md:mt-0"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1px] bg-primary/40 mb-6 md:mb-8"
            />
            <span className="uppercase tracking-[0.2em] text-sm text-white font-bold">
              Ananya &amp; Rohan Kapoor
            </span>
            <span className="text-on-surface-variant font-light text-xs mt-2 uppercase tracking-widest">
              Udaipur Palace Wedding &bull; Winter 2024
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
