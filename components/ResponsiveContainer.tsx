import { ReactNode } from 'react';
import { cn } from './ui/utils';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'wide' | 'narrow';
}

export function ResponsiveContainer({ 
  children, 
  className = '',
  variant = 'default'
}: ResponsiveContainerProps) {
  const variants = {
    default: 'container mx-auto px-4 sm:px-6 lg:px-8',
    wide: 'container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16',
    narrow: 'container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl'
  };

  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  );
}

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export function ResponsiveGrid({ 
  children, 
  className = '',
  cols = { sm: 1, md: 2, lg: 3 },
  gap = 'md'
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12'
  };

  const gridCols = `grid grid-cols-${cols.sm || 1} ${cols.md ? `md:grid-cols-${cols.md}` : ''} ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''} ${cols.xl ? `xl:grid-cols-${cols.xl}` : ''}`;

  return (
    <div className={cn(gridCols, gapClasses[gap], className)}>
      {children}
    </div>
  );
}

interface ResponsiveTextProps {
  children: ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'hero';
}

export function ResponsiveText({ 
  children, 
  className = '',
  size = 'base'
}: ResponsiveTextProps) {
  const sizeClasses = {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-xl sm:text-2xl md:text-3xl',
    '3xl': 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    '4xl': 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
  };

  return (
    <div className={cn(sizeClasses[size], className)}>
      {children}
    </div>
  );
}

interface ResponsiveSpacingProps {
  children: ReactNode;
  className?: string;
  py?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  px?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  mt?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  mb?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function ResponsiveSpacing({ 
  children, 
  className = '',
  py,
  px,
  mt,
  mb
}: ResponsiveSpacingProps) {
  const spacingClasses = {
    xs: '2',
    sm: '3 sm:4',
    md: '4 sm:6',
    lg: '6 sm:8',
    xl: '8 sm:12',
    '2xl': '12 sm:16'
  };

  const classes = [
    py && `py-${spacingClasses[py]}`,
    px && `px-${spacingClasses[px]}`,
    mt && `mt-${spacingClasses[mt]}`,
    mb && `mb-${spacingClasses[mb]}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
