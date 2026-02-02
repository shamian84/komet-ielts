/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, memo, useMemo } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import Clock from "lucide-react/dist/esm/icons/clock";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import PartyPopper from "lucide-react/dist/esm/icons/party-popper";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import RefreshCw from "lucide-react/dist/esm/icons/refresh-cw";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const Background = memo(() => (
  <div className="fixed inset-0 -z-10 bg-[#02040a] overflow-hidden transform-gpu pointer-events-none">
    <m.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/20 blur-[120px] rounded-full will-change-transform"
    />
    <div
      className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
      }}
    />
  </div>
));
Background.displayName = "Background";

export default function BookConsultationPage() {
  const [isBooked, setIsBooked] = useState(false);
  const [isTidlyOpen, setIsTidlyOpen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "IELTS Academic Prep",
  });

  const TIDLY_URL = "https://tidycal.com/shamialam4823/book-consultation"; //your link

  const bookingUrl = useMemo(() => {
    return `${TIDLY_URL}?email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.name)}`;
  }, [isTidlyOpen]);

  const checkLimit = (email) => {
    const today = new Date().toDateString();
    const lastBooking = localStorage.getItem(`booking_${email}`);
    return lastBooking === today;
  };

  const handleBookingStart = (e) => {
    e.preventDefault();
    toast.dismiss();

    if (checkLimit(formData.email)) {
      toast.error("Limit Reached: Only 1 session per day allowed.", {
        icon: "🚫",
        style: { background: "#1e293b", color: "#fff", borderRadius: "12px" },
      });
      return;
    }
    setIframeLoading(true);
    setIsTidlyOpen(true);
  };

  const handleManualConfirm = () => {
    localStorage.setItem(
      `booking_${formData.email}`,
      new Date().toDateString(),
    );
    setIsBooked(true);
    setIsTidlyOpen(false);

    setFormData({
      name: "",
      email: "",
      service: "IELTS Academic Prep",
    });

    toast.success("Session Initialized!");
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen flex flex-col bg-[#02040a] text-slate-200 selection:bg-blue-500/30">
        <Navbar />
        <Background />
        <Toaster
          position="top-right"
          containerStyle={{ top: 100, right: 20 }}
        />

        {/* TIDLY MODAL OVERLAY */}
        <AnimatePresence>
          {isTidlyOpen && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-10 bg-[#02040a]/90 backdrop-blur-md"
            >
              <m.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="relative w-full max-w-4xl h-[90vh] sm:h-[80vh] bg-white rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl flex flex-col"
              >
                <button
                  onClick={() => setIsTidlyOpen(false)}
                  className="absolute top-4 right-4 z-[110] bg-slate-900/10 hover:bg-slate-900/20 p-2 rounded-full transition-colors text-slate-800 cursor-pointer"
                >
                  <ArrowLeft size={20} className="rotate-90" />
                </button>

                <div className="grow relative">
                  {iframeLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10">
                      <RefreshCw
                        className="animate-spin text-blue-600 mb-2"
                        size={32}
                      />
                      <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                        Loading Schedule...
                      </p>
                    </div>
                  )}
                  <iframe
                    src={bookingUrl}
                    className="w-full h-full border-none"
                    onLoad={() => setIframeLoading(false)}
                    title="Book Session"
                    loading="lazy"
                  />
                </div>

                <div className="p-4 bg-slate-900 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <p className="text-[10px] text-slate-400 font-medium text-center sm:text-left">
                    Done booking? Click confirm to continue.
                  </p>
                  <button
                    onClick={handleManualConfirm}
                    className="w-full sm:w-auto bg-blue-600 px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all active:scale-95 cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

        <main className="grow flex items-center justify-center pt-28 pb-16 px-4 md:px-8">
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 rounded-4xl sm:rounded-[2.5rem] border border-white/10 bg-[#050811]/60 backdrop-blur-3xl shadow-2xl overflow-hidden"
          >
            {/* LEFT: BRANDING PANEL */}
            <div className="lg:col-span-5 p-8 sm:p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-white/5 relative bg-gradient-to-br from-blue-600/[0.03] to-transparent">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 md:mb-10">
                <Sparkles size={12} className="fill-current" /> Admissions 2026
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-8 uppercase">
                Crack <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                  The Code.
                </span>
              </h1>

              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between p-5 sm:p-6 rounded-3xl bg-white/3 border border-white/5 group hover:border-blue-500/30 transition-all">
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                    Global Success
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 uppercase italic">
                    99%
                  </span>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative flex flex-col gap-4 bg-white/3 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-400/90">
                      Live Slots Available
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-white tracking-tighter">
                        2,482<span className="text-blue-500">+</span>
                      </p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                        Successful Admissions
                      </p>
                    </div>
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((bar) => (
                        <m.div
                          key={bar}
                          animate={{ height: [10, 20, 15, 25][bar - 1] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: bar * 0.1,
                          }}
                          className="w-1 bg-blue-500/40 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: INTERACTIVE FORM */}
            <div className="lg:col-span-7 p-8 sm:p-10 md:p-20 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isBooked ? (
                  <m.form
                    key="consult-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleBookingStart}
                    className="space-y-6 sm:space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                          Full Name
                        </label>
                        <input
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full bg-white/4 border border-white/10 focus:border-blue-500 rounded-2xl px-5 sm:px-6 py-4 text-white font-bold outline-none transition-all text-sm"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-white/4 border border-white/10 focus:border-blue-500 rounded-2xl px-5 sm:px-6 py-4 text-white font-bold outline-none transition-all text-sm"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                        Specialization
                      </label>
                      <div className="relative group">
                        <select
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              service: e.target.value,
                            })
                          }
                          className="w-full bg-[#080c14] border border-white/10 focus:border-blue-500 rounded-2xl px-6 py-4 text-white font-bold outline-none appearance-none cursor-pointer transition-all text-sm"
                        >
                          <option>IELTS Academic Prep</option>
                          <option>General Training</option>
                          <option>Visa & Admissions</option>
                          <option>Mock Test Booking</option>
                        </select>
                        <ChevronDown
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-white pointer-events-none"
                          size={18}
                        />
                      </div>
                    </div>

                    <m.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.3em] text-[10px] py-6 sm:py-7 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-4 cursor-pointer"
                    >
                      Initialize Session <Calendar size={18} />
                    </m.button>

                    <div className="flex items-center justify-center gap-6 sm:gap-8 pt-8 border-t border-white/5 opacity-40">
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                        <ShieldCheck size={14} className="text-emerald-500" />{" "}
                        Secure
                      </div>
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                        <Clock size={14} className="text-blue-500" /> 15 Mins
                      </div>
                    </div>
                  </m.form>
                ) : (
                  <m.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20 mx-auto mb-8 shadow-xl">
                      <PartyPopper size={44} />
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4 uppercase italic">
                      Unlocked.
                    </h2>
                    <p className="text-slate-400 font-medium mb-10 max-w-xs mx-auto text-sm">
                      Calendar link sent and session confirmed.
                    </p>
                    <button
                      onClick={() => setIsBooked(false)}
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 cursor-pointer hover:text-white transition-colors"
                    >
                      <ArrowLeft size={14} /> Back to Dashboard
                    </button>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </m.div>
        </main>
        <Footer />
      </div>
    </LazyMotion>
  );
}
