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
  title: "PathFinder AI | Career Architect",
  description: "AI-driven career roadmaps for students.",
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
