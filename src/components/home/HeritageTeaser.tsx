"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as any },
  }),
} as any;

export function HeritageTeaser() {
  return (
    <section className="py-16 md:py-32 px-4 md:px-8 bg-background relative z-10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          <div className="relative h-[320px] sm:h-[440px] md:h-[580px] w-full overflow-hidden rounded-sm">
            {/* Shimmer sweep on enter */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent z-20 pointer-events-none"
              initial={{ x: "-100%" }}
              whileInView={{ x: "150%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0"
              whileTap={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/heritage.png"
                alt="Heritage Palace Event"
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>

          {/* Accent border — animates in */}
          <motion.div
            className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 w-32 md:w-48 h-32 md:h-48 border border-primary/20 hidden md:block -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-6 md:mb-8 font-medium"
          >
            Heritage &amp; Modernity
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-6xl text-white mb-6 md:mb-10 leading-[1.1]"
          >
            Curating{" "}
            <span className="italic text-primary">Indian Luxury</span>{" "}
            with a Global Lens
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-on-surface-variant font-light text-base md:text-lg mb-8 md:mb-12 max-w-xl leading-relaxed"
          >
            At Your Occasion, we believe that luxury is deeply rooted in heritage. Our philosophy blends the royal grandeur of Indian traditions with contemporary aesthetic precision.
          </motion.p>

          {/* Stats — stagger in */}
          <div className="grid grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12 w-full">
            {[
              { val: "95%", label: "Bespoke Elements" },
              { val: "12+", label: "Global Destinations" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={statVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h4
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className="text-white font-display text-2xl mb-1 italic"
                >
                  {stat.val}
                </motion.h4>
                <p className="text-on-surface-variant text-xs uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA link */}
          <motion.div
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link
              href="/about"
              className="group flex items-center gap-4 text-white hover:text-primary transition-colors duration-300"
            >
              <span className="text-sm uppercase tracking-widest font-medium">Discover Our Heritage</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2"
              >
                <div className="w-8 md:w-12 h-[1px] bg-white group-hover:bg-primary transition-all duration-300" />
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
