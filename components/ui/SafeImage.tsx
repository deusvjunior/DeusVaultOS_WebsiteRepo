/**
 * Safe Image Component for DeusVaultOS Website
 * Provides fallback handling for missing images with loading states
 */

import React, { forwardRef, useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  onError?: () => void;
  onLoad?: () => void;
}

export const SafeImage = forwardRef<HTMLImageElement, SafeImageProps>(
  ({ src, alt, fallbackSrc, className = '', onError, onLoad, ...props }, ref) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      
      if (fallbackSrc && imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
        setHasError(false);
        setIsLoading(true);
      } else {
        onError?.();
      }
    };

    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
      onLoad?.();
    };

    // If we have an error and no fallback, show a placeholder
    if (hasError && (!fallbackSrc || imgSrc === fallbackSrc)) {
      return (
        <div 
          className={`bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-400 text-sm ${className}`}
          style={{ minHeight: '120px' }}
        >
          <div className="text-center px-4">
            <div className="mb-2 text-gray-500">⚠️</div>
            <div>Image Loading</div>
            <div className="text-xs text-gray-600">{alt}</div>
          </div>
        </div>
      );
    }

    return (
      <>
        {isLoading && (
          <div 
            className={`bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center absolute inset-0 ${className}`}
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          </div>
        )}
        <img
          ref={ref}
          src={imgSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />
      </>
    );
  }
);

SafeImage.displayName = 'SafeImage';
