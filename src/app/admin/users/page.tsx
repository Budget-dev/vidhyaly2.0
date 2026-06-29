
'use client';

import React, { useState, useMemo } from 'react';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query, doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Trash2, 
  UserX, 
  CheckCircle2, 
  Loader2,
  AlertCircle,
  Mail,
  Smartphone,
  Calendar,
  Globe
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { AdminService } from '@/services/admin-service';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

export default function UserManagementPage() {
  const db = useFirestore();
  const { user: currentAdmin, profile: adminProfile } = useUser();
  const adminService = useMemo(() => (db ? new AdminService(db) : null), [db]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'blocked'>('all');
  
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blockReason, setBlockReason] = useState('');

  const usersQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'users'));
  }, [db]);

  const { data: users, loading } = useCollection(usersQuery);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    
    const sorted = [...users].sort((a, b) => {
      const dateA = a.registrationDate?.toDate?.() || a.createdAt?.toDate?.() || new Date(0);
      const dateB = b.registrationDate?.toDate?.() || b.createdAt?.toDate?.() || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    return sorted.filter(u => {
      const name = (u.displayName || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      const uid = (u.uid || "");
      const search = searchTerm.toLowerCase();

      const matchesSearch = name.includes(search) || email.includes(search) || uid.includes(search);
      const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
      
      return matchesSearch && matchesStatus && !u.deletedAt;
    });
  }, [users, searchTerm, filterStatus]);

  const handleToggleBlock = async () => {
    if (!selectedUser || !currentAdmin || !adminService) return;
    const nextStatus = selectedUser.status === 'blocked' ? 'active' : 'blocked';
    await adminService.updateUserStatus(
      currentAdmin.uid, 
      adminProfile?.displayName || currentAdmin.email || 'Admin',
      selectedUser.uid, 
      nextStatus, 
      blockReason
    );
    setIsBlockModalOpen(false);
    setSelectedUser(null);
    setBlockReason('');
  };

  const handleDeleteUser = async () => {
    if (!selectedUser || !currentAdmin || !adminService) return;
    await adminService.softDeleteUser(
      currentAdmin.uid, 
      adminProfile?.displayName || currentAdmin.email || 'Admin',
      selectedUser.uid
    );
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900">User Repository</h1>
          <p className="text-sm text-slate-500 font-medium">Manage student accounts, permissions, and security status.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search students by name, email or ID..." 
              className="pl-11 h-12 rounded-2xl border-slate-100 bg-slate-50/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-2xl border">
            {(['all', 'active', 'blocked'] as const).map(s => (
              <button 
                key={s}
                onClick={() => setFilterStatus(s)}
                className={cn(
                  "px-6 py-2 rounded-xl text-xs font-bold capitalize transition-all",
                  filterStatus === s ? "bg-white text-primary shadow-sm" : "text-slate-400"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Synchronizing User Data...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 border-none">
                  <TableHead className="w-[300px] py-6 font-bold text-slate-500 uppercase text-[10px] tracking-widest pl-8">Student</TableHead>
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Plan</TableHead>
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Status</TableHead>
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Provider</TableHead>
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Joined</TableHead>
                  <TableHead className="text-right pr-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-8 h-8 text-slate-200" />
                        <p className="text-slate-400 font-bold text-sm">No records found matching criteria.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((u) => (
                    <TableRow key={u.uid} className="hover:bg-slate-50/50 border-slate-50 group">
                      <TableCell className="py-5 pl-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-black">
                            {u.displayName?.charAt(0) || u.email?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{u.displayName || 'Unnamed Student'}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase truncate max-w-[150px]">{u.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "rounded-full px-3 py-1 font-black text-[9px] uppercase tracking-wider",
                          u.subscriptionPlan === 'pro' ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"
                        )}>
                          {u.subscriptionPlan || 'free'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "rounded-full px-3 py-1 font-black text-[9px] uppercase tracking-wider",
                          u.status === 'blocked' ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
                        )}>
                          {u.status || 'active'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3 text-slate-300" />
                          <span className="text-xs font-bold text-slate-600 capitalize">{u.loginProvider || 'Email'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs font-bold text-slate-600">
                          {u.registrationDate ? format(u.registrationDate.toDate(), 'MMM d, yyyy') : 'Pre-alpha'}
                        </p>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl shadow-xl border-slate-100">
                            <DropdownMenuItem className="rounded-xl py-3 cursor-pointer" onClick={() => { setSelectedUser(u); setIsDetailsOpen(true); }}>
                              <Eye className="w-4 h-4 mr-3 text-slate-400" />
                              <span className="font-bold text-xs">Profile Overview</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="rounded-xl py-3 cursor-pointer"
                              onClick={() => { setSelectedUser(u); setIsBlockModalOpen(true); }}
                            >
                              <UserX className="w-4 h-4 mr-3 text-amber-500" />
                              <span className="font-bold text-xs text-amber-600">
                                {u.status === 'blocked' ? 'Unblock Account' : 'Restrict Access'}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="rounded-xl py-3 cursor-pointer"
                              onClick={() => { setSelectedUser(u); setIsDeleteModalOpen(true); }}
                            >
                              <Trash2 className="w-4 h-4 mr-3 text-red-500" />
                              <span className="font-bold text-xs text-red-600">Archive Record</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Details View */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] p-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-headline font-bold">Student Identity</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border">
                 <Mail className="w-5 h-5 text-slate-400" />
                 <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase">Email</p>
                   <p className="text-sm font-bold text-slate-700">{selectedUser?.email}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border">
                 <Smartphone className="w-5 h-5 text-slate-400" />
                 <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase">Phone</p>
                   <p className="text-sm font-bold text-slate-700">{selectedUser?.phoneNumber || 'Unverified'}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border">
                 <Calendar className="w-5 h-5 text-slate-400" />
                 <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase">Age</p>
                   <p className="text-sm font-bold text-slate-700">{selectedUser?.age || 'Not shared'}</p>
                 </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-[2rem] bg-indigo-50 border border-indigo-100 flex flex-col items-center text-center">
                 <Badge className="mb-3 bg-indigo-600 text-white font-black text-[9px] uppercase">Plan: {selectedUser?.subscriptionPlan || 'free'}</Badge>
                 <p className="text-xs text-indigo-700 font-medium leading-relaxed">
                   {selectedUser?.subscriptionPlan === 'pro' 
                     ? `Subscription active until ${selectedUser.subscriptionExpiryDate ? format(selectedUser.subscriptionExpiryDate.toDate(), 'PP') : 'Indefinite'}`
                     : 'Standard free access tier'}
                 </p>
              </div>
              <div className="p-4 bg-slate-900 rounded-2xl text-white text-center">
                 <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Internal Reference</p>
                 <p className="text-[9px] font-mono opacity-50 truncate">{selectedUser?.uid}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)} className="rounded-xl h-12 font-bold px-10">Close Record</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block Confirmation Modal */}
      <Dialog open={isBlockModalOpen} onOpenChange={setIsBlockModalOpen}>
        <DialogContent className="max-w-md rounded-[2rem] p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">
              {selectedUser?.status === 'blocked' ? 'Restore Access?' : 'Restrict Student?'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedUser?.status !== 'blocked' && (
            <div className="py-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Incident Narrative</label>
              <Input 
                placeholder="Briefly state reason for restriction..." 
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="rounded-xl bg-slate-50"
              />
            </div>
          )}

          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsBlockModalOpen(false)} className="rounded-xl h-12 font-bold">Cancel</Button>
            <Button 
              onClick={handleToggleBlock}
              className={cn(
                "rounded-xl h-12 font-bold px-8 shadow-lg",
                selectedUser?.status === 'blocked' ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"
              )}
            >
              Confirm {selectedUser?.status === 'blocked' ? 'Unblock' : 'Block'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-md rounded-[2rem] p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold text-red-600">Archive Identity?</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium pt-2">
              This will mark the student record as deleted. The data will be moved to the soft-delete archival queue for compliance.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="rounded-xl h-12 font-bold px-8">Cancel</Button>
            <Button onClick={handleDeleteUser} className="rounded-xl h-12 font-bold px-8 bg-red-600 hover:bg-red-700 text-white">Archive Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
