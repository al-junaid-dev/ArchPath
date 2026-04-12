import { Metadata } from 'next';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Compass, Map } from 'lucide-react';

type Props = {
  params: Promise<{ domain: string }>;
};

// 1. DYNAMIC SEO METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain } = await params;
  // Converts "software-engineer" to "Software Engineer"
  const formattedDomain = domain.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `How to become a ${formattedDomain}`,
    description: `Get a free, AI-generated step-by-step roadmap to start your career as a ${formattedDomain}.`,
  };
}

// 2. PUBLIC LANDING PAGE
export default async function CareerPage({ params }: Props) {
  const { domain } = await params;
  const formattedDomain = domain.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold">
            <Compass className="w-4 h-4" />
            <span>Career Architect</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-900 tracking-tight">
            How to become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">{formattedDomain}</span>
          </h1>
          
          <p className="text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
            Stop reading generic blogs. Generate a personalized, real-time roadmap for {formattedDomain} based on your exact academic level and interests.
          </p>
          
          <Link href="/login" className="inline-block pt-4">
            <Button size="lg" className="bg-black text-white hover:bg-zinc-800 rounded-full px-8 h-12 shadow-lg">
              Generate Your Roadmap <Map className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
