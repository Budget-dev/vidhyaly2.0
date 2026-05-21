
"use client"

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, ArrowLeft, Send, User, MessageCircle } from "lucide-react";
import Link from "next/link";
import { VoiceChat } from "@/components/voice/voice-chat";
import { vidhyamithraChat } from "@/ai/flows/vidhyamithra-chat-flow";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

export default function VidhyamithraPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsProcessing(true);

    try {
      const response = await vidhyamithraChat({ message: userMessage.text });
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: response.text,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBotResponse = (text: string) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      role: "bot",
      text,
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-50 flex flex-col items-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[85vh] mt-8"
      >
        {/* Header */}
        <div className="bg-primary/5 p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
              <Bot className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-headline font-bold text-slate-900 leading-none mb-1">Vidhyamithra</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Mentor</p>
              </div>
            </div>
          </div>
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link href="/"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Chat History (Desktop) or Voice (Mobile) */}
          <div className="flex-1 flex flex-col border-r border-slate-50 overflow-hidden">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.length === 0 && (
                  <div className="text-center py-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI Study Companion
                    </div>
                    <h2 className="text-2xl font-headline font-bold text-slate-800">Hello Aspirant!</h2>
                    <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed">
                      Tap the mic to talk, or type your query below. I'm here for motivation, planning, and doubts.
                    </p>
                  </div>
                )}
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "flex items-end gap-3",
                        m.role === "user" ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                        m.role === "user" ? "bg-slate-100 border-slate-200" : "bg-primary/10 border-primary/20"
                      )}>
                        {m.role === "user" ? <User className="w-4 h-4 text-slate-500" /> : <Bot className="w-4 h-4 text-primary" />}
                      </div>
                      <div className={cn(
                        "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                        m.role === "user" 
                          ? "bg-slate-900 text-white rounded-br-none" 
                          : "bg-slate-50 text-slate-700 border border-slate-100 rounded-bl-none shadow-sm"
                      )}>
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isProcessing && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs italic ml-11">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Vidhyamithra is thinking...
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Bottom: Text Input */}
            <form onSubmit={handleSendMessage} className="p-6 border-t border-slate-50 bg-white">
              <div className="relative flex items-center gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <Button 
                  type="submit" 
                  disabled={!inputText.trim() || isProcessing}
                  className="rounded-xl w-12 h-12 bg-slate-900 hover:bg-slate-800 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>

          {/* Right: Voice Assistant */}
          <div className="w-full md:w-80 bg-slate-50/50 flex flex-col items-center justify-center border-t md:border-t-0">
            <div className="p-6 text-center space-y-4">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Voice Portal</h3>
               <VoiceChat 
                 onResponse={handleBotResponse} 
                 isProcessingExternal={isProcessing}
               />
               <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                 <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                   "Talk to me just like a friend. I can hear your doubts and help you stay on track."
                 </p>
               </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-100 text-center">
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]">
            Powered by Vidhyaly GenAI 2.0
          </p>
        </div>
      </motion.div>
    </div>
  );
}
