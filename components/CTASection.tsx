import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle,
    Code,
    Crown,
    Download,
    Github,
    Globe,
    MessageCircle,
    Shield,
    Star,
    Twitter,
    Users,
    Zap
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function CTASection({ onNavigateToSubpage }: { onNavigateToSubpage?: (subpage: string) => void }) {
  const trustIndicators = [
    { icon: <Users className="h-5 w-5" />, text: "Developer Community", highlight: "Growing Daily", stat: "5k+" },
    { icon: <Code className="h-5 w-5" />, text: "AI Agents", highlight: "In Development", stat: "15" },
    { icon: <Star className="h-5 w-5" />, text: "Launch Date", highlight: "Q4 2025", stat: "Soon" },
    { icon: <Zap className="h-5 w-5" />, text: "Performance", highlight: "Optimized", stat: "Fast" }
  ];

  const downloadOptions = [
    {
      title: "Beta Access",
      description: "Get exclusive early access to our AI agent platform",
      price: "Free",
      priceNote: "Limited Spots",
      features: [
        "15 specialized AI agents", 
        "Complete development platform", 
        "Advanced automation tools", 
        "Community access",
        "Priority support",
        "Early feature previews"
      ],
      buttonText: "Get Beta Access",
      buttonIcon: <Download className="h-5 w-5" />,
      popular: true,
      color: "cyan"
    },
    {
      title: "Live Demo",
      description: "See our AI agents in action right now",
      price: "Free",
      priceNote: "Interactive",
      features: [
        "Live AI agent demonstrations", 
        "Real-time capabilities", 
        "Interactive examples", 
        "Feature walkthrough", 
        "Q&A sessions",
        "Technical deep-dives",
        "Use case scenarios",
        "Performance benchmarks"
      ],
      buttonText: "Watch Demo",
      buttonIcon: <Zap className="h-5 w-5" />,
      popular: false,
      color: "yellow"
    },
    {
      title: "Developer Hub",
      description: "Join our growing community of AI developers",
      price: "Free",
      priceNote: "Open Access",
      features: [
        "Technical documentation", 
        "API references", 
        "Code examples", 
        "Best practices", 
        "Community forums",
        "Expert mentorship",
        "Hackathons & events",
        "Job opportunities"
      ],
      buttonText: "Join Community",
      buttonIcon: <Users className="h-5 w-5" />,
      popular: false,
      color: "cyan"
    }
  ];

  const communityLinks = [
    {
      platform: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/deusvault",
      followers: "25k",
      description: "Open source projects"
    },
    {
      platform: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: "https://twitter.com/deusvault",
      followers: "15k",
      description: "Latest updates"
    },
    {
      platform: "Discord",
      icon: <MessageCircle className="h-5 w-5" />,
      url: "https://discord.gg/deusvault",
      followers: "12k",
      description: "Community chat"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      
      {/* **DRAMATIC CTA VIDEO BACKGROUND** */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-25"
          poster="/cta-background-thumb.jpg"
        >
          <source src="/videos/cta-future-coding.mp4" type="video/mp4" />
          <source src="/videos/cta-future-coding.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      </div>
      
      {/* **ENHANCED CTA CONTENT** */}
      <div className="relative z-10 container-responsive space-y-20">
        
        {/* Hero CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/50 px-6 py-2">
            <Zap className="h-4 w-4 mr-2" />
            GET STARTED TODAY
          </Badge>
          
                    <h2 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-white to-yellow-400 bg-clip-text text-transparent">
            Join the Beta
          </h2>
          
          <p className="text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto">
            Get early access to DeusVaultOS with 15 AI development agents. 
            <span className="text-cyan-400 font-semibold"> Limited beta spots</span> for 
            our Q4 2025 launch.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center space-y-2"
              >
                <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto">
                  <div className="text-cyan-400">
                    {indicator.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{indicator.stat}</div>
                <div className="text-sm text-gray-400">{indicator.highlight}</div>
              </motion.div>
            ))}
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={() => onNavigateToSubpage?.('download')}
              className="bg-gradient-to-r from-cyan-500 to-yellow-500 hover:from-cyan-400 hover:to-yellow-400 text-black font-bold px-12 py-6 text-xl transform hover:scale-105 shadow-2xl shadow-cyan-500/25"
            >
              <Download className="mr-3 h-6 w-6" />
              Get Beta Access
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <Button 
              onClick={() => onNavigateToSubpage?.('demo')}
              variant="outline" 
              className="border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 px-12 py-6 text-xl"
            >
              <Crown className="mr-3 h-6 w-6" />
              View Demo
            </Button>
          </div>
        </motion.div>

        {/* **PRICING PLANS** */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-bold text-white">Choose Your Access Level</h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get access to DeusVaultOS beta program and join our developer community.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {downloadOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/50 px-4 py-1">
                      <Crown className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card className={`glass-refined border-${option.color}-400/30 hover:border-${option.color}-400/50 transition-all duration-500 ${option.popular ? 'scale-105 shadow-2xl shadow-yellow-500/20' : ''}`}>
                  <CardContent className="p-8 space-y-6">
                    
                    {/* Plan header */}
                    <div className="text-center space-y-3">
                      <h4 className="text-2xl font-bold text-white">{option.title}</h4>
                      <p className="text-gray-400">{option.description}</p>
                      
                      <div className="space-y-1">
                        <div className="flex items-end justify-center gap-2">
                          <span className={`text-4xl font-bold text-${option.color}-400`}>
                            {option.price}
                          </span>
                          <span className="text-gray-400 mb-1">{option.priceNote}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="font-semibold text-gray-300">What's included:</h5>
                      <div className="space-y-2">
                        {option.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className={`h-4 w-4 text-${option.color}-400 flex-shrink-0 mt-0.5`} />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      onClick={() => {
                        if (option.title === "Beta Access") {
                          onNavigateToSubpage?.('download');
                        } else if (option.title === "Live Demo") {
                          onNavigateToSubpage?.('demo');
                        } else if (option.title === "Developer Hub") {
                          window.open('https://github.com/deusvault', '_blank');
                        }
                      }}
                      className={`w-full ${option.popular 
                        ? 'bg-gradient-to-r from-yellow-500 to-cyan-500 hover:from-yellow-400 hover:to-cyan-400 text-black' 
                        : `bg-gradient-to-r from-${option.color}-500 to-yellow-500 hover:from-${option.color}-400 hover:to-yellow-400 text-black`
                      } font-semibold py-3 transform hover:scale-[1.02] transition-all`}
                    >
                      {option.buttonIcon}
                      <span className="ml-2">{option.buttonText}</span>
                    </Button>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* **COMMUNITY SECTION** */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-bold text-white">Developer Community</h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Connect with developers using DeusVaultOS and contribute to the platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {communityLinks.map((link, index) => (
              <motion.div
                key={link.platform}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-refined rounded-lg p-6 border border-cyan-400/30 hover:border-cyan-400/50 transition-all group cursor-pointer"
                onClick={() => window.open(link.url, '_blank')}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-cyan-400/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-400/30 transition-colors">
                    <div className="text-cyan-400">
                      {link.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{link.platform}</h4>
                    <div className="text-cyan-400 font-medium">{link.followers} members</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{link.description}</p>
                
                <div className="mt-4 flex items-center text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors">
                  Join community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* **FINAL CALL TO ACTION** */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-yellow-900/80"></div>
          
          <div className="relative z-10 text-center py-16 px-8">
            <Globe className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
            
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Download DeusVaultOS and experience AI-powered development with 15 specialized agents.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigateToSubpage?.('download')}
                className="bg-gradient-to-r from-cyan-500 to-yellow-500 hover:from-cyan-400 hover:to-yellow-400 text-black font-bold px-12 py-4 text-lg transform hover:scale-105"
              >
                <Download className="mr-3 h-5 w-5" />
                Get Beta Access
              </Button>
              <Button 
                variant="outline" 
                className="border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 px-12 py-4 text-lg"
                onClick={() => window.open('https://github.com/DeusVault', '_blank')}
              >
                <Github className="mr-3 h-5 w-5" />
                View on GitHub
              </Button>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              Beta access • Q4 2025 launch • Open source platform
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
