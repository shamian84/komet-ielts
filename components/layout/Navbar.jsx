"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// --- DATA ---
const EXAM_GUIDES = [
  {
    title: "Reading",
    desc: "Accuracy & speed strategies",
    href: "/ielts-exam-guide#reading",
  },
  {
    title: "Writing",
    desc: "Band-aligned structure",
    href: "/ielts-exam-guide#writing",
  },
  {
    title: "Listening",
    desc: "Answer-mapping skills",
    href: "/ielts-exam-guide#listening",
  },
  {
    title: "Speaking",
    desc: "Fluency & confidence",
    href: "/ielts-exam-guide#speaking",
  },
];

const SERVICES = [
  { title: "IELTS Training", href: "/ielts-training" },
  { title: "Free Mock Tests", href: "/mock-test" },
  { title: "Writing Evaluation", href: "/services#writing" },
  { title: "Speaking Practice", href: "/services#speaking" },
  { title: "Visa Guidance", href: "/visa-guidance" },
];

// --- SUB-COMPONENTS ---
const NavLink = memo(({ text, href }) => (
  <Link
    href={href}
    prefetch={true}
    className="px-4 py-2 font-bold text-slate-600 hover:text-blue-600 transition-colors text-sm rounded-lg hover:bg-blue-50/50 whitespace-nowrap"
  >
    {text}
  </Link>
));
NavLink.displayName = "NavLink";

const DropdownItem = memo(({ title, desc, href }) => (
  <Link
    href={href}
    prefetch={true}
    className="block p-3 rounded-xl hover:bg-blue-50 transition-all group/item cursor-pointer"
  >
    <p className="font-bold text-slate-900 group-hover/item:text-blue-600 text-sm">
      {title}
    </p>
    {desc && (
      <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{desc}</p>
    )}
  </Link>
));
DropdownItem.displayName = "DropdownItem";

// Optimized Desktop Dropdown: Click navigates, Hover shows menu
const DesktopDropdown = memo(({ title, href, items }) => (
  <div className="relative group px-1">
    <Link
      href={href}
      prefetch={true}
      className="flex items-center gap-1 px-4 py-2 font-bold text-slate-600 group-hover:text-blue-600 transition-colors text-sm rounded-lg group-hover:bg-blue-50/50"
    >
      {title}
      <ChevronDown
        size={14}
        className="group-hover:rotate-180 transition-transform duration-300"
      />
    </Link>
    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
      <div className="bg-white shadow-xl rounded-2xl border border-slate-100 p-2 w-64">
        {items.map((item, idx) => (
          <DropdownItem key={idx} {...item} />
        ))}
      </div>
    </div>
  </div>
));
DesktopDropdown.displayName = "DesktopDropdown";

// Optimized Mobile Accordion: Text navigates, Chevron toggles
const MobileAccordion = memo(
  ({ title, href, isOpen, onToggle, items, onClose }) => (
    <div className="py-1 border-b border-slate-50 last:border-0">
      <div className="flex items-center justify-between">
        <Link
          href={href}
          prefetch={true}
          onClick={onClose}
          className="flex-1 py-4 text-lg font-bold text-slate-800"
        >
          {title}
        </Link>
        <button
          onClick={onToggle}
          className="p-4 -mr-4 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ChevronDown
            size={22}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : ""}`}
          />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden flex flex-col gap-1 pb-4"
          >
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                onClick={onClose}
                className="block py-3 px-4 text-base font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border-l-2 border-transparent hover:border-blue-600"
              >
                {item.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ),
);
MobileAccordion.displayName = "MobileAccordion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[50] w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
            : "bg-white py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0 group shrink-0">
            {/* 1. Reduced width from w-32 to w-12 to fit the icon tightly */}
            <div className="relative h-10 w-12">
              <Image
                src="/KometLogo.webp"
                alt="Komet Logo"
                fill
                priority
                className="object-contain object-left rounded-3xl mr-3" // 2. Force image to stick to the left
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* 3. Added a small negative margin or tight tracking if needed */}
            <span className="text-2xl font-black tracking-tighter text-blue-600 uppercase italic ml-1">
              Komet
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            <DesktopDropdown
              title="Exam Guide"
              href="/ielts-exam-guide"
              prefetch={true}
              items={EXAM_GUIDES}
            />
            <NavLink text="Training Method" href="/#komet-training" />
            <NavLink text="Our Results" href="/our-result" />
            <DesktopDropdown
              title="Services"
              href="/services"
              prefetch={true}
              items={SERVICES}
            />
          </nav>
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Link href="/mock-test" prefetch={true}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 rounded-xl border-2 border-blue-600 text-blue-600 font-bold text-sm bg-white hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Free Mock Test
              </motion.button>
            </Link>
            <Link href="/book-consultation" prefetch={true}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 text-sm transition-all cursor-pointer"
              >
                Book Consultation
              </motion.button>
            </Link>
          </div>
          <button
            className="lg:hidden p-2 text-slate-900 bg-slate-50 rounded-lg cursor-pointer"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[100%] max-w-sm bg-white z-[100] flex flex-col shadow-2xl"
            >
              <div className="h-20 px-6 flex items-center justify-between">
                <span className="font-black text-2xl text-blue-600 italic uppercase">
                  Komet
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 bg-slate-100 cursor-pointer rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-2">
                <MobileAccordion
                  title="Exam Guide"
                  href="/ielts-exam-guide"
                  isOpen={openAccordion === "guide"}
                  onToggle={() =>
                    setOpenAccordion(openAccordion === "guide" ? null : "guide")
                  }
                  items={EXAM_GUIDES}
                  onClose={() => setMobileOpen(false)}
                />

                <Link
                  href="/#komet-training"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-5 text-lg font-bold text-slate-800 border-b border-slate-50"
                >
                  Training Method{" "}
                  <ArrowRight size={18} className="text-blue-600" />
                </Link>

                <Link
                  href="/our-result"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-5 text-lg font-bold text-slate-800 border-b border-slate-50"
                >
                  Our Results <ArrowRight size={18} className="text-blue-600" />
                </Link>

                <MobileAccordion
                  title="Services"
                  href="/services"
                  isOpen={openAccordion === "services"}
                  onToggle={() =>
                    setOpenAccordion(
                      openAccordion === "services" ? null : "services",
                    )
                  }
                  items={SERVICES}
                  onClose={() => setMobileOpen(false)}
                />
              </div>

              <div className="p-6 bg-slate-50 space-y-3">
                <Link
                  href="/mock-test"
                  onClick={() => setMobileOpen(false)}
                  className="block"
                >
                  <button className="w-full py-3.5 rounded-xl border-2 border-blue-600 text-blue-600 font-bold cursor-pointer bg-white">
                    Free Mock Test
                  </button>
                </Link>
                <Link
                  href="/book-consultation"
                  onClick={() => setMobileOpen(false)}
                  className="block"
                >
                  <button className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg cursor-pointer">
                    Book Consultation
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
