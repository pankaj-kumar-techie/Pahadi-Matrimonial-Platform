"use client";

import { useState } from "react";
import { BottomNav } from "@/components/dashboard/bottom-nav";
import { Search as SearchIcon, SlidersHorizontal, MapPin, Users, Heart, Home, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { HIMACHAL_DISTRICTS, COMMUNITIES } from "@/lib/constants";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");

  return (
    <main className="min-h-screen bg-brand-sand pb-48 pt-12">
      <div className="max-w-[480px] mx-auto px-8 space-y-12">
        <header className="space-y-2">
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Search</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Find your life partner</p>
        </header>

        <div className="space-y-8">
          {/* Quick Search */}
          <div className="relative">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <Input 
              placeholder="Search by name, village or gotra" 
              className="h-16 pl-16 rounded-2xl bg-white border-none shadow-xl shadow-slate-200/50"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Advanced Filters */}
          <div className="bg-white rounded-[32px] p-8 border border-white shadow-xl shadow-slate-200/50 space-y-8">
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-brand-emerald">
                  <MapPin className="w-4 h-4" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Districts</p>
               </div>
               <div className="flex flex-wrap gap-2">
                  {HIMACHAL_DISTRICTS.map(d => (
                     <button
                        key={d.name}
                        onClick={() => {
                           if (selectedDistricts.includes(d.name)) {
                              setSelectedDistricts(selectedDistricts.filter(s => s !== d.name));
                           } else {
                              setSelectedDistricts([...selectedDistricts, d.name]);
                           }
                        }}
                        className={`px-4 h-10 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all border ${
                           selectedDistricts.includes(d.name) ? "bg-brand-emerald text-white border-brand-emerald shadow-lg" : "bg-slate-50 text-slate-400 border-transparent"
                        }`}
                     >
                        {d.name}
                     </button>
                  ))}
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-2 text-brand-gold">
                  <Users className="w-4 h-4" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Community</p>
               </div>
               <Select onValueChange={setSelectedCommunity}>
                  <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-6 shadow-inner">
                    <SelectValue placeholder="All Communities" />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={8}>
                    {COMMUNITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
               </Select>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-2 text-slate-400">
                  <Home className="w-4 h-4" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Village/Village Group</p>
               </div>
               <Input placeholder="Enter Village Name" className="h-14 rounded-2xl bg-slate-50 border-none px-6" />
            </div>
          </div>

          <Button className="w-full h-16 rounded-2xl bg-brand-emerald text-white font-bold text-lg shadow-xl shadow-emerald-900/20 active:scale-95 transition-all">
             Search Profiles
          </Button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
