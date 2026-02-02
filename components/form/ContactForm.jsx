"use client";

import React, { useState } from "react";
import { MessageSquare, Phone, User, Send, Loader2 } from "lucide-react";

export default function ContactForm({ onCustomSubmit }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow digits only for phone
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const payload = {
      name: form.name.trim(),
      phone: form.phone,
      message:
        form.message.trim() ||
        "I would like guidance regarding IELTS preparation and next steps.",
    };

    onCustomSubmit?.(payload);

    // Safety reset (parent handles redirect)
    setTimeout(() => setLoading(false), 1200);
  };

  const isValid = form.name.trim().length >= 2 && form.phone.length >= 10;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 sm:p-4 space-y-4 w-full max-w-md mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-5">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
          Quick Contact
        </h3>
        <p className="text-sm text-slate-500">
          We usually respond within 10 minutes
        </p>
      </div>

      {/* Trust Line */}
      <p className="text-xs text-center text-green-700 bg-green-50 py-2 rounded-xl font-semibold">
        ✔ Direct WhatsApp chat · No spam · No share screen
      </p>

      {/* Name */}
      <div className="relative">
        <User
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          required
          type="text"
          name="name"
          aria-label="Full Name"
          value={form.name}
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 outline-none
          focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all text-slate-800"
        />
      </div>

      {/* Phone */}
      <div className="relative">
        <Phone
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          required
          type="tel"
          name="phone"
          aria-label="WhatsApp Number"
          maxLength={10}
          value={form.phone}
          placeholder="WhatsApp Number"
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 outline-none
          focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all text-slate-800"
        />
      </div>

      {/* Message */}
      <div className="relative">
        <MessageSquare
          className="absolute left-4 top-4 text-slate-400"
          size={18}
        />
        <textarea
          name="message"
          aria-label="Message"
          value={form.message}
          placeholder="How can we help you? (optional)"
          onChange={handleChange}
          maxLength={300}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 outline-none
          focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all text-slate-800 resize-none min-h-[120px]"
        />
        <span className="absolute bottom-2 right-4 text-[10px] text-slate-400">
          {form.message.length}/300
        </span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || loading}
        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer
          ${
            isValid
              ? "bg-green-600 hover:bg-green-700 text-white shadow-green-200"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Opening WhatsApp…
          </>
        ) : (
          <>
            <Send size={18} />
            Send to WhatsApp
          </>
        )}
      </button>

      {/* Footer */}
      <p className="text-[11px] text-center text-slate-500">
        ✔ Your number is safe · We reply personally
      </p>
    </form>
  );
}
