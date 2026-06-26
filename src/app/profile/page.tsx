
"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  User as UserIcon, 
  Key, 
  Settings, 
  ShieldCheck, 
  AlertCircle, 
  ChevronRight, 
  LogOut,
  Sparkles,
  ArrowLeft,
  Mail,
  Smartphone,
  Crown,
  Calendar,
  UserCheck
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUser, useFirestore, useAuth } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, profile, loading } = useUser();
  const [apiKey, setApiKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const isPro = profile?.role === 'admin' || profile?.role === 'super-admin' || profile?.isPro;

  useEffect(() => {
    if (profile?.googleAiApiKey) {
      setApiKey(profile.googleAiApiKey);
      setIsSaved(true);
    }
  }, [profile]);

  const handleSaveKey = async () => {
    if (!user || !db) return;
    setIsUpdating(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        googleAiApiKey: apiKey
      });
      setIsSaved(true);
      toast({
        title: "API Key Saved",
        description: "Your key is now securely linked to your account.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Saving Key",
        description: error.message || "Failed to update profile.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth!);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.push("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <Link href="/"><ArrowLeft className="w-5 h-5" /></Link>
            </Button>
            <h1 className="text-3xl font-headline font-bold">My Profile</h1>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleSignOut}
            className="text-destructive font-bold text-xs uppercase tracking-widest gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 border shadow-sm flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 relative">
                <UserIcon className="w-12 h-12 text-primary" />
                <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
              <h2 className="text-xl font-bold mb-1">{profile?.displayName || "Aspirant"}</h2>
              <p className="text-sm text-slate-500 mb-6 font-medium">NEET 2027 Aspirant</p>
              
              <div className="w-full space-y-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                    <p className="text-sm font-bold text-slate-700 truncate max-w-[180px]">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                    <p className="text-sm font-bold text-slate-700">{profile?.phoneNumber || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Age</p>
                    <p className="text-sm font-bold text-slate-700">{profile?.age || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={cn(
              "rounded-[2rem] p-8 space-y-4 shadow-xl border",
              isPro ? "bg-gradient-to-br from-emerald-600 to-emerald-800 border-emerald-500" : "bg-gradient-to-br from-slate-900 to-slate-800 border-slate-800"
            )}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white">Subscription</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-medium">
                {isPro ? "Pro Plan Active - Enjoy unlimited NCERT mastery." : "Free Tier - Upgrade to unlock all study tools."}
              </p>
              {!isPro && (
                <Button asChild className="w-full rounded-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-lg transition-all hover:scale-[1.02]">
                  <Link href="/pricing">Unlock All Features (₹199)</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: AI Config */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 border shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-3 rounded-2xl">
                    <Key className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">AI Companion Config</h3>
                    <p className="text-xs text-slate-400 font-medium">Power Vidhyamithra with your key</p>
                  </div>
                </div>
                {isSaved && (
                  <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border border-green-100">
                    <ShieldCheck className="w-3 h-3" /> Linked
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Google AI API Key</label>
                  <div className="relative">
                    <Input 
                      type="password"
                      value={apiKey}
                      onChange={(e) => {
                        setApiKey(e.target.value);
                        setIsSaved(false);
                      }}
                      placeholder="Enter your personal API key..."
                      className="rounded-2xl py-6 pr-12 border-slate-200 focus:ring-primary/20"
                    />
                    <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium flex items-start gap-1.5 mt-2">
                    <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                    Your key is used to provide unlimited personalized AI mentoring.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Button 
                    onClick={handleSaveKey} 
                    disabled={isUpdating}
                    className="rounded-2xl py-6 font-bold shadow-lg transition-all active:scale-95 bg-slate-900"
                  >
                    {isUpdating ? "Saving..." : "Save Configuration"}
                  </Button>
                </div>
              </div>
            </div>

            <Link 
              href="/ai-friend/vidhyamithra" 
              className="group flex items-center justify-between p-6 bg-indigo-600 rounded-[2rem] text-white hover:bg-indigo-700 transition-all shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold">Chat with Vidhyamithra</h4>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">Start Session</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-white/30 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
