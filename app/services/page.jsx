/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import {
  ClipboardCheck,
  FileText,
  PenTool,
  Mic,
  GraduationCap,
  CheckCircle2,
  Star,
  ChevronRight,
  ArrowUpRight,
  Download,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: false,
});

/* ================= AMBIENT BACKGROUND ================= */
const AmbientBackground = memo(() => (
  <div
    className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    aria-hidden="true"
  >
    <div className="absolute top-[-20%] left-[-10%] w-[100vw] h-[100vw] bg-blue-600/10 rounded-full blur-[140px] will-change-transform transform-gpu" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-indigo-600/10 rounded-full blur-[120px] will-change-transform transform-gpu" />
  </div>
));
AmbientBackground.displayName = "AmbientBackground";

/* ================= DATA ================= */
const services = [
  {
    id: "training",
    title: "IELTS Training",
    desc: "Personalized coaching sessions designed to hit Band 7.5+ using proven templates and live feedback.",
    icon: ClipboardCheck,
    color: "from-blue-500 to-cyan-400",
    link: "/IELTS_Training_Guide.pdf",
    isDownload: true,
    // -------------------------------------------------------
  },
  {
    id: "mock-tests",
    title: "Free Mock Tests",
    desc: "Full-length simulations under real exam conditions with instant AI scoring and analytics.",
    icon: FileText,
    color: "from-emerald-400 to-teal-500",
    link: "/mock-test",
    isDownload: false,
  },
  {
    id: "writing",
    title: "Writing Evaluation",
    desc: "Detailed feedback on Task 1 & 2 from certified examiners within 24 hours to boost your score.",
    icon: PenTool,
    color: "from-purple-500 to-pink-500",
    link: "/ielts-exam-guide/#writing",
    isDownload: false,
  },
  {
    id: "speaking",
    title: "Speaking Practice",
    desc: "Live 1-on-1 mock interviews to eliminate hesitation and improve natural fluency.",
    icon: Mic,
    color: "from-orange-500 to-red-500",
    link: "/ielts-exam-guide/#speaking",
    isDownload: false,
  },
  {
    id: "visa",
    title: "Visa Guidance",
    desc: "Step-by-step assistance for university shortlisting and student visa filing for top countries.",
    icon: GraduationCap,
    color: "from-indigo-400 to-blue-600",
    // -------------------------------------------------------
    // TODO: Replace 'Visa_Guidance.pdf' with your actual file name in /public
    link: "/IELTS_Visa_Guidance.pdf",
    isDownload: true,
    // -------------------------------------------------------
  },
];

/* ================= SERVICE CARD ================= */
const ServiceCard = memo(({ service, index, isMobile }) => {
  const cardRef = useRef(null);
  const shouldReduce = useReducedMotion();
  const Icon = service.icon;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [isMobile],
  );

  // Common styling for both Link and Anchor tag
  const buttonClass =
    "group/btn inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-blue-500 w-fit outline-none cursor-pointer";

  return (
    <m.li
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="relative list-none group bg-[#0A101E]/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/40 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col h-full active:scale-[0.98] lg:active:scale-100"
    >
      {/* Interactive Shine Effect */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.1), transparent 40%)`,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/10`}
          >
            <Icon size={26} strokeWidth={2} />
          </div>
          <m.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="p-2 rounded-full bg-white/5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowUpRight size={20} />
          </m.div>
        </div>

        <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 grow font-medium">
          {service.desc}
        </p>

        {/* Conditional Rendering: Download Anchor vs Next Link */}
        {service.isDownload ? (
          <a
            href={service.link}
            download // This attribute triggers the download
            className={buttonClass}
          >
            Download PDF
            <Download
              size={14}
              className="group-hover/btn:translate-y-0.5 transition-transform"
            />
          </a>
        ) : (
          <Link href={service.link} className={buttonClass} prefetch={false}>
            Explore Service
            <ChevronRight
              size={14}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </Link>
        )}
      </div>
    </m.li>
  );
});
ServiceCard.displayName = "ServiceCard";

/* ================= MAIN PAGE ================= */
export default function ServicesPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#020611] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
        <Navbar />
        <AmbientBackground />

        <main className="relative pt-32 md:pt-48 pb-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header Section */}
            <header className="grid lg:grid-cols-2 gap-12 items-end mb-24 md:mb-32">
              <div className="space-y-8">
                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] border border-blue-500/20 shadow-sm"
                >
                  <Star size={12} className="fill-blue-400 animate-pulse" />{" "}
                  2026 Global Standard
                </m.div>

                <h1 className="text-5xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter">
                  Ecosystem of <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 italic font-serif">
                    Excellence.
                  </span>
                </h1>
              </div>

              <div className="lg:max-w-md lg:pb-4">
                <p className="text-slate-400 text-lg md:text-xl border-l-2 border-blue-500/30 pl-8 italic leading-relaxed font-medium">
                  We don&lsquo;t just prepare you for exams; we engineer your
                  transition to a global career through tech-driven training.
                </p>
              </div>
            </header>

            {/* Services Grid */}
            <m.ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-32">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  isMobile={isMobile}
                />
              ))}
            </m.ul>

            {/* Trust Section */}
            <m.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-16 rounded-[3.5rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 backdrop-blur-xl flex flex-wrap items-center justify-around gap-12"
            >
              <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
              {[
                { text: "Official Partner", brand: "IDP" },
                { text: "Certified Trainers", brand: "British Council" },
                { text: "Global Success", brand: "99.2% Rate" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center text-center gap-3"
                >
                  <div className="flex items-center gap-2 text-blue-500">
                    <CheckCircle2 size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {item.text}
                    </span>
                  </div>
                  <span className="text-xl md:text-2xl font-black text-white tracking-tight italic">
                    {item.brand}
                  </span>
                </div>
              ))}
            </m.section>
          </div>
        </main>

        <Footer />

        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap");

          body {
            font-family: "Plus Jakarta Sans", sans-serif;
            background-color: #020611;
          }

          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #020611;
          }
          ::-webkit-scrollbar-thumb {
            background: #1e293b;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #334155;
          }
        `}</style>
      </div>
    </LazyMotion>
  );
}
