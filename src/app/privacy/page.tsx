import { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | ArchPath AI',
  description: 'Learn how ArchPath AI collects, uses, and protects your data.',
};

export default function PrivacyPolicy() {
  const lastUpdated = "April 2026";

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50">
      <NavBar />
      
      <main className="flex-grow px-4 py-16 md:py-24">
        <article className="max-w-3xl mx-auto bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-zinc-100">
            <div className="bg-indigo-50 p-3 rounded-xl">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Privacy Policy</h1>
              <p className="text-sm text-zinc-500 mt-1">Last Updated: {lastUpdated}</p>
            </div>
          </div>

          <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
            <h2 className="text-xl font-bold text-zinc-900 mt-8">1. Information We Collect</h2>
            <p>
              When you use ArchPath AI, we collect minimal information necessary to provide our services. This includes your email address (managed securely via Supabase) for authentication, and the academic or professional data you input to generate career roadmaps.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8">2. How We Use Your Data & AI Processing</h2>
            <p>
              Your inputs are used to generate personalized career masterplans. To achieve this, your academic inputs are processed using third-party AI models (specifically, Llama 3.1 via the Groq API). <strong>We do not use your personal identifiable information (PII) to train these AI models.</strong> The data sent to the AI is strictly contextual to generate the roadmap.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8">3. Data Security</h2>
            <p>
              We implement enterprise-grade security measures. Your account credentials and data are encrypted and stored using Supabase, which complies with industry-standard security protocols.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8">4. Cookies</h2>
            <p>
              ArchPath AI uses essential cookies purely for session management and authentication. We do not use intrusive third-party tracking or advertising cookies.
            </p>
            
            <h2 className="text-xl font-bold text-zinc-900 mt-8">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or your data, please reach out to us via our GitHub repository or professional contact channels.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
