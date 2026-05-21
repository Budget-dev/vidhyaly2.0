
"use client";

import { Mic, Volume2, Sparkles, Loader2, Square } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { vidhyamithraChat } from "@/ai/flows/vidhyamithra-chat-flow";

interface VoiceChatProps {
  onResponse?: (text: string) => void;
  className?: string;
  isProcessingExternal?: boolean;
}

export function VoiceChat({
  onResponse,
  className,
  isProcessingExternal = false,
}: VoiceChatProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>(Array(24).fill(0));
  const [particles, setParticles] = useState<any[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const animationFrameRef = useRef<number>(null);

  // Initialize Particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 300,
      y: Math.random() * 300,
      velocity: { x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5 },
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  // Animate Particles
  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + p.velocity.x + 300) % 300,
          y: (p.y + p.velocity.y + 300) % 300,
        }))
      );
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Waveform effect
  useEffect(() => {
    if (isListening || isSpeaking) {
      const interval = setInterval(() => {
        setWaveformData(Array(24).fill(0).map(() => Math.random() * 100));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setWaveformData(Array(24).fill(0));
    }
  }, [isListening, isSpeaking]);

  // Handle Speech Recognition
  const startListening = () => {
    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      setIsSpeaking(false);
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript;
      handleChat(text);
    };

    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleChat = async (text: string) => {
    setIsProcessing(true);
    try {
      const result = await vidhyamithraChat({ message: text });
      if (onResponse) onResponse(result.text);

      if (result.audio) {
        const audio = new Audio(result.audio);
        audioRef.current = audio;
        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => setIsSpeaking(false);
        audio.play();
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const currentProcessing = isProcessing || isProcessingExternal;

  return (
    <div className={cn("flex flex-col items-center justify-center relative py-12 px-4", className)}>
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{ left: p.x, top: p.y, opacity: p.opacity }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-10">
        <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <motion.button
            onClick={isListening ? stopListening : startListening}
            className={cn(
              "relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 bg-white shadow-2xl border",
              isListening ? "border-primary shadow-primary/20" :
              currentProcessing ? "border-amber-400 shadow-amber-200/50" :
              isSpeaking ? "border-emerald-400 shadow-emerald-200/50" :
              "border-slate-100"
            )}
          >
            <AnimatePresence mode="wait">
              {currentProcessing ? (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                </motion.div>
              ) : isSpeaking ? (
                <motion.div key="speaking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Volume2 className="w-10 h-10 text-emerald-500" />
                </motion.div>
              ) : isListening ? (
                <motion.div key="listening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Square className="w-10 h-10 text-primary fill-primary/10" />
                </motion.div>
              ) : (
                <motion.div key="mic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Mic className="w-10 h-10 text-slate-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Pulse rings */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Waveform */}
        <div className="flex items-center justify-center space-x-1 h-12">
          {waveformData.map((height, index) => (
            <motion.div
              key={index}
              className={cn("w-1 rounded-full", isListening ? "bg-primary" : isSpeaking ? "bg-emerald-400" : "bg-slate-100")}
              animate={{ height: `${Math.max(4, height * 0.5)}px` }}
            />
          ))}
        </div>

        <div className="text-center">
          <p className={cn("text-base font-bold uppercase tracking-widest", isListening ? "text-primary" : currentProcessing ? "text-amber-500" : isSpeaking ? "text-emerald-500" : "text-slate-400")}>
            {isListening ? "Listening..." : currentProcessing ? "Thinking..." : isSpeaking ? "Vidhyamithra Speaking..." : "Tap to Speak"}
          </p>
        </div>
      </div>
    </div>
  );
}
