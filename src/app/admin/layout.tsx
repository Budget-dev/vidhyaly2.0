
'use client';

import React, { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useUser();
  const router = useRouter();

  // Simple RBAC check
  const isAdmin = profile?.role === 'admin' || profile?.role === 'super-admin';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Validating Credentials...</p>
        </div>
      </div>
    );
  }

  // If not admin, show access denied
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
        <div className="max-w-md bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-headline font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            You don't have the required administrative permissions to access this area.
          </p>
          <Button asChild className="rounded-2xl px-10 py-6 font-bold text-base shadow-lg">
            <Link href="/">Return to Vidhyaly</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <AdminSidebar />
      <main className="pl-64 pt-6">
        <div className="max-w-[1600px] mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
