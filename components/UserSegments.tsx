import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShaderText } from './ShaderText';
import { ReadableContainer } from './ReadableContainer';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Code2, 
  Gamepad2, 
  Building, 
  Palette, 
  Zap, 
  Shield, 
  Rocket, 
  Brain,
  ChevronRight,
  Download,
  Play
} from 'lucide-react';

interface UserSegment {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  benefits: string[];
  features: {
    title: string;
    description: string;
    metric: string;
  }[];
  cta: {
    primary: string;
    secondary: string;
  };
}

export function UserSegments() {
  const [selectedSegment, setSelectedSegment] = useState<string>('developers');
  
  const segments: UserSegment[] = [
    {
      id: 'developers',
      title: 'DEVELOPERS',
      subtitle: 'Code at the Speed of Thought',
      icon: <Code2 className="h-16 w-16" />,
      color: 'text-cyber-cyan',
      gradient: 'from-cyber-cyan to-cyber-mint-bright',
      benefits: [
        'THERION AI writes code alongside you',
        'Zero setup time - productive in seconds',
        'Unlimited parallel development environments',
        'Deploy to any platform instantly',
        'Built-in performance optimization',
        'Collaborative coding with global devs'
      ],
      features: [
        {
          title: 'AI Pair Programming',
          description: 'Neural AI that understands your codebase and writes contextually perfect code',
          metric: '10x faster development'
        },
        {
          title: 'Universal Deployment',
          description: 'One codebase deploys to web, mobile, desktop, and cloud simultaneously',
          metric: '90% less deployment time'
        },
        {
          title: 'Environment Management',
          description: 'Infinite isolated environments that share resources intelligently',
          metric: 'Zero conflicts guaranteed'
        }
      ],
      cta: {
        primary: 'START CODING NOW',
        secondary: 'See Code Demo'
      }
    },
    {
      id: 'gamers',
      title: 'GAMERS',
      subtitle: 'Professional Gaming Arsenal',
      icon: <Gamepad2 className="h-16 w-16" />,
      color: 'text-cyber-mint-bright',
      gradient: 'from-cyber-mint-bright to-cyber-yellow',
      benefits: [
        'Unity, Unreal, and custom engines ready',
        'Professional game modding toolkit',
        'Performance profiling and optimization',
        'Asset pipeline automation',
        'Cross-platform game deployment',
        'Community marketplace for mods'
      ],
      features: [
        {
          title: 'Game Development Suite',
          description: 'Complete game dev environment with all major engines pre-configured',
          metric: 'Studio-grade performance'
        },
        {
          title: 'Modding Platform',
          description: 'Advanced tools for creating, testing, and distributing game modifications',
          metric: 'Any game supported'
        },
        {
          title: 'Performance Engine',
          description: 'Real-time profiling and optimization for maximum FPS and efficiency',
          metric: 'Up to 300% FPS boost'
        }
      ],
      cta: {
        primary: 'DOWNLOAD GAME BUILD',
        secondary: 'Watch Gaming Demo'
      }
    },
    {
      id: 'enterprise',
      title: 'ENTERPRISE',
      subtitle: 'Enterprise-Grade Innovation',
      icon: <Building className="h-16 w-16" />,
      color: 'text-cyber-yellow',
      gradient: 'from-cyber-yellow to-cyber-cyan',
      benefits: [
        'Enterprise security and compliance',
        'Team collaboration and code review',
        'Scalable infrastructure management',
        'Custom integrations and APIs',
        'Advanced analytics and reporting',
        'Dedicated support and training'
      ],
      features: [
        {
          title: 'Security & Compliance',
          description: 'Enterprise-grade security with SOC2, GDPR, and HIPAA compliance',
          metric: '99.99% uptime SLA'
        },
        {
          title: 'Team Management',
          description: 'Advanced team collaboration tools with role-based access control',
          metric: 'Unlimited team members'
        },
        {
          title: 'Custom Solutions',
          description: 'Tailored integrations and custom development environments',
          metric: 'White-label available'
        }
      ],
      cta: {
        primary: 'CONTACT SALES',
        secondary: 'Enterprise Demo'
      }
    },
    {
      id: 'creators',
      title: 'CREATORS',
      subtitle: 'Create & Monetize',
      icon: <Palette className="h-16 w-16" />,
      color: 'text-cyber-white',
      gradient: 'from-cyber-white to-cyber-mint-bright',
      benefits: [
        'Multi-media content creation tools',
        'Blockchain-based monetization',
        'NFT and digital asset creation',
        'Community building platform',
        'Revenue sharing ecosystem',
        'Creator-focused marketplace'
      ],
      features: [
        {
          title: 'Content Creation',
          description: 'Integrated tools for creating digital content, apps, and experiences',
          metric: 'All media types supported'
        },
        {
          title: 'Monetization Engine',
          description: 'Built-in Hedera blockchain integration for earning cryptocurrency',
          metric: 'Instant HBAR payouts'
        },
        {
          title: 'Community Platform',
          description: 'Build and manage your creator community with advanced engagement tools',
          metric: 'Global reach available'
        }
      ],
      cta: {
        primary: 'START CREATING',
        secondary: 'Creator Showcase'
      }
    }
  ];

  const currentSegment = segments.find(s => s.id === selectedSegment) || segments[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-black via-cyber-dark-950 to-cyber-dark-900 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-subtle opacity-10" />
      
      <div className="container-refined min-h-screen flex flex-col justify-center relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="glass-refined px-6 py-3 font-caption mb-8 border-cyber-cyan/30">
            <Brain className="h-4 w-4 mr-3 text-cyber-cyan" />
            Built for Every Creator
          </Badge>
          
          <ShaderText
            text="BUILT FOR YOUR WORKFLOW"
            className="font-display mb-6"
            duration={2000}
            delay={500}
          />
          
          <ReadableContainer transparency="medium" className="max-w-4xl mx-auto">
            <p className="font-subtitle text-white">
              Deus Vault adapts to your unique needs. Whether you're building the next unicorn startup 
              or modding your favorite game, we've got you covered.
            </p>
          </ReadableContainer>
        </motion.div>

        {/* Segment Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex justify-center">
            <div className="glass-refined rounded-xl p-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {segments.map((segment) => (
                  <motion.button
                    key={segment.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSegment(segment.id)}
                    className={`relative p-6 rounded-lg transition-all duration-300 ${
                      selectedSegment === segment.id
                        ? 'bg-cyber-cyan/20 border border-cyber-cyan/30'
                        : 'hover:bg-cyber-dark-800/50'
                    }`}
                  >
                    <div className={`${segment.color} mb-3 flex justify-center`}>
                      {segment.icon}
                    </div>
                    <div className="font-caption text-cyber-white">
                      {segment.title}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Selected Segment Content */}
        <motion.div
          key={selectedSegment}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          
          {/* Left Column - Benefits */}
          <div>
            <div className="flex items-center gap-6 mb-8">
              <div className={`${currentSegment.color}`}>
                {currentSegment.icon}
              </div>
              <div>
                <ShaderText
                  text={currentSegment.title}
                  className="font-hero mb-2"
                  duration={1500}
                  delay={200}
                />
                <ReadableContainer transparency="light">
                  <p className="font-subtitle text-white">
                    {currentSegment.subtitle}
                  </p>
                </ReadableContainer>
              </div>
            </div>

            <div className="space-y-4 mb-12">
              {currentSegment.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-cyber-cyan to-cyber-mint-bright rounded-full" />
                  <span className="font-body text-cyber-dark-200">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className={`button-primary px-8 py-6 font-subtitle bg-gradient-to-r ${currentSegment.gradient}`}>
                <Download className="mr-3 h-5 w-5" />
                {currentSegment.cta.primary}
                <ChevronRight className="ml-3 h-5 w-5" />
              </Button>
              
              <Button variant="outline" className="button-refined px-8 py-6 font-subtitle">
                <Play className="mr-3 h-5 w-5" />
                {currentSegment.cta.secondary}
              </Button>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            {currentSegment.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card-refined p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <h3 className="font-title text-cyber-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-body text-cyber-dark-300 mb-4">
                      {feature.description}
                    </p>
                    <div className={`font-subtitle ${currentSegment.color}`}>
                      {feature.metric}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* Comparison CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-refined rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="font-title text-cyber-white mb-4">
              Why Choose Deus Vault Over <span className="text-gradient">Traditional Solutions</span>?
            </h3>
            <p className="font-body text-cyber-dark-300 mb-6">
              See how Deus Vault compares to Windows, macOS, and other Linux distributions 
              for your specific workflow.
            </p>
            <Button className="button-refined px-8 py-4 font-subtitle">
              Compare Solutions
              <ChevronRight className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}