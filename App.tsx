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
import LoadingScreenCyberpunk from './components/LoadingScreenCyberpunk';
import ThreeJSScene from './components/ThreeJSScene';

// Import accurate content components
import { AccurateCTASection } from "./components/AccurateCTASection";
import { AccurateHeroSection } from "./components/AccurateHeroSection";
import { AccuratePlatformFeatures } from "./components/AccuratePlatformFeatures";
import { ContactSection } from "./components/ContactSection";
import { FeaturesRoadmapSection } from "./components/FeaturesRoadmapSection";
import { Footer } from "./components/Footer";
import { SEOOptimizer, seoConfigs } from "./components/SEOOptimizer";
import { WebVitalsMonitor } from "./components/WebVitalsMonitor";
import { WhoIsThisForSection } from "./components/WhoIsThisForSection";

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

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

  // Auto-advance disabled per user request
  // useEffect(() => {
  //   if (reducedMotion) return;
  //   const interval = setInterval(() => {
  //     setCurrentSection((prev: number) => (prev + 1) % sections.length);
  //   }, 45000);
  //   return () => clearInterval(interval);
  // }, [reducedMotion, sections.length]);

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
    return <LoadingScreenCyberpunk onLoadingComplete={() => setIsLoading(false)} />;
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
          pageIndex={currentSection}
          currentSection={currentSection}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Minimal Header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-black/20 backdrop-blur-md border-b border-cyan-400/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full text-cyan-400">
                  <polygon
                    points="12,2 20,6 20,18 12,22 4,18 4,6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl text-white font-bold" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                  DEUSVAULT OS
                </h1>
                <p className="text-xs text-gray-300" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                  AI Platform & Operating System
                </p>
              </div>
            </div>

            {/* Section Info */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-cyan-400">
                {sections[currentSection].icon}
              </div>
              <span className="text-white font-medium" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
                {sections[currentSection].title}
              </span>
            </div>
          </div>
        </div>
      </div>

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

      {/* Content Area - Properly spaced for header */}
      <div className="relative z-20 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeInOut",
              opacity: { duration: 0.8 },
              y: { duration: 1.0 }
            }}
            className="min-h-screen"
          >
            {sections[currentSection].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side Navigation Indicator */}
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

      {/* Footer */}
      <div className="relative z-20">
        <Footer />
      </div>

    </div>
  );
};