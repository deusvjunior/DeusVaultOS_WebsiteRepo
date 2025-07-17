import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Coins, 
  Store, 
  Users, 
  TrendingUp, 
  Gift, 
  Zap,
  Brain,
  Code2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export function MarketplaceSection() {
  const marketplaceFeatures = [
    {
      icon: <Brain className="h-10 w-10" />,
      title: "AI-Powered Creation",
      description: "Use THERION AI to build plugins, themes, and tools in minutes",
      benefit: "Create professional-grade extensions without deep coding knowledge",
      earnings: "Earn 70% revenue share"
    },
    {
      icon: <Store className="h-10 w-10" />,
      title: "Global Marketplace",
      description: "Reach millions of developers worldwide with your creations",
      benefit: "Built-in distribution and payment processing",
      earnings: "Automatic Hedera payouts"
    },
    {
      icon: <Coins className="h-10 w-10" />,
      title: "Hedera Token Economy",
      description: "Earn HBAR tokens for every download and subscription",
      benefit: "Real cryptocurrency rewards for your contributions",
      earnings: "Daily settlements"
    }
  ];

  const earningSources = [
    { type: "Free Tools", revenue: "Sponsorship ads", potential: "$50-500/month" },
    { type: "Paid Plugins", revenue: "70% revenue share", potential: "$200-5000/month" },
    { type: "Premium Themes", revenue: "Direct sales", potential: "$100-2000/month" },
    { type: "AI Assistants", revenue: "Usage-based", potential: "$500-10000/month" }
  ];

  const handleExploreMarketplace = () => {
    window.open('https://marketplace.deusvault.com', '_blank');
  };

  const handleStartSelling = () => {
    window.open('https://developer.deusvault.com', '_blank');
  };

  return (
    <section className="section-premium bg-gradient-to-b from-black via-cyan-900/20 to-black relative">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-20" />
      
      <div className="content-wrapper relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="glass-premium px-8 py-4 font-caption mb-8">
            <Sparkles className="h-5 w-5 mr-3 text-brand-primary" />
            Token Economy Powered by Hedera
          </Badge>
          
          <h2 className="font-hero text-premium-white mb-8">
            Build Once, <span className="text-gradient-cyanyellow">Earn Forever</span>
          </h2>
          
          <p className="font-subtitle text-premium-muted max-w-4xl mx-auto">
            Create AI-powered tools and extensions for the Deus Vault ecosystem. 
            Earn Hedera tokens from developers worldwide.
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="font-title text-premium-white text-center mb-16">
            Three Steps to Start Earning
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {marketplaceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="card-premium rounded-3xl p-10 interactive-premium">
                  <div className="text-brand-primary mb-6 flex justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  
                  <h4 className="font-subtitle text-premium-white mb-4">
                    {feature.title}
                  </h4>
                  
                  <p className="font-body-sm text-premium-muted mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="glass-premium rounded-xl p-4 mb-4">
                    <p className="font-body-sm text-brand-primary font-medium">
                      {feature.benefit}
                    </p>
                  </div>
                  
                  <Badge className="bg-gradient-to-r from-cyan-600 to-yellow-400 text-white font-medium px-4 py-2">
                    {feature.earnings}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Earning Potential */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="card-premium rounded-3xl p-12">
            <h3 className="font-title text-premium-white text-center mb-12">
              Revenue Opportunities
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {earningSources.map((source, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-premium rounded-2xl p-6 interactive-premium"
                >
                  <h4 className="font-subtitle text-premium-white mb-3">
                    {source.type}
                  </h4>
                  
                  <p className="font-body-sm text-premium-muted mb-4">
                    {source.revenue}
                  </p>
                  
                  <div className="text-brand-primary font-mono font-bold">
                    {source.potential}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="font-body text-premium-muted mb-6">
                Top creators earn over <span className="text-brand-primary font-bold">$50,000/month</span> 
                building for the Deus Vault ecosystem
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleStartSelling}
                  className="button-premium text-white px-8 py-4 font-body interactive-premium focus-premium"
                >
                  <Code2 className="mr-3 h-5 w-5" />
                  Start Building
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleExploreMarketplace}
                  className="glass-premium text-premium-white px-8 py-4 font-body interactive-premium focus-premium"
                >
                  <Store className="mr-3 h-5 w-5" />
                  Explore Marketplace
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-title text-premium-white mb-12">
            Join the Creator Economy
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: "50K+", label: "Active Creators", icon: <Users className="h-6 w-6" /> },
              { stat: "$2.5M", label: "Paid to Creators", icon: <TrendingUp className="h-6 w-6" /> },
              { stat: "10M+", label: "Downloads", icon: <Gift className="h-6 w-6" /> }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-premium rounded-2xl p-8"
              >
                <div className="text-brand-primary mb-4 flex justify-center">
                  {metric.icon}
                </div>
                <div className="font-hero text-brand-primary mb-2">
                  {metric.stat}
                </div>
                <div className="font-body text-premium-muted">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}