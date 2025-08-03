import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Home,
    Map,
    MessageCircle,
    Target,
    Users,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import ThreeJSScene from './components/ThreeJSScene';

// Import main sections for final site
import { CTASection } from "./components/CTASection";
import { FeaturesSection } from "./components/FeaturesSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { MarketplaceSection } from "./components/MarketplaceSection";
import { SEOOptimizer, seoConfigs } from "./components/SEOOptimizer";
import { TherionSection } from "./components/TherionSection_New";
import { UserSegments } from "./components/UserSegments";

// Import subpage components
import { DocumentationPage } from "./components/DocumentationPage";
import { DownloadPage } from "./components/DownloadPage";
import { EnterprisePage } from "./components/EnterprisePage";

// Import adaptive engine and components
import { useAdaptiveEngine } from "./components/AdaptiveEngine";
import AdaptiveMobileNav from "./components/AdaptiveMobileNav";
import PersonalizationBanner from "./components/PersonalizationBanner";
import { BrandHeader } from "./components/BrandHeader";

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [currentSubpage, setCurrentSubpage] = useState<string | null>(null);

  // Adaptive Intelligence System
  const { userContext, adaptedContent, trackInteraction, getRecommendedSections } = useAdaptiveEngine();

  // Navigation functions with tracking
  const handleNavigateToSubpage = (subpage: string) => {
    setCurrentSubpage(subpage);
    trackInteraction(`navigate_to_${subpage}`);
  };

  const handleBackToMainSections = () => {
    setCurrentSubpage(null);
    trackInteraction('back_to_main');
  };

  // Adaptive section ordering
  const recommendedSectionOrder = getRecommendedSections();
  
  const sections = [
    {
      id: 'hero',
      title: 'DeusVault OS Platform',
      icon: <Home className="h-4 w-4" />,
      component: <HeroSection 
        onNavigateToSubpage={handleNavigateToSubpage} 
        adaptedContent={adaptedContent}
        userContext={userContext}
      />
    },
    {
      id: 'features',
      title: 'Core Features',
      icon: <Zap className="h-4 w-4" />,
      component: <FeaturesSection 
        onNavigateToSubpage={handleNavigateToSubpage}
        userContext={userContext}
      />
    },
    {
      id: 'user-segments',
      title: 'Who Uses DeusVaultOS',
      icon: <Users className="h-4 w-4" />,
      component: <UserSegments />
    },
    {
      id: 'therion',
      title: 'THERION AI',
      icon: <Target className="h-4 w-4" />,
      component: <TherionSection />
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      icon: <Map className="h-4 w-4" />,
      component: <MarketplaceSection onNavigateToSubpage={handleNavigateToSubpage} />
    },
    {
      id: 'cta',
      title: 'Get Started',
      icon: <MessageCircle className="h-4 w-4" />,
      component: <CTASection onNavigateToSubpage={handleNavigateToSubpage} />
    }
  ];

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Enhanced keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentSubpage) return; // Don't interfere with subpage navigation
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          prevSection();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          nextSection();
          break;
        case 'Home':
          navigateToSection(0);
          break;
        case 'End':
          navigateToSection(sections.length - 1);
          break;
        case 'Escape':
          if (currentSubpage) handleBackToMainSections();
          break;
      }
    };

    // Enhanced mobile touch gesture handling
    let touchStartY: number | null = null;
    let touchStartX: number | null = null;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (currentSubpage) return; // Don't interfere with subpage touch
      
      const touch = e.touches[0];
      touchStartY = touch.clientY;
      touchStartX = touch.clientX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (currentSubpage || !touchStartY || !touchStartX) return;
      
      const touch = e.changedTouches[0];
      const deltaY = touch.clientY - touchStartY;
      const deltaX = touch.clientX - touchStartX;
      
      const threshold = 50;
      const isVerticalSwipe = Math.abs(deltaY) > Math.abs(deltaX);
      
      if (isVerticalSwipe) {
        if (deltaY > threshold && currentSection > 0) {
          prevSection();
        } else if (deltaY < -threshold && currentSection < sections.length - 1) {
          nextSection();
        }
      } else {
        if (deltaX > threshold && currentSection > 0) {
          prevSection();
        } else if (deltaX < -threshold && currentSection < sections.length - 1) {
          nextSection();
        }
      }
      
      touchStartY = null;
      touchStartX = null;
    };

    // Enhanced scroll handling with mobile optimization
    const handleScroll = (e: WheelEvent) => {
      if (currentSubpage) return; // Don't interfere with subpage scrolling
      
      e.preventDefault();
      
      const threshold = 50;
      
      if (e.deltaY > threshold && currentSection < sections.length - 1) {
        nextSection();
      } else if (e.deltaY < -threshold && currentSection > 0) {
        prevSection();
      }
    };

    // Loading timer
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Event listeners
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
  }, [currentSection, sections.length, currentSubpage]);

  // Auto-scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

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
          setCurrentSection((prev: number) => (prev - 1 + sections.length) % sections.length);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          setCurrentSection((prev: number) => (prev + 1) % sections.length);
          break;
        case ' ':
          e.preventDefault();
          setCurrentSection((prev: number) => (prev + 1) % sections.length);
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSection(0);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSection(sections.length - 1);
          break;
        case 'o':
        case 'O':
          // Removed observer mode functionality
          break;
        case 'Escape':
          // Removed observer mode functionality
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sections.length]);

  // Auto-advance sections disabled per user request
  /*
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setCurrentSection((prev: number) => (prev + 1) % sections.length);
    }, 20000); // 20 seconds per section

    return () => clearInterval(interval);
  }, [reducedMotion, sections.length]);
  */

  const nextSection = () => {
    setCurrentSection((prev: number) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev: number) => (prev - 1 + sections.length) % sections.length);
  };

  const navigateToSection = (index: number) => {
    setCurrentSection(index);
  };

  if (isLoading) {
    return (
      <LoadingScreen 
        onLoadingComplete={() => setIsLoading(false)} 
        userContext={userContext}
        adaptedContent={adaptedContent}
      />
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
        isSubpage={currentSubpage !== null}
        onReturnHome={() => {
          setCurrentSubpage(null);
          setCurrentSection(0);
        }}
      />

          {/* Navigation - Floating Island Design */}
          <motion.div
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-black/30 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3">
                
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
                {currentSubpage ? (
                  // Render subpages
                  currentSubpage === 'documentation' ? (
                    <DocumentationPage onBack={handleBackToMainSections} />
                  ) : currentSubpage === 'download' ? (
                    <DownloadPage onBack={handleBackToMainSections} />
                  ) : currentSubpage === 'enterprise' ? (
                    <EnterprisePage onBack={handleBackToMainSections} />
                  ) : (
                    sections[currentSection].component
                  )
                ) : (
                  sections[currentSection].component
                )}
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
      </div>

      {/* 3D Scene Background */}
      <ThreeJSScene currentSection={currentSection} reducedMotion={reducedMotion} />
      
      {/* SEO */}
      <SEOOptimizer
        title="DeusVaultOS - Ultimate Development Environment"
        description="Professional development environment with AI assistance"
        keywords={[]}
      />

      {/* Adaptive Mobile Navigation */}
      <AdaptiveMobileNav
        currentSection={currentSection}
        sections={sections}
        onNavigateToSection={navigateToSection}
        userContext={userContext}
      />

      {/* Personalization Banner */}
      <PersonalizationBanner 
        userContext={userContext}
        adaptedContent={adaptedContent}
      />

      {/* Single Navigation - Compact Floating Island - Hidden on Mobile */}
      <motion.div
        className="hidden lg:flex fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30"
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

      {/* Content Area with Mobile-Optimized Margins */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8">
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

      {/* Side Navigation Indicator - Hidden on Mobile */}
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
            />
          ))}
        </div>
      </div>

    </div>
  );
};