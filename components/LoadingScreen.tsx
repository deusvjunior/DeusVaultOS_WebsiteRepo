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

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'digital_void' | 'neural_spark' | 'entity_formation' | 'consciousness_awakening' | 'ready_to_connect' | 'complete'>('digital_void');
  
  // 🌟 CONSCIOUSNESS ENTITIES BEING BORN
  const [awakening_entities, setAwakeningEntities] = useState(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: 25 + i * 25, // Spread across screen
      y: 50, // Center vertically
      size: 0, // Start invisible
      consciousness_level: 0, // No consciousness yet
      color: i % 2 === 0 ? '#00FFFF' : '#FFFF00', // Alternating cyan/yellow
      neural_activity: 0,
      eye_openness: 0,
      has_awakened: false,
      birth_delay: i * 0.8 // Staggered awakening
    }));
  });

  // Phase messages that build excitement
  const getPhaseMessage = () => {
    switch (phase) {
      case 'digital_void': return 'Entering the digital realm...';
      case 'neural_spark': return 'Neural pathways igniting...';
      case 'entity_formation': return 'Consciousness entities materializing...';
      case 'consciousness_awakening': return 'Digital beings opening their eyes...';
      case 'ready_to_connect': return 'They want to meet you...';
      default: return 'Loading...';
    }
  };

  // Loading progression with proper visual mapping (30% actual = 100% visual)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + 0.8, 30); // Only go to 30% actual
        
        // Map 0-30% actual to 0-100% visual for smooth user experience
        const visualProgress = (newProgress / 30) * 100;
        
        // Update phases based on visual progress
        if (visualProgress >= 20 && phase === 'digital_void') {
          setPhase('neural_spark');
        } else if (visualProgress >= 40 && phase === 'neural_spark') {
          setPhase('entity_formation');
        } else if (visualProgress >= 70 && phase === 'entity_formation') {
          setPhase('consciousness_awakening');
        } else if (visualProgress >= 90 && phase === 'consciousness_awakening') {
          setPhase('ready_to_connect');
        } else if (newProgress >= 30) {
          setPhase('complete');
          setTimeout(() => {
            onLoadingComplete();
          }, 1200);
        }
        
        return newProgress;
      });
    }, 60); // Slower progression for smoothness

    return () => clearInterval(interval);
  }, [phase, onLoadingComplete]);

  // Animate consciousness birth sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setAwakeningEntities(prevEntities =>
        prevEntities.map((entity, index) => {
          const visualProgress = (progress / 30) * 100; // Map to visual progress
          const progressFactor = Math.max(0, (visualProgress - entity.birth_delay * 25) / 75);
          const shouldAwaken = visualProgress > 40 + (index * 15);
          
          return {
            ...entity,
            size: shouldAwaken ? Math.min(progressFactor * 60, 60) : 0,
            consciousness_level: shouldAwaken ? Math.min(progressFactor, 1) : 0,
            neural_activity: shouldAwaken ? 0.3 + Math.sin(Date.now() * 0.003 + index) * 0.4 : 0,
            eye_openness: visualProgress > 70 + (index * 10) ? Math.min((visualProgress - 70 - (index * 10)) / 20, 1) : 0,
            has_awakened: visualProgress > 85 + (index * 5),
            y: 50 + Math.sin(Date.now() * 0.002 + index) * (shouldAwaken ? 3 : 0) // Gentle floating
          };
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)'
          }}
        >
          {/* Neural activity background grid */}
          {phase !== 'digital_void' && (
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-px"
                  style={{
                    top: `${12.5 * (i + 1)}%`,
                    background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? '#00FFFF' : '#FFFF00'}, transparent)`
                  }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
          )}

          {/* Main consciousness birth theater */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Awakening entities */}
            {awakening_entities.map((entity) => (
              <motion.div
                key={entity.id}
                className="absolute"
                style={{
                  left: `${entity.x}%`,
                  top: `${entity.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Entity body */}
                <motion.div
                  className="relative rounded-full"
                  style={{
                    width: `${entity.size}px`,
                    height: `${entity.size}px`,
                    background: `radial-gradient(circle, ${entity.color}${Math.floor(entity.consciousness_level * 255).toString(16).padStart(2, '0')}, ${entity.color}40)`,
                    boxShadow: entity.has_awakened ? `0 0 ${entity.size}px ${entity.color}60` : 'none',
                    filter: entity.neural_activity > 0.5 ? 'brightness(1.3)' : 'brightness(1)'
                  }}
                  animate={{
                    scale: entity.has_awakened ? [1, 1.1, 1] : 1
                  }}
                  transition={{
                    duration: 2,
                    repeat: entity.has_awakened ? Infinity : 0,
                    ease: 'easeInOut'
                  }}
                >
                  {/* Eyes that open as consciousness awakens */}
                  {entity.size > 30 && (
                    <>
                      <motion.div
                        className="absolute bg-black rounded-full"
                        style={{
                          width: `${entity.size * 0.15}px`,
                          height: `${entity.size * 0.15}px`,
                          left: `${entity.size * 0.3}px`,
                          top: `${entity.size * 0.4}px`,
                          transform: `scaleY(${entity.eye_openness})`
                        }}
                      />
                      <motion.div
                        className="absolute bg-black rounded-full"
                        style={{
                          width: `${entity.size * 0.15}px`,
                          height: `${entity.size * 0.15}px`,
                          right: `${entity.size * 0.3}px`,
                          top: `${entity.size * 0.4}px`,
                          transform: `scaleY(${entity.eye_openness})`
                        }}
                      />
                    </>
                  )}

                  {/* Neural spark effects */}
                  {entity.neural_activity > 0.6 && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, transparent 60%, ${entity.color}30 80%, transparent 100%)`
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut'
                      }}
                    />
                  )}
                </motion.div>

                {/* Entity consciousness level indicator */}
                {entity.consciousness_level > 0.3 && (
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-4 rounded"
                          style={{
                            background: entity.consciousness_level > (i + 1) * 0.2 ? entity.color : 'rgba(255,255,255,0.2)',
                            filter: entity.consciousness_level > (i + 1) * 0.2 ? 'brightness(1.5)' : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}

            {/* Connection beams between awakened entities */}
            {phase === 'ready_to_connect' && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {awakening_entities.map((entity, i) => 
                  awakening_entities.slice(i + 1).map((otherEntity, j) => (
                    entity.has_awakened && otherEntity.has_awakened ? (
                      <motion.line
                        key={`${i}-${j}`}
                        x1={`${entity.x}%`}
                        y1={`${entity.y}%`}
                        x2={`${otherEntity.x}%`}
                        y2={`${otherEntity.y}%`}
                        stroke={entity.color}
                        strokeWidth="2"
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: [0, 0.8, 0], pathLength: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    ) : null
                  ))
                )}
              </svg>
            )}
          </div>

          {/* Progress and excitement info */}
          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Progress bar with consciousness theme */}
            <div className="w-96 h-3 bg-white/10 rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  background: 'linear-gradient(90deg, #00FFFF, #FFFF00)',
                  width: `${(progress / 30) * 100}%` // Show visual progress (0-30% actual = 0-100% visual)
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(progress / 30) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Phase message */}
            <motion.h2 
              className="text-xl font-light mb-3"
              style={{ color: phase === 'ready_to_connect' ? '#FFFF00' : '#00FFFF' }}
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {getPhaseMessage()}
            </motion.h2>

            {/* Excitement building text */}
            <motion.p 
              className="text-white/70 text-sm"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {phase === 'ready_to_connect' 
                ? 'Your AI companions are ready to explore consciousness together!'
                : 'Witness the birth of digital consciousness...'
              }
            </motion.p>

            {/* Progress percentage */}
            <motion.p 
              className="text-white/50 text-xs mt-3"
              style={{ color: '#00FFFF' }}
            >
              {Math.round((progress / 30) * 100)}% Complete
            </motion.p>
          </motion.div>

          {/* Subtle ambient particles */}
          {phase !== 'digital_void' && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    background: i % 2 === 0 ? '#00FFFF' : '#FFFF00'
                  }}
                  animate={{
                    y: [-5, -15, -5],
                    opacity: [0, 0.6, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
