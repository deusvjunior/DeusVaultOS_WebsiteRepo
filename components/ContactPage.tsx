import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    Github,
    Mail,
    MessageCircle,
    Phone,
    Twitter,
    Users
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { openSecureLink } from '../utils/safeExternalLink';

interface ContactPageProps {
  onBack: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    type: 'general'
  });

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      description: "Get in touch for general inquiries",
      contact: "hello@deusvault.com",
      action: "mailto:hello@deusvault.com",
      color: "cyan"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with our team in real-time",
      contact: "Available 24/7",
      action: "#",
      color: "yellow"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Schedule Demo",
      description: "Book a personalized platform demo",
      contact: "30-minute sessions",
      action: "#",
      color: "cyan"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Enterprise Sales",
      description: "Discuss enterprise solutions",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      color: "yellow"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      name: "GitHub",
      url: "https://github.com/deusvault",
      followers: "25k"
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      name: "Twitter",
      url: "https://twitter.com/deusvault",
      followers: "15k"
    },
    {
      icon: <Users className="h-5 w-5" />,
      name: "Discord",
      url: "https://discord.gg/deusvault",
      followers: "12k"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - implement actual backend integration
    // TODO: Integrate with backend API
    alert('Thank you! Your message has been sent.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-yellow-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,255,255,0.1),transparent_50%)]"></div>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
            Get in Touch
          </Badge>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-white to-yellow-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
            Have questions about DeusVaultOS? Need support or want to discuss enterprise solutions? 
            <span className="text-cyan-400 font-semibold"> We're here to help.</span>
          </p>
        </div>
      </motion.div>

      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Ways to Reach Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="glass-refined border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-12 h-12 bg-${method.color}-400/20 rounded-full flex items-center justify-center mx-auto`}>
                      <div className={`text-${method.color}-400`}>
                        {method.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">{method.title}</h3>
                    <p className="text-gray-400 text-sm">{method.description}</p>
                    <p className={`text-${method.color}-400 font-medium`}>{method.contact}</p>
                    
                    <Button 
                      onClick={() => openSecureLink(method.action)}
                      className={`w-full bg-gradient-to-r from-${method.color}-500 to-yellow-500 hover:from-${method.color}-400 hover:to-yellow-400 text-black font-semibold`}
                    >
                      Contact Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass-refined border-cyan-400/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company (Optional)</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50"
                        placeholder="Your company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Inquiry Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400/50"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="enterprise">Enterprise Sales</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50"
                        placeholder="Tell us how we can help..."
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-yellow-500 hover:from-cyan-400 hover:to-yellow-400 text-black font-bold py-3"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-8"
            >
              <Card className="glass-refined border-cyan-400/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Join Our Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {socialLinks.map((link, index) => (
                      <div key={link.name} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-cyan-400">
                            {link.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{link.name}</h4>
                            <p className="text-sm text-gray-400">{link.followers} followers</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => openSecureLink(link.url)}
                          variant="outline"
                          size="sm"
                          className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                        >
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-refined border-yellow-400/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Office Hours</h3>
                  <div className="space-y-2 text-gray-300">
                    <p><strong>Support:</strong> 24/7 via chat and email</p>
                    <p><strong>Sales:</strong> Mon-Fri, 9AM-6PM PST</p>
                    <p><strong>Demos:</strong> Available by appointment</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
