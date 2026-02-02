"use client";

import Link from "next/link";

import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

import { memo } from "react";

import Image from "next/image";
import { FaYoutube } from "react-icons/fa";

/* ===================== SUB COMPONENTS ===================== */

const FooterColumn = memo(({ title, children }) => (
  <div className="space-y-4">
    <h4 className="text-white font-semibold tracking-wide">{title}</h4>

    <nav className="flex flex-col gap-3">{children}</nav>
  </div>
));

FooterColumn.displayName = "FooterColumn";

const FooterLink = memo(({ href, children }) => (
  <Link
    href={href}
    prefetch={false}
    className="text-sm text-slate-300 hover:text-white transition-all duration-200 hover:translate-x-1 w-fit"
  >
    {children}
  </Link>
));

FooterLink.displayName = "FooterLink";

/* ===================== MAIN FOOTER ===================== */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const openEmail = () => {
    const email = "edukomet@gmail.com";

    window.location.href = `mailto:${email}`;

    setTimeout(() => {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,

        "_blank",
      );
    }, 300);
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* BRAND */}

          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="relative h-12 w-12">
                <Image
                  src="/KometLogo.webp"
                  alt="Komet Logo"
                  fill
                  priority
                  className="object-contain object-left rounded-3xl " // 2. Force image to stick to the left
                />
              </div>

              <span className="text-2xl font-black tracking-tighter text-white uppercase italic ml-1">
                Komet
              </span>
            </Link>

            <p className="text-sm text-slate-300 max-w-xs">
              Launch your global future with expert IELTS coaching and real mock
              tests.
            </p>

            {/* SOCIAL ICONS */}

            <div className="flex gap-3 pt-2">
              <SocialIcon
                href="https://www.instagram.com/kometstudyabroad"
                label="Instagram"
                gradient="from-pink-500 via-red-500 to-orange-400"
                icon={<Instagram size={18} />}
              />

              <SocialIcon
                href="https://facebook.com"
                label="Facebook"
                gradient="from-blue-700 to-indigo-600"
                icon={<Facebook size={18} />}
              />
              <SocialIcon
                href="https://youtube.com/@kometstudyabroad-2m857?si=NBZ4wIs9VYyFA8Qy"
                label="Youtube"
                gradient="from-red-700 to-red-600"
                icon={<FaYoutube size={18} />}
              />
            </div>
          </div>

          {/* LINKS */}

          <FooterColumn title="Quick Links">
            <FooterLink href="/">Home</FooterLink>

            <FooterLink href="/ielts-exam-guide/#reading">
              Reading Prep
            </FooterLink>

            <FooterLink href="/ielts-exam-guide/#writing">
              Writing Prep
            </FooterLink>

            <FooterLink href="/ielts-exam-guide/#listening">
              Listening Prep
            </FooterLink>

            <FooterLink href="/ielts-exam-guide/#speaking">
              Speaking Prep
            </FooterLink>
          </FooterColumn>

          <FooterColumn title="Services" prefetch={true}>
            <FooterLink href="/services/#training">IELTS Training</FooterLink>

            <FooterLink href="/book-mock-test">Free Mock Tests</FooterLink>

            <FooterLink href="/services#writing">Writing Evaluation</FooterLink>

            <FooterLink href="/services#speaking">Speaking Practice</FooterLink>
          </FooterColumn>

          {/* CONTACT */}

          <div className="space-y-4">
            <h4 className="text-white font-semibold tracking-wide">
              Contact Us
            </h4>

            <ContactButton icon={<Mail size={18} />} onClick={openEmail}>
              edukomet@gmail.com
            </ContactButton>

            <ContactButton
              icon={<Phone size={18} />}
              onClick={() => (window.location.href = "tel:+919644777267")}
            >
              +91 9644777267
            </ContactButton>

            <ContactButton
              icon={<MapPin size={18} />}
              onClick={() =>
                window.open(
                  "https://maps.app.goo.gl/TtYbpaQDXikMcy9HA",

                  "_blank",
                )
              }
            >
              Shankar Nagar, Raipur
            </ContactButton>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
          © {currentYear} Komet IELTS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ===================== HELPERS ===================== */

function ContactButton({ icon, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors duration-200"
    >
      <span className="text-blue-400">{icon}</span>

      {children}
    </button>
  );
}

function SocialIcon({ href, icon, gradient, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`h-10 w-10 rounded-full bg-gradient-to-tr ${gradient}

                  flex items-center justify-center text-white

                  shadow-lg hover:scale-110 active:scale-95

                  transition-all duration-200`}
    >
      {icon}
    </a>
  );
}
