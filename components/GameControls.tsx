import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Eye,
  EyeOff,
  Settings,
  Sliders,
  RotateCcw,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Navigation,
  Gamepad2
} from 'lucide-react';

// Real-time blob control parameters
export interface BlobControls {
  movementSpeed: number;
  randomDirectionFactor: number;
  randomSizeFactor: number;
  eyeSizeMin: number;
  eyeSizeMax: number;
  blobSizeMin: number;
  blobSizeMax: number;
  verticalityFactor: number;
  jiggleIntensity: number;
  avoidanceDistance: number;
  emergenceRate: number;
  rotationSpeed: number;
}

interface GameControlsProps {
  currentSection: number;
  totalSections: number;
  onSectionChange: (section: number) => void;
  isTransitioning: boolean;
  onObserverModeChange?: (enabled: boolean) => void;
  onBlobControlsChange?: (controls: BlobControls) => void;
}

export function GameControls({ 
  currentSection, 
  totalSections, 
  onSectionChange, 
  isTransitioning,
  onObserverModeChange,
  onBlobControlsChange
}: GameControlsProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const [observerMode, setObserverMode] = useState(false);
  const [showBlobControls, setShowBlobControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  // Real-time blob control state
  const [blobControls, setBlobControls] = useState<BlobControls>({
    movementSpeed: 1.0,
    randomDirectionFactor: 0.5,
    randomSizeFactor: 0.3,
    eyeSizeMin: 0.15,
    eyeSizeMax: 0.25,
    blobSizeMin: 0.15,
    blobSizeMax: 0.6,
    verticalityFactor: 0.8,
    jiggleIntensity: 0.3, // Reduced from default
    avoidanceDistance: 1.5,
    emergenceRate: 0.1,
    rotationSpeed: 1.0
  });

  // Handle observer mode toggle
  const toggleObserverMode = () => {
    const newMode = !observerMode;
    setObserverMode(newMode);
    onObserverModeChange?.(newMode);
  };

  // Handle blob controls change
  const updateBlobControl = (key: keyof BlobControls, value: number) => {
    const newControls = { ...blobControls, [key]: value };
    setBlobControls(newControls);
    onBlobControlsChange?.(newControls);
  };

  // Reset to defaults
  const resetBlobControls = () => {
    const defaultControls: BlobControls = {
      movementSpeed: 1.0,
      randomDirectionFactor: 0.5,
      randomSizeFactor: 0.3,
      eyeSizeMin: 0.15,
      eyeSizeMax: 0.25,
      blobSizeMin: 0.15,
      blobSizeMax: 0.6,
      verticalityFactor: 0.8,
      jiggleIntensity: 0.3,
      avoidanceDistance: 1.5,
      emergenceRate: 0.1,
      rotationSpeed: 1.0
    };
    setBlobControls(defaultControls);
    onBlobControlsChange?.(defaultControls);
  };

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsCompact(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          setPulseActive(true);
          setTimeout(() => setPulseActive(false), 300);
          onSectionChange((currentSection + 1) % totalSections);
          break;
        case 'Backspace':
          e.preventDefault();
          onSectionChange((currentSection - 1 + totalSections) % totalSections);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          onSectionChange((currentSection - 1 + totalSections) % totalSections);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          onSectionChange((currentSection + 1) % totalSections);
          break;
        case 'h':
        case 'H':
          setShowControls(!showControls);
          break;
        case 'c':
        case 'C':
          if (!isMobile) setIsCompact(!isCompact);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, totalSections, onSectionChange, isTransitioning, showControls, isCompact, isMobile]);

  const navigateToSection = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    const newSection = direction === 'next' 
      ? (currentSection + 1) % totalSections
      : (currentSection - 1 + totalSections) % totalSections;
    
    onSectionChange(newSection);
  };

  return (
    <>
      {/* Main Game Controls Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ 
              opacity: 0, 
              y: 120, 
              scale: 0.8,
              rotateX: 15 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateX: 0 
            }}
            exit={{ 
              opacity: 0, 
              y: 120, 
              scale: 0.8,
              rotateX: 15 
            }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              duration: 0.6 
            }}
            className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50"
          >
            <div className="relative">
              {/* Main Control Panel with responsive sizing */}
              <div className={`glass-refined rounded-2xl md:rounded-3xl p-4 md:p-6 
                              border-2 border-cyber-cyan/20 backdrop-blur-3xl
                              ${isCompact ? 'min-w-64' : 'min-w-80 md:min-w-96'}`}>
                
                {/* Enhanced Header */}
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <motion.div
                      animate={{ rotate: showBlobControls ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Settings className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />
                    </motion.div>
                    <span className="font-title text-white text-base md:text-lg">
                      {isCompact ? 'Controls' : 'Consciousness Controls'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Observer Mode Toggle */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleObserverMode}
                      className={`p-2 rounded-lg glass-refined transition-colors ${
                        observerMode ? 'bg-cyan-400/20 text-cyan-400' : 'hover:bg-cyan-400/10 text-cyan-400'
                      }`}
                      title="Observer Mode - Hide all UI"
                    >
                      {observerMode ? 
                        <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : 
                        <Eye className="h-4 w-4 md:h-5 md:w-5" />
                      }
                    </motion.button>
                    
                    {/* Blob Controls Toggle */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowBlobControls(!showBlobControls)}
                      className={`p-2 rounded-lg glass-refined transition-colors ${
                        showBlobControls ? 'bg-yellow-400/20 text-yellow-400' : 'hover:bg-yellow-400/10 text-yellow-400'
                      }`}
                      title="Blob Parameter Controls"
                    >
                      <Sliders className="h-4 w-4 md:h-5 md:w-5" />
                    </motion.button>
                    
                    {/* Sound Toggle */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="p-2 rounded-lg glass-refined hover:bg-cyan-400/10 transition-colors"
                    >
                      {soundEnabled ? 
                        <Volume2 className="h-4 w-4 md:h-5 md:w-5 text-cyan-400" /> : 
                        <VolumeX className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                      }
                    </motion.button>
                    
                    {/* Compact Toggle (Desktop only) */}
                    {!isMobile && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCompact(!isCompact)}
                        className="p-2 rounded-lg glass-refined hover:bg-yellow-400/10 transition-colors"
                      >
                        {isCompact ? 
                          <Maximize className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" /> : 
                          <Minimize className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
                        }
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                {!showBlobControls && (
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    
                    {/* Previous Button */}
                    <motion.button
                      whileHover={{ scale: 1.03, x: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSectionChange((currentSection - 1 + totalSections) % totalSections)}
                      disabled={isTransitioning}
                      className="flex-1 flex items-center justify-center gap-2 md:gap-3 
                                 p-3 md:p-4 glass-refined rounded-xl md:rounded-2xl 
                                 hover:bg-cyan-400/10 transition-all duration-300
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 border border-cyan-400/20 hover:border-cyan-400/30
                                 group relative overflow-hidden"
                    >
                      <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-cyan-400 relative z-10" />
                      {!isCompact && (
                        <span className="font-subtitle text-white text-sm md:text-base relative z-10">
                          Previous
                        </span>
                      )}
                    </motion.button>

                    {/* Next Button */}
                    <motion.button
                      whileHover={{ scale: 1.03, x: 2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSectionChange((currentSection + 1) % totalSections)}
                      disabled={isTransitioning}
                      className="flex-1 flex items-center justify-center gap-2 md:gap-3 
                                 p-3 md:p-4 bg-gradient-to-r from-cyan-400 to-yellow-400 
                                 rounded-xl md:rounded-2xl hover:shadow-lg hover:shadow-cyan-400/30 
                                 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
                                 text-black font-semibold relative overflow-hidden group"
                    >
                      <ChevronRight className="h-5 w-5 md:h-6 md:w-6 relative z-10" />
                      {!isCompact && (
                        <span className="font-subtitle text-sm md:text-base relative z-10">
                          Next
                        </span>
                      )}
                    </motion.button>

                  </div>
                )}

                {/* Real-time Blob Controls */}
                <AnimatePresence>
                  {showBlobControls && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 md:mb-6 space-y-3"
                    >
                      {/* Reset Button */}
                      <div className="flex justify-between items-center">
                        <h3 className="text-cyan-400 font-semibold text-sm">Live Blob Controls</h3>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={resetBlobControls}
                          className="p-2 rounded-lg glass-refined hover:bg-yellow-400/10 transition-colors"
                        >
                          <RotateCcw className="h-4 w-4 text-yellow-400" />
                        </motion.button>
                      </div>

                      {/* Control Sliders */}
                      <div className="grid grid-cols-1 gap-3 text-xs">
                        {/* Movement Speed */}
                        <div>
                          <label className="text-white/80 block mb-1">Movement Speed</label>
                          <input
                            type="range"
                            min="0.1"
                            max="3.0"
                            step="0.1"
                            value={blobControls.movementSpeed}
                            onChange={(e) => updateBlobControl('movementSpeed', parseFloat(e.target.value))}
                            className="w-full accent-cyan-400"
                          />
                          <span className="text-cyan-400">{blobControls.movementSpeed.toFixed(1)}</span>
                        </div>

                        {/* Random Direction */}
                        <div>
                          <label className="text-white/80 block mb-1">Direction Chaos</label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={blobControls.randomDirectionFactor}
                            onChange={(e) => updateBlobControl('randomDirectionFactor', parseFloat(e.target.value))}
                            className="w-full accent-yellow-400"
                          />
                          <span className="text-yellow-400">{blobControls.randomDirectionFactor.toFixed(1)}</span>
                        </div>

                        {/* Eye Size */}
                        <div>
                          <label className="text-white/80 block mb-1">Eye Size</label>
                          <div className="flex gap-2">
                            <input
                              type="range"
                              min="0.05"
                              max="0.5"
                              step="0.05"
                              value={blobControls.eyeSizeMin}
                              onChange={(e) => updateBlobControl('eyeSizeMin', parseFloat(e.target.value))}
                              className="flex-1 accent-cyan-400"
                            />
                            <input
                              type="range"
                              min="0.1"
                              max="0.8"
                              step="0.05"
                              value={blobControls.eyeSizeMax}
                              onChange={(e) => updateBlobControl('eyeSizeMax', parseFloat(e.target.value))}
                              className="flex-1 accent-yellow-400"
                            />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-cyan-400">{blobControls.eyeSizeMin.toFixed(2)}</span>
                            <span className="text-yellow-400">{blobControls.eyeSizeMax.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Blob Size */}
                        <div>
                          <label className="text-white/80 block mb-1">Blob Size</label>
                          <div className="flex gap-2">
                            <input
                              type="range"
                              min="0.1"
                              max="0.5"
                              step="0.05"
                              value={blobControls.blobSizeMin}
                              onChange={(e) => updateBlobControl('blobSizeMin', parseFloat(e.target.value))}
                              className="flex-1 accent-cyan-400"
                            />
                            <input
                              type="range"
                              min="0.3"
                              max="1.2"
                              step="0.05"
                              value={blobControls.blobSizeMax}
                              onChange={(e) => updateBlobControl('blobSizeMax', parseFloat(e.target.value))}
                              className="flex-1 accent-yellow-400"
                            />
                          </div>
                        </div>

                        {/* Jiggle Intensity */}
                        <div>
                          <label className="text-white/80 block mb-1">Jiggle Intensity</label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={blobControls.jiggleIntensity}
                            onChange={(e) => updateBlobControl('jiggleIntensity', parseFloat(e.target.value))}
                            className="w-full accent-cyan-400"
                          />
                          <span className="text-cyan-400">{blobControls.jiggleIntensity.toFixed(1)}</span>
                        </div>

                        {/* Avoidance Distance */}
                        <div>
                          <label className="text-white/80 block mb-1">Blob Avoidance</label>
                          <input
                            type="range"
                            min="0.5"
                            max="3.0"
                            step="0.1"
                            value={blobControls.avoidanceDistance}
                            onChange={(e) => updateBlobControl('avoidanceDistance', parseFloat(e.target.value))}
                            className="w-full accent-yellow-400"
                          />
                          <span className="text-yellow-400">{blobControls.avoidanceDistance.toFixed(1)}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Progress Indicator */}
                {!showBlobControls && (
                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <span className="font-caption text-gray-400 text-xs">
                        {isCompact ? 'PROG' : 'PROGRESS'}
                      </span>
                      <span className="font-caption text-cyan-400 text-xs md:text-sm">
                        {currentSection + 1} / {totalSections}
                      </span>
                    </div>
                    
                    <div className="relative h-2 md:h-3 glass-refined rounded-full overflow-hidden 
                                    border border-cyan-400/20">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-mint-bright to-cyber-yellow 
                                 relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                                      animate-scan" />
                      <motion.div
                        className="absolute right-0 top-0 bottom-0 w-1 bg-white/60 rounded-full"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                </div>
                )}

                {/* Section Quick Jump */}
                {!showBlobControls && (
                  <div className={`grid gap-1.5 md:gap-2 ${
                    isCompact ? 'grid-cols-6' : 'grid-cols-6'
                  }`}>
                    {Array.from({ length: totalSections }, (_, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => !isTransitioning && onSectionChange(index)}
                        disabled={isTransitioning}
                        className={`aspect-square rounded-lg md:rounded-xl transition-all duration-300 
                                    relative overflow-hidden group text-xs md:text-sm
                          ${index === currentSection 
                            ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50 text-black' 
                            : 'glass-refined hover:bg-gray-600 border border-gray-600 text-gray-300'
                          }`}
                      >
                        <span className="font-mono font-bold relative z-10">
                          {index + 1}
                        </span>
                        
                        {index === currentSection && (
                          <>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 border-2 border-white/30 rounded-lg md:rounded-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                          </>
                        )}
                        
                        {index !== currentSection && (
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent 
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}

              </div>

              {/* Enhanced Floating Action Buttons */}
              <div className="absolute -top-16 md:-top-20 right-0 flex gap-2 md:gap-3">
                
                {/* Auto-Navigate Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 md:w-14 md:h-14 glass-refined rounded-xl md:rounded-2xl 
                             flex items-center justify-center text-cyber-yellow hover:text-cyber-white 
                             transition-colors border border-cyber-yellow/20 hover:border-cyber-yellow/40
                             group relative overflow-hidden"
                  title="Auto Navigate"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-yellow/10 to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Navigation className="h-5 w-5 md:h-6 md:w-6 relative z-10" />
                </motion.button>

                {/* Rotate/Reset Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 md:w-14 md:h-14 glass-refined rounded-xl md:rounded-2xl 
                             flex items-center justify-center text-cyber-mint-bright hover:text-cyber-white 
                             transition-colors border border-cyber-mint-bright/20 hover:border-cyber-mint-bright/40
                             group relative overflow-hidden"
                  title="Reset View"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-mint-bright/10 to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <RotateCcw className="h-5 w-5 md:h-6 md:w-6 relative z-10" />
                </motion.button>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Keyboard Shortcuts Display */}
      <motion.div
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4 }}
      >
        <div className="glass-refined rounded-xl md:rounded-2xl p-3 md:p-4 text-xs 
                        border border-cyber-cyan/10 max-w-xs">
          <div className="font-caption text-cyber-dark-400 mb-2 md:mb-3 text-xs">
            SHORTCUTS
          </div>
          <div className="space-y-1.5 md:space-y-2 font-mono text-cyber-dark-300">
            <div className="flex items-center gap-2 md:gap-3">
              <kbd className="px-2 py-1 bg-cyber-dark-700 rounded text-cyber-cyan text-xs font-bold">
                SPACE
              </kbd>
              <span className="text-xs">Next</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <kbd className="px-2 py-1 bg-cyber-dark-700 rounded text-cyber-mint-bright text-xs font-bold">
                ⌫
              </kbd>
              <span className="text-xs">Previous</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <kbd className="px-2 py-1 bg-cyber-dark-700 rounded text-cyber-yellow text-xs font-bold">
                A/D
              </kbd>
              <span className="text-xs">Navigate</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <kbd className="px-2 py-1 bg-cyber-dark-700 rounded text-cyber-cyan text-xs font-bold">
                H
              </kbd>
              <span className="text-xs">Toggle UI</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Transition Indicator */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60"
          >
            <div className="glass-refined rounded-2xl md:rounded-3xl p-6 md:p-8 text-center 
                            border-2 border-cyber-cyan/30 backdrop-blur-3xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 relative"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon
                    points="50,5 85,27.5 85,72.5 50,95 15,72.5 15,27.5"
                    fill="none"
                    stroke="url(#transitionGradient)"
                    strokeWidth="3"
                  />
                  <defs>
                    <linearGradient id="transitionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00e1ff" />
                      <stop offset="50%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/20 to-cyber-mint-bright/20 
                                rounded-full blur-lg" />
              </motion.div>
              <div className="font-title text-cyber-white text-lg md:text-xl mb-2">
                Transitioning
              </div>
              <div className="font-caption text-cyber-dark-300 text-sm">
                Rotating Hexagon...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Hidden Toggle Button */}
      <AnimatePresence>
        {!showControls && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, x: -100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: -100 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowControls(true)}
            className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 
                       w-14 h-14 md:w-16 md:h-16 glass-refined rounded-xl md:rounded-2xl 
                       flex items-center justify-center text-cyber-cyan hover:text-cyber-white
                       border border-cyber-cyan/20 hover:border-cyber-cyan/40 transition-all
                       group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Gamepad2 className="h-6 w-6 md:h-8 md:w-8 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

    </>
  );
}