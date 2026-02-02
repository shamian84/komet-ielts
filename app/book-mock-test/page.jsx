/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  Calendar,
  GraduationCap,
  MapPin,
  Clock,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: false,
});

const OFFICIAL_DATES = [
  {
    month: "January 2026",
    dates: [{ day: "31", type: "Academic", level: "High Demand" }],
  },
  {
    month: "February 2026",
    dates: [
      { day: "07", type: "Academic + GT", level: "Available" },
      { day: "14", type: "Academic", level: "Filling Fast" },
      { day: "21", type: "Academic + GT", level: "Available" },
      { day: "28", type: "Academic", level: "Available" },
    ],
  },
  {
    month: "March 2026",
    dates: [
      { day: "07", type: "Academic + GT", level: "Available" },
      { day: "14", type: "Academic", level: "Available" },
      { day: "21", type: "Academic + GT", level: "Available" },
    ],
  },
];

export default function KometTestPage() {
  const [activeTab, setActiveTab] = useState("official");
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // PASTE YOUR TIDLY LINK HERE
  const TIDLY_URL = "https://tidycal.com/shamialam4823/ielts-mock-test";

  const toggleTab = useCallback((id) => {
    setActiveTab(id);
    if (id === "mock") setIsIframeLoading(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="relative pt-24 pb-20 px-4">
        {/* Modern Background Aura */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <header className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <TrendingUp size={12} /> 2026 Academic Schedule
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Master
              </span>
              <br />
              Calendar
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-medium leading-relaxed">
              Book your official IDP IELTS dates or schedule a practice mock
              test with our expert examiners in Raipur.
            </p>
          </header>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-10">
            <nav className="bg-slate-900/90 backdrop-blur-2xl p-1.5 rounded-2xl flex gap-1 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {[
                { id: "official", label: "Official Dates", icon: Calendar },
                { id: "mock", label: "Mock Test Booking", icon: GraduationCap },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => toggleTab(tab.id)}
                  className={`px-8 py-3.5 rounded-xl text-xs md:text-sm font-black transition-all duration-300 flex items-center gap-3 active:scale-95 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                      : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <motion.div
            layout
            className="bg-slate-900/50 rounded-[2.5rem] overflow-hidden backdrop-blur-xl border border-white/5 shadow-3xl min-h-[800px]"
          >
            <AnimatePresence mode="wait">
              {activeTab === "official" ? (
                <motion.div
                  key="official-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="p-8 md:p-12"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-blue-600/5 rounded-3xl mb-12 border border-blue-500/10">
                    <div className="flex items-center gap-5">
                      <div className="bg-blue-600 p-3.5 rounded-2xl text-white shadow-xl shadow-blue-500/20">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-black text-lg">
                          Verified IDP Center
                        </h4>
                        <p className="text-sm text-slate-400">
                          Raipur Branch • Secure Computer-delivered IELTS
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full text-xs font-bold transition-all">
                      View Center Details <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="space-y-16">
                    {OFFICIAL_DATES.map((month) => (
                      <section key={month.month}>
                        <div className="flex items-center gap-6 mb-10">
                          <h3 className="text-2xl font-black text-white">
                            {month.month}
                          </h3>
                          <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent" />
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                          {month.dates.map((d, idx) => (
                            <motion.div
                              whileHover={{ y: -5 }}
                              key={idx}
                              className="p-6 bg-slate-800/40 rounded-3xl border border-white/5 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all group"
                            >
                              <span className="block text-4xl font-black text-blue-400 group-hover:scale-110 transition-transform origin-left">
                                {d.day}
                              </span>
                              <p className="text-[10px] font-black uppercase text-slate-500 tracking-tighter mt-2">
                                {d.type}
                              </p>
                              <div className="mt-4 flex items-center gap-1.5">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${d.level === "Available" ? "bg-emerald-500" : "bg-orange-500"}`}
                                />
                                <span className="text-[10px] font-bold text-slate-300">
                                  {d.level}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="mock-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="h-full flex flex-col"
                >
                  <div className="p-6 bg-slate-800/30 border-b border-white/5 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <MetaBadge
                      icon={<Clock size={16} />}
                      label="Notice"
                      value="12h Advance"
                      color="text-blue-400"
                    />
                    <MetaBadge
                      icon={<AlertCircle size={16} />}
                      label="Limit"
                      value="2 Tests/Week"
                      color="text-orange-400"
                    />
                    <MetaBadge
                      icon={<MapPin size={16} />}
                      label="Venue"
                      value="Komet Raipur"
                      color="text-emerald-400"
                    />
                  </div>

                  <div className="w-full flex-grow relative min-h-[750px] bg-white">
                    {isIframeLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-50">
                        <RefreshCw
                          className="text-blue-500 animate-spin mb-4"
                          size={40}
                        />
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest animate-pulse">
                          Connecting to Tidly...
                        </p>
                      </div>
                    )}

                    <iframe
                      src={TIDLY_URL}
                      className="w-full h-[750px] border-none"
                      onLoad={() => setIsIframeLoading(false)}
                      title="Tidly Booking"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 20px;
          border: 2px solid #020617;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}

function MetaBadge({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`${color} bg-white/5 p-2 rounded-xl`}>{icon}</div>
      <div>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-xs font-black text-white">{value}</p>
      </div>
    </div>
  );
}
