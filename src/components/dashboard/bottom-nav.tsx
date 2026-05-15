"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, MessageCircle, User, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[420px] px-6">
      <div className="bg-white/95 backdrop-blur-2xl rounded-[28px] p-2 shadow-[0_32px_80px_-16px_rgba(6,78,59,0.2)] border border-white ring-1 ring-slate-100/80">
        <nav className="flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} className="relative group flex-1">
                <div className={`py-3 rounded-2xl transition-all duration-200 flex flex-col items-center gap-1.5 ${
                  isActive ? "text-brand-emerald bg-emerald-50" : "text-slate-300 hover:text-slate-500"
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? "fill-brand-emerald/10" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`text-[8px] font-bold tracking-widest uppercase transition-all ${isActive ? "opacity-100 text-brand-emerald" : "opacity-0 group-hover:opacity-50"}`}>
                    {item.label}
                  </span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="navDot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-emerald rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
