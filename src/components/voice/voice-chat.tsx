
"use client";

import { Mic, Volume2, Sparkles, Loader2, Square, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { vidhyamithraChat } from "@/ai/flows/vidhyamithra-chat-flow";

interface VoiceChatProps {
  onResponse?: (text: string) => void;
  className?: string;
  isProcessingExternal?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocity: { x: number; y: number };
}

export function VoiceChat({
  onResponse,
  className,
  isProcessingExternal = false,
}: VoiceChatProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>(Array(32).fill(0));
  const [particles, setParticles] = useState<Particle[]>([]);
  const [volume, setVolume] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const animationRef = useRef<number>(null);

  // Generate particles for ambient effect
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 400,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      velocity: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5
      }
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.velocity.x + 400) % 400,
        y: (p.y + p.velocity.y + 400) % 400,
        opacity: p.opacity + (Math.random() - 0.5) * 0.02
      })));
      animationRef.current = requestAnimationFrame(animateParticles);
    };
    animationRef.current = requestAnimationFrame(animateParticles);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Waveform and Volume simulation
  useEffect(() => {
    if (isListening || isSpeaking) {
      const interval = setInterval(() => {
        const newWaveform = Array(32).fill(0).map(() => Math.random() * 100);
        setWaveformData(newWaveform);
        setVolume(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setWaveformData(Array(32).fill(0));
      setVolume(0);
    }
  }, [isListening, isSpeaking]);

  const startListening = () => {
    // Interruption: Stop any existing audio
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

  const getStatusText = () => {
    if (isListening) return "Listening...";
    if (currentProcessing) return "Processing...";
    if (isSpeaking) return "Speaking...";
    return "Tap to speak";
  };

  const getStatusColor = () => {
    if (isListening) return "text-primary";
    if (currentProcessing) return "text-amber-500";
    if (isSpeaking) return "text-emerald-500";
    return "text-slate-400";
  };

  return (
    <div className={cn("flex flex-col items-center justify-center relative py-12 px-4 overflow-hidden", className)}>
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{ left: particle.x, top: particle.y, opacity: particle.opacity }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Background glow effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-64 h-64 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-3xl"
          animate={{
            scale: isListening ? [1, 1.2, 1] : [1, 1.1, 1],
            opacity: isListening ? [0.3, 0.6, 0.3] : [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8">
        <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <motion.button
            onClick={isListening ? stopListening : startListening}
            className={cn(
              "relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 bg-white shadow-2xl border",
              isListening ? "border-primary shadow-primary/20" :
              currentProcessing ? "border-amber-400 shadow-amber-200/50" :
              isSpeaking ? "border-emerald-400 shadow-emerald-200/50" :
              "border-slate-100 hover:border-primary/50"
            )}
            animate={{
              boxShadow: isListening 
                ? ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 20px rgba(59, 130, 246, 0)"]
                : undefined
            }}
            transition={{ duration: 1.5, repeat: isListening ? Infinity : 0 }}
          >
            <AnimatePresence mode="wait">
              {currentProcessing ? (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                </motion.div>
              ) : isSpeaking ? (
                <motion.div key="speaking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Volume2 className="w-12 h-12 text-emerald-500" />
                </motion.div>
              ) : isListening ? (
                <motion.div key="listening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Square className="w-12 h-12 text-primary fill-primary/10" />
                </motion.div>
              ) : (
                <motion.div key="mic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Mic className="w-12 h-12 text-slate-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Waveform visualizer */}
        <div className="flex items-center justify-center space-x-1 h-16">
          {waveformData.map((height, index) => (
            <motion.div
              key={index}
              className={cn(
                "w-1 rounded-full",
                isListening ? "bg-primary" : currentProcessing ? "bg-amber-500" : isSpeaking ? "bg-emerald-500" : "bg-slate-100"
              )}
              animate={{ height: `${Math.max(4, height * 0.6)}px`, opacity: isListening || isSpeaking ? 1 : 0.3 }}
            />
          ))}
        </div>

        <div className="text-center space-y-2">
          <p className={cn("text-base font-bold uppercase tracking-widest", getStatusColor())}>
            {getStatusText()}
          </p>
          
          {volume > 0 && (
            <motion.div className="flex items-center justify-center space-x-2">
              <VolumeX className="w-4 h-4 text-slate-300" />
              <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div className="h-full bg-primary" animate={{ width: `${volume}%` }} />
              </div>
              <Volume2 className="w-4 h-4 text-slate-300" />
            </motion.div>
          )}
        </div>

        <motion.div
          className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Vidhyaly AI Friend</span>
        </motion.div>
      </div>
    </div>
  );
}
