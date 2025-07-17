import { motion } from 'framer-motion';
import { 
  Code2, 
  Building2, 
  Rocket, 
  Users, 
  Brain, 
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import { VideoPlaceholder } from './VideoPlaceholder';

export const WhoIsThisForSection = () => {
  const userTypes = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "AI Developers",
      description: "Build next-generation AI applications with integrated development tools",
      details: [
        "Pre-configured AI/ML environments",
        "Integrated model training pipelines", 
        "Auto-scaling compute resources",
        "Collaborative AI workspaces"
      ],
      gradient: "from-cyan-400 to-yellow-400"
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Enterprise Teams", 
      description: "Scale AI initiatives across your organization with enterprise-grade security",
      details: [
        "Enterprise SSO integration",
        "Compliance-ready environments",
        "Team collaboration tools",
        "Advanced security controls"
      ],
      gradient: "from-cyan-400 to-yellow-400"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "AI Startups",
      description: "Launch AI products faster with our comprehensive development platform",
      details: [
        "Rapid prototyping tools",
        "MVP development acceleration", 
        "Investor-ready demos",
        "Scalable infrastructure"
      ],
      gradient: "from-cyan-400 to-yellow-400"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Research Teams",
      description: "Conduct cutting-edge AI research with unlimited computational resources",
      details: [
        "Jupyter lab environments",
        "HPC cluster access",
        "Reproducible experiments", 
        "Academic collaboration"
      ],
      gradient: "from-cyan-400 to-yellow-400"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Dev Communities",
      description: "Join a thriving ecosystem of AI developers and contributors",
      details: [
        "Open source contributions",
        "Knowledge sharing forums",
        "Hackathon platforms",
        "Mentorship programs"
      ],
      gradient: "from-cyan-400 to-yellow-400"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Digital Nomads",
      description: "Work from anywhere with cloud-native AI development environments",
      details: [
        "Global edge computing",
        "Low-latency access",
        "Mobile-optimized tools",
        "Offline sync capabilities"
      ],
      gradient: "from-cyan-400 to-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            Built for the Future of{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              AI Development
            </span>
          </h1>
          <p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
          >
            Whether you're a solo developer, enterprise team, or research institution, 
            DeusVaultOS provides the perfect environment for your AI journey.
          </p>
        </motion.div>

        {/* User Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {userTypes.map((userType, index) => (
            <motion.div
              key={userType.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-black/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${userType.gradient} flex items-center justify-center mb-6 text-white shadow-lg`}>
                {userType.icon}
              </div>
              
              {/* Title */}
              <h3 
                className="text-2xl font-bold text-white mb-4"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
              >
                {userType.title}
              </h3>
              
              {/* Description */}
              <p 
                className="text-gray-300 mb-6 leading-relaxed"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
              >
                {userType.description}
              </p>
              
              {/* Features List */}
              <ul className="space-y-3">
                {userType.details.map((detail, detailIndex) => (
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

        {/* Success Stories Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-black/10 backdrop-blur-md rounded-3xl p-12 border border-cyan-400/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <div>
              <h2 
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400 mb-4"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
              >
                Trusted by{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">
                  10,000+ Developers
                </span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Enterprise Ready</h3>
                    <p className="text-gray-300">SOC 2 compliant, GDPR ready, with enterprise-grade security</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                    <p className="text-gray-300">Deploy AI models 10x faster than traditional platforms</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Community Driven</h3>
                    <p className="text-gray-300">Join thousands of AI developers in our thriving community</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video placeholder */}
            <div>
              <VideoPlaceholder
                placeholder="Success Stories - Community Developer Testimonials"
                aspectRatio="16:9"
                autoplay={true}
                loop={true}
                overlay={true}
              />
            </div>
            
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};
