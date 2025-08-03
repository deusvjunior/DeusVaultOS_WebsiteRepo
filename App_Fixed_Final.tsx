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
  // Loading and navigation state
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentSubpage, setCurrentSubpage] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userContext, setUserContext] = useState<'desktop' | 'mobile'>('desktop');
  
  // Adaptive engine integration
  const { userProfile, isLoading: adaptiveLoading, adaptContent } = useAdaptiveEngine();
  const adaptedContent = adaptContent('homepage');

  // Define sections with enhanced adaptivity
  const sections = [
    {
      id: 'hero',
      title: 'DeusVaultOS',
      icon: <Zap className="h-4 w-4" />,
      component: <HeroSection onNavigateToSubpage={handleNavigateToSubpage} />
    },
    {
      id: 'features',
      title: 'Features',
      icon: <Target className="h-4 w-4" />,
      component: <FeaturesSection />
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

  // Navigation handlers
  function handleNavigateToSubpage(subpage: string) {
    setCurrentSubpage(subpage);
  }

  function handleBackToMainSections() {
    setCurrentSubpage(null);
    setCurrentSection(0);
  }

  const nextSection = () => {
    setCurrentSection((prev: number) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev: number) => (prev - 1 + sections.length) % sections.length);
  };

  const navigateToSection = (index: number) => {
    setCurrentSection(index);
  };

  // Effects for initialization and event handling
  useEffect(() => {
    // Detect reduced motion preference
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
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          prevSection();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          nextSection();
          break;
        case 'Home':
          e.preventDefault();
          navigateToSection(0);
          break;
        case 'End':
          e.preventDefault();
          navigateToSection(sections.length - 1);
          break;
      }
    };

    // Touch handling for mobile gestures
    let touchStartY: number | null = null;
    let touchStartX: number | null = null;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (currentSubpage) return;
      
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
    }, 2500);

    // Detect user context for adaptive navigation
    const detectUserContext = () => {
      const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setUserContext(isMobile ? 'mobile' : 'desktop');
    };

    detectUserContext();
    window.addEventListener('resize', detectUserContext);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      clearTimeout(loadingTimer);
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', detectUserContext);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, currentSubpage]);

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <LoadingScreen
        progress={100}
        onComplete={() => setIsLoading(false)}
      />
    );
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

      {/* Brand Header with Homepage Navigation */}
      <BrandHeader 
        currentSection={currentSection}
        isSubpage={currentSubpage !== null}
        onReturnHome={() => {
          setCurrentSubpage(null);
          setCurrentSection(0);
        }}
      />

      {/* Main Navigation - Floating Island */}
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="bg-black/30 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3">
            
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSection}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-cyan-400/50"
              title="Previous Section"
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.button>

            {/* Section Dots */}
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

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSection}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-cyan-400/50"
              title="Next Section"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.button>

          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSubpage ? `subpage-${currentSubpage}` : `section-${currentSection}`}
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
              ) : null
            ) : (
              // Render main sections
              sections[currentSection]?.component
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer - Only show on main sections */}
        {!currentSubpage && (
          <div className="relative z-20">
            <Footer />
          </div>
        )}
      </div>

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

      {/* Vertical Progress Indicator - Desktop Only */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col gap-3">
          {sections.map((section, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => navigateToSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
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
