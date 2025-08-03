import { useState, useEffect } from 'react';
import { ThreeJSScene_Cinematic } from './components/ThreeJSScene_Cinematic';
import { PageTransition, LoadingTransition } from './components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Users, 
  Zap, 
  ShoppingCart, 
  BarChart3, 
  Mail,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Settings
} from 'lucide-react';

// Import content components
import { HeroSection } from "./components/HeroSection";
import { UserSegments } from "./components/UserSegments";
import { FeaturesSection } from "./components/FeaturesSection";
import { MarketplaceSection } from "./components/MarketplaceSection";
import { MicrosoftComparisonSection } from "./components/MicrosoftComparisonSection";
import { Footer } from "./components/Footer";

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const sections = [
    {
      id: 'hero',
      title: 'Welcome to Deus Vault',
      icon: <Home className="h-4 w-4" />,
      component: <HeroSection />
    },
    {
      id: 'segments',
      title: 'User Segments',
      icon: <Users className="h-4 w-4" />,
      component: <UserSegments />
    },
    {
      id: 'features',
      title: 'Core Features',
      icon: <Zap className="h-4 w-4" />,
      component: <FeaturesSection />
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      icon: <ShoppingCart className="h-4 w-4" />,
      component: <MarketplaceSection />
    },
    {
      id: 'comparison',
      title: 'Platform Comparison',
      icon: <BarChart3 className="h-4 w-4" />,
      component: <MicrosoftComparisonSection />
    },
    {
      id: 'contact',
      title: 'Get Started',
      icon: <Mail className="h-4 w-4" />,
      component: <Footer />
    }
  ];

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced navigation functions with cinematic transitions
  const navigateToSection = (index: number) => {
    if (index === currentSection) return;
    
    setIsTransitioning(true);
    
    // Delay section change to allow transition to start
    setTimeout(() => {
      setCurrentSection(index);
      setTimeout(() => setIsTransitioning(false), 600);
    }, 200);
  };

  const nextSection = () => {
    const nextIndex = (currentSection + 1) % 6;
    navigateToSection(nextIndex);
  };

  const prevSection = () => {
    const prevIndex = (currentSection - 1 + 6) % 6;
    navigateToSection(prevIndex);
  };

  const resetToHome = () => {
    navigateToSection(0);
  };

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
  };

  // Autoplay effect with smooth transitions
  useEffect(() => {
    if (isAutoplay && !isTransitioning) {
      const timer = setInterval(() => {
        nextSection();
      }, 5000); // Change section every 5 seconds
      
      return () => clearInterval(timer);
    }
  }, [isAutoplay, isTransitioning, nextSection]);

  // Enhanced keyboard navigation with more controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          prevSection();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          nextSection();
          break;
        case ' ':
          e.preventDefault();
          nextSection();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsAutoplay(!isAutoplay);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          setIsFullscreen(!isFullscreen);
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          setShowControls(!showControls);
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          resetToHome();
          break;
        case 'Escape':
          e.preventDefault();
          setIsFullscreen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAutoplay, isFullscreen, showControls]);

  // Simulated loading with progress
  useEffect(() => {
    if (isLoading) {
      let progress = 0;
      const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          setLoadingProgress(progress);
          setTimeout(() => setIsLoading(false), 500);
          clearInterval(loadingInterval);
        } else {
          setLoadingProgress(progress);
        }
      }, 100);
      
      return () => clearInterval(loadingInterval);
    }
  }, [isLoading]);

  // Simple loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-cyber-black flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            className="w-24 h-24 mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,8 82,25 82,75 50,92 18,75 18,25"
                fill="none"
                stroke="#00e1ff"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl lg:text-6xl text-cyber-white mb-4"
          >
            DEUS VAULT
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-subtitle text-cyber-dark-300"
          >
            Loading 3D Interface...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white antialiased relative">
      
      {/* Enhanced Loading Screen */}
      <LoadingTransition 
        isLoading={isLoading}
        progress={loadingProgress / 100}
        style="hexagon"
      />
      
      {/* Page Transition Effects */}
      <PageTransition 
        isTransitioning={isTransitioning}
        transitionType="ripple"
        duration={800}
        onComplete={() => setIsTransitioning(false)}
      />
      
      {/* 3D Cinematic Background Scene */}
      <ThreeJSScene_Cinematic
        currentSection={currentSection}
        onSectionChange={navigateToSection}
      />

      {/* Clean Title Ribbon */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-cyber-dark-900/95 via-cyber-dark-800/95 to-cyber-dark-900/95 backdrop-blur-md border-b border-cyber-cyan/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full text-cyber-cyan">
                  <polygon
                    points="12,2 20,6 20,18 12,22 4,18 4,6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div>
                <h1 className="font-title text-xl text-cyber-white">DEUS VAULT</h1>
                <p className="font-caption text-xs text-cyber-dark-400">Linux Development Environment</p>
              </div>
            </div>

            {/* Current Section Info */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <div className="text-cyber-cyan">
                  {sections[currentSection].icon}
                </div>
                <div>
                  <div className="font-subtitle text-sm text-cyber-white">
                    {sections[currentSection].title}
                  </div>
                  <div className="font-caption text-xs text-cyber-dark-400">
                    Section {currentSection + 1} of {sections.length}
                  </div>
                </div>
              </div>
              
              {/* Mobile indicator */}
              <div className="md:hidden">
                <div className="font-mono text-sm text-cyber-cyan">
                  {currentSection + 1}/{sections.length}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Enhanced Navigation Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
          >
            <div className="flex items-center gap-4">
              
              {/* Control Panel */}
              <div className="flex items-center gap-2 glass-refined rounded-2xl px-6 py-4">
                
                {/* Reset to Home */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={resetToHome}
                  className="w-10 h-10 glass-refined rounded-lg flex items-center justify-center text-cyber-cyan hover:text-cyber-white transition-colors group"
                  title="Reset to Home (R)"
                >
                  <Home className="h-4 w-4" />
                </motion.button>

                {/* Previous */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSection}
                  className="w-12 h-12 glass-refined rounded-xl flex items-center justify-center text-cyber-cyan hover:text-cyber-white transition-colors"
                  title="Previous Section (A/←)"
                >
                  <ArrowLeft className="h-5 w-5" />
                </motion.button>

                {/* Section dots with enhanced interactivity */}
                <div className="flex items-center gap-3 px-4">
                  {sections.map((section, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => navigateToSection(index)}
                      className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSection
                          ? 'bg-cyber-cyan shadow-lg shadow-cyber-cyan/50'
                          : 'bg-cyber-dark-600 hover:bg-cyber-dark-400'
                      }`}
                      title={`${section.title} (${index + 1})`}
                    >
                      {index === currentSection && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 border-2 border-cyber-cyan rounded-full animate-ping"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Next */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSection}
                  className="w-12 h-12 glass-refined rounded-xl flex items-center justify-center text-cyber-cyan hover:text-cyber-white transition-colors"
                  title="Next Section (D/→)"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

                {/* Autoplay Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleAutoplay}
                  className={`w-10 h-10 glass-refined rounded-lg flex items-center justify-center transition-colors ${
                    isAutoplay 
                      ? 'text-cyber-white bg-cyber-cyan/20 border border-cyber-cyan/40' 
                      : 'text-cyber-cyan hover:text-cyber-white'
                  }`}
                  title="Toggle Autoplay (P)"
                >
                  {isAutoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </motion.button>

                {/* Settings */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowControls(!showControls)}
                  className="w-10 h-10 glass-refined rounded-lg flex items-center justify-center text-cyber-cyan hover:text-cyber-white transition-colors"
                  title="Settings (H)"
                >
                  <Settings className="h-4 w-4" />
                </motion.button>

              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <div className="fixed inset-0 z-20 pointer-events-none pt-20">
        <div className="h-full flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-5xl mx-auto pointer-events-auto">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
              >
                
                {/* Content Background */}
                <div className="glass-refined rounded-3xl p-8 lg:p-12 max-h-[calc(100vh-200px)] overflow-y-auto">
                  
                  {/* Section header */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyber-cyan" />
                      <div className="text-cyber-cyan text-xl">
                        {sections[currentSection].icon}
                      </div>
                      <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyber-cyan" />
                    </div>
                    
                    <h2 className="font-title text-2xl lg:text-3xl text-cyber-white mb-2">
                      {sections[currentSection].title}
                    </h2>
                  </div>

                  {/* Content */}
                  <div className="min-h-[400px]">
                    {sections[currentSection].component}
                  </div>
                  
                </div>
                
              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>
      </div>

      {/* Side Navigation Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col gap-3">
          {sections.map((section, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'bg-cyber-cyan shadow-md shadow-cyber-cyan/50'
                  : 'bg-cyber-dark-600 hover:bg-cyber-dark-400'
              }`}
              title={section.title}
            />
          ))}
        </div>
      </div>

      {/* Controls Help */}
      <div className="fixed bottom-6 right-6 z-30">
        <div className="glass-refined rounded-xl p-3 text-xs">
          <div className="space-y-1 font-mono text-cyber-dark-300">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-cyber-dark-700 rounded">A/D</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-cyber-dark-700 rounded">DRAG</kbd>
              <span>Rotate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <motion.div
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent"
          animate={{ 
            x: ['-100%', '100%'],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />
      </div>

    </div>
  );
}