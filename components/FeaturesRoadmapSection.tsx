import { motion } from 'framer-motion';
import {
    AlertCircle,
    Bot,
    CheckCircle,
    Clock,
    Database,
    GitBranch,
    Globe,
    Rocket,
    Shield,
    Star,
    Zap
} from 'lucide-react';
import { VideoPlaceholder } from './VideoPlaceholder';

export const FeaturesRoadmapSection = () => {
  const coreFeatures = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI-Powered Development",
      description: "Intelligent code generation, optimization, and debugging assistance",
      status: "live",
      details: [
        "GPT-4 integrated coding assistant",
        "Automated code review and optimization", 
        "Intelligent error detection and fixes",
        "AI-powered documentation generation"
      ]
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Distributed Computing",
      description: "Scale your AI workloads across global cloud infrastructure",
      status: "live", 
      details: [
        "Auto-scaling compute clusters",
        "GPU/TPU resource allocation",
        "Global edge computing nodes",
        "Real-time load balancing"
      ]
    },
    {
      icon: <GitBranch className="h-8 w-8" />,
      title: "Version Control Plus",
      description: "Advanced version control with AI model versioning and experiments",
      status: "live",
      details: [
        "Git integration with AI enhancements",
        "ML model version tracking",
        "Experiment branch management", 
        "Automated testing pipelines"
      ]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Military-grade security for your most sensitive AI projects",
      status: "live",
      details: [
        "End-to-end encryption",
        "Zero-trust architecture",
        "SOC 2 Type II compliance",
        "Advanced threat detection"
      ]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Community Marketplace",
      description: "Share, discover, and monetize AI tools and models",
      status: "beta",
      details: [
        "AI model marketplace",
        "Tool and extension sharing",
        "Revenue sharing for contributors",
        "Community-driven development"
      ]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Performance Optimization",
      description: "Advanced optimization techniques for maximum development speed",
      status: "planned",
      details: [
        "Native code compilation",
        "Multi-threaded processing",
        "Intelligent caching systems",
        "Resource optimization tools"
      ]
    }
  ];

  const roadmapItems = [
    {
      quarter: "Q2 2025",
      title: "Enhanced AI Assistant",
      description: "Advanced multimodal AI with vision and code understanding",
      status: "in-progress",
      features: [
        "Vision-based code analysis",
        "Natural language to code conversion",
        "Advanced debugging assistance",
        "Multi-language support expansion"
      ]
    },
    {
      quarter: "Q3 2025", 
      title: "Marketplace Launch",
      description: "Full community marketplace with monetization",
      status: "planned",
      features: [
        "AI model trading platform",
        "Tool marketplace launch",
        "Revenue sharing system",
        "Creator incentive programs"
      ]
    },
    {
      quarter: "Q4 2025",
      title: "Mobile Development",
      description: "Native mobile apps for on-the-go development",
      status: "planned", 
      features: [
        "iOS and Android apps",
        "Mobile code editor",
        "Offline development capabilities",
        "Cloud sync optimization"
      ]
    },
    {
      quarter: "Q1 2026",
      title: "Advanced Integration",
      description: "Integration with next-generation computing platforms",
      status: "research",
      features: [
        "High-performance computing access",
        "Advanced workflow optimization",
        "Machine learning acceleration",
        "Research collaboration tools"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'from-cyan-400 to-yellow-400';
      case 'beta': return 'from-cyan-400 to-yellow-400';
      case 'in-progress': return 'from-cyan-400 to-yellow-400';
      case 'planned': return 'from-cyan-400 to-yellow-400';
      case 'research': return 'from-cyan-400 to-yellow-400';
      default: return 'from-cyan-400 to-yellow-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': return <CheckCircle className="h-5 w-5" />;
      case 'beta': return <Star className="h-5 w-5" />;
      case 'in-progress': return <Clock className="h-5 w-5" />;
      case 'planned': return <Rocket className="h-5 w-5" />;
      case 'research': return <AlertCircle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            style={{ 
              textShadow: '0 2px 20px rgba(0,0,0,0.8)',
              fontFamily: "'Space Grotesk', monospace"
            }}
          >
            Features &{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">
              Roadmap
            </span>
          </h1>
          <p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
          >
            From cutting-edge AI assistance to next-generation development tools, 
            see what's available now and what's coming next.
          </p>
        </motion.div>

        {/* Core Features */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-white mb-12"
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
          >
            Core Platform Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-black/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getStatusColor(feature.status)} flex items-center justify-center text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getStatusColor(feature.status)} text-white text-sm font-medium`}>
                    {getStatusIcon(feature.status)}
                    {feature.status.toUpperCase()}
                  </div>
                </div>
                
                <h3 
                  className="text-xl font-bold text-white mb-4"
                  style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
                >
                  {feature.title}
                </h3>
                
                <p 
                  className="text-gray-300 mb-6 leading-relaxed"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
                >
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <span 
                        className="text-gray-400 text-sm"
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                      >
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Platform Demo Video */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-black/10 backdrop-blur-md rounded-3xl p-12 border border-cyan-400/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="text-4xl font-bold text-white mb-8"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
              >
                See It in{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">
                  Action
                </span>
              </h2>
              <p 
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
              >
                Watch how developers are using DeusVaultOS to build the next generation 
                of AI applications. From concept to deployment in minutes, not months.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Real-time AI assistance</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Automated testing and deployment</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Collaborative development workflows</span>
                </div>
              </div>
            </div>
            <div>
              <VideoPlaceholder
                placeholder="Platform Demo - AI Development Workflow"
                aspectRatio="16:9"
                autoplay={true}
                loop={true}
                overlay={true}
              />
            </div>
          </div>
        </motion.section>

        {/* Development Roadmap */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-white mb-12"
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
          >
            Development Roadmap
          </motion.h2>
          
          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.quarter}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-black/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Timeline */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getStatusColor(item.status)} flex items-center justify-center text-white shadow-lg`}>
                        {getStatusIcon(item.status)}
                      </div>
                      <div>
                        <div 
                          className="text-2xl font-bold text-white"
                          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
                        >
                          {item.quarter}
                        </div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(item.status)} text-white text-sm font-medium`}>
                          {item.status.replace('-', ' ').toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="lg:col-span-2">
                    <h3 
                      className="text-2xl font-bold text-white mb-4"
                      style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="text-gray-300 mb-6 leading-relaxed"
                      style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
                    >
                      {item.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                          <span 
                            className="text-gray-400 text-sm"
                            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
};
