"use client";

import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function ServicesReel() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-8 bg-background relative z-10">
      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-4"
        >
          <div>
            <h2 className="font-display text-3xl md:text-6xl text-white mb-4 md:mb-6">
              Our{" "}
              <motion.span
                className="italic text-primary inline-block"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Curations
              </motion.span>
            </h2>
            <p className="text-on-surface-variant font-light max-w-md text-sm md:text-base">
              A selection of our signature experiences, tailored to perfection.
            </p>
          </div>
          <motion.div whileTap={{ scale: 0.96 }}>
            <Link
              href="/services"
              className="group flex items-center text-xs md:text-sm uppercase tracking-widest text-primary hover:text-white transition-colors duration-300"
            >
              View All Services
              <motion.span
                animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants as any}
              whileTap={{ scale: 0.98 }}
              className="group relative cursor-pointer"
            >
              {/* Image container */}
              <div className="relative h-[320px] sm:h-[400px] md:h-[550px] w-full overflow-hidden">
                {/* Shimmer sweep on tap for mobile */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent z-20 pointer-events-none"
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "150%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + index * 0.2, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 1.02 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* Card label */}
              <motion.div
                className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full bg-gradient-to-t from-black/80 to-transparent"
                initial={{ y: 8, opacity: 0.85 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-primary mb-1 md:mb-2 block">
                  {service.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-white">
                  {service.title}
                </h3>
              </motion.div>

              {/* Bottom border accent — animates in */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-primary z-30"
                initial={{ width: "0%" }}
                whileInView={{ width: "40%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
