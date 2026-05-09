"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

const steps = [
  { id: "personal", title: "Personal Details" },
  { id: "event", title: "Event Particulars" },
  { id: "vision", title: "The Vision" },
];

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    location: "",
    guests: "",
    budget: "",
    vision: "",
  });
  const supabase = createClient();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== steps.length - 1) {
      handleNext();
      return;
    }
    
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('inquiries').insert({
      user_id: user?.id || null, // Link to user if logged in, else null
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      event_type: formData.eventType,
      event_date: formData.date,
      location: formData.location,
      guest_count: parseInt(formData.guests) || 0,
      budget_range: formData.budget,
      vision: formData.vision,
    });

    if (error) {
      toast.error("Failed to submit inquiry: " + error.message);
      return;
    }

    toast.success("Inquiry submitted successfully. Our team will contact you shortly.");
    // Optional: Reset form or redirect
  };

  return (
    <div className="bg-surface/40 backdrop-blur-3xl border border-white/5 p-8 md:p-12 shadow-2xl relative">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-[1px] bg-primary/50" />
      <div className="absolute top-0 left-0 w-[1px] h-4 bg-primary/50" />
      <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-primary/50" />
      <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-primary/50" />

      {/* Progress */}
      <div className="flex justify-between items-center mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10 -z-10" />
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center gap-2 bg-surface px-2">
            <div 
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

      <form onSubmit={handleSubmit} className="min-h-[300px] flex flex-col justify-between">
        <div className="relative">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Full Name</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="bg-black/20 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white font-light rounded-none h-12"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Email Address</Label>
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="bg-black/20 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white font-light rounded-none h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Phone Number</Label>
                    <Input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="bg-black/20 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white font-light rounded-none h-12"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Event Category</Label>
                  <Input 
                    placeholder="e.g. Matrimonial, Corporate, Private Dining"
                    value={formData.eventType}
                    onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                    required
                    className="bg-black/20 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white font-light rounded-none h-12"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Event Location</Label>
                      <button 
                        type="button"
                        onClick={async () => {
                          if ("geolocation" in navigator) {
                            navigator.geolocation.getCurrentPosition(async (position) => {
                              try {
                                const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
                                const data = await res.json();
                                setFormData({ ...formData, location: `${data.city}, ${data.countryName}` });
                                toast.success("Location detected: " + data.city);
                              } catch (e) {
                                toast.error("Could not resolve address");
                              }
                            });
                          }
                        }}
                        className="text-[10px] text-primary hover:underline uppercase tracking-tighter"
                      >
                        Detect
                      </button>
                    </div>
                    <Input 
                      placeholder="City, Venue, or Remote"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                      className="bg-black/20 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white font-light rounded-none h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Anticipated Date</Label>
                    <Input 
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                      className="bg-black/20 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white font-light rounded-none h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Guest Count</Label>
                  <Input 
                    type="number"
                    placeholder="e.g. 150"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    required
                    className="bg-black/20 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white font-light rounded-none h-12"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">Investment Range</Label>
                  <Input 
                    placeholder="e.g. $50,000 - $100,000"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    required
                    className="bg-black/20 border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white font-light rounded-none h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-on-surface-variant font-light">The Vision</Label>
                  <textarea 
                    placeholder="Describe the atmosphere, aesthetics, and expectations for your occasion..."
                    value={formData.vision}
                    onChange={(e) => setFormData({...formData, vision: e.target.value})}
                    required
                    className="w-full bg-black/20 border border-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-white font-light p-4 min-h-[150px]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button
            type="button"
            variant="ghost"
            onClick={handlePrev}
            className={`text-xs uppercase tracking-widest rounded-none ${currentStep === 0 ? "invisible" : "visible"}`}
          >
            Previous
          </Button>
          <Button
            type="submit"
            className="bg-primary text-on-primary hover:bg-primary/90 rounded-none px-8 text-xs uppercase tracking-widest font-medium transition-all duration-300"
          >
            {currentStep === steps.length - 1 ? "Submit Inquiry" : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
