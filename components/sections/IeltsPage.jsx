"use client";

import React from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { Globe, Users, Award, Briefcase } from "lucide-react";

/* ================= ANIMATION CONFIG ================= */
const fadeVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const features = [
  {
    icon: Globe,
    title: "Global Mobility",
    desc: "Your passport to working and living in English-speaking countries.",
  },
  {
    icon: Award,
    title: "Fair Assessment",
    desc: "You are assessed on practical communication skills, not just grammar.",
  },
  {
    icon: Users,
    title: "Face-to-Face",
    desc: "Speaking tests are done with a real human, not a computer AI.",
  },
  {
    icon: Briefcase,
    title: "Career Growth",
    desc: "Essential for professional registration in medical and legal fields.",
  },
];

export default function WhatIsIELTS() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="py-16 sm:py-24 md:py-32 bg-white overflow-hidden"
        style={{ contentVisibility: "auto" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side: Content */}
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeVariants}
              className="transform-gpu"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-black tracking-widest text-blue-700 uppercase bg-blue-50 rounded-full">
                Why IELTS?
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 sm:mb-8 tracking-tight">
                More than just an <br />
                <span className="text-blue-600">English Test.</span>
              </h2>

              <div className="space-y-4 sm:space-y-6 text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                <p>
                  The International English Language Testing System (IELTS) is
                  the world&apos;s most popular proficiency test for higher
                  education and global migration.
                </p>
                <p>
                  Developed by global experts, it tests the practical skills
                  needed for success in your new job or study placement abroad.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-10">
                <div className="bg-slate-50 p-5 sm:p-6 rounded-[1.5rem] sm:rounded-3xl border border-slate-100 transform-gpu transition-transform hover:scale-[1.02]">
                  <h4 className="text-2xl sm:text-4xl font-black text-blue-600 mb-1">
                    11K+
                  </h4>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Organizations
                  </p>
                </div>
                <div className="bg-slate-50 p-5 sm:p-6 rounded-[1.5rem] sm:rounded-3xl border border-slate-100 transform-gpu transition-transform hover:scale-[1.02]">
                  <h4 className="text-2xl sm:text-4xl font-black text-blue-600 mb-1">
                    3M+
                  </h4>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Annual Tests
                  </p>
                </div>
              </div>
            </m.div>

            {/* Right Side: Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {features.map((item, i) => (
                <m.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeVariants}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={shouldReduceMotion ? {} : { y: -8 }}
                  className="group p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-blue-200/20 hover:border-blue-200 transition-all duration-300 transform-gpu will-change-transform"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="font-black text-slate-900 text-lg sm:text-xl mb-2 sm:mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                    {item.desc}
                  </p>
                </m.div>
              ))}
            </div>
          </div>

          {/* Global Trust Visual Reference */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 sm:mt-24 pt-8 border-t border-slate-100"
          >
            <p className="text-center text-slate-400 text-xs sm:text-sm mt-6 font-medium">
              Trusted by governments and institutions in 140+ countries
            </p>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
