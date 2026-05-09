import dynamic from "next/dynamic";
import { CinematicHero } from "@/components/home/CinematicHero";

// Dynamic imports for non-critical below-the-fold components
const HeritageTeaser = dynamic(() => import("@/components/home/HeritageTeaser").then(mod => mod.HeritageTeaser), {
  loading: () => <div className="h-[600px] bg-background" />
});
const ServicesReel = dynamic(() => import("@/components/home/ServicesReel").then(mod => mod.ServicesReel), {
  loading: () => <div className="h-[600px] bg-background" />
});
const Testimonials = dynamic(() => import("@/components/home/Testimonials").then(mod => mod.Testimonials), {
  loading: () => <div className="h-[400px] bg-background" />
});

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Page Content */}
      <div className="flex flex-col w-full">
        <CinematicHero />
        <HeritageTeaser />
        <ServicesReel />
        <Testimonials />
      </div>
    </main>
  );
}
