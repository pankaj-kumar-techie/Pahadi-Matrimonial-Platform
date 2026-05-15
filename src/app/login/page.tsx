import LoginForm from "@/components/auth/login-form";
import { Heart, ShieldCheck, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-brand-sand flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Nature Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-emerald-50 rounded-full blur-[140px] -z-10 opacity-70" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-sand rounded-full blur-[140px] -z-10 opacity-70" />
      
      <div className="w-full max-w-md space-y-12 relative z-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="w-20 h-20 bg-brand-emerald rounded-3xl flex items-center justify-center rotate-3 shadow-2xl shadow-emerald-900/10">
             <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-none uppercase">Welcome back.</h1>
            <p className="text-lg text-slate-500 font-medium tracking-tight">Access the trusted Himachali network.</p>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="bg-white rounded-[40px] p-2 shadow-2xl shadow-emerald-900/5 border border-white">
           <LoginForm />
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col items-center gap-4">
           <div className="flex items-center gap-2 text-brand-emerald font-bold text-[10px] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> 100% Manually Vetted Profiles
           </div>
           <div className="flex items-center gap-2 text-slate-300 font-bold text-[10px] uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5" /> Secure OTP Login
           </div>
        </div>

        <footer className="text-center">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
            © 2026 Pahadi Matrimony
          </p>
        </footer>
      </div>
    </main>
  );
}
