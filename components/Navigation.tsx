import { motion } from 'framer-motion';
import { ChevronDown, Mouse, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useHapticFeedback } from '../utils/hapticFeedback';

interface NavigationProps {
  sections: string[];
  currentSection: number;
  onSectionChange: (index: number) => void;
}

export function Navigation({ sections, currentSection, onSectionChange }: NavigationProps) {
  const [showInstructions, setShowInstructions] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { navigation, click } = useHapticFeedback();

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
      {/* Mobile-First Responsive Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4"
      >
        <div className="plasma-taskbar backdrop-blur-lg bg-black/25 border border-white/10 shadow-2xl rounded-xl">
          {/* Mobile Layout: Stack vertically */}
          <div className="flex flex-col items-center gap-3 p-3 md:hidden">
            {/* Current Page Indicator - Mobile */}
            <div className="text-white/90 font-medium text-xs text-center">
              {sections[currentSection]}
            </div>
            
            {/* Section Navigation Dots - Mobile Centered */}
            <div className="flex items-center justify-center gap-3">
              {sections.map((section, index) => (
                <motion.button
                  key={index}
                  className={`plasma-dot w-5 h-5 rounded-full transition-all duration-300 ${
                    currentSection === index
                      ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => {
                    navigation();
                    onSectionChange(index);
                    scrollToSection(index);
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  title={section}
                />
              ))}
            </div>

            {/* Progress Indicator - Mobile Full Width */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Desktop Layout: Horizontal */}
          <div className="hidden md:flex items-center justify-center gap-4 px-4 py-3">
            {/* THERION Logo in Navigation - Desktop */}
            <motion.div 
              className="flex items-center gap-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img src="/Therion.png" alt="THERION" className="h-5 w-5" />
              <img src="/DVLogo.png" alt="DeusVault" className="h-5 w-5" />
            </motion.div>
            
            {/* Current Page Indicator - Desktop */}
            <div className="text-white/90 font-medium text-sm">
              {sections[currentSection]}
            </div>
            
            {/* Section Navigation Dots - Desktop */}
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
                    navigation();
                    onSectionChange(index);
                    scrollToSection(index);
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  title={section}
                />
              ))}
            </div>

            {/* Progress Indicator - Desktop */}
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
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

      {/* Mobile-Responsive Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-4 right-4 z-50 md:left-6 md:right-auto"
      >
        <div className="plasma-header px-3 py-2 rounded-lg backdrop-blur-lg bg-black/15 border border-white/10 md:px-4">
          <div className="flex items-center justify-between md:justify-start md:gap-3">
            <div className="text-white font-bold text-base md:text-lg">
              DeusVault<span className="text-cyan-400">OS</span>
            </div>
            <div className="text-white/60 text-sm hidden md:block">|</div>
            <div className="text-cyan-300 text-xs md:text-sm font-medium">
              {sections[currentSection]}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile-Responsive Navigation Instructions */}
      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-24 right-4 left-4 z-40 plasma-instructions p-3 rounded-lg backdrop-blur-lg bg-black/20 border border-white/10 md:bottom-20 md:right-6 md:left-auto md:max-w-xs"
        >
          <div className="flex items-center justify-center gap-2 mb-2 md:justify-start">
            {isMobile ? (
              <Smartphone className="h-4 w-4 text-cyan-400" />
            ) : (
              <Mouse className="h-4 w-4 text-cyan-400" />
            )}
            <span className="font-medium text-cyan-400 text-sm">Navigation</span>
          </div>
          
          <div className="space-y-1 text-xs text-white/80 text-center md:text-left">
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