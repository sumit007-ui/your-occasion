import { CinematicHero } from "@/components/home/CinematicHero";
import { ServicesReel } from "@/components/home/ServicesReel";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Page Content */}
      <div className="flex flex-col w-full">
        <CinematicHero />
        <ServicesReel />
        <Testimonials />
      </div>
    </main>
  );
}
