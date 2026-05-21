"use client";

import { Mic, Volume2, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface VoiceChatProps {
  onStart?: () => void;
  onStop?: (duration: number) => void;
  onVolumeChange?: (volume: number) => void;
  className?: string;
  demoMode?: boolean;
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
  onStart,
  onStop,
  onVolumeChange,
  className,
  demoMode = true
}: VoiceChatProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [duration, setDuration] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [waveformData, setWaveformData] = useState<number[]>(Array(24).fill(0));
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const animationRef = useRef<number>(null);

  // Generate particles for ambient effect
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 300,
          y: Math.random() * 300,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.2 + 0.1,
          velocity: {
            x: (Math.random() - 0.5) * 0.3,
            y: (Math.random() - 0.5) * 0.3
          }
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.velocity.x + 300) % 300,
        y: (particle.y + particle.velocity.y + 300) % 300,
        opacity: Math.max(0.1, Math.min(0.4, particle.opacity + (Math.random() - 0.5) * 0.01))
      })));
      animationRef.current = requestAnimationFrame(animateParticles);
    };

    animationRef.current = requestAnimationFrame(animateParticles);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Timer and waveform simulation
  useEffect(() => {
    if (isListening || isSpeaking) {
      intervalRef.current = setInterval(() => {
        if (isListening) setDuration(prev => prev + 1);
        
        // Simulate audio waveform
        const newWaveform = Array(24).fill(0).map(() => 
          Math.random() * (isListening || isSpeaking ? 80 : 10)
        );
        setWaveformData(newWaveform);
        
        // Simulate volume changes
        const newVolume = Math.random() * 100;
        setVolume(newVolume);
        onVolumeChange?.(newVolume);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setWaveformData(Array(24).fill(0));
      setVolume(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isListening, isSpeaking, onVolumeChange]);

  // Demo mode simulation
  useEffect(() => {
    if (!demoMode) return;

    let isMounted = true;

    const demoSequence = async () => {
      if (!isMounted) return;

      // Start listening
      setIsListening(true);
      onStart?.();
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      if (!isMounted) return;
      
      // Stop listening and start processing
      setIsListening(false);
      setIsProcessing(true);
      onStop?.(duration);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (!isMounted) return;
      
      // Start speaking response
      setIsProcessing(false);
      setIsSpeaking(true);
      
      await new Promise(resolve => setTimeout(resolve, 4000));
      if (!isMounted) return;
      
      // Reset
      setIsSpeaking(false);
      setDuration(0);
      
      // Repeat demo
      setTimeout(demoSequence, 2000);
    };

    const timeout = setTimeout(demoSequence, 1000);
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [demoMode, onStart, onStop, duration]);

  const handleToggleListening = () => {
    if (demoMode) return;
    
    if (isListening) {
      setIsListening(false);
      onStop?.(duration);
      setDuration(0);
    } else {
      setIsListening(true);
      onStart?.();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusText = () => {
    if (isListening) return "Listening to you...";
    if (isProcessing) return "Thinking...";
    if (isSpeaking) return "Vidhyamithra speaking...";
    return "Tap to start conversation";
  };

  const getStatusColor = () => {
    if (isListening) return "text-primary";
    if (isProcessing) return "text-amber-500";
    if (isSpeaking) return "text-emerald-500";
    return "text-slate-400";
  };

  return (
    <div className={cn("flex flex-col items-center justify-center relative py-12 px-4", className)}>
      {/* Ambient particles container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity
            }}
            animate={{
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Background glow effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: isListening ? [1, 1.4, 1] : [1, 1.1, 1],
            opacity: isListening ? [0.4, 0.8, 0.4] : [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-10">
        {/* Main voice button */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.button
            onClick={handleToggleListening}
            className={cn(
              "relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 bg-white shadow-2xl border",
              isListening ? "border-primary shadow-primary/20" :
              isProcessing ? "border-amber-400 shadow-amber-200/50" :
              isSpeaking ? "border-emerald-400 shadow-emerald-200/50" :
              "border-slate-100"
            )}
          >
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                </motion.div>
              ) : isSpeaking ? (
                <motion.div
                  key="speaking"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Volume2 className="w-10 h-10 text-emerald-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="mic"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Mic className={cn("w-10 h-10", isListening ? "text-primary" : "text-slate-300")} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Pulse rings */}
          <AnimatePresence>
            {isListening && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/10"
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5
                  }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Waveform visualizer */}
        <div className="flex items-center justify-center space-x-1 h-12">
          {waveformData.map((height, index) => (
            <motion.div
              key={index}
              className={cn(
                "w-1 rounded-full transition-colors duration-500",
                isListening ? "bg-primary" :
                isProcessing ? "bg-amber-400" :
                isSpeaking ? "bg-emerald-400" :
                "bg-slate-100"
              )}
              animate={{
                height: `${Math.max(4, height * 0.5)}px`,
                opacity: isListening || isSpeaking ? 1 : 0.4
              }}
              transition={{
                duration: 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Status and timer */}
        <div className="text-center space-y-2">
          <motion.p
            className={cn("text-base font-bold uppercase tracking-widest transition-colors", getStatusColor())}
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{
              duration: 2,
              repeat: isListening || isProcessing || isSpeaking ? Infinity : 0
            }}
          >
            {getStatusText()}
          </motion.p>
          
          <p className="text-xs font-mono text-slate-400">
            {isListening || isSpeaking ? formatTime(duration) : "00:00"}
          </p>
        </div>

        {/* AI indicator */}
        <motion.div
          className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Real-time Intelligence</span>
        </motion.div>
      </div>
    </div>
  );
}
