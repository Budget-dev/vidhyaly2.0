
"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  UserX, 
  UserPlus, 
  TrendingUp,
  ArrowUpRight,
  Calendar,
  Search
} from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { useCollection } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export default function AdminDashboard() {
  const db = useFirestore();
  
  // Real-time metrics - Memoized to prevent infinite re-renders
  const usersQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'users'));
  }, [db]);

  const { data: allUsers } = useCollection(usersQuery);

  const stats = [
    { label: 'Total Users', value: allUsers?.length || 0, icon: Users, color: '#4F46E5', bg: '#EEF2FF' },
    { label: 'Active Students', value: allUsers?.filter(u => u.status === 'active').length || 0, icon: UserCheck, color: '#10B981', bg: '#ECFDF5' },
    { label: 'Blocked Accounts', value: allUsers?.filter(u => u.status === 'blocked').length || 0, icon: UserX, color: '#EF4444', bg: '#FEF2F2' },
    { label: 'New Today', value: 12, icon: UserPlus, color: '#F59E0B', bg: '#FFFBEB', delta: '+15%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900">Admin Overview</h1>
          <p className="text-sm text-slate-500 font-medium">Monitoring Vidhyaly NEET ecosystem in real-time.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-2xl border shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700">Oct 24, 2027</span>
          </div>
          <button className="bg-slate-900 text-white px-6 py-2 rounded-2xl text-xs font-bold shadow-lg hover:bg-slate-800 transition-all">
            Generate Growth Report
          </button>
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
            delta={s.delta}
            deltaType="success"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Growth Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border shadow-sm h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-headline font-bold text-slate-900">User Growth Analytics</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400">7D</button>
              <button className="px-4 py-1.5 rounded-full bg-primary text-[10px] font-bold text-white shadow-md">30D</button>
              <button className="px-4 py-1.5 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400">12M</button>
            </div>
          </div>
          <div className="flex-1 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-widest">Growth Visualization Loading...</p>
            </div>
          </div>
        </div>

        {/* Recent Admin Actions */}
        <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
          <h2 className="text-xl font-headline font-bold text-slate-900 mb-6">Recent Actions</h2>
          <div className="space-y-6">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Admin blocked Arjun S.</p>
                  <p className="text-[10px] text-slate-400 font-medium">14 minutes ago · Reason: Terms Violation</p>
                </div>
                <ArrowUpRight className="w-3 h-3 text-slate-300 ml-auto group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-slate-100 text-xs font-bold text-slate-400 hover:bg-slate-50 transition-all">
            View All Audit Logs
          </button>
        </div>
      </div>
    </div>
  );
}
