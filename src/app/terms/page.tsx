import { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | ArchPath AI',
  description: 'Read the terms and conditions for using the ArchPath AI career generation platform.',
};

export default function TermsOfService() {
  const lastUpdated = "April 2026";

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50">
      <NavBar />
      
      <main className="flex-grow px-4 py-16 md:py-24">
        <article className="max-w-3xl mx-auto bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-zinc-100">
            <div className="bg-indigo-50 p-3 rounded-xl">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Terms of Service</h1>
              <p className="text-sm text-zinc-500 mt-1">Last Updated: {lastUpdated}</p>
            </div>
          </div>

          <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
            <h2 className="text-xl font-bold text-zinc-900 mt-8">1. Acceptance of Terms</h2>
            <p>
              By accessing or using ArchPath AI, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8">2. Disclaimer of Warranties (AI Generated Content)</h2>
            <p>
              ArchPath AI uses advanced artificial intelligence to generate educational syllabuses and career roadmaps. While we strive for extreme accuracy using current industry data, <strong>the roadmaps are provided "as is" for informational purposes only.</strong> ArchPath AI does not guarantee employment, academic success, or the absolute accuracy of the AI-generated milestones. You should independently verify critical career decisions.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8">3. User Responsibilities</h2>
            <p>
              You agree to provide accurate information when generating roadmaps and using your account. You are strictly prohibited from attempting to reverse-engineer our prompt architecture, overload our API integrations, or use the platform for malicious intent.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8">4. Intellectual Property</h2>
            <p>
              The platform architecture, UI design, and proprietary prompt engineering are the intellectual property of ArchPath AI. The roadmaps generated for you are yours to use for personal, educational, and professional development.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8">5. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate these terms or attempt to abuse the free generation limits of our AI infrastructure.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
