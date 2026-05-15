"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, ChevronLeft, User, MapPin, Users, Heart, 
  ShieldCheck, Upload, Loader2, CheckCircle2, Home, Lock
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { HIMACHAL_DISTRICTS, COMMUNITIES } from "@/lib/constants";
import { toast } from "sonner";

/* ─── Schema ─── */
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.enum(["Male", "Female"]),
  dobDay: z.string().min(1),
  dobMonth: z.string().min(1),
  dobYear: z.string().min(1),
  district: z.string().min(1, "Select a district"),
  tehsil: z.string().min(1, "Select a tehsil"),
  village: z.string().min(2, "Enter village name"),
  panchayat: z.string().min(2, "Enter panchayat name"),
  community: z.string().min(1, "Select a community"),
  gotra: z.string().min(2, "Enter gotra"),
  kuldevi: z.string().min(2, "Enter kuldevi name"),
  partnerGender: z.enum(["Male", "Female", "Any"]),
  districtPreference: z.array(z.string()).min(1, "Select at least one district"),
  aadhaarNumber: z.string().length(12, "Must be 12 digits"),
  selfieUploaded: z.boolean().refine(v => v === true, "Required"),
});

type FormData = z.infer<typeof schema>;

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const YEARS = Array.from({ length: 60 }, (_, i) => String(2007 - i));

const STEPS = [
  { id: 1, title: "Identity",  icon: User },
  { id: 2, title: "Roots",     icon: Home },
  { id: 3, title: "Heritage",  icon: Users },
  { id: 4, title: "Seeking",   icon: Heart },
  { id: 5, title: "Verify",    icon: ShieldCheck },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {children}
    </Label>
  );
}

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement> & { [k: string]: any }) {
  return (
    <Input
      {...props}
      className="h-16 rounded-2xl bg-slate-50 border-none px-6 focus:ring-2 focus:ring-brand-emerald/10 shadow-inner text-base font-medium"
    />
  );
}

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      gender: "Male",
      partnerGender: "Female",
      districtPreference: [],
      selfieUploaded: false,
    },
  });

  const { register, watch, setValue, trigger, handleSubmit, getValues, formState: { errors } } = form;

  const selectedDistrict = watch("district");
  const tehsils = useMemo(() => {
    return HIMACHAL_DISTRICTS.find(d => d.name === selectedDistrict)?.tehsils ?? [];
  }, [selectedDistrict]);

  const advance = async () => {
    const fields: Record<number, (keyof FormData)[]> = {
      1: ["name","gender","dobDay","dobMonth","dobYear"],
      2: ["district","tehsil","village","panchayat"],
      3: ["community","gotra","kuldevi"],
      4: ["partnerGender","districtPreference"],
    };
    const ok = await trigger(fields[step] as any);
    if (ok) setStep(s => s + 1);
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    toast.success("Profile submitted for verification.");
    setStep(6);
  };

  const Toggle = ({ options, field }: { options: string[]; field: keyof FormData }) => (
    <div className="flex gap-3">
      {options.map(opt => (
        <button
          key={opt} type="button"
          onClick={() => setValue(field, opt as any)}
          className={`flex-1 h-16 rounded-2xl font-bold text-sm transition-all border-2 ${
            watch(field) === opt
              ? "bg-brand-emerald text-white border-brand-emerald shadow-lg shadow-emerald-900/15"
              : "bg-slate-50 text-slate-400 border-transparent shadow-inner"
          }`}
        >{opt}</button>
      ))}
    </div>
  );

  const DropChips = ({ field }: { field: "districtPreference" }) => {
    const current = watch(field) as string[];
    return (
      <div className="flex flex-wrap gap-2">
        {HIMACHAL_DISTRICTS.map(d => {
          const active = current.includes(d.name);
          return (
            <button
              key={d.name} type="button"
              onClick={() => setValue(field, active ? current.filter(x => x !== d.name) : [...current, d.name])}
              className={`px-4 h-10 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                active ? "bg-brand-emerald text-white shadow-md" : "bg-slate-50 text-slate-400"
              }`}
            >{d.name}</button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-sand flex flex-col items-center pt-8 pb-32 px-5 overflow-x-hidden">
      {/* Progress header */}
      <div className="w-full max-w-lg mb-8 space-y-5">
        <div className="flex items-center justify-between px-1">
          {STEPS.map(s => (
            <div key={s.id} className="flex flex-col items-center gap-1.5">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all border-2 ${
                step >= s.id
                  ? "bg-brand-emerald border-brand-emerald text-white shadow-md shadow-emerald-900/20"
                  : "bg-white border-slate-100 text-slate-300"
              }`}>
                {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${
                step === s.id ? "text-brand-emerald" : "text-slate-300"
              }`}>{s.title}</span>
            </div>
          ))}
        </div>
        <Progress value={(step / 5) * 100} className="h-1 bg-slate-100" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-lg"
        >
          {/* ── STEP 1: Identity ── */}
          {step === 1 && (
            <div className="bg-white rounded-[40px] p-8 sm:p-10 shadow-2xl shadow-slate-200/50 space-y-7 border border-white">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Identity</h2>
                <p className="text-slate-400 font-medium text-sm mt-1">Your personal details.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <FieldLabel>Full Name</FieldLabel>
                  <StyledInput {...register("name")} placeholder="Enter full name" />
                  {errors.name && <p className="text-xs text-rose-500 font-bold px-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <FieldLabel>I am a</FieldLabel>
                  <Toggle options={["Male","Female"]} field="gender" />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Date of Birth</FieldLabel>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { field: "dobDay",   items: DAYS,   ph: "DD"    },
                      { field: "dobMonth", items: MONTHS, ph: "Month" },
                      { field: "dobYear",  items: YEARS,  ph: "Year"  },
                    ].map(({ field, items, ph }) => (
                      <Select key={field} onValueChange={v => setValue(field as any, v)}>
                        <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-4 shadow-inner text-sm font-medium">
                          <SelectValue placeholder={ph} />
                        </SelectTrigger>
                        <SelectContent position="popper" sideOffset={6} className="max-h-64">
                          {items.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Roots ── */}
          {step === 2 && (
            <div className="bg-white rounded-[40px] p-8 sm:p-10 shadow-2xl shadow-slate-200/50 space-y-7 border border-white">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Your Roots</h2>
                <p className="text-slate-400 font-medium text-sm mt-1">Where your family belongs.</p>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <FieldLabel>District</FieldLabel>
                    <Select onValueChange={v => { setValue("district", v); setValue("tehsil", ""); }}>
                      <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-4 shadow-inner text-sm font-medium">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={6} className="max-h-64">
                        {HIMACHAL_DISTRICTS.map(d => <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.district && <p className="text-[10px] text-rose-500 font-bold px-1">{errors.district.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Tehsil</FieldLabel>
                    <Select disabled={!selectedDistrict} onValueChange={v => setValue("tehsil", v)}>
                      <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-4 shadow-inner text-sm font-medium">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={6} className="max-h-64">
                        {tehsils.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <FieldLabel>Panchayat</FieldLabel>
                  <StyledInput {...register("panchayat")} placeholder="Enter panchayat name" />
                  {errors.panchayat && <p className="text-xs text-rose-500 font-bold px-1">{errors.panchayat.message}</p>}
                </div>
                <div className="space-y-2">
                  <FieldLabel>Village Name</FieldLabel>
                  <StyledInput {...register("village")} placeholder="Enter village name" />
                  {errors.village && <p className="text-xs text-rose-500 font-bold px-1">{errors.village.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: Heritage ── */}
          {step === 3 && (
            <div className="bg-white rounded-[40px] p-8 sm:p-10 shadow-2xl shadow-slate-200/50 space-y-7 border border-white">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Origin & Heritage</h2>
                <p className="text-slate-400 font-medium text-sm mt-1">Traditional family details.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <FieldLabel>Community</FieldLabel>
                  <Select onValueChange={v => setValue("community", v)}>
                    <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-6 shadow-inner text-sm font-medium">
                      <SelectValue placeholder="Select community" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={6} className="max-h-64">
                      {COMMUNITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.community && <p className="text-xs text-rose-500 font-bold px-1">{errors.community.message}</p>}
                </div>
                <div className="space-y-2">
                  <FieldLabel>Gotra (Clan)</FieldLabel>
                  <StyledInput {...register("gotra")} placeholder="e.g. Kashyap, Bhardwaj" />
                  {errors.gotra && <p className="text-xs text-rose-500 font-bold px-1">{errors.gotra.message}</p>}
                </div>
                <div className="space-y-2">
                  <FieldLabel>Kuldevi / Kuldevta (Family God)</FieldLabel>
                  <StyledInput {...register("kuldevi")} placeholder="e.g. Naina Devi, Hadimba" />
                  {errors.kuldevi && <p className="text-xs text-rose-500 font-bold px-1">{errors.kuldevi.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Seeking ── */}
          {step === 4 && (
            <div className="bg-white rounded-[40px] p-8 sm:p-10 shadow-2xl shadow-slate-200/50 space-y-7 border border-white">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Preferences</h2>
                <p className="text-slate-400 font-medium text-sm mt-1">Who are you looking for?</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <FieldLabel>Seeking a</FieldLabel>
                  <Toggle options={["Male","Female","Any"]} field="partnerGender" />
                </div>
                <div className="space-y-3">
                  <FieldLabel>Preferred Districts</FieldLabel>
                  <DropChips field="districtPreference" />
                  {errors.districtPreference && (
                    <p className="text-xs text-rose-500 font-bold px-1">Select at least one district.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 5: Verify ── */}
          {step === 5 && (
            <div className="bg-white rounded-[40px] p-8 sm:p-10 shadow-2xl shadow-slate-200/50 space-y-7 border border-white">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-brand-emerald/10 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-10 h-10 text-brand-emerald" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Trust Check</h2>
                <p className="text-slate-400 font-medium text-sm">Strictly for your security.</p>
              </div>
              <div className="space-y-6">
                <div
                  className={`p-12 border-4 border-dashed rounded-[36px] flex flex-col items-center gap-4 cursor-pointer transition-all ${
                    watch("selfieUploaded")
                      ? "border-brand-emerald bg-emerald-50"
                      : "border-slate-100 bg-slate-50 hover:border-brand-emerald/30"
                  }`}
                  onClick={() => setValue("selfieUploaded", true)}
                >
                  {watch("selfieUploaded")
                    ? <CheckCircle2 className="w-16 h-16 text-brand-emerald" />
                    : <Upload className="w-12 h-12 text-slate-200" />
                  }
                  <div className="text-center space-y-1">
                    <p className="font-bold text-slate-900">Live Identity Photo</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tap to upload</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <FieldLabel>Aadhaar Number (12 Digits)</FieldLabel>
                  <Input
                    {...register("aadhaarNumber")}
                    placeholder="0000 0000 0000"
                    className="h-16 text-center text-2xl tracking-[0.5em] font-bold rounded-2xl bg-slate-50 border-none shadow-inner"
                    maxLength={12}
                    inputMode="numeric"
                  />
                  {errors.aadhaarNumber && <p className="text-xs text-rose-500 font-bold text-center">{errors.aadhaarNumber.message}</p>}
                </div>
                <div className="flex items-center justify-center gap-2 bg-brand-emerald/5 p-4 rounded-2xl border border-brand-emerald/10">
                  <Lock className="w-4 h-4 text-brand-emerald" />
                  <p className="text-[10px] font-bold text-brand-emerald uppercase tracking-widest">End-to-End Encrypted</p>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 6: Done ── */}
          {step === 6 && (
            <div className="bg-white rounded-[40px] p-10 sm:p-14 shadow-2xl shadow-slate-200/50 text-center space-y-10 border border-white">
              <div className="w-24 h-24 bg-brand-emerald rounded-[32px] flex items-center justify-center mx-auto rotate-6 shadow-2xl shadow-emerald-900/20">
                <Check className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Submitted.</h2>
                <p className="text-slate-500 font-medium max-w-xs mx-auto leading-relaxed">
                  Your profile is under manual verification. You'll be notified once it's active.
                </p>
              </div>
              <Button
                className="w-full h-16 text-lg font-bold bg-brand-emerald hover:bg-emerald-900 text-white rounded-2xl shadow-xl shadow-emerald-900/20 active:scale-95 transition-all"
                onClick={() => window.location.href = "/dashboard"}
              >
                Enter Dashboard
              </Button>
            </div>
          )}

          {/* Nav Buttons */}
          {step < 6 && (
            <div className="flex gap-4 mt-6">
              {step > 1 && (
                <Button
                  variant="ghost"
                  className="h-16 w-16 shrink-0 rounded-2xl border-2 border-slate-100 text-slate-300 hover:text-brand-emerald hover:border-brand-emerald/20 transition-all"
                  onClick={() => setStep(s => s - 1)}
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
              )}
              <Button
                className="flex-1 h-16 text-lg font-bold bg-brand-emerald hover:bg-emerald-900 text-white rounded-2xl shadow-xl shadow-emerald-900/20 transition-all active:scale-95"
                onClick={step === 5 ? handleSubmit(onSubmit) : advance}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? <Loader2 className="w-6 h-6 animate-spin" />
                  : step === 5 ? "Verify & Finish" : "Continue"
                }
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Privacy footer */}
      {step < 6 && (
        <div className="mt-8 flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-brand-emerald" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Secure Pahadi Network</span>
        </div>
      )}
    </div>
  );
}
