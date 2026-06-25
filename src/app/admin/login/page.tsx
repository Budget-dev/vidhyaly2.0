
"use client";

import React, { useState, useEffect } from "react";
import { Lock, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth, useUser } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const { user, profile } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user && (profile?.role === 'admin' || profile?.role === 'super-admin')) {
      router.push("/admin");
    }
  }, [user, profile, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth!, email, password);
      toast({
        title: "Admin Verified",
        description: "Welcome back to the Command Center.",
      });
      router.push("/admin");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Invalid credentials or unauthorized access.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 shadow-xl shadow-slate-200">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-2xl font-headline font-bold text-slate-900 mb-2 text-center">Admin Access</h1>
        <p className="text-slate-500 text-sm mb-8 text-center font-medium">Enter your credentials to manage Vidhyaly.</p>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-slate-200 outline-none transition-all"
                placeholder="venkateshchop14@gmail.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Master Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-slate-200 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-7 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? "Validating..." : "Enter Command Center"}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <Link href="/admin/signup" className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">
            Initialize Admin Account?
          </Link>
          <div className="h-px w-8 bg-slate-100 mx-auto" />
          <Link href="/" className="block text-[10px] font-black text-slate-300 hover:text-slate-400 transition-colors uppercase tracking-widest">
            Back to Public Site
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
