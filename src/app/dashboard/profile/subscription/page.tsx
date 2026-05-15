"use client";

import { useState } from "react";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { Crown, Check, ChevronLeft, ShieldCheck, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const PLANS = [
  {
    id: "standard",
    name: "Standard Plan",
    price: "0",
    period: "Forever",
    features: ["3 Daily Matches", "Basic Filters", "Phone Verification"],
    recommended: false,
  },
  {
    id: "legacy",
    name: "Legacy Plan",
    price: "999",
    period: "3 Months",
    features: ["Unlimited Match Access", "See Who Liked You", "Guna Milan Reports", "Direct Concierge Support", "Trusted AI Badge"],
    recommended: true,
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("legacy");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    toast.success("Welcome to the Legacy Plan.");
  };

  return (
    <main className="min-h-screen bg-brand-sand pb-48 pt-12">
      <div className="max-w-[480px] mx-auto px-8 space-y-12">
        <header className="space-y-4">
          <Link href="/dashboard/profile" className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-emerald transition-all">
             <ChevronLeft className="w-5 h-5" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Back to Profile</span>
          </Link>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Membership</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trusted Family Networking</p>
        </header>

        <div className="space-y-8">
           {PLANS.map((plan) => (
              <motion.div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`group relative p-10 rounded-[40px] transition-all cursor-pointer border-4 ${
                   selectedPlan === plan.id 
                    ? "bg-brand-emerald text-white border-brand-emerald shadow-2xl shadow-emerald-900/20" 
                    : "bg-white text-slate-900 border-white shadow-xl shadow-slate-200/50"
                }`}
              >
                 {plan.recommended && (
                    <div className="absolute top-8 right-10">
                       <Crown className={`w-8 h-8 ${selectedPlan === plan.id ? "text-brand-gold" : "text-slate-200"}`} />
                    </div>
                 )}
                 
                 <div className="space-y-8">
                    <div className="space-y-1">
                       <p className={`text-[10px] font-bold uppercase tracking-widest ${selectedPlan === plan.id ? "text-brand-gold" : "text-slate-400"}`}>
                          {plan.name}
                       </p>
                       <p className="text-4xl font-bold tracking-tight">
                          ₹{plan.price}<span className={`text-lg font-medium ${selectedPlan === plan.id ? "text-white/40" : "text-slate-300"}`}>/{plan.period}</span>
                       </p>
                    </div>

                    <ul className="space-y-4">
                       {plan.features.map(f => (
                          <li key={f} className="flex items-center gap-4">
                             <div className={`w-1.5 h-1.5 rounded-full ${selectedPlan === plan.id ? "bg-brand-gold shadow-[0_0_10px_#b45309]" : "bg-slate-200"}`} />
                             <span className={`text-base font-bold tracking-tight ${selectedPlan === plan.id ? "text-white/80" : "text-slate-500"}`}>{f}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
              </motion.div>
           ))}
        </div>

        {/* Floating Checkout Button */}
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-8 z-50">
           <Button 
             onClick={handleSubscribe}
             disabled={isProcessing}
             className="w-full h-20 rounded-2xl bg-brand-emerald hover:bg-emerald-900 text-white font-bold text-xl shadow-2xl shadow-emerald-900/20 transition-all active:scale-95"
           >
              {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : "Subscribe Now"}
           </Button>
        </div>

        <div className="pt-12 text-center space-y-6">
           <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="w-4 h-4 text-brand-emerald" />
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Secure 256-Bit Encrypted Payments</p>
           </div>
           <p className="text-[10px] font-medium text-slate-400 max-w-xs mx-auto leading-relaxed">
              Payments are processed securely. You can manage your subscription at any time.
           </p>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
