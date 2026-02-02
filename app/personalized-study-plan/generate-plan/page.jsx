"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Zap,
  Clock,
  Calendar,
  BookOpen,
  Mic,
  PenTool,
  Ear,
  RefreshCcw,
  Target,
  Trophy,
  Flame,
  LayoutDashboard,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
// Assuming these exist in your project
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const BANDS = ["6.5", "7.0", "7.5", "8.0", "9.0"];

const TIMELINES = [
  {
    label: "Crash Course",
    value: "2 Weeks",
    icon: Zap,
    color: "text-amber-400",
  },
  { label: "Intensive", value: "1 Month", icon: Clock, color: "text-blue-400" },
  {
    label: "Steady",
    value: "3 Months",
    icon: Calendar,
    color: "text-emerald-400",
  },
];

const WEAKNESSES = [
  { id: "Reading", icon: BookOpen, desc: "Skimming & Comprehension" },
  { id: "Writing", icon: PenTool, desc: "Grammar & Structure" },
  { id: "Listening", icon: Ear, desc: "Accents & Speed" },
  { id: "Speaking", icon: Mic, desc: "Fluency & Pronunciation" },
];

const INTENSITIES = [
  {
    id: "Casual",
    hours: "1",
    desc: "Maintain current level",
    speed: "Slow & Steady",
  },
  {
    id: "Standard",
    hours: "3",
    desc: "Steady improvement",
    speed: "Recommended",
  },
  {
    id: "Hardcore",
    hours: "5+",
    desc: "Maximum band jump",
    speed: "High Pressure",
  },
];

const Background = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020617]">
    <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
  </div>
);

const SelectionCard = ({ selected, onClick, children, className }) => (
  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={cn(
      "group relative p-5 rounded-2xl border text-left transition-all duration-300 outline-none cursor-pointer", // Added cursor-pointer
      selected
        ? "bg-blue-500/10 border-blue-500/50 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]"
        : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60",
      className,
    )}
  >
    {selected && (
      <motion.div
        layoutId="glow"
        className="absolute inset-0 rounded-2xl bg-blue-500/5 blur-sm"
      />
    )}
    <div className="relative z-10">{children}</div>
  </motion.button>
);

export default function IELTSPlanGenerator() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    targetBand: "7.5",
    timeline: "1 Month",
    weaknesses: [],
    intensity: "Standard",
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const toggleWeakness = (id) => {
    setFormData((prev) => ({
      ...prev,
      weaknesses: prev.weaknesses.includes(id)
        ? prev.weaknesses.filter((w) => w !== id)
        : [...prev.weaknesses, id],
    }));
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen font-sans mt-10 text-slate-100 selection:bg-blue-500/30">
        <Background />

        <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20">
          {!isGenerating && step < 4 && (
            <nav className="flex items-center justify-between mb-16">
              <button
                onClick={() =>
                  step > 1 ? handleBack() : window.history.back()
                }
                className="p-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer" // Added cursor-pointer
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex gap-3">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-500",
                      step === s ? "w-8 bg-blue-500" : "bg-slate-800",
                    )}
                  />
                ))}
              </div>
              <div className="text-xs font-black tracking-[0.2em] text-slate-500 uppercase">
                Step 0{step} / 03
              </div>
            </nav>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="text-center md:text-left">
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
                    Define your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                      Ambition.
                    </span>
                  </h1>
                  <p className="text-slate-400 text-lg max-w-xl">
                    We&apos;ll calibrate your study path based on your desired
                    band score and preparation window.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <section className="space-y-6">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-500">
                      <Target size={16} /> Target Band Score
                    </h3>
                    <div className="grid grid-cols-5 gap-3">
                      {BANDS.map((band) => (
                        <SelectionCard
                          key={band}
                          selected={formData.targetBand === band}
                          onClick={() =>
                            setFormData({ ...formData, targetBand: band })
                          }
                          className="p-0 h-16 flex items-center justify-center"
                        >
                          <span className="text-xl font-black">{band}</span>
                        </SelectionCard>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-6">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-indigo-500">
                      <Clock size={16} /> Prep Timeline
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {TIMELINES.map((t) => (
                        <SelectionCard
                          key={t.value}
                          selected={formData.timeline === t.value}
                          onClick={() =>
                            setFormData({ ...formData, timeline: t.value })
                          }
                          className="flex flex-col items-center text-center gap-2"
                        >
                          <t.icon size={20} className={t.color} />
                          <span className="font-bold text-sm">{t.value}</span>
                        </SelectionCard>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="flex justify-end pt-8">
                  <ButtonPrimary
                    onClick={handleNext}
                    text="Identify Gaps"
                    icon={<ArrowRight size={20} />}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
                    Where do you <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      Struggle?
                    </span>
                  </h1>
                  <p className="text-slate-400 text-lg">
                    Select at least one category to focus your personalized
                    curriculum.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {WEAKNESSES.map((w) => (
                    <SelectionCard
                      key={w.id}
                      selected={formData.weaknesses.includes(w.id)}
                      onClick={() => toggleWeakness(w.id)}
                      className="flex items-center gap-5 p-6"
                    >
                      <div
                        className={cn(
                          "p-4 rounded-2xl transition-all",
                          formData.weaknesses.includes(w.id)
                            ? "bg-blue-500 text-white"
                            : "bg-slate-800 text-slate-400",
                        )}
                      >
                        <w.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{w.id}</h4>
                        <p className="text-sm text-slate-500">{w.desc}</p>
                      </div>
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                          formData.weaknesses.includes(w.id)
                            ? "bg-blue-500 border-blue-500"
                            : "border-slate-700",
                        )}
                      >
                        {formData.weaknesses.includes(w.id) && (
                          <CheckCircle2 size={14} className="text-white" />
                        )}
                      </div>
                    </SelectionCard>
                  ))}
                </div>

                <div className="flex justify-between pt-8">
                  <ButtonSecondary onClick={handleBack} text="Back" />
                  <ButtonPrimary
                    disabled={formData.weaknesses.length === 0}
                    onClick={handleNext}
                    text="Set Pace"
                    icon={<ArrowRight size={20} />}
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-12"
              >
                <div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
                    Study{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      Pace.
                    </span>
                  </h1>
                  <p className="text-slate-400 text-lg">
                    Daily commitment determines the speed of your band score
                    jump.
                  </p>
                </div>

                <div className="space-y-4">
                  {INTENSITIES.map((item) => (
                    <SelectionCard
                      key={item.id}
                      selected={formData.intensity === item.id}
                      onClick={() =>
                        setFormData({ ...formData, intensity: item.id })
                      }
                      className="flex items-center justify-between p-6"
                    >
                      <div className="flex items-center gap-6">
                        <div className="text-center min-w-[80px] p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                          <span className="block text-2xl font-black text-white">
                            {item.hours}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            Hours/Day
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-xl">{item.id} Mode</h4>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <div className="hidden md:block px-4 py-1 rounded-full bg-slate-800 text-[10px] font-black uppercase tracking-tighter text-slate-400">
                        {item.speed}
                      </div>
                    </SelectionCard>
                  ))}
                </div>

                <div className="flex justify-between pt-8">
                  <ButtonSecondary onClick={handleBack} text="Back" />
                  <ButtonPrimary
                    onClick={() => setIsGenerating(true)}
                    text="Generate Blueprint"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                    icon={<Sparkles size={20} />}
                  />
                </div>
              </motion.div>
            )}

            {isGenerating && step !== 4 && (
              <LoadingScreen
                onComplete={() => {
                  setIsGenerating(false);
                  setStep(4);
                }}
              />
            )}

            {step === 4 && (
              <ResultsDashboard
                formData={formData}
                onReset={() => setStep(1)}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
}

const ButtonPrimary = ({ onClick, text, icon, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-950 font-black uppercase tracking-widest transition-all",
      "hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed cursor-pointer", // Added cursor-pointer & not-allowed
      "shadow-[0_20px_40px_-15px_rgba(255,255,255,0.2)]",
      className,
    )}
  >
    {text} {icon}
  </button>
);

const ButtonSecondary = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="px-8 py-4 rounded-2xl text-slate-400 font-bold uppercase tracking-widest hover:text-white hover:bg-slate-800/40 transition-all cursor-pointer" // Added cursor-pointer
  >
    {text}
  </button>
);

const LoadingScreen = ({ onComplete }) => {
  const [status, setStatus] = useState("Analyzing Gaps...");

  useEffect(() => {
    const sequence = [
      "Structuring Modules...",
      "Optimizing Schedule...",
      "Finalizing Blueprint...",
    ];
    let i = 0;
    const timer = setInterval(() => {
      if (i < sequence.length) setStatus(sequence[i++]);
      else {
        clearInterval(timer);
        onComplete();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
        />
        <Sparkles
          className="absolute inset-0 m-auto text-blue-500 animate-pulse"
          size={24}
        />
      </div>
      <h2 className="text-2xl font-black text-white mb-2">{status}</h2>
      <p className="text-slate-500 text-sm uppercase tracking-[0.3em]">
        AI Engine Processing
      </p>
    </motion.div>
  );
};

const ResultsDashboard = ({ formData, onReset }) => {
  const plan = useMemo(() => {
    return [
      {
        title: "Foundation & Benchmarking",
        tasks: [
          `Complete full ${formData.weaknesses[0] || "General"} Diagnostic Test`,
          "Vocabulary expansion: 100 Academic Words",
          "Mastering 12 complex grammar tenses",
        ],
        icon: <Target className="text-blue-400" />,
      },
      {
        title: "Strategy Implementation",
        tasks: [
          `Deep dive into ${formData.weaknesses.join(" & ") || "all"} techniques`,
          "Timed section practice (Daily)",
          "Structure peer-review sessions",
        ],
        icon: <Flame className="text-orange-400" />,
      },
      {
        title: "Simulation & Refinement",
        tasks: [
          "3 Full-length mock exams",
          "Error log analysis & AI feedback",
          "Time-management optimization",
        ],
        icon: <Zap className="text-purple-400" />,
      },
      {
        title: "The Final Sprint",
        tasks: [
          "Confidence-building light review",
          "Exam day strategy rehearsal",
          "Rest & Mental priming",
        ],
        icon: <Trophy className="text-emerald-400" />,
      },
    ];
  }, [formData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
          <CheckCircle2 size={12} /> Personalized Curriculum Ready
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
          Your IELTS <span className="text-blue-500">Blueprint.</span>
        </h1>
        <p className="text-slate-400">
          Targeting <b className="text-white">Band {formData.targetBand}</b> in{" "}
          {formData.timeline} at {formData.intensity} intensity.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {plan.map((stage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex gap-6"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center z-10">
                  {stage.icon}
                </div>
                {idx !== plan.length - 1 && (
                  <div className="w-px flex-1 bg-slate-800 my-2" />
                )}
              </div>
              <div className="flex-1 bg-slate-900/40 border border-slate-800 p-6 rounded-3xl group-hover:border-slate-700 transition-colors">
                <h3 className="font-black text-xl mb-4 flex items-center justify-between">
                  {stage.title}
                  <span className="text-[10px] text-slate-500">
                    Phase 0{idx + 1}
                  </span>
                </h3>
                <ul className="space-y-3">
                  {stage.tasks.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-6 shadow-xl">
            <h3 className="text-2xl font-black leading-tight">
              Sync to your Dashboard
            </h3>
            <p className="text-blue-100 text-sm opacity-80">
              Track daily tasks, unlock resources, and measure your progress
              toward Band {formData.targetBand}.
            </p>
            <Link href="/">
              <span className="w-full py-4 bg-white text-blue-700 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors cursor-pointer">
                <LayoutDashboard size={18} /> Access Dashboard
              </span>
            </Link>
          </div>

          <div className="p-6 rounded-[2rem] bg-slate-900/50 border border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
              Study Stats
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-400">Weekly Commitment</span>
                <span className="text-white">
                  ~{" "}
                  {parseInt(
                    formData.intensity === "Hardcore"
                      ? "5"
                      : formData.intensity === "Standard"
                        ? "3"
                        : "1",
                  ) * 7}{" "}
                  Hours
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-slate-400">Focus Priority</span>
                <span className="text-blue-400">
                  {formData.weaknesses[0] || "General"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 py-4 text-slate-500 hover:text-white text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
          >
            <RefreshCcw size={14} /> Recalibrate Plan
          </button>
        </aside>
      </div>
    </motion.div>
  );
};
