import { motion } from 'framer-motion';
import { ChevronDown, Mouse, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavigationProps {
  sections: string[];
  currentSection: number;
  onSectionChange: (index: number) => void;
}

export function Navigation({ sections, currentSection, onSectionChange }: NavigationProps) {
  const [showInstructions, setShowInstructions] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* KDE Plasma 6 Style Floating Taskbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="plasma-taskbar px-6 py-3 rounded-xl backdrop-blur-lg bg-black/25 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-6">
            
            {/* THERION Logo in Navigation */}
            <motion.div 
              className="flex items-center gap-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img src="/Therion.png" alt="THERION" className="h-6 w-6" />
              <img src="/DVLogo.png" alt="DeusVault" className="h-6 w-6" />
            </motion.div>
            {/* Current Page Indicator */}
            <div className="text-white/90 font-medium text-sm mr-3 hidden md:block">
              {sections[currentSection]}
            </div>
            
            {/* Section Navigation Dots */}
            <div className="flex items-center gap-2">
              {sections.map((section, index) => (
                <motion.button
                  key={index}
                  className={`plasma-dot w-4 h-4 rounded-full transition-all duration-300 ${
                    currentSection === index
                      ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => {
                    onSectionChange(index);
                    scrollToSection(index);
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  title={section}
                />
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden ml-3">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Header with Current Page Name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 left-6 z-50"
      >
        <div className="plasma-header px-4 py-2 rounded-lg backdrop-blur-lg bg-black/15 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="text-white font-bold text-lg">
              DeusVault<span className="text-cyan-400">OS</span>
            </div>
            <div className="text-white/60 text-sm">|</div>
            <div className="text-cyan-300 text-sm font-medium">
              {sections[currentSection]}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Instructions */}
      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-20 right-6 z-40 plasma-instructions p-3 rounded-lg backdrop-blur-lg bg-black/20 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2">
            {isMobile ? (
              <Smartphone className="h-4 w-4 text-cyan-400" />
            ) : (
              <Mouse className="h-4 w-4 text-cyan-400" />
            )}
            <span className="font-medium text-cyan-400 text-sm">Navigation</span>
          </div>
          
          <div className="space-y-1 text-xs text-white/80">
            {isMobile ? (
              <>
                <div>Swipe to navigate</div>
                <div>Tap taskbar dots</div>
              </>
            ) : (
              <>
                <div>Scroll or use taskbar</div>
                <div>Click hexagon faces</div>
              </>
            )}
          </div>
          
          <div className="flex items-center justify-center mt-2">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-3 w-3 text-cyan-400" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}