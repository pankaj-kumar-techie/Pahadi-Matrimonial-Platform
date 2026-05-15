"use client";

import { useState, useEffect } from "react";
import { MatchCard } from "@/components/dashboard/match-card";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { toast } from "sonner";
import { Loader2, Sparkles, Crown, ArrowRight, TrendingUp, Heart, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MOCK_MATCHES = [
  {
    id: "1",
    name: "Ananya Sharma",
    gender: "Female",
    age: 24,
    district: "Kangra",
    community: "Brahmin",
    compatibilityScore: 92,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Rohan Thakur",
    gender: "Male",
    age: 27,
    district: "Shimla",
    community: "Rajput",
    compatibilityScore: 85,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop",
  }
];

export default function DashboardPage() {
  const [matches, setMatches] = useState(MOCK_MATCHES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleInterest = (id: string) => {
    toast.success("Interest sent to family.");
    setMatches(matches.filter(m => m.id !== id));
  };

  return (
    <main className="min-h-screen bg-brand-sand pb-40">
      {/* Sticky Premium Header */}
      <header className="sticky top-0 z-40 bg-brand-sand/80 backdrop-blur-xl px-8 py-8 border-b border-white/50">
        <div className="max-w-[480px] mx-auto flex items-center justify-between">
          <div className="space-y-1">
             <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Today</h1>
                <Sparkles className="w-5 h-5 text-brand-gold animate-pulse" />
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
             </p>
          </div>
          <Link href="/dashboard/profile">
            <div className="w-14 h-14 bg-brand-emerald rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/10 active:scale-95 transition-all">
               <span className="text-white font-bold text-lg">PK</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-[480px] mx-auto px-8 pt-10 space-y-12">
        {/* Trust Stats Blocks */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white p-6 rounded-[32px] space-y-1 border border-white shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-2 text-brand-gold">
                 <TrendingUp className="w-4 h-4" />
                 <p className="text-[10px] font-bold uppercase tracking-widest">Views</p>
              </div>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">242</p>
           </div>
           <div className="bg-white p-6 rounded-[32px] space-y-1 border border-white shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-2 text-brand-emerald">
                 <Heart className="w-4 h-4" />
                 <p className="text-[10px] font-bold uppercase tracking-widest">Interests</p>
              </div>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">18</p>
           </div>
        </div>

        {/* Trust Identity Progress */}
        <div className="bg-white p-8 rounded-[40px] border border-white shadow-xl shadow-slate-200/50 space-y-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-brand-emerald" />
                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Trust Identity Score</p>
              </div>
              <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-widest">85% Verified</span>
           </div>
           <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-brand-emerald to-emerald-400"
              />
           </div>
           <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic">
              "A fully verified profile is 4x more likely to find a perfect match."
           </p>
        </div>

        {/* Matches Feed */}
        {isLoading ? (
          <div className="h-[40vh] flex flex-col items-center justify-center gap-8">
            <div className="relative">
              <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="w-20 h-20 border-4 border-slate-100 border-t-brand-emerald rounded-full"
              />
              <ShieldCheck className="w-8 h-8 text-brand-emerald absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Finding Trusted Matches...</p>
          </div>
        ) : (
          <div className="space-y-10">
            {matches.map((user, index) => (
              <div key={user.id} className="space-y-10">
                <MatchCard 
                  user={user} 
                  onInterest={handleInterest} 
                />
                
                {/* Trust-First Conversion CTA */}
                {index === 0 && (
                   <motion.div 
                     whileHover={{ y: -5 }}
                     className="bg-brand-emerald rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20"
                   >
                     <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-brand-gold rounded-full blur-[100px] opacity-20" />
                     <div className="relative z-10 space-y-8">
                       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                          <Crown className="w-6 h-6 text-brand-gold" />
                       </div>
                       <div className="space-y-2">
                         <h3 className="text-3xl font-bold tracking-tight">Become a Legacy Member</h3>
                         <p className="text-white/60 font-medium text-sm leading-relaxed">Unlock the most trusted profiles and see who is interested in your legacy.</p>
                       </div>
                       <Button className="w-full h-16 bg-white text-brand-emerald hover:bg-slate-50 font-bold text-lg rounded-2xl shadow-xl transition-all">
                          Upgrade to Legacy
                       </Button>
                     </div>
                   </motion.div>
                )}
              </div>
            ))}
            
            <div className="text-center py-20 px-10 space-y-4">
              <div className="w-1.5 h-1.5 bg-slate-200 rounded-full mx-auto" />
              <div className="space-y-1">
                 <p className="text-xl font-bold text-slate-900">End of daily matches.</p>
                 <p className="text-xs font-medium text-slate-400">Fresh trusted profiles arrive every morning.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
