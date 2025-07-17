import { motion } from "framer-motion";
import { Download, ArrowRight, Star, Users, Code, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function CTASection() {
  const trustIndicators = [
    { icon: <Users className="h-5 w-5" />, text: "50k+ Developers", highlight: "Growing Community" },
    { icon: <Star className="h-5 w-5" />, text: "4.9/5 Rating", highlight: "Highly Rated" },
    { icon: <Code className="h-5 w-5" />, text: "Open Source", highlight: "No Lock-in" },
    { icon: <Shield className="h-5 w-5" />, text: "Enterprise Ready", highlight: "Production Grade" }
  ];

  const downloadOptions = [
    {
      title: "Individual Developer",
      description: "Perfect for solo developers and small teams",
      price: "Free",
      features: ["Core development environment", "AI assistant", "Community support", "5GB cloud storage"],
      buttonText: "Download Free",
      popular: false
    },
    {
      title: "Professional Team",
      description: "Advanced features for professional development teams",
      price: "$29/mo",
      features: ["Everything in Individual", "Team collaboration", "Priority support", "50GB cloud storage", "Advanced AI features"],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      title: "Enterprise",
      description: "Custom solutions for large organizations",
      price: "Custom",
      features: ["Everything in Professional", "Custom integrations", "Dedicated support", "Unlimited storage", "On-premise deployment"],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Minimal Background - Let 3D scene show through */}
      <div className="absolute inset-0 bg-black/15" />
      
      {/* Subtle accent lines for visual interest */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main CTA Header - Semi-transparent */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="backdrop-blur-sm bg-black/20 rounded-2xl p-8 border border-white/10 inline-block mb-8">
            <Badge className="mb-6 bg-gradient-to-r from-cyan-600/80 to-yellow-400/80 backdrop-blur-sm text-white px-8 py-3 text-lg border border-cyan-400/30">
              <Download className="h-5 w-5 mr-2" />
              Ready to Transform Your Development?
            </Badge>
            
            <h2 className="text-5xl md:text-7xl mb-8 bg-gradient-to-r from-white via-cyan-200 to-yellow-200 bg-clip-text text-transparent" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
              Start Building the Future
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>
              Join thousands of developers who've already made the switch to DeusVaultOS.
              <span className="block mt-4 text-cyan-300">Experience the future of development—today.</span>
            </p>
          </div>

          {/* Quick Start Button */}
          <motion.div
            className="mb-16"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="text-2xl px-12 py-6 bg-gradient-to-r from-cyan-600/80 to-yellow-400/80 backdrop-blur-sm hover:from-cyan-500/90 hover:to-yellow-300/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-cyan-400/30"
              onClick={() => window.open('https://github.com/deusvault/releases', '_blank')}
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
            >
              <Download className="h-6 w-6 mr-3" />
              Download DeusVaultOS
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Indicators - Transparent */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-600/70 to-yellow-400/70 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyan-400/30">
                {indicator.icon}
              </div>
              <div className="text-lg text-white mb-1" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>{indicator.text}</div>
              <div className="text-sm text-gray-300" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>{indicator.highlight}</div>
            </div>
          ))}
        </motion.div>

        {/* Pricing/Download Options - Mixed transparency */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {downloadOptions.map((option, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl p-8 backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                option.popular 
                  ? 'bg-gradient-to-br from-cyan-900/40 to-yellow-900/40 border-cyan-400/60 shadow-xl' 
                  : index % 2 === 0 
                    ? 'bg-black/20 border-gray-600/30 hover:border-cyan-400/30' // Transparent cards
                    : 'bg-black/40 border-gray-600/40 hover:border-cyan-400/40' // Semi-opaque cards
              }`}
            >
              {option.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-600/80 to-yellow-400/80 backdrop-blur-sm text-white px-4 py-1 border border-cyan-400/30">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl text-white mb-2" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}>{option.title}</h3>
                <p className="text-gray-300 mb-4" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>{option.description}</p>
                <div className="text-4xl text-white mb-2" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}>
                  {option.price}
                  {option.price !== "Custom" && option.price !== "Free" && (
                    <span className="text-lg text-gray-400">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {option.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-200" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
                    <ArrowRight className="h-4 w-4 text-yellow-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full text-lg py-3 transition-all duration-300 ${
                  option.popular
                    ? 'bg-gradient-to-r from-cyan-600/80 to-yellow-400/80 backdrop-blur-sm hover:from-cyan-500/90 hover:to-yellow-300/90 text-white border border-cyan-400/30'
                    : 'bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/70 text-white border border-gray-600/40'
                }`}
                onClick={() => {
                  if (option.buttonText === "Contact Sales") {
                    window.open('mailto:enterprise@deusvault.com?subject=Enterprise%20Inquiry', '_blank');
                  } else {
                    window.open('https://github.com/deusvault/releases', '_blank');
                  }
                }}
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
              >
                {option.buttonText}
              </Button>
            </div>
          ))}
        </motion.div>

        {/* Final CTA - Transparent */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="backdrop-blur-sm bg-black/20 rounded-2xl p-8 border border-white/10 inline-block">
            <p className="text-lg text-gray-200 mb-8" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
              No lock-in. No hidden fees. Start building the future today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-3 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 backdrop-blur-sm"
                onClick={() => window.open('https://docs.deusvault.com', '_blank')}
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
              >
                View Documentation
              </Button>
              
              <Button 
                size="lg"
                className="text-lg px-8 py-3 bg-gradient-to-r from-yellow-600/80 to-cyan-600/80 backdrop-blur-sm text-white border border-yellow-400/30"
                onClick={() => window.open('https://discord.gg/deusvault', '_blank')}
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
              >
                Join Community
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
