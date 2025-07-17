import { motion } from 'framer-motion';
import {
    ArrowRight,
    Calendar,
    Github,
    Linkedin,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    Twitter
} from 'lucide-react';
import { useState } from 'react';
import { VideoPlaceholder } from './VideoPlaceholder';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
    inquiryType: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "Get in touch for general inquiries",
      contact: "hello@deusvaultos.com",
      action: "mailto:hello@deusvaultos.com",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with our team in real-time",
      contact: "Available 24/7",
      action: "#",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Schedule Demo",
      description: "Book a personalized platform demo",
      contact: "30-minute sessions",
      action: "#",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Enterprise Sales",
      description: "Discuss enterprise solutions",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, label: "GitHub", url: "https://github.com/deusvaultos" },
    { icon: <Twitter className="h-5 w-5" />, label: "Twitter", url: "https://twitter.com/deusvaultos" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", url: "https://linkedin.com/company/deusvaultos" }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Innovation Drive, Suite 100",
      description: "Global Headquarters"
    },
    {
      city: "London", 
      address: "456 Tech Square, Floor 15",
      description: "European Operations"
    },
    {
      city: "Singapore",
      address: "789 Digital Hub, Level 20",
      description: "Asia-Pacific Division"
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
          className="text-center"
        >
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            Get in{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
          >
            Ready to revolutionize your AI development workflow? We're here to help you get started.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          >
            <h2 
              className="text-3xl font-bold text-white mb-8"
              style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
            >
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="Your role"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Inquiry Type
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                >
                  <option value="general">General Inquiry</option>
                  <option value="enterprise">Enterprise Sales</option>
                  <option value="partnership">Partnership</option>
                  <option value="support">Technical Support</option>
                  <option value="media">Media & Press</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project and how we can help..."
                />
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
              >
                <Send className="h-5 w-5" />
                Send Message
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Methods & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            
            {/* Contact Methods */}
            <div>
              <h3 
                className="text-2xl font-bold text-white mb-6"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
              >
                Other Ways to Reach Us
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.action}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-black/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 block"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${method.gradient} flex items-center justify-center text-white mb-4`}>
                      {method.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{method.title}</h4>
                    <p className="text-gray-300 text-sm mb-2">{method.description}</p>
                    <p className="text-cyan-400 text-sm font-medium">{method.contact}</p>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Demo Video */}
            <div className="bg-black/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 
                className="text-xl font-bold text-white mb-4"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
              >
                See Our Team in Action
              </h3>
              <VideoPlaceholder
                placeholder="Meet the DeusVaultOS Team"
                aspectRatio="16:9"
                autoplay={false}
                loop={true}
                overlay={true}
              />
            </div>

            {/* Social Links */}
            <div>
              <h3 
                className="text-xl font-bold text-white mb-4"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
              >
                Follow Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400 transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Offices */}
            <div>
              <h3 
                className="text-xl font-bold text-white mb-4"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
              >
                <MapPin className="h-5 w-5 inline mr-2" />
                Our Offices
              </h3>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <motion.div
                    key={office.city}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-black/10 backdrop-blur-md rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-white font-semibold">{office.city}</h4>
                        <p className="text-gray-300 text-sm">{office.address}</p>
                        <p className="text-cyan-400 text-xs">{office.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
