import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Gamepad2, 
  Code, 
  Users, 
  GraduationCap, 
  Heart, 
  Cpu, 
  Globe, 
  Sparkles,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react';

export function UserSegments() {
  const [activeTab, setActiveTab] = useState('developers');

  const userTypes = {
    developers: {
      icon: Code,
      title: 'Developers',
      color: 'cyan',
      benefits: [
        'Run any development environment natively',
        'AI-powered code generation and debugging',
        'Perfect compatibility with all frameworks',
        'Zero configuration development setup',
        'Built-in containerization and deployment tools'
      ],
      description: 'The ultimate development environment that adapts to your workflow, not the other way around.',
      stats: { metric: 'Productivity Boost', value: '347%' }
    },
    gamedevs: {
      icon: Gamepad2,
      title: 'Game Developers',
      color: 'yellow',
      benefits: [
        'Native Unity, Unreal, and Godot optimization',
        'Real-time performance monitoring and optimization',
        'Cross-platform build automation',
        'Integrated asset pipeline management',
        'AI-assisted shader and script optimization'
      ],
      description: 'Create games faster with an OS designed for game development excellence.',
      stats: { metric: 'Build Time Reduction', value: '85%' }
    },
    gamers: {
      icon: Zap,
      title: 'Gamers',
      color: 'cyan',
      benefits: [
        'Run Windows games with better performance than Windows',
        'No compatibility layers - true native execution',
        'AI-optimized graphics settings per game',
        'Zero latency input handling',
        'Built-in streaming and recording tools'
      ],
      description: 'Gaming performance that surpasses native Windows while maintaining perfect compatibility.',
      stats: { metric: 'FPS Improvement', value: '67%' }
    },
    entrepreneurs: {
      icon: Users,
      title: 'Entrepreneurs',
      color: 'yellow',
      benefits: [
        'Rapid prototyping and MVP development',
        'Built-in business analytics and automation',
        'Seamless integration with all business tools',
        'AI-powered market analysis and insights',
        'Zero infrastructure overhead'
      ],
      description: 'Focus on building your business, not managing your development environment.',
      stats: { metric: 'Time to Market', value: '73%' }
    },
    educators: {
      icon: GraduationCap,
      title: 'Educators',
      color: 'cyan',
      benefits: [
        'Instant classroom environment setup',
        'Universal software compatibility for all subjects',
        'AI-assisted curriculum development',
        'Student progress tracking and analytics',
        'Zero maintenance overhead'
      ],
      description: 'Teach any technology stack without setup time or compatibility issues.',
      stats: { metric: 'Setup Time Saved', value: '94%' }
    },
    hobbyists: {
      icon: Heart,
      title: 'Hobbyists',
      color: 'yellow',
      benefits: [
        'Explore any technology without barriers',
        'AI mentor for learning new skills',
        'Perfect for 3D printing, IoT, and maker projects',
        'Community-driven project sharing',
        'Free access to professional-grade tools'
      ],
      description: 'Turn your creative ideas into reality with unlimited possibilities.',
      stats: { metric: 'Projects Completed', value: '234%' }
    },
    miners: {
      icon: Cpu,
      title: 'Crypto Miners',
      color: 'cyan',
      benefits: [
        'Optimized mining performance across all algorithms',
        'AI-powered profitability optimization',
        'Built-in Hedera layer 2 integration',
        'Zero-fee token economy participation',
        'Automated hardware tuning and monitoring'
      ],
      description: 'Mine more efficiently while contributing to a decentralized AI ecosystem.',
      stats: { metric: 'Mining Efficiency', value: '156%' }
    }
  };

  const currentUser = userTypes[activeTab as keyof typeof userTypes];

  return (
    <div className="space-y-16 container-responsive">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <h2 className="text-4xl md:text-6xl bg-gradient-to-r from-white via-cyan-200 to-yellow-200 bg-clip-text text-transparent">
          Who Is <span className="text-cyan-400">DeusVaultOS</span> For?
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Whether you're building the next breakthrough or exploring new possibilities, 
          DeusVaultOS adapts to <span className="text-cyan-400">your world</span>.
        </p>
      </motion.div>

      {/* User Type Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {Object.entries(userTypes).map(([key, user]) => {
          const IconComponent = user.icon;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-lg font-subtitle transition-all duration-300
                ${isActive 
                  ? user.color === 'cyan'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-lg'
                    : 'bg-yellow-500/20 border-yellow-400 text-yellow-400 shadow-lg'
                  : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-gray-500'
                }
                border backdrop-blur-sm
              `}
            >
              <IconComponent className="h-5 w-5" />
              <span>{user.title}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Active User Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-refined rounded-xl p-8 md:p-12 border border-cyan-400/30"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 ${
                currentUser.color === 'cyan' ? 'bg-cyan-500/20' : 'bg-yellow-500/20'
              } rounded-xl flex items-center justify-center`}>
                <currentUser.icon className={`h-8 w-8 ${
                  currentUser.color === 'cyan' ? 'text-cyan-400' : 'text-yellow-400'
                }`} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  For {currentUser.title}
                </h3>
                <div className={`${
                  currentUser.color === 'cyan' ? 'text-cyan-400' : 'text-yellow-400'
                } font-mono text-lg`}>
                  {currentUser.stats.metric}: +{currentUser.stats.value}
                </div>
              </div>
            </div>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              {currentUser.description}
            </p>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white mb-4">Key Benefits:</h4>
              {currentUser.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className={`h-6 w-6 ${
                    currentUser.color === 'cyan' ? 'text-cyan-400' : 'text-yellow-400'
                  } mt-0.5 flex-shrink-0`} />
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                inline-flex items-center gap-3 px-8 py-4 rounded-lg font-subtitle text-lg
                ${currentUser.color === 'cyan' 
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400'
                  : 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400'
                }
                text-white transition-all duration-300 shadow-lg
              `}
            >
              <span>Get Started Today</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Stats Visualization */}
          <div className="glass-refined rounded-xl p-8 border border-gray-600/30">
            <h4 className="text-2xl font-bold text-white mb-8 text-center">
              Real Impact Metrics
            </h4>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">{currentUser.stats.metric}</span>
                  <span className={`text-2xl font-bold ${
                    currentUser.color === 'cyan' ? 'text-cyan-400' : 'text-yellow-400'
                  }`}>
                    +{currentUser.stats.value}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                  <motion.div 
                    className={`h-4 rounded-full ${
                      currentUser.color === 'cyan' 
                        ? 'bg-gradient-to-r from-cyan-600 to-cyan-400'
                        : 'bg-gradient-to-r from-yellow-600 to-yellow-400'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">User Satisfaction</span>
                  <span className="text-2xl font-bold text-cyan-400">98%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                  <motion.div 
                    className="h-4 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">Setup Time Reduction</span>
                  <span className="text-2xl font-bold text-yellow-400">92%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                  <motion.div 
                    className="h-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* General Purpose Statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass-refined rounded-xl p-8 md:p-12 border border-yellow-400/30 relative overflow-hidden"
      >
        <div className="text-center space-y-6 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Globe className="h-8 w-8 text-yellow-400" />
            <h3 className="text-3xl font-bold text-white">
              Built for <span className="text-yellow-400">Everyone</span>
            </h3>
          </div>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            DeusVaultOS is fundamentally <span className="text-yellow-400 font-semibold">general-purpose</span>. 
            Whatever your creative vision, whatever your technical needs — this OS adapts and evolves with you.
          </p>
          
          <div className="glass-refined rounded-lg p-6 bg-yellow-400/10 border border-yellow-400/30 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                  Real-World Example
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  This entire website was built in <span className="text-yellow-400 font-semibold">less than a day</span> using 
                  DeusVaultOS itself. The same environment that runs complex simulations also creates beautiful, 
                  responsive web experiences. <span className="text-cyan-400">One OS. Infinite possibilities.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-yellow-400 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-40 h-40 bg-cyan-400 rounded-full blur-3xl" />
        </div>
      </motion.div>

    </div>
  );
}
