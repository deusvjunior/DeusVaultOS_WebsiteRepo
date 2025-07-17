import { motion } from "framer-motion";
import { 
  Terminal, 
  Brain, 
  Zap, 
  Shield, 
  Code, 
  Cpu, 
  Database, 
  Cloud,
  GitBranch,
  Monitor,
  Lock,
  Workflow
} from "lucide-react";

export function ProfessionalFeaturesSection() {
  const coreFeatures = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Native Architecture",
      description: "Integrated intelligence for code generation, optimization, and autonomous system evolution.",
      technical: "Built-in GPT integration with local model support",
      category: "intelligence"
    },
    {
      icon: <Terminal className="h-6 w-6" />,
      title: "Zero Configuration",
      description: "Production-ready development environment with intelligent defaults and automatic setup.",
      technical: "Smart environment detection and configuration",
      category: "automation"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Optimization",
      description: "Automatic build optimization, caching strategies, and runtime performance monitoring.",
      technical: "Webpack bundling with intelligent code splitting",
      category: "performance"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security First",
      description: "Built-in security scanning, dependency auditing, and secure coding practice enforcement.",
      technical: "Automated vulnerability scanning and mitigation",
      category: "security"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Multi-Language Support",
      description: "Native support for modern programming languages with intelligent syntax assistance.",
      technical: "TypeScript, Python, Rust, Go, and more",
      category: "development"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Integration",
      description: "Seamless deployment to major cloud providers with automated infrastructure management.",
      technical: "Docker, Kubernetes, serverless deployments",
      category: "deployment"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Management",
      description: "Intelligent database integration with query optimization and migration management.",
      technical: "PostgreSQL, MongoDB, Redis support",
      category: "data"
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: "Version Control",
      description: "Advanced Git integration with intelligent branching strategies and conflict resolution.",
      technical: "Smart merge conflict resolution",
      category: "collaboration"
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "Real-time Monitoring",
      description: "Application performance monitoring with intelligent alerting and diagnostic insights.",
      technical: "APM integration with custom metrics",
      category: "observability"
    }
  ];

  const architectureHighlights = [
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "Quantum-Enhanced Processing",
      value: "28.97x",
      description: "Intelligence amplification factor"
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Open Source Foundation",
      value: "100%",
      description: "No vendor lock-in guarantee"
    },
    {
      icon: <Workflow className="h-5 w-5" />,
      title: "Autonomous Evolution",
      value: "Active",
      description: "Self-improving capabilities"
    }
  ];

  return (
    <section className="tldark-section">
      <div className="tldark-container">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="tldark-heading text-4xl md:text-5xl mb-6">
            <span style={{ color: 'var(--text-primary)' }}>Technical</span>{" "}
            <span style={{ color: 'var(--accent-cyan)' }}>Architecture</span>
          </h2>
          <p className="text-xl tldark-text--muted max-w-3xl mx-auto">
            Built on modern development principles with quantum-enhanced intelligence 
            for professional software engineering teams.
          </p>
        </motion.div>

        {/* Architecture Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="tldark-grid tldark-grid--3 mb-20"
        >
          {architectureHighlights.map((highlight, index) => (
            <div key={index} className="tldark-glass-card p-6 text-center tldark-interactive">
              <div className="tldark-text--accent mb-4 flex justify-center">
                {highlight.icon}
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent-neon-yellow)' }}>
                {highlight.value}
              </div>
              <div className="tldark-text font-semibold mb-2">{highlight.title}</div>
              <div className="tldark-text--muted text-sm">{highlight.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Core Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="tldark-grid tldark-grid--3 gap-8"
        >
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="tldark-glass-card p-6 tldark-interactive"
            >
              {/* Feature Icon & Category */}
              <div className="flex items-center justify-between mb-4">
                <div className="tldark-text--accent">
                  {feature.icon}
                </div>
                <div className="tldark-glass-card px-3 py-1">
                  <span className="text-xs tldark-text--muted uppercase tracking-wider">
                    {feature.category}
                  </span>
                </div>
              </div>

              {/* Feature Content */}
              <h3 className="tldark-text text-lg font-semibold mb-3">
                {feature.title}
              </h3>
              
              <p className="tldark-text--muted text-sm leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Technical Details */}
              <div className="tldark-code p-3 text-xs">
                <span className="tldark-text--accent"># </span>
                <span className="tldark-text">{feature.technical}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Professional Integration Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="tldark-glass-card p-8">
            <div className="tldark-grid tldark-grid--2 items-center">
              <div>
                <h3 className="tldark-heading text-2xl mb-4">
                  Enterprise Integration
                </h3>
                <p className="tldark-text mb-6 leading-relaxed">
                  DeusVaultOS integrates seamlessly with existing enterprise infrastructure, 
                  providing a professional development environment that scales with your organization's needs.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-cyan)' }} />
                    <span className="tldark-text">SSO and enterprise authentication</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-cyan)' }} />
                    <span className="tldark-text">Compliance and audit logging</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-cyan)' }} />
                    <span className="tldark-text">Custom workflow integration</span>
                  </div>
                </div>
              </div>

              <div className="tldark-terminal">
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full" style={{ background: 'var(--accent-cyan)' }}></div>
                  <span className="ml-4 tldark-text--muted text-sm">enterprise-config</span>
                </div>

                <div className="space-y-2 relative z-10 text-sm">
                  <div className="tldark-text--accent"># Enterprise Configuration</div>
                  <div className="tldark-text">auth_provider: "okta"</div>
                  <div className="tldark-text">compliance: "soc2"</div>
                  <div className="tldark-text">monitoring: "datadog"</div>
                  <div className="tldark-text">deployment: "kubernetes"</div>
                  <div className="tldark-text--muted"># Auto-configured for your infrastructure</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
