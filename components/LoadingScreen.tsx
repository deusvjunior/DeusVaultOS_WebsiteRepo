import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

interface DataStream {
  id: number;
  x: number;
  characters: string;
  speed: number;
  opacity: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [dataStreams, setDataStreams] = useState<DataStream[]>([]);
  const [loadingPhase, setLoadingPhase] = useState<'boot' | 'systems' | 'complete'>('boot');
  const [currentText, setCurrentText] = useState('INITIALIZING DEUSVAULTOS...');

  // Matrix-style data streams
  useEffect(() => {
    const generateDataStreams = () => {
      const newStreams: DataStream[] = [];
      const chars = '01デウスヴォルトABCDEF0123456789アイウエオカキクケコ';
      
      for (let i = 0; i < 25; i++) {
        newStreams.push({
          id: i,
          x: (i * 4) + Math.random() * 2,
          characters: Array.from({ length: 20 }, () => 
            chars[Math.floor(Math.random() * chars.length)]
          ).join(''),
          speed: 0.5 + Math.random() * 1.5,
          opacity: 0.3 + Math.random() * 0.7
        });
      }
      setDataStreams(newStreams);
    };

    generateDataStreams();
  }, []);

  // Fast loading progression with realistic system messages
  useEffect(() => {
    const messages = [
      'INITIALIZING DEUSVAULTOS...',
      'LOADING QUANTUM CORE...',
      'ESTABLISHING AI BRIDGE...',
      'MOUNTING FILESYSTEM...',
      'ACTIVATING NEURAL NETWORKS...',
      'SYNCHRONIZING BLOCKCHAIN...',
      'READY - DEUS VULT!'
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = 8 + Math.random() * 12; // Much faster loading
        const newProgress = Math.min(prev + increment, 100);
        
        // Update loading messages based on progress
        const messageIndex = Math.floor((newProgress / 100) * (messages.length - 1));
        setCurrentText(messages[messageIndex]);
        
        if (newProgress >= 50 && loadingPhase === 'boot') {
          setLoadingPhase('systems');
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setLoadingPhase('complete');
          setTimeout(onLoadingComplete, 800); // Faster completion
          return 100;
        }
        
        return newProgress;
      });
    }, 80); // Faster updates

    return () => clearInterval(interval);
  }, [loadingPhase, onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Blurry Glassmorphic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-850/90 backdrop-blur-sm">
        {/* Subtle background particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated Bubbles */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              className="absolute rounded-full glassmorphic-bubble border border-white/20 shadow-2xl"
              style={{
                width: bubble.size,
                height: bubble.size,
                backgroundColor: `${bubble.color}20`,
                borderColor: `${bubble.color}40`,
                boxShadow: `0 0 ${bubble.size}px ${bubble.color}30, inset 0 0 ${bubble.size/2}px ${bubble.color}20`
              }}
              initial={{
                x: `${bubble.x}vw`,
                y: `${bubble.y}vh`,
                opacity: 0,
                scale: 0
              }}
              animate={{
                x: `${bubble.x}vw`,
                y: `${Math.max(10, bubble.y - (progress * 1.2))}vh`,
                opacity: bubble.opacity * (progress / 100),
                scale: 1,
                rotate: 360
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: bubble.delay / 1000,
                ease: "easeOut",
                rotate: {
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              {/* Inner bubble glow */}
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${bubble.color}40, transparent 70%)`
                }}
              />
              
              {/* Highlight spot */}
              <div 
                className="absolute top-1 left-1 w-2 h-2 bg-white/60 rounded-full blur-sm"
                style={{
                  width: bubble.size * 0.15,
                  height: bubble.size * 0.15
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Central Loading Interface */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="glassmorphic-island p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Logo with Floating Effect */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                DEUS VAULT OS
              </h1>
              <p className="text-white/70 text-lg font-light tracking-wider">
                Premium Operating System
              </p>
            </motion.div>

            {/* Bubble Progress Indicator */}
            <div className="relative w-80 h-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400/80 via-emerald-400/80 to-yellow-400/80 rounded-full"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              
              {/* Flowing bubble effect in progress bar */}
              <motion.div
                className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                animate={{ x: [-32, 320] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.5
                }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.div 
              className="text-3xl font-mono text-white/90"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {Math.floor(progress)}%
            </motion.div>

            {/* Phase Messages */}
            <motion.div 
              className="text-cyan-300 text-sm font-light tracking-wide h-6"
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {phase === 'spawning' && "Spawning quantum bubbles..."}
              {phase === 'filling' && "Filling reality matrix..."}
              {phase === 'revealing' && "Preparing immersive experience..."}
              {phase === 'complete' && "Welcome to the future"}
            </motion.div>

            {/* Bubble count indicator */}
            <div className="text-white/50 text-xs font-mono">
              {Math.floor((progress / 100) * 120)} / 120 bubbles spawned
            </div>
          </div>
        </motion.div>
      </div>

      {/* Final Reveal Effect */}
      <AnimatePresence>
        {phase === 'complete' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingScreen;
