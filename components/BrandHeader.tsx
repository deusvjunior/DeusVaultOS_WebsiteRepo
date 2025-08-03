import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { SafeImage } from './ui/SafeImage';

interface BrandHeaderProps {
  onReturnHome: () => void;
  currentSection: number;
  isSubpage: boolean;
}

export function BrandHeader({ onReturnHome, currentSection, isSubpage }: BrandHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-4 z-50 md:top-6 md:left-6"
    >
      <motion.button
        onClick={onReturnHome}
        className="flex items-center gap-3 px-4 py-2 rounded-lg backdrop-blur-lg bg-black/20 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Return to Homepage"
      >
        {/* THERION & DeusVault Logos */}
        <div className="flex items-center gap-2">
                      <SafeImage
            src="/Therion.png" 
            alt="Therion AI Engine"
            className="h-6 w-6 mr-2"
            />
            <SafeImage
            src="/DVLogo.png" 
            alt="DeusVault OS"
            className="h-8 w-8 mr-3"
            />
        </div>
        
        {/* Brand Text */}
        <div className="text-white font-medium text-sm hidden md:block">
          DeusVault OS
        </div>
        
        {/* Home Indicator when on subpage */}
        {isSubpage && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-cyan-400/20 rounded-full flex items-center justify-center"
          >
            <Home className="h-3 w-3 text-cyan-400" />
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}
