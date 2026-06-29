"use client";

import React, { useMemo } from 'react';
import { Bell, MessageCircle, Star, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query, where, orderBy, doc, updateDoc, limit } from 'firebase/firestore';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function NotificationBell() {
  const { user, loading: userLoading } = useUser();
  const db = useFirestore();

  const notificationsQuery = useMemo(() => {
    // Only attempt to create query if database is ready and user is fully authenticated
    if (!db || !user || userLoading) return null;
    
    try {
      return query(
        collection(db, 'notifications'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
    } catch (e) {
      console.error("Failed to build notifications query:", e);
      return null;
    }
  }, [db, user, userLoading]);

  const { data: notifications, loading: collectionLoading } = useCollection(notificationsQuery);

  const unreadCount = useMemo(() => {
    return notifications?.filter(n => !n.read).length || 0;
  }, [notifications]);

  const markAsRead = async (id: string) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'notifications', id), { read: true });
    } catch (e) {
      console.error("Failed to mark notification as read:", e);
    }
  };

  const markAllAsRead = async () => {
    if (!notifications || !db) return;
    const unread = notifications.filter(n => !n.read);
    for (const n of unread) {
      markAsRead(n.id);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'promotion': return <Star className="w-4 h-4 text-amber-500" />;
      case 'system': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <MessageCircle className="w-4 h-4 text-primary" />;
    }
  };

  // Don't render anything if auth is still resolving to avoid premature rule checks
  if (userLoading) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative w-10 h-10 rounded-full bg-slate-50 border flex items-center justify-center hover:bg-slate-100 transition-colors group">
          <Bell className={cn("w-5 h-5 text-slate-500 group-hover:text-primary transition-colors", unreadCount > 0 && "animate-ring")} />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"
              />
            )}
          </AnimatePresence>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[380px] p-0 rounded-[1.5rem] shadow-2xl border-slate-100 overflow-hidden">
        <div className="p-5 border-b bg-slate-50/50 flex items-center justify-between">
           <div>
             <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{unreadCount} Unread Messages</p>
           </div>
           {unreadCount > 0 && (
             <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-primary" onClick={markAllAsRead}>
               Mark all read
             </Button>
           )}
        </div>

        <ScrollArea className="h-[400px]">
          {collectionLoading ? (
            <div className="p-12 text-center flex flex-col items-center gap-3">
               <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syncing Inbox...</p>
            </div>
          ) : !notifications || notifications.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center gap-4 opacity-30">
               <Bell className="w-12 h-12 text-slate-300" />
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {notifications.map((n: any) => (
                <div 
                  key={n.id} 
                  className={cn(
                    "p-5 transition-all hover:bg-slate-50 cursor-pointer relative group",
                    !n.read && "bg-primary/[0.02]"
                  )}
                  onClick={() => markAsRead(n.id)}
                >
                  <div className="flex gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border",
                      !n.read ? "bg-white border-primary/20" : "bg-slate-50 border-slate-100"
                    )}>
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                       <div className="flex items-center justify-between">
                         <h4 className={cn("text-sm font-bold leading-tight", !n.read ? "text-slate-900" : "text-slate-600")}>{n.title}</h4>
                         <span className="text-[9px] font-bold text-slate-400">
                           {n.createdAt ? format(n.createdAt.toDate(), 'MMM d') : 'Now'}
                         </span>
                       </div>
                       <p className={cn("text-xs leading-relaxed", !n.read ? "text-slate-600 font-medium" : "text-slate-400")}>
                         {n.message}
                       </p>
                    </div>
                  </div>
                  {!n.read && (
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-4 border-t bg-slate-50/30 text-center">
           <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-primary transition-colors">
             View All History
           </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}