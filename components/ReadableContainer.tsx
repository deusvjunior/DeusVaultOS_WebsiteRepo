import { ReactNode } from 'react';

interface ReadableContainerProps {
  children: ReactNode;
  className?: string;
  transparency?: 'light' | 'medium' | 'heavy';
}

export function ReadableContainer({ 
  children, 
  className = '', 
  transparency = 'medium' 
}: ReadableContainerProps) {
  
  const getBackgroundClass = () => {
    switch (transparency) {
      case 'light':
        return 'bg-black/20 backdrop-blur-sm border border-white/10';
      case 'medium':
        return 'bg-black/40 backdrop-blur-md border border-white/20';
      case 'heavy':
        return 'bg-black/70 backdrop-blur-lg border border-white/30';
      default:
        return 'bg-black/40 backdrop-blur-md border border-white/20';
    }
  };

  return (
    <div 
      className={`${getBackgroundClass()} rounded-lg p-6 ${className}`}
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      {children}
    </div>
  );
}

export default ReadableContainer;
