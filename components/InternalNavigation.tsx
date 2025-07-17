import { motion } from "framer-motion";
import { Download, Book, Building, Home } from "lucide-react";
import { Button } from "./ui/button";

interface InternalNavigationProps {
  onNavigate: (page: 'home' | 'download' | 'documentation' | 'enterprise') => void;
  currentPage?: string;
}

export function InternalNavigation({ onNavigate, currentPage = 'home' }: InternalNavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'download', label: 'Download', icon: Download },
    { id: 'documentation', label: 'Docs', icon: Book },
    { id: 'enterprise', label: 'Enterprise', icon: Building },
  ];

  return (
    <motion.nav
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-black/20 backdrop-blur-md border border-gray-600/30 rounded-full px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mr-4">
          DeusVaultOS
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.id as any)}
                className={`
                  flex items-center space-x-2 transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-cyan-600 to-green-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }
                `}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
