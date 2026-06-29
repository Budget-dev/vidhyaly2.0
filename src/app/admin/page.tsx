
"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp,
  Calendar,
  ShieldAlert,
  Crown,
  Clock
} from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { format, isAfter } from 'date-fns';
import Link from 'next/link';

export default function AdminDashboard() {
  const db = useFirestore();
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    setCurrentDate(format(new Date(), 'MMM d, yyyy'));
  }, []);
  
  const usersQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'users'));
  }, [db]);

  const { data: allUsers } = useCollection(usersQuery);

  const stats = useMemo(() => {
    if (!allUsers) return [
      { label: 'Total Users', value: 0, icon: Users, color: '#4F46E5', bg: '#EEF2FF' },
      { label: 'Active Students', value: 0, icon: UserCheck, color: '#10B981', bg: '#ECFDF5' },
      { label: 'Blocked Accounts', value: 0, icon: UserX, color: '#EF4444', bg: '#FEF2F2' },
      { label: 'Premium Users', value: 0, icon: Crown, color: '#F59E0B', bg: '#FFFBEB' },
    ];

    const active = allUsers.filter(u => u.status === 'active').length;
    const blocked = allUsers.filter(u => u.status === 'blocked').length;
    const premium = allUsers.filter(u => {
      if (u.subscriptionPlan !== 'pro') return false;
      if (!u.subscriptionExpiryDate) return false;
      try {
        const expiry = u.subscriptionExpiryDate.toDate ? u.subscriptionExpiryDate.toDate() : new Date(u.subscriptionExpiryDate);
        return isAfter(expiry, new Date());
      } catch (e) {
        return false;
      }
    }).length;

    return [
      { label: 'Total Users', value: allUsers.length, icon: Users, color: '#4F46E5', bg: '#EEF2FF' },
      { label: 'Active Students', value: active, icon: UserCheck, color: '#10B981', bg: '#ECFDF5' },
      { label: 'Blocked Accounts', value: blocked, icon: UserX, color: '#EF4444', bg: '#FEF2F2' },
      { label: 'Premium Users', value: premium, icon: Crown, color: '#F59E0B', bg: '#FFFBEB' },
    ];
  }, [allUsers]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900">Platform Command</h1>
          <p className="text-sm text-slate-500 font-medium">Real-time monitoring of Vidhyaly NEET ecosystem.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-2xl border shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700">{currentDate || 'Loading...'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <StatCard 
            key={s.label}
            index={idx}
            label={s.label}
            value={s.value}
            icon={s.icon as any}
            color={s.color}
            bg={s.bg}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border shadow-sm h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-headline font-bold text-slate-900">Growth Trends</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full bg-primary text-[10px] font-bold text-white shadow-md">30D</button>
            </div>
          </div>
          <div className="flex-1 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-widest">Active Data Syncing...</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm flex flex-col">
          <h2 className="text-xl font-headline font-bold text-slate-900 mb-6">Recent Security logs</h2>
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-3 opacity-30">
               <ShieldAlert className="w-10 h-10 text-slate-300" />
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monitoring active</p>
          </div>
          <Link href="/admin/logs" className="block w-full mt-auto">
            <button className="w-full py-3 rounded-xl border border-slate-100 text-xs font-bold text-slate-400 hover:bg-slate-50 transition-all">
              Audit Logs Repository
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
