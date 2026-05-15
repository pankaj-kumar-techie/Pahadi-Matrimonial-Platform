"use client";

import { useState } from "react";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { Heart, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const MOCK_INTERESTS = [
  { id: "1", name: "Ananya Sharma", age: 24, status: "RECEIVED", type: "PREMIUM" },
  { id: "2", name: "Rohan Thakur", age: 27, status: "SENT", type: "FREE" },
];

export default function InterestsPage() {
  const [activeTab, setActiveTab] = useState<"RECEIVED" | "SENT">("RECEIVED");

  return (
    <main className="min-h-screen bg-brand-sand pb-48 pt-12">
      <div className="max-w-[480px] mx-auto px-8 space-y-12">
        <header className="space-y-2">
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Likes</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connection Requests</p>
        </header>

        {/* Tab Switcher */}
        <div className="flex gap-8 border-b border-white/50">
           {(["RECEIVED", "SENT"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${
                   activeTab === tab ? "border-brand-emerald text-brand-emerald" : "border-transparent text-slate-300"
                }`}
              >
                {tab === "RECEIVED" ? "Received" : "Sent"}
              </button>
           ))}
        </div>

        {/* Interests Grid */}
        <div className="grid grid-cols-1 gap-6">
           {MOCK_INTERESTS.filter(i => i.status === activeTab).map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] p-8 border border-white shadow-xl shadow-slate-200/50 relative overflow-hidden group"
              >
                 <div className="flex items-center justify-between">
                    <div className="space-y-1">
                       <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{item.name}, {item.age}</h3>
                          {item.type === "PREMIUM" && <ShieldCheck className="w-4 h-4 text-brand-emerald" />}
                       </div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Matched Profile</p>
                    </div>
                    {activeTab === "RECEIVED" ? (
                       <Button className="w-12 h-12 rounded-2xl bg-brand-emerald hover:bg-emerald-900 text-white shadow-lg p-0">
                          <MessageCircle className="w-5 h-5" />
                       </Button>
                    ) : (
                       <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                          <Heart className="w-5 h-5 text-slate-200 fill-slate-200" />
                       </div>
                    )}
                 </div>
              </motion.div>
           ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
