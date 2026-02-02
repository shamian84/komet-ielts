import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingCTA from "@/components/cta/FloatingCta";

// 1. Optimized Font Loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// 2. PRODUCTION DOMAIN CONFIG
// Replace with your actual deployed URL (e.g., https://kometielts.com)
const SITE_URL = "https:localhost:3000";

export const metadata = {
  title: {
    default: "Book a Strategy Session | Komet IELTS",
    template: "%s | Komet IELTS",
  },
  description:
    "Secure your Band 8.0+ roadmap with a 1-on-1 diagnostic session. Trusted by 2,500+ global students for IELTS and Visa success.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Book Your IELTS Consultation | Komet IELTS",
    description: "Personalized roadmap to your dream university.",
    url: SITE_URL,
    siteName: "Komet IELTS",
    images: [
      {
        // Use the full URL so social platforms can find the image
        url: `${SITE_URL}/KometLogo.webp`,
        width: 1200,
        height: 630,
        alt: "Komet IELTS Strategy Session",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Strategy Session | Komet IELTS",
    description: "Secure your Band 8.0+ roadmap.",
    images: [`${SITE_URL}/KometLogo.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#02040a] min-h-screen flex flex-col`}
      >
        {/* Main Content */}
        <div className="flex-grow">{children}</div>

        {/* Floating Components */}
        <FloatingCTA />
      </body>
    </html>
  );
}
