import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download, Book, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'download' | 'docs' | 'demo' | 'enterprise' | 'marketplace';
}

export function InfoModal({ isOpen, onClose, type }: InfoModalProps) {
  const modalContent = {
    download: {
      title: "Download DeusVaultOS",
      description: "Ready to experience the future of development?",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            DeusVaultOS is currently in active development. Get access to:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center"><Download className="h-4 w-4 mr-2 text-cyan-400" /> Beta version access</li>
            <li className="flex items-center"><Book className="h-4 w-4 mr-2 text-cyan-400" /> Developer documentation</li>
            <li className="flex items-center"><ExternalLink className="h-4 w-4 mr-2 text-cyan-400" /> Source code repository</li>
          </ul>
          <Button 
            className="w-full bg-gradient-to-r from-cyan-600 to-green-600 text-white"
            onClick={() => window.open('https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo/releases', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Releases on GitHub
          </Button>
        </div>
      )
    },
    docs: {
      title: "Documentation",
      description: "Learn how to master DeusVaultOS development",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Documentation is currently being developed. Available resources:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center"><Book className="h-4 w-4 mr-2 text-cyan-400" /> Getting started guide</li>
            <li className="flex items-center"><Book className="h-4 w-4 mr-2 text-cyan-400" /> API reference</li>
            <li className="flex items-center"><Book className="h-4 w-4 mr-2 text-cyan-400" /> Community examples</li>
          </ul>
          <Button 
            className="w-full bg-gradient-to-r from-cyan-600 to-green-600 text-white"
            onClick={() => window.open('https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Repository
          </Button>
        </div>
      )
    },
    demo: {
      title: "Interactive Demo",
      description: "Experience DeusVaultOS in action",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            A live interactive demo is coming soon! For now:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center"><Download className="h-4 w-4 mr-2 text-cyan-400" /> Download the beta version</li>
            <li className="flex items-center"><Book className="h-4 w-4 mr-2 text-cyan-400" /> Follow setup instructions</li>
            <li className="flex items-center"><ExternalLink className="h-4 w-4 mr-2 text-cyan-400" /> Join our community</li>
          </ul>
          <Button 
            className="w-full bg-gradient-to-r from-cyan-600 to-green-600 text-white"
            onClick={() => window.open('https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Get Started on GitHub
          </Button>
        </div>
      )
    },
    enterprise: {
      title: "Enterprise Solutions",
      description: "Scale your development team with DeusVaultOS",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Enterprise features are in development. Contact us for:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-cyan-400" /> Early access program</li>
            <li className="flex items-center"><Book className="h-4 w-4 mr-2 text-cyan-400" /> Custom integrations</li>
            <li className="flex items-center"><ExternalLink className="h-4 w-4 mr-2 text-cyan-400" /> Enterprise support</li>
          </ul>
          <Button 
            className="w-full bg-gradient-to-r from-cyan-600 to-green-600 text-white"
            onClick={() => window.open('https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo/discussions', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Contact on GitHub
          </Button>
        </div>
      )
    },
    marketplace: {
      title: "DeusVault Marketplace",
      description: "Plugins, templates, and extensions",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The marketplace will feature:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center"><Download className="h-4 w-4 mr-2 text-cyan-400" /> Development plugins</li>
            <li className="flex items-center"><Book className="h-4 w-4 mr-2 text-cyan-400" /> Project templates</li>
            <li className="flex items-center"><ExternalLink className="h-4 w-4 mr-2 text-cyan-400" /> Community extensions</li>
          </ul>
          <Button 
            className="w-full bg-gradient-to-r from-cyan-600 to-green-600 text-white"
            onClick={() => window.open('https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Follow Development
          </Button>
        </div>
      )
    }
  };

  const content = modalContent[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <Card className="bg-gray-900/95 backdrop-blur-md border-gray-600/30">
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl text-white mb-2">{content.title}</h3>
                    <p className="text-gray-400">{content.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white hover:bg-gray-700/50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Content */}
                {content.content}

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-600/30">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full border-gray-600/50 text-gray-300 hover:bg-gray-700/50"
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
