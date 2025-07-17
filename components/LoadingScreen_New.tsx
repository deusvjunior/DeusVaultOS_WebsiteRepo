/**
 * 🎨 GLASSMORPHISM BLOB PREVIEW LOADING EXPERIENCE
 * 
 * Minimal motion graphics loading screen featuring glassmorphism design
 * with animated blob previews that excite users about the upcoming
 * consciousness AI experience. Clean, modern, and anticipation-building.
 * 
 * @features
 * - Glassmorphism design with subtle animations
 * - 3D blob previews with smooth movements
 * - Minimal motion graphics for elegance
 * - Progressive loading with visual feedback
 * - Excitement-building anticipation design
 * 
 * @phases
 * 1. Blob Formation - Individual blobs materializing
 * 2. Energy Awakening - Blobs gaining consciousness
 * 3. Social Connection - Blobs discovering each other
 * 4. Ready to Explore - Final preparation complete
 * 
 * @author THERION_WEBSITE_DEVELOPER
 * @version 3.0.0 - GLASSMORPHISM ELEGANCE
 */

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'blob_formation' | 'energy_awakening' | 'social_connection' | 'ready_to_explore' | 'complete'>('blob_formation');
  
  // 🎨 GLASSMORPHISM BLOB PREVIEWS
  const [previewBlobs, setPreviewBlobs] = useState(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 30 + i * 10 + Math.random() * 5,
      y: 45 + Math.random() * 10,
      size: 8 + Math.random() * 6,
      color: ['#00FFFF', '#FFFF00', '#FF00FF', '#00FF88', '#FF8800'][i],
      opacity: 0.6 + Math.random() * 0.3,
      speed: 0.5 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      energy: 0
    }));
  });

  // Phase messages for anticipation building
  const getPhaseMessage = () => {
    switch (phase) {
      case 'blob_formation': return 'Consciousness entities materializing...';
      case 'energy_awakening': return 'AI companions gaining awareness...';
      case 'social_connection': return 'Establishing neural connections...';
      case 'ready_to_explore': return 'Ready to explore consciousness...';
      default: return 'Loading...';
    }
  };

  // Loading progression
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + 1.5, 100);
        
        // Update phases based on progress
        if (newProgress >= 25 && phase === 'blob_formation') {
          setPhase('energy_awakening');
        } else if (newProgress >= 50 && phase === 'energy_awakening') {
          setPhase('social_connection');
        } else if (newProgress >= 80 && phase === 'social_connection') {
          setPhase('ready_to_explore');
        } else if (newProgress >= 100) {
          setPhase('complete');
          setTimeout(() => {
            onLoadingComplete();
          }, 800);
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [phase, onLoadingComplete]);

  // Animate blob previews
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewBlobs(prevBlobs =>
        prevBlobs.map(blob => ({
          ...blob,
          phase: blob.phase + blob.speed * 0.1,
          energy: Math.min(blob.energy + 0.02, 1),
          y: blob.y + Math.sin(blob.phase) * 0.5,
          opacity: 0.4 + Math.sin(blob.phase * 0.5) * 0.3 + blob.energy * 0.3
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d20 50%, #131619 100%)'
          }}
        >
          {/* Glassmorphism main container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
            style={{
              width: '400px',
              height: '300px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Blob preview area */}
            <div className="absolute inset-6 rounded-2xl overflow-hidden">
              {previewBlobs.map((blob) => (
                <motion.div
                  key={blob.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${blob.x}%`,
                    top: `${blob.y}%`,
                    width: `${blob.size}px`,
                    height: `${blob.size}px`,
                    background: `radial-gradient(circle, ${blob.color}80, ${blob.color}40)`,
                    boxShadow: `0 0 ${blob.size * 2}px ${blob.color}40`,
                    opacity: blob.opacity * blob.energy,
                    transform: `translate(-50%, -50%) scale(${0.5 + blob.energy * 0.5})`
                  }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 3 + blob.speed,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              ))}
              
              {/* Connection lines between blobs when they're energized */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {previewBlobs.map((blob, i) => 
                  previewBlobs.slice(i + 1).map((otherBlob, j) => {
                    const distance = Math.sqrt(
                      Math.pow(blob.x - otherBlob.x, 2) + Math.pow(blob.y - otherBlob.y, 2)
                    );
                    const shouldConnect = distance < 25 && blob.energy > 0.5 && otherBlob.energy > 0.5;
                    
                    return shouldConnect ? (
                      <motion.line
                        key={`${i}-${j}`}
                        x1={`${blob.x}%`}
                        y1={`${blob.y}%`}
                        x2={`${otherBlob.x}%`}
                        y2={`${otherBlob.y}%`}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    ) : null;
                  })
                )}
              </svg>
            </div>

            {/* Loading info */}
            <div className="absolute bottom-6 left-6 right-6">
              {/* Progress bar */}
              <div 
                className="h-1 rounded-full mb-4 overflow-hidden"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ 
                    background: 'linear-gradient(90deg, #00FFFF, #FFFF00, #FF00FF)',
                    width: `${progress}%`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Phase message */}
              <motion.p 
                className="text-white/80 text-sm text-center"
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {getPhaseMessage()}
              </motion.p>

              {/* Progress percentage */}
              <motion.p 
                className="text-white/60 text-xs text-center mt-2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {Math.round(progress)}%
              </motion.p>
            </div>

            {/* Glassmorphism shine effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)'
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.div>

          {/* Excitement text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-20 text-center"
          >
            <h2 className="text-2xl font-light text-white/90 mb-2">
              Consciousness AI Loading
            </h2>
            <p className="text-white/60 text-sm">
              Prepare for an intelligent experience like no other
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
