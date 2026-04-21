'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, Loader2, AlertCircle } from 'lucide-react';

// ----------------------------------------------------------------------
// 1. THE CORE FORM COMPONENT (Requires useSearchParams)
// ----------------------------------------------------------------------
function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Capture the intent! If no 'next' param exists, default to dashboard.
  const nextUrl = searchParams.get('next') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login/signup

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let authError;

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${nextUrl}`
          }
        });
        authError = error;
        if (!error) alert('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        authError = error;
      }

      if (authError) throw authError;

      // SUCCESS: Route them exactly where they wanted to go!
      if (!isSignUp) {
        router.push(nextUrl);
        router.refresh();
      }

    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white border border-zinc-200 rounded-2xl shadow-sm">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-black text-white rounded-xl mb-2 shadow-sm">
          <Compass className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="text-sm text-zinc-500">
          {isSignUp ? 'Start architecting your future today.' : 'Sign in to access your roadmaps.'}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-zinc-900">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@university.edu"
            className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-zinc-900">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm"
          />
        </div>

        <Button 
          type="submit" 
          disabled={loading || !email || !password} 
          className="w-full bg-black text-white hover:bg-zinc-800 h-11 text-base font-medium shadow-sm transition-all mt-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            isSignUp ? 'Create Account' : 'Sign In'
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-zinc-500 pt-2 border-t border-zinc-100">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button 
          onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
          className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
        >
          {isSignUp ? 'Sign in' : 'Sign up'}
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. THE MAIN EXPORT (Wrapped in Suspense to prevent build errors)
// ----------------------------------------------------------------------
export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Minimal Header for the Auth Page */}
      <header className="absolute top-0 w-full p-4 md:p-8 flex justify-between items-center z-10">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="bg-black text-white p-1.5 rounded-md">
            <Compass className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-900">ArchPath</span>
        </Link>
      </header>

      {/* Main Auth Container */}
      <main className="flex-grow flex items-center justify-center p-4">
        {/* Next.js 15 requires Suspense for anything reading search params! */}
        <Suspense fallback={
          <div className="flex flex-col items-center gap-4 text-zinc-500">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <p className="text-sm font-medium">Loading secure portal...</p>
          </div>
        }>
          <AuthForm />
        </Suspense>
      </main>

    </div>
  );
}
