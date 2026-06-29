"use client"

import React, { useState, useMemo } from "react";
import PricingSection1 from "@/components/ui/pricing-section-1";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFirestore, useUser } from "@/firebase";
import { doc, updateDoc, serverTimestamp, collection, addDoc, Timestamp } from "firebase/firestore";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const db = useFirestore();
  const { user, profile } = useUser();

  const handlePayment = async (planName: string, amount: number) => {
    if (amount === 0) {
      window.location.href = "/dashboard";
      return;
    }

    if (!user || !db) {
      alert("Please login to proceed with purchase.");
      return;
    }

    setLoading(true);
    
    // Check if Razorpay is loaded
    if (typeof (window as any).Razorpay === 'undefined') {
      alert("Payment system is loading, please try again in a moment.");
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_placeholder", // Replace with actual Razorpay Key ID
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Vidhyaly Education",
      description: `NEET ${planName} Plan - 1 Year`,
      image: "https://vidhyaly.com/logo.svg",
      handler: async function (response: any) {
        // Handle Successful Payment in Firestore
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        try {
          await updateDoc(doc(db, "users", user.uid), {
            subscriptionPlan: "pro",
            subscriptionStartDate: serverTimestamp(),
            subscriptionExpiryDate: Timestamp.fromDate(expiryDate),
            status: "active"
          });

          // Push Congratulations Notification
          await addDoc(collection(db, "notifications"), {
            userId: user.uid,
            title: "Congratulations!",
            message: "Welcome to Vidhyaly Pro. Your unlimited preparation journey starts now. Happy Learning!",
            type: "promotion",
            read: false,
            createdAt: serverTimestamp()
          });

          alert("Payment Successful! Welcome to Vidhyaly Pro.");
          window.location.href = "/dashboard";
        } catch (err) {
          console.error("Purchase sync error:", err);
        }
      },
      prefill: {
        name: profile?.displayName || "Aspirant User",
        email: user.email || "user@example.com",
        contact: profile?.phoneNumber || "",
      },
      notes: {
        address: "Vidhyaly Education, India",
      },
      theme: {
        color: "#4F46E5",
      },
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay Error:", err);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Button asChild variant="ghost" className="rounded-full gap-2 text-slate-500 font-bold">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <PricingSection1 
        onPlanSelect={handlePayment} 
        isLoading={loading} 
      />

      <div className="text-center pb-12">
        <p className="text-sm text-slate-400 font-medium">
          Have questions? <Link href="/contact" className="text-primary hover:underline font-bold">Talk to a counselor</Link>
        </p>
      </div>
    </div>
  );
}
