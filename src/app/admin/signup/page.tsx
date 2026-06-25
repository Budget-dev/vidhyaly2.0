
"use client";

import React, { useState } from "react";
import { UserPlus, Mail, ShieldAlert, ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const ADMIN_EMAIL = "venkateshchop14@gmail.com";

const AdminSignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleAdminSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict enforcement of hardcoded admin email
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "This email is not authorized for administrative initialization.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth!, email, password);
      const firebaseUser = userCredential.user;
      
      // Create privileged profile in Firestore
      const userRef = doc(db!, "users", firebaseUser.uid);
      await setDoc(userRef, {
        uid: firebaseUser.uid,
        displayName: fullName,
        email: firebaseUser.email,
        role: "super-admin",
        status: "active",
        isVerified: true,
        googleAiApiKey: "", 
        createdAt: serverTimestamp(),
      });
      
      toast({
        title: "Admin Initialized",
        description: "Super Admin privileges granted. Redirecting...",
      });
      router.push("/admin");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Initialization Error",
        description: error.message || "Failed to initialize admin account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center border border-slate-100"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <UserPlus className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-2xl font-headline font-bold text-slate-900 mb-2 text-center">Admin Initialization</h1>
        <p className="text-slate-500 text-sm mb-8 text-center font-medium">One-time setup for the Platform Director.</p>

        <form onSubmit={handleAdminSignup} className="w-full space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Venkatesh Choppa"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Authorized Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder={ADMIN_EMAIL}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Set Master Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 items-start mb-2">
             <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
             <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
               CAUTION: This path is only accessible to the authorized administrator. Attempting to use any other email will result in a security lock.
             </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-7 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? "Setting up..." : "Initialize Admin Role"}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/admin/login" className="text-xs font-bold text-primary hover:underline">
            Already initialized? Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSignupPage;
