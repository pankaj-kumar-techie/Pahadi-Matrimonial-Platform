"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Send, Sparkles, PhoneCall, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { use } from "react";

export default function ChatRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I really liked your profile.", sender: "them", time: "10:00 AM" },
    { id: 2, text: "Thanks! I liked yours too. Are you originally from Kangra?", sender: "me", time: "10:02 AM" },
    { id: 3, text: "Yes, born and raised there. Now working in Shimla.", sender: "them", time: "10:05 AM" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isKundliMatching, setIsKundliMatching] = useState(false);
  const [kundliResult, setKundliResult] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { id: Date.now(), text: inputValue, sender: "me", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInputValue("");
  };

  const runKundliMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsKundliMatching(true);
    // Simulate Vedika API
    await new Promise(resolve => setTimeout(resolve, 3000));
    const score = Math.floor(Math.random() * (36 - 18 + 1)) + 18;
    setKundliResult({
      score,
      verdict: score >= 28 ? "Excellent Match" : score >= 21 ? "Good Match" : "Moderate Match",
      message: score >= 28 ? "Highly recommended for marriage." : "Compatible with minor adjustments.",
    });
    setIsKundliMatching(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/chat">
            <ChevronLeft className="w-6 h-6 text-slate-900" />
          </Link>
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-slate-100">
              <AvatarFallback className="bg-sky-100 text-sky-600 font-bold">A</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-slate-900 leading-none">Ananya Sharma</h2>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-sky-50 text-sky-600">
                <Sparkles className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[32px] sm:max-w-md border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-sky-500" /> 36 Guna Milan
                </DialogTitle>
                <DialogDescription className="font-medium text-slate-500">
                  Enter birth details for both partners to calculate compatibility.
                </DialogDescription>
              </DialogHeader>
              
              {!kundliResult ? (
                <form onSubmit={runKundliMatch} className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Date of Birth</Label>
                        <Input type="date" className="rounded-xl h-12" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Time of Birth</Label>
                        <Input type="time" className="rounded-xl h-12" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Place of Birth</Label>
                      <Input placeholder="City, State" className="rounded-xl h-12" required />
                    </div>
                  </div>
                  <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-black font-bold text-lg shadow-xl" disabled={isKundliMatching}>
                    {isKundliMatching ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Calculating...
                      </>
                    ) : "Calculate Guna Milan"}
                  </Button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-6">
                   <div className="relative inline-block">
                      <div className="w-32 h-32 rounded-full border-[8px] border-sky-100 flex items-center justify-center">
                        <span className="text-4xl font-black text-sky-600">{kundliResult.score}</span>
                        <span className="text-sm font-bold text-sky-400 absolute bottom-6">/36</span>
                      </div>
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-2xl font-black text-slate-900">{kundliResult.verdict}</h3>
                      <p className="text-slate-500 font-medium px-8">{kundliResult.message}</p>
                   </div>
                   <Button variant="outline" className="rounded-xl h-12" onClick={() => setKundliResult(null)}>Recalculate</Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Info className="w-5 h-5 text-slate-400" />
          </Button>
        </div>
      </header>

      {/* Messages Feed */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
      >
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
           <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Mutual Interest Match</p>
           <p className="text-xs text-slate-400 font-medium max-w-[200px]">
             You both swiped interested. Chat is now enabled.
           </p>
        </div>

        {messages.map((m) => (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            key={m.id} 
            className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] px-5 py-3 rounded-[24px] shadow-sm ${
              m.sender === "me" 
                ? "bg-slate-900 text-white rounded-tr-none" 
                : "bg-white text-slate-900 border border-slate-100 rounded-tl-none"
            }`}>
              <p className="text-sm font-medium leading-relaxed">{m.text}</p>
              <span className={`text-[9px] font-bold block mt-1 opacity-50 ${m.sender === "me" ? "text-right" : "text-left"}`}>
                {m.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <footer className="bg-white p-4 pb-10 border-t border-slate-100">
        <div className="max-w-md mx-auto flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-slate-50">
            <PhoneCall className="w-5 h-5 text-slate-400" />
          </Button>
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="w-full h-12 bg-slate-50 border-none rounded-2xl px-6 text-sm font-medium focus:ring-2 focus:ring-sky-500 transition-all pr-12"
            />
            <Button 
              size="icon" 
              className="absolute right-1 top-1 h-10 w-10 rounded-xl bg-slate-900 hover:bg-black transition-all"
              onClick={handleSend}
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Loader2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
