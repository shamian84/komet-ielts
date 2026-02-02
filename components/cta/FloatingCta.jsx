"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

import MockTestForm from "../form/MockTest";
import ContactForm from "../form/ContactForm";
import { openWhatsApp } from "../utils/WhatsApp";

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);

  /* Close modal on ESC key */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  /* Central WhatsApp handler with Toast feedback */
  const handleSubmit = useCallback((message) => {
    toast.success("Opening WhatsApp...", {
      style: { fontWeight: 600, borderRadius: "12px" },
    });

    setTimeout(() => {
      openWhatsApp(message);
      setModal(null);
      setOpen(false);
    }, 900);
  }, []);

  return (
    <>
      {/* Toast notifications at top-center */}
      <Toaster
        position="top-right"
        containerStyle={{
          top: 100,
          right: 20,
        }}
      />

      {/* ================= MODAL OVERLAY & CONTENT ================= */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.96, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 30 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 z-[160]"
            >
              <button
                onClick={() => setModal(null)}
                className="cursor-pointer absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {modal === "mock" ? (
                <MockTestForm
                  onCustomSubmit={(data) =>
                    handleSubmit(
                      `*FREE IELTS MOCK TEST*\n\nName: ${data.name}\nPhone: ${data.phone}\n\nI would like to know:\n• Available mock test time slots\n• Test duration & format\n• Result delivery timeline`,
                    )
                  }
                />
              ) : (
                <ContactForm
                  onCustomSubmit={(data) =>
                    handleSubmit(
                      `*IELTS ENQUIRY*\n\nName: ${data.name}\nMessage: ${data.message}\n\nPlease guide me further.`,
                    )
                  }
                />
              )}
            </motion.div>

            {/* Backdrop for the modal */}
            <div
              onClick={() => setModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLOATING BUTTON & OPTIONS ================= */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end gap-3">
        {/* POP-UP OPTIONS */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="flex flex-col gap-3 mb-2 w-full max-w-[90vw] sm:max-w-xs"
            >
              <CTAOption
                label="Free IELTS Mock Test"
                sub="Know your band score"
                onClick={() => setModal("mock")}
              />
              <CTAOption
                label="Chat on WhatsApp"
                sub="Talk to an IELTS expert"
                onClick={() => setModal("contact")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN TOGGLE BUTTON */}
        <div className="relative flex items-center gap-3">
          {!open && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute -top-8 -left-10 sm:-left-16 bg-white text-xs font-semibold text-slate-700 px-3 py-1 rounded-full shadow-md whitespace-nowrap pointer-events-none border border-slate-100"
            >
              Chat with us
            </motion.span>
          )}

          <motion.button
            onClick={() => setOpen((p) => !p)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-2xl flex items-center justify-center border-2 border-white/20"
            aria-label="WhatsApp CTA"
          >
            {open ? (
              <X size={24} className="text-white" />
            ) : (
              <FaWhatsapp size={28} className="text-white" />
            )}
          </motion.button>
        </div>
      </div>
    </>
  );
}

/* ================= OPTION BUTTON COMPONENT ================= */

function CTAOption({ label, sub, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer flex items-center gap-4 bg-white shadow-xl px-4 sm:px-5 py-3 sm:py-4 rounded-2xl hover:bg-green-50 border border-slate-100 transition-all w-full text-left"
    >
      <div className="w-11 h-11 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-sm">
        <FaWhatsapp size={20} />
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-bold text-slate-800 leading-tight">
          {label}
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
      </div>
    </button>
  );
}
