import { Card } from "@/components/ui/card";

export default function FinancialRecords() {
  const transactions = [
    { id: "INV-001", client: "Alexander Von Berg", amount: "£45,000", status: "Paid", date: "01 May 2024" },
    { id: "INV-002", client: "Elena Rossi", amount: "£12,500", status: "Pending", date: "05 May 2024" },
    { id: "INV-003", client: "Julian Thorne", amount: "£28,000", status: "Overdue", date: "28 Apr 2024" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Ledger: Executive</span>
          <h1 className="font-display text-5xl text-white italic">Financial Records</h1>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-6 py-3 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">download</span>
              Export Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: "Q2 Revenue", value: "£184,500", icon: "account_balance", trend: "+18%" },
           { label: "Pending Payments", value: "£42,000", icon: "pending_actions", trend: "3 Invoices" },
           { label: "Operating Costs", value: "£32,400", icon: "receipt", trend: "-5% vs Q1" }
         ].map((stat, idx) => (
           <Card key={idx} className="bg-surface/30 border-white/5 p-8 rounded-none group hover:border-primary/20 transition-all duration-500">
              <div className="flex justify-between items-center mb-4">
                <span className="material-symbols-outlined text-primary/40 text-2xl">{stat.icon}</span>
                <span className="text-[8px] tracking-[0.2em] text-primary/60 uppercase font-bold">{stat.trend}</span>
              </div>
              <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <p className="font-display text-4xl text-white">{stat.value}</p>
           </Card>
         ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h3 className="font-display text-2xl text-white italic">Recent Invoices</h3>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="overflow-hidden border border-white/5 bg-surface/10">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="p-6 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Invoice ID</th>
                <th className="p-6 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Client Identity</th>
                <th className="p-6 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Date Filed</th>
                <th className="p-6 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Amount</th>
                <th className="p-6 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-white/5 transition-colors">
                  <td className="p-6 font-mono text-[10px] text-primary tracking-widest">{tx.id}</td>
                  <td className="p-6 text-white text-sm font-light uppercase tracking-wide">{tx.client}</td>
                  <td className="p-6 text-on-surface-variant text-[10px] uppercase tracking-widest">{tx.date}</td>
                  <td className="p-6 text-white font-display text-lg italic">{tx.amount}</td>
                  <td className="p-6 text-right">
                    <span className={`text-[8px] uppercase tracking-widest px-3 py-1 border ${
                      tx.status === 'Paid' ? 'border-green-500/20 text-green-400 bg-green-500/5' : 
                      tx.status === 'Overdue' ? 'border-red-500/20 text-red-400 bg-red-500/5' :
                      'border-amber-500/20 text-amber-400 bg-amber-500/5'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
