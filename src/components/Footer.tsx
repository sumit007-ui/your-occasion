"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      // In a real app, you'd send this to your database
    }
  };

  return (
    <footer className="bg-background pt-32 pb-12 px-8 md:px-20 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-4 relative z-10 text-center md:text-left">
        
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col justify-between items-center md:items-start">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-display text-4xl text-primary italic mb-6">Your Occasion</h2>
            <p className="text-on-surface-variant font-light leading-relaxed max-w-sm mb-12 mx-auto md:mx-0">
              Architecting unforgettable moments. We curate bespoke experiences 
              for those who appreciate the extraordinary.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link href="https://instagram.com" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors duration-500">
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </Link>
            <Link href="https://twitter.com" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors duration-500">
              <span className="material-symbols-outlined text-xl">language</span>
            </Link>
            <Link href="https://linkedin.com" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors duration-500">
              <span className="material-symbols-outlined text-xl">mail</span>
            </Link>
          </div>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <h4 className="text-xs uppercase tracking-widest text-on-surface mb-8 font-semibold">The Atelier</h4>
          <ul className="space-y-4 flex flex-col items-center md:items-start">
            {[
              { name: 'Our Philosophy', href: '/about' },
              { name: 'Bespoke Process', href: '/services' },
              { name: 'Signature Gallery', href: '/gallery' },
              { name: 'Global Presence', href: '/about#locations' }
            ].map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-light text-sm flex items-center justify-center md:justify-start group">
                  {item.name}
                  <span className="material-symbols-outlined text-[10px] ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300">north_east</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <h4 className="text-xs uppercase tracking-widest text-on-surface mb-8 font-semibold">Concierge</h4>
          <ul className="space-y-4 flex flex-col items-center md:items-start">
            <li><Link href="/login" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-light">Sign In</Link></li>
            <li><Link href="/register" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-light">Join the Atelier</Link></li>
            <li><Link href="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-light">Private Office</Link></li>
            <li><Link href="/admin" className="text-on-surface-variant/40 hover:text-primary transition-colors text-[10px] uppercase tracking-widest font-bold">Executive Desk</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <h4 className="text-xs uppercase tracking-widest text-on-surface mb-8 font-semibold">Contact</h4>
          <ul className="space-y-4 flex flex-col items-center md:items-start">
            <li className="flex flex-col items-center md:items-start">
              <span className="text-[10px] text-primary uppercase tracking-widest mb-1">WhatsApp</span>
              <Link href="https://wa.me/919915110524" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-light">+91 99151 10524</Link>
            </li>
            <li className="flex flex-col items-center md:items-start">
              <span className="text-[10px] text-primary uppercase tracking-widest mb-1">Direct Line</span>
              <Link href="tel:+91797329328" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-light">+91 79732 9328</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start">
           <h4 className="text-xs uppercase tracking-widest text-on-surface mb-8 font-semibold">The Registry</h4>
           <p className="text-on-surface-variant font-light text-sm mb-6">
             Subscribe for seasonal curations and exclusive event access.
           </p>
           {subscribed ? (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-primary text-sm italic font-display"
             >
               Welcome to the inner circle.
             </motion.div>
           ) : (
             <form 
               onSubmit={handleSubmit}
               className="relative border-b border-white/20 pb-2 focus-within:border-primary transition-colors duration-500"
             >
               <input 
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                 placeholder="Your Email Address" 
                 className="w-full bg-transparent outline-none text-white font-light text-sm placeholder:text-white/30 pr-12 autofill:[transition:background-color_9999s_ease-in-out_0s] autofill:[-webkit-text-fill-color:white]"
               />
               <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors duration-300">
                 <span className="material-symbols-outlined text-xl">north_east</span>
               </button>
             </form>
           )}
        </div>

      </div>

      <div className="max-w-[1440px] mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <p className="text-on-surface-variant/60 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Your Occasion. All Rights Reserved.
          </p>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <p className="text-on-surface-variant/40 text-[10px] tracking-[0.2em] uppercase font-medium">
            Developed by <Link href="https://devnxy.vercel.app/" target="_blank" className="text-primary/60 hover:text-primary transition-colors">Devnxy</Link>
          </p>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-on-surface-variant/60 hover:text-on-surface text-xs tracking-wider transition-colors duration-300">Privacy</Link>
          <Link href="/terms" className="text-on-surface-variant/60 hover:text-on-surface text-xs tracking-wider transition-colors duration-300">Terms</Link>
          <Link href="/contact" className="text-on-surface-variant/60 hover:text-on-surface text-xs tracking-wider transition-colors duration-300">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
