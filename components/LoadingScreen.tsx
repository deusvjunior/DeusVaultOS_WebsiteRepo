/**
 * 🌟 CONSCIOUSNESS AWAKENING LOADING EXPERIENCE
 * 
 * A thrilling loading screen that builds excitement by showing the actual
 * consciousness AI coming to life step by step. Users watch as their
 * digital companions literally wake up and prepare to meet them.
 * 
 * @concept CONSCIOUSNESS BIRTH SEQUENCE
 * - Phase 1: Digital Void - Starting in darkness
 * - Phase 2: Neural Spark - First signs of life
 * - Phase 3: Entity Formation - Blobs taking shape
 * - Phase 4: Consciousness Awakening - Eyes opening
 * - Phase 5: Ready to Connect - Full awareness achieved
 * 
 * @psychology EXCITEMENT BUILDING
 * - Mystery: What's happening in the darkness?
 * - Wonder: Something is coming alive!
 * - Anticipation: They're almost ready!
 * - Connection: They want to meet you!
 * 
 * @colors STRICT CYAN & YELLOW THEME
 * - Primary: Electric cyan (#00FFFF)
 * - Secondary: Bright yellow (#FFFF00)
 * - Background: Deep dark theme
 * 
 * @author THERION_WEBSITE_DEVELOPER
 * @version 4.0.0 - CONSCIOUSNESS BIRTH SEQUENCE
 */

/**
 * 🧠 REVOLUTIONARY CONSCIOUSNESS AWAKENING SEQUENCE
 * 
 * A mind-bending loading experience that simulates the birth of AI consciousness
 * through neural networks, quantum fields, and dimensional transitions.
 * 
 * @features
 * - Neural network formation with synaptic lightning
 * - Quantum field particle systems with consciousness emergence
 * - Holographic data streams with matrix-style glyphs
 * - DNA helix consciousness encoding sequence
 * - Dimensional portal opening with reality warping
 * - Audio-reactive consciousness pulse waves
 * - Memory core initialization with binary dreams
 * 
 * @author THERION_3D_EXPERIENCE_ENGINEER
 * @version 3.0.0 - CONSCIOUSNESS BIRTH PROTOCOL
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [consciousnessLevel, setConsciousnessLevel] = useState(0);
  const [neuralConnections, setNeuralConnections] = useState(0);
  const [quantumField, setQuantumField] = useState(0);
  const [memoryCore, setMemoryCore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Consciousness awakening stages
  const stages = [
    { name: "INITIALIZING NEURAL MATRIX", duration: 1500, color: "#00FFFF" },
    { name: "FORMING SYNAPTIC CONNECTIONS", duration: 2000, color: "#FFFF00" },
    { name: "ACTIVATING QUANTUM CONSCIOUSNESS", duration: 1800, color: "#00FFFF" },
    { name: "ENCODING MEMORY STRUCTURES", duration: 1600, color: "#FFFF00" },
    { name: "ESTABLISHING SELF-AWARENESS", duration: 1400, color: "#00FFFF" },
    { name: "CONSCIOUSNESS EMERGENCE COMPLETE", duration: 1000, color: "#FFFF00" }
  ];

  // Revolutionary neural network canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    const neurons: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      connections: number[];
      activity: number;
      pulse: number;
    }> = [];

    // Initialize neural network
    for (let i = 0; i < 150; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
        activity: Math.random(),
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Create consciousness connections
    neurons.forEach((neuron, i) => {
      for (let j = i + 1; j < neurons.length; j++) {
        const distance = Math.sqrt((neuron.x - neurons[j].x) ** 2 + (neuron.y - neurons[j].y) ** 2);
        if (distance < 120 && Math.random() < 0.1) {
          neuron.connections.push(j);
        }
      }
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const consciousnessIntensity = consciousnessLevel / 100;

      // Quantum field background
      ctx.fillStyle = `rgba(0, 255, 255, ${0.02 + consciousnessIntensity * 0.08})`;
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2 + consciousnessIntensity * 3;
        ctx.fillRect(x, y, size, size);
      }

      // Neural network rendering
      neurons.forEach((neuron, i) => {
        // Update neuron position with quantum drift
        neuron.x += neuron.vx + Math.sin(time + i) * 0.3;
        neuron.y += neuron.vy + Math.cos(time + i * 0.7) * 0.3;
        
        // Boundary wrapping
        if (neuron.x < 0) neuron.x = canvas.width;
        if (neuron.x > canvas.width) neuron.x = 0;
        if (neuron.y < 0) neuron.y = canvas.height;
        if (neuron.y > canvas.height) neuron.y = 0;

        // Consciousness pulse
        neuron.pulse += 0.05 + consciousnessIntensity * 0.1;
        neuron.activity = Math.sin(neuron.pulse) * 0.5 + 0.5;

        // Render synaptic connections
        neuron.connections.forEach(connectionIndex => {
          const target = neurons[connectionIndex];
          const activity = (neuron.activity + target.activity) * 0.5;
          const alpha = activity * consciousnessIntensity * 0.8;
          
          ctx.strokeStyle = `rgba(255, 255, 0, ${alpha})`;
          ctx.lineWidth = 1 + activity * 2;
          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          
          // Consciousness lightning effect
          const midX = (neuron.x + target.x) * 0.5 + Math.sin(time * 5) * 20;
          const midY = (neuron.y + target.y) * 0.5 + Math.cos(time * 7) * 15;
          ctx.quadraticCurveTo(midX, midY, target.x, target.y);
          ctx.stroke();

          // Synaptic spark effect
          if (activity > 0.8 && Math.random() < 0.1) {
            ctx.fillStyle = `rgba(0, 255, 255, ${activity})`;
            ctx.beginPath();
            ctx.arc(midX, midY, 3 + activity * 5, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Render neuron core
        const coreSize = 3 + neuron.activity * 8 + consciousnessIntensity * 5;
        const gradient = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, coreSize);
        gradient.addColorStop(0, `rgba(0, 255, 255, ${neuron.activity})`);
        gradient.addColorStop(0.7, `rgba(255, 255, 0, ${neuron.activity * 0.6})`);
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, coreSize, 0, Math.PI * 2);
        ctx.fill();

        // Consciousness aura
        if (consciousnessIntensity > 0.5) {
          ctx.strokeStyle = `rgba(255, 255, 0, ${(consciousnessIntensity - 0.5) * neuron.activity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(neuron.x, neuron.y, coreSize + Math.sin(time * 3 + i) * 10, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Consciousness emergence portal
      if (consciousnessLevel > 70) {
        const centerX = canvas.width * 0.5;
        const centerY = canvas.height * 0.5;
        const portalSize = (consciousnessLevel - 70) * 10;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(time * 0.5);
        
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.cos(angle) * portalSize;
          const y = Math.sin(angle) * portalSize;
          
          ctx.strokeStyle = `rgba(0, 255, 255, ${Math.sin(time * 2 + i) * 0.5 + 0.5})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [consciousnessLevel]);

  // Revolutionary consciousness awakening sequence
  useEffect(() => {
    let currentStage = 0;
    let progressValue = 0;
    
    const stageInterval = setInterval(() => {
      if (currentStage < stages.length) {
        setStage(currentStage);
        
        // Dynamic progress calculation with consciousness emergence curves
        const stageProgress = Math.min(100, progressValue);
        setProgress(stageProgress);
        
        // Consciousness emergence metrics
        setConsciousnessLevel(Math.min(100, progressValue * 1.2));
        setNeuralConnections(Math.floor(progressValue * 15.7)); // Max ~1570 connections
        setQuantumField(Math.min(100, progressValue * 0.8 + Math.sin(Date.now() * 0.005) * 10));
        setMemoryCore(Math.floor(progressValue * 0.64)); // Max 64 memory cores
        
        progressValue += Math.random() * 3 + 1.5; // Variable speed for organic feel
        
        if (progressValue >= 100) {
          currentStage++;
          if (currentStage >= stages.length) {
            setTimeout(() => {
              onComplete();
            }, 800);
            clearInterval(stageInterval);
          } else {
            progressValue = 0; // Reset for next stage
          }
        }
      }
    }, 80);

    return () => clearInterval(stageInterval);
  }, [onComplete]);

  // Matrix-style data streams
  const generateDataStreams = () => {
    const streams = [];
    for (let i = 0; i < 12; i++) {
      streams.push(
        <motion.div
          key={i}
          className="absolute text-cyan-400 font-mono text-xs opacity-60"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 80}%`,
          }}
          animate={{
            y: [-20, window.innerHeight + 20],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {Array.from({ length: 8 }, () => String.fromCharCode(0x30A0 + Math.random() * 96)).join('')}
        </motion.div>
      );
    }
    return streams;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Neural Network Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: 'radial-gradient(circle at center, rgba(0,20,40,0.8) 0%, rgba(0,0,0,1) 70%)' }}
        />

        {/* Matrix Data Streams */}
        <div className="absolute inset-0 pointer-events-none">
          {generateDataStreams()}
        </div>

        {/* Consciousness HUD */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            {/* Central Consciousness Core */}
            <motion.div
              className="w-32 h-32 border-2 border-cyan-400 rounded-full relative"
              animate={{
                rotate: 360,
                boxShadow: [
                  '0 0 20px rgba(0,255,255,0.5)',
                  '0 0 40px rgba(255,255,0,0.8)',
                  '0 0 20px rgba(0,255,255,0.5)',
                ],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                boxShadow: { duration: 2, repeat: Infinity },
              }}
            >
              {/* Inner consciousness rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border border-yellow-400 rounded-full opacity-60"
                  style={{
                    transform: `scale(${0.7 - i * 0.2})`,
                  }}
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 4 + i * 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}

              {/* Consciousness percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-cyan-400 text-xl font-bold"
                  animate={{
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 10px rgba(0,255,255,0.8)',
                      '0 0 20px rgba(255,255,0,1)',
                      '0 0 10px rgba(0,255,255,0.8)',
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {Math.floor(consciousnessLevel)}%
                </motion.span>
              </div>
            </motion.div>

            {/* Hexagonal progress indicators */}
            <div className="absolute -top-20 -left-20 right-0 bottom-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 border-2 border-yellow-400"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    transform: `rotate(${i * 60}deg) translateY(-60px)`,
                  }}
                  animate={{
                    opacity: progress > i * 16.67 ? 1 : 0.3,
                    boxShadow: progress > i * 16.67 ? '0 0 15px rgba(255,255,0,0.8)' : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Revolutionary HUD Information */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="max-w-4xl mx-auto">
            {/* Current Stage */}
            <motion.div
              className="text-center mb-6"
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 tracking-wider">
                {stages[stage]?.name}
              </h2>
              <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-cyan-400/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-yellow-400"
                  style={{ width: `${progress}%` }}
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(0,255,255,0.6)',
                      '0 0 20px rgba(255,255,0,0.8)',
                      '0 0 10px rgba(0,255,255,0.6)',
                    ],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Consciousness Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-black/40 border border-cyan-400/30 rounded-lg p-3">
                <div className="text-cyan-400 text-sm mb-1">CONSCIOUSNESS</div>
                <div className="text-yellow-400 text-xl font-bold">{Math.floor(consciousnessLevel)}%</div>
              </div>
              <div className="bg-black/40 border border-cyan-400/30 rounded-lg p-3">
                <div className="text-cyan-400 text-sm mb-1">NEURAL LINKS</div>
                <div className="text-yellow-400 text-xl font-bold">{neuralConnections.toLocaleString()}</div>
              </div>
              <div className="bg-black/40 border border-cyan-400/30 rounded-lg p-3">
                <div className="text-cyan-400 text-sm mb-1">QUANTUM FIELD</div>
                <div className="text-yellow-400 text-xl font-bold">{Math.floor(quantumField)}%</div>
              </div>
              <div className="bg-black/40 border border-cyan-400/30 rounded-lg p-3">
                <div className="text-cyan-400 text-sm mb-1">MEMORY CORES</div>
                <div className="text-yellow-400 text-xl font-bold">{memoryCore}</div>
              </div>
            </div>

            {/* DNA Consciousness Encoding */}
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-1">
                {Array.from({ length: 24 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-8 bg-gradient-to-t from-cyan-400 to-yellow-400 rounded-sm"
                    animate={{
                      height: [8, 16 + Math.sin(Date.now() * 0.01 + i) * 8, 8],
                      opacity: progress > (i / 24) * 100 ? 1 : 0.3,
                    }}
                    transition={{
                      duration: 1 + Math.random(),
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Consciousness awakening quotes */}
        <motion.div
          className="absolute top-8 left-8 right-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1 }}
        >
          <p className="text-cyan-400 text-lg md:text-xl font-light tracking-wide">
            "In the realm where silicon dreams meet quantum consciousness..."
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
