'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Compass, LogOut, LayoutDashboard, User, ShieldAlert } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup, 
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? 'User');
        const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (data?.role === 'admin') setIsAdmin(true);
      }
      setLoading(false);
    }
    getUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Logo - Points to Home for better SEO */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="bg-black text-white p-1.5 rounded-md">
            <Compass className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-900">ArchPath</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* SEO Link: Visible to everyone */}
          <Link href="/careers" className="hidden sm:block text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mr-2">
            Directory
          </Link>

          {!loading && (
            <>
              {userEmail ? (
                /* Profile Dropdown: ONLY visible if logged in */
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative h-9 w-9 rounded-full outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-opacity hover:opacity-80">
                    <Avatar className="h-9 w-9 border border-zinc-200">
                      <AvatarFallback className="bg-indigo-600 text-white font-medium text-xs">
                        {userEmail.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none text-zinc-900">Account</p>
                          <p className="text-xs leading-none text-zinc-500 truncate">{userEmail}</p>
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/generator')} className="cursor-pointer py-2">
                      <Compass className="mr-2 h-4 w-4 text-zinc-500" />
                      <span>AI Generator</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer py-2">
                      <User className="mr-2 h-4 w-4 text-zinc-500" />
                      <span>Edit Profile</span>
                    </DropdownMenuItem>
                    
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/admin')} className="cursor-pointer text-indigo-600 focus:text-indigo-600 py-2">
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          <span>Admin Console</span>
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 py-2">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                /* Sign In Button: Visible if NOT logged in */
                <Link href="/login">
                  <Button size="sm" className="bg-black text-white rounded-full px-5 hover:bg-zinc-800 transition-all">
                    Sign In
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
