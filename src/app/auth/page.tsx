
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
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 p-8 md:p-10 flex flex-col items-center border border-slate-100 z-10"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8 shadow-inner">
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <motion.div
                key="signup-icon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <UserPlus className="w-8 h-8 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="signin-icon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <LogIn className="w-8 h-8 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h2 className="text-3xl font-headline font-bold mb-2 text-center text-slate-900">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h2>
        <p className="text-slate-500 text-sm mb-8 text-center max-w-[280px]">
          {isSignUp 
            ? "Join 10,000+ medical aspirants mastering NEET with precision."
            : "Sign in to continue your journey to your dream medical seat."}
        </p>

        <div className="w-full flex flex-col gap-4 mb-4">
          <AnimatePresence mode="popLayout">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 4 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="relative overflow-hidden"
              >
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="w-4 h-4 opacity-0" /> {/* Spacer */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-slate-300 rounded-sm" />
                  </div>
                </span>
                <input
                  placeholder="Full Name"
                  type="text"
                  value={fullName}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-slate-900 text-sm transition-all"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              placeholder="Email Address"
              type="email"
              value={email}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-slate-900 text-sm transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              placeholder="Password"
              type="password"
              value={password}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-slate-900 text-sm transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex justify-between items-center px-1">
            {error ? (
              <span className="text-xs font-bold text-destructive">{error}</span>
            ) : (
              <div />
            )}
            {!isSignUp && (
              <button className="text-xs text-primary hover:underline font-bold">
                Forgot password?
              </button>
            )}
          </div>
        </div>

        <Button
          onClick={handleAuth}
          className="w-full py-7 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2"
        >
          {isSignUp ? "Create Account" : "Sign In"}
          <ArrowRight className="w-5 h-5" />
        </Button>

        <div className="flex items-center w-full my-8">
          <div className="flex-grow border-t border-dashed border-slate-200"></div>
          <span className="mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
          <div className="flex-grow border-t border-dashed border-slate-200"></div>
        </div>

        <div className="flex gap-3 w-full justify-center mb-8">
          <button className="flex items-center justify-center w-full h-14 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all shadow-sm">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
          </button>
          <button className="flex items-center justify-center w-full h-14 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all shadow-sm">
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-5 h-5"
            />
          </button>
        </div>

        <p className="text-slate-500 text-sm font-medium">
          {isSignUp ? "Already have an account?" : "New to Vidhyaly?"}{" "}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary font-bold hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up for Free"}
          </button>
        </p>

        <Link href="/" className="mt-8 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default AuthPage;
