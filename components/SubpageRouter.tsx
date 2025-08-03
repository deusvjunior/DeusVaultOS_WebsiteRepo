import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';
import { SubpageSceneManager } from './SubpageSceneManager';

interface SubpageRouterProps {
  currentSection: number;
  reducedMotion: boolean;
}

export function SubpageRouter({ currentSection, reducedMotion }: SubpageRouterProps) {
  const [currentSubpage, setCurrentSubpage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string>('hero');

  // Track the main section for scene context
  const sectionIds = ['hero', 'features', 'marketplace', 'user-segments', 'therion', 'cta'];
  const currentMainPage = sectionIds[currentSection] || 'hero';

  // Generate subpage ID for 3D scene context
  const getSceneContext = () => {
    if (!currentSubpage) return currentMainPage;
    return `${currentMainPage}-${currentSubpage}`;
  };

  const navigateToSubpage = (subpageId: string) => {
    setPreviousPage(currentMainPage);
    setCurrentSubpage(subpageId);
  };

  const navigateBack = () => {
    setCurrentSubpage(null);
  };

  // Subpage definitions with 3D scene contexts
  const subpageConfigs = {
    marketplace: {
      'agents': {
        title: 'AI Agent Gallery',
        sceneContext: 'marketplace-agents',
        content: <AgentGallerySubpage />,
        description: 'Browse our collection of specialized AI agents'
      },
      'templates': {
        title: 'Solution Templates',
        sceneContext: 'marketplace-templates',
        content: <TemplatesSubpage />,
        description: 'Ready-to-use business automation templates'
      },
      'enterprise': {
        title: 'Enterprise Solutions',
        sceneContext: 'marketplace-enterprise',
        content: <EnterpriseSubpage />,
        description: 'Custom AI solutions for large organizations'
      }
    },
    features: {
      'ai-engine': {
        title: 'AI Engine Core',
        sceneContext: 'features-ai-engine',
        content: <AIEngineSubpage />,
        description: 'Deep dive into our consciousness-driven AI system'
      },
      'development': {
        title: 'Development Tools',
        sceneContext: 'features-development',
        content: <DevelopmentSubpage />,
        description: 'Professional development environment features'
      },
      'deployment': {
        title: 'Cloud Deployment',
        sceneContext: 'features-deployment',
        content: <DeploymentSubpage />,
        description: 'Scale your AI solutions across cloud infrastructure'
      }
    }
  };

  return (
    <>
      {/* ENHANCED 3D BACKGROUND WITH SUBPAGE TRANSITIONS */}
      <SubpageSceneManager
        currentPage={getSceneContext()}
        currentSection={currentSection}
        reducedMotion={reducedMotion}
      />

      {/* SUBPAGE OVERLAY SYSTEM */}
      <AnimatePresence mode="wait">
        {currentSubpage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          >
            <div className="relative h-full overflow-y-auto">
              {/* Subpage Header */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="sticky top-0 z-60 bg-black/90 backdrop-blur-xl border-b border-cyan-400/20"
              >
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={navigateBack}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ArrowLeft className="h-5 w-5" />
                      Back to {currentMainPage}
                    </button>
                    <div className="h-6 w-px bg-cyan-400/30"></div>
                    <h1 className="text-xl font-bold text-white">
                      {subpageConfigs[currentMainPage as keyof typeof subpageConfigs]?.[currentSubpage]?.title || 'Subpage'}
                    </h1>
                  </div>
                  <button
                    onClick={navigateBack}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </motion.div>

              {/* Subpage Content */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="max-w-6xl mx-auto px-6 py-8"
              >
                {subpageConfigs[currentMainPage as keyof typeof subpageConfigs]?.[currentSubpage]?.content || (
                  <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {subpageConfigs[currentMainPage as keyof typeof subpageConfigs]?.[currentSubpage]?.title || 'Content Loading...'}
                    </h2>
                    <p className="text-gray-400">
                      {subpageConfigs[currentMainPage as keyof typeof subpageConfigs]?.[currentSubpage]?.description || 'Please wait while we load the content.'}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Subpage Components (placeholders for now)
function AgentGallerySubpage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">AI Agent Gallery</h2>
        <p className="text-xl text-gray-300 mb-8">Choose from our collection of specialized AI agents</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Marketing Assistant', description: 'Automates content creation and social media management' },
          { name: 'Data Analyst', description: 'Processes complex datasets and generates insights' },
          { name: 'Customer Support', description: '24/7 intelligent customer service automation' },
          { name: 'Sales Optimizer', description: 'Optimizes sales funnels and lead conversion' },
          { name: 'Financial Advisor', description: 'Provides investment insights and financial planning' },
          { name: 'HR Assistant', description: 'Streamlines recruitment and employee management' }
        ].map((agent, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-black/40 border border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/40 transition-colors"
          >
            <h3 className="text-xl font-bold text-white mb-3">{agent.name}</h3>
            <p className="text-gray-400 mb-4">{agent.description}</p>
            <button className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500/30 transition-colors">
              Learn More
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TemplatesSubpage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Solution Templates</h2>
        <p className="text-xl text-gray-300 mb-8">Ready-to-deploy business automation solutions</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { name: 'E-commerce Automation', description: 'Complete store management with AI' },
          { name: 'Content Creation Pipeline', description: 'Automated content generation and publishing' },
          { name: 'Financial Dashboard', description: 'Real-time financial monitoring and alerts' },
          { name: 'Project Management Suite', description: 'AI-powered project tracking and optimization' }
        ].map((template, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-black/40 border border-yellow-400/20 rounded-xl p-8 hover:border-yellow-400/40 transition-colors"
          >
            <h3 className="text-2xl font-bold text-white mb-4">{template.name}</h3>
            <p className="text-gray-400 mb-6">{template.description}</p>
            <button className="bg-yellow-500/20 text-yellow-400 px-6 py-3 rounded-lg hover:bg-yellow-500/30 transition-colors">
              Deploy Template
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EnterpriseSubpage() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Enterprise Solutions</h2>
        <p className="text-xl text-gray-300 mb-8">Custom AI implementations for large organizations</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Scale AI Across Your Organization</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              Custom AI agent development for your specific needs
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              Enterprise-grade security and compliance
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              24/7 dedicated support and maintenance
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              Integration with existing enterprise systems
            </li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-black/40 border border-cyan-400/20 rounded-xl p-8"
        >
          <h4 className="text-xl font-bold text-white mb-4">Get Started</h4>
          <p className="text-gray-400 mb-6">Contact our enterprise team for a custom solution consultation.</p>
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors">
            Schedule Consultation
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function AIEngineSubpage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">AI Engine Core</h2>
        <p className="text-xl text-gray-300 mb-8">The consciousness-driven intelligence behind DeusVaultOS</p>
      </div>
    </div>
  );
}

function DevelopmentSubpage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Development Tools</h2>
        <p className="text-xl text-gray-300 mb-8">Professional development environment features</p>
      </div>
    </div>
  );
}

function DeploymentSubpage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Cloud Deployment</h2>
        <p className="text-xl text-gray-300 mb-8">Scale your AI solutions across cloud infrastructure</p>
      </div>
    </div>
  );
}
