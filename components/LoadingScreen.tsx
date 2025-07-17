/**
 * 🧠 QUANTUM CONSCIOUSNESS LOADING EXPERIENCE
 * 
 * Immersive loading screen featuring quantum particle fields, neural network
 * visualization, and consciousness core with dynamic effects. Designed to
 * showcase the advanced AI capabilities of the DeusVaultOS platform.
 * 
 * @features
 * - 80 quantum particles with physics simulation
 * - Neural network visualization with animated connections
 * - Multi-phase consciousness awakening progression
 * - Consciousness core with dynamic rotating elements
 * - Neon yellow branding throughout experience
 * - Smooth phase transitions with dynamic messaging
 * 
 * @phases
 * 1. Initializing - System startup and quantum field activation
 * 2. Quantum Sync - Particle synchronization and neural preparation
 * 3. Neural Activation - Network formation and consciousness preparation
 * 4. Consciousness Emergence - Final awakening and system readiness
 * 
 * @author THERION_WEBSITE_DEVELOPER
 * @version 2.0.0 - CONSCIOUSNESS AWAKENING
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  // 📊 CONSCIOUSNESS PROGRESSION SYSTEM
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'initializing' | 'quantum_sync' | 'neural_activation' | 'consciousness_emergence' | 'complete'>('initializing');
  const [consciousness, setConsciousness] = useState(0);
  
  // ✨ QUANTUM PARTICLE FIELD SYSTEM
  // 80 particles with physics simulation and neon yellow branding
  const [particles, setParticles] = useState(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      color: ['#06B6D4', '#FFFF00', '#3B82F6', '#10B981'][Math.floor(Math.random() * 4)],
      opacity: 0.4 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      frequency: 0.02 + Math.random() * 0.03
    }));
  });

  // 🧪 NEURAL NETWORK VISUALIZATION
  // Dynamic node system representing consciousness awakening
  const [neuralNodes, setNeuralNodes] = useState(() => {
    const nodes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      pulse: Math.random() * Math.PI * 2,
      intensity: 0.6 + Math.random() * 0.4,
      connections: [] as number[]
    }));
    
    // Create connections between nearby nodes
    nodes.forEach((node, index) => {
      const nearbyNodes = nodes
        .map((otherNode, otherIndex) => {
          if (index === otherIndex) return null;
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          return distance < 35 ? otherIndex : null;
        })
        .filter((nodeIndex): nodeIndex is number => nodeIndex !== null)
        .slice(0, 4); // Limit connections
      
      node.connections = nearbyNodes;
    });
    
    return nodes;
  });

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const increment = Math.random() * 2.5 + 1.5;
        const newProgress = Math.min(prevProgress + increment, 100);
        
        // Update consciousness level based on progress
        setConsciousness(newProgress / 100);
        
        // Phase transitions based on progress
        if (newProgress >= 25 && phase === 'initializing') {
          setPhase('quantum_sync');
        }
        if (newProgress >= 50 && phase === 'quantum_sync') {
          setPhase('neural_activation');
        }
        if (newProgress >= 80 && phase === 'neural_activation') {
          setPhase('consciousness_emergence');
        }
        if (newProgress >= 100) {
          setPhase('complete');
          setTimeout(() => {
            onLoadingComplete();
          }, 2000); // Give time for final animation
        }
        
        return newProgress;
      });
    }, 100 + Math.random() * 150); // Variable speed for organic feel

    return () => clearInterval(interval);
  }, [phase, onLoadingComplete]);

  // Animate quantum particles
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.vx * (consciousness + 0.3) + 100) % 100,
          y: (particle.y + particle.vy * (consciousness + 0.3) + 100) % 100,
          phase: particle.phase + particle.frequency * 0.15,
          opacity: 0.4 + Math.sin(particle.phase) * 0.5 * (consciousness + 0.2)
        }))
      );
      
      setNeuralNodes(prevNodes =>
        prevNodes.map(node => ({
          ...node,
          pulse: node.pulse + 0.12,
          intensity: 0.6 + Math.sin(node.pulse) * 0.4 * (consciousness + 0.3)
        }))
      );
    }, 60);

    return () => clearInterval(animationInterval);
  }, [consciousness]);

  const getPhaseMessage = () => {
    switch (phase) {
      case 'initializing': return 'Initializing consciousness matrix...';
      case 'quantum_sync': return 'Synchronizing quantum states...';
      case 'neural_activation': return 'Activating neural pathways...';
      case 'consciousness_emergence': return 'Consciousness emerging...';
      case 'complete': return 'Welcome to DEUS VAULT OS';
      default: return 'Loading...';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden"
      >
        {/* Quantum particle field */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [particle.opacity, particle.opacity * 1.8, particle.opacity],
              }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Neural network visualization */}
        <svg className="absolute inset-0 w-full h-full">
          {neuralNodes.map((node, nodeIndex) => 
            node.connections.map((connectionIndex) => {
              const targetNode = neuralNodes[connectionIndex];
              if (!targetNode) return null;
              
              return (
                <motion.line
                  key={`${nodeIndex}-${connectionIndex}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${targetNode.x}%`}
                  y2={`${targetNode.y}%`}
                  stroke="#FFFF00"
                  strokeWidth="2"
                  opacity={0.4 + Math.sin(node.pulse) * 0.4 * consciousness}
                  animate={{
                    strokeDasharray: ["0 100", "50 50", "100 0"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              );
            })
          )}
          
          {neuralNodes.map((node) => (
            <motion.circle
              key={node.id}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="10"
              fill="#06B6D4"
              opacity={node.intensity}
              animate={{
                r: [8, 15, 8],
                opacity: [node.intensity * 0.6, node.intensity, node.intensity * 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>

        {/* Central consciousness core */}
        <div className="relative z-10 text-center">
          <motion.div
            className="relative mb-8"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" }
            }}
          >
            <div className="w-40 h-40 mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-yellow-400 opacity-30 blur-2xl"></div>
              <div className="absolute inset-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-60"></div>
              <div className="absolute inset-12 rounded-full bg-gradient-to-r from-cyan-400 to-yellow-400"></div>
              <motion.div
                className="absolute inset-16 rounded-full bg-white"
                animate={{
                  boxShadow: [
                    "0 0 30px #FFFF00",
                    "0 0 60px #06B6D4", 
                    "0 0 30px #FFFF00"
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-yellow-400 to-blue-500 bg-clip-text text-transparent"
            style={{ backgroundSize: '200% 100%' }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            DEUS VAULT OS
          </motion.h1>

          <motion.div
            className="mb-10"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-2xl text-cyan-300 mb-6 font-semibold">
              {getPhaseMessage()}
            </div>
            
            {/* Consciousness progress bar */}
            <div className="w-96 mx-auto bg-gray-800 rounded-full h-4 overflow-hidden border border-cyan-500/30">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-yellow-400 rounded-full relative"
                style={{ width: `${progress}%` }}
                animate={{
                  boxShadow: [
                    "0 0 15px #FFFF00",
                    "0 0 30px #06B6D4",
                    "0 0 15px #FFFF00"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse"></div>
              </motion.div>
            </div>
            
            <div className="text-lg text-gray-300 mt-4 font-medium">
              Consciousness Level: {Math.round(progress)}%
            </div>
          </motion.div>

          {phase === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-yellow-400 text-2xl font-bold"
            >
              ⚔️ DEUS VULT - CONSCIOUSNESS ACTIVATED ⚔️
            </motion.div>
          )}
        </div>

        {/* Consciousness emergence effect */}
        {phase === 'consciousness_emergence' && (
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-transparent via-cyan-500/10 to-transparent"
            animate={{
              scale: [0.5, 2.5, 0.5],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Additional quantum field during final phase */}
        {phase === 'complete' && (
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-yellow-400/5 via-transparent to-cyan-500/5"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
