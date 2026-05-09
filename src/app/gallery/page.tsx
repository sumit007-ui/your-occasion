"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const images = [
    { url: "/images/wedding_mandap.png", span: "md:col-span-2 md:row-span-2", title: "Udaipur Mandap", priority: true },
    { url: "/images/jaipur_palace.png", span: "md:col-span-1 md:row-span-1", title: "Jaipur Soirée", priority: true },
    { url: "/images/sangeet_decor.png", span: "md:col-span-1 md:row-span-1", title: "Royal Sangeet", priority: true },
    { url: "/images/royal_dining.png", span: "md:col-span-1 md:row-span-1", title: "Heritage Banquet" },
    { url: "/images/lake_palace.png", span: "md:col-span-1 md:row-span-1", title: "Island Venue" },
    { url: "/images/baraat.png", span: "md:col-span-1 md:row-span-1", title: "Grand Procession" },
    { url: "/images/couture_wedding.png", span: "md:col-span-1 md:row-span-1", title: "Bridal Couture" },
    { url: "/images/gala.png", span: "md:col-span-1 md:row-span-1", title: "Heritage Gala" },
    { url: "/images/showcase.png", span: "md:col-span-1 md:row-span-1", title: "Artistic Showcase" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="min-h-screen pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-20 max-w-[1440px] mx-auto bg-background">
      <header className="mb-10 md:mb-24 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold mb-3 md:mb-4 block"
        >
          The Indian Collection
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl sm:text-5xl md:text-7xl text-white italic"
        >
          A Symphony of Moments
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-on-surface-variant font-light text-lg max-w-2xl mx-auto"
        >
          A perfectly curated collection of our most evocative experiences. Heritage, grandeur, and cinematic celebration.
        </motion.p>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[260px] sm:auto-rows-[300px] md:auto-rows-[350px]"
      >
        {images.map((img, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants as any}
            className={`relative group overflow-hidden border border-white/5 bg-surface ${img.span}`}
          >
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex flex-col items-center justify-center p-6 text-center">
               <span className="material-symbols-outlined text-primary text-4xl transform scale-50 group-hover:scale-100 transition-transform duration-500 mb-4">fullscreen</span>
               <h3 className="font-display text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">{img.title}</h3>
            </div>
            <Image 
              src={img.url} 
              alt={img.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={img.priority}
              className="object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-center"
      >
        <button className="border border-primary/30 px-12 py-4 text-[10px] uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-on-primary transition-all duration-700 cursor-pointer">
          Request Portfolio Access
        </button>
      </motion.div>
    </main>
  );
}
