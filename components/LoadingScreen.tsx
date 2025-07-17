/**
 * 🌟 AWARD-WINNING GLASSMORPHISM LOADING SCREEN
 * 
 * Professional cyberpunk loading experience with:
 * - Quantum particle field animation
 * - Glassmorphism design language
 * - Strict cyan/yellow branding
 * - Smooth progress transitions
 * - Modern web standards
 * 
 * @colors STRICT CYAN & YELLOW THEME
 * - Primary: Electric cyan (#00FFFF)
 * - Secondary: Bright yellow (#FFFF00)
 * - Background: Deep dark glassmorphism
 * 
 * @author THERION_WEBSITE_DEVELOPER
 * @version 3.0.0 - GLASSMORPHISM EXCELLENCE
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing DeusVaultOS...');
  
  // 🌟 QUANTUM PARTICLES FOR BACKGROUND EFFECT
  const [particles, setParticles] = useState(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: i % 2 === 0 ? '#00FFFF' : '#FFFF00',
      speed: Math.random() * 0.5 + 0.2,
      direction: Math.random() * Math.PI * 2
    }));
  });

  // 📝 LOADING MESSAGES
  const loadingMessages = [
    'Initializing DeusVaultOS...',
    'Loading AI Components...',
    'Preparing Development Environment...',
    'Activating Quantum Processors...',
    'Ready to Transform Your Workflow!'
  ];

  // 🚀 LOADING PROGRESSION - SLOWER FOR BETTER VISIBILITY
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 1.5 + 0.5; // SLOWED: was 3+1, now 1.5+0.5 (half speed)
        
        // Update loading text based on progress
        if (next >= 80) {
          setLoadingText(loadingMessages[4]);
        } else if (next >= 60) {
          setLoadingText(loadingMessages[3]);
        } else if (next >= 40) {
          setLoadingText(loadingMessages[2]);
        } else if (next >= 20) {
          setLoadingText(loadingMessages[1]);
        } else {
          setLoadingText(loadingMessages[0]);
        }
        
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 1000);
          return 100;
        }
        return next;
      });
    }, 150); // SLOWED: was 100ms, now 150ms for even more visibility

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  // 🌊 PARTICLE ANIMATION
  useEffect(() => {
    const animateParticles = setInterval(() => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + Math.cos(particle.direction) * particle.speed) % 100,
          y: (particle.y + Math.sin(particle.direction) * particle.speed) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(animateParticles);
  }, []);

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.95) 70%)',
          }}
        >
          {/* 🌟 QUANTUM PARTICLE FIELD */}
          <div className="absolute inset-0 overflow-hidden">
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
                  boxShadow: `0 0 10px ${particle.color}`,
                  opacity: 0.6
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: particle.id * 0.1
                }}
              />
            ))}
          </div>

          {/* 🎯 MAIN LOADING CONTENT */}
          <div className="relative z-10 text-center">
            
            {/* 🏢 GLASSMORPHISM CONTAINER */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="backdrop-blur-xl bg-black/20 border border-cyan-400/30 rounded-3xl p-12 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 255, 0, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0, 255, 255, 0.2)'
              }}
            >
              
              {/* 🎮 DEUSVAULTOS LOGO */}
              <motion.div
                animate={{ 
                  textShadow: [
                    '0 0 20px #00FFFF',
                    '0 0 30px #FFFF00',
                    '0 0 20px #00FFFF'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl font-bold mb-8"
                style={{
                  background: 'linear-gradient(45deg, #00FFFF, #FFFF00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                DeusVaultOS
              </motion.div>

              {/* 📊 PROGRESS BAR */}
              <div className="w-80 h-3 bg-black/40 rounded-full overflow-hidden mb-6 border border-cyan-400/20">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #00FFFF, #FFFF00)',
                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.6)'
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              {/* 📈 PROGRESS PERCENTAGE */}
              <motion.div
                key={Math.floor(progress)}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-3xl font-mono text-cyan-300 mb-4"
                style={{ textShadow: '0 0 10px #00FFFF' }}
              >
                {Math.floor(progress)}%
              </motion.div>

              {/* 💬 LOADING MESSAGE */}
              <motion.div
                key={loadingText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl text-yellow-300"
                style={{ textShadow: '0 0 8px #FFFF00' }}
              >
                {loadingText}
              </motion.div>

              {/* ⚡ QUANTUM ENERGY INDICATORS */}
              <div className="flex justify-center gap-2 mt-8">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: i % 2 === 0 ? '#00FFFF' : '#FFFF00',
                      boxShadow: `0 0 8px ${i % 2 === 0 ? '#00FFFF' : '#FFFF00'}`
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
