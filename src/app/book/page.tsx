import { BookingFlow } from "@/components/booking/BookingFlow"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Inquire - Your Occasion",
  description: "Begin your bespoke journey.",
}

export default function BookPage() {
  return (
    <main className="min-h-screen bg-background pt-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 relative z-10 py-12">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Begin the <span className="italic text-primary">Journey</span>
          </h1>
          <p className="text-on-surface-variant font-light max-w-xl mx-auto">
            Provide us with the initial details of your vision, and our team will prepare a curated proposal for your consideration.
          </p>
        </div>

        <BookingFlow />
      </div>
    </main>
  )
}
