/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { memo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Target,
  Lightbulb,
  Dumbbell,
  Trophy,
  ArrowUp,
  Sparkles,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const STEPS = [
  {
    icon: Target,
    title: "Diagnostic",
    desc: "Baseline assessment to pinpoint your current band and identify linguistic gaps.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Lightbulb,
    title: "Strategy",
    desc: "Mastering time management and examiner-specific marking criteria.",
    color: "from-cyan-400 to-indigo-500",
  },
  {
    icon: Dumbbell,
    title: "Drilling",
    desc: "High-intensity simulation of real exam conditions with instant feedback.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Trophy,
    title: "Triumph",
    desc: "Final polishing to ensure you exceed your target band score with confidence.",
    color: "from-purple-500 to-pink-500",
  },
];

const StepCard = memo(({ step, index }) => (
  <m.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.6,
      delay: index * 0.1, // Snappier for mobile
      ease: [0.21, 1.02, 0.47, 0.98],
    }}
    viewport={{ once: true, margin: "-20px" }}
    className="relative group flex flex-col items-center text-center px-2 sm:px-4"
  >
    {/* Step Number Badge */}
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[9px] sm:text-[10px] font-black text-blue-400 tracking-tighter group-hover:border-blue-500 transition-colors whitespace-nowrap">
      PHASE 0{index + 1}
    </div>

    {/* Icon Container - Responsive Sizing */}
    <div className="relative mb-8 md:mb-10 transform-gpu transition-transform duration-500 group-hover:scale-105 sm:group-hover:scale-110">
      <div
        className={cn(
          "absolute inset-0 rounded-[1.8rem] sm:rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-br",
          step.color,
        )}
      />
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-[1.8rem] sm:rounded-[2rem] bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 flex items-center justify-center z-10 overflow-hidden shadow-2xl">
        <m.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
        />
        <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-blue-400 transition-colors duration-300" />
      </div>
    </div>

    {/* Text Content */}
    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 tracking-tight">
      {step.title}
    </h3>
    <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium max-w-[280px] md:max-w-none">
      {step.desc}
    </p>
  </m.div>
));

StepCard.displayName = "StepCard";

export default function TrainingPage() {
  const scrollToHero = () => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="relative py-20 sm:py-28 md:py-40 bg-[#020617] overflow-hidden"
        id="komet-training"
      >
        {/* Optimized Background Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
          <div className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/10 rounded-full blur-[80px] sm:blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-600/10 rounded-full blur-[80px] sm:blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
            style={{
              backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-6">
              <Sparkles size={14} /> Proprietary Framework
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 sm:mb-8 leading-[1.1]">
              The Path to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Peak Performance
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-medium leading-relaxed px-2">
              Achieving a high band score isn&lsquo;t about luck. It&apos;s
              about a systematic approach to linguistic precision and
              test-taking logic.
            </p>
          </m.div>

          {/* Steps Timeline Grid */}
          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-[56px] left-[10%] right-[10%] h-[1px] bg-slate-800/50 -z-0">
              <m.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-left"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16 md:gap-8 lg:gap-12">
              {STEPS.map((step, index) => (
                <StepCard key={step.title} step={step} index={index} />
              ))}
            </div>
          </div>

          {/* Responsive CTA Section */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 sm:mt-32 text-center"
          >
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToHero}
              className="relative group w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-white text-slate-950 font-black text-lg sm:text-xl rounded-2xl sm:rounded-[2rem] shadow-2xl transition-all overflow-hidden cursor-pointer active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white group-hover:from-blue-600 group-hover:to-blue-500 transition-all duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors">
                Begin Assessment
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-1 transition-transform" />
              </span>
            </m.button>
            <p className="mt-6 text-slate-500 text-[10px] sm:text-sm font-bold tracking-widest uppercase">
              Free Diagnostics • 10 Minute Test
            </p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
