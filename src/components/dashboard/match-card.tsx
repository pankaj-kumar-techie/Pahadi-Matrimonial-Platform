"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Heart, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MatchCardProps {
  user: {
    id: string;
    name: string;
    gender: string;
    age: number;
    district: string;
    community: string;
    compatibilityScore: number;
    isVerified: boolean;
    image?: string;
  };
  onInterest: (id: string) => void;
}

export function MatchCard({ user, onInterest }: MatchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-white relative group"
    >
      {/* Top Badge: Compatibility */}
      <div className="absolute top-6 left-6 z-20">
         <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-slate-100 shadow-sm">
            <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{user.compatibilityScore}% Compatibility</span>
         </div>
      </div>

      {/* Verification Badge */}
      {user.isVerified && (
        <div className="absolute top-6 right-6 z-20">
          <div className="bg-brand-emerald px-3 py-3 rounded-2xl shadow-lg border border-white/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      {/* Profile Visual Area */}
      <div className="relative h-[480px] w-full bg-slate-100 overflow-hidden">
        {user.image ? (
          <Image 
            src={user.image} 
            alt={user.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-sand">
             <Users className="w-20 h-20 text-slate-200" />
          </div>
        )}
        
        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        
        <div className="absolute bottom-8 left-8 right-8 z-20">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-4xl font-bold text-white tracking-tight leading-none">
                {user.name}, {user.age}
              </h3>
              <div className="flex items-center gap-4 text-white/70 font-bold text-[10px] uppercase tracking-widest pt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{user.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>{user.community}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="p-8 flex gap-4 bg-white relative z-20">
        <Button 
          onClick={() => onInterest(user.id)}
          className="flex-1 h-16 rounded-2xl bg-brand-emerald hover:bg-emerald-900 text-white font-bold text-lg shadow-xl shadow-emerald-900/10 transition-all active:scale-95 group"
        >
          <Heart className="w-5 h-5 mr-3 fill-white/20 group-hover:fill-white transition-all" />
          Send Interest
        </Button>
      </div>
    </motion.div>
  );
}
