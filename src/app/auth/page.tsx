
"use client";

import React, { useState } from "react";
import { LogIn, Lock, Mail, UserPlus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAuth = () => {
    if (!email || !password || (isSignUp && !fullName)) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    alert(`${isSignUp ? "Account created" : "Sign in"} successful! (Demo)`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Orbs */}
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
              <motion.div
                key="signup-icon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <UserPlus className="w-7 h-7 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="signin-icon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <LogIn className="w-7 h-7 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h2 className="text-2xl font-headline font-bold mb-1 text-center text-slate-900">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-slate-500 text-xs mb-6 text-center max-w-[240px]">
          {isSignUp 
            ? "Join 10,000+ medical aspirants."
            : "Continue your journey to your dream medical seat."}
        </p>

        <div className="w-full flex flex-col gap-3 mb-4">
          <AnimatePresence mode="popLayout">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 2 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="relative overflow-hidden"
              >
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <div className="w-4 h-4 border-2 border-slate-300 rounded-sm" />
                </span>
                <input
                  placeholder="Full Name"
                  type="text"
                  value={fullName}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-slate-900 text-sm transition-all"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              placeholder="Email Address"
              type="email"
              value={email}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-slate-900 text-sm transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              placeholder="Password"
              type="password"
              value={password}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-slate-900 text-sm transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex justify-between items-center px-1">
            {error ? (
              <span className="text-[10px] font-bold text-destructive">{error}</span>
            ) : (
              <div />
            )}
            {!isSignUp && (
              <button className="text-[10px] text-primary hover:underline font-bold">
                Forgot password?
              </button>
            )}
          </div>
        </div>

        <Button
          onClick={handleAuth}
          className="w-full py-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2"
        >
          {isSignUp ? "Get Started" : "Sign In"}
          <ArrowRight className="w-4 h-4" />
        </Button>

        <div className="mt-6 text-center">
          <p className="text-slate-500 text-xs font-medium">
            {isSignUp ? "Already have an account?" : "New to Vidhyaly?"}{" "}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary font-bold hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        <Link href="/" className="mt-8 text-[10px] font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default AuthPage;
