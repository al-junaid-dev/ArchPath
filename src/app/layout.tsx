import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // CRITICAL: Helps Next.js generate absolute URLs for social sharing
  metadataBase: new URL('https://archpath.vercel.app'),
  
  title: {
    default: "ArchPath AI | Architect Your Future",
    template: "%s | ArchPath AI"
  },
  description: "Generate personalized, real-time career roadmaps using Llama 3.1 & Groq. Stop guessing and let AI architect your future.",
  keywords: ["Career Roadmap", "AI Career Coach", "Student Guidance", "Tech Careers", "ArchPath AI", "Career Architect"],
  
  // Google Search Console Verification
  verification: {
    google: "GQkgEX5BIUvZ-8RsOCrUi8MgRiOFR5-vF89DCDOZmdE",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://archpath.vercel.app/",
    siteName: "ArchPath AI",
    title: "ArchPath AI | Architect Your Future",
    description: "Generate personalized, real-time career roadmaps in milliseconds.",
    images: [
      {
        // FIX: Social platforms prefer PNG/JPG over SVG
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "ArchPath AI - Professional Career Architect"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ArchPath AI | Architect Your Future",
    description: "AI-driven career roadmaps for students.",
    images: ["/logo.png"], // Same PNG fix here
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className={`${inter.className} bg-gradient-to-br from-indigo-50 via-white to-cyan-50 bg-fixed bg-no-repeat min-h-screen text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900`}>
        {children}
        <Toaster position="top-center" richColors /> 
      </body>
    </html>
  );
}
