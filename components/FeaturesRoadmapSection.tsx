import { motion } from 'framer-motion';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Heart,
    Lightbulb,
    Palette,
    PenTool,
    Sparkles,
    Star,
    Video
} from 'lucide-react';
import { VideoPlaceholder } from './VideoPlaceholder';

export const FeaturesRoadmapSection = () => {
  const coreFeatures = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "AI Creative Assistant",
      description: "Intelligent design suggestions, style matching, and creative ideation",
      status: "live",
      details: [
        "AI-powered design suggestions",
        "Style transfer and matching", 
        "Creative brainstorming tools",
        "Automatic asset generation"
      ]
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Media Production Suite",
      description: "Professional video, audio, and image editing with AI enhancement",
      status: "live", 
      details: [
        "Intelligent video editing",
        "Voice synthesis and effects",
        "Image enhancement tools",
        "Multi-format optimization"
      ]
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Creative Writing Tools",
      description: "AI-assisted writing, research, and content optimization",
      status: "live",
      details: [
        "Writing assistance and enhancement",
        "Research and fact-checking",
        "Style adaptation tools", 
        "Publishing workflow automation"
      ]
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Idea Development Platform",
      description: "Turn concepts into reality with rapid prototyping tools",
      status: "live",
      details: [
        "Concept visualization tools",
        "Rapid prototyping environment",
        "Market validation assistance",
        "Collaborative ideation spaces"
      ]
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Creative Community Hub",
      description: "Share, collaborate, and inspire within the creative ecosystem",
      status: "beta",
      details: [
        "Creative project sharing",
        "Collaboration tools",
        "Community challenges",
        "Cross-disciplinary networking"
      ]
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI-Powered Creativity Engine",
      description: "Next-generation creative AI that evolves with your artistic style",
      status: "planned",
      details: [
        "Personalized AI creativity models",
        "Style evolution tracking",
        "Cross-medium inspiration",
        "Advanced creative algorithms"
      ]
    }
  ];

  const roadmapItems = [
    {
      quarter: "Q2 2025",
      title: "Enhanced Creative AI",
      description: "Advanced multimodal AI for visual and audio creativity",
      status: "in-progress",
      features: [
        "Vision-based creative analysis",
        "Natural language to visual conversion",
        "Advanced style transfer",
        "Multi-media creative assistance"
      ]
    },
    {
      quarter: "Q3 2025", 
      title: "Creative Marketplace Launch",
      description: "Full creative community marketplace with monetization",
      status: "planned",
      features: [
        "Creative asset trading platform",
        "Template and tool marketplace",
        "Revenue sharing for creators",
        "Creator incentive programs"
      ]
    },
    {
      quarter: "Q4 2025",
      title: "Mobile Creative Suite",
      description: "Native mobile apps for on-the-go creative work",
      status: "planned", 
      features: [
        "iOS and Android creative apps",
        "Mobile design and editing tools",
        "Offline creative capabilities",
        "Cloud sync for all projects"
      ]
    },
    {
      quarter: "Q1 2026",
      title: "AI Creative Evolution",
      description: "Personalized AI that learns and evolves with your style",
      status: "research",
      features: [
        "Personal creative AI models",
        "Style evolution tracking",
        "Creative preference learning",
        "Advanced artistic collaboration"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'from-green-400 to-emerald-500';
      case 'beta': return 'from-blue-400 to-cyan-500';
      case 'in-progress': return 'from-orange-400 to-yellow-500';
      case 'planned': return 'from-purple-400 to-pink-500';
      case 'research': return 'from-gray-400 to-slate-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': return <CheckCircle className="h-5 w-5" />;
      case 'beta': return <Star className="h-5 w-5" />;
      case 'in-progress': return <Clock className="h-5 w-5" />;
      case 'planned': return <Lightbulb className="h-5 w-5" />;
      case 'research': return <AlertCircle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pb-32">
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
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            Creative Tools &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Evolving Features
            </span>
          </h1>
          <p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
          >
            Creative tools that grow with you. As AI evolves, so do our features - 
            constantly improving and adapting to serve the creative community.
          </p>

          {/* Rolling Features Philosophy */}
          <div className="max-w-4xl mx-auto bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Power to the People</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We believe creativity shouldn't be locked behind corporate gates. Our rolling feature updates 
              bring you the latest AI capabilities as they emerge, not when quarterly releases allow. 
              As the AI ecosystem matures, your creative tools evolve with it - automatically, transparently, 
              and always in service of your creative vision.
            </p>
          </div>
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
                <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
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
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Automated testing and deployment</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
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
