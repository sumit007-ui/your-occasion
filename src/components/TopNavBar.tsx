"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function TopNavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-white/5 ${
        scrolled ? "bg-surface/80 backdrop-blur-2xl shadow-2xl h-20" : "bg-transparent h-24"
      }`}
    >
      <nav className="flex justify-between items-center h-full px-8 md:px-20 max-w-[1440px] mx-auto">
        <Link href="/" className="font-display text-2xl md:text-3xl text-primary italic">
          Your Occasion
        </Link>
        <div className="hidden md:flex gap-10 items-center">
          <Link
            href="/services"
            className="text-sm uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors duration-500"
          >
            Curations
          </Link>
          <Link
            href="/gallery"
            className="text-sm uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors duration-500"
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="text-sm uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors duration-500"
          >
            Heritage
          </Link>
          <Link
            href="/dashboard"
            className="text-sm uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors duration-500"
          >
            Private Office
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/book" className="hidden md:block group relative px-8 py-3 overflow-hidden">
            <span className="absolute inset-0 border border-primary/40 group-hover:border-primary transition-colors" />
            <span className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold text-primary group-hover:text-black transition-colors">
              Inquire
            </span>
          </Link>
          <button className="text-primary hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-4xl">menu</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
