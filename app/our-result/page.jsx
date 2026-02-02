/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef, useState, useMemo, memo, useCallback } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- ICONS ---
import GraduationCap from "lucide-react/dist/esm/icons/graduation-cap";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Search from "lucide-react/dist/esm/icons/search";
import Zap from "lucide-react/dist/esm/icons/zap";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Download from "lucide-react/dist/esm/icons/download";

const cn = (...classes) => classes.filter(Boolean).join(" ");

/* ================= DATA (Now with Images) ================= */
const ALUMNI = [
  {
    name: "Abhijet Upadhya",
    score: "8.5",
    // image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhijet", // Replace with real paths like /alumni/abhijet.jpg
    university: "N/A",
    country: "N/A",
    status: "N/A",
    category: "N/A",
    color: "#10b981",
  },
  {
    name: "Renu Arvind",
    score: "8.0",
    // image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Renu",
    university: "N/A",
    country: "N/A",
    status: "N/A",
    category: "N/A",
    color: "#3b82f6",
  },
  {
    name: "Shambhavi Malik",
    score: "8.5",
    // image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shambhavi",
    university: "N/A",
    country: "N/A",
    status: "N/A",
    category: "N/A",
    color: "#8b5cf6",
  },
  {
    name: "Priyanka Soni",
    score: "8.0",
    // image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priyanka",
    university: "N/A",
    country: "N/A",
    status: "N/A",
    category: "N/A",
    color: "#f59e0b",
  },
  {
    name: "Shreyas Joshi",
    score: "8.0",
    // image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shreyas",
    university: "N/A",
    country: "N/A",
    status: "N/A",
    category: "N/A",
    color: "#ec4899",
  },
  {
    name: "Harkaran Singh",
    score: "8.0",
    // image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harkaran",
    university: "N/A",
    country: "N/A",
    status: "N/A",
    category: "N/A",
    color: "#06b6d4",
  },
];

/* ================= COMPONENTS ================= */

const SuccessCard = memo(({ data, index }) => (
  <m.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="relative group cursor-pointer"
  >
    {/* Dynamic Glow */}
    <div
      className="absolute inset-0 rounded-[2.5rem] blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 transform-gpu"
      style={{ backgroundColor: data.color }}
    />

    <div className="relative h-full bg-[#050914] border border-white/5 p-8 rounded-[2.5rem] overflow-hidden group-hover:border-white/20 transition-colors duration-500">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay" />

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="flex items-center gap-4">
          {/* PHOTO CONTAINER */}
          {/* <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div> */}
          <div>
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border",
                data.category === "Academic"
                  ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                  : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
              )}
            >
              {data.category}
            </span>
            <h3 className="text-xl font-black text-white leading-none tracking-tight">
              {data.name}
            </h3>
          </div>
        </div>

        <div className="relative px-4 py-2 flex items-center justify-center bg-white/5 rounded-xl border border-white/5">
          <span className="text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
            {data.score}
          </span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <GraduationCap size={16} className="text-slate-400" />
          <p className="text-sm font-bold text-slate-200 truncate">
            {data.university}
          </p>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <MapPin size={16} className="text-slate-400" />
          <p className="text-sm font-bold text-slate-200">{data.country}</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-500" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {data.status}
          </span>
        </div>
        <ArrowUpRight
          size={18}
          className="text-slate-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
        />
      </div>
    </div>
  </m.div>
));

SuccessCard.displayName = "SuccessCard";

export default function BeyondLimitsResults() {
  const container = useRef(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), {
    stiffness: 50,
    damping: 20,
  });

  const filteredData = useMemo(() => {
    return ALUMNI.filter((item) => {
      const matchesFilter = filter === "All" || item.category === filter;
      const matchesSearch =
        item.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm]);

  const handleDownloadReport = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/BeyondLimits_Full_Results_2026.pdf"; // Ensure this is in /public
    link.download = "BeyondLimits_Full_Results_2026.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={container}
        className="min-h-screen bg-[#02040a] relative text-white selection:bg-blue-500/30 overflow-x-hidden"
      >
        <Navbar />

        {/* PARALLAX BACKGROUND TEXT */}
        <div className="fixed top-20 left-0 w-full flex items-center justify-center pointer-events-none z-0 opacity-20 mix-blend-screen overflow-hidden">
          <m.h2
            style={{ x }}
            className="text-[20vw] font-black text-white/[0.05] whitespace-nowrap leading-none select-none uppercase transform-gpu"
          >
            Excellence Verified
          </m.h2>
        </div>

        <main className="relative pt-32 md:pt-40 pb-40 z-10 max-w-7xl mx-auto px-6">
          {/* HERO HEADER */}
          <section className="flex flex-col items-start justify-center mb-24">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                <Zap size={14} className="fill-blue-400" /> Live Ledger 2026
              </div>
              <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-8 uppercase">
                CRACKED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 italic font-serif">
                  The Code.
                </span>
              </h1>
            </m.div>
          </section>

          {/* CONTROL BAR */}
          <section className="sticky top-24 z-30 mb-12">
            <div className="bg-[#050914]/80 backdrop-blur-xl border border-white/10 p-2 md:p-4 rounded-3xl flex flex-col md:flex-row gap-4 items-center shadow-2xl">
              <div className="flex p-1 bg-white/5 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
                {["All", "Academic", "General"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={cn(
                      "flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer",
                      filter === tab
                        ? "bg-blue-600 text-white"
                        : "text-slate-500 hover:text-white",
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:flex-1">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search university or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-white placeholder:text-slate-600 outline-none"
                />
              </div>
            </div>
          </section>

          {/* RESULTS GRID */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            <AnimatePresence mode="popLayout">
              {filteredData.map((person, i) => (
                <SuccessCard key={person.name} data={person} index={i} />
              ))}
            </AnimatePresence>
          </section>

          {/* DOWNLOAD FULL RESULTS CTA */}
          <m.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 relative overflow-hidden rounded-[3rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 p-8 md:p-16 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
              Access the full <br />{" "}
              <span className="text-blue-500 italic">Success Ledger.</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-10 text-sm md:text-base font-medium">
              Get the comprehensive 2026 alumni report featuring over 1,200
              detailed success stories, score breakdowns, and university offer
              letters.
            </p>

            <m.button
              whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-500/10 cursor-pointer"
            >
              <Download size={18} />
              Download Full Result PDF
            </m.button>
          </m.section>

          {/* STATS FOOTER */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { l: "Success Rate", v: "99.2%" },
              { l: "Avg Band", v: "8.0" },
              { l: "Visa Ratio", v: "1:1" },
              { l: "Global Alumni", v: "12k+" },
            ].map((s, i) => (
              <div
                key={i}
                className="p-8 border-white/5 bg-white/[0.01] rounded-[2rem] text-center border transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="text-3xl md:text-4xl font-black mb-2 tracking-tighter text-white">
                  {s.v}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {s.l}
                </div>
              </div>
            ))}
          </section>
        </main>
        <Footer />
      </div>
    </LazyMotion>
  );
}
