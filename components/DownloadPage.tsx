import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle,
    Download,
    ExternalLink,
    Github,
    HardDrive,
    Monitor,
    Package,
    Shield,
    Star,
    Terminal,
    Zap
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { openSecureLink } from '../utils/safeExternalLink';

interface DownloadPageProps {
  onBack: () => void;
}

export function DownloadPage({ onBack }: DownloadPageProps) {
  const downloadOptions = [
    {
      title: "Windows",
      subtitle: "Windows 10, 11 (x64)",
      icon: <Monitor className="h-8 w-8" />,
      size: "450 MB",
      version: "v1.0.0",
      downloadUrl: "https://releases.deusvault.com/windows/latest",
      recommended: true,
      features: [
        "Full feature support",
        "Auto-update mechanism",
        "Windows integration",
        "PowerShell enhancement"
      ]
    },
    {
      title: "macOS",
      subtitle: "macOS 11+ (Universal)",
      icon: <Monitor className="h-8 w-8" />,
      size: "380 MB",
      version: "v1.0.0",
      downloadUrl: "https://releases.deusvault.com/macos/latest",
      recommended: false,
      features: [
        "Native Apple Silicon",
        "macOS integration",
        "Homebrew support",
        "Terminal enhancement"
      ]
    },
    {
      title: "Linux",
      subtitle: "Ubuntu, Debian, Fedora",
      icon: <Terminal className="h-8 w-8" />,
      size: "320 MB",
      version: "v1.0.0",
      downloadUrl: "https://releases.deusvault.com/linux/latest",
      recommended: false,
      features: [
        "AppImage format",
        "Native performance",
        "Shell integration",
        "Package manager support"
      ]
    }
  ];

  const systemRequirements = {
    minimum: [
      "4 GB RAM",
      "2 GB storage space",
      "Intel/AMD 64-bit processor",
      "Internet connection"
    ],
    recommended: [
      "8 GB RAM or more",
      "4 GB storage space",
      "Multi-core processor",
      "SSD storage for optimal performance"
    ]
  };

  const installationMethods = [
    {
      title: "Direct Download",
      description: "Download and install directly from our servers",
      icon: <Download className="h-6 w-6 text-blue-400" />,
      steps: [
        "Click download button for your platform",
        "Run the installer with administrator privileges",
        "Follow the installation wizard",
        "Launch DeusVaultOS from desktop or start menu"
      ]
    },
    {
      title: "Package Managers",
      description: "Install via your system's package manager",
      icon: <Package className="h-6 w-6 text-green-400" />,
      steps: [
        "Windows: winget install DeusVault.DeusVaultOS",
        "macOS: brew install --cask deusvault-os", 
        "Linux: snap install deusvault-os",
        "Alternative: Use our APT/YUM repositories"
      ]
    },
    {
      title: "Build from Source",
      description: "Compile from source code for maximum control",
      icon: <Github className="h-6 w-6 text-purple-400" />,
      steps: [
        "Clone repository: git clone https://github.com/deusvault/deusvault-os",
        "Install dependencies: npm install",
        "Build: npm run build",
        "Package: npm run package"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
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
          
          <Badge variant="outline" className="text-green-400 border-green-400/50">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            Ready for Download
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
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-clip-text text-transparent">
            Download DeusVaultOS
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
            Get started with the most advanced development environment.
            <span className="text-blue-400 font-semibold"> Free, open-source, and ready to transform your workflow.</span>
          </p>

          <div className="flex items-center justify-center gap-4">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-400">4.9/5 stars from developers worldwide</span>
          </div>
        </div>
      </motion.div>

      {/* Download Options */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Choose Your Platform</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {downloadOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="relative"
              >
                {option.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-4 py-1">
                      <Star className="mr-1 h-4 w-4" />
                      Recommended
                    </Badge>
                  </div>
                )}
                
                <Card className={`glass-refined transition-all duration-300 h-full ${
                  option.recommended 
                    ? 'border-blue-400/50 bg-blue-400/5 shadow-lg shadow-blue-400/20' 
                    : 'border-gray-600/30 hover:border-gray-600/50'
                }`}>
                  <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full ${
                        option.recommended ? 'bg-blue-400/20' : 'bg-gray-600/20'
                      }`}>
                        {option.icon}
                      </div>
                    </div>
                    
                    <CardTitle className="text-white text-2xl">{option.title}</CardTitle>
                    <p className="text-gray-400">{option.subtitle}</p>
                    
                    <div className="flex justify-center gap-4 text-sm text-gray-400 mt-2">
                      <span>{option.size}</span>
                      <span>•</span>
                      <span>{option.version}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`w-full ${option.recommended 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white' 
                        : 'bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 text-white'
                      } font-semibold py-3 transform hover:scale-[1.02] transition-all`}
                      onClick={() => openSecureLink(option.downloadUrl)}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download for {option.title}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* System Requirements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">System Requirements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-refined border-yellow-400/30 bg-yellow-400/5">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-yellow-400" />
                  Minimum Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemRequirements.minimum.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{req}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-refined border-green-400/30 bg-green-400/5">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-400" />
                  Recommended Specs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemRequirements.recommended.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{req}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Installation Methods */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Installation Methods</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {installationMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="glass-refined border-blue-400/30 bg-blue-400/5 h-full">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-blue-400/20">
                        {method.icon}
                      </div>
                    </div>
                    <CardTitle className="text-white text-xl">{method.title}</CardTitle>
                    <p className="text-gray-300 text-sm">{method.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      {method.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-400 text-xs font-bold">{idx + 1}</span>
                          </div>
                          <span className="text-gray-300 text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Security & Trust */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-refined border-green-400/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
            <CardContent className="p-12">
              <Shield className="h-16 w-16 text-green-400 mx-auto mb-6" />
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Secure & Trusted
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                All downloads are cryptographically signed and verified. 
                Open source means transparency and security you can trust.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => openSecureLink('https://github.com/deusvault/deusvault-os/releases')}
                  variant="outline" 
                  className="border-green-400/50 text-green-400 hover:bg-green-400/10"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View Source Code
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => openSecureLink('https://github.com/deusvault/deusvault-os/security')}
                  variant="outline" 
                  className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Security Policy
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="mt-8 text-sm text-gray-400">
                GPG signatures available • SHA256 checksums verified • No telemetry or tracking
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
