"use client";

import React, { useState, memo, useMemo } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import {
  Headset,
  BookOpen,
  PenTool,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const EXAM_DATA = {
  Listening: {
    icon: Headset,
    theme: "bg-purple-600",
    lightBg: "bg-purple-50",
    textColor: "text-purple-600",
    duration: "30 mins",
    questions: "40 Questions",
    desc: "Test your ability to understand main ideas and detailed factual information in various contexts.",
    details: [
      "Social Conversations",
      "Educational Monologues",
      "Academic Discussions",
      "Lecture Styles",
    ],
  },
  Reading: {
    icon: BookOpen,
    theme: "bg-blue-600",
    lightBg: "bg-blue-50",
    textColor: "text-blue-600",
    duration: "60 mins",
    questions: "40 Questions",
    desc: "Assess reading skills including reading for gist, main ideas, detail, and logical argument.",
    details: [
      "Identifying Main Ideas",
      "Skimming & Scanning",
      "Logical Argument",
      "Detail-oriented Reading",
    ],
  },
  Writing: {
    icon: PenTool,
    theme: "bg-orange-600",
    lightBg: "bg-orange-50",
    textColor: "text-orange-600",
    duration: "60 mins",
    questions: "2 Tasks",
    desc: "Demonstrate your ability to write a response using appropriate language and organization.",
    details: [
      "Task 1: Data Report",
      "Task 2: Academic Essay",
      "Formal Tone Mastery",
      "Coherence focus",
    ],
  },
  Speaking: {
    icon: MessageSquare,
    theme: "bg-green-600",
    lightBg: "bg-green-50",
    textColor: "text-green-600",
    duration: "11–14 mins",
    questions: "3 Parts",
    desc: "A personal interview designed to evaluate your spoken English fluency and coherence.",
    details: [
      "Part 1: Introduction",
      "Part 2: Cue Card",
      "Part 3: Deep Discussion",
      "Fluency & Cohesion",
    ],
  },
};

const TabButton = memo(({ id, label, isActive, Icon, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "relative flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold transition-colors duration-300 outline-none shrink-0 group transform-gpu cursor-pointer",
      isActive
        ? "text-white"
        : "text-slate-500 hover:text-slate-800 bg-slate-50/50 hover:bg-slate-100/80",
    )}
  >
    {isActive && (
      <m.div
        layoutId="activeTab"
        className="absolute inset-0 bg-blue-600 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl shadow-blue-200"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <Icon
      size={18}
      className="relative z-10 transition-transform group-hover:scale-110"
    />
    <span className="relative z-10 text-xs sm:text-[15px] tracking-tight whitespace-nowrap">
      {label}
    </span>
  </button>
));

TabButton.displayName = "TabButton";

export default function ExamStructure() {
  const [activeTab, setActiveTab] = useState("Listening");
  const activeData = useMemo(() => EXAM_DATA[activeTab], [activeTab]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="py-16 sm:py-24 md:py-32 bg-white selection:bg-blue-100 overflow-hidden"
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          {/* Header */}
          <m.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16 transform-gpu"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight leading-[1.1]">
              Master the <span className="text-blue-600 italic">IELTS</span>{" "}
              Modules
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-base sm:text-lg px-2">
              Understand the blueprint of success. Every module is a step closer
              to your dream score.
            </p>
          </m.header>

          {/* Navigation with Scroll Fade Indicators */}
          <div className="relative mb-8 sm:mb-12">
            <nav className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 gap-2 sm:gap-3 no-scrollbar touch-pan-x scroll-smooth">
              {Object.entries(EXAM_DATA).map(([key, value]) => (
                <TabButton
                  key={key}
                  id={key}
                  label={key}
                  Icon={value.icon}
                  isActive={activeTab === key}
                  onClick={() => setActiveTab(key)}
                />
              ))}
            </nav>
          </div>

          {/* Dynamic Content Panel */}
          <div className="relative min-h-[550px] sm:min-h-[500px] lg:min-h-[400px]">
            <AnimatePresence mode="popLayout">
              <m.article
                key={activeTab}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="grid lg:grid-cols-12 gap-8 items-center bg-slate-50/40 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-14 border border-slate-100 shadow-sm transform-gpu"
              >
                {/* Left Content */}
                <div className="lg:col-span-7">
                  <div
                    className={cn(
                      "w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-inner transform-gpu transition-transform hover:scale-105",
                      activeData.lightBg,
                    )}
                  >
                    {React.createElement(activeData.icon, {
                      className: cn(
                        "w-6 h-6 sm:w-7 sm:h-7",
                        activeData.textColor,
                      ),
                    })}
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
                    {activeTab}{" "}
                    <span className="text-slate-400 font-normal">Module</span>
                  </h3>

                  <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-xl">
                    {activeData.desc}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 px-5 py-3.5 sm:px-6 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200/60 shadow-sm">
                      <Clock size={20} className="text-blue-600 shrink-0" />
                      <span className="font-bold text-slate-800 text-sm sm:text-base">
                        {activeData.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3.5 sm:px-6 sm:py-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200/60 shadow-sm">
                      <AlertCircle
                        size={20}
                        className="text-orange-500 shrink-0"
                      />
                      <span className="font-bold text-slate-800 text-sm sm:text-base">
                        {activeData.questions}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Format Card */}
                <div className="lg:col-span-5">
                  <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[1.8rem] sm:rounded-[2.5rem] shadow-xl shadow-slate-200/30 border border-slate-100 relative overflow-hidden group">
                    {/* Hardware Accelerated Glow */}
                    <div
                      className={cn(
                        "absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-3xl transform-gpu transition-all duration-700 group-hover:scale-150 group-hover:opacity-20",
                        activeData.theme,
                      )}
                    />

                    <h4 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 sm:mb-8">
                      Focus Areas
                    </h4>

                    <ul className="grid gap-3 sm:gap-4">
                      {activeData.details.map((item, idx) => (
                        <m.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="flex items-center gap-3 sm:gap-4 group/item"
                        >
                          <div
                            className={cn(
                              "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transform-gpu transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_8px_rgba(0,0,0,0.2)]",
                              activeData.theme,
                            )}
                          />
                          <span className="text-slate-700 font-bold text-sm sm:text-base md:text-lg">
                            {item}
                          </span>
                        </m.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </m.article>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
