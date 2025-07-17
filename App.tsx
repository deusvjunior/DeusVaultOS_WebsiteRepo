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
import { Footer } from "./components/Footer";
import { ProfessionalHeroSection } from "./components/ProfessionalHeroSection";
import { ProfessionalFeaturesSection } from "./components/ProfessionalFeaturesSection";
import { ProfessionalFooter } from "./components/ProfessionalFooter";
import { MicrosoftComparisonSection } from "./components/MicrosoftComparisonSection";
import { UserSegments } from "./components/UserSegments";
import { WebVitalsMonitor } from "./components/WebVitalsMonitor";

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const sections = [
    {
      id: 'hero',
      title: 'DeusVaultOS',
      icon: <Home className="h-4 w-4" />,
      component: <ProfessionalHeroSection />
    },
    {
      id: 'segments',
      title: 'User Segments',
      icon: <Users className="h-4 w-4" />,
      component: <UserSegments />
    },
    {
      id: 'features',
      title: 'Technical Architecture',
      icon: <Zap className="h-4 w-4" />,
      component: <ProfessionalFeaturesSection />
    },
    {
      id: 'comparison',
      title: 'Enterprise Comparison',
      icon: <BarChart3 className="h-4 w-4" />,
      component: <MicrosoftComparisonSection />
    }
  ];  // Detect reduced motion preference
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
    <div className="min-h-screen antialiased relative" style={{ background: 'var(--tldark-primary)', color: 'var(--text-primary)' }}>
      
      {/* Web Vitals Monitoring */}
      <WebVitalsMonitor enableReporting={true} />
      
      {/* 3D Background Scene */}
      <ThreeJSScene
        currentSection={currentSection}
        reducedMotion={reducedMotion}
      />

      {/* Professional Glass Header */}
      <div className="fixed top-0 left-0 right-0 z-30 tldark-glass-card" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Professional Logo */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full" style={{ color: 'var(--accent-cyan)' }}>
                  <polygon
                    points="12,2 20,6 20,18 12,22 4,18 4,6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div>
                <h1 className="tldark-heading text-xl">
                  <span style={{ color: 'var(--text-primary)' }}>DEUS</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>VAULT</span>
                  <span style={{ color: 'var(--accent-neon-yellow)' }}>OS</span>
                </h1>
                <p className="text-xs tldark-text--muted">Professional Development Environment</p>
              </div>
            </div>

            {/* Current Section Info */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <div style={{ color: 'var(--accent-cyan)' }}>
                  {sections[currentSection].icon}
                </div>
                <div>
                  <div className="text-sm tldark-text font-semibold">
                    {sections[currentSection].title}
                  </div>
                  <div className="text-xs tldark-text--muted">
                    Section {currentSection + 1} of {sections.length}
                  </div>
                </div>
              </div>
              
              {/* Mobile indicator */}
              <div className="md:hidden">
                <div className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>
                  {currentSection + 1}/{sections.length}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Professional Navigation Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
            <div className="flex items-center gap-4">
              
              {/* Professional Control Panel */}
              <div className="flex items-center gap-2 tldark-glass-card px-6 py-4">
                
                {/* Reset to Home */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={resetToHome}
                  className="w-10 h-10 tldark-glass-button rounded-md flex items-center justify-center tldark-text--accent hover:scale-110 transition-all group"
                  title="Reset to Home (R)"
                >
                  <Home className="h-4 w-4" />
                </motion.button>

                {/* Previous */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSection}
                  className="w-12 h-12 tldark-glass-button rounded-lg flex items-center justify-center tldark-text--accent hover:scale-105 transition-all"
                  title="Previous Section (A/←)"
                >
                  <ArrowLeft className="h-5 w-5" />
                </motion.button>

                {/* Professional Section dots */}
                <div className="flex items-center gap-3 px-4">
                  {sections.map((section, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => navigateToSection(index)}
                      className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSection
                          ? 'shadow-lg'
                          : 'hover:opacity-75'
                      }`}
                      style={{ 
                        background: index === currentSection ? 'var(--accent-cyan)' : 'var(--glass-border)',
                        boxShadow: index === currentSection ? '0 0 20px var(--accent-cyan-glow)' : 'none'
                      }}
                      title={`${section.title} (${index + 1})`}
                    >
                      {index === currentSection && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 border-2 rounded-full animate-ping"
                          style={{ borderColor: 'var(--accent-cyan)' }}
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
                  className="w-12 h-12 tldark-glass-button rounded-lg flex items-center justify-center tldark-text--accent hover:scale-105 transition-all"
                  title="Next Section (D/→)"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

              </div>
              
            </div>
          </motion.div>

      {/* Professional Content Area */}
      <div className="relative z-20 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            {sections[currentSection].component}
          </motion.div>
        </AnimatePresence>
        
        {/* Professional Footer */}
        <ProfessionalFooter />
      </div>

      {/* Professional Side Navigation */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col gap-3">
          {sections.map((section, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentSection(index)}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{ 
                background: index === currentSection ? 'var(--accent-cyan)' : 'var(--glass-border)',
                boxShadow: index === currentSection ? '0 0 10px var(--accent-cyan-glow)' : 'none'
              }}
              title={section.title}
            />
          ))}
        </div>
      </div>

      {/* Professional Controls Help */}
      <div className="fixed bottom-6 right-6 z-30">
        <div className="tldark-glass-card p-3 text-xs">
          <div className="space-y-1 font-mono tldark-text--muted">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 tldark-glass-card rounded text-xs">A/D</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 tldark-glass-card rounded text-xs">R</kbd>
              <span>Reset</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}