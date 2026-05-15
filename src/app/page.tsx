"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, Sparkles, MapPin, ChevronRight, Crown, ArrowRight, Download, Users } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setDeferredPrompt(null);
    }
  };

  return (
    <main className="min-h-screen bg-brand-sand selection:bg-brand-emerald/10">
      {/* Serene Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 py-6 bg-brand-sand/80 backdrop-blur-xl border-b border-white/50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-emerald rounded-2xl flex items-center justify-center rotate-3 shadow-xl shadow-emerald-900/10">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
             </div>
             <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Pahadi</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button className="rounded-full font-bold bg-brand-emerald text-white px-6 sm:px-10 h-12 sm:h-14 hover:bg-emerald-900 transition-all active:scale-95 shadow-xl shadow-emerald-900/10">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section: Welcoming & Trusted */}
      <section className="pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center space-y-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-white shadow-xl shadow-slate-200/50"
          >
            <ShieldCheck className="w-4 h-4 text-brand-emerald" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Himachal's Most Trusted Network</span>
          </motion.div>
          
          <h1 className="text-6xl sm:text-8xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            Find your soulmate in <br />
            <span className="text-brand-emerald">Himachal Pradesh.</span>
          </h1>
          
          <div className="max-w-2xl mx-auto space-y-10">
             <p className="text-xl sm:text-2xl text-slate-500 font-medium leading-relaxed tracking-tight">
               Connecting trusted families across 12 districts. Simple, secure, and rooted in our Himachali values.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/login" className="w-full sm:w-auto">
                   <Button className="w-full sm:w-auto h-20 px-12 sm:px-16 text-xl font-bold bg-brand-emerald text-white hover:bg-emerald-900 rounded-3xl shadow-2xl shadow-emerald-900/20 transition-all active:scale-95">
                      Get Started Today <ChevronRight className="ml-2 w-6 h-6" />
                   </Button>
                </Link>
                {deferredPrompt && (
                  <Button onClick={handleInstall} variant="outline" className="h-20 px-10 rounded-3xl border-2 border-white bg-white/50 text-slate-600 font-bold text-lg">
                    Install PWA
                  </Button>
                )}
             </div>
          </div>
        </div>

        {/* Hero Visual: Nature & Trust */}
        <div className="mt-24 relative max-w-5xl mx-auto px-4">
           <div className="relative aspect-video rounded-[48px] sm:rounded-[64px] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-slate-100">
              <Image 
                src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000&auto=format&fit=crop" 
                alt="Himachal Mountains" 
                fill 
                priority
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[40px] border border-white/20 text-center space-y-2">
                    <p className="text-4xl font-bold text-white tracking-tighter italic">Pahadi</p>
                    <p className="font-bold text-white/60 uppercase tracking-[0.4em] text-[10px]">Soulmate Discovery</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-40 px-6 bg-white" id="trust">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-slate-900 tracking-tight">Built on Trust.</h2>
              <p className="text-xl text-slate-500 font-medium max-w-xl mx-auto">We prioritize safety and cultural integrity so you can share your details without worry.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "100% Vetted",
                desc: "Every profile is manually checked by our team for authenticity.",
                icon: ShieldCheck,
                color: "bg-emerald-50 text-brand-emerald"
              },
              {
                title: "Pahadi Heritage",
                desc: "Exclusive focus on Himachal's 12 districts and communities.",
                icon: Users,
                color: "bg-orange-50 text-brand-gold"
              },
              {
                title: "Smart Matching",
                desc: "AI-powered compatibility based on values and shared history.",
                icon: Sparkles,
                color: "bg-sky-50 text-sky-600"
              }
            ].map((f) => (
              <div key={f.title} className="p-12 bg-slate-50 rounded-[48px] space-y-8 hover:bg-white hover:shadow-2xl transition-all border border-slate-100/50">
                <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center`}>
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-sand py-24 px-8 border-t border-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-brand-emerald rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
             </div>
             <span className="text-3xl font-bold tracking-tight text-slate-900">Pahadi</span>
          </div>
          <div className="text-center space-y-4">
             <p className="text-slate-400 font-medium">Connecting Himachali families with dignity and trust.</p>
             <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">© 2026 PAHADI MATRIMONIAL SERVICES</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
