"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { CalendarDays, Globe, CheckCircle2, MapPin, Info } from "lucide-react";

// Performance-optimized utility
const cn = (...classes) => classes.filter(Boolean).join(" ");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 100 },
  },
};

export default function TestDatesPage() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative py-16 sm:py-24 md:py-32 bg-white overflow-hidden">
        {/* Hardware Accelerated Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
          <div className="absolute top-[-5%] left-[-5%] w-[60%] sm:w-[40%] h-[40%] bg-blue-50 rounded-full blur-[80px] sm:blur-[120px] opacity-60" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[50%] sm:w-[30%] h-[30%] bg-indigo-50 rounded-full blur-[80px] sm:blur-[100px] opacity-50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 sm:mb-20 transform-gpu"
          >
            <m.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 mb-4 sm:mb-6 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 rounded-full"
            >
              Scheduling & Availability
            </m.span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight leading-[1.1]">
              Test Dates & <span className="text-blue-600">Global Centers</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed px-2">
              IELTS provides unparalleled flexibility with testing windows
              available nearly every week across a vast network of professional
              centers.
            </p>
          </m.div>

          {/* Cards Grid */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20"
          >
            {/* Card 1: Flexible Test Dates */}
            <m.div
              variants={cardVariants}
              className="group will-change-transform"
            >
              <div className="relative h-full bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 shadow-xl shadow-slate-200/40 transition-all duration-500 md:hover:-translate-y-2 md:hover:shadow-2xl md:hover:shadow-blue-200/30 overflow-hidden">
                {/* Background Icon (Hidden on small mobile for clarity) */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity hidden sm:block pointer-events-none">
                  <CalendarDays size={120} />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 sm:mb-8 shadow-lg shadow-blue-200 transform-gpu transition-transform group-hover:scale-105">
                    <CalendarDays className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 sm:mb-5 tracking-tight">
                    Flexible Windows
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                    With over <strong>48 test dates</strong> per year, you can
                    choose a schedule that aligns perfectly with your
                    preparation timeline.
                  </p>

                  {/* Icon Grid: Adapted for Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      "Up to 4 dates per month",
                      "Weekdays & Weekends",
                      "Computer-delivered",
                      "Paper-based versions",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 py-2.5 sm:py-3 px-4 bg-slate-50 rounded-xl border border-slate-100/50"
                      >
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>

            {/* Card 2: Global Centers */}
            <m.div
              variants={cardVariants}
              className="group will-change-transform"
            >
              <div className="relative h-full bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-2xl transition-all duration-500 md:hover:-translate-y-2 overflow-hidden">
                {/* Decorative map-like background - Transform GPU for performance */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] transform-gpu" />

                <div className="relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 sm:mb-8 border border-white/20 transform-gpu transition-transform group-hover:scale-105">
                    <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 sm:mb-5 tracking-tight">
                    Global Reach
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                    Access high-standard testing facilities in over{" "}
                    <strong>140 countries</strong>, ensuring you never have to
                    travel far.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-white/5 rounded-2xl border border-white/10 md:group-hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <p className="text-white font-black text-base sm:text-lg">
                          1,600+ Locations
                        </p>
                        <p className="text-slate-400 text-xs sm:text-sm">
                          Certified professional centers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-white/5 rounded-2xl border border-white/10 md:group-hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                        <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <p className="text-white font-black text-base sm:text-lg">
                          Easy Accessibility
                        </p>
                        <p className="text-slate-400 text-xs sm:text-sm">
                          Major cities & educational hubs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </m.div>

          {/* Quick Tip / Callout - Fully Fluid for Mobile */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-blue-50 border border-blue-100 flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 text-center md:text-left"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
              <Info className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-blue-900 text-base sm:text-lg mb-1">
                Expert Advice: Book Early
              </h4>
              <p className="text-blue-700/80 text-sm sm:text-base font-medium leading-relaxed">
                Popular test dates and centers can fill up 3–4 weeks in advance.
                We recommend booking your seat at least{" "}
                <strong>one month</strong> before your target deadline.
              </p>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
