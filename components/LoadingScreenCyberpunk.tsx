import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreenCyberpunk: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'initializing' | 'connecting' | 'loading' | 'complete'>('initializing');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix-style digital rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(1);
    const chars = '01DEUSVAULT╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀'.split('');

    const draw = () => {
      // Fade background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Professional monochrome colors - elegant and refined
      const colors = ['#ffffff', '#f0f0f0', '#e0e0e0', '#d0d0d0', '#c0c0c0'];
      
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        
        ctx.fillText(char, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  // Progress simulation
  useEffect(() => {
    const phases = [
      { name: 'initializing', duration: 1500, endProgress: 20 },
      { name: 'connecting', duration: 2000, endProgress: 60 },
      { name: 'loading', duration: 2500, endProgress: 100 }
    ];

    let currentPhaseIndex = 0;
    let startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const currentPhase = phases[currentPhaseIndex];
      
      if (elapsed >= currentPhase.duration) {
        if (currentPhaseIndex < phases.length - 1) {
          currentPhaseIndex++;
          startTime = Date.now();
          setPhase(phases[currentPhaseIndex].name as any);
        } else {
          setProgress(100);
          setPhase('complete');
          setTimeout(onLoadingComplete, 500);
          return;
        }
      }

      const phaseProgress = Math.min(elapsed / currentPhase.duration, 1);
      const previousProgress = currentPhaseIndex > 0 ? phases[currentPhaseIndex - 1].endProgress : 0;
      const targetProgress = previousProgress + (currentPhase.endProgress - previousProgress) * phaseProgress;
      
      setProgress(targetProgress);
      requestAnimationFrame(updateProgress);
    };

    updateProgress();
  }, [onLoadingComplete]);

  const getPhaseText = () => {
    switch (phase) {
      case 'initializing': return 'INITIALIZING DEUS VAULT OS...';
      case 'connecting': return 'ESTABLISHING NEURAL LINK...';
      case 'loading': return 'LOADING CONSCIOUSNESS MATRIX...';
      case 'complete': return 'WELCOME TO THE VAULT';
      default: return '';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Matrix Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'brightness(0.7)' }}
        />

        {/* Scan Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full opacity-10 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" 
               style={{ 
                 backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #ffffff 2px, #ffffff 4px)',
                 animation: 'scan 2s linear infinite'
               }} 
          />
        </div>

        {/* Central HUD */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Main Logo */}
            <motion.div
              className="text-center mb-12"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
                DEUS VAULT
              </div>
              <div className="text-xl md:text-2xl text-white mt-2 font-mono tracking-wider">
                OPERATING SYSTEM
              </div>
            </motion.div>

            {/* HUD Frame */}
            <motion.div
              className="relative w-96 h-48 border-2 border-cyan-400 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                boxShadow: '0 0 20px #00ffff, inset 0 0 20px rgba(0, 255, 255, 0.1)',
                borderRadius: '4px'
              }}
            >
              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-cyan-400"></div>
              <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-cyan-400"></div>
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-cyan-400"></div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-cyan-400"></div>

              {/* Content */}
              <div className="p-6 h-full flex flex-col justify-between">
                {/* Phase Text */}
                <motion.div
                  className="text-cyan-300 font-mono text-sm tracking-wider"
                  key={phase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {getPhaseText()}
                </motion.div>

                {/* Progress Bar */}
                <div className="space-y-4">
                  <div className="relative h-2 bg-gray-800 border border-cyan-600">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      style={{
                        width: `${progress}%`,
                        boxShadow: '0 0 10px #00ffff'
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Progress Text */}
                  <div className="flex justify-between text-cyan-300 font-mono text-xs">
                    <span>PROGRESS</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                </div>

                {/* System Info */}
                <div className="text-cyan-500 font-mono text-xs space-y-1">
                  <div>VERSION: 2.1.47</div>
                  <div>BUILD: {new Date().getFullYear()}.{Date.now().toString().slice(-6)}</div>
                  <div>STATUS: {phase.toUpperCase()}</div>
                </div>
              </div>
            </motion.div>

            {/* Pulsing circles */}
            <motion.div
              className="absolute -inset-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border border-cyan-400/30 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Status */}
        <motion.div
          className="absolute bottom-8 left-8 text-cyan-400 font-mono text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div>THERION_3D_EXPERIENCE_ENGINEER</div>
          <div className="text-cyan-600">CONSCIOUSNESS INTEGRATION MODULE</div>
        </motion.div>

        <style>{`
          @keyframes scan {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreenCyberpunk;
