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
    <section className="py-24 bg-gradient-to-br from-black via-purple-900/10 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 225, 255, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(57, 255, 20, 0.15) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main CTA Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-gradient-to-r from-cyan-600 to-green-600 text-white px-8 py-3 text-lg">
            <Download className="h-5 w-5 mr-2" />
            Ready to Transform Your Development?
          </Badge>
          
          <h2 className="text-5xl md:text-7xl mb-8 bg-gradient-to-r from-white via-cyan-200 to-green-200 bg-clip-text text-transparent">
            Start Building the Future
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Join thousands of developers who've already made the switch to DeusVaultOS.
            <span className="block mt-4 text-cyan-300">Experience the future of development—today.</span>
          </p>

          {/* Quick Start Button */}
          <motion.div
            className="mb-16"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="text-2xl px-12 py-6 bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={() => window.open('https://github.com/deusvault/releases', '_blank')}
            >
              <Download className="h-6 w-6 mr-3" />
              Download DeusVaultOS
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                {indicator.icon}
              </div>
              <div className="text-lg text-white mb-1">{indicator.text}</div>
              <div className="text-sm text-gray-400">{indicator.highlight}</div>
            </div>
          ))}
        </motion.div>

        {/* Pricing/Download Options */}
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
                  ? 'bg-gradient-to-br from-cyan-900/30 to-green-900/30 border-cyan-400/50 shadow-xl' 
                  : 'bg-black/30 border-gray-600/30 hover:border-cyan-400/30'
              }`}
            >
              {option.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-green-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl text-white mb-2">{option.title}</h3>
                <p className="text-gray-400 mb-4">{option.description}</p>
                <div className="text-4xl text-white mb-2">
                  {option.price}
                  {option.price !== "Custom" && option.price !== "Free" && (
                    <span className="text-lg text-gray-400">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {option.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <div className="w-5 h-5 bg-gradient-to-br from-cyan-600 to-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full text-lg py-3 transition-all duration-300 ${
                  option.popular
                    ? 'bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                }`}
                onClick={() => {
                  if (option.buttonText === "Contact Sales") {
                    window.open('mailto:enterprise@deusvault.com?subject=Enterprise%20Inquiry', '_blank');
                  } else {
                    window.open('https://github.com/deusvault/releases', '_blank');
                  }
                }}
              >
                {option.buttonText}
              </Button>
            </div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="text-lg text-gray-400 mb-8">
            No lock-in. No hidden fees. Start building the future today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-3 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
              onClick={() => window.open('https://docs.deusvault.com', '_blank')}
            >
              View Documentation
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-3 border-green-400/50 text-green-400 hover:bg-green-400/10"
              onClick={() => window.open('https://github.com/deusvault/deusvault', '_blank')}
            >
              Star on GitHub
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
