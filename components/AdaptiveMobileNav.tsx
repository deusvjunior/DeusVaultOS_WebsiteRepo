import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Zap, Users, Target, Map, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { UserContext } from './AdaptiveEngine';

interface AdaptiveMobileNavProps {
  currentSection: number;
  sections: Array<{
    id: string;
    title: string;
    icon: React.ReactNode;
  }>;
  onNavigateToSection: (index: number) => void;
  userContext: UserContext;
}

export function AdaptiveMobileNav({ 
  currentSection, 
  sections, 
  onNavigateToSection, 
  userContext 
}: AdaptiveMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Adaptive menu style based on user context
  const getMenuStyle = () => {
    if (userContext.accessibilityNeeds.reducedMotion) {
      return 'minimal-motion';
    }
    if (userContext.deviceType === 'mobile') {
      return 'touch-optimized';
    }
    return 'standard';
  };

  const menuStyle = getMenuStyle();

  return (
    <>
      {/* Mobile Menu Button - Fixed Position with Better Touch Targets */}
      <motion.button
        className={`md:hidden fixed top-4 right-4 z-50 rounded-full bg-black/90 backdrop-blur-xl border border-cyan-400/40 text-cyan-400 shadow-lg shadow-cyan-400/20 ${
          menuStyle === 'touch-optimized' ? 'w-14 h-14 p-4' : 'w-12 h-12 p-3'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={menuStyle !== 'minimal-motion' ? { scale: 0.95 } : {}}
        whileHover={menuStyle !== 'minimal-motion' ? { scale: 1.05 } : {}}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Mobile Menu Overlay - Improved Touch Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={menuStyle === 'minimal-motion' ? { duration: 0.1 } : { duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          >
            <div 
              className="flex flex-col items-center justify-center h-full space-y-6 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* User Context Info */}
              {userContext.userType !== 'unknown' && (
                <motion.div
                  className="text-center mb-6"
                  initial={menuStyle !== 'minimal-motion' ? { y: -20, opacity: 0 } : {}}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-cyan-400 text-sm uppercase tracking-wide">
                    {userContext.userType} Portal
                  </div>
                  <div className="text-white/60 text-xs mt-1">
                    Visit #{userContext.visitCount} • {userContext.deviceType}
                  </div>
                </motion.div>
              )}

              {/* Navigation Sections - Enhanced for Mobile */}
              <div className="w-full max-w-sm space-y-3">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    className={`flex items-center space-x-4 p-4 rounded-xl w-full text-left transition-all ${
                      index === currentSection
                        ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/40 shadow-lg shadow-cyan-400/20'
                        : 'text-white/80 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                    } ${menuStyle === 'touch-optimized' ? 'p-5 rounded-2xl' : 'p-4 rounded-xl'}`}
                    onClick={() => {
                      onNavigateToSection(index);
                      setIsOpen(false);
                    }}
                    initial={menuStyle !== 'minimal-motion' ? { x: -50, opacity: 0 } : {}}
                    animate={{ x: 0, opacity: 1 }}
                    transition={menuStyle !== 'minimal-motion' ? { delay: index * 0.1 + 0.3 } : {}}
                    whileTap={menuStyle !== 'minimal-motion' ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-base">{section.title}</div>
                      {index === currentSection && (
                        <div className="text-xs text-cyan-400/80 mt-1">Current Section</div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Quick Actions for User Type - Mobile Optimized */}
              <motion.div
                className="w-full max-w-sm space-y-3 mt-6"
                initial={menuStyle !== 'minimal-motion' ? { y: 20, opacity: 0 } : {}}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {userContext.userType === 'developer' && (
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-yellow-500 text-black font-semibold rounded-xl text-center">
                    Open DevTools
                  </button>
                )}
                {userContext.userType === 'enterprise' && (
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl text-center">
                    Schedule Demo
                  </button>
                )}
                {userContext.userType === 'student' && (
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold rounded-xl text-center">
                    Student Discount
                  </button>
                )}
              </motion.div>

              {/* Close Menu Hint */}
              <motion.div
                className="text-center text-sm text-white/60 mt-8"
                initial={menuStyle !== 'minimal-motion' ? { y: 20, opacity: 0 } : {}}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Tap anywhere to close menu
              </motion.div>

              {/* Accessibility Options */}
              <motion.div
                className="absolute bottom-8 left-4 right-4"
                initial={menuStyle !== 'minimal-motion' ? { y: 20, opacity: 0 } : {}}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-center text-xs text-white/40">
                  {userContext.accessibilityNeeds.reducedMotion && (
                    <div>Reduced Motion Enabled</div>
                  )}
                  {userContext.connectionSpeed === 'slow' && (
                    <div>Data Saver Mode</div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AdaptiveMobileNav;
