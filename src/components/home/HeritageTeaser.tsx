"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeritageTeaser() {
  return (
    <section className="py-32 px-4 md:px-8 bg-background relative z-10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group"
        >
          <div className="relative h-[500px] md:h-[700px] w-full overflow-hidden rounded-sm">
            <Image
              src="/images/heritage_palace.png"
              alt="Heritage Palace Event"
              fill
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          
          {/* Accent Element */}
          <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-primary/20 hidden md:block -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-start"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary mb-8 font-medium">
            Heritage & Modernity
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-10 leading-[1.1]">
            Curating <span className="italic text-primary">Indian Luxury</span> with a Global Lens
          </h2>
          <p className="text-on-surface-variant font-light text-lg mb-12 max-w-xl leading-relaxed">
            At Your Occasion, we believe that luxury is deeply rooted in heritage. Our philosophy blends the royal grandeur of Indian traditions with contemporary aesthetic precision. Every celebration we curate is a testament to timeless elegance and bespoke craftsmanship.
          </p>
          
          <div className="grid grid-cols-2 gap-12 mb-12 w-full">
            <div>
              <h4 className="text-white font-display text-2xl mb-2 italic">95%</h4>
              <p className="text-on-surface-variant text-sm uppercase tracking-widest">Bespoke Elements</p>
            </div>
            <div>
              <h4 className="text-white font-display text-2xl mb-2 italic">12+</h4>
              <p className="text-on-surface-variant text-sm uppercase tracking-widest">Global Destinations</p>
            </div>
          </div>

          <Link
            href="/about"
            className="group flex items-center gap-4 text-white hover:text-primary transition-colors duration-300"
          >
            <span className="text-sm uppercase tracking-widest font-medium">Discover Our Heritage</span>
            <div className="w-12 h-[1px] bg-white group-hover:bg-primary transition-all duration-300" />
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
