import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles, Map, Bot, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* 1. Global Navigation */}
      <NavBar />

      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative px-4 py-24 md:py-32 max-w-6xl mx-auto flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-600 text-sm font-semibold backdrop-blur-sm shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Llama 3.1 & Groq</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 max-w-4xl">
            Architect your future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">AI precision.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl leading-relaxed">
            Stop guessing. Generate personalized, real-time career roadmaps based on your major, interests, and current industry demands in milliseconds.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/generator">
              <Button size="lg" className="bg-black text-white hover:bg-zinc-800 rounded-full px-8 h-12 text-base shadow-lg shadow-zinc-200">
                Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-24 bg-white/40 border-t border-zinc-200/50 backdrop-blur-md">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <Map className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Dynamic Roadmaps</h3>
              <p className="text-zinc-500 leading-relaxed">
                Instantly generate step-by-step master plans tailored exactly to your field of study and current academic level.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-6">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Context-Aware Mentor</h3>
              <p className="text-zinc-500 leading-relaxed">
                Chat directly with your career architect. It knows your generated roadmap and can provide specific free resources and links.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-900 mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Blazing Fast Engine</h3>
              <p className="text-zinc-500 leading-relaxed">
                Powered by the Groq LPU engine, generating complex JSON career structures and context-aware responses in literal milliseconds.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* 3. Global Footer */}
      <Footer />
    </div>
  );
}