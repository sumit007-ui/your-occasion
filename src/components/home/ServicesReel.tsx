"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Regal Indian Weddings",
    category: "Matrimonial Heritage",
    image: "/images/wedding_mandap.png",
  },
  {
    title: "Heritage Soirées",
    category: "Corporate & Royal",
    image: "/images/jaipur_palace.png",
  },
  {
    title: "Royal Banquets",
    category: "Couture Dining",
    image: "/images/royal_dining.png",
  },
];

export function ServicesReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} className="py-32 px-4 md:px-8 bg-background relative z-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6">
              Our <span className="italic text-primary">Curations</span>
            </h2>
            <p className="text-on-surface-variant font-light max-w-md">
              A selection of our signature experiences, tailored to perfection.
            </p>
          </div>
          <Link 
            href="/services" 
            className="group flex items-center text-sm uppercase tracking-widest text-primary hover:text-white transition-colors duration-300 mt-8 md:mt-0"
          >
            View All Services
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative cursor-pointer"
            >
              <div className="relative h-[600px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                />
              </div>
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs uppercase tracking-widest text-primary mb-2 block">
                  {service.category}
                </span>
                <h3 className="font-display text-3xl text-white">
                  {service.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
