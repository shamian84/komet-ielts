"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, Star } from "lucide-react";
import homePage from "@/public/HomePage.webp";

export default function HeroSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="hero"
        className="relative pt-20 sm:pt-24 lg:pt-32 pb-12 mt-10 lg:pb-20 overflow-hidden bg-slate-50"
        aria-label="IELTS Coaching Hero Section"
      >
        {/* Background Pattern - Optimized as a simple div to reduce paint time */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            contentVisibility: "auto",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* LEFT CONTENT - Using 'm' for smaller JS footprint */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center lg:text-left transform-gpu"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-sm font-semibold mb-7">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
                </span>
                #1 Rated IELTS Coaching
              </div>

              {/* H1 - Optimized clamp */}
              <h1 className="font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 text-[clamp(2.3rem,7vw,4.5rem)]">
                Unlock Your <span className="block lg:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Global Potential
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-9 leading-relaxed">
                Master the IELTS with our data-driven curriculum. We transform
                language barriers into bridges for your international career.
              </p>

              {/* CTAs - Reduced Framer Motion usage on mobile buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/personalized-study-plan">
                  <m.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-7 py-4 rounded-xl bg-blue-600 text-white font-bold text-base sm:text-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Personalised Study Plan <Sparkles size={20} />
                  </m.button>
                </Link>

                <Link href="/book-consultation">
                  <button className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white text-slate-700 font-bold text-base sm:text-lg border border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer">
                    Book Consultation
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-9 flex flex-wrap justify-center lg:justify-start gap-5 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" />
                  10k+ Success Stories
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" />
                  Certified Trainers
                </div>
              </div>
            </m.div>

            {/* RIGHT IMAGE - Critical for Mobile LCP Score */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative transform-gpu"
              style={{ transform: "translateZ(0)" }} // Forces GPU acceleration
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-blue-400/20 blur-[60px] rounded-full -z-10"
              />

              <div className="relative rounded-[2.25rem] overflow-hidden shadow-2xl border-4 border-white">
                <div className="relative aspect-[4/3] sm:aspect-[7/5]">
                  <Image
                    src={homePage}
                    alt="Successful IELTS student"
                    fill
                    priority={true} // High priority
                    fetchPriority="high" // New browser hint
                    loading="eager" // Load immediately
                    decoding="async" // Decode without blocking main thread
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover"
                  />
                </div>

                {/* Floating Cards - Reduced animation complexity for mobile stability */}
                <m.div
                  className="hidden sm:block absolute top-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50"
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                      <Star fill="currentColor" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">
                        Target
                      </p>
                      <p className="text-slate-900 font-black text-xl italic">
                        Band 8.0+
                      </p>
                    </div>
                  </div>
                </m.div>

                <div className="hidden sm:block absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/50">
                  <p className="text-3xl font-bold text-blue-600 leading-none">
                    150+
                  </p>
                  <p className="text-sm font-medium text-slate-600 mt-1">
                    Students placed in 2025
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
