/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { toast, Toaster } from "react-hot-toast";

// Optimized Premium Icon Imports
import Headphones from "lucide-react/dist/esm/icons/headphones";
import BookOpen from "lucide-react/dist/esm/icons/book-open";
import PenTool from "lucide-react/dist/esm/icons/pen-tool";
import { Mic2 } from "lucide-react";
import Play from "lucide-react/dist/esm/icons/play";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import CheckCircle from "lucide-react/dist/esm/icons/check-circle";
import Clock3 from "lucide-react/dist/esm/icons/clock-3";
import BarChart3 from "lucide-react/dist/esm/icons/bar-chart-3";
import Trophy from "lucide-react/dist/esm/icons/trophy";
import Target from "lucide-react/dist/esm/icons/target";
import AlertCircle from "lucide-react/dist/esm/icons/alert-circle";
import TrendingUp from "lucide-react/dist/esm/icons/trending-up";
import EyeOff from "lucide-react/dist/esm/icons/eye-off";
import Gauge from "lucide-react/dist/esm/icons/gauge";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: false,
});

// Memoized static data to prevent re-creation on render
const MODULES = [
  {
    id: "listening",
    title: "Listening",
    subtitle: "Accent simulation",
    icon: Headphones,
    color: "from-blue-500 to-indigo-600",
    stats: "4 Parts • 40 Qs",
    time: "30m",
    description:
      "Train your ear with 12 different English accents including British, Australian, and North American.",
    features: [
      "Adaptive Audio Speed",
      "Real-time Transcripts",
      "Distractor Analysis",
    ],
  },
  {
    id: "reading",
    title: "Reading",
    subtitle: "Academic passages",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-600",
    stats: "3 Sec • 40 Qs",
    time: "60m",
    description:
      "Analyze complex academic texts from scientific journals and newspapers with smart highlighting.",
    features: ["Keyword Mapping", "Logic Gap Analysis", "Vocabulary Builder"],
  },
  {
    id: "writing",
    title: "Writing",
    subtitle: "Task 1 & 2 Evaluation",
    icon: PenTool,
    color: "from-purple-500 to-pink-600",
    stats: "2 Tasks",
    time: "60m",
    description:
      "Get instant AI grading on Coherence, Lexical Resource, and Grammatical Range.",
    features: [
      "AI Auto-Grading",
      "Band 9 Sample Essays",
      "Structure Templates",
    ],
  },
  {
    id: "speaking",
    title: "Speaking",
    subtitle: "AI Topic Prompts",
    icon: Mic2,
    color: "from-orange-500 to-red-600",
    stats: "3 Parts",
    time: "15m",
    description:
      "Practice with an AI examiner that reacts to your pauses and intonation in real-time.",
    features: ["Fluency Meter", "Pronunciation Heatmap", "Cue Card Timer"],
  },
];

/* ================= OPTIMIZED COMPONENTS ================= */
const StatItem = memo(({ icon: Icon, label, value, colorClass }) => (
  <div className="space-y-1">
    <p className="text-slate-500 text-[9px] font-black tracking-widest uppercase flex items-center gap-1.5">
      <Icon size={10} /> {label}
    </p>
    <p className={`text-2xl md:text-3xl font-black ${colorClass}`}>{value}</p>
  </div>
));
StatItem.displayName = "StatItem";

const BackgroundEffect = memo(({ focusMode }) => (
  <AnimatePresence>
    {!focusMode && (
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 pointer-events-none overflow-hidden z-0 transform-gpu"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/5 rounded-full blur-[120px] will-change-transform" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-indigo-600/5 rounded-full blur-[100px]" />
      </m.div>
    )}
  </AnimatePresence>
));
BackgroundEffect.displayName = "BackgroundEffect";

export default function MockTestPortal() {
  const [activeTab, setActiveTab] = useState("listening");
  const [difficulty, setDifficulty] = useState("Academic");
  const [focusMode, setFocusMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hash = window.location.hash.replace("#", "");
    if (hash && MODULES.some((m) => m.id === hash)) setActiveTab(hash);
  }, []);

  const activeContent = useMemo(
    () => MODULES.find((m) => m.id === activeTab) || MODULES[0],
    [activeTab],
  );

  const handleStartMock = useCallback(() => {
    toast.success(`Preparing ${activeTab} environment...`, {
      style: {
        borderRadius: "15px",
        background: "#0f172a",
        color: "#fff",
        border: "1px solid #1e293b",
      },
    });
  }, [activeTab]);

  if (!isMounted) return <div className="min-h-screen bg-[#020611]" />;

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`min-h-screen transition-colors duration-700 ${focusMode ? "bg-black" : "bg-[#020611]"} text-white font-sans selection:bg-blue-500/30 overflow-x-hidden`}
      >
        <Navbar />
        <Toaster position="top-right" containerStyle={{ top: 90 }} />
        <BackgroundEffect focusMode={focusMode} />

        <main className="relative z-10 pt-28 md:pt-44 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
          {/* Header & Stats Bento Grid */}
          <header className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 items-stretch">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-md">
                  V2.6 PRO
                </span>
                <button
                  onClick={() => setFocusMode(!focusMode)}
                  className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
                >
                  <EyeOff size={14} /> {focusMode ? "Exit Focus" : "Focus Mode"}
                </button>
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none">
                Smart{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic font-serif">
                  Testing.
                </span>
              </h1>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-6 rounded-[2rem] flex justify-between items-center shadow-2xl"
            >
              <StatItem
                icon={Target}
                label="Target"
                value="8.5"
                colorClass="text-white"
              />
              <div className="w-px h-10 bg-white/10" />
              <StatItem
                icon={TrendingUp}
                label="Rank"
                value="#412"
                colorClass="text-emerald-400"
              />
              <div className="w-px h-10 bg-white/10" />
              <div className="text-right">
                <Gauge size={20} className="ml-auto text-blue-500 mb-1" />
                <p className="text-[10px] font-black text-slate-500 uppercase">
                  Ready
                </p>
              </div>
            </m.div>
          </header>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Improved Snap Scrolling */}
            <nav className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar snap-x snap-mandatory lg:w-1/4">
              {MODULES.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className={`relative flex items-center gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 min-w-[260px] lg:min-w-0 snap-center outline-none cursor-pointer active:scale-[0.98] ${
                    activeTab === mod.id
                      ? "bg-white/5 border-blue-500/40 shadow-xl scale-[1.02]"
                      : "bg-transparent border-white/5 hover:border-white/10"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center shrink-0 shadow-lg`}
                  >
                    <mod.icon size={22} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3
                      className={`font-black text-base tracking-tight ${activeTab === mod.id ? "text-white" : "text-slate-400"}`}
                    >
                      {mod.title}
                    </h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest truncate">
                      {mod.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </nav>

            {/* Content Area - Optimized for High Lexical Density UI */}
            <section className="lg:w-3/4">
              <AnimatePresence mode="wait">
                <m.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="bg-[#0A101E]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-3xl"
                >
                  {/* Progress/Difficulty Visualizer */}
                  <div className="h-1.5 w-full bg-white/5">
                    <m.div
                      className={`h-full bg-gradient-to-r ${activeContent.color}`}
                      initial={{ width: "0%" }}
                      animate={{
                        width: difficulty === "Academic" ? "100%" : "60%",
                      }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                    />
                  </div>

                  <div className="p-8 md:p-12 space-y-8">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <div className="flex gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold">
                          <Clock3 size={14} /> {activeContent.time}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold">
                          <BarChart3 size={14} /> {activeContent.stats}
                        </div>
                      </div>

                      <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                        {["General", "Academic"].map((l) => (
                          <button
                            key={l}
                            onClick={() => setDifficulty(l)}
                            className={`px-4 py-1.5 rounded-lg text-[9px] cursor-pointer font-black uppercase tracking-widest transition-all ${
                              difficulty === l
                                ? "bg-slate-800 text-white shadow-lg"
                                : "text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                        {activeContent.title}{" "}
                        <span className="text-slate-800 italic">Module</span>
                      </h2>
                      <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                        {activeContent.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        {activeContent.features.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
                          >
                            <CheckCircle
                              size={16}
                              className="text-blue-500 group-hover:scale-110 transition-transform"
                            />
                            <span className="text-sm font-bold text-slate-300">
                              {f}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-blue-600/5 border border-blue-500/10 p-6 rounded-[1.5rem] flex flex-col justify-center">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <AlertCircle size={14} /> AI Predictor
                        </p>
                        <p className="text-sm text-slate-300 font-medium italic leading-relaxed">
                          Based on your 8.5 target, this module will prioritize
                          high-lexical academic content.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleStartMock}
                        className="w-full h-16 md:h-20 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-[0.97] cursor-pointer group"
                      >
                        BEGIN SESSION{" "}
                        <Play
                          size={18}
                          fill="currentColor"
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </m.div>
              </AnimatePresence>
            </section>
          </div>

          {/* Full Exam Section */}
          <m.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-8 md:p-16 rounded-[3rem] bg-gradient-to-br from-slate-900 to-black border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] group-hover:bg-blue-600/20 transition-all duration-700" />
            <div className="flex items-center gap-8 text-center md:text-left flex-col md:flex-row relative z-10">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-12 transition-transform duration-500">
                <Trophy size={32} className="text-white" />
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl font-black tracking-tight">
                  Full Mock Simulation
                </h4>
                <p className="text-slate-500 font-medium max-w-sm">
                  Experience the 3-hour pressure under real exam conditions.
                </p>
              </div>
            </div>
            <button className="px-10 py-5 cursor-pointer bg-white text-black font-black rounded-xl hover:scale-105 transition-all shadow-2xl flex items-center gap-3 relative z-10 active:scale-95">
              START FULL EXAM <ChevronRight size={20} />
            </button>
          </m.section>
        </main>

        <Footer />

        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap");

          :root {
            --font-jakarta: "Plus Jakarta Sans", sans-serif;
          }

          body {
            font-family: var(--font-jakarta);
            background-color: #020611;
            -webkit-font-smoothing: antialiased;
          }

          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .shadow-3xl {
            box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.5);
          }
        `}</style>
      </div>
    </LazyMotion>
  );
}
