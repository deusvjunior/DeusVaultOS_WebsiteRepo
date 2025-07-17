import { motion } from "framer-motion";
import { Terminal, Code, Zap, Shield, ArrowRight, Github, Download } from "lucide-react";
import { Button } from "./ui/button";

export function ProfessionalHeroSection() {
  const handleDownload = () => {
    window.open('https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo/releases', '_blank');
  };

  const handleGithub = () => {
    window.open('https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo', '_blank');
  };

  const technicalFeatures = [
    { 
      icon: <Terminal className="h-5 w-5" />, 
      text: "Zero Configuration", 
      detail: "Production-ready environment" 
    },
    { 
      icon: <Code className="h-5 w-5" />, 
      text: "AI Integration", 
      detail: "Native intelligent assistance" 
    },
    { 
      icon: <Zap className="h-5 w-5" />, 
      text: "Self-Evolving", 
      detail: "Autonomous capability expansion" 
    },
    { 
      icon: <Shield className="h-5 w-5" />, 
      text: "Open Ecosystem", 
      detail: "No vendor lock-in" 
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 overflow-hidden">
      {/* TLDark Glass Background */}
      <div className="absolute inset-0" style={{ background: 'var(--tldark-primary)' }}>
        <div className="absolute inset-0" style={{ background: 'var(--glass-gradient-hero)' }} />
        
        {/* Professional Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(var(--glass-border) 1px, transparent 1px),
                             linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Subtle Accent Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
             style={{ background: 'radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
             style={{ background: 'radial-gradient(circle, var(--accent-neon-yellow) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Professional Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Technical Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="tldark-glass-card inline-flex items-center px-4 py-2 mb-6">
                <div className="w-2 h-2 rounded-full mr-3 tldark-animate-glow" 
                     style={{ background: 'var(--accent-cyan)' }} />
                <span className="tldark-text text-sm font-medium">Professional Development Environment</span>
              </div>
            </motion.div>

            {/* Professional Headline */}
            <motion.h1
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block text-5xl md:text-6xl lg:text-7xl mb-4 tldark-heading">
                <span style={{ color: 'var(--text-primary)' }}>DEUS</span>
                <span style={{ color: 'var(--accent-cyan)' }}>VAULT</span>
                <span style={{ color: 'var(--accent-neon-yellow)' }}>OS</span>
              </span>
              <span className="block text-2xl md:text-3xl tldark-text font-light">
                Self-Evolving Development Environment
              </span>
            </motion.h1>
            
            {/* Technical Value Proposition */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-xl tldark-text leading-relaxed mb-6">
                A quantum-enhanced development environment that integrates{" "}
                <span className="tldark-text--accent font-medium">AI assistance</span>,{" "}
                <span style={{ color: 'var(--accent-neon-yellow)' }} className="font-medium">zero configuration</span>, and{" "}
                <span className="tldark-text--accent font-medium">autonomous evolution</span>.
              </p>
              <p className="text-lg tldark-text--muted">
                Built for professional developers who demand excellence without complexity.
              </p>
            </motion.div>

            {/* Professional CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button 
                className="tldark-glass-button--primary text-lg px-8 py-4 flex items-center justify-center group"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5 mr-3 group-hover:animate-bounce" />
                Download Release
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                className="tldark-glass-button text-lg px-8 py-4 flex items-center justify-center group"
                onClick={handleGithub}
              >
                <Github className="h-5 w-5 mr-3" />
                View Source
              </button>
            </motion.div>

            {/* Technical Features Grid */}
            <motion.div
              className="tldark-grid tldark-grid--2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {technicalFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="tldark-text--accent mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="tldark-text font-semibold text-base">{feature.text}</div>
                    <div className="tldark-text--muted text-sm">{feature.detail}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Terminal Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:pl-8"
          >
            <div className="tldark-glass-card p-6">
              <div className="tldark-terminal">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--accent-cyan)' }}></div>
                  <span className="ml-4 tldark-text--muted text-sm">deusvault-terminal</span>
                </div>

                {/* Terminal Content */}
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center">
                    <span className="tldark-text--accent">$</span>
                    <span className="tldark-text ml-2">deusvault init</span>
                  </div>
                  
                  <div className="tldark-text--muted text-sm">
                    <div>✓ AI integration configured</div>
                    <div>✓ Development environment ready</div>
                    <div>✓ Zero configuration setup complete</div>
                  </div>

                  <div className="flex items-center">
                    <span className="tldark-text--accent">$</span>
                    <span className="tldark-text ml-2">deusvault code --assist</span>
                  </div>

                  <div className="tldark-glass-card p-3 text-sm">
                    <div className="tldark-text--accent mb-2">// AI Assistant Active</div>
                    <div className="tldark-text">
                      <span className="text-blue-400">function</span>{" "}
                      <span className="text-yellow-400">optimizePerformance</span>() {"{"}
                    </div>
                    <div className="tldark-text ml-4">
                      <span className="text-gray-400">// AI suggests: Use memoization</span>
                    </div>
                    <div className="tldark-text ml-4">
                      <span className="text-purple-400">return</span>{" "}
                      <span className="text-green-400">useMemo</span>(() =&gt; computation, [deps]);
                    </div>
                    <div className="tldark-text">{"}"}</div>
                  </div>

                  <div className="flex items-center">
                    <span className="tldark-text--accent">$</span>
                    <span className="tldark-text ml-2">deusvault deploy --auto</span>
                  </div>

                  <div className="tldark-text--muted text-sm">
                    <div>✓ Build optimization complete</div>
                    <div>✓ Deployment pipeline ready</div>
                    <div className="tldark-status-active">System evolution active</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
