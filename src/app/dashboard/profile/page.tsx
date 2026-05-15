"use client";

import { useState } from "react";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  ShieldCheck, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Crown,
  CheckCircle2,
  Lock
} from "lucide-react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

export default function ProfilePage() {
  const [isPremium, setIsPremium] = useState(true);

  return (
    <main className="min-h-screen bg-brand-sand pb-48 pt-12">
      <div className="max-w-[480px] mx-auto px-8 space-y-12">
        <header className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Profile</h1>
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl bg-white shadow-sm">
            <Settings className="w-5 h-5 text-slate-400" />
          </Button>
        </header>

        {/* Nurturing Profile Card */}
        <div className="bg-white rounded-[40px] p-10 text-slate-900 relative overflow-hidden shadow-2xl shadow-slate-200/50 border border-white">
           <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-brand-emerald rounded-full blur-[100px] opacity-5" />
           <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <div className="relative">
                 <div className="w-28 h-28 bg-brand-emerald rounded-[32px] flex items-center justify-center rotate-3 shadow-xl shadow-emerald-900/20">
                    <span className="text-white font-bold text-3xl -rotate-3">PK</span>
                 </div>
                 <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-gold rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
                    <ShieldCheck className="w-5 h-5 text-white" />
                 </div>
              </div>
              <div className="space-y-1">
                 <h2 className="text-3xl font-bold tracking-tight">Pankaj Kumar</h2>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Account • Kangra</p>
              </div>
              {isPremium && (
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 rounded-full border border-brand-gold/20">
                    <Crown className="w-4 h-4 text-brand-gold" />
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Legacy Member</span>
                 </div>
              )}
           </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-4">
          <Link href="/dashboard/profile/subscription">
            <div className="flex items-center justify-between p-6 bg-white rounded-[28px] border border-white shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-brand-emerald/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
                  <CreditCard className="w-5 h-5 text-brand-emerald" />
                </div>
                <div className="space-y-0.5">
                   <p className="text-lg font-bold text-slate-900">Subscription</p>
                   <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Manage Membership</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-200" />
            </div>
          </Link>

          {[
            { name: "Trust & Safety", icon: ShieldCheck, sub: "Verify Identity" },
            { name: "Help & Support", icon: HelpCircle, sub: "Direct Assistance" },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between p-6 bg-white rounded-[28px] border border-white shadow-sm hover:shadow-xl transition-all group cursor-pointer">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
                  <item.icon className="w-5 h-5 text-slate-400" />
                </div>
                <div className="space-y-0.5">
                   <p className="text-lg font-bold text-slate-900">{item.name}</p>
                   <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{item.sub}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-200" />
            </div>
          ))}
          
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-4 p-6 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-rose-500 transition-all justify-center"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out from Network</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
