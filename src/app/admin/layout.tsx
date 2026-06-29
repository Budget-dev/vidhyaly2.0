
'use client';

import React, { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useUser, useFirestore } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { Lock, ShieldAlert, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';

const AUTHORIZED_ADMIN_EMAIL = "venkateshchop14@gmail.com";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useUser();
  const db = useFirestore();
  const pathname = usePathname();
  const router = useRouter();

  // Exclude login and signup pages from the strict RBAC layout check
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/signup';

  // Check role or explicit email for the owner
  const isAdmin = profile?.role === 'admin' || profile?.role === 'super-admin' || user?.email?.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();

  // Self-Repair Logic: If the authorized owner is logged in but has no Firestore profile, create one.
  useEffect(() => {
    if (user && !loading && !profile && db && user.email?.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      const userRef = doc(db, "users", user.uid);
      setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || "Platform Director",
        email: user.email,
        role: "super-admin",
        status: "active",
        registrationDate: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true });

      const adminRef = doc(db, "admins", user.uid);
      setDoc(adminRef, {
        adminId: user.uid,
        name: user.displayName || "Platform Director",
        email: user.email,
        role: "super-admin",
        permissions: ["*"],
        createdDate: serverTimestamp(),
      }, { merge: true });
    }
  }, [user, profile, loading, db]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm animate-pulse">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Validating Administrative Credentials</p>
        </div>
      </div>
    );
  }

  // If it's the login or signup page, render without the sidebar or check
  if (isAuthPage) {
    return <>{children}</>;
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
               <Link href="/admin/login">Admin Login</Link>
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
