
"use client";

import React, { useState, useEffect } from "react";
import { LogIn, Lock, Mail, UserPlus, ArrowRight, Phone, Calendar, ShieldCheck, MapPin, School, Target, Trophy, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth, useFirestore, useUser } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const ADMIN_EMAIL = "venkateshchop14@gmail.com";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  
  // New Signup Fields
  const [parentPhoneNumber, setParentPhoneNumber] = useState("");
  const [attemptNumber, setAttemptNumber] = useState("");
  const [previousScore, setPreviousScore] = useState("");
  const [targetGoal, setTargetGoal] = useState("");
  const [location, setLocation] = useState("");
  const [targetCollege, setTargetCollege] = useState("");
  const [referralSource, setReferralSource] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleAuth = async () => {
    if (!email || !password || (isSignUp && (!fullName || !phoneNumber || !age || !attemptNumber || !targetGoal || !location))) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in all required preparation details.",
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
          parentPhoneNumber: parentPhoneNumber || null,
          photoURL: firebaseUser.photoURL || "",
          age: age,
          attemptNumber: attemptNumber,
          previousScore: previousScore ? Number(previousScore) : 0,
          targetGoal: Number(targetGoal),
          location: location,
          targetCollege: targetCollege || "Undecided",
          referralSource: referralSource,
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
          title: isAdmin ? "Admin Initialized" : "Preparation Started!",
          description: isAdmin ? "Welcome Platform Director." : `Welcome to Vidhyaly, ${fullName}.`,
        });
      } else {
        const cred = await signInWithEmailAndPassword(auth!, email, password);
        await updateDoc(doc(db!, "users", cred.user.uid), {
          lastLoginAt: serverTimestamp()
        });
        toast({
          title: "Welcome Back!",
          description: "Syncing your NEET roadmap...",
        });
      }
      router.push("/");
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
        className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl shadow-primary/5 flex flex-col items-center border border-slate-100 z-10 overflow-hidden"
      >
        <div className="w-full p-8 flex flex-col items-center">
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
            {isSignUp ? (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "Admin Setup" : "Aspirant Onboarding") : "Welcome Back"}
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest text-center mb-6">
            {isSignUp ? "Personalize your success roadmap" : "Access your NEET 2027 dashboard"}
          </p>

          <div className="w-full space-y-4">
            <ScrollArea className={isSignUp ? "h-[450px] pr-4" : "h-auto"}>
              <div className="flex flex-col gap-3 pb-2">
                <AnimatePresence mode="popLayout">
                  {isSignUp && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-3 overflow-hidden">
                      <div className="relative">
                        <UserPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input placeholder="Full Name" type="text" value={fullName} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold" onChange={(e) => setFullName(e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input placeholder="Phone Number" type="text" value={phoneNumber} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold" onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input placeholder="Age" type="number" value={age} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold" onChange={(e) => setAge(e.target.value)} />
                        </div>
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                        <input placeholder="Parent Phone Number (Optional)" type="text" value={parentPhoneNumber} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold" onChange={(e) => setParentPhoneNumber(e.target.value)} />
                      </div>

                      <div className="h-px bg-slate-100 my-2" />
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Preparation Details</p>

                      <div className="relative">
                        <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <select 
                          value={attemptNumber}
                          onChange={(e) => setAttemptNumber(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold appearance-none"
                        >
                          <option value="">Which NEET attempt is this?</option>
                          <option value="1st">1st Attempt (Freshie)</option>
                          <option value="2nd">2nd Attempt (Dropper)</option>
                          <option value="3rd">3rd Attempt</option>
                          <option value="4th+">4th or more</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Trophy className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input placeholder="Previous Score" type="number" value={previousScore} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold" onChange={(e) => setPreviousScore(e.target.value)} />
                        </div>
                        <div className="relative">
                          <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                          <input placeholder="Target Score" type="number" value={targetGoal} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold" onChange={(e) => setTargetGoal(e.target.value)} />
                        </div>
                      </div>

                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input placeholder="Location (City, State)" type="text" value={location} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold" onChange={(e) => setLocation(e.target.value)} />
                      </div>

                      <div className="relative">
                        <School className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input placeholder="Target Medical College" type="text" value={targetCollege} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold" onChange={(e) => setTargetCollege(e.target.value)} />
                      </div>

                      <div className="relative">
                        <Info className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <select 
                          value={referralSource}
                          onChange={(e) => setReferralSource(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold appearance-none"
                        >
                          <option value="">How did you hear about us?</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Facebook">Facebook</option>
                          <option value="YouTube">YouTube</option>
                          <option value="Friend/Family">From a Friend/Family</option>
                          <option value="Google Search">Google Search</option>
                          <option value="Other">Other Social Media</option>
                        </select>
                      </div>

                      <div className="h-px bg-slate-100 my-2" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input placeholder="Email Address" type="email" value={email} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input placeholder="Password" type="password" value={password} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-bold" onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
            </ScrollArea>

            <Button onClick={handleAuth} disabled={isLoading} className="w-full py-7 rounded-2xl bg-slate-950 hover:bg-black text-white font-bold text-base shadow-xl transition-all">
              {isLoading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{isSignUp ? "Initialize Dashboard" : "Sign In to Prep"} <ArrowRight className="w-4 h-4 ml-2" /></>}
            </Button>

            <div className="text-center pt-2">
              <p className="text-slate-500 text-xs font-bold">
                {isSignUp ? "Already part of a batch?" : "New to Vidhyaly?"}{" "}
                <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline underline-offset-4">
                  {isSignUp ? "Sign In" : "Start Free Prep"}
                </button>
              </p>
            </div>

            <div className="flex items-center justify-center pt-6">
              <Link href="/" className="text-[10px] font-black text-slate-300 hover:text-slate-500 uppercase tracking-[0.3em] transition-colors">
                Back to Public Site
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
