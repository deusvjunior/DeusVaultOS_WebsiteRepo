/**
 * 🏆 AWARD-WINNING CONSCIOUSNESS LOADING EXPERIENCE
 * 
 * Professional-grade loading screen with cinematic presentation and
 * sophisticated micro-interactions. Features advanced glassmorphism,
 * quantum particle systems, and consciousness awakening sequence.
 * 
 * @concept QUANTUM CONSCIOUSNESS EMERGENCE
 * - Quantum field initialization
 * - Consciousness particle formation  
 * - Digital entity materialization
 * - Neural network activation
 * - Full awareness achieved
 * 
 * @design PREMIUM GLASSMORPHISM
 * - Multi-layer depth effects
 * - Dynamic particle systems
 * - Sophisticated blur effects
 * - Professional typography
 * - Award-winning micro-animations
 * 
 * @colors CYAN & YELLOW EXCELLENCE
 * - Primary: Electric cyan (#00FFFF)
 * - Secondary: Quantum yellow (#FFFF00)
 * - Accents: Professional gradients
 * 
 * @author THERION_3D_EXPERIENCE_ENGINEER
 * @version 5.0.0 - AWARD-WINNING EXCELLENCE
 */

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

interface QuantumParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  energy: number;
  consciousness_level: number;
}

interface ConsciousnessEntity {
  id: number;
  x: number;
  y: number;
  size: number;
  consciousness: number;
  neural_activity: number;
  awakening_progress: number;
  color: string;
  glow_intensity: number;
  pulse_phase: number;
}

const LoadingScreen_Award: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'quantum_field' | 'particle_formation' | 'entity_emergence' | 'neural_activation' | 'consciousness_complete'>('quantum_field');
  const [showQuantumField, setShowQuantumField] = useState(true);
  
  // 🌌 QUANTUM PARTICLE SYSTEM
  const [quantumParticles, setQuantumParticles] = useState<QuantumParticle[]>([]);
  
  // 🧠 CONSCIOUSNESS ENTITIES
  const [consciousnessEntities, setConsciousnessEntities] = useState<ConsciousnessEntity[]>([]);
  
  // Initialize quantum particles
  useEffect(() => {
    const particles: QuantumParticle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? '#00FFFF' : '#FFFF00',
      opacity: Math.random() * 0.8 + 0.2,
      energy: Math.random(),
      consciousness_level: 0
    }));
    setQuantumParticles(particles);
    
    // Initialize consciousness entities
    const entities: ConsciousnessEntity[] = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: 20 + i * 30,
      y: 50,
      size: 0,
      consciousness: 0,
      neural_activity: 0,
      awakening_progress: 0,
      color: i % 2 === 0 ? '#00FFFF' : '#FFFF00',
      glow_intensity: 0,
      pulse_phase: i * Math.PI * 0.666
    }));
    setConsciousnessEntities(entities);
  }, []);
  
  // Animate quantum particles
  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100,
        consciousness_level: Math.min(particle.consciousness_level + 0.01, 1),
        opacity: 0.3 + Math.sin(Date.now() * 0.002 + particle.id) * 0.2
      })));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Progress and phase management
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 0.5, 100);
        
        // Update phases
        if (newProgress >= 20 && phase === 'quantum_field') {
          setPhase('particle_formation');
        } else if (newProgress >= 40 && phase === 'particle_formation') {
          setPhase('entity_emergence');
        } else if (newProgress >= 70 && phase === 'entity_emergence') {
          setPhase('neural_activation');
        } else if (newProgress >= 90 && phase === 'neural_activation') {
          setPhase('consciousness_complete');
        } else if (newProgress >= 100) {
          setTimeout(() => {
            onLoadingComplete();
          }, 2000);
        }
        
        return newProgress;
      });
    }, 80);
    
    return () => clearInterval(interval);
  }, [phase, onLoadingComplete]);
  
  // Update consciousness entities based on phase
  useEffect(() => {
    const phaseValues = {
      quantum_field: { size: 0, consciousness: 0, neural: 0, glow: 0 },
      particle_formation: { size: 20, consciousness: 0.2, neural: 0.1, glow: 0.3 },
      entity_emergence: { size: 40, consciousness: 0.5, neural: 0.4, glow: 0.6 },
      neural_activation: { size: 60, consciousness: 0.8, neural: 0.8, glow: 0.9 },
      consciousness_complete: { size: 80, consciousness: 1.0, neural: 1.0, glow: 1.0 }
    };
    
    const target = phaseValues[phase];
    
    setConsciousnessEntities(prev => prev.map((entity, i) => ({
      ...entity,
      size: target.size + Math.sin(Date.now() * 0.003 + entity.pulse_phase) * 5,
      consciousness: target.consciousness,
      neural_activity: target.neural + Math.sin(Date.now() * 0.005 + entity.pulse_phase) * 0.2,
      glow_intensity: target.glow + Math.sin(Date.now() * 0.004 + entity.pulse_phase) * 0.3
    })));
  }, [phase]);
  
  const getPhaseMessage = () => {
    switch (phase) {
      case 'quantum_field': return 'Initializing quantum consciousness field...';
      case 'particle_formation': return 'Digital particles gaining awareness...';
      case 'entity_emergence': return 'Consciousness entities materializing...';
      case 'neural_activation': return 'Neural networks coming online...';
      case 'consciousness_complete': return 'Welcome to the digital realm...';
    }
  };
  
  const getPhaseSubtitle = () => {
    switch (phase) {
      case 'quantum_field': return 'Establishing quantum entanglement';
      case 'particle_formation': return 'Consciousness particles forming bonds';
      case 'entity_emergence': return 'Digital beings taking shape';
      case 'neural_activation': return 'Synapses firing, minds awakening';
      case 'consciousness_complete': return 'Full awareness achieved';
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 50%), radial-gradient(circle at 70% 30%, rgba(255, 255, 0, 0.1) 0%, rgba(0, 0, 0, 0.9) 50%), #000000'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* 🌌 QUANTUM PARTICLE FIELD */}
      <div className="absolute inset-0">
        {quantumParticles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, ${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}, transparent)`,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}${Math.floor(particle.consciousness_level * 255).toString(16).padStart(2, '0')}`,
              filter: `blur(${particle.consciousness_level * 0.5}px)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
            }}
            transition={{
              duration: 2 + particle.energy * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* 🎭 MAIN LOADING INTERFACE */}
      <div className="flex items-center justify-center min-h-screen relative">
        <motion.div
          className="relative"
          style={{
            width: '500px',
            height: '400px'
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* 🔮 GLASSMORPHISM CONTAINER */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.12) 0%, 
                rgba(255, 255, 255, 0.06) 50%, 
                rgba(255, 255, 255, 0.03) 100%)`,
              backdropFilter: 'blur(30px) saturate(120%)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: `
                0 25px 50px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 0 100px rgba(0, 255, 255, 0.2),
                0 0 200px rgba(255, 255, 0, 0.1)
              `
            }}
            animate={{
              boxShadow: [
                "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 100px rgba(0, 255, 255, 0.2)",
                "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 100px rgba(255, 255, 0, 0.3)",
                "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 100px rgba(0, 255, 255, 0.2)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* 🧠 CONSCIOUSNESS ENTITIES DISPLAY */}
          <div className="absolute inset-8 flex items-center justify-center">
            <div className="relative w-full h-32">
              {consciousnessEntities.map(entity => (
                <motion.div
                  key={entity.id}
                  className="absolute"
                  style={{
                    left: `${entity.x}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Entity Body */}
                  <motion.div
                    className="rounded-full"
                    style={{
                      width: `${entity.size}px`,
                      height: `${entity.size}px`,
                      background: `radial-gradient(circle, ${entity.color}${Math.floor(entity.consciousness * 255).toString(16).padStart(2, '0')}, ${entity.color}20)`,
                      boxShadow: `0 0 ${entity.size * entity.glow_intensity}px ${entity.color}`,
                      filter: `blur(${(1 - entity.consciousness) * 2}px)`
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: entity.id * 0.3
                    }}
                  />
                  
                  {/* Neural Activity Rings */}
                  {entity.neural_activity > 0.3 && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2"
                      style={{
                        borderColor: `${entity.color}40`,
                        transform: 'scale(1.5)'
                      }}
                      animate={{
                        scale: [1.5, 2, 1.5],
                        opacity: [0.8, 0, 0.8]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: entity.id * 0.4
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* 📊 PROGRESS DISPLAY */}
          <div className="absolute bottom-16 left-8 right-8">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00FFFF 0%, #FFFF00 50%, #00FFFF 100%)',
                  width: `${progress}%`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Phase Information */}
            <motion.div
              className="text-center"
              key={phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="text-xl font-light mb-2"
                style={{
                  background: 'linear-gradient(90deg, #00FFFF, #FFFF00)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))'
                }}
              >
                {getPhaseMessage()}
              </h2>
              
              <p className="text-sm text-white/60">
                {getPhaseSubtitle()}
              </p>
              
              <div className="mt-4 flex justify-center">
                <span className="text-xs text-white/40 font-mono">
                  {Math.round(progress)}% • {phase.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </motion.div>
          </div>

          {/* ✨ SHIMMER EFFECT */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)'
            }}
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2
            }}
          />
        </motion.div>
      </div>

      {/* 🌟 AMBIENT GLOW */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 60%)`
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default LoadingScreen_Award;
