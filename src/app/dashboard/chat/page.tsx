"use client";

import { BottomNav } from "@/components/dashboard/bottom-nav";
import { MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const MOCK_CHATS = [
  { id: "1", name: "Ananya Sharma", lastMessage: "Let's check our Guna Milan!", time: "2m ago", unread: 2 },
  { id: "2", name: "Rohan Thakur", lastMessage: "Sounds good, looking forward.", time: "1h ago", unread: 0 },
];

export default function ChatListPage() {
  return (
    <main className="min-h-screen bg-brand-sand pb-48 pt-12">
      <div className="max-w-[480px] mx-auto px-8 space-y-12">
        <header className="space-y-2">
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Messages</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trusted Family Channels</p>
        </header>

        <div className="space-y-4">
           {MOCK_CHATS.map((chat) => (
              <Link key={chat.id} href={`/dashboard/chat/${chat.id}`}>
                 <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-6 p-6 bg-white rounded-[28px] border border-white shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all"
                 >
                    <div className="relative">
                       <div className="w-16 h-16 bg-brand-emerald rounded-2xl flex items-center justify-center rotate-3">
                          <span className="text-white font-bold text-xl">{chat.name[0]}</span>
                       </div>
                       {chat.unread > 0 && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-brand-gold rounded-full border-4 border-white flex items-center justify-center">
                             <span className="text-[8px] font-bold text-white">{chat.unread}</span>
                          </div>
                       )}
                    </div>
                    <div className="flex-1 space-y-1 overflow-hidden">
                       <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-slate-900 tracking-tight truncate">{chat.name}</h3>
                          <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{chat.time}</span>
                       </div>
                       <p className="text-sm font-medium text-slate-400 truncate tracking-tight">{chat.lastMessage}</p>
                    </div>
                 </motion.div>
              </Link>
           ))}
        </div>

        {/* Feature Highlight */}
        <div className="bg-brand-emerald rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
           <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-brand-gold rounded-full blur-[60px] opacity-20" />
           <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                 <ShieldCheck className="w-6 h-6 text-brand-gold" />
                 <span className="text-[8px] font-bold uppercase tracking-widest text-brand-gold">TRUSTED FEATURE</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Verified Connections Only</h3>
              <p className="text-sm text-white/60 font-medium">Chat directly with families who have been fully vetted by our team.</p>
           </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
