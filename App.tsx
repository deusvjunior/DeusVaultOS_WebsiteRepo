import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home, Map, Target, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThreeJSScene from './components/ThreeJSScene';

// Import sections
import { BrandHeader } from './components/BrandHeader';
import { ContactPage } from './components/ContactPage';
import { CTASection } from './components/CTASection';
import { DemoPage } from './components/DemoPage';
import { DocumentationPage } from './components/DocumentationPage';
import { DownloadPage } from './components/DownloadPage';
import { EnterprisePage } from './components/EnterprisePage';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LearnMorePage } from './components/LearnMorePage';
import { MarketplaceSection } from './components/MarketplaceSection';
import { SEOOptimizer, seoConfigs } from './components/SEOOptimizer';
import { TherionSection } from './components/TherionSection_New';

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [currentSubpage, setCurrentSubpage] = useState<string | null>(null);

  const handleNavigateToSubpage = (subpage: string) => {
    setCurrentSubpage(subpage);
  };

  const handleReturnHome = () => {
    setCurrentSubpage(null);
  };

  const sections = [
    {
      id: 'hero',
      title: 'DeusVaultOS',
      icon: <Home className="h-4 w-4" />,
      component: <HeroSection onNavigateToSubpage={handleNavigateToSubpage} />
    },
    {
      id: 'features',
      title: 'Features',
      icon: <Zap className="h-4 w-4" />,
      component: <FeaturesSection />
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      icon: <Map className="h-4 w-4" />,
      component: <MarketplaceSection />
    },
    {
      id: 'therion',
      title: 'THERION AI',
      icon: <Target className="h-4 w-4" />,
      component: <TherionSection />
    },
    {
      id: 'cta',
      title: 'Get Started',
      icon: <Users className="h-4 w-4" />,
      component: <CTASection onNavigateToSubpage={handleNavigateToSubpage} />
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
    // Auto-scroll to top on section change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSection]);

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
      // Allow normal scrolling within sections - only change sections at scroll boundaries
      const target = e.target as Element;
      const isAtTop = window.scrollY === 0;
      const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10;
      
      // Only prevent default and change sections if we're at scroll boundaries
      if ((e.deltaY > 0 && isAtBottom && currentSection < sections.length - 1) ||
          (e.deltaY < 0 && isAtTop && currentSection > 0)) {
        e.preventDefault();
        const threshold = 50;
        
        if (Math.abs(e.deltaY) > threshold) {
          if (e.deltaY > 0 && currentSection < sections.length - 1) {
            nextSection();
          } else if (e.deltaY < 0 && currentSection > 0) {
            prevSection();
          }
        }
      }
    };

    // Mobile touch handling - improved for better UX
    let touchStartY: number | null = null;
    let touchStartTime: number | null = null;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartY || !touchStartTime) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const deltaY = touchStartY - touchEndY;
      const deltaTime = touchEndTime - touchStartTime;
      const threshold = 80; // Increased threshold for less sensitivity
      const maxTime = 800; // Maximum time for gesture recognition
      
      // Only trigger if gesture is fast enough and within time limit
      if (deltaTime < maxTime && Math.abs(deltaY) > threshold) {
        const isAtTop = window.scrollY === 0;
        const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10;
        
        // Only change sections at scroll boundaries
        if ((deltaY > 0 && isAtBottom && currentSection < sections.length - 1) ||
            (deltaY < 0 && isAtTop && currentSection > 0)) {
          if (deltaY > 0) {
            nextSection();
          } else {
            prevSection();
          }
        }
      }
      
      touchStartY = null;
      touchStartTime = null;
    };

    // Loading timer
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

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
          <p className="text-gray-400">Initializing AI Agent Platform...</p>
        </div>
      </div>
    );
  }

  // Handle subpage navigation
  if (currentSubpage) {
    switch (currentSubpage) {
      case 'demo':
        return <DemoPage onBack={handleReturnHome} />;
      case 'download':
        return <DownloadPage onBack={handleReturnHome} />;
      default:
        return <DemoPage onBack={handleReturnHome} />;
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* SEO Optimization */}
      <SEOOptimizer {...seoConfigs.home} />
      
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ThreeJSScene
          currentSection={currentSection}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Brand Header */}
      <BrandHeader 
        currentSection={currentSection}
        isSubpage={false}
        onReturnHome={() => setCurrentSection(0)}
      />

      {/* Main Navigation - Improved Mobile Responsiveness */}
      <motion.div
        className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-sm sm:max-w-none px-4 sm:px-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="bg-black/40 backdrop-blur-xl rounded-full border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 mx-auto w-fit">
          <div className="flex items-center gap-1 sm:gap-1 py-2 sm:py-3 px-4 sm:px-6">
            
            {/* Previous */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSection}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-cyan-400/50"
              title="Previous Section (A/←)"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </motion.button>

            {/* Section dots */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3">
              {sections.map((section, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => navigateToSection(index)}
                  className={`relative w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
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
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-cyan-400/50"
              title="Next Section (D/→)"
            >
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </motion.button>

          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="relative z-20">
        <AnimatePresence mode="wait">
          {currentSubpage ? (
            <motion.div
              key={currentSubpage}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
            >
              {currentSubpage === 'demo' && <DemoPage onBack={handleReturnHome} />}
              {currentSubpage === 'download' && <DownloadPage onBack={handleReturnHome} />}
              {currentSubpage === 'documentation' && <DocumentationPage onBack={handleReturnHome} />}
              {currentSubpage === 'enterprise' && <EnterprisePage onBack={handleReturnHome} />}
              {currentSubpage === 'contact' && <ContactPage onBack={handleReturnHome} />}
              {currentSubpage === 'learn-more' && <LearnMorePage onBack={handleReturnHome} />}
            </motion.div>
          ) : (
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
          )}
        </AnimatePresence>
      </div>

      {/* Side Navigation Indicator - Only show on main sections */}
      {!currentSubpage && (
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
      )}

      {/* Footer - Only show on main sections */}
      {!currentSubpage && (
        <div className="relative z-20">
          <Footer onNavigateToSubpage={handleNavigateToSubpage} />
        </div>
      )}

    </div>
  );
}