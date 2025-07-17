import { motion } from 'framer-motion';
import {
    Globe,
    GraduationCap,
    Heart,
    Lightbulb,
    Palette,
    PenTool,
    Sparkles,
    Video
} from 'lucide-react';
import { VideoPlaceholder } from './VideoPlaceholder';

export const WhoIsThisForSection = () => {
  const userTypes = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Digital Artists",
      description: "Create stunning visual art with AI-powered design tools",
      details: [
        "AI-assisted drawing & painting",
        "Style transfer & enhancement",
        "Generative art workflows", 
        "Creative asset libraries"
      ],
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Content Creators", 
      description: "Produce engaging content with intelligent editing and optimization",
      details: [
        "Automated video editing",
        "Voice synthesis & effects",
        "Multi-platform optimization",
        "Audience engagement tools"
      ],
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Writers & Authors",
      description: "Craft compelling stories with AI writing assistance",
      details: [
        "Creative writing support",
        "Research & fact-checking",
        "Style adaptation tools",
        "Publishing workflows"
      ],
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovators & Makers",
      description: "Turn ideas into reality with rapid prototyping tools",
      details: [
        "Concept development",
        "Design iteration tools",
        "Market validation", 
        "Prototype creation"
      ],
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Educators & Trainers",
      description: "Create engaging learning experiences with interactive tools",
      details: [
        "Course content generation",
        "Interactive lesson plans",
        "Student assessment tools",
        "Knowledge sharing platforms"
      ],
      gradient: "from-teal-400 to-cyan-500"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Creative Communities",
      description: "Collaborate and share in spaces designed for creative minds",
      details: [
        "Collaborative workspaces",
        "Resource sharing networks",
        "Community-driven tools",
        "Cross-platform integration"
      ],
      gradient: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pb-32">
      <div className="max-w-7xl mx-auto space-y-16">
        
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
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              AI Development
            </span>
          </h1>
          <div className="mx-auto max-w-2xl p-6 rounded-xl bg-black/60 backdrop-blur-md shadow-xl border border-cyan-400">
            <p 
              className="text-xl text-gray-300 leading-relaxed"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
            >
              Whether you're a solo developer, enterprise team, or research institution, 
              DeusVaultOS provides the perfect environment for your AI journey.
            </p>
          </div>
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
                className="text-4xl font-bold text-white mb-8"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
              >
                Trusted by{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  10,000+ Creators
                </span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Creativity First</h3>
                    <p className="text-gray-300">Tools designed by creators for creators, not by tech companies</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Human-Centered AI</h3>
                    <p className="text-gray-300">AI that amplifies human creativity instead of replacing it</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Open Creative Ecosystem</h3>
                    <p className="text-gray-300">Share, collaborate, and build upon each other's creative work</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video placeholder */}
            <div>
              <VideoPlaceholder
                placeholder="Creative Stories - How Artists & Creators Use DeusVaultOS"
                aspectRatio="16:9"
                autoplay={false}
                loop={false}
                overlay={true}
              />
            </div>
            
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};
