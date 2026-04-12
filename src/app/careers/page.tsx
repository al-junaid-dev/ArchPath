import Link from 'next/link';
import { Compass, Code, Database, Palette, Briefcase, Zap } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Professional category mapping for SEO hierarchy
const categories = [
  {
    title: "Software & Development",
    icon: <Code className="w-5 h-5" />,
    links: [
      { name: "Software Engineer", slug: "software-engineer" },
      { name: "Full Stack Developer", slug: "full-stack-developer" },
      { name: "Mobile App Developer", slug: "mobile-app-developer" },
      { name: "Cloud Architect", slug: "cloud-architect" },
    ]
  },
  {
    title: "Data & Artificial Intelligence",
    icon: <Database className="w-5 h-5" />,
    links: [
      { name: "Data Scientist", slug: "data-scientist" },
      { name: "AI Prompt Engineer", slug: "ai-prompt-engineer" },
      { name: "Machine Learning Engineer", slug: "machine-learning-engineer" },
      { name: "Data Analyst", slug: "data-analyst" },
    ]
  },
  {
    title: "Design & Creative",
    icon: <Palette className="w-5 h-5" />,
    links: [
      { name: "UI/UX Designer", slug: "ui-ux-designer" },
      { name: "Product Designer", slug: "product-designer" },
      { name: "Graphic Designer", slug: "graphic-designer" },
    ]
  },
  {
    title: "Business & Strategy",
    icon: <Briefcase className="w-5 h-5" />,
    links: [
      { name: "Product Manager", slug: "product-manager" },
      { name: "Digital Marketer", slug: "digital-marketer" },
      { name: "Business Analyst", slug: "business-analyst" },
    ]
  }
];

export default function CareerDirectory() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <NavBar />
      
      <main className="flex-grow p-8 md:p-16">
        <div className="max-w-6xl mx-auto">
          {/* SEO Optimized Header */}
          <div className="mb-16 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4 tracking-tight">
              Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Roadmap Directory</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
              Explore our curated AI-architected career paths. Find the step-by-step masterplan for the most in-demand roles in 2026.
            </p>
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {categories.map((cat, i) => (
              <div key={i} className="space-y-6">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-lg border-b border-zinc-100 pb-2">
                  <div className="text-indigo-600">{cat.icon}</div>
                  {cat.title}
                </div>
                <ul className="flex flex-col gap-3">
                  {cat.links.map((link, j) => (
                    <li key={j}>
                      <Link 
                        href={`/careers/${link.slug}`}
                        className="text-zinc-500 hover:text-indigo-600 transition-colors text-sm font-medium flex items-center group"
                      >
                        <Zap className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
