"use client";

import React, { useState, useEffect } from "react";
// Optimized: Using 'm' for a significantly smaller mobile bundle
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import {
  X,
  ChevronRight,
  ArrowRightCircle,
  LayoutGrid,
  ClipboardCheck,
  Search,
  BookOpen,
  MapPin,
  FileText,
  Calendar,
  LineChart,
  GraduationCap,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const CTA_DATA = [
  {
    section: "Basics",
    items: [
      {
        label: "Explore IELTS with an Expert",
        icon: <Search size={18} />,
        href: "/ielts/expert-page",
      },
      {
        label: "Take a Free Readiness Test",
        icon: <ClipboardCheck size={18} />,
        href: "/mock-test/#reading",
      },
      {
        label: "Find Which IELTS You Need",
        icon: <LayoutGrid size={18} />,
        href: "/#ielts-type",
      },
    ],
  },
  {
    section: "Practice",
    items: [
      {
        label: "Full-Length Mock Test",
        icon: <BookOpen size={18} />,
        href: "/mock-test/#full-mock-test",
      },
      {
        label: "Get Expected Band Score",
        icon: <LineChart size={18} />,
        href: "/ielts/bandscore",
      },
      {
        label: "Access Free Mock Paper",
        icon: <FileText size={18} />,
        href: "/Mock_Test_Full_Paper.pdf",
        download: true,
      },
      {
        label: "Begin Training with Komet",
        icon: <GraduationCap size={18} />,
        href: "/services",
      },
    ],
  },
  {
    section: "Planning",
    items: [
      {
        label: "Check Nearest Exam Center",
        icon: <MapPin size={18} />,
        href: "/ielts/exam-center",
      },
      {
        label: "Check Test Dates",
        icon: <Calendar size={18} />,
        href: "/ielts/test-dates",
      },
      {
        label: "Guidance Before Booking",
        icon: <MessageSquare size={18} />,
        href: "/ielts/guidance",
      },
      {
        label: "Personalised Study Plan",
        icon: <ArrowRightCircle size={18} />,
        href: "/personalized-study-plan",
      },
    ],
  },
];

export default function HeroCTA() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section id="home-cta" className="relative">
        {/* Floating Toggle Button - Optimized with GPU transform */}
        <m.button
          onClick={() => setIsOpen(true)}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", damping: 20 }}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-[40] bg-blue-600 text-white py-5 px-2.5 rounded-l-2xl shadow-xl flex flex-col items-center gap-3 cursor-pointer group hover:bg-blue-700 transition-colors transform-gpu"
          aria-label="Open Quick Actions"
        >
          <LayoutGrid
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.2em] select-none">
            Quick Actions
          </span>
        </m.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop - Opacity optimized */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[9998]"
              />

              {/* Drawer - Hardware Accelerated */}
              <m.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 35, stiffness: 400 }}
                className="fixed right-0 top-0 h-full w-full max-w-[380px] bg-white z-[9999] shadow-2xl flex flex-col transform-gpu"
                style={{ translateZ: 0 }}
              >
                {/* Header */}
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-black text-xl text-slate-800 tracking-tight">
                      Quick Actions
                    </h3>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wide">
                      IELTS Roadmap
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 cursor-pointer hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* List Content - Content Visibility optimization */}
                <div className="flex-1 overflow-y-auto p-5 space-y-7 custom-scrollbar">
                  {CTA_DATA.map((group, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-4 h-[2px] bg-blue-600 rounded-full" />
                        {group.section}
                      </h4>
                      <div className="grid gap-1">
                        {group.items.map((item, i) => {
                          const itemClass =
                            "flex items-center justify-between w-full p-3.5 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all group active:scale-[0.98]";

                          const content = (
                            <div className="flex items-center gap-3">
                              <span className="text-slate-400 group-hover:text-blue-600 transition-colors">
                                {item.icon}
                              </span>
                              <span className="text-[13px] font-bold text-slate-700 group-hover:text-blue-900">
                                {item.label}
                              </span>
                            </div>
                          );

                          return item.download ? (
                            <a
                              key={i}
                              href={item.href}
                              download
                              className={itemClass}
                              onClick={() => setIsOpen(false)}
                            >
                              {content}
                              <ChevronRight
                                size={14}
                                className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                              />
                            </a>
                          ) : (
                            <Link
                              key={i}
                              href={item.href}
                              className={itemClass}
                              onClick={() => setIsOpen(false)}
                            >
                              {content}
                              <ChevronRight
                                size={14}
                                className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer CTA - Modern Shadow Button */}
                <div className="p-6 bg-white border-t border-slate-100">
                  <Link
                    href="/book-consultation"
                    onClick={() => setIsOpen(false)}
                  >
                    <button className="w-full py-4.5 bg-blue-600 rounded-2xl text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.96] flex items-center justify-center gap-2 transform-gpu cursor-pointer">
                      Book Expert Consultation <ArrowRightCircle size={18} />
                    </button>
                  </Link>
                </div>
              </m.div>
            </>
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  );
}
