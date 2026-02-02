"use client";

import React, { memo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Home,
  Search,
  ChevronLeft,
  ShieldAlert,
  Map,
  Compass,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: false,
});

/* ================= BACKGROUND ANIMATION ================= */
const BackgroundScene = memo(() => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <m.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-5%] w-[120vw] h-[120vh] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]"
    />
    <div className="absolute inset-0 bg-[#020611]" />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  </div>
));
BackgroundScene.displayName = "BackgroundScene";

/* ================= MAIN COMPONENT ================= */
export default function NotFound() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#020611] text-white selection:bg-blue-500/30 overflow-x-hidden flex flex-col">
        <Navbar />
        <BackgroundScene />

        <main className="relative z-10 flex-grow flex items-center justify-center pt-32 pb-20 px-6">
          <div className="max-w-4xl w-full text-center">
            {/* Glitch 404 Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative inline-block mb-8"
            >
              <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 opacity-20 select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <m.div
                  animate={{
                    x: [-2, 2, -1, 1, 0],
                    opacity: [0.8, 1, 0.9, 1],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex flex-col items-center"
                >
                  <ShieldAlert
                    size={80}
                    className="text-blue-500 mb-4 animate-pulse"
                  />
                  <span className="text-xs font-black uppercase tracking-[0.5em] text-blue-400">
                    Signal Lost
                  </span>
                </m.div>
              </div>
            </m.div>

            {/* Error Message */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                This page has <br />
                <span className="italic font-serif text-blue-400">
                  ceased to exist.
                </span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto font-medium leading-relaxed">
                The content you&apos;re looking for was moved, deleted, or never
                existed in this dimension.
              </p>
            </m.div>

            {/* Navigation Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Link href="/" className="group">
                <m.div
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all text-left h-full"
                >
                  <Home className="text-blue-400 mb-4" size={24} />
                  <h3 className="font-black text-sm uppercase tracking-widest mb-2 text-white">
                    Return Home
                  </h3>
                  <p className="text-xs text-slate-500 font-bold flex items-center gap-2 group-hover:text-blue-300 transition-colors">
                    Back to Command <ArrowRight size={14} />
                  </p>
                </m.div>
              </Link>

              <Link href="/mock-test" className="group">
                <m.div
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all text-left h-full"
                >
                  <Compass className="text-indigo-400 mb-4" size={24} />
                  <h3 className="font-black text-sm uppercase tracking-widest mb-2 text-white">
                    Mock Portal
                  </h3>
                  <p className="text-xs text-slate-500 font-bold flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
                    Start Practice <ArrowRight size={14} />
                  </p>
                </m.div>
              </Link>

              <Link href="/personalized-study-plan" className="group">
                <m.div
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all text-left h-full"
                >
                  <Map className="text-emerald-400 mb-4" size={24} />
                  <h3 className="font-black text-sm uppercase tracking-widest mb-2 text-white">
                    Roadmaps
                  </h3>
                  <p className="text-xs text-slate-500 font-bold flex items-center gap-2 group-hover:text-emerald-300 transition-colors">
                    View Blueprint <ArrowRight size={14} />
                  </p>
                </m.div>
              </Link>
            </div>

            {/* Support Link */}
            <m.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2 mx-auto"
            >
              <Search size={12} /> Search the knowledge base
            </m.button>
          </div>
        </main>

        <Footer />

        <style jsx global>{`
          body {
            background-color: #020611;
          }
        `}</style>
      </div>
    </LazyMotion>
  );
}
