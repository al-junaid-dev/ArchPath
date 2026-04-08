'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome } from 'lucide-react'; // Using Chrome icon as a Google placeholder

export default function LoginPage() {
  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Login Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-zinc-200">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-zinc-900">
            PathFinder AI
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Sign in to generate your personalized career roadmap.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <Button 
            className="w-full bg-black text-white hover:bg-zinc-800 transition-colors" 
            size="lg"
            onClick={handleGoogleLogin}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>
          <p className="mt-6 text-center text-sm text-zinc-500">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}