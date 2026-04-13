import Link from 'next/link';
import { Sparkles, ShieldCheck, Terminal, LayoutTemplate, Zap } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// SEO Categorization - Grouping related entities together for the crawler
const categories = [
  {
    title: "Artificial Intelligence & Data",
    icon: <Sparkles className="w-5 h-5" />,
    links: [
      { name: "AI Prompt Engineer", slug: "ai-prompt-engineer" },
      { name: "Generative AI Developer", slug: "generative-ai-developer" },
      { name: "MLOps Engineer", slug: "mlops-engineer" },
      { name: "NLP Engineer", slug: "nlp-engineer" },
      { name: "AI Ethics Researcher", slug: "ai-ethics-researcher" },
      { name: "Data Visualization Specialist", slug: "data-visualization-specialist" },
    ]
  },
  {
    title: "Cybersecurity & Cloud",
    icon: <ShieldCheck className="w-5 h-5" />,
    links: [
      { name: "Cloud Security Architect", slug: "cloud-security-architect" },
      { name: "Penetration Tester", slug: "penetration-tester" },
      { name: "DevSecOps Engineer", slug: "devsecops-engineer" },
      { name: "Smart Contract Auditor", slug: "blockchain-smart-contract-auditor" },
    ]
  },
  {
    title: "Specialized Development",
    icon: <Terminal className="w-5 h-5" />,
    links: [
      { name: "AR/VR Experience Developer", slug: "ar-vr-experience-developer" },
      { name: "IoT Solutions Architect", slug: "iot-solutions-architect" },
      { name: "Rust Systems Programmer", slug: "rust-systems-programmer" },
      { name: "FinTech Integration Developer", slug: "fintech-integration-developer" },
    ]
  },
  {
    title: "Next-Gen Design & Product",
    icon: <LayoutTemplate className="w-5 h-5" />,
    links: [
      { name: "Conversation Designer", slug: "conversation-designer" },
      { name: "Growth Product Manager", slug: "growth-product-manager" },
      { name: "UX Researcher", slug: "ux-researcher" },
      { name: "API Technical Writer", slug: "technical-writer-api" },
      { name: "Developer Advocate (DevRel)", slug: "developer-advocate" },
      { name: "Agile Scrum Master", slug: "scrum-master-agile-coach" },
    ]
  }
];

export const metadata = {
  title: 'Career Directory | High-Demand Tech Roles in 2026',
  description: 'Explore our comprehensive directory of next-generation career roadmaps, including AI, Cybersecurity, Specialized Dev, and Product Strategy.',
};

export default function CareerDirectory() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50">
      <NavBar />
      
      <main className="flex-grow px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* SEO Optimized H1 Header */}
          <header className="mb-16 text-center lg:text-left max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-6 tracking-tight">
              ArchPath <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Career Directory</span>
            </h1>
            <p className="text-zinc-600 text-lg leading-relaxed">
              Stop guessing your future. Select a high-demand domain below and let our AI architect a step-by-step masterplan for your specific educational background.
            </p>
          </header>

          {/* Semantic Nav Grid */}
          <nav aria-label="Career Categories" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {categories.map((cat, i) => (
              <section key={i} className="space-y-6">
                <h2 className="flex items-center gap-3 text-zinc-900 font-bold text-lg border-b border-zinc-200 pb-3">
                  <div className="text-indigo-600 bg-indigo-50 p-2 rounded-lg">{cat.icon}</div>
                  {cat.title}
                </h2>
                <ul className="flex flex-col gap-4">
                  {cat.links.map((link, j) => (
                    <li key={j}>
                      <Link 
                        href={`/careers/${link.slug}`}
                        className="text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50/50 px-3 py-2 -mx-3 rounded-lg transition-all text-sm font-medium flex items-center group"
                      >
                        <Zap className="w-3 h-3 mr-2 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
}
