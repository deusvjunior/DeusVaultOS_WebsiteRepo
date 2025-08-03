import { motion } from 'framer-motion';
import {
    ChevronRight,
    Code,
    Download,
    Github,
    Globe,
    Monitor,
    PlayCircle,
    Shield,
    Smartphone,
    Sparkles,
    Zap
} from 'lucide-react';
import { UserContext } from './AdaptiveEngine';

interface HeroSectionProps {
  onNavigateToSubpage?: (subpage: string) => void;
  adaptedContent?: {
    heroMessage: string;
    primaryCTA: string;
    featuredContent: string[];
    navigationStyle: string;
  };
  userContext?: UserContext;
}

export function HeroSection({ onNavigateToSubpage, adaptedContent, userContext }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
      
      {/* **PROFESSIONAL HERO VIDEO BACKGROUND** */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {/* Primary OS Demo Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            poster="/os-demo-thumbnail.jpg"
          >
            <source src="/videos/deusvault-os-hero-demo.mp4" type="video/mp4" />
            <source src="/videos/deusvault-os-hero-demo.webm" type="video/webm" />
            {/* Fallback gradient for unsupported browsers */}
          </video>
          
          {/* Advanced overlay with breathing effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-yellow-900/20"></div>
        </div>
      </div>

      {/* **ENHANCED HERO CONTENT WITH SPLIT LAYOUT** */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 sm:py-20">
        
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          
          {/* **ENHANCED DEUSVAUL**TOS LOGO** */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="relative flex justify-center lg:justify-start mb-8"
          >
            <div className="relative">
              <img 
                src="/DVLogo.png" 
                alt="DeusVaultOS" 
                className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 drop-shadow-2xl mx-auto lg:mx-0"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.7)) drop-shadow(0 0 60px rgba(0, 255, 255, 0.3))'
                }}
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-xl"></div>
            </div>
          </motion.div>
          
          {/* **PROFESSIONAL BADGE** */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 glass-refined rounded-lg px-4 sm:px-6 py-2 sm:py-3 border border-cyan-400/50 shadow-xl shadow-cyan-500/20">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
              <span className="text-cyan-400 font-medium text-sm sm:text-base">
                🚀 {adaptedContent?.heroMessage || 'Advanced Development Platform'}
              </span>
            </div>
          </motion.div>

          {/* **ENHANCED MAIN TITLE** */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-white to-yellow-400 bg-clip-text text-transparent leading-tight tracking-tight"
                style={{ fontFamily: "'Space Grotesk', monospace" }}>
              DeusVaultOS
            </h1>
            
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold text-gray-300 leading-relaxed">
              {adaptedContent?.heroMessage || 'AI-Powered Development Environment'}
              <br />
              <span className="text-cyan-400 font-bold">15 specialized agents. Zero configuration.</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              A complete development platform with intelligent AI agents that handle deployment, debugging, 
              and optimization. Currently in development, launching Q4 2025.
            </p>
          </motion.div>

          {/* **PROFESSIONAL STATS** */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 max-w-sm sm:max-w-md mx-auto lg:mx-0"
          >
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400">15+</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">Smart Agents</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">10x</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">Faster Dev</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400">Zero</div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">Setup Time</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <button 
              onClick={() => onNavigateToSubpage?.('download')}
              className="flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-cyan-500 to-yellow-500 text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg hover:from-cyan-400 hover:to-yellow-400 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              {adaptedContent?.primaryCTA || 'Get Updates'}
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            
            <button 
              onClick={() => onNavigateToSubpage?.('demo')}
              className="flex items-center justify-center gap-2 sm:gap-3 glass-refined border border-cyan-400/50 text-cyan-400 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              See Demo
            </button>
          </motion.div>

          {/* Platform Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-gray-400"
          >
            <span className="text-xs sm:text-sm font-medium text-center sm:text-left">Available on:</span>
            <div className="flex items-center gap-3 sm:gap-4">
              <Monitor className="h-4 w-4 sm:h-5 sm:w-5 hover:text-cyan-400 transition-colors" />
              <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 hover:text-cyan-400 transition-colors" />
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 hover:text-cyan-400 transition-colors" />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          {/* Main Demo Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-cyan-400/30">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto"
              poster="/demo-interface-thumbnail.jpg"
            >
              <source src="/videos/deusvault-interface-demo.mp4" type="video/mp4" />
              <source src="/videos/deusvault-interface-demo.webm" type="video/webm" />
            </video>
            
            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <PlayCircle className="h-16 w-16 text-cyan-400" />
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="glass-refined rounded-lg p-4 border border-cyan-400/30 group hover:border-cyan-400/50 transition-colors"
            >
              <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-cyan-400/30 transition-colors">
                <Code className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Code Whisperer</h3>
              <p className="text-sm text-gray-400">AI that reads your mind, writes your code</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="glass-refined rounded-lg p-4 border border-yellow-400/30 group hover:border-yellow-400/50 transition-colors"
            >
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-yellow-400/30 transition-colors">
                <Zap className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Lightning Fast</h3>
              <p className="text-sm text-gray-400">Deploy in seconds, not hours</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="glass-refined rounded-lg p-4 border border-cyan-400/30 group hover:border-cyan-400/50 transition-colors"
            >
              <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-cyan-400/30 transition-colors">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Dream Team</h3>
              <p className="text-sm text-gray-400">Elite devs building the impossible</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="glass-refined rounded-lg p-4 border border-yellow-400/30 group hover:border-yellow-400/50 transition-colors"
            >
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-yellow-400/30 transition-colors">
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Impressed</h3>
              <p className="text-sm text-gray-400">Experience the future today</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border border-gray-400 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2"></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
