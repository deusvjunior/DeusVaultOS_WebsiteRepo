import { motion } from 'framer-motion';
import {
    ArrowRight,
    Brush,
    CheckCircle,
    Code,
    Crown,
    Database,
    Download,
    Gamepad2,
    Globe,
    Play,
    Sparkles,
    Star,
    Store,
    Users,
    Zap
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface MarketplaceSectionProps {
  onNavigateToSubpage?: (subpage: string) => void;
  onBack?: () => void;
}

export function MarketplaceSection({ onNavigateToSubpage, onBack }: MarketplaceSectionProps) {
  const featuredApps = [
    {
      name: "THERION AI Studio",
      category: "AI Development",
      description: "Professional AI development suite with neural network designer and training tools",
      icon: <Code className="h-8 w-8" />,
      rating: 4.9,
      downloads: "2.3M",
      price: "Free",
      videoSrc: "/videos/therion-studio-demo.mp4",
      videoPoster: "/thumbs/therion-studio-thumb.jpg",
      features: ["Neural Network Designer", "Auto-ML Pipeline", "Model Deployment", "Real-time Training"],
      color: "cyan",
      featured: true
    },
    {
      name: "GameDev Pro Suite",
      category: "Game Development", 
      description: "Complete game development environment with Unity, Unreal, and custom engine support",
      icon: <Gamepad2 className="h-8 w-8" />,
      rating: 4.8,
      downloads: "1.8M",
      price: "Free",
      videoSrc: "/videos/gamedev-suite-demo.mp4",
      videoPoster: "/thumbs/gamedev-suite-thumb.jpg",
      features: ["Unity Integration", "Unreal Support", "Asset Pipeline", "Performance Profiler"],
      color: "yellow",
      featured: true
    },
    {
      name: "Design System Pro",
      category: "UI/UX Design",
      description: "Advanced design tools with AI-powered component generation and design systems",
      icon: <Brush className="h-8 w-8" />,
      rating: 4.7,
      downloads: "950K",
      price: "Free",
      videoSrc: "/videos/design-system-demo.mp4", 
      videoPoster: "/thumbs/design-system-thumb.jpg",
      features: ["Component Library", "Design Tokens", "AI Generation", "Figma Sync"],
      color: "cyan",
      featured: true
    },
    {
      name: "DataVault Analytics",
      category: "Data Science",
      description: "Professional data science and analytics platform with ML model training",
      icon: <Database className="h-8 w-8" />,
      rating: 4.9,
      downloads: "1.2M",
      price: "Free",
      videoSrc: "/videos/datavault-demo.mp4",
      videoPoster: "/thumbs/datavault-thumb.jpg", 
      features: ["Jupyter Integration", "ML Pipelines", "Data Visualization", "Model Deployment"],
      color: "yellow",
      featured: true
    }
  ];

  const categories = [
    {
      name: "Development Tools",
      icon: <Code className="h-6 w-6" />,
      count: "450+",
      description: "IDEs, debuggers, compilers, and development utilities",
      color: "cyan"
    },
    {
      name: "AI & Machine Learning",
      icon: <Zap className="h-6 w-6" />,
      count: "200+", 
      description: "Neural networks, ML frameworks, and AI development tools",
      color: "yellow"
    },
    {
      name: "Game Development",
      icon: <Gamepad2 className="h-6 w-6" />,
      count: "320+",
      description: "Game engines, asset tools, and game development utilities",
      color: "cyan"
    },
    {
      name: "Design & Creative",
      icon: <Brush className="h-6 w-6" />,
      count: "180+",
      description: "Design tools, image editors, and creative applications",
      color: "yellow"
    },
    {
      name: "Data & Analytics",
      icon: <Database className="h-6 w-6" />,
      count: "150+",
      description: "Data processing, visualization, and analytics platforms", 
      color: "cyan"
    },
    {
      name: "Web Development",
      icon: <Globe className="h-6 w-6" />,
      count: "500+",
      description: "Web frameworks, browsers, and deployment tools",
      color: "yellow"
    }
  ];

  const marketplaceStats = [
    { label: "Total Apps", value: "2,500+" },
    { label: "Downloads", value: "50M+" },
    { label: "Developers", value: "25K+" },
    { label: "Average Rating", value: "4.8★" }
  ];

  return (
    <div className="space-y-20 container-responsive py-20">
      
      {/* **MARKETPLACE HERO WITH VIDEO** */}
      <div className="relative overflow-hidden rounded-3xl">
        {/* Background video */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            poster="/marketplace-hero-thumb.jpg"
          >
            <source src="/videos/marketplace-overview.mp4" type="video/mp4" />
            <source src="/videos/marketplace-overview.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-yellow-900/30"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 text-center py-20 px-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-cyan-500/50">
            <Store className="h-8 w-8 text-black" />
          </div>

          <Badge variant="outline" className="text-cyan-400 border-cyan-400/50 px-6 py-2 mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            APP MARKETPLACE
          </Badge>
          
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-white to-yellow-400 bg-clip-text text-transparent mb-6">
            App Marketplace
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Thousands of professional applications, tools, and utilities. 
            <span className="text-cyan-400 font-semibold"> Everything you need</span> in one place.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-2xl mx-auto">
            {marketplaceStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <Button 
            onClick={() => onNavigateToSubpage?.('download')}
            className="bg-gradient-to-r from-cyan-500 to-yellow-500 hover:from-cyan-400 hover:to-yellow-400 text-black font-bold px-8 py-4 text-lg transform hover:scale-105"
          >
            <Store className="mr-2 h-5 w-5" />
            Browse Marketplace
          </Button>
        </motion.div>
      </div>

      {/* **FEATURED APPS WITH VIDEOS** */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-bold text-white">Featured Applications</h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional-grade applications developed by the community and core team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredApps.map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <Card className={`glass-refined border-${app.color}-400/30 hover:border-${app.color}-400/50 transition-all duration-500 overflow-hidden`}>
                {app.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/50">
                      <Crown className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                <CardContent className="p-0">
                  
                  {/* App Demo Video */}
                  <div className="relative aspect-video">
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-full object-cover"
                      poster={app.videoPoster}
                    >
                      <source src={app.videoSrc} type="video/mp4" />
                    </video>
                    
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Play className={`h-12 w-12 text-${app.color}-400`} />
                    </div>

                    {/* App icon overlay */}
                    <div className={`absolute top-4 right-4 w-12 h-12 bg-${app.color}-400/20 rounded-lg flex items-center justify-center backdrop-blur-sm`}>
                      <div className={`text-${app.color}-400`}>
                        {app.icon}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* App header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold text-white">{app.name}</h4>
                        <Badge variant="outline" className={`text-${app.color}-400 border-${app.color}-400/50`}>
                          {app.price}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{app.category}</p>
                      <p className="text-gray-300">{app.description}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{app.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{app.downloads}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-gray-300">Key Features:</h5>
                      <div className="grid grid-cols-2 gap-1">
                        {app.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className={`h-3 w-3 text-${app.color}-400 flex-shrink-0`} />
                            <span className="text-xs text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button 
                      onClick={() => onNavigateToSubpage?.('download')}
                      className={`w-full bg-gradient-to-r from-${app.color}-500 to-yellow-500 hover:from-${app.color}-400 hover:to-yellow-400 text-black font-semibold transition-all transform hover:scale-[1.02]`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Install Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* **APP CATEGORIES** */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-bold text-white">Browse by Category</h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover applications organized by development focus and use case
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass-refined rounded-lg p-6 border border-${category.color}-400/30 hover:border-${category.color}-400/50 transition-all group cursor-pointer`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 bg-${category.color}-400/20 rounded-lg flex items-center justify-center group-hover:bg-${category.color}-400/30 transition-colors`}>
                  <div className={`text-${category.color}-400`}>
                    {category.icon}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{category.name}</h4>
                  <div className={`text-${category.color}-400 font-medium`}>{category.count} apps</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{category.description}</p>
              
              <div className="mt-4 flex items-center text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors">
                Browse category
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* **DEVELOPER CTA** */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/60 to-yellow-900/60"></div>
        
        <div className="relative z-10 text-center py-16 px-8">
          <Users className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
          
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Build for the Marketplace
          </h3>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers building the future of professional software. 
            Publish your apps and reach millions of users.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigateToSubpage?.('documentation')}
              className="bg-gradient-to-r from-cyan-500 to-yellow-500 hover:from-cyan-400 hover:to-yellow-400 text-black font-bold px-8 py-4 text-lg transform hover:scale-105"
            >
              <Code className="mr-2 h-5 w-5" />
              Developer Portal
            </Button>
            <Button 
              onClick={() => onNavigateToSubpage?.('documentation')}
              variant="outline" 
              className="border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 px-8 py-4 text-lg"
            >
              View Guidelines
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
