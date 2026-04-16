'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, QrCode, Server, Sparkles, Smartphone } from 'lucide-react';

export default function SupportPage() {
  // 1. UPI DETAILS
  const upiId = "9398357622@axl"; 
  const payeeName = "ArchPath AI"; 
  
  // 2. THE UPI DEEP LINK PROTOCOL
  // This tells Android/iOS to open payment apps directly
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR`;

  // 3. FREE QR CODE GENERATOR API
  // This generates a QR code image on the fly without needing a backend
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center p-4 py-16">
        <div className="max-w-2xl mx-auto w-full">
          
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-emerald-50 text-emerald-600 rounded-full mb-4">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
              Keep ArchPath Free
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto">
              ArchPath is built by a student developer in India. We don't run ads or sell data. If this tool helped you, consider chipping in to cover the Groq API and Vercel server costs.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm space-y-8">
            <h2 className="text-xl font-bold text-zinc-900 text-center border-b border-zinc-100 pb-4">Where your contribution goes:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4 items-start p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <Sparkles className="w-6 h-6 text-indigo-600 shrink-0" />
                <div>
                  <h3 className="font-semibold text-zinc-900">AI Inference Costs</h3>
                  <p className="text-sm text-zinc-500 mt-1">Paying for Groq Cloud API tokens to generate roadmaps in milliseconds.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <Server className="w-6 h-6 text-cyan-600 shrink-0" />
                <div>
                  <h3 className="font-semibold text-zinc-900">Infrastructure</h3>
                  <p className="text-sm text-zinc-500 mt-1">Database hosting on Supabase and keeping the platform ad-free.</p>
                </div>
              </div>
            </div>

            {/* THE UPI PAYMENT SECTION */}
            <div className="pt-8 flex flex-col items-center gap-6 bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
              <div className="text-center space-y-2">
                <h3 className="font-bold text-zinc-900 flex items-center justify-center gap-2">
                  <QrCode className="w-5 h-5 text-zinc-500" />
                  Scan to Pay via UPI
                </h3>
                <p className="text-sm text-zinc-500">Zero fees. 100% goes directly to server costs.</p>
              </div>

              {/* Dynamic QR Code */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
                <Image 
                  src={qrCodeUrl} 
                  alt="UPI QR Code" 
                  width={200} 
                  height={200}
                  className="rounded-lg"
                />
              </div>

              <div className="text-zinc-400 font-medium text-sm">OR</div>

              {/* Deep Link Button (Works magically on Mobile) */}
              <a href={upiLink} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 font-bold text-lg h-14 px-8 rounded-full shadow-md transition-all">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Pay using UPI App
                </Button>
              </a>
              <p className="text-xs font-mono text-zinc-500 bg-zinc-100 px-3 py-1 rounded-md">
                UPI ID: {upiId}
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
