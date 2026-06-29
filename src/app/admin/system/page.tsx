
'use client';

import React from 'react';
import { Database, ShieldCheck } from 'lucide-react';

export default function SystemHealthPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-8">
      <div className="bg-emerald-50 p-6 rounded-[2.5rem] mb-6">
        <Database className="w-16 h-16 text-emerald-600" />
      </div>
      <h1 className="text-3xl font-headline font-bold text-slate-900 mb-2">System Health & DB</h1>
      <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium leading-relaxed">
        Detailed monitoring of Firestore read/write quotas, API latency, and security rule performance.
      </p>
      <div className="flex items-center gap-4">
        <div className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-emerald-100">
          <ShieldCheck className="w-3 h-3" /> Core Status: Nominal
        </div>
      </div>
    </div>
  );
}
