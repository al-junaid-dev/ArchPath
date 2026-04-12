'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { 
  Compass, 
  LogOut, 
  LayoutDashboard, 
  User, 
  ShieldAlert, 
  Menu, 
  X, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

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
import { cn } from '@/lib/utils';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (data?.role === 'admin') setIsAdmin(true);
      }
      setLoading(false);
    }
    getUserData();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo & Public Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-95">
            <Image 
              src="/logo.svg" 
              alt="ArchPath AI Logo" 
              width={32} 
              height={32} 
              className="rounded-lg shadow-sm"
            />
            <span className="font-bold text-xl tracking-tight text-zinc-900">ArchPath</span>
          </Link>

          {/* Desktop SEO Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/careers" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-indigo-600",
                pathname === '/careers' ? "text-indigo-600" : "text-zinc-500"
              )}
            >
              Directory
            </Link>
          </div>
        </div>

        {/* Right Side: Auth Logic */}
        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  {/* Quick-action Generator Link for logged-in users */}
                  <Link href="/generator" className="hidden sm:block">
                    <Button variant="ghost" size="sm" className="text-zinc-600 gap-2">
                      <Sparkles className="w-4 h-4" />
                      Generator
                    </Button>
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="relative h-9 w-9 rounded-full outline-none ring-offset-white transition-all hover:ring-2 hover:ring-zinc-200 focus:ring-2 focus:ring-black">
                      <Avatar className="h-9 w-9 border border-zinc-200">
                        <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent className="w-64 mt-2" align="end">
                      <DropdownMenuLabel className="font-normal p-4">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-semibold text-zinc-900">My Account</p>
                          <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuGroup className="p-1">
                        <DropdownMenuItem onClick={() => router.push('/generator')} className="rounded-md py-2 cursor-pointer">
                          <LayoutDashboard className="mr-3 h-4 w-4 text-zinc-400" />
                          <span>AI Generator</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/dashboard')} className="rounded-md py-2 cursor-pointer">
                          <User className="mr-3 h-4 w-4 text-zinc-400" />
                          <span>Student Profile</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      {isAdmin && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => router.push('/admin')} className="p-2 cursor-pointer text-indigo-600 font-medium">
                            <ShieldAlert className="mr-3 h-4 w-4" />
                            <span>Admin Console</span>
                          </DropdownMenuItem>
                        </>
                      )}

                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem onClick={handleLogout} className="m-1 rounded-md py-2 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
                        <LogOut className="mr-3 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="hidden sm:block">
                    <Button variant="ghost" size="sm" className="text-zinc-600 hover:text-zinc-900">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="sm" className="bg-black text-white rounded-full px-5 hover:bg-zinc-800 transition-all shadow-sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white p-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <Link 
            href="/careers" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 text-zinc-900 font-medium"
          >
            <span className="flex items-center gap-3"><Compass className="w-5 h-5 text-indigo-600" /> Career Directory</span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
          {!user && (
            <Link 
              href="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl text-zinc-600 font-medium"
            >
              <span>Sign In</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
