'use client';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const router = useRouter();
  
  // 1. Initialize state safely
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null); // Starts as null, which is safe because of 'loading' state
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [interests, setInterests] = useState('');

  // 2. Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 3. Fetch data safely
  useEffect(() => {
    let isMounted = true; // Prevents memory leaks if the component unmounts quickly

    async function loadProfile() {
      try {
        const { data: { user: sessionUser }, error: authError } = await supabase.auth.getUser();

        // If no user exists, kick them back to login safely
        if (!sessionUser || authError) {
          if (isMounted) router.replace('/login');
          return;
        }

        if (isMounted) setUser(sessionUser);

        // Fetch their profile using optional chaining (?.) just in case
        if (sessionUser?.id) {
          const { data, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', sessionUser.id)
            .single();

          if (data && isMounted) {
            setFullName(data.full_name || '');
            setClassLevel(data.class_level || '');
            setFieldOfStudy(data.field_of_study || '');
            setInterests(data.interests ? data.interests.join(', ') : '');
          }
        }
      } catch (err) {
        console.error("Critical error loading profile:", err);
      } finally {
        if (isMounted) setLoading(false); // Only reveal the UI once we are 100% sure we have the data
      }
    }

    loadProfile();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [router, supabase]);

  // 4. Save data safely
  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hard stop if user somehow became null
    if (!user || !user.id) {
      toast.error('Your session dropped. Please refresh the page or log in again.');
      return;
    }

    setSaving(true);
    
    // Clean up the comma-separated interests into an array
    const interestsArray = interests.split(',').map((item) => item.trim()).filter(Boolean);

    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id, // Now guaranteed to exist
        full_name: fullName,
        class_level: classLevel,
        field_of_study: fieldOfStudy,
        interests: interestsArray,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      toast.success('Profile secured. Architecting your career roadmap...');
      router.push('/generator');
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast.error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  // 5. The "Wall" - Do not render anything below this line until data is loaded
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
          <p className="text-zinc-500 font-medium animate-pulse">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  
  return (
    <div className="flex flex-col min-h-screen">
    <NavBar/>
    <div className="flex-grow bg-transparent p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Welcome, {fullName || 'Student'}
          </h1>
          <p className="text-zinc-500">Complete your profile so the AI can map your career path.</p>
        </div>

        <Card className="border-zinc-200 shadow-sm">
          <CardHeader>
            <CardTitle>Academic Profile</CardTitle>
            <CardDescription>
              Enter your current details. Be specific with your field of study for better AI results.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={updateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="e.g. Jane Doe" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="classLevel">Current Class / Year</Label>
                  <Input 
                    id="classLevel" 
                    placeholder="e.g. 3rd Year B.Tech, or Class 12" 
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">Field of Study</Label>
                  <Input 
                    id="fieldOfStudy" 
                    placeholder="e.g. Computer Science, Graphic Design" 
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Specific Interests (Comma separated)</Label>
                <Input 
                  id="interests" 
                  placeholder="e.g. UI/UX, Backend Development, Open Source" 
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-black text-white hover:bg-zinc-800" disabled={saving}>
                {saving ? 'Saving...' : 'Save Profile & Continue'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer/>
    </div>
  );
}