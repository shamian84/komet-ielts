/* eslint-disable react/no-unescaped-entities */
"use client";

import React, {
  useRef,
  useState,
  useEffect,
  memo,
  useMemo,
  useCallback,
} from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  BookOpen,
  PenTool,
  Headphones,
  MessageSquare,
  ChevronRight,
  Download,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import reding from "@/public/IELTS_Reading_Advanced_Guide.pdf";

/* ================= PDF MAP (ONLY ADDITION) ================= */
const PDF_MAP = {
  reading: "/IELTS_Reading_Advanced_Guide.pdf",
  writing: "/IELTS_Writing_Advanced_Guide.pdf",
  listening: "/IELTS_Listening_Advanced_Guide.pdf",
  speaking: "/IELTS_Speaking_Advanced_Guide.pdf",
};

/* ================= COMPONENT: CINEMATIC CARD ================= */
const ScrollSection = memo(({ section, onVisible, scrollLock }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !scrollLock.current) {
          onVisible(section.id);
        }
      },
      { threshold: 0.3, rootMargin: "-10% 0px -40% 0px" },
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [section.id, onVisible, scrollLock]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]),
    springConfig,
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]),
    springConfig,
  );

  return (
    <m.div
      ref={cardRef}
      id={section.id}
      style={{ opacity, scale }}
      className="mb-24 md:mb-48 relative group scroll-mt-60 transform-gpu isolation-auto"
    >
      <div
        className={`absolute -inset-10 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-[0.05] blur-[100px] transition-opacity duration-1000 rounded-[5rem] pointer-events-none`}
      />

      <div className="bg-[#050914]/80 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] border border-white/5 p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl">
        <m.div
          style={{ scaleX: scrollYProgress }}
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${section.color} origin-left z-20`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-5 space-y-8">
            <m.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.color} p-[1px]`}
            >
              <div className="w-full h-full bg-[#030712] rounded-[inherit] flex items-center justify-center">
                <section.icon className="w-7 h-7 text-white" />
              </div>
            </m.div>

            <div className="space-y-4">
              <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white tracking-tighter leading-none uppercase italic">
                {section.title}
                <span
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${section.color}`}
                >
                  .
                </span>
              </h2>
              <div className="flex gap-3 items-center">
                <div
                  className={`h-[1px] w-12 bg-gradient-to-r ${section.color}`}
                />
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                  {section.highlights.join(" // ")}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-sm">
              Proprietary {section.title} frameworks designed for high-bandwidth
              scoring.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.strategy.map((tip, i) => (
                <m.div
                  key={i}
                  whileHover={{
                    y: -5,
                    backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                  className="group/item relative p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Sparkles size={14} className="text-blue-400 opacity-50" />
                    <ArrowUpRight
                      size={16}
                      className="text-slate-600 group-hover/item:text-white transition-all"
                    />
                  </div>
                  <p className="text-slate-200 text-lg font-bold tracking-tight">
                    {tip}
                  </p>
                </m.div>
              ))}
            </div>

            {/* ===== ONLY BUTTON LOGIC ADDED ===== */}
            <m.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const link = document.createElement("a");
                link.href = PDF_MAP[section.id];
                link.download = "";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="group relative w-full lg:w-fit flex items-center justify-center gap-4 bg-white text-black px-10 py-5 rounded-2xl cursor-pointer font-black uppercase tracking-widest text-[10px]"
            >
              <Download size={16} /> {section.cta}
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </m.button>
          </div>
        </div>
      </div>
    </m.div>
  );
});
ScrollSection.displayName = "ScrollSection";

/* ================= MAIN PAGE ================= */
export default function IELTSExamGuidePage() {
  const [activeTab, setActiveTab] = useState("reading");
  const scrollLock = useRef(false);

  const { scrollY } = useScroll();
  const springScroll = useSpring(scrollY, { stiffness: 80, damping: 25 });
  const xLeft = useTransform(springScroll, [0, 2500], [0, -400]);
  const xRight = useTransform(springScroll, [0, 2500], [0, 400]);

  const sections = useMemo(
    () => [
      {
        id: "reading",
        title: "Reading",
        color: "from-emerald-400 to-cyan-500",
        icon: BookOpen,
        highlights: ["Scanning", "Mapping"],
        strategy: [
          "Keyword Locators",
          "Logic Chains",
          "Time Dilation",
          "Synthesis",
        ],
        cta: "Download Blueprint",
      },
      {
        id: "writing",
        title: "Writing",
        color: "from-purple-500 to-pink-500",
        icon: PenTool,
        highlights: ["Cohesion", "Task 2"],
        strategy: [
          "Frameworks",
          "Lexical Range",
          "Argument Flow",
          "Grammar Audit",
        ],
        cta: "Get Frameworks",
      },
      {
        id: "listening",
        title: "Listening",
        color: "from-blue-500 to-indigo-500",
        icon: Headphones,
        highlights: ["Predictive", "Audio"],
        strategy: [
          "Signpost Tracking",
          "Phonetic Fixes",
          "Synonym Mapping",
          "Filter Drills",
        ],
        cta: "Audio Guide",
      },
      {
        id: "speaking",
        title: "Speaking",
        color: "from-orange-500 to-red-500",
        icon: MessageSquare,
        highlights: ["Fluency", "Mastery"],
        strategy: [
          "Expansion Tactics",
          "Idiomatic Flow",
          "Tone Control",
          "Speed Drills",
        ],
        cta: "Join Masterclass",
      },
    ],
    [],
  );

  const handleManualScroll = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    scrollLock.current = true;
    setActiveTab(id);

    const offset = window.innerWidth < 768 ? 150 : 200;
    window.scrollTo({
      top: el.offsetTop - offset,
      behavior: "smooth",
    });

    setTimeout(() => {
      scrollLock.current = false;
    }, 900);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#02040a] text-white overflow-x-hidden font-sans">
        <Navbar />

        {/* FLOATING NAV */}
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-xl px-2">
          <nav className="bg-[#080c14]/60 backdrop-blur-xl border border-white/10 p-1 rounded-3xl flex">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleManualScroll(s.id)}
                className={`relative flex-1 py-3 rounded-2xl cursor-pointer text-[9px] font-black uppercase tracking-widest ${
                  activeTab === s.id ? "text-white" : "text-slate-500"
                }`}
              >
                {activeTab === s.id && (
                  <m.div
                    layoutId="activeTabInd"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-[inherit]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{s.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* HERO */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
            <m.h1
              style={{ x: xLeft }}
              className="text-[20vw] font-black whitespace-nowrap uppercase tracking-tighter"
            >
              IELTS MASTERY
            </m.h1>
            <m.h1
              style={{ x: xRight }}
              className="text-[20vw] font-black italic whitespace-nowrap uppercase tracking-tighter text-blue-500"
            >
              STRATEGY FIRST
            </m.h1>
          </div>

          <div className="container mx-auto px-6 mt-10 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <ShieldCheck size={14} className="text-blue-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">
                Elite Mastery Program 2026
              </span>
            </div>

            <h1 className="text-[clamp(2.5rem,12vw,10rem)] font-black leading-[0.85] tracking-tighter uppercase mb-8">
              CRACK THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-indigo-400 italic">
                ALGORITHM.
              </span>
            </h1>

            <p className="max-w-xl mx-auto text-slate-400 text-sm md:text-xl uppercase tracking-wide">
              Reverse-engineered frameworks for{" "}
              <span className="text-white">Band 8.0+ results.</span>
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 md:px-12 lg:px-20 pb-40">
          {sections.map((section) => (
            <ScrollSection
              key={section.id}
              section={section}
              onVisible={setActiveTab}
              scrollLock={scrollLock}
            />
          ))}
        </main>

        <Footer />
      </div>
    </LazyMotion>
  );
}
