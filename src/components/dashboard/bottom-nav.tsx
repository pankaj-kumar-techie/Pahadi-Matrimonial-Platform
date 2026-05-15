"use client";

import Link from "use-navigation"; // Fix: This should be next/link
import { usePathname } from "next/navigation";
import { Heart, MessageCircle, User, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import LinkNext from "next/link";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Sparkles, label: "FEED", href: "/dashboard" },
    { icon: Search, label: "SEARCH", href: "/dashboard/search" },
    { icon: Heart, label: "LIKES", href: "/dashboard/interests" },
    { icon: MessageCircle, label: "CHAT", href: "/dashboard/chat" },
    { icon: User, label: "ME", href: "/dashboard/profile" },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[400px] px-8">
      <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-2 shadow-[0_40px_100px_-20px_rgba(6,78,59,0.15)] border border-white ring-1 ring-slate-100">
        <nav className="flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <LinkNext key={item.href} href={item.href} className="relative group">
                <div className={`p-4 rounded-2xl transition-all duration-300 flex flex-col items-center gap-1 ${
                  isActive ? "text-brand-emerald" : "text-slate-300 hover:text-slate-500"
                }`}>
                  <Icon className={`w-6 h-6 ${isActive ? "fill-brand-emerald/10" : ""}`} />
                  <span className={`text-[8px] font-bold tracking-widest ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    {item.label}
                  </span>
                </div>
                {isActive && (
                   <motion.div 
                     layoutId="navDot"
                     className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-emerald rounded-full"
                   />
                )}
              </LinkNext>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
