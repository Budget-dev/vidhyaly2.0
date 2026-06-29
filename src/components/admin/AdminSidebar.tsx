
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Users, 
  LayoutDashboard, 
  ShieldAlert, 
  Settings, 
  Activity,
  LogOut,
  ChevronRight,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';

const menuItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { id: 'users', label: 'User Management', icon: Users, href: '/admin/users' },
  { id: 'logs', label: 'Audit Logs', icon: ShieldAlert, href: '/admin/logs' },
  { id: 'activity', label: 'Activity Feed', icon: Activity, href: '/admin/activity' },
  { id: 'db', label: 'System Health', icon: Database, href: '/admin/system' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { profile, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth!);
    router.push('/');
  };

  return (
    <aside className="w-64 bg-white border-r h-screen fixed left-0 top-0 z-50 flex flex-col">
      <div className="p-8 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">V</div>
          <h1 className="text-xl font-headline font-bold text-slate-900">Vidhyaly Admin</h1>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} />
              <span>{item.label}</span>
              {isActive && <motion.div layoutId="admin-active" className="ml-auto w-1 h-5 bg-primary rounded-full" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t mt-auto">
        <div className="bg-slate-50 p-4 rounded-2xl border flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {profile?.displayName?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">
                {loading ? '...' : (profile?.displayName || 'Admin')}
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest truncate">
                {profile?.role || 'Administrator'}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleSignOut}
            className="w-full justify-start text-destructive hover:bg-red-50 hover:text-destructive h-9 p-2"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="text-xs font-bold">Sign Out</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
