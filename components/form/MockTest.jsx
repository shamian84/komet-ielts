"use client";

import React, { useState } from "react";
import { ClipboardCheck, Phone, User, Loader2, Award } from "lucide-react";

export default function MockTestForm({ onCustomSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow digits only for phone
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading || !isValid) return;

    setLoading(true);

    onCustomSubmit?.({
      name: formData.name.trim(),
      phone: formData.phone,
    });

    // Loader safety reset
    setTimeout(() => setLoading(false), 1200);
  };

  const isValid =
    formData.name.trim().length >= 2 && formData.phone.length === 10;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 sm:p-4 space-y-4 w-full max-w-md mx-auto"
      noValidate
    >
      {/* Header */}
      <div className="text-center mb-5">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
          Free IELTS Mock Test
        </h3>
        <p className="text-sm text-slate-500">
          Know your band score before booking IELTS
        </p>
      </div>

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 text-xs bg-blue-50 text-blue-700 py-2 px-3 rounded-xl font-semibold">
        <Award size={14} />
        IDP IELTS format · Examiner-aligned evaluation
      </div>

      {/* Name */}
      <div className="relative">
        <User
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          required
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600"
        />
      </div>

      {/* Phone */}
      <div className="relative">
        <Phone
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          required
          type="tel"
          name="phone"
          placeholder="WhatsApp Number"
          maxLength={10}
          value={formData.phone}
          onChange={handleChange}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || loading}
        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl
          ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }
        `}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Opening WhatsApp…
          </>
        ) : (
          <>
            <ClipboardCheck size={18} />
            Confirm & Chat on WhatsApp
          </>
        )}
      </button>

      {/* Footer */}
      <p className="text-[11px] text-center text-slate-500">
        ✔ Direct WhatsApp chat · Time slot guidance · No spam
      </p>
    </form>
  );
}
