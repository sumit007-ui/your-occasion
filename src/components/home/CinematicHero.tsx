"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <Image
          src="/images/lake_palace.png"
          alt="Lake Palace Venue"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Floating ambient orb — mobile visible */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[600px] h-[280px] md:h-[600px] bg-primary rounded-full blur-[80px] md:blur-[120px] z-0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 mt-16 md:mt-20">
        {/* Eyebrow label — slides up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary mb-5 md:mb-6 block font-medium"
          >
            India&apos;s Premiere Event Architects
          </motion.span>
        </motion.div>

        {/* Heading — clips up word by word feel */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-white max-w-6xl leading-[1.1] md:leading-[1] mb-6 md:mb-8"
        >
          Orchestrating{" "}
          <motion.span
            className="italic text-primary inline-block"
            animate={{ skewX: [0, -1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Royal Heritage
          </motion.span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45 }}
          className="text-on-surface-variant font-light text-sm md:text-xl max-w-2xl mb-8 md:mb-12 px-2 md:px-0 leading-relaxed"
        >
          From majestic palace weddings in Udaipur to avant-garde galas in
          Mumbai. We turn your heritage into a cinematic celebration.
        </motion.p>

        {/* CTA Button — tap spring effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div whileTap={{ scale: 0.94 }} transition={{ type: "spring", stiffness: 400 }}>
            <Link
              href="/book"
              className="group relative inline-flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 overflow-hidden border border-white/20 bg-transparent text-white hover:border-primary transition-colors duration-500"
            >
              <span className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="relative z-10 flex items-center text-xs md:text-sm uppercase tracking-widest font-medium gap-2 md:gap-3">
                Begin the Journey
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[9px] md:text-[10px] uppercase tracking-widest text-on-surface-variant"
        >
          Scroll
        </motion.span>
        <div className="w-[1px] h-10 md:h-12 bg-white/20 overflow-hidden relative">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
