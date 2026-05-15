"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Heart, ShieldCheck, Sparkles, ChevronRight, Users, Download,
  Smartphone, Star, MapPin, Lock, UserCheck, MessageCircle, ArrowRight, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const handler = (e: any) => { 
      e.preventDefault(); 
      setDeferredPrompt(e); 
      // Show banner after 1.5s instead of 2.5s for faster feel
      setTimeout(() => setShowInstallBanner(true), 1500); 
    };
    window.addEventListener("beforeinstallprompt", handler);
    if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      setIsInstalling(true);
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setInstalled(true);
        // Trigger haptic if available
        if (typeof window !== "undefined" && (window as any).haptic) (window as any).haptic();
        setTimeout(() => {
          setShowInstallBanner(false);
          setIsInstalling(false);
        }, 1000);
      } else {
        setIsInstalling(false);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <main className="min-h-screen bg-brand-sand selection:bg-brand-emerald/10 overflow-x-hidden">

      {/* ── Bottom Install Banner (Mobile) ── */}
      <AnimatePresence>
        {showInstallBanner && !installed && (
          <motion.div
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 180 }}
            className="fixed bottom-0 left-0 right-0 z-[200] p-4 pb-6 bg-gradient-to-t from-brand-sand via-brand-sand to-transparent md:hidden"
          >
            <div onClick={handleInstall} className="bg-brand-emerald rounded-2xl p-4 shadow-[0_-8px_40px_-8px_rgba(6,78,59,0.4)] flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform">
              <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                {isInstalling ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : installed ? <UserCheck className="w-5 h-5 text-emerald-300" /> : <Download className="w-5 h-5 text-white" />}
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">
                  {isInstalling ? "Installing Pahadi..." : installed ? "App Installed!" : "Install Pahadi App"}
                </p>
                <p className="text-white/50 text-[10px]">
                  {installed ? "Open from your home screen" : "Free • No app store • Offline"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40 shrink-0" />
            </div>
            <button onClick={(e) => { e.stopPropagation(); setShowInstallBanner(false); }} className="w-full text-center mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Maybe Later</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav — Install button always visible ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-5 py-3 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Pahadi</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Install button — always visible in nav */}
            <Link href="/login">
              <Button className="rounded-full font-bold bg-white text-brand-emerald px-5 h-9 text-sm hover:bg-slate-50 active:scale-95 transition-all shadow-lg">Join</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-[100svh] flex flex-col">
        {/* BG image */}
        <div className="absolute inset-0">
          <Image src="/hero-himachal.png" alt="Himachal Pradesh mountains" fill priority className="object-cover" />
          {/* Strong gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-end pb-12 pt-24 px-6">
          <div className="max-w-xl mx-auto w-full space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 inline-flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Himachal's Trusted Network</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl font-bold text-white tracking-tight leading-[0.95]"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
            >
              Find your<br />soulmate in<br /><span className="text-emerald-300">Himachal.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="text-base text-white/80 font-medium max-w-sm leading-relaxed"
            >
              Verified families across all 12 districts. Gotra matching, cultural values, and real trust — the Pahadi way.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex flex-col sm:flex-row gap-3">
              <Link href="/login" className="block sm:inline-block">
                <Button className="w-full sm:w-auto h-14 px-10 text-base font-bold bg-white text-brand-emerald hover:bg-slate-50 rounded-2xl shadow-2xl active:scale-[0.97] transition-all gap-2">
                  Get Started Free <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button onClick={handleInstall} variant="outline" className="h-14 px-8 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur text-white font-bold text-base hover:bg-white/20 active:scale-[0.97] transition-all gap-2">
                <Download className="w-5 h-5" /> Install App
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="flex items-center gap-5 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {["bg-emerald-500", "bg-amber-500", "bg-emerald-700", "bg-amber-700"].map((bg, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full border-2 border-black/20 text-[8px] font-bold text-white flex items-center justify-center ${bg}`}>{["A", "R", "S", "P"][i]}</div>
                  ))}
                </div>
                <span className="text-xs text-white/70"><strong className="text-white">2,400+</strong> families</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs text-white/70"><strong className="text-white">4.9</strong> rating</span>
              </div>
              <div className="w-px h-4 bg-white/20 hidden sm:block" />
              <div className="items-center gap-1 hidden sm:flex">
                <MapPin className="w-3 h-3 text-emerald-300" />
                <span className="text-xs text-white/70"><strong className="text-white">12</strong> districts</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="py-16 px-5 bg-brand-sand">
        <div className="max-w-xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-bold text-brand-emerald uppercase tracking-widest">Simple Process</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">How Pahadi Works</h2>
          </div>
          <div className="space-y-4">
            {[
              { step: "01", title: "Create Profile", desc: "Sign up with your phone number. Add your district, village, gotra, and family details.", icon: UserCheck, color: "bg-emerald-50 text-brand-emerald" },
              { step: "02", title: "Get Verified", desc: "Our team manually verifies every profile with Aadhaar & selfie check for 100% trust.", icon: ShieldCheck, color: "bg-amber-50 text-brand-gold" },
              { step: "03", title: "Discover Matches", desc: "See AI-powered matches based on district, community, gotra compatibility, and values.", icon: Heart, color: "bg-rose-50 text-rose-500" },
              { step: "04", title: "Connect Securely", desc: "Send interest, chat with families, and take the conversation forward — safely.", icon: MessageCircle, color: "bg-sky-50 text-sky-600" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 p-5 bg-white rounded-[24px] border border-white shadow-lg shadow-slate-200/30">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-widest">Step {item.step}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TRUST / FEATURES ══════════════ */}
      <section className="py-16 px-5 bg-white" id="trust">
        <div className="max-w-xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Why Families Trust Us</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Built for Pahadi Families.</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "Manual Vetting", desc: "Aadhaar + selfie verified", icon: ShieldCheck, color: "text-brand-emerald bg-emerald-50" },
              { title: "12 Districts", desc: "All HP districts covered", icon: MapPin, color: "text-brand-gold bg-amber-50" },
              { title: "Gotra Matching", desc: "Heritage-aware compatibility", icon: Users, color: "text-violet-600 bg-violet-50" },
              { title: "Privacy First", desc: "End-to-end encryption", icon: Lock, color: "text-sky-600 bg-sky-50" },
              { title: "Smart AI", desc: "Value-based matching", icon: Sparkles, color: "text-rose-500 bg-rose-50" },
              { title: "Family Connect", desc: "Chat with full families", icon: MessageCircle, color: "text-emerald-600 bg-emerald-50" },
            ].map((f) => (
              <div key={f.title} className="p-5 bg-slate-50 rounded-[20px] border border-slate-100/50 space-y-3 hover:bg-white hover:shadow-lg transition-all">
                <div className={`w-10 h-10 ${f.color} rounded-xl flex items-center justify-center`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ DISTRICTS COVERAGE ══════════════ */}
      <section className="py-16 px-5 bg-brand-sand">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-bold text-brand-emerald uppercase tracking-widest">Complete Coverage</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">All 12 Districts of Himachal.</h2>
            <p className="text-sm text-slate-400 font-medium">From Kangra to Kinnaur — every tehsil, every village.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul-Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"].map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-2.5 bg-white rounded-2xl border border-white shadow-md flex items-center gap-2"
              >
                <MapPin className="w-3 h-3 text-brand-emerald" />
                <span className="text-xs font-bold text-slate-700">{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Success Stories</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Families That Found Each Other.</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: "Ananya & Rohan", district: "Kangra → Shimla", quote: "We found each other through Pahadi in just 3 weeks. The gotra matching and village-level detail made our families trust the platform instantly.", rating: 5 },
              { name: "Priya & Vikram", district: "Mandi → Kullu", quote: "As a Pahadi family, we needed a platform that understood our values. Pahadi was exactly that — verified, respectful, and culturally aware.", rating: 5 },
            ].map((t) => (
              <div key={t.name} className="p-6 bg-slate-50 rounded-[24px] border border-slate-100/50 space-y-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t.district}
                    </p>
                  </div>
                  <div className="bg-brand-emerald/10 px-3 py-1 rounded-full">
                    <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-widest">Verified Match</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ INSTALL CTA ══════════════ */}
      <section className="py-16 px-5 bg-brand-sand">
        <div className="max-w-xl mx-auto">
          <div onClick={handleInstall} className="bg-brand-emerald rounded-[32px] p-8 text-white space-y-6 cursor-pointer active:scale-[0.98] transition-transform relative overflow-hidden shadow-2xl shadow-emerald-900/20">
            <div className="absolute top-[-30%] right-[-15%] w-48 h-48 bg-brand-gold rounded-full blur-[80px] opacity-15" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center"><Smartphone className="w-7 h-7 text-white" /></div>
                <div>
                  <p className="font-bold text-xl leading-tight">Get the Pahadi App</p>
                  <p className="text-white/60 text-sm font-medium mt-0.5">Installs directly — no app store needed</p>
                </div>
              </div>
              <div className="flex gap-6">
                {[
                  { icon: ShieldCheck, text: "Offline Access" },
                  { icon: Sparkles, text: "Instant Alerts" },
                  { icon: Heart, text: "Quick Login" },
                ].map(f => (
                  <div key={f.text} className="flex items-center gap-1.5">
                    <f.icon className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">{f.text}</span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={handleInstall}
                className="w-full h-14 bg-white text-brand-emerald font-bold text-base rounded-2xl shadow-xl hover:bg-slate-50 active:scale-95 transition-all gap-2"
                disabled={isInstalling || installed}
              >
                {isInstalling ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : installed ? (
                  <UserCheck className="w-5 h-5" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {isInstalling ? "Installing..." : installed ? "Installed! ✅" : "Install Free — One Tap"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="py-20 px-5 bg-white text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 bg-brand-emerald rounded-2xl flex items-center justify-center mx-auto rotate-3 shadow-xl shadow-emerald-900/10">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Ready to Find Your Match?</h2>
          <p className="text-sm text-slate-400 font-medium max-w-xs mx-auto">Join 2,400+ verified Himachali families. Free to start, trusted by default.</p>
          <Link href="/login" className="block">
            <Button className="w-full h-14 text-base font-bold bg-brand-emerald text-white hover:bg-emerald-900 rounded-2xl shadow-2xl shadow-emerald-900/20 active:scale-[0.97] transition-all gap-2">
              Create Your Profile <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="bg-brand-sand py-12 px-5 border-t border-white">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-emerald rounded-xl flex items-center justify-center"><Heart className="w-4 h-4 text-white fill-white" /></div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Pahadi</span>
          </div>
          <p className="text-xs text-slate-400 font-medium text-center">Connecting Himachali families with dignity and trust.</p>
          <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">© 2026 PAHADI MATRIMONIAL SERVICES</p>
        </div>
      </footer>
    </main>
  );
}
