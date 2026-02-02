/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, memo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Calendar,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BrainCircuit,
  LayoutDashboard,
  Fingerprint,
  TrendingUp,
  Globe,
  Users,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
/* ================= DATA ================= */

const planSteps = [
  {
    id: "step-1",
    title: "Linguistic DNA Scan",
    desc: "Our AI analyzes 45+ parameters of your English proficiency, from phonemic awareness to syntactical complexity.",
    duration: "60 Minutes",
    icon: Fingerprint,
    color: "from-blue-600 to-cyan-400",
    badge: "Stage 01",
  },
  {
    id: "step-2",
    title: "Gap Identification",
    desc: "We don't just find mistakes; we find the 'Root Patterns'—the specific habits holding your band score back.",
    duration: "Instant",
    icon: Target,
    color: "from-indigo-600 to-purple-500",
    badge: "Stage 02",
  },
  {
    id: "step-3",
    title: "Adaptive Content Path",
    desc: "Your curriculum reshapes itself daily. If you master 'Complex Sentences' early, the system skips to 'Lexical Precision'.",
    duration: "Continuous",
    icon: LayoutDashboard,
    color: "from-emerald-500 to-teal-400",
    badge: "Stage 03",
  },
  {
    id: "step-4",
    title: "Expert Calibration",
    desc: "Final polish with human examiners who review your AI-flagged 'gray areas' for ultimate score certainty.",
    duration: "Last 10 Days",
    icon: Zap,
    color: "from-orange-500 to-rose-500",
    badge: "Stage 04",
  },
];

/* ================= COMPONENTS ================= */

const BackgroundElements = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-[#030712]" />
    <div
      className="absolute inset-0 opacity-[0.1] md:opacity-[0.15]"
      style={{
        backgroundImage: `radial-gradient(#3b82f6 0.5px, transparent 0.5px)`,
        backgroundSize: "24px 24px",
      }}
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-blue-600/30 rounded-full blur-[80px] md:blur-[150px] will-change-transform"
    />
  </div>
));
BackgroundElements.displayName = "BackgroundElements";

const StepCard = ({ step, index, isLast }) => {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative flex gap-4 md:gap-16 group"
    >
      {/* Timeline Indicator */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-slate-900 border border-white/10 flex items-center justify-center relative z-10 group-hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
          <Icon className="w-5 h-5 md:w-8 md:h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
          <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {!isLast && (
          <div className="w-[1px] flex-grow bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent my-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-grow pb-16 md:pb-32">
        <motion.div
          whileHover={{ y: -5 }}
          className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] transition-all duration-500 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <span
              className={`inline-block w-fit px-4 py-1.5 rounded-full bg-gradient-to-r ${step.color} text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white`}
            >
              {step.badge}
            </span>
            <span className="flex items-center gap-2 text-slate-500 text-[10px] md:text-xs font-bold tracking-widest">
              <Calendar size={14} /> {step.duration}
            </span>
          </div>
          <h3 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight md:leading-none">
            {step.title}
          </h3>
          <p className="text-slate-400 text-sm md:text-xl leading-relaxed max-w-3xl">
            {step.desc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function PersonalizedStudyPlanPage() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-[#030712]" />;

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      <BackgroundElements />

      <main className="relative z-10 pt-24 md:pt-52">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <section className="text-center mb-24 md:mb-64">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <Sparkles size={14} className="text-blue-400 animate-pulse" />
                <span className="text-[9px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-blue-100">
                  AI-Driven Roadmaps 2026
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 md:mb-12">
                Your Path to <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 italic">
                  Band 8.0+
                </span>
              </h1>

              <p className="text-slate-400 text-base md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed mb-12 md:mb-16">
                Generic schedules fail because they ignore your unique
                strengths. We build a{" "}
                <span className="text-white">dynamic blueprint</span> that
                evolves with you.
              </p>

              <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-50 px-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <Globe size={18} className="text-blue-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Global Standards
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <TrendingUp size={18} className="text-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Performance Tracking
                  </span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Linguistic DNA Visual Section */}
          <section className="mb-24 md:mb-64">
            <div className="bg-gradient-to-b from-white/[0.05] to-transparent p-[1px] rounded-[2rem] md:rounded-[4rem]">
              <div className="bg-[#0A0F1C] rounded-[1.9rem] md:rounded-[3.8rem] p-6 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-3xl md:text-6xl font-black mb-8 tracking-tight leading-tight">
                    How we map your <br className="hidden sm:block" />{" "}
                    <span className="text-blue-500">Linguistic DNA</span>
                  </h2>
                  <div className="space-y-6">
                    {[
                      { label: "Grammatical Complexity", val: "92%" },
                      { label: "Lexical Diversity", val: "88%" },
                      { label: "Cohesion & Coherence", val: "95%" },
                    ].map((stat, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <span>{stat.label}</span>
                          <span>{stat.val}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: stat.val }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative flex justify-center order-1 lg:order-2 py-8 md:py-0">
                  <div className="w-full aspect-square max-w-[240px] md:max-w-md bg-blue-500/10 rounded-full flex items-center justify-center animate-pulse">
                    <BrainCircuit
                      size={80}
                      className="md:w-[120px] md:h-[120px] text-blue-500 opacity-50"
                    />
                    <div className="absolute inset-0 border border-blue-500/20 rounded-full scale-110" />
                    <div className="absolute inset-0 border border-blue-500/10 rounded-full scale-125" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Roadmap Steps */}
          <section className="max-w-5xl mx-auto mb-24 md:mb-40">
            <div className="mb-12 md:mb-20">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-blue-500 mb-4">
                The Process
              </h2>
              <div className="h-px w-20 md:w-24 bg-blue-500" />
            </div>
            <div className="space-y-4">
              {planSteps.map((step, index) => (
                <StepCard
                  key={step.id}
                  step={step}
                  index={index}
                  isLast={index === planSteps.length - 1}
                />
              ))}
            </div>
          </section>

          {/* Final Conversion CTA */}
          <section className="mb-20 md:mb-32">
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="relative p-[1px] rounded-[2rem] md:rounded-[4rem] bg-gradient-to-r from-blue-600/50 via-indigo-500/50 to-cyan-400/50 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity blur-[100px]" />
              <div className="bg-[#030712] rounded-[1.9rem] md:rounded-[3.8rem] py-16 px-6 md:py-32 md:px-10 text-center relative z-10">
                <h2 className="text-3xl sm:text-5xl md:text-8xl font-black mb-8 md:mb-10 tracking-tighter leading-tight md:leading-none">
                  Ready to break <br /> the{" "}
                  <span className="text-blue-500">Plateau?</span>
                </h2>
                <p className="text-slate-400 text-base md:text-2xl max-w-2xl mx-auto mb-10 md:mb-16 font-medium leading-relaxed">
                  Join 12,000+ students who stopped studying harder and started
                  studying with AI precision.
                </p>

                <Link
                  href="/personalized-study-plan/generate-plan"
                  className="inline-block"
                >
                  <button className="bg-white text-black px-8 md:px-12 py-5 md:py-7 rounded-2xl md:rounded-[2rem] font-black text-sm md:text-lg uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-500 flex items-center gap-4 mx-auto group/btn cursor-pointer">
                    Generate My Blueprint
                    <ArrowRight
                      size={18}
                      className="group-hover/btn:translate-x-2 transition-transform"
                    />
                  </button>
                </Link>

                <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-6 md:gap-8 opacity-40">
                  <div className="flex items-center gap-2 font-bold text-[9px] md:text-xs uppercase tracking-widest">
                    <CheckCircle2 size={14} /> Instant Result
                  </div>
                  <div className="flex items-center gap-2 font-bold text-[9px] md:text-xs uppercase tracking-widest">
                    <Users size={14} /> 12k+ Active Plans
                  </div>
                  <div className="flex items-center gap-2 font-bold text-[9px] md:text-xs uppercase tracking-widest">
                    <Zap size={14} /> No CC Required
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
