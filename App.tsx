import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home, Zap, Users, Target, Map } from 'lucide-react';
import ThreeJSScene from './components/ThreeJSScene';
import { HexagonNavigation } from './components/HexagonNavigation';
import { SEOOptimizer, seoConfigs } from './components/SEOOptimizer';
import { BrandHeader } from './components/BrandHeader';
import { Footer } from './components/Footer';

// Import sections
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { MarketplaceSection } from './components/MarketplaceSection';
import { TherionSection } from './components/TherionSection_New';
import { CTASection } from './components/CTASection';

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const sections = [
    {
      id: 'hero',
      title: 'Autonomous Agent Platform',
      icon: <Home className="h-4 w-4" />,
      component: <HeroSection />
    },
    {
      id: 'features',
      title: 'Agent Capabilities',
      icon: <Zap className="h-4 w-4" />,
      component: <FeaturesSection />
    },
    {
      id: 'marketplace',
      title: 'Agent Templates',
      icon: <Map className="h-4 w-4" />,
      component: <MarketplaceSection />
    },
    {
      id: 'therion',
      title: 'DeusVault AGI',
      icon: <Target className="h-4 w-4" />,
      component: <TherionSection />
    },
    {
      id: 'pricing',
      title: 'Deploy Now',
      icon: <Users className="h-4 w-4" />,
      component: <CTASection />
    }
  ];

  const navigateToSection = (index: number) => {
    setCurrentSection(index);
  };

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key) {
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          nextSection();
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          prevSection();
          break;
        case 'Home':
          navigateToSection(0);
          break;
        case 'End':
          navigateToSection(sections.length - 1);
          break;
      }
    };

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      const threshold = 50;
      
      if (Math.abs(delta) > threshold) {
        if (delta > 0 && currentSection < sections.length - 1) {
          nextSection();
        } else if (delta < 0 && currentSection > 0) {
          prevSection();
        }
      }
    };

    // Mobile touch handling
    let touchStartY: number | null = null;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartY) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const threshold = 50;
      
      if (deltaY > threshold && currentSection < sections.length - 1) {
        nextSection();
      } else if (deltaY < -threshold && currentSection > 0) {
        prevSection();
      }
      
      touchStartY = null;
    };

    // Loading timer
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleScroll, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(loadingTimer);
    };
  }, [currentSection, sections.length]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">DeusVaultOS</h2>
          <p className="text-gray-400">Initializing Autonomous Agent Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* SEO Optimization */}
      <SEOOptimizer {...seoConfigs.home} />
      
      {/* 3D Background Scene - Enhanced visibility */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ThreeJSScene
          currentSection={currentSection}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* **BRAND HEADER WITH HOMEPAGE NAVIGATION** */}
      <BrandHeader 
        currentSection={currentSection}
        isSubpage={false}
        onReturnHome={() => setCurrentSection(0)}
      />

      {/* Immersive Navigation - Floating Island Design */}
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="bg-black/40 backdrop-blur-xl rounded-full border border-cyan-400/30 shadow-2xl shadow-cyan-500/20">
          <div className="flex items-center gap-1 py-3 px-6">
            
            {/* Previous */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSection}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-cyan-400/50"
              title="Previous Section (A/←)"
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.button>

            {/* Section dots */}
            <div className="flex items-center gap-2 px-3">
              {sections.map((section, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => navigateToSection(index)}
                  className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSection
                      ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  title={section.title}
                >
                  {/* Progress ring for current section */}
                  {index === currentSection && (
                    <motion.div
                      className="absolute inset-0 rounded-full border border-cyan-400"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSection}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-cyan-400/50"
              title="Next Section (D/→)"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.button>

          </div>
        </div>
      </motion.div>

      {/* Content Area - Proper Layout with Margins */}
      <div className="relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="page-section"
          >
            {sections[currentSection].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side Navigation Indicator - Hidden on Mobile/Tablet */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col gap-3">
          {sections.map((section, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => navigateToSection(index)}
              className={`w-3 h-8 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              title={section.title}
              aria-label={`Navigate to ${section.title}`}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20">
        <Footer />
      </div>

    </div>
  );
}

