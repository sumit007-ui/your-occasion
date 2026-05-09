"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { LocationSearch, type LocationValue } from "@/components/booking/LocationSearch";

const steps = [
  { id: "personal", title: "Your Info" },
  { id: "event", title: "Event Details" },
  { id: "vision", title: "Your Idea" },
];

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [location, setLocation] = useState<LocationValue | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    guests: "",
    budget: "",
    vision: "",
  });
  const supabase = createClient();

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(curr => curr + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== steps.length - 1) { handleNext(); return; }

    if (!location) {
      toast.error("Please select an event location.");
      setCurrentStep(1);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from("inquiries").insert({
      user_id:          user?.id || null,
      full_name:        formData.name,
      email:            formData.email,
      phone:            formData.phone,
      event_type:       formData.eventType,
      event_date:       formData.date,
      location:         location.display,
      location_lat:     location.lat,
      location_lng:     location.lng,
      location_display: location.display,
      guest_count:      parseInt(formData.guests) || 0,
      budget_range:     formData.budget,
      vision:           formData.vision,
    });

    if (error) { toast.error("Failed to submit: " + error.message); return; }

    toast.success("Inquiry submitted! Our team will contact you shortly.");
    // Reset
    setFormData({ name: "", email: "", phone: "", eventType: "", date: "", guests: "", budget: "", vision: "" });
    setLocation(null);
    setCurrentStep(0);
  };

  const inputClass = "bg-black/20 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white font-light rounded-none h-12";

  return (
    <div className="bg-surface/40 backdrop-blur-3xl border border-white/5 p-5 sm:p-8 md:p-12 shadow-2xl relative">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-[1px] bg-primary/50" />
      <div className="absolute top-0 left-0 w-[1px] h-4 bg-primary/50" />
      <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-primary/50" />
      <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-primary/50" />

      {/* Progress */}
      <div className="flex justify-between items-center mb-8 md:mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10 -z-10" />
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center gap-2 bg-surface px-2">
            <motion.div
              animate={{ scale: index === currentStep ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                index <= currentStep ? "bg-primary" : "bg-white/20"
              }`}
            />
            <span className={`text-[10px] uppercase tracking-widest transition-colors duration-500 ${
              index <= currentStep ? "text-primary" : "text-white/40"
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="min-h-[280px] md:min-h-[300px] flex flex-col justify-between">
        <div className="relative">
          <AnimatePresence mode="wait">

            {/* Step 1 — Personal Info */}
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Full Name</Label>
                  <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Email Address</Label>
                    <Input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Phone Number</Label>
                    <Input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required className={inputClass} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Event Details */}
            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Event Type</Label>
                  <Input
                    placeholder="e.g. Matrimonial, Corporate, Private Dining"
                    value={formData.eventType}
                    onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location — with autocomplete */}
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">
                      Event Location
                    </Label>
                    <LocationSearch value={location} onChange={setLocation} />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Event Date</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Guest Count</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 150"
                    value={formData.guests}
                    onChange={e => setFormData({ ...formData, guests: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3 — Vision */}
            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Budget</Label>
                  <Input
                    placeholder="e.g. ₹50,000 – ₹1,00,000"
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Your Idea</Label>
                  <textarea
                    placeholder="Describe the atmosphere, aesthetics, and expectations for your occasion…"
                    value={formData.vision}
                    onChange={e => setFormData({ ...formData, vision: e.target.value })}
                    required
                    className="w-full bg-black/20 border border-white/10 focus:outline-none focus:border-primary/50 text-white font-light p-4 min-h-[150px] resize-none placeholder:text-white/25 transition-colors"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
          <Button
            type="button"
            variant="ghost"
            onClick={handlePrev}
            className={`text-xs uppercase tracking-widest rounded-none ${currentStep === 0 ? "invisible" : "visible"}`}
          >
            Previous
          </Button>
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className="bg-primary text-on-primary hover:bg-primary/90 rounded-none px-8 text-xs uppercase tracking-widest font-medium transition-all duration-300"
            >
              {currentStep === steps.length - 1 ? "Submit Inquiry" : "Continue"}
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  );
}
