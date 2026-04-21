'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

export default function SmartGenerateButton({ domain, formattedDomain }: { domain: string, formattedDomain: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 1. Check if the user is logged in right now
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // 2. Logged OUT: Send them to login, and tell login to bring them back here
      router.push(`/login?next=/careers/${domain}`);
    } else {
      // 3. Logged IN: Update their profile so the AI Generator knows their target career
      await supabase
        .from('profiles')
        .update({ field_of_study: formattedDomain })
        .eq('id', session.user.id);
      
      // 4. Send them directly to the Generator Page
      router.push('/generator');
    }
  };

  return (
    <Button 
      onClick={handleClick} 
      disabled={loading} 
      size="lg" 
      className="bg-black text-white hover:bg-zinc-800 rounded-full px-8 h-14 text-base font-semibold shadow-xl hover:shadow-2xl transition-all"
    >
      {loading ? (
        <Loader2 className="mr-2 w-5 h-5 animate-spin text-indigo-400" />
      ) : (
        <Sparkles className="mr-2 w-5 h-5 text-indigo-400" />
      )}
      {loading ? 'Initializing Architect...' : 'Generate Your Masterplan'}
    </Button>
  );
}
