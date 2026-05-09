export default function TermsOfService() {
  return (
    <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
      <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block text-center">Legal</span>
      <h1 className="font-display text-6xl text-white italic text-center mb-20">Terms of Service</h1>
      
      <div className="space-y-12 text-on-surface-variant font-light text-sm leading-relaxed tracking-wide">
        <section>
          <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-4">1. Engagement</h3>
          <p>
            By accessing the Your Occasion portal and Private Office, you agree to these terms. Our services are reserved for clients seeking high-end, curated event management and production.
          </p>
        </section>

        <section>
          <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-4">2. Concierge Responsibility</h3>
          <p>
            While we strive for perfection in every production, our responsibility is limited to the management and coordination of vetted artisans. Final deliverables are subject to the individual contracts with our network partners.
          </p>
        </section>

        <section>
          <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-4">3. Private Office Access</h3>
          <p>
            Login credentials for the Private Office are personal and non-transferable. Any unauthorized use of the executive portal must be reported to the concierge immediately.
          </p>
        </section>

        <div className="pt-10 border-t border-white/5 text-center">
           <p className="text-[10px] uppercase tracking-widest italic">Last Revised: May 2024</p>
        </div>
      </div>
    </div>
  );
}
