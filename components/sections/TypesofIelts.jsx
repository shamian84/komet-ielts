"use client";

import React, { useMemo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { GraduationCap, Briefcase, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function TypesOfIELTS() {
  const variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
          ease: [0.21, 0.47, 0.32, 0.98],
        },
      }),
    }),
    [],
  );

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="py-16 sm:py-24 bg-slate-50 overflow-hidden"
        style={{ contentVisibility: "auto" }}
        id="ielts-type"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          {/* Header */}
          <m.div
            initial="hidden"
            whileInView="visible"
            variants={variants}
            custom={0}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 sm:mb-16 transform-gpu"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-[1.1]">
              Which IELTS is <span className="text-blue-600">for you?</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
              Choosing the right module is the first step toward your global
              goals. Select the one that matches your purpose.
            </p>
          </m.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Academic Card */}
            <m.div
              initial="hidden"
              whileInView="visible"
              variants={variants}
              custom={1}
              viewport={{ once: true, amount: 0.2 }}
              className="group bg-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 md:p-12 shadow-xl shadow-slate-200/60 border border-white relative overflow-hidden transition-all transform-gpu will-change-transform md:hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-blue-50 rounded-bl-[80px] sm:rounded-bl-[120px] -z-0 transition-transform group-hover:scale-110 duration-700 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-white mb-6 sm:mb-8 shadow-xl shadow-blue-600/40 transform-gpu group-hover:rotate-6 transition-transform duration-500">
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  Academic
                </h3>
                <p className="text-blue-600 font-bold uppercase tracking-wider text-[10px] sm:text-xs mb-4 sm:mb-6">
                  For Higher Education
                </p>
                <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base md:text-lg">
                  Take this test if you want to study at a university level
                  (UG/PG) anywhere in the world.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    "University Admission",
                    "Professional Registration",
                    "Academic Research",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 sm:gap-4 text-slate-700 font-bold"
                    >
                      <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                        <Check
                          className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-xs sm:text-sm md:text-base">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>

            {/* General Training Card */}
            <m.div
              initial="hidden"
              whileInView="visible"
              variants={variants}
              custom={2}
              viewport={{ once: true, amount: 0.2 }}
              className="group bg-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 md:p-12 shadow-xl shadow-slate-200/60 border border-white relative overflow-hidden transition-all transform-gpu will-change-transform md:hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-cyan-50 rounded-bl-[80px] sm:rounded-bl-[120px] -z-0 transition-transform group-hover:scale-110 duration-700 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-cyan-500 rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-white mb-6 sm:mb-8 shadow-xl shadow-cyan-500/40 transform-gpu group-hover:-rotate-6 transition-transform duration-500">
                  <Briefcase className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  General Training
                </h3>
                <p className="text-cyan-600 font-bold uppercase tracking-wider text-[10px] sm:text-xs mb-4 sm:mb-6">
                  For Work & Migration
                </p>
                <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base md:text-lg">
                  Take this test to work in an English-speaking country or
                  migrate to Canada/Australia/UK.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Migration / PR Status",
                    "Vocational Training",
                    "Secondary Education",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 sm:gap-4 text-slate-700 font-bold"
                    >
                      <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                        <Check
                          className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-xs sm:text-sm md:text-base">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>
          </div>

          {/* CTA Section */}
          <m.div
            initial="hidden"
            whileInView="visible"
            variants={variants}
            custom={3}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 text-center"
          >
            <Link
              href="/guidance"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-blue-600/40 group active:scale-95"
            >
              Book Free Guidance
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Link>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
