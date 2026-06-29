'use client';

import React, { useState, useMemo } from 'react';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Trash2, 
  UserX, 
  Loader2,
  AlertCircle,
  Mail,
  Smartphone,
  Calendar,
  Globe,
  Users as UsersIcon,
  Crown,
  ShieldCheck,
  MessageSquare,
  Send,
  Zap
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { AdminService } from '@/services/admin-service';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function UserManagementPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const { user: currentAdmin, profile: adminProfile } = useUser();
  const adminService = useMemo(() => (db ? new AdminService(db) : null), [db]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'blocked'>('all');
  
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Message state
  const [msgTitle, setMsgTitle] = useState('');
  const [msgBody, setMsgBody] = useState('');

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

  const handleToggleBlock = async (user: any) => {
    if (!currentAdmin || !adminService) return;
    setIsProcessing(true);
    const nextStatus = user.status === 'blocked' ? 'active' : 'blocked';
    
    try {
      await adminService.updateUserStatus(
        currentAdmin.uid, 
        adminProfile?.displayName || currentAdmin.email || 'Admin',
        user.uid, 
        nextStatus
      );
      toast({
        title: nextStatus === 'active' ? "Access Reactivated" : "Access Restricted",
        description: `Student account status updated successfully.`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleSubscription = async (user: any) => {
    if (!currentAdmin || !adminService) return;
    setIsProcessing(true);
    
    const nextPlan = user.subscriptionPlan === 'pro' ? 'free' : 'pro';
    
    try {
      await adminService.updateSubscription(
        currentAdmin.uid, 
        adminProfile?.displayName || currentAdmin.email || 'Admin',
        user.uid, 
        nextPlan
      );
      toast({
        title: nextPlan === 'pro' ? "Promoted to Premium" : "Plan Set to Free",
        description: nextPlan === 'pro' 
          ? "User now has unlimited access for 12 months." 
          : "User has been moved back to standard tier.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteUser = async (user: any) => {
    if (!window.confirm("Are you sure you want to archive this user record?")) return;
    if (!currentAdmin || !adminService) return;
    setIsProcessing(true);
    
    try {
      await adminService.softDeleteUser(
        currentAdmin.uid, 
        adminProfile?.displayName || currentAdmin.email || 'Admin',
        user.uid
      );
      toast({
        title: "Record Archived",
        description: "Student data has been removed from active repository.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedUser || !msgTitle || !msgBody || !adminService) return;
    setIsProcessing(true);
    try {
      await adminService.sendNotification(selectedUser.uid, msgTitle, msgBody, 'message');
      toast({
        title: "Message Dispatched",
        description: `Your notification has been sent to ${selectedUser.displayName}.`,
      });
      setIsMessageOpen(false);
      setMsgTitle('');
      setMsgBody('');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900">User Repository</h1>
          <p className="text-sm text-slate-500 font-medium">Manage student accounts, permissions, and security status.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border shadow-sm flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <UsersIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Registered Students</p>
            <p className="text-lg font-black text-slate-900">{users?.length || 0}</p>
          </div>
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
                  <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Role</TableHead>
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
                    <TableCell colSpan={7} className="h-64 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-8 h-8 text-slate-200" />
                        <p className="text-slate-400 font-bold text-sm">No records found matching search criteria.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((u) => (
                    <TableRow key={u.uid} className="hover:bg-slate-50/50 border-slate-50 group">
                      <TableCell className="py-5 pl-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-black relative overflow-hidden">
                            {u.photoURL ? (
                              <img src={u.photoURL} alt="" className="w-full h-full object-cover" />
                            ) : (
                              u.displayName?.charAt(0) || u.email?.charAt(0)
                            )}
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
                          u.role === 'super-admin' ? "bg-purple-100 text-purple-600" : 
                          u.role === 'admin' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
                        )}>
                          {u.role || 'student'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "rounded-full px-3 py-1 font-black text-[9px] uppercase tracking-wider",
                          u.subscriptionPlan === 'pro' ? "bg-amber-100 text-amber-600 border border-amber-200" : "bg-slate-100 text-slate-500"
                        )}>
                          {u.subscriptionPlan === 'pro' && <Crown className="w-2.5 h-2.5 mr-1" />}
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
                          {u.registrationDate ? format(u.registrationDate.toDate(), 'MMM d, yyyy') : 'Recently'}
                        </p>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100">
                              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreVertical className="w-4 h-4" />}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl border-slate-100">
                            <DropdownMenuItem className="rounded-xl py-3 cursor-pointer" onClick={() => { setSelectedUser(u); setIsDetailsOpen(true); }}>
                              <Eye className="w-4 h-4 mr-3 text-slate-400" />
                              <span className="font-bold text-xs">Profile Overview</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl py-3 cursor-pointer" onClick={() => { setSelectedUser(u); setIsMessageOpen(true); }}>
                              <MessageSquare className="w-4 h-4 mr-3 text-primary" />
                              <span className="font-bold text-xs text-primary">Send Message</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="rounded-xl py-3 cursor-pointer"
                              onClick={() => handleToggleSubscription(u)}
                            >
                              {u.subscriptionPlan === 'pro' ? (
                                <>
                                  <Zap className="w-4 h-4 mr-3 text-slate-400" />
                                  <span className="font-bold text-xs text-slate-600">Downgrade to Free</span>
                                </>
                              ) : (
                                <>
                                  <Crown className="w-4 h-4 mr-3 text-amber-500" />
                                  <span className="font-bold text-xs text-amber-600">Promote to Premium</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="rounded-xl py-3 cursor-pointer"
                              onClick={() => handleToggleBlock(u)}
                            >
                              <UserX className={cn("w-4 h-4 mr-3", u.status === 'blocked' ? "text-emerald-500" : "text-amber-500")} />
                              <span className={cn("font-bold text-xs", u.status === 'blocked' ? "text-emerald-600" : "text-amber-600")}>
                                {u.status === 'blocked' ? 'Reactivate Access' : 'Restrict Access'}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="rounded-xl py-3 cursor-pointer"
                              onClick={() => handleDeleteUser(u)}
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
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border">
                 <Mail className="w-5 h-5 text-slate-400" />
                 <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase">Email</p>
                   <p className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{selectedUser?.email}</p>
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

            <div className="space-y-4">
              <div className={cn(
                "p-6 rounded-[2rem] border flex flex-col items-center text-center h-full justify-center",
                selectedUser?.subscriptionPlan === 'pro' ? "bg-indigo-50 border-indigo-100" : "bg-slate-50 border-slate-100"
              )}>
                 <div className={cn(
                   "w-12 h-12 rounded-2xl flex items-center justify-center mb-4",
                   selectedUser?.subscriptionPlan === 'pro' ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"
                 )}>
                   <Crown className="w-6 h-6" />
                 </div>
                 <Badge className={cn(
                   "mb-3 font-black text-[9px] uppercase",
                   selectedUser?.subscriptionPlan === 'pro' ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"
                 )}>
                   Plan: {selectedUser?.subscriptionPlan || 'free'}
                 </Badge>
                 <p className={cn(
                   "text-xs font-medium leading-relaxed px-4",
                   selectedUser?.subscriptionPlan === 'pro' ? "text-indigo-700" : "text-slate-500"
                 )}>
                   {selectedUser?.subscriptionPlan === 'pro' 
                     ? `Subscription active until ${selectedUser.subscriptionExpiryDate ? format(selectedUser.subscriptionExpiryDate.toDate(), 'PPP') : 'Indefinite'}`
                     : 'Standard free access tier with limited tool usage.'}
                 </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 text-white flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-slate-500">Security Status</p>
                   <p className="text-sm font-bold capitalize">{selectedUser?.status || 'Active'}</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-500">User ID</p>
                <p className="text-[9px] font-mono opacity-50 truncate max-w-[120px]">{selectedUser?.uid}</p>
             </div>
          </div>

          <DialogFooter className="mt-8">
            <Button onClick={() => setIsDetailsOpen(false)} variant="outline" className="rounded-xl h-12 font-bold px-10">Close Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent className="max-w-md rounded-[2.5rem] p-10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">Compose Notification</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-6">
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Message Title</label>
               <Input 
                 placeholder="e.g. Welcome to NEET 2027 Batch"
                 value={msgTitle}
                 onChange={(e) => setMsgTitle(e.target.value)}
                 className="rounded-xl border-slate-100 bg-slate-50/50"
               />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Content</label>
               <Textarea 
                 placeholder="Enter your message to the student..."
                 value={msgBody}
                 onChange={(e) => setMsgBody(e.target.value)}
                 className="min-h-[120px] rounded-xl border-slate-100 bg-slate-50/50 resize-none"
               />
             </div>
             <div className="bg-primary/5 p-4 rounded-2xl flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <p className="text-[10px] text-primary/70 font-bold leading-tight">
                  Student will receive this instantly in their dashboard notification center.
                </p>
             </div>
          </div>

          <DialogFooter className="gap-2">
            <Button onClick={() => setIsMessageOpen(false)} variant="ghost" className="rounded-xl h-12 font-bold">Discard</Button>
            <Button 
              disabled={!msgTitle || !msgBody || isProcessing}
              onClick={handleSendMessage}
              className="rounded-xl h-12 font-bold bg-primary hover:bg-primary/90 px-8"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4 mr-2" /> Send to Student</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
