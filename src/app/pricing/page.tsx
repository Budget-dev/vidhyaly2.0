"use client"

import React, { useState } from "react";
import PricingSection1 from "@/components/ui/pricing-section-1";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    // Check if Razorpay is loaded
    if (typeof (window as any).Razorpay === 'undefined') {
      alert("Payment system is loading, please try again in a moment.");
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_placeholder", // Replace with actual Razorpay Key ID
      amount: 49900, // Amount in paise (₹499.00)
      currency: "INR",
      name: "Vidhyaly Education",
      description: "NEET Pro Aspirant Plan - 1 Year",
      image: "https://vidhyaly.com/logo.svg",
      handler: function (response: any) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        window.location.href = "/dashboard";
      },
      prefill: {
        name: "Aspirant User",
        email: "user@example.com",
        contact: "+919876543210",
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
      {/* Navbar Padding & Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-12">
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

      <div className="text-center pb-24">
        <p className="text-sm text-slate-400 font-medium">
          Have questions? <Link href="/contact" className="text-primary hover:underline font-bold">Talk to a counselor</Link>
        </p>
      </div>
    </div>
  );
}
