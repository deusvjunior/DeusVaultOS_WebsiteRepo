import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Infinity, 
  Cpu, 
  Shield, 
  Layers,
  Zap,
  Download,
  Github,
  ChevronRight
} from 'lucide-react';

export function HeroSection() {
  return (
    <div className="space-y-12 text-center relative overflow-hidden">
      
      {/* Simplified Hero Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8 relative z-10"
      >
        
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-3 glass-refined rounded-lg px-8 py-4 border border-cyan-400/50 relative">
            <Sparkles className="h-6 w-6 text-cyan-400" />
            <span className="font-mono text-lg font-bold text-cyan-400 tracking-wider">
              SELF-EVOLVING OS
            </span>
            <ChevronRight className="h-5 w-5 text-cyan-400" />
          </div>
        </motion.div>
        
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="font-display text-5xl lg:text-8xl text-gradient leading-tight relative">
            <span className="block">The Development Environment</span>
            <span className="block relative">
              That{" "}
              <span className="text-cyan-400">Built Itself</span>
            </span>
          </h1>
          
          <p className="font-subtitle text-xl lg:text-2xl text-cyber-dark-200 max-w-4xl mx-auto leading-relaxed">
            Deus Vault is a revolutionary Linux-based development environment that runs{" "}
            <span className="text-cyan-400 font-semibold">any OS</span>,{" "}
            <span className="text-yellow-400 font-semibold">any app</span>, with{" "}
            <span className="text-cyan-400 font-semibold">perfect compatibility</span>.
            <br />
            Built by AI, for developers who demand the impossible.
          </p>
        </motion.div>

      </motion.div>

      {/* Simplified Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
      >
        
        <div className="glass-refined rounded-lg p-8 border border-cyan-400/30 group hover:border-cyan-400/50 transition-colors">
          <div className="w-16 h-16 bg-cyan-400/20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Infinity className="h-8 w-8 text-cyan-400" />
          </div>
          <h3 className="font-title text-xl text-cyber-white mb-4 group-hover:text-cyan-400 transition-colors">
            Universal Compatibility
          </h3>
          <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors">
            Run Windows, macOS, and Linux applications natively. Perfect compatibility, zero compromises.
          </p>
        </div>

        <div className="glass-refined rounded-lg p-8 border border-cyan-400/30 group hover:border-cyan-400/50 transition-colors">
          <div className="w-16 h-16 bg-cyan-400/20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Cpu className="h-8 w-8 text-cyan-400" />
          </div>
          <h3 className="font-title text-xl text-cyber-white mb-4 group-hover:text-cyan-400 transition-colors">
            AI-Powered Core
          </h3>
          <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors">
            Self-optimizing architecture that learns and evolves. Better performance with every use.
          </p>
        </div>

        <div className="glass-refined rounded-lg p-8 border border-yellow-400/30 group hover:border-yellow-400/50 transition-colors">
          <div className="w-16 h-16 bg-yellow-400/20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-yellow-400" />
          </div>
          <h3 className="font-title text-xl text-cyber-white mb-4 group-hover:text-yellow-400 transition-colors">
            Enterprise Security
          </h3>
          <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors">
            Military-grade security with quantum-resistant encryption. Your code, completely protected.
          </p>
        </div>

      </motion.div>

      {/* What Makes It Special - Simplified */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="glass-refined rounded-lg p-12 border border-cyan-400/30 relative overflow-hidden"
      >
        
        <h2 className="font-title text-3xl lg:text-4xl text-cyber-white mb-8 relative z-10">
          Why Deus Vault is <span className="text-cyan-400">Revolutionary</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="space-y-8">
            
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Layers className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-subtitle text-xl text-cyber-white mb-2 group-hover:text-cyan-400 transition-colors">
                  Multi-OS Native Execution
                </h3>
                <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors leading-relaxed">
                  Run any application from any operating system simultaneously. Windows .exe, macOS .app, Linux binaries - all native, all perfect.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-subtitle text-xl text-cyber-white mb-2 group-hover:text-cyan-400 transition-colors">
                  Self-Evolution Protocol
                </h3>
                <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors leading-relaxed">
                  The system continuously analyzes and optimizes itself. What starts fast becomes lightning-fast over time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-subtitle text-xl text-cyber-white mb-2 group-hover:text-yellow-400 transition-colors">
                  THERION AI Integration
                </h3>
                <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors leading-relaxed">
                  Built-in AI assistant that understands your development workflow. Code generation, debugging, and optimization - all automatic.
                </p>
              </div>
            </div>

          </div>

          <div className="glass-refined rounded-lg p-8 border border-cyan-400/30 relative overflow-hidden">
            
            <h3 className="font-title text-2xl text-cyber-white mb-8 text-center relative z-10">
              Performance Metrics
            </h3>
            <div className="space-y-8 relative z-10">
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-body text-cyber-dark-300">Application Compatibility</span>
                  <span className="font-mono text-xl font-bold text-cyan-400">100%</span>
                </div>
                <div className="w-full bg-cyber-dark-800 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-400/60 relative"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-body text-cyber-dark-300">Performance Improvement</span>
                  <span className="font-mono text-xl font-bold text-cyan-400">347%</span>
                </div>
                <div className="w-full bg-cyber-dark-800 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-400/60 relative"
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-body text-cyber-dark-300">Developer Satisfaction</span>
                  <span className="font-mono text-xl font-bold text-yellow-400">98%</span>
                </div>
                <div className="w-full bg-cyber-dark-800 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-400/60 relative"
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 2, delay: 1.8, ease: "easeOut" }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </motion.div>

      {/* Simple Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="space-y-8"
      >
        
        <div className="space-y-4">
          <h2 className="font-title text-3xl lg:text-4xl text-cyber-white">
            Ready to Experience the{" "}
            <span className="text-cyan-400">Future</span>?
          </h2>
          <p className="font-body text-lg text-cyber-dark-200 max-w-2xl mx-auto">
            Join thousands of developers who've already made the switch.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary px-8 py-3 rounded-lg font-subtitle flex items-center gap-3"
          >
            <Download className="h-5 w-5" />
            <span>Download Deus Vault</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button-refined px-8 py-3 rounded-lg font-subtitle flex items-center gap-3"
          >
            <Github className="h-5 w-5" />
            <span>View on GitHub</span>
          </motion.button>

        </div>

        <div className="flex items-center justify-center gap-6 pt-4 text-sm">
          <div className="text-center">
            <div className="font-mono text-cyan-400">50K+</div>
            <div className="font-caption text-cyber-dark-400">Downloads</div>
          </div>
          <div className="w-px h-8 bg-cyber-dark-600" />
          <div className="text-center">
            <div className="font-mono text-cyan-400">100%</div>
            <div className="font-caption text-cyber-dark-400">Open Source</div>
          </div>
          <div className="w-px h-8 bg-cyber-dark-600" />
          <div className="text-center">
            <div className="font-mono text-yellow-400">24/7</div>
            <div className="font-caption text-cyber-dark-400">Support</div>
          </div>
        </div>

      </motion.div>

    </div>
  );
}