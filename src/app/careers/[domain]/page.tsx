import { Metadata } from 'next';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Compass, Sparkles, Map } from 'lucide-react';
import SmartGenerateButton from '@/components/SmartGenerateButton';

type Props = {
  params: Promise<{ domain: string }>;
};

// 1. ADVANCED PROGRAMMATIC SEO METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain } = await params;
  // Converts "generative-ai-developer" to "Generative Ai Developer"
  const formattedDomain = domain.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const currentYear = new Date().getFullYear();
  
  return {
    title: `${formattedDomain} Career Roadmap (${currentYear} Step-by-Step Guide)`,
    description: `Want to become a ${formattedDomain}? Get a free, AI-generated step-by-step career roadmap tailored to your education and skills in ${currentYear}.`,
    alternates: {
      canonical: `https://archpath.vercel.app/careers/${domain}`,
    }
  };
}

// 2. PUBLIC LANDING PAGE (AEO & SEO OPTIMIZED)
export default async function CareerPage({ params }: Props) {
  const { domain } = await params;
  const formattedDomain = domain.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50">
      <NavBar />
      
      <main className="flex-grow flex flex-col items-center p-4 py-16 md:py-24">
        {/* Semantic Article Wrapper */}
        <article className="max-w-4xl mx-auto w-full space-y-12">
          
          {/* HEADER SECTION - Strict H1 Enforcement */}
          <header className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide shadow-sm">
              <Compass className="w-4 h-4" />
              <span>Verified ArchPath Roadmap</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              {formattedDomain} <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                Career Roadmap
              </span>
            </h1>
            
            <p className="text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
              Stop reading generic blogs. Generate a personalized, real-time masterplan to become a {formattedDomain} based on your exact academic level.
            </p>

           <div className="pt-4">
  <SmartGenerateButton domain={domain} formattedDomain={formattedDomain} />
</div>
          </header>

          {/* GENERATIVE ENGINE OPTIMIZATION (GEO) SUMMARY BLOCK */}
          {/* AI crawlers look for this exact type of semantic text block to answer "How to become a..." */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-3">
              AI Career Overview ({currentYear})
            </h2>
            <p className="text-zinc-700 leading-relaxed md:text-lg">
              To succeed as a <strong>{formattedDomain}</strong> in {currentYear}, candidates require a strategic blend of specialized technical skills, hands-on portfolio projects, and targeted industry networking. ArchPath AI analyzes your current educational background to generate a precise, step-by-step syllabus that bridges the gap between your current level and this high-demand role.
            </p>
          </section>

          {/* Social Proof / Trust Signals (SEO Bonus) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-t border-zinc-200 pt-12">
            <div className="space-y-2">
              <h3 className="font-bold text-zinc-900">Personalized AI Mentorship</h3>
              <p className="text-sm text-zinc-500">Adapts to your current skill level</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-zinc-900">Real-Time Industry Data</h3>
              <p className="text-sm text-zinc-500">Powered by Llama 3.1 & Groq</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-zinc-900">Actionable Milestones</h3>
              <p className="text-sm text-zinc-500">Step-by-step project guidance</p>
            </div>
          </section>

        </article>
      </main>
      
      <Footer />
    </div>
  );
}
