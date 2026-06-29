
'use client';

import React, { useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { format } from 'date-fns';
import { 
  ShieldAlert, 
  Terminal,
  Search,
  Filter,
  Calendar
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AuditLogsPage() {
  const db = useFirestore();
  
  const logsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'audit_logs'), orderBy('timestamp', 'desc'), limit(100));
  }, [db]);

  const { data: logs, loading } = useCollection(logsQuery);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-slate-900">Security Audit Logs</h1>
        <p className="text-sm text-slate-500 font-medium">Tracking administrative actions for security compliance and system integrity.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center gap-4">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
             <Input placeholder="Search logs by action or target..." className="pl-11 h-12 rounded-2xl border-slate-100 bg-slate-50/50" />
           </div>
           <Button variant="outline" className="rounded-2xl h-12 gap-2 font-bold px-6 border-slate-200">
             <Filter className="w-4 h-4" /> Filter Logs
           </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 border-none">
                <TableHead className="py-6 font-bold text-slate-500 uppercase text-[10px] tracking-widest pl-8">Admin</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Action</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Target User</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Details</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center gap-4">
                       <Terminal className="w-8 h-8 text-primary animate-pulse" />
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accessing Security Vault...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : logs?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-20">
                      <ShieldAlert className="w-12 h-12" />
                      <p className="text-sm font-bold">No security logs recorded yet.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                logs?.map((log: any) => (
                  <TableRow key={log.id} className="hover:bg-slate-50/50 border-slate-50 group">
                    <TableCell className="py-5 pl-8">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-mono font-bold text-slate-600">{log.adminId?.substring(0, 8)}...</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="rounded-full bg-slate-100 text-slate-600 border-none px-3 font-black text-[9px] uppercase tracking-wider">
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-bold text-slate-600">{log.targetUserId || 'Global'}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-slate-500 font-medium italic">{log.details || 'No additional details'}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-400 group-hover:text-primary transition-colors">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold">
                          {log.timestamp ? format(log.timestamp.toDate(), 'MMM d, HH:mm') : 'Just now'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
