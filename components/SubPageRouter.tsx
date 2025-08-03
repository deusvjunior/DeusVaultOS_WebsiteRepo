import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Main sections
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { UserSegments } from './UserSegments';
import { TherionSection } from './TherionSection_New';
import { MarketplaceSection } from './MarketplaceSection';
import { CTASection } from './CTASection';

// Subpages
import { DocumentationPage } from './DocumentationPage';
import { DownloadPage } from './DownloadPage';
import { EnterprisePage } from './EnterprisePage';

interface SubPageRouterProps {
  currentSection: number;
  onNavigateToSubpage: (subpage: string) => void;
  onBackToMainSections: () => void;
  currentSubpage: string | null;
}

export function SubPageRouter({ 
  currentSection, 
  onNavigateToSubpage, 
  onBackToMainSections, 
  currentSubpage 
}: SubPageRouterProps) {
  
  const mainSections = [
    {
      id: 'hero',
      component: <HeroSection onNavigateToSubpage={onNavigateToSubpage} />
    },
    {
      id: 'features',
      component: <FeaturesSection onNavigateToSubpage={onNavigateToSubpage} />
    },
    {
      id: 'user-segments',
      component: <UserSegments onNavigateToSubpage={onNavigateToSubpage} />
    },
    {
      id: 'therion',
      component: <TherionSection onNavigateToSubpage={onNavigateToSubpage} />
    },
    {
      id: 'marketplace',
      component: <MarketplaceSection onNavigateToSubpage={onNavigateToSubpage} />
    },
    {
      id: 'cta',
      component: <CTASection onNavigateToSubpage={onNavigateToSubpage} />
    }
  ];

  const subPages = {
    'documentation': <DocumentationPage onBack={onBackToMainSections} />,
    'download': <DownloadPage onBack={onBackToMainSections} />,
    'enterprise': <EnterprisePage onBack={onBackToMainSections} />,
    'marketplace-apps': <MarketplaceSection onNavigateToSubpage={onNavigateToSubpage} onBack={onBackToMainSections} />,
    'features-ai': <FeaturesSection onNavigateToSubpage={onNavigateToSubpage} onBack={onBackToMainSections} />,
    'therion-studio': <TherionSection onNavigateToSubpage={onNavigateToSubpage} onBack={onBackToMainSections} />
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSubpage || currentSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="page-section"
      >
        {currentSubpage ? (
          subPages[currentSubpage as keyof typeof subPages] || mainSections[currentSection].component
        ) : (
          mainSections[currentSection].component
        )}
      </motion.div>
    </AnimatePresence>
  );
}
