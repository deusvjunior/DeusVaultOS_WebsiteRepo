import React, { useEffect, useRef } from 'react';
import { useGame } from './GameContext';

interface InteractiveElementProps {
  id: string;
  children: React.ReactNode;
  xpReward?: number;
  className?: string;
  onInteract?: () => void;
}

export function InteractiveElement({ 
  id, 
  children, 
  xpReward = 10, 
  className = '',
  onInteract 
}: InteractiveElementProps) {
  const { gainXP, exploreSection } = useGame();
  const hasInteracted = useRef(new Set<string>());
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple timeout to simulate exploration
    const timer = setTimeout(() => {
      if (!hasInteracted.current.has(id)) {
        exploreSection(id);
        hasInteracted.current.add(id);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [id, exploreSection]);

  const handleClick = () => {
    if (!hasInteracted.current.has(`${id}-click`)) {
      gainXP(xpReward, `Interacting with ${id}`);
      hasInteracted.current.add(`${id}-click`);
    }
    
    if (onInteract) {
      onInteract();
    }
  };

  return (
    <div
      ref={elementRef}
      className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}