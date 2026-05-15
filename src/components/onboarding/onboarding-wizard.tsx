"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  MapPin, 
  Users, 
  Heart, 
  ShieldCheck, 
  Upload,
  Loader2,
  CheckCircle2,
  Home,
  Sparkles,
  Search
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { HIMACHAL_DISTRICTS, COMMUNITIES } from "@/lib/constants";
import { toast } from "sonner";

const onboardingSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  gender: z.enum(["Male", "Female"]),
  dobDay: z.string().min(1),
  dobMonth: z.string().min(1),
  dobYear: z.string().min(1),
  district: z.string().min(1, "District is required"),
  tehsil: z.string().min(1, "Tehsil is required"),
  village: z.string().min(2, "Village name is required"),
  panchayat: z.string().min(2, "Panchayat name is required"),
  community: z.string().min(1, "Community is required"),
  gotra: z.string().min(2, "Gotra is required"),
  kuldevi: z.string().min(2, "Kuldevi name is required"),
  partnerGender: z.enum(["Male", "Female", "Any"]),
  ageMin: z.number().min(18).max(100),
  ageMax: z.number().min(18).max(100),
  districtPreference: z.array(z.string()).min(1, "Select at least one district"),
  kundliMandatory: z.enum(["Yes", "No", "Only Gun Milan"]),
  aadhaarNumber: z.string().length(12, "Aadhaar must be 12 digits"),
  selfieUploaded: z.boolean().refine(v => v === true, "Selfie is required"),
});

type OnboardingData = z.infer<typeof onboardingSchema>;

const DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const YEARS = Array.from({ length: 60 }, (_, i) => (2007 - i).toString());

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      gender: "Male",
      partnerGender: "Female",
      ageMin: 21,
      ageMax: 30,
      districtPreference: [],
      kundliMandatory: "Yes",
      selfieUploaded: false,
    },
  });

  const selectedDistrict = form.watch("district");
  const tehsils = useMemo(() => {
    const district = HIMACHAL_DISTRICTS.find(d => d.name === selectedDistrict);
    return district ? district.tehsils : [];
  }, [selectedDistrict]);

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["name", "gender", "dobDay", "dobMonth", "dobYear"];
    if (step === 2) fieldsToValidate = ["district", "tehsil", "village", "panchayat"];
    if (step === 3) fieldsToValidate = ["community", "gotra", "kuldevi"];
    if (step === 4) fieldsToValidate = ["partnerGender", "ageMin", "ageMax", "districtPreference", "kundliMandatory"];
    
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const onSubmit = async (data: OnboardingData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Profile submitted for verification.");
    setIsSubmitting(false);
    setStep(6);
  };

  const steps = [
    { id: 1, title: "Identity", icon: User },
    { id: 2, title: "Roots", icon: Home },
    { id: 3, title: "Origin", icon: Users },
    { id: 4, title: "Matches", icon: Heart },
    { id: 5, title: "Trust", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-brand-sand flex flex-col items-center pt-8 pb-32 px-6 overflow-x-hidden">
      <div className="w-full max-w-lg mb-10 space-y-6">
        <div className="flex items-center justify-between px-2">
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all border-2 ${
                step >= s.id ? "bg-brand-emerald border-brand-emerald text-white shadow-lg shadow-emerald-900/20" : "bg-white border-slate-100 text-slate-300"
              }`}>
                {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s.id ? "text-brand-emerald" : "text-slate-300"}`}>{s.title}</span>
            </div>
          ))}
        </div>
        <Progress value={(step / 5) * 100} className="h-1 bg-slate-100" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-lg"
        >
          {step === 1 && (
            <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 space-y-8 border border-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Identity</h2>
                <p className="text-slate-500 font-medium text-sm">Personal details for authentication.</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</Label>
                  <Input 
                    {...form.register("name")} 
                    placeholder="Enter full name" 
                    className="h-16 rounded-2xl bg-slate-50 border-none px-6 focus:ring-2 focus:ring-brand-emerald/10 shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Gender</Label>
                  <div className="flex gap-3">
                    {["Male", "Female"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => form.setValue("gender", g as any)}
                        className={`flex-1 h-16 rounded-2xl font-bold text-sm transition-all border-2 ${
                          form.watch("gender") === g 
                            ? "bg-brand-emerald text-white border-brand-emerald shadow-lg" 
                            : "bg-slate-50 text-slate-400 border-transparent shadow-inner"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date of Birth</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Select onValueChange={(v) => form.setValue("dobDay", v)}>
                      <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-4 shadow-inner">
                        <SelectValue placeholder="DD" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={8}>
                        {DAYS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={(v) => form.setValue("dobMonth", v)}>
                      <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-4 shadow-inner">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={8}>
                        {MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={(v) => form.setValue("dobYear", v)}>
                      <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-4 shadow-inner">
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={8}>
                        {YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 space-y-8 border border-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Your Roots</h2>
                <p className="text-slate-500 font-medium text-sm">Where your legacy began.</p>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">District</Label>
                    <Select onValueChange={(val) => {
                      form.setValue("district", val);
                      form.setValue("tehsil", "");
                    }}>
                      <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-4 shadow-inner">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={8}>
                        {HIMACHAL_DISTRICTS.map(d => (
                          <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tehsil</Label>
                    <Select 
                      disabled={!selectedDistrict} 
                      onValueChange={(val) => form.setValue("tehsil", val)}
                    >
                      <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-4 shadow-inner">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={8}>
                        {tehsils.map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Panchayat Name</Label>
                  <Input 
                    {...form.register("panchayat")} 
                    placeholder="Enter Panchayat" 
                    className="h-16 rounded-2xl bg-slate-50 border-none px-6 focus:ring-2 focus:ring-brand-emerald/10 shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Village Name</Label>
                  <Input 
                    {...form.register("village")} 
                    placeholder="Enter Village Name" 
                    className="h-16 rounded-2xl bg-slate-50 border-none px-6 focus:ring-2 focus:ring-brand-emerald/10 shadow-inner"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 space-y-8 border border-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Origin & Lineage</h2>
                <p className="text-slate-500 font-medium text-sm">Traditional Himachali details.</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Community</Label>
                  <Select onValueChange={(v) => form.setValue("community", v)}>
                    <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-none px-6 shadow-inner">
                      <SelectValue placeholder="Select Community" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={8}>
                      {COMMUNITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Gotra (Clan)</Label>
                  <Input 
                    {...form.register("gotra")} 
                    placeholder="e.g. Kashyap, Bhardwaj" 
                    className="h-16 rounded-2xl bg-slate-50 border-none px-6 focus:ring-2 focus:ring-brand-emerald/10 shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Family God (Kuldevi)</Label>
                  <Input 
                    {...form.register("kuldevi")} 
                    placeholder="Enter Kuldevi Name" 
                    className="h-16 rounded-2xl bg-slate-50 border-none px-6 focus:ring-2 focus:ring-brand-emerald/10 shadow-inner"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 space-y-8 border border-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Search Criteria</h2>
                <p className="text-slate-500 font-medium text-sm">Who should we find for you?</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">I am seeking a</Label>
                  <div className="flex gap-3">
                    {["Male", "Female", "Any"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => form.setValue("partnerGender", g as any)}
                        className={`flex-1 h-16 rounded-2xl font-bold text-sm transition-all border-2 ${
                          form.watch("partnerGender") === g 
                            ? "bg-brand-emerald text-white border-brand-emerald shadow-lg" 
                            : "bg-slate-50 text-slate-400 border-transparent shadow-inner"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                   <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Preferred Districts</Label>
                   <div className="flex flex-wrap gap-2">
                      {HIMACHAL_DISTRICTS.map(d => (
                         <button
                            key={d.name}
                            type="button"
                            onClick={() => {
                               const current = form.getValues("districtPreference");
                               if (current.includes(d.name)) {
                                  form.setValue("districtPreference", current.filter(s => s !== d.name));
                               } else {
                                  form.setValue("districtPreference", [...current, d.name]);
                               }
                            }}
                            className={`px-4 h-10 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all border ${
                               form.watch("districtPreference").includes(d.name) 
                                ? "bg-brand-emerald text-white border-brand-emerald shadow-md" 
                                : "bg-slate-50 text-slate-400 border-transparent shadow-inner"
                            }`}
                         >
                            {d.name}
                         </button>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 space-y-8 border border-white text-center">
              <div className="w-20 h-20 bg-brand-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                 <ShieldCheck className="w-10 h-10 text-brand-emerald" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Trust Verification</h2>
                <p className="text-slate-500 font-medium text-sm">Strictly for identity security.</p>
              </div>
              <div className="space-y-6">
                <div 
                  className={`p-12 border-4 border-dashed rounded-[40px] flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
                    form.watch("selfieUploaded") 
                      ? "border-brand-emerald bg-emerald-50" 
                      : "border-slate-100 bg-slate-50 hover:border-brand-emerald/30 shadow-inner"
                  }`} 
                  onClick={() => form.setValue("selfieUploaded", true)}
                >
                  {form.watch("selfieUploaded") ? (
                    <CheckCircle2 className="w-16 h-16 text-brand-emerald" />
                  ) : (
                    <Upload className="w-12 h-12 text-slate-200" />
                  )}
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">Upload Identity Selfie</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Required for Verification</p>
                  </div>
                </div>
                <div className="space-y-2 text-left">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Aadhaar (12 Digits)</Label>
                  <Input 
                    {...form.register("aadhaarNumber")} 
                    placeholder="0000 0000 0000" 
                    className="h-16 text-center text-2xl tracking-[0.4em] font-bold rounded-2xl bg-slate-50 border-none shadow-inner"
                    maxLength={12}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="bg-white rounded-[40px] p-12 shadow-2xl shadow-slate-200/50 text-center space-y-10 border border-white">
              <div className="w-24 h-24 bg-brand-emerald rounded-[32px] flex items-center justify-center mx-auto rotate-6 shadow-2xl shadow-emerald-900/20">
                 <Check className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight uppercase">Complete.</h2>
                <p className="text-slate-500 font-medium">
                  Your profile has been submitted for manual review. 
                  You'll be active once verified.
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

          {step < 6 && (
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button 
                  variant="ghost" 
                  className="h-16 w-16 rounded-2xl border-2 border-slate-100 text-slate-300 hover:text-brand-emerald hover:border-brand-emerald/20" 
                  onClick={prevStep}
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="w-7 h-7" />
                </Button>
              )}
              <Button 
                className="flex-1 h-16 text-lg font-bold bg-brand-emerald hover:bg-emerald-900 text-white rounded-2xl shadow-xl shadow-emerald-900/20 transition-all active:scale-95"
                onClick={step === 5 ? form.handleSubmit(onSubmit) : nextStep}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : step === 5 ? (
                  "Verify & Finish"
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
