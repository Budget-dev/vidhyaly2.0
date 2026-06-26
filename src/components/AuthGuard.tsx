'use client';

import React, { useEffect } from 'react';
import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';

const PUBLIC_PATHS = ['/', '/auth', '/admin/login', '/admin/signup'];

/**
 * @fileOverview A security component that ensures only logged-in users can access
 * pages other than the homepage and authentication routes.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    // If not loading, no user, and path is not public, redirect to auth
    if (!loading && !user && !isPublicPath) {
      router.push('/auth');
    }
  }, [user, loading, pathname, router, isPublicPath]);

  // Show a clean loading state while checking auth for protected routes
  if (loading && !isPublicPath) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Securing Session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
