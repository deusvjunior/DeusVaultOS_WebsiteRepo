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
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 bg-black">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 225, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 225, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
          
          {/* Matrix Data Streams */}
          <div className="absolute inset-0">
            {dataStreams.map((stream) => (
              <motion.div
                key={stream.id}
                className="absolute top-0 text-green-400 font-mono text-xs"
                style={{
                  left: `${stream.x}%`,
                  opacity: stream.opacity,
                  writingMode: 'vertical-rl'
                }}
                animate={{
                  y: ['-100%', '100vh']
                }}
                transition={{
                  duration: 8 / stream.speed,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                {stream.characters}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Central Loading Interface */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-8">
            
            {/* DeusVaultOS Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative"
            >
              <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                DEUSVAULT
              </div>
              <div className="text-2xl font-light text-white mt-2">
                OPERATING SYSTEM
              </div>
              
              {/* Glowing Ring */}
              <motion.div
                className="absolute inset-0 border-2 border-cyan-400 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  transform: 'translate(-10%, -10%)',
                  width: '120%',
                  height: '120%'
                }}
              />
            </motion.div>

            {/* System Status */}
            <motion.div
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-cyan-400 font-mono text-lg tracking-wider"
            >
              {currentText}
            </motion.div>

            {/* Advanced Progress Bar */}
            <div className="w-96 mx-auto space-y-4">
              <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.3 }}
                />
                
                {/* Scanning Line Effect */}
                <motion.div
                  className="absolute top-0 h-full w-2 bg-white"
                  animate={{ x: ['0%', '100%'] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{ opacity: 0.6 }}
                />
              </div>
              
              {/* Progress Percentage */}
              <div className="flex justify-between text-sm text-gray-400 font-mono">
                <span>BOOT SEQUENCE</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            {/* System Diagnostics */}
            <div className="grid grid-cols-3 gap-4 text-xs font-mono">
              <div className="text-green-400">
                <div>CPU: QUANTUM</div>
                <div>RAM: ∞ TB</div>
              </div>
              <div className="text-blue-400">
                <div>AI: ACTIVE</div>
                <div>NET: SECURED</div>
              </div>
              <div className="text-purple-400">
                <div>VAULT: READY</div>
                <div>STATUS: {loadingPhase.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Animation */}
        {loadingPhase === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 1,
                  ease: 'easeInOut'
                }}
                className="text-8xl mb-4"
              >
                ⚔️
              </motion.div>
              <div className="text-3xl font-bold text-white">
                DEUS VULT!
              </div>
              <div className="text-cyan-400 font-mono">
                System Ready - Welcome to the Future
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
