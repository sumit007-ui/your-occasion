"use client";

import { motion } from "framer-motion";

export function FloatingWhatsApp() {
  const phoneNumber = "919915110524"; 
  const message = "Hello! I'm interested in your luxury event services.";

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4 group">
      {/* Tooltip/Label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 mr-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">Connect with Concierge</span>
      </motion.div>

      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center"
      >
        {/* Animated Rings */}
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping [animation-duration:3s]" />
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse [animation-duration:2s]" />

        {/* Main Button Body */}
        <div className="absolute inset-0 bg-background/40 backdrop-blur-2xl border border-white/10 group-hover:border-primary/40 rounded-full transition-colors duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)]" />
        
        {/* WhatsApp Icon in Gold/Primary */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 md:w-8 md:h-8 text-primary fill-current relative z-10 drop-shadow-[0_0_8px_rgba(242,202,80,0.4)]"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.436 1.096 3.393L6.447 18.5l3.275-1.073c.691.311 1.464.484 2.277.484 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.735-5.767zm4.331 8.273c-.156.444-.793.805-1.107.84-.282.031-.647.051-1.034-.074-.241-.082-.541-.186-.921-.341-1.616-.659-2.731-2.284-2.813-2.392-.082-.108-.667-.887-.667-1.691 0-.803.419-1.196.569-1.354.15-.158.33-.198.441-.198.111 0 .221 0 .318.005.102.004.235-.04.368.281.137.332.467 1.144.508 1.226.041.082.068.178.014.288-.054.111-.081.178-.162.274-.081.096-.169.215-.242.288-.083.082-.169.172-.072.339.096.166.428.706.918 1.144.63.565 1.161.739 1.328.823.166.084.264.07.362-.041.098-.111.419-.487.53-.655.111-.166.221-.138.368-.082.148.055.938.441 1.099.522.161.081.269.121.309.191.04.07.04.409-.116.853z" />
        </svg>
      </motion.a>
    </div>
  );
}
