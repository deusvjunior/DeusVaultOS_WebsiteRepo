import { motion } from 'framer-motion';
import { Play, Video } from 'lucide-react';
import { useState } from 'react';

interface VideoPlaceholderProps {
  placeholder: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  autoplay?: boolean;
  loop?: boolean;
  overlay?: boolean;
  className?: string;
}

export const VideoPlaceholder = ({ 
  placeholder, 
  aspectRatio = '16:9', 
  autoplay = false, 
  loop = false, 
  overlay = true,
  className = ''
}: VideoPlaceholderProps) => {
  const [isPlaying, setIsPlaying] = useState(false); // Never autoplay
  const [isHovered, setIsHovered] = useState(false);

  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square'
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative ${aspectRatioClasses[aspectRatio]} bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group cursor-pointer ${className}`}
      onClick={handlePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20" />
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* Play Button Overlay */}
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-white/20 backdrop-blur-md rounded-full p-6 border border-white/30 transition-all duration-300 ${isHovered ? 'bg-white/30' : ''}`}
          >
            <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
          </motion.div>
        </motion.div>
      )}

      {/* Video Icon */}
      <div className="absolute top-4 left-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2">
          <Video className="h-4 w-4 text-white/80" />
        </div>
      </div>

      {/* Duration Badge */}
      <div className="absolute top-4 right-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
          <span className="text-white/80 text-xs font-medium">2:45</span>
        </div>
      </div>

      {/* Title Overlay */}
      {overlay && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="text-white font-semibold text-lg mb-1">{placeholder}</h3>
          <p className="text-gray-300 text-sm">Click to play video</p>
        </div>
      )}

      {/* Playing State */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black flex items-center justify-center"
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white">Loading video...</p>
          </div>
        </motion.div>
      )}

      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
};
