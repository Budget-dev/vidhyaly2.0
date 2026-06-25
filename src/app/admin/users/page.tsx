
'use client';

import React, { useState, useMemo } from 'react';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  ShieldX, 
  Eye, 
  Trash2, 
  UserX, 
  CheckCircle2, 
  Loader2,
  AlertCircle
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

export default function UserManagementPage() {
  const db = useFirestore();
  const { user: currentAdmin } = useUser();
  const adminService = useMemo(() => new AdminService(db!), [db]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'blocked'>('all');
  
  // Modal states
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blockReason, setBlockReason] = useState('');

  const usersQuery = query(collection(db!, 'users'), orderBy('createdAt', 'desc'));
  const { data: users, loading } = useCollection(usersQuery);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(u => {
      const matchesSearch = 
        u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.uid?.includes(searchTerm);
      
      const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
      
      return matchesSearch && matchesStatus && !u.deletedAt;
    });
  }, [users, searchTerm, filterStatus]);

  const handleToggleBlock = async () => {
    if (!selectedUser || !currentAdmin) return;
    const nextStatus = selectedUser.status === 'blocked' ? 'active' : 'blocked';
    await adminService.updateUserStatus(currentAdmin.uid, selectedUser.uid, nextStatus, blockReason);
    setIsBlockModalOpen(false);
    setSelectedUser(null);
    setBlockReason('');
  };

  const handleDeleteUser = async () => {
    if (!selectedUser || !currentAdmin) return;
    await adminService.softDeleteUser(currentAdmin.uid, selectedUser.uid);
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500 font-medium">Control student accounts, access, and verification status.</p>
        </div>
        <Button className="rounded-2xl bg-primary hover:bg-primary/90 h-12 px-8 font-bold">
          + Add New User
        </Button>
      </div>

      <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-6 border-b flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by name, email or UID..." 
              className="pl-11 h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-2xl border w-full md:w-auto">
            {(['all', 'active', 'blocked'] as const).map(s => (
              <button 
                key={s}
                onClick={() => setFilterStatus(s)}
                className={cn(
                  "px-6 py-2 rounded-xl text-xs font-bold capitalize transition-all",
                  filterStatus === s ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Querying User Base...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 border-none">
                  <TableHead className="w-[300px] py-6 font-bold text-slate-500 uppercase text-[10px] tracking-widest pl-8">User</TableHead>
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Status</TableHead>
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Verification</TableHead>
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Registration</TableHead>
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Role</TableHead>
                  <TableHead className="text-right pr-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-8 h-8 text-slate-200" />
                        <p className="text-slate-400 font-bold text-sm">No users found matching your filters.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((u) => (
                    <TableRow key={u.uid} className="hover:bg-slate-50/50 border-slate-50 group">
                      <TableCell className="py-5 pl-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-black">
                            {u.displayName?.charAt(0) || 'A'}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{u.displayName || 'Anonymous Aspirant'}</p>
                            <p className="text-xs text-slate-400 font-medium">{u.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "rounded-full px-3 py-1 font-black text-[9px] uppercase tracking-wider",
                          u.status === 'active' ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-100" : "bg-red-100 text-red-600 hover:bg-red-100"
                        )}>
                          {u.status || 'active'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {u.isVerified ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-slate-300" />
                          )}
                          <span className="text-xs font-bold text-slate-600">{u.isVerified ? 'Verified' : 'Pending'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs font-bold text-slate-600">
                          {u.createdAt ? format(u.createdAt.toDate(), 'MMM d, yyyy') : 'Recently'}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{u.role || 'Student'}</span>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl shadow-xl border-slate-100">
                            <DropdownMenuItem className="rounded-xl py-3 cursor-pointer">
                              <Eye className="w-4 h-4 mr-3 text-slate-400" />
                              <span className="font-bold text-xs">View Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="rounded-xl py-3 cursor-pointer"
                              onClick={() => {
                                setSelectedUser(u);
                                setIsBlockModalOpen(true);
                              }}
                            >
                              <UserX className="w-4 h-4 mr-3 text-amber-500" />
                              <span className="font-bold text-xs text-amber-600">
                                {u.status === 'blocked' ? 'Unblock Account' : 'Block Account'}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="rounded-xl py-3 cursor-pointer"
                              onClick={() => {
                                setSelectedUser(u);
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4 mr-3 text-red-500" />
                              <span className="font-bold text-xs text-red-600">Delete User</span>
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

      {/* Block Confirmation Modal */}
      <Dialog open={isBlockModalOpen} onOpenChange={setIsBlockModalOpen}>
        <DialogContent className="max-w-md rounded-[2rem] p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">
              {selectedUser?.status === 'blocked' ? 'Unblock User?' : 'Block User Account?'}
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              {selectedUser?.status === 'blocked' 
                ? `This will restore full access for ${selectedUser?.displayName}.`
                : `This will prevent ${selectedUser?.displayName} from logging into Vidhyaly.`
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser?.status !== 'blocked' && (
            <div className="py-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Reason for Block</label>
              <Input 
                placeholder="e.g. Violation of Community Guidelines" 
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="rounded-xl bg-slate-50 border-slate-100"
              />
            </div>
          )}

          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsBlockModalOpen(false)} className="rounded-xl h-12 font-bold px-8">Cancel</Button>
            <Button 
              onClick={handleToggleBlock}
              className={cn(
                "rounded-xl h-12 font-bold px-8 shadow-lg transition-all",
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
            <DialogTitle className="text-2xl font-headline font-bold text-red-600">Delete Account?</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              Are you sure you want to delete {selectedUser?.displayName}? This action is permanent and will move the user to the soft-delete queue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="rounded-xl h-12 font-bold px-8">Cancel</Button>
            <Button onClick={handleDeleteUser} className="rounded-xl h-12 font-bold px-8 bg-red-600 hover:bg-red-700 shadow-xl shadow-red-100">
              Permanently Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
