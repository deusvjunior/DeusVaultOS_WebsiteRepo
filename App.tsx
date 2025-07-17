import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Home,
    Users,
    Zap,
    Target,
    Map,
    MessageCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import ThreeJSScene from './components/ThreeJSScene';

// Import accurate content components
import { AccurateHeroSection } from "./components/AccurateHeroSection";
import { AccuratePlatformFeatures } from "./components/AccuratePlatformFeatures";
import { AccurateCTASection } from "./components/AccurateCTASection";
import { WhoIsThisForSection } from "./components/WhoIsThisForSection";
import { FeaturesRoadmapSection } from "./components/FeaturesRoadmapSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { SEOOptimizer, seoConfigs } from "./components/SEOOptimizer";
import { WebVitalsMonitor } from "./components/WebVitalsMonitor";
import { GameControls } from "./components/GameControls";

interface BlobControls {
  movementSpeed: number;
  randomDirectionFactor: number;
  randomSizeFactor: number;
  eyeSizeMin: number;
  eyeSizeMax: number;
  blobSizeMin: number;
  blobSizeMax: number;
  verticalityFactor: number;
  jiggleIntensity: number;
  avoidanceDistance: number;
  emergenceRate: number;
  rotationSpeed: number;
}

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [observerMode, setObserverMode] = useState(false);
  const [blobControls, setBlobControls] = useState<BlobControls>({
    movementSpeed: 1.0,
    randomDirectionFactor: 1.0,
    randomSizeFactor: 1.0,
    eyeSizeMin: 0.1,
    eyeSizeMax: 0.2,
    blobSizeMin: 0.8,
    blobSizeMax: 1.5,
    verticalityFactor: 1.0,
    jiggleIntensity: 1.0,
    avoidanceDistance: 2.0,
    emergenceRate: 1.0,
    rotationSpeed: 1.0
  });

  const sections = [
    {
      id: 'hero',
      title: 'DeusVault OS Platform',
      icon: <Home className="h-4 w-4" />,
      component: <AccurateHeroSection />
    },
    {
      id: 'who-is-this-for',
      title: 'Who Is This For',
      icon: <Target className="h-4 w-4" />,
      component: <WhoIsThisForSection />
    },
    {
      id: 'platform',
      title: 'Platform Features',
      icon: <Zap className="h-4 w-4" />,
      component: <AccuratePlatformFeatures />
    },
    {
      id: 'features-roadmap',
      title: 'Features & Roadmap',
      icon: <Map className="h-4 w-4" />,
      component: <FeaturesRoadmapSection />
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: <MessageCircle className="h-4 w-4" />,
      component: <ContactSection />
    },
    {
      id: 'cta',
      title: 'Join Community',
      icon: <Users className="h-4 w-4" />,
      component: <AccurateCTASection />
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
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* SEO Optimization */}
      <SEOOptimizer {...seoConfigs.home} />
      
      {/* Web Vitals Monitoring */}
      <WebVitalsMonitor enableReporting={true} />
      
      {/* 3D Background Scene - Enhanced visibility */}
      <div className="fixed inset-0 z-0">
        <ThreeJSScene
          currentSection={currentSection}
          reducedMotion={reducedMotion}
          blobControls={blobControls}
        />
      </div>

      {/* Minimal Header */}
            {/* Minimal Header */}
      {!observerMode && (
        <div className="fixed top-0 left-0 w-full z-40 bg-black/20 backdrop-blur-sm border-b border-cyan-400/20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-yellow-400 rounded-lg"></div>
              <span className="text-cyan-400 font-bold text-lg">DeusVault OS</span>
            </div>
            <div className="text-cyan-400 text-sm opacity-80">
              {sections[currentSection].title}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-4">
            
            {/* Previous */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSection}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-cyan-400 hover:text-white transition-colors border border-white/20"
              title="Previous Section (A/←)"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>

            {/* Section dots */}
            <div className="flex items-center gap-3 px-4">
              {sections.map((section, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => navigateToSection(index)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSection
                      ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  title={`${section.title} (${index + 1})`}
                >
                  {index === currentSection && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-ping"
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
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-cyan-400 hover:text-white transition-colors border border-white/20"
              title="Next Section (D/→)"
            >
              <ArrowRight className="h-5 w-5" />
            </motion.button>

          </div>
        </div>
      </motion.div>

      {/* Content Area - Much more transparent */}
      {!observerMode && (
        <div className="relative z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {sections[currentSection].component}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Side Navigation Indicator */}
      {!observerMode && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
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
      )}

      {/* Footer */}
      {!observerMode && (
        <div className="relative z-20">
          <Footer />
        </div>
      )}

      {/* Game Controls - Always visible but conditionally hidden in observer mode */}
      {!observerMode && (
        <GameControls
          currentSection={currentSection}
          totalSections={sections.length}
          onSectionChange={setCurrentSection}
          isTransitioning={false}
          onObserverModeChange={setObserverMode}
          onBlobControlsChange={setBlobControls}
        />
      )}

    </div>
  );
};