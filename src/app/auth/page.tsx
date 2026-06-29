
"use client";

import React, { useState, useEffect } from "react";
import { LogIn, Lock, Mail, UserPlus, ArrowRight, Phone, Calendar, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth, useFirestore, useUser } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "venkateshchop14@gmail.com";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleAuth = async () => {
    if (!email || !password || (isSignUp && (!fullName || !phoneNumber || !age))) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth!, email, password);
        const firebaseUser = userCredential.user;
        const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        
        const userRef = doc(db!, "users", firebaseUser.uid);
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          displayName: fullName,
          email: firebaseUser.email,
          phoneNumber: phoneNumber,
          photoURL: firebaseUser.photoURL || "",
          age: age,
          role: isAdmin ? "super-admin" : "student",
          status: "active",
          subscriptionPlan: "free",
          subscriptionStartDate: null,
          subscriptionExpiryDate: null,
          registrationDate: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          loginProvider: "password",
          isVerified: isAdmin,
          googleAiApiKey: "", 
          createdAt: serverTimestamp(),
        });

        if (isAdmin) {
          await setDoc(doc(db!, "admins", firebaseUser.uid), {
            adminId: firebaseUser.uid,
            name: fullName,
            email: firebaseUser.email,
            role: "super-admin",
            permissions: ["*"],
            createdDate: serverTimestamp(),
            lastLogin: serverTimestamp()
          });
        }
        
        toast({
          title: isAdmin ? "Admin Initialized" : "Account Created!",
          description: isAdmin ? "Welcome Platform Director." : "Welcome to Vidhyaly.",
        });
      } else {
        const cred = await signInWithEmailAndPassword(auth!, email, password);
        await updateDoc(doc(db!, "users", cred.user.uid), {
          lastLoginAt: serverTimestamp()
        });
        toast({
          title: "Welcome Back!",
          description: "Successfully signed in.",
        });
      }
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error.message || "Failed to authenticate.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl shadow-primary/5 p-8 flex flex-col items-center border border-slate-100 z-10"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 shadow-inner">
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <motion.div key="signup-icon" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                {email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? <ShieldCheck className="w-7 h-7 text-primary" /> : <UserPlus className="w-7 h-7 text-primary" />}
              </motion.div>
            ) : (
              <motion.div key="signin-icon" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                <LogIn className="w-7 h-7 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h2 className="text-2xl font-headline font-bold mb-1 text-center text-slate-900">
          {isSignUp ? (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "Admin Setup" : "Create Account") : "Welcome Back"}
        </h2>

        <div className="w-full flex flex-col gap-3 my-6">
          <AnimatePresence mode="popLayout">
            {isSignUp && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-3 overflow-hidden">
                <div className="relative">
                  <UserPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input placeholder="Full Name" type="text" value={fullName} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm" onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input placeholder="Phone Number" type="text" value={phoneNumber} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm" onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input placeholder="Age" type="number" value={age} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm" onChange={(e) => setAge(e.target.value)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input placeholder="Email Address" type="email" value={email} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input placeholder="Password" type="password" value={password} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        <Button onClick={handleAuth} disabled={isLoading} className="w-full py-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-lg">
          {isLoading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{isSignUp ? "Create Account" : "Sign In"} <ArrowRight className="w-4 h-4 ml-2" /></>}
        </Button>

        <div className="mt-6 text-center">
          <p className="text-slate-500 text-xs font-medium">
            {isSignUp ? "Already have an account?" : "New to Vidhyaly?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary font-bold hover:underline">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        <Link href="/" className="mt-8 text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest">Back to Home</Link>
      </motion.div>
    </div>
  );
};

export default AuthPage;
