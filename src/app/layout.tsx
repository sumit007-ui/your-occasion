import { Bodoni_Moda, Hanken_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export const metadata = {
  title: "Your Occasion | The Art of Celebration",
  description: "A complete full-stack modern luxury event management SaaS platform.",
};

import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
        />
      </head>
      <body
        className={`${bodoni.variable} ${hanken.variable} antialiased bg-[#131313] text-[#e5e2e1] selection:bg-[#f2ca50] selection:text-[#3c2f00] overflow-x-hidden relative`}
      >
        <SmoothScroll>
          <TopNavBar />
          {children}
          <Footer />
        </SmoothScroll>
        <FloatingWhatsApp />
        <Toaster theme="dark" position="top-center" />
      </body>
    </html>
  );
}
