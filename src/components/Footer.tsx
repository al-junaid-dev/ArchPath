'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Compass } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

export default function Footer() {
  const [user, setUser] = useState<any>(null);

  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Check authentication status on mount
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, [supabase]);

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-black text-white p-1.5 rounded-md transition-transform group-hover:scale-105">
                <Compass className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-zinc-900">ArchPath</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Architecting the future with AI-driven career roadmaps. Real-time guidance for the next generation of professionals.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {/* Twitter / X */}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-zinc-900 transition-colors"
                aria-label="Follow us on X"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a 
                href="https://github.com/al-junaid-dev/PathFinder" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-zinc-900 transition-colors"
                aria-label="View source on GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Popular Roadmaps - SEO INTERLINKING */}
          <div>
            <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider mb-4">Popular Roadmaps</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/careers/ai-prompt-engineer" className="hover:text-indigo-600 transition-colors">AI Prompt Engineer</Link></li>
              <li><Link href="/careers/ui-ux-designer" className="hover:text-indigo-600 transition-colors">UI/UX Designer</Link></li>
              <li><Link href="/careers/software-engineer" className="hover:text-indigo-600 transition-colors">Software Engineer</Link></li>
              <li><Link href="/careers/data-scientist" className="hover:text-indigo-600 transition-colors">Data Scientist</Link></li>
            </ul>
          </div>

          {/* Platform Links - AUTH AWARE */}
          <div>
            <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/careers" className="hover:text-indigo-600 transition-colors">Career Directory</Link></li>
              {user ? (
                <>
                  <li><Link href="/generator" className="hover:text-indigo-600 transition-colors">AI Generator</Link></li>
                  <li><Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Student Profile</Link></li>
                </>
              ) : (
                <li>
                  <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                    Join ArchPath AI →
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/privacy" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-zinc-900 transition-colors">Terms of Service</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-zinc-900 transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-100 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-400">
          <p>© {new Date().getFullYear()} ArchPath AI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
