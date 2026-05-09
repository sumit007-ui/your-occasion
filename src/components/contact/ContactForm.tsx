"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    location: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    
    // Check if user is logged in (optional for contact form)
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('inquiries').insert({
      user_id: user?.id || null,
      full_name: formData.name,
      email: formData.email,
      event_type: `Contact: ${formData.subject}`, // Use event_type to store subject for now
      location: formData.location,
      vision: formData.message,
      status: 'pending',
    });

    setLoading(false);

    if (error) {
      toast.error("Failed to send message: " + error.message);
      return;
    }

    toast.success("Your message has been dispatched to the Atelier.");
    setFormData({ name: "", email: "", subject: "", location: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold ml-1">Identity</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="FULL NAME" 
            className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20" 
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold ml-1">Coordinates</label>
          <input 
            type="email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="EMAIL ADDRESS" 
            className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20" 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold ml-1">Subject</label>
            <input 
              type="text" 
              required
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              placeholder="NATURE OF INQUIRY" 
              className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20" 
            />
        </div>
        <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold ml-1">Location</label>
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
                className="text-[9px] text-primary hover:underline uppercase tracking-[0.2em]"
              >
                Detect
              </button>
            </div>
            <input 
              type="text" 
              required
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="EVENT LOCATION" 
              className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20" 
            />
        </div>
      </div>
      <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold ml-1">Message</label>
          <textarea 
            rows={5} 
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="YOUR MESSAGE..." 
            className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] uppercase tracking-[0.3em] text-white focus:outline-none focus:border-primary/50 transition-all resize-none placeholder:text-white/20"
          ></textarea>
      </div>
      <button 
        type="submit"
        disabled={loading}
        className="w-full py-5 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-primary transition-all duration-500 disabled:opacity-50"
      >
        {loading ? "Dispatching..." : "Dispatch Inquiry"}
      </button>
    </form>
  );
}
