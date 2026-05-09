"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const navLinks = [
  { name: "Curations", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Heritage", href: "/about" },
  { name: "Private Office", href: "/dashboard" },
];

export function TopNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-white/5 ${
          scrolled ? "bg-surface/80 backdrop-blur-2xl shadow-2xl h-20" : "bg-transparent h-24"
        }`}
      >
        <nav className="flex justify-between items-center h-full px-8 md:px-20 max-w-[1440px] mx-auto">
          <Link href="/" className="font-display text-2xl md:text-3xl text-primary italic z-50">
            Your Occasion
          </Link>
          
          <div className="hidden md:flex gap-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors duration-500"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link href="/book" className="hidden md:block group relative px-8 py-3 overflow-hidden">
              <span className="absolute inset-0 border border-primary/40 group-hover:border-primary transition-colors" />
              <span className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold text-primary group-hover:text-black transition-colors">
                Inquire
              </span>
            </Link>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-primary hover:opacity-80 transition-opacity z-50"
            >
              {isOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <span className="material-symbols-outlined text-4xl">menu</span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[40] bg-[#0a0a0a] md:hidden flex flex-col pt-32 pb-12 px-10"
          >
            {/* Background Decorative Text - Extremely subtle and elegant */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none w-full text-center">
              <h2 className="font-display text-[30vw] text-primary italic leading-none select-none">Atelier</h2>
            </div>

            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="flex flex-col gap-10">
                <span className="text-[10px] uppercase tracking-[0.5em] text-primary/40 font-bold mb-4">Navigation</span>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-display text-white hover:text-primary transition-all duration-500 italic tracking-tight flex items-baseline gap-4 group"
                    >
                      <span className="text-[9px] font-sans not-italic text-primary/30 group-hover:text-primary transition-colors tracking-widest">0{i + 1}</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-500">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col gap-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/book"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-5 border border-primary/20 text-primary uppercase tracking-[0.5em] text-[10px] font-bold hover:bg-primary hover:text-black transition-all duration-700 flex items-center justify-center gap-3 bg-primary/5 group"
                  >
                    <span>Start Inquiry</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">north_east</span>
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col gap-8 border-t border-white/5 pt-8"
                >
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] uppercase tracking-[0.4em] text-primary/50 font-bold">Concierge</span>
                      <a href="tel:+919915110524" className="text-base text-white/90 font-medium hover:text-primary transition-colors">+91 99151 10524</a>
                    </div>
                    <div className="flex gap-6">
                      {['IG', 'FB', 'TW'].map((social) => (
                        <span key={social} className="text-[9px] tracking-[0.2em] text-white/30 hover:text-primary cursor-pointer transition-colors font-bold">{social}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <p className="text-on-surface-variant/30 text-[9px] tracking-[0.2em] uppercase font-medium">
                      Developed by <Link href="https://devnxy.vercel.app/" target="_blank" className="text-primary/40 hover:text-primary transition-colors">Devnxy</Link>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
