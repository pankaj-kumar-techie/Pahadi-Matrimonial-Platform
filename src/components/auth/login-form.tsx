"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, Loader2, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStep(2);
    setIsLoading(false);
    setError("");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        phone,
        otp,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid OTP. For demo use 123456");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Connection failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative px-4 py-6">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-10"
          >
            <div className="text-center space-y-4">
               <div className="flex justify-center">
                  <div className="bg-brand-emerald/10 p-4 rounded-[24px] relative">
                     <Phone className="w-8 h-8 text-brand-emerald" />
                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold rounded-full border-2 border-white shadow-sm" />
                  </div>
               </div>
               <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Secure Access</h2>
                  <p className="text-sm text-slate-400 font-medium">Verify your phone to enter the network.</p>
               </div>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</Label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">
                    +91
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="00000 00000"
                    className="h-16 pl-16 rounded-2xl bg-slate-50 border-none text-xl font-bold tracking-widest focus:ring-2 focus:ring-brand-emerald/10 transition-all shadow-inner"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    required
                  />
                </div>
                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-rose-500 font-bold px-1">
                    {error}
                  </motion.p>
                )}
              </div>

              <Button 
                className="w-full h-16 text-lg font-bold bg-brand-emerald hover:bg-emerald-900 text-white rounded-2xl shadow-xl shadow-emerald-900/10 transition-all active:scale-95" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Continue <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Trust Footer */}
            <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-50">
               <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                  <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">End-to-End Secure</span>
               </div>
               <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                  <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">HP Vetted Only</span>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-10"
          >
            <div className="text-center space-y-4">
               <div className="flex justify-center">
                  <div className="bg-brand-emerald/10 p-4 rounded-[24px]">
                     <Lock className="w-8 h-8 text-brand-emerald" />
                  </div>
               </div>
               <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">One-Time Code</h2>
                  <p className="text-sm text-slate-400 font-medium">Sent to +91 {phone}</p>
               </div>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="0 0 0 0 0 0"
                  className="h-16 text-center text-3xl tracking-[0.4em] font-bold rounded-2xl bg-slate-50 border-none shadow-inner"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                />
                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-rose-500 font-bold px-1 text-center">
                    {error}
                  </motion.p>
                )}
              </div>

              <div className="space-y-4">
                <Button className="w-full h-16 text-lg font-bold bg-brand-emerald hover:bg-emerald-900 text-white rounded-2xl shadow-xl shadow-emerald-900/10 transition-all active:scale-95" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Verify Identity"}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-12 text-slate-400 font-bold text-xs uppercase tracking-widest"
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                >
                  Edit Number
                </Button>
              </div>
            </form>

            {/* Quick Bypass for Testing */}
            <div className="pt-4 text-center">
               <button 
                type="button" 
                onClick={() => router.push("/dashboard")}
                className="text-[9px] font-bold text-slate-300 hover:text-brand-gold uppercase tracking-[0.2em] transition-all"
               >
                 Bypass Security (Dev Mode)
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
