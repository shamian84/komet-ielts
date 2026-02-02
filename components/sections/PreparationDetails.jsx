"use client";

import React, { useMemo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { GraduationCap, FileText, Users, ArrowRight } from "lucide-react";

// Performance-optimized utility
const cn = (...classes) => classes.filter(Boolean).join(" ");

const PREP_FEATURES = [
  {
    title: "Expert Coaching",
    desc: "Personalized mentorship from certified IELTS trainers who have helped thousands achieve Band 8+.",
    icon: GraduationCap,
    accent: "bg-blue-600",
    lightAccent: "bg-blue-50",
    glow: "bg-blue-400",
  },
  {
    title: "Study Resources",
    desc: "Curated libraries of academic vocabulary, grammar guides, and high-scoring essay samples.",
    icon: FileText,
    accent: "bg-indigo-600",
    lightAccent: "bg-indigo-50",
    glow: "bg-indigo-400",
  },
  {
    title: "Full Mock Tests",
    desc: "Simulate the real exam environment with timed practice tests and detailed performance analysis.",
    icon: Users,
    accent: "bg-purple-600",
    lightAccent: "bg-purple-50",
    glow: "bg-purple-400",
  },
];

// GPU Accelerated Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
      ease: "linear",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
    },
  },
};

export default function PreparingForIELTS() {
  const renderedFeatures = useMemo(() => PREP_FEATURES, []);

  return (
    <LazyMotion features={domAnimation}>
      {/* Reduced padding on mobile (py-16) for better thumb-scrolling */}
      <section className="relative py-16 sm:py-24 md:py-32 bg-white overflow-hidden">
        {/* Suboptimal performance fix: Uses transform-gpu to offload pattern rendering */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none transform-gpu"
          style={{
            backgroundImage: "radial-gradient(#1e3a8a 1px, transparent 1px)",
            backgroundSize: "30px 30px", // Smaller pattern for mobile sharpness
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Section Header: Centered on all screens */}
          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight leading-[1.1]">
              Your Path to a <span className="text-blue-600">Band 8.0</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed px-2">
              Don&rsquo;t just study—prepare strategically. Our framework
              focuses on the specific metrics examiners use to grade your
              performance.
            </p>
          </m.div>

          {/* Cards Grid: Gap reduced for mobile (gap-6) */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {renderedFeatures.map((item, index) => {
              const Icon = item.icon;
              return (
                <m.div
                  key={index}
                  variants={cardVariants}
                  className="group relative will-change-transform"
                >
                  {/* Glow effect optimized for mobile: hidden by default, visible on hover */}
                  <div
                    className={cn(
                      "absolute -inset-0.5 rounded-[2rem] sm:rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 blur-sm pointer-events-none",
                      item.glow,
                    )}
                  />

                  <div className="relative h-full bg-white rounded-[2rem] sm:rounded-[2.3rem] p-6 sm:p-8 lg:p-10 border border-slate-100 flex flex-col items-start transition-all duration-300 group-hover:border-transparent group-hover:shadow-xl group-hover:shadow-blue-900/5">
                    {/* Icon Box: Smaller on mobile */}
                    <div
                      className={cn(
                        "mb-6 sm:mb-8 w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm",
                        item.lightAccent,
                      )}
                    >
                      <Icon
                        size={26}
                        className={item.accent.replace("bg-", "text-")}
                      />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 flex-grow">
                      {item.desc}
                    </p>

                    <button className="flex items-center gap-2 font-bold text-slate-900 group/btn mt-auto py-2">
                      <span className="text-sm sm:text-base border-b-2 border-transparent group-hover/btn:border-blue-600 transition-all">
                        Explore Resources
                      </span>
                      <ArrowRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </m.div>
              );
            })}
          </m.div>

          {/* Bottom Trust Badge: Now uses flexible layout for mobile wrapping */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 sm:mt-20 flex flex-col items-center"
          >
            <p className="w-full text-center text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
              Our Methodology Aligns With
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="font-black text-lg sm:text-2xl whitespace-nowrap">
                British Council
              </span>
              <span className="font-black text-lg sm:text-2xl whitespace-nowrap">
                IDP IELTS
              </span>
              <span className="font-black text-lg sm:text-2xl whitespace-nowrap">
                Cambridge English
              </span>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
