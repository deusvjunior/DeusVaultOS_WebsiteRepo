import { motion } from 'framer-motion';
import {
    ChevronRight,
    Cpu,
    Download,
    Github,
    Infinity,
    Layers,
    Shield,
    Sparkles,
    Zap
} from 'lucide-react';
import ReadableContainer from './ReadableContainer';

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
          <div className="inline-flex items-center gap-3 glass-refined rounded-lg px-8 py-4 border border-cyber-cyan/50 relative">
            <Sparkles className="h-6 w-6 text-cyber-cyan" />
            <span className="font-mono text-lg font-bold text-cyber-cyan tracking-wider">
              AI-POWERED CREATIVITY
            </span>
            <ChevronRight className="h-5 w-5 text-cyber-cyan" />
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
            <span className="block">The Creative Environment</span>
            <span className="block relative">
              That{" "}
              <span className="text-cyber-cyan">Evolves With You</span>
            </span>
          </h1>
          
          <ReadableContainer transparency="medium" className="max-w-4xl mx-auto">
            <p className="font-subtitle text-xl lg:text-2xl text-white leading-relaxed">
              DeusVaultOS is a revolutionary creative platform that amplifies{" "}
              <span className="text-cyber-mint-bright font-semibold">your vision</span>,{" "}
              <span className="text-cyber-yellow font-semibold">your tools</span>, with{" "}
              <span className="text-cyber-cyan font-semibold">infinite possibility</span>.
              <br />
              Built by creators, for minds that shape the future.
            </p>
          </ReadableContainer>
        </motion.div>

      </motion.div>

      {/* Simplified Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
      >
        
        <div className="glass-refined rounded-lg p-8 border border-cyber-cyan/30 group hover:border-cyber-cyan/50 transition-colors">
          <div className="w-16 h-16 bg-cyber-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Infinity className="h-8 w-8 text-cyber-cyan" />
          </div>
          <h3 className="font-title text-xl text-cyber-white mb-4 group-hover:text-cyber-cyan transition-colors">
            Infinite Creative Tools
          </h3>
          <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors">
            Access any creative application, any workflow, any medium. All your tools in one place.
          </p>
        </div>

        <div className="glass-refined rounded-lg p-8 border border-cyber-mint-bright/30 group hover:border-cyber-mint-bright/50 transition-colors">
          <div className="w-16 h-16 bg-cyber-mint-bright/20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Cpu className="h-8 w-8 text-cyber-mint-bright" />
          </div>
          <h3 className="font-title text-xl text-cyber-white mb-4 group-hover:text-cyber-mint-bright transition-colors">
            AI Creative Partner
          </h3>
          <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors">
            Intelligent assistance that learns your style and amplifies your creative vision.
          </p>
        </div>

        <div className="glass-refined rounded-lg p-8 border border-cyber-yellow/30 group hover:border-cyber-yellow/50 transition-colors">
          <div className="w-16 h-16 bg-cyber-yellow/20 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-cyber-yellow" />
          </div>
          <h3 className="font-title text-xl text-cyber-white mb-4 group-hover:text-cyber-yellow transition-colors">
            Your Creative Vault
          </h3>
          <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors">
            Secure, private creative space. Your ideas, your work, completely under your control.
          </p>
        </div>

      </motion.div>

      {/* What Makes It Special - Simplified */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="glass-refined rounded-lg p-12 border border-cyber-cyan/30 relative overflow-hidden"
      >
        
        <h2 className="font-title text-3xl lg:text-4xl text-cyber-white mb-8 relative z-10">
          Why Deus Vault is <span className="text-cyber-cyan">Revolutionary</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="space-y-8">
            
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-cyber-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Layers className="h-6 w-6 text-cyber-cyan" />
              </div>
              <div>
                <h3 className="font-subtitle text-xl text-cyber-white mb-2 group-hover:text-cyber-cyan transition-colors">
                  Multi-OS Native Execution
                </h3>
                <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors leading-relaxed">
                  Run any application from any operating system simultaneously. Windows .exe, macOS .app, Linux binaries - all native, all perfect.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-cyber-mint-bright/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="h-6 w-6 text-cyber-mint-bright" />
              </div>
              <div>
                <h3 className="font-subtitle text-xl text-cyber-white mb-2 group-hover:text-cyber-mint-bright transition-colors">
                  Self-Evolution Protocol
                </h3>
                <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors leading-relaxed">
                  The system continuously analyzes and optimizes itself. What starts fast becomes lightning-fast over time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-cyber-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="h-6 w-6 text-cyber-yellow" />
              </div>
              <div>
                <h3 className="font-subtitle text-xl text-cyber-white mb-2 group-hover:text-cyber-yellow transition-colors">
                  THERION AI Integration
                </h3>
                <p className="font-body text-cyber-dark-300 group-hover:text-cyber-dark-200 transition-colors leading-relaxed">
                  Built-in AI assistant that understands your development workflow. Code generation, debugging, and optimization - all automatic.
                </p>
              </div>
            </div>

          </div>

          <div className="glass-refined rounded-lg p-8 border border-cyber-cyan/30 relative overflow-hidden">
            
            <h3 className="font-title text-2xl text-cyber-white mb-8 text-center relative z-10">
              Performance Metrics
            </h3>
            <div className="space-y-8 relative z-10">
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-body text-cyber-dark-300">Application Compatibility</span>
                  <span className="font-mono text-xl font-bold text-cyber-cyan">100%</span>
                </div>
                <div className="w-full bg-cyber-dark-800 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="h-3 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-cyan/60 relative"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-body text-cyber-dark-300">Performance Improvement</span>
                  <span className="font-mono text-xl font-bold text-cyber-mint-bright">347%</span>
                </div>
                <div className="w-full bg-cyber-dark-800 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="h-3 rounded-full bg-gradient-to-r from-cyber-mint-bright to-cyber-mint-bright/60 relative"
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-body text-cyber-dark-300">Developer Satisfaction</span>
                  <span className="font-mono text-xl font-bold text-cyber-yellow">98%</span>
                </div>
                <div className="w-full bg-cyber-dark-800 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="h-3 rounded-full bg-gradient-to-r from-cyber-yellow to-cyber-yellow/60 relative"
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
            <span className="text-cyber-cyan">Future</span>?
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
            <div className="font-mono text-cyber-cyan">50K+</div>
            <div className="font-caption text-cyber-dark-400">Downloads</div>
          </div>
          <div className="w-px h-8 bg-cyber-dark-600" />
          <div className="text-center">
            <div className="font-mono text-cyber-mint-bright">100%</div>
            <div className="font-caption text-cyber-dark-400">Open Source</div>
          </div>
          <div className="w-px h-8 bg-cyber-dark-600" />
          <div className="text-center">
            <div className="font-mono text-cyber-yellow">24/7</div>
            <div className="font-caption text-cyber-dark-400">Support</div>
          </div>
        </div>

      </motion.div>

    </div>
  );
}