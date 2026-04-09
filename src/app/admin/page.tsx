'use client';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, ShieldAlert } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function verifyAdminAndLoadData() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.replace('/login');
        return;
      }

      // 1. Check if the user is an admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        // Not an admin? Kick them to the student generator page
        router.replace('/generator');
        return;
      }

      // 2. If they are an admin, fetch all student profiles
      const { data: allProfiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false });

      if (allProfiles) {
        setStudents(allProfiles);
      }
      setLoading(false);
    }

    verifyAdminAndLoadData();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="animate-pulse text-zinc-500 font-medium">Verifying Admin Credentials...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
    <NavBar />
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-zinc-200 pb-6">
          <div className="p-3 bg-black rounded-lg text-white">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Admin Console</h1>
            <p className="text-zinc-500">Monitor student pathways and platform usage.</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-zinc-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">Total Users</CardTitle>
              <Users className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-zinc-900">{students.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="border-zinc-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-zinc-50/50 border-b border-zinc-200">
            <CardTitle>Student Directory</CardTitle>
            <CardDescription>A list of all users actively planning their careers on PathFinder AI.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Field of Study</TableHead>
                  <TableHead>Class Level</TableHead>
                  <TableHead>Interests</TableHead>
                  <TableHead className="text-right">Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium text-zinc-900">
                      {student.full_name || 'Anonymous User'}
                    </TableCell>
                    <TableCell>{student.field_of_study || '-'}</TableCell>
                    <TableCell>{student.class_level || '-'}</TableCell>
                    <TableCell className="max-w-[300px] truncate text-zinc-500">
                      {student.interests?.join(', ') || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {student.role === 'admin' ? (
                        <Badge variant="outline" className="bg-zinc-100 text-zinc-800 border-zinc-300">Admin</Badge>
                      ) : (
                        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Student</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
    <Footer />
    </div>
  );
}