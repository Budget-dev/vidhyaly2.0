
'use client';

import React, { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldAlert, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useUser();
  const router = useRouter();

  // Strict Role-Based Access Control
  const isAdmin = profile?.role === 'admin' || profile?.role === 'super-admin';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm animate-pulse">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Validating Administrative Credentials</p>
        </div>
      </div>
    );
  }

  // If not authenticated or not an admin, show specialized access denied
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
        <div className="max-w-md bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-headline font-bold text-slate-900 mb-2">Restricted Access</h1>
          <p className="text-slate-500 mb-8 leading-relaxed font-medium">
            This area is reserved for verified administrators of Vidhyaly. Your attempt has been logged for security monitoring.
          </p>
          <div className="flex flex-col gap-3">
             <Button asChild className="rounded-2xl py-7 font-bold text-base shadow-lg">
               <Link href="/auth">Admin Login</Link>
             </Button>
             <Button asChild variant="ghost" className="rounded-2xl py-7 font-bold text-slate-400">
               <Link href="/">Back to Vidhyaly</Link>
             </Button>
          </div>
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
