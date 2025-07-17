import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import { DownloadPage } from "./DownloadPage";
import { DocumentationPage } from "./DocumentationPage";
import { EnterprisePage } from "./EnterprisePage";

// Main site components (when we're on home)
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { OSShowcase } from "./OSShowcase";
import { ComparisonSection } from "./ComparisonSection";
import { TherionSection } from "./TherionSection";
import { MarketplaceSection } from "./MarketplaceSection";
import { Footer } from "./Footer";
import { InternalNavigation } from "./InternalNavigation";
import ThreeJSScene from "./ThreeJSScene";
import { CTASection } from "./CTASection";
import { EnterpriseSection } from "./EnterpriseSection";

export type PageType = 'home' | 'download' | 'documentation' | 'enterprise';

export function PageRouter() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const navigateToPage = (page: PageType) => {
    setCurrentPage(page);
  };

  const navigateHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="relative">
      {/* Global Navigation - Always Visible */}
      <InternalNavigation onNavigate={navigateToPage} currentPage={currentPage} />
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative min-h-screen">
              {/* Three.js Background Scene */}
              <div className="fixed inset-0 z-0">
                <ThreeJSScene currentSection={0} />
              </div>
              
              {/* Main Content */}
              <div className="relative z-10 pt-20">
                <HeroSection />
                <FeaturesSection />
                <OSShowcase />
                <ComparisonSection />
                <TherionSection />
                <MarketplaceSection />
                <EnterpriseSection />
                <CTASection />
                <Footer />
              </div>
            </div>
          </motion.div>
        )}

        {currentPage === 'download' && (
          <motion.div
            key="download"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <DownloadPage onNavigateBack={navigateHome} />
          </motion.div>
        )}

        {currentPage === 'documentation' && (
          <motion.div
            key="documentation"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <DocumentationPage onNavigateBack={navigateHome} />
          </motion.div>
        )}

        {currentPage === 'enterprise' && (
          <motion.div
            key="enterprise"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <EnterprisePage onNavigateBack={navigateHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
