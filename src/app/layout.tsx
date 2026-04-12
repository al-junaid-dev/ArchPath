import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"; // Import Sonner

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: {
    default: "PathFinder AI | Architect Your Future",
    template: "%s | PathFinder AI" // Automatically appends your brand to sub-pages
  },
  description: "Generate personalized, real-time career roadmaps using Llama 3.1 & Groq. Stop guessing and let AI architect your future.",
  keywords: ["Career Roadmap", "AI Career Coach", "Student Guidance", "Tech Careers", "PathFinder AI"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pathfinder-al.vercel.app/",
    siteName: "PathFinder AI",
    title: "PathFinder AI | Architect Your Future",
    description: "Generate personalized, real-time career roadmaps in milliseconds.",
    images: [
      {
        url: "https://pathfinder-al.vercel.app/pathfinder.svg",
        width: 1200,
        height: 630,
        alt: "PathFinder AI Dashboard Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PathFinder AI",
    description: "AI-driven career roadmaps for students.",
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
