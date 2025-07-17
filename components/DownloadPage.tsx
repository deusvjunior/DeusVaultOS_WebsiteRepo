import { motion } from "framer-motion";
import { Download, Book, Star, Github, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface DownloadPageProps {
  onNavigateBack: () => void;
}

export function DownloadPage({ onNavigateBack }: DownloadPageProps) {
  const downloadOptions = [
    {
      platform: "Windows",
      version: "1.0.0",
      size: "125 MB",
      requirements: "Windows 10/11 (64-bit)",
      downloadUrl: "https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo/releases/download/v1.0.0/DeusVaultOS-Windows-x64.exe",
      icon: "🪟"
    },
    {
      platform: "macOS",
      version: "1.0.0", 
      size: "98 MB",
      requirements: "macOS 11.0+ (Intel/Apple Silicon)",
      downloadUrl: "https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo/releases/download/v1.0.0/DeusVaultOS-macOS.dmg",
      icon: "🍎"
    },
    {
      platform: "Linux",
      version: "1.0.0",
      size: "87 MB", 
      requirements: "Ubuntu 20.04+, Fedora 35+, Arch Linux",
      downloadUrl: "https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo/releases/download/v1.0.0/DeusVaultOS-Linux-x64.AppImage",
      icon: "🐧"
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: "Download",
      description: "Choose your platform and download the installer"
    },
    {
      step: 2,
      title: "Install",
      description: "Run the installer and follow the setup wizard"
    },
    {
      step: 3,
      title: "Launch",
      description: "Open DeusVaultOS and start building"
    },
    {
      step: 4,
      title: "Explore",
      description: "Try the AI assistant and development tools"
    }
  ];

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
            <Download className="h-5 w-5 mr-2" />
            Download DeusVaultOS
          </Badge>
          
          <h1 className="text-5xl md:text-7xl mb-8 bg-gradient-to-r from-white via-cyan-200 to-green-200 bg-clip-text text-transparent">
            Get Started Today
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Download DeusVaultOS for your platform and experience the future of development.
            Free to use, no registration required.
          </p>
        </motion.div>

        {/* Download Options */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {downloadOptions.map((option, index) => (
            <Card 
              key={index}
              className="bg-gray-900/50 backdrop-blur-md border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">{option.icon}</div>
                <h3 className="text-2xl text-white mb-4 group-hover:text-cyan-300 transition-colors">
                  {option.platform}
                </h3>
                <div className="space-y-2 mb-6 text-gray-400">
                  <div>Version {option.version}</div>
                  <div>{option.size}</div>
                  <div className="text-sm">{option.requirements}</div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 text-white"
                  onClick={() => window.open(option.downloadUrl, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download for {option.platform}
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Installation Steps */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl text-white mb-12 text-center">
            Quick Installation Guide
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {installationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Card className="bg-gray-900/50 backdrop-blur-md border-gray-600/30">
            <CardContent className="p-8">
              <Book className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl text-white mb-4">Documentation</h3>
              <p className="text-gray-400 mb-6">
                Get started with our comprehensive guides and tutorials.
              </p>
              <Button 
                variant="outline"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                onClick={() => onNavigateBack()}
              >
                <Book className="h-4 w-4 mr-2" />
                View Docs
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 backdrop-blur-md border-gray-600/30">
            <CardContent className="p-8">
              <Github className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-2xl text-white mb-4">Source Code</h3>
              <p className="text-gray-400 mb-6">
                Explore the source code and contribute to the project.
              </p>
              <Button 
                variant="outline"
                className="border-green-400/50 text-green-400 hover:bg-green-400/10"
                onClick={() => window.open('https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo', '_blank')}
              >
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
                <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Requirements */}
        <motion.div
          className="mt-16 bg-gray-900/30 backdrop-blur-md rounded-xl p-8 border border-gray-600/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-2xl text-white mb-6 text-center">System Requirements</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-lg text-cyan-400 mb-3">Minimum</h4>
              <ul className="text-gray-400 space-y-1">
                <li>4GB RAM</li>
                <li>2GB Storage</li>
                <li>Intel/AMD x64</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg text-green-400 mb-3">Recommended</h4>
              <ul className="text-gray-400 space-y-1">
                <li>8GB+ RAM</li>
                <li>5GB+ Storage</li>
                <li>Modern CPU</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg text-yellow-400 mb-3">Optimal</h4>
              <ul className="text-gray-400 space-y-1">
                <li>16GB+ RAM</li>
                <li>10GB+ Storage</li>
                <li>SSD Storage</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
