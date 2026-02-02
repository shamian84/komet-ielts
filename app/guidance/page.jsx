"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Zap,
  ChevronRight,
  ClipboardCheck,
  IdCard,
  Wallet,
  Globe,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

/* --- PROTOCOL DATA --- */
const PROTOCOL_STEPS = [
  {
    id: "01",
    title: "Document Verification",
    tag: "MANDATORY",
    status: "Priority",
    desc: "Original valid Passport required. Digital copies or Aadhar are not accepted at the testing node.",
    icon: <IdCard className="text-blue-400" />,
    requirements: [
      "Passport Validity > 6 Months",
      "Clear Signature Page",
      "Name Matches Exact Portal Data",
    ],
  },
  {
    id: "02",
    title: "Dimension Selection",
    tag: "STRATEGY",
    status: "Decision",
    desc: "Choose your module carefully based on your end destination (Study vs Migration).",
    icon: <Globe className="text-cyan-400" />,
    requirements: [
      "IELTS Academic (Study)",
      "IELTS General (Work)",
      "CD-IELTS (Faster Results)",
    ],
  },
  {
    id: "03",
    title: "Credit Authorization",
    tag: "FINANCIAL",
    status: "Secure",
    desc: "Test fees approx ₹17,000. Ensure international gateway is active on your bank node.",
    icon: <Wallet className="text-emerald-400" />,
    requirements: [
      "International Usage ON",
      "Limit > ₹20,000",
      "3D Secure OTP Enabled",
    ],
  },
];

export default function GuidanceProtocol() {
  const [activeTab, setActiveTab] = useState("checklist");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#060B18] text-white selection:bg-blue-500/40 font-sans">
        <main className="relative pt-24 md:pt-40 pb-32 overflow-x-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
            {/* Header Section */}
            <header className="text-center mb-12 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 border border-blue-500/20">
                  <ShieldCheck size={12} /> Portal Readiness Protocol
                </div>
                <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.85] uppercase italic">
                  Read Before <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    You Launch.
                  </span>
                </h1>
                <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base px-4 font-medium italic">
                  A single data mismatch can collapse your timeline. Follow the
                  pre-booking sequence below.
                </p>
              </motion.div>
            </header>

            {/* Quick Stats / Protocol HUD */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {[
                { label: "Exam Fee", val: "₹17,000*" },
                { label: "ID Req.", val: "Passport" },
                { label: "Node", val: "Raipur HQ" },
                { label: "Status", val: "Slots Open" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-900/50 border border-white/5 p-4 rounded-2xl text-center"
                >
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-sm font-bold text-blue-400">{stat.val}</p>
                </div>
              ))}
            </section>

            {/* Main Protocol Cards */}
            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence>
                {PROTOCOL_STEPS.map((step, idx) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group p-6 md:p-8 rounded-[2rem] border bg-slate-900/40 border-slate-800 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {/* Icon & ID */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-3xl font-black italic text-blue-500/50">
                          {step.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded uppercase tracking-widest">
                            {step.tag}
                          </span>
                          <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                            Protocol {step.id}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-tighter mb-3">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                          {step.desc}
                        </p>

                        {/* Requirement Pills */}
                        <div className="flex flex-wrap gap-2">
                          {step.requirements.map((req, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-white/5"
                            >
                              <ClipboardCheck
                                size={12}
                                className="text-blue-500"
                              />
                              <span className="text-[10px] md:text-xs font-bold text-slate-300">
                                {req}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Final Call to Action - Sticky for Mobile */}
            <div className="mt-16 text-center">
              <div className="inline-block p-1 rounded-2xl bg-slate-900 border border-slate-800 mb-8">
                <Link href="/book-consultation">
                  <button className="px-8 py-3 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20 cursor-pointer">
                    Initialize Booking <ChevronRight size={18} />
                  </button>
                </Link>
              </div>
              <p className="flex items-center justify-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <HelpCircle size={14} className="text-blue-500" /> Need Expert
                Guidance?{" "}
                <span className="text-white underline cursor-pointer">
                  Request Callback
                </span>
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
