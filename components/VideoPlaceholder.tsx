import { Play, Volume2 } from "lucide-react";
import { useState } from "react";

interface VideoPlaceholderProps {
  className?: string;
  aspectRatio?: "16:9" | "1:1" | "4:3";
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  placeholder?: string;
  overlay?: boolean;
}

export function VideoPlaceholder({ 
  className = "", 
  aspectRatio = "16:9", 
  autoplay = false, // Default to false - no autoplay
  loop = true,
  muted = true,
  placeholder = "Demo Video Placeholder",
  overlay = false
}: VideoPlaceholderProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const aspectClasses = {
    "16:9": "aspect-video",
    "1:1": "aspect-square", 
    "4:3": "aspect-[4/3]"
  };

  return (
    <div 
      className={`relative ${aspectClasses[aspectRatio]} bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-xl overflow-hidden border border-cyan-400/30 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Background Pattern */}
      <div className="absolute inset-0 bg-black/40">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10" />
          <div className="absolute inset-0 bg-dots-pattern opacity-20" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          {/* Play Button */}
          <div className={`w-16 h-16 rounded-full bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center mb-4 mx-auto transition-all duration-300 ${isHovered ? 'scale-110 bg-cyan-400/30' : ''}`}>
            <Play className="h-8 w-8 text-cyan-400 ml-1" fill="currentColor" />
          </div>
          
          {/* Video Info */}
          <div className="backdrop-blur-sm bg-black/20 rounded-lg p-3 border border-white/10">
            <p className="text-sm text-white font-medium" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              {placeholder}
            </p>
            <p className="text-xs text-gray-300" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
              Video will be replaced with actual content
            </p>
          </div>
        </div>
      </div>
      
      {/* Overlay Effects */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      )}
      
      {/* Video Controls Indicator */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {autoplay && (
          <div className="w-6 h-6 rounded bg-green-500/20 border border-green-400/40 flex items-center justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        )}
        {muted && (
          <div className="w-6 h-6 rounded bg-gray-500/20 border border-gray-400/40 flex items-center justify-center">
            <Volume2 className="h-3 w-3 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};
