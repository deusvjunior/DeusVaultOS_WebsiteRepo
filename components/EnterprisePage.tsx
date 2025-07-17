import { motion } from "framer-motion";
import { Building, Shield, Zap, Users, Mail, Calendar, Phone, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface EnterprisePageProps {
  onNavigateBack: () => void;
}

export function EnterprisePage({ onNavigateBack }: EnterprisePageProps) {
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const enterpriseFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Advanced security protocols, SSO integration, and compliance features"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Centralized user management, role-based access, and team collaboration tools"
    },
    {
      icon: Zap,
      title: "Performance at Scale",
      description: "Optimized for large teams and complex projects with unlimited resources"
    },
    {
      icon: Building,
      title: "Custom Integration",
      description: "Custom APIs, plugins, and integrations tailored to your infrastructure"
    }
  ];

  const pricingTiers = [
    {
      name: "Team",
      price: "$49",
      period: "per user/month",
      description: "Perfect for growing development teams",
      features: [
        "Up to 50 users",
        "Advanced collaboration tools", 
        "Priority support",
        "Team analytics",
        "Custom templates"
      ]
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per user/month", 
      description: "For large organizations with advanced needs",
      features: [
        "Unlimited users",
        "Enterprise security",
        "24/7 dedicated support",
        "Custom integrations",
        "On-premise deployment",
        "SLA guarantees"
      ],
      popular: true
    },
    {
      name: "Custom",
      price: "Contact Us",
      period: "tailored pricing",
      description: "Fully customized solution for your organization",
      features: [
        "Custom feature development",
        "Dedicated infrastructure",
        "White-label options",
        "Custom training programs",
        "Dedicated account manager"
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    alert(`Thank you ${formData.company}! We'll be in touch within 24 hours.`);
    setFormData({ company: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Button
            variant="outline"
            onClick={onNavigateBack}
            className="mb-8 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
          >
            ← Back to Home
          </Button>
          
          <Badge className="mb-6 bg-gradient-to-r from-cyan-600 to-green-600 text-white px-8 py-3 text-lg">
            <Building className="h-5 w-5 mr-2" />
            Enterprise Solutions
          </Badge>
          
          <h1 className="text-5xl md:text-7xl mb-8 bg-gradient-to-r from-white via-cyan-200 to-green-200 bg-clip-text text-transparent">
            Scale with DeusVaultOS
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade development environment with advanced security, 
            team management, and unlimited scalability for your organization.
          </p>
        </motion.div>

        {/* Enterprise Features */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {enterpriseFeatures.map((feature, index) => (
            <Card 
              key={index}
              className="bg-gray-900/50 backdrop-blur-md border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <feature.icon className="h-12 w-12 text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors" />
                <h3 className="text-2xl text-white mb-4 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Pricing Tiers */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl text-white mb-12 text-center">
            Enterprise Pricing
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index}
                className={`bg-gray-900/50 backdrop-blur-md border-gray-600/30 transition-all duration-300 ${
                  tier.popular 
                    ? 'border-cyan-400/50 ring-2 ring-cyan-400/20 scale-105' 
                    : 'hover:border-cyan-400/30'
                }`}
              >
                <CardContent className="p-8 text-center">
                  {tier.popular && (
                    <Badge className="mb-4 bg-gradient-to-r from-cyan-600 to-green-600 text-white">
                      Most Popular
                    </Badge>
                  )}
                  
                  <h3 className="text-2xl text-white mb-2">{tier.name}</h3>
                  <div className="text-3xl text-cyan-400 mb-2">{tier.price}</div>
                  <div className="text-gray-400 mb-6">{tier.period}</div>
                  <p className="text-gray-300 mb-8">{tier.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-300 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                    onClick={() => {
                      const contactSection = document.getElementById('contact-form');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {tier.name === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          id="contact-form"
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl text-white mb-12 text-center">
            Contact Enterprise Sales
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl text-white mb-6">Get in Touch</h3>
              <p className="text-gray-400 mb-8">
                Our enterprise team is ready to help you scale your development operations.
                Schedule a demo or contact us directly.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-cyan-400 mr-4" />
                  <div>
                    <div className="text-white">Email</div>
                    <div className="text-gray-400">enterprise@deusvault.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-cyan-400 mr-4" />
                  <div>
                    <div className="text-white">Phone</div>
                    <div className="text-gray-400">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-cyan-400 mr-4" />
                  <div>
                    <div className="text-white">Schedule Demo</div>
                    <div className="text-gray-400">Available weekdays 9am-6pm EST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gray-900/50 backdrop-blur-md border-gray-600/30">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-white mb-2 block">Company Name</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-white mb-2 block">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-white mb-2 block">Phone (Optional)</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-gray-800/50 border-gray-600/50 text-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white mb-2 block">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-gray-800/50 border-gray-600/50 text-white min-h-[120px]"
                      placeholder="Tell us about your team size, requirements, and timeline..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="bg-gray-900/30 backdrop-blur-md rounded-xl p-8 border border-gray-600/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-2xl text-white mb-6 text-center">Trusted by Leading Organizations</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl text-cyan-400 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl text-green-400 mb-2">24/7</div>
              <div className="text-gray-400">Support Available</div>
            </div>
            <div>
              <div className="text-3xl text-yellow-400 mb-2">SOC 2</div>
              <div className="text-gray-400">Compliant</div>
            </div>
            <div>
              <div className="text-3xl text-purple-400 mb-2">500+</div>
              <div className="text-gray-400">Enterprise Customers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
