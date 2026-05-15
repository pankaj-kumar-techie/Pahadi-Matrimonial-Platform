"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, Sparkles, ChevronRight, Users, Download, Smartphone, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show the install banner after a short delay for better UX
      setTimeout(() => setShowInstallBanner(true), 3000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setInstalled(true);
        setShowInstallBanner(false);
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <main className="min-h-screen bg-brand-sand selection:bg-brand-emerald/10">

      {/* ── Floating PWA Install Banner (Mobile) ── */}
      <AnimatePresence>
        {showInstallBanner && !installed && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="fixed bottom-6 left-4 right-4 z-[200] md:hidden"
          >
            <div className="bg-brand-emerald rounded-3xl p-6 shadow-[0_32px_64px_-16px_rgba(6,78,59,0.5)] flex items-center gap-5 border border-emerald-700/30">
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-base leading-snug">Install Pahadi App</p>
                <p className="text-white/60 text-xs font-medium mt-0.5">Fast, offline-ready & trusted</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Button
                  onClick={handleInstall}
                  className="h-10 px-5 bg-white text-brand-emerald font-bold text-sm rounded-2xl hover:bg-slate-50 active:scale-95 transition-all shadow-lg"
                >
                  Install
                </Button>
                <button
                  onClick={() => setShowInstallBanner(false)}
                  className="text-[10px] text-white/40 font-bold uppercase tracking-widest text-center"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 py-5 bg-brand-sand/85 backdrop-blur-xl border-b border-white/50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-brand-emerald rounded-2xl flex items-center justify-center rotate-3 shadow-xl shadow-emerald-900/10 shrink-0">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Pahadi</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Install button always visible in nav on mobile */}
            {deferredPrompt && !installed && (
              <Button
                onClick={handleInstall}
                variant="outline"
                className="h-10 px-4 rounded-full border-2 border-brand-emerald/20 bg-emerald-50 text-brand-emerald font-bold text-xs gap-1.5 hover:bg-emerald-100 active:scale-95 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Install App</span>
                <span className="sm:hidden">Install</span>
              </Button>
            )}
            <Link href="/login">
              <Button className="rounded-full font-bold bg-brand-emerald text-white px-5 sm:px-8 h-10 sm:h-12 text-sm hover:bg-emerald-900 transition-all active:scale-95 shadow-xl shadow-emerald-900/10">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-36 pb-16 px-5 overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center space-y-8 relative z-10">

          {/* Trust pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-white shadow-xl shadow-slate-200/50"
          >
            <ShieldCheck className="w-4 h-4 text-brand-emerald" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Himachal's Most Trusted Network</span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-slate-900 tracking-tight leading-[1.05]">
            Find your soulmate<br />
            <span className="text-brand-emerald">in Himachal Pradesh.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
            Connecting trusted families across 12 districts. Simple, secure, and rooted in our Himachali values.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-16 px-10 sm:px-14 text-lg font-bold bg-brand-emerald text-white hover:bg-emerald-900 rounded-2xl shadow-2xl shadow-emerald-900/20 transition-all active:scale-95 gap-2">
                Get Started <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            {deferredPrompt && !installed && (
              <Button
                onClick={handleInstall}
                variant="outline"
                className="w-full sm:w-auto h-16 px-10 rounded-2xl border-2 border-white bg-white text-slate-700 font-bold text-lg hover:bg-slate-50 active:scale-95 transition-all gap-2 shadow-xl shadow-slate-200/50"
              >
                <Download className="w-5 h-5 text-brand-emerald" />
                Install Free App
              </Button>
            )}
          </div>

          {/* Social proof pill */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="flex -space-x-2">
              {["A","R","S","P"].map((l, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${["bg-brand-emerald","bg-brand-gold","bg-emerald-600","bg-amber-600"][i]}`}>{l}</div>
              ))}
            </div>
            <p className="text-xs font-bold text-slate-400">
              <span className="text-slate-900">2,400+</span> verified families joined
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div className="mt-16 relative max-w-4xl mx-auto px-4">
          <div className="relative aspect-[4/3] sm:aspect-video rounded-[36px] sm:rounded-[56px] overflow-hidden shadow-2xl border-[8px] sm:border-[12px] border-white ring-1 ring-slate-100">
            <Image
              src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000&auto=format&fit=crop"
              alt="Himachal Pradesh mountains"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {/* Floating trust stats over image */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
              <div className="bg-white/15 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20">
                <p className="text-white font-bold text-lg leading-none">2,400+</p>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">Families</p>
              </div>
              <div className="bg-white/15 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20">
                <p className="text-white font-bold text-lg leading-none">12</p>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">Districts</p>
              </div>
              <div className="bg-brand-emerald/90 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
                  <p className="text-white font-bold text-lg leading-none">4.9</p>
                </div>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1">Trusted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Install CTA Section ── */}
      <section className="py-16 px-5 md:hidden">
        <div className="max-w-md mx-auto">
          <div className="bg-brand-emerald rounded-[40px] p-8 text-white space-y-6 shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
            <div className="absolute top-[-30%] right-[-15%] w-48 h-48 bg-brand-gold rounded-full blur-[80px] opacity-20" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg leading-snug">Get the App</p>
                  <p className="text-white/60 text-xs font-medium">Faster. Offline-ready. Trusted.</p>
                </div>
              </div>
              <ul className="space-y-3">
                {["Works offline on your phone","Instant match notifications","One-tap secure login"].map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-white/80 font-medium">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={handleInstall}
                className="w-full h-14 bg-white text-brand-emerald font-bold text-base rounded-2xl shadow-xl hover:bg-slate-50 active:scale-95 transition-all gap-2"
              >
                <Download className="w-4 h-4" />
                Install Free — No App Store Needed
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Trust Us ── */}
      <section className="py-24 px-5 bg-white" id="trust">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">Built on Trust.</h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">We prioritize safety and cultural integrity so every family feels at home.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "100% Vetted", desc: "Every profile is manually verified by our team.", icon: ShieldCheck, bg: "bg-emerald-50", color: "text-brand-emerald" },
              { title: "Pahadi Heritage", desc: "Exclusive focus on Himachal's communities & districts.", icon: Users, bg: "bg-amber-50", color: "text-brand-gold" },
              { title: "Smart Matching", desc: "Compatibility based on Gotra, District & family values.", icon: Sparkles, bg: "bg-sky-50", color: "text-sky-600" },
            ].map((f) => (
              <div key={f.title} className="p-10 bg-slate-50 rounded-[40px] space-y-6 hover:bg-white hover:shadow-2xl transition-all border border-slate-100/50">
                <div className={`w-14 h-14 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-brand-sand py-20 px-6 border-t border-white">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-emerald rounded-2xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Pahadi</span>
          </div>
          <div className="text-center space-y-2">
            <p className="text-slate-400 font-medium text-sm">Connecting Himachali families with dignity and trust.</p>
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">© 2026 PAHADI MATRIMONIAL SERVICES</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
