import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    BarChart3,
    Home,
    Mail,
    ShoppingCart,
    Users,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import ThreeJSScene from './components/ThreeJSScene';

// Import content components
import { FeaturesSection } from "./components/FeaturesSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { MarketplaceSection } from "./components/MarketplaceSection";
import { MicrosoftComparisonSection } from "./components/MicrosoftComparisonSection";
import { UserSegments } from "./components/UserSegments";

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

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

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced keyboard navigation
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
          setCurrentSection((prev: number) => (prev - 1 + 6) % 6);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          setCurrentSection((prev: number) => (prev + 1) % 6);
          break;
        case ' ':
          e.preventDefault();
          setCurrentSection((prev: number) => (prev + 1) % 6);
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          setCurrentSection(0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation functions
  const navigateToSection = (index: number) => {
    setCurrentSection(index);
  };

  const nextSection = () => {
    setCurrentSection((prev: number) => (prev + 1) % 6);
  };

  const prevSection = () => {
    setCurrentSection((prev: number) => (prev - 1 + 6) % 6);
  };

  const resetToHome = () => {
    setCurrentSection(0);
  };

  // Show impressive loading screen
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white antialiased relative">
      
      {/* 3D Background Scene */}
      <ThreeJSScene
        currentSection={currentSection}
        reducedMotion={reducedMotion}
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
            <div className="flex items-center gap-4">
              
              {/* Control Panel */}
              <div className="flex items-center gap-2 glass-refined rounded-lg px-6 py-4">
                
                {/* Reset to Home */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={resetToHome}
                  className="w-10 h-10 glass-refined rounded-md flex items-center justify-center text-cyber-cyan hover:text-cyber-white transition-colors group"
                  title="Reset to Home (R)"
                >
                  <Home className="h-4 w-4" />
                </motion.button>

                {/* Previous */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSection}
                  className="w-12 h-12 glass-refined rounded-lg flex items-center justify-center text-cyber-cyan hover:text-cyber-white transition-colors"
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
                  className="w-12 h-12 glass-refined rounded-lg flex items-center justify-center text-cyber-cyan hover:text-cyber-white transition-colors"
                  title="Next Section (D/→)"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

              </div>
              
            </div>
          </motion.div>

      {/* Content Area */}
      <div className="fixed inset-0 z-20 pointer-events-none pt-20">
        <div className="h-full flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-5xl mx-auto pointer-events-auto">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                
                {/* Content Background */}
                <div className="glass-refined rounded-lg p-8 lg:p-12 max-h-[calc(100vh-200px)] overflow-y-auto">
                  
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
        <div className="glass-refined rounded-lg p-3 text-xs">
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