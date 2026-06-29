
'use client';

import React from 'react';
import { Activity, Clock } from 'lucide-react';

export default function ActivityFeedPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-8">
      <div className="bg-indigo-50 p-6 rounded-[2.5rem] mb-6">
        <Activity className="w-16 h-16 text-indigo-600" />
      </div>
      <h1 className="text-3xl font-headline font-bold text-slate-900 mb-2">Live Activity Feed</h1>
      <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium leading-relaxed">
        We are building a real-time monitor to track student practice sessions and MCQ attempts across the platform.
      </p>
      <div className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 inline-flex items-center gap-2">
        <Clock className="w-4 h-4 text-slate-400" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Coming in Development Phase 3.0</span>
      </div>
    </div>
  );
}
