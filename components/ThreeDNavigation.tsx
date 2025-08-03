import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Users, 
  Zap, 
  ShoppingCart, 
  BarChart3, 
  Mail,
  Menu,
  X,
  RotateCcw,
  MousePointer,
  Scroll,
  Hexagon
} from 'lucide-react';
import { useHapticFeedback } from '../utils/hapticFeedback';

interface ThreeDNavigationProps {
  currentSection: number;
  onSectionChange: (section: number) => void;
  sectionTitles: string[];
}

export function ThreeDNavigation({ currentSection, onSectionChange, sectionTitles }: ThreeDNavigationProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const { navigation, click, light } = useHapticFeedback();

  const sectionIcons = [
    <Home className="h-6 w-6" />,
    <Users className="h-6 w-6" />,
    <Zap className="h-6 w-6" />,
    <ShoppingCart className="h-6 w-6" />,
    <BarChart3 className="h-6 w-6" />,
    <Mail className="h-6 w-6" />
  ];

  const sectionColors = [
    'text-cyber-cyan',
    'text-cyber-mint-bright', 
    'text-cyber-yellow',
    'text-cyber-cyan',
    'text-cyber-mint-bright',
    'text-cyber-yellow'
  ];

  const hexagonFaces = [
    'Front Face',
    'Face 2',
    'Face 3', 
    'Back Face',
    'Face 5',
    'Face 6'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          navigation();
          onSectionChange((currentSection - 1 + 6) % 6);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          navigation();
          onSectionChange((currentSection + 1) % 6);
          break;
        case 'Escape':
          light();
          setShowMenu(false);
          break;
        case ' ':
          e.preventDefault();
          setShowMenu(!showMenu);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, onSectionChange, showMenu]);

  return (
    <>
      {/* Enhanced Navigation Menu */}
      <div className="fixed top-8 left-8 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            click();
            setShowMenu(!showMenu);
          }}
          className="w-18 h-18 glass-refined rounded-2xl flex items-center justify-center text-cyber-cyan hover:text-cyber-white transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 to-cyber-mint-bright/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <motion.div
            animate={{ rotate: showMenu ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            {showMenu ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Enhanced Navigation Menu Panel */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, x: -400, rotateY: -90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -400, rotateY: -90 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-8 left-32 z-40 w-96"
          >
            <div className="glass-refined rounded-3xl p-8 border-2 border-cyber-cyan/20">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <Hexagon className="h-8 w-8 text-cyber-cyan" />
                  <h3 className="font-title text-cyber-white text-xl">Hexagon Navigation</h3>
                </div>
                <p className="font-body-sm text-cyber-dark-300">
                  Rotate the hexagon to explore all faces of Deus Vault
                </p>
              </div>

              <div className="space-y-3">
                {sectionTitles.map((title, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, x: 12 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigation();
                      onSectionChange(index);
                      setShowMenu(false);
                    }}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                      index === currentSection
                        ? 'bg-cyber-cyan/20 text-cyber-cyan border-2 border-cyber-cyan/40 shadow-lg shadow-cyber-cyan/10'
                        : 'text-cyber-dark-300 hover:text-cyber-white hover:bg-cyber-dark-800/60 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`${sectionColors[index]} ${index === currentSection ? 'scale-125' : ''} transition-all duration-300`}>
                        {sectionIcons[index]}
                      </div>
                      <div className="flex-1">
                        <div className="font-subtitle text-base font-semibold">{title}</div>
                        <div className="text-sm opacity-70 mt-1">
                          {hexagonFaces[index]} • {index + 1} of {sectionTitles.length}
                        </div>
                      </div>
                      {index === currentSection && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-cyber-cyan rounded-full"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-cyber-dark-700">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-cyber-cyan font-subtitle text-sm font-semibold">Current</div>
                    <div className="text-cyber-white font-caption text-xs mt-1">
                      {hexagonFaces[currentSection]}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyber-mint-bright font-subtitle text-sm font-semibold">Progress</div>
                    <div className="text-cyber-white font-caption text-xs mt-1">
                      {currentSection + 1} / {sectionTitles.length}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyber-yellow font-subtitle text-sm font-semibold">Shape</div>
                    <div className="text-cyber-white font-caption text-xs mt-1">
                      Hexagon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Hexagon Face Indicator */}
      <div className="fixed top-8 right-8 z-50">
        <div className="glass-refined rounded-2xl p-6 min-w-64 border-2 border-cyber-cyan/20">
          <div className="flex items-center gap-4 mb-4">
            <div className={`${sectionColors[currentSection]} animate-pulse-gentle`}>
              {sectionIcons[currentSection]}
            </div>
            <div>
              <div className="font-subtitle text-cyber-white text-lg font-semibold">
                {sectionTitles[currentSection]}
              </div>
              <div className="font-caption text-cyber-dark-400 text-sm">
                {hexagonFaces[currentSection]}
              </div>
            </div>
          </div>
          
          {/* 3D Hexagon Visualization */}
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 transform-gpu">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Main hexagon */}
                <polygon
                  points="50,10 85,30 85,70 50,90 15,70 15,30"
                  fill="none"
                  stroke={currentSection === 0 ? '#00e1ff' : '#475569'}
                  strokeWidth="3"
                  className="transition-all duration-300"
                />
                
                {/* Face indicators */}
                {Array.from({ length: 6 }, (_, i) => {
                  const angle = (i * 60) - 90;
                  const x = 50 + Math.cos(angle * Math.PI / 180) * 30;
                  const y = 50 + Math.sin(angle * Math.PI / 180) * 30;
                  
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill={i === currentSection ? '#00e1ff' : '#475569'}
                      className="transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.5 }}
                      onClick={() => {
                        navigation();
                        onSectionChange(i);
                      }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Bar - Mobile Responsive */}
      <div className="fixed bottom-20 left-0 right-0 z-50 md:bottom-0">
        <div className="h-2 md:h-3 bg-cyber-dark-800 relative overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-mint-bright to-cyber-yellow relative"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSection + 1) / sectionTitles.length) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan" />
        </div>
      </div>

      {/* Enhanced 3D Navigation Instructions */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ delay: 2, type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 max-w-xl"
          >
            <div className="glass-refined rounded-3xl p-8 text-center border-2 border-cyber-cyan/20">
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Hexagon className="h-8 w-8 text-cyber-cyan" />
                </motion.div>
                <span className="font-title text-cyber-white text-xl">3D Hexagon Navigation</span>
              </div>
              
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-3">
                  <MousePointer className="h-5 w-5 text-cyber-cyan" />
                  <span className="text-cyber-dark-300">Drag to rotate hexagon</span>
                </div>
                <div className="flex items-center gap-3">
                  <Scroll className="h-5 w-5 text-cyber-mint-bright" />
                  <span className="text-cyber-dark-300">Scroll to navigate faces</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-cyber-yellow rounded flex items-center justify-center text-cyber-black text-xs font-bold">
                    A
                  </div>
                  <span className="text-cyber-dark-300">A/D keys to rotate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-cyber-cyan rounded flex items-center justify-center text-cyber-black text-xs font-bold">
                    ⎵
                  </div>
                  <span className="text-cyber-dark-300">Spacebar for menu</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInstructions(false)}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-cyber-cyan to-cyber-mint-bright text-cyber-black rounded-xl font-semibold hover:shadow-lg hover:shadow-cyber-cyan/20 transition-all"
              >
                Start Exploring
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Quick Face Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col gap-3">
          {sectionTitles.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigation();
                onSectionChange(index);
              }}
              className={`w-5 h-5 rounded-full transition-all duration-500 relative ${
                index === currentSection
                  ? `bg-cyber-cyan shadow-lg shadow-cyber-cyan/50 ${sectionColors[index]}`
                  : 'bg-cyber-dark-600 hover:bg-cyber-dark-400'
              }`}
              title={`${sectionTitles[index]} - ${hexagonFaces[index]}`}
            >
              {index === currentSection && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 rounded-full border-2 border-cyber-cyan animate-pulse-gentle"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
}