import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Menu, X } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  component: React.ReactNode;
  background: string;
  accent: string;
}

interface PageNavigationProps {
  pages: Page[];
  initialPage?: number;
}

export function PageNavigation({ pages, initialPage = 0 }: PageNavigationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      switch (e.key) {
        case 'ArrowLeft':
          navigateToPage(Math.max(0, currentPage - 1), 'backward');
          break;
        case 'ArrowRight':
          navigateToPage(Math.min(pages.length - 1, currentPage + 1), 'forward');
          break;
        case 'Home':
          navigateToPage(0, currentPage > 0 ? 'backward' : 'forward');
          break;
        case 'End':
          navigateToPage(pages.length - 1, currentPage < pages.length - 1 ? 'forward' : 'backward');
          break;
        case 'Escape':
          setShowMenu(false);
          break;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;

      const threshold = 50;
      
      if (e.deltaY > threshold && currentPage < pages.length - 1) {
        navigateToPage(currentPage + 1, 'forward');
      } else if (e.deltaY < -threshold && currentPage > 0) {
        navigateToPage(currentPage - 1, 'backward');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || isTransitioning) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };

      const deltaX = touchEnd.x - touchStartRef.current.x;
      const deltaY = touchEnd.y - touchStartRef.current.y;

      const threshold = 50;
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

      if (isHorizontalSwipe) {
        if (deltaX > threshold && currentPage > 0) {
          navigateToPage(currentPage - 1, 'backward');
        } else if (deltaX < -threshold && currentPage < pages.length - 1) {
          navigateToPage(currentPage + 1, 'forward');
        }
      } else {
        if (deltaY < -threshold && currentPage < pages.length - 1) {
          navigateToPage(currentPage + 1, 'forward');
        } else if (deltaY > threshold && currentPage > 0) {
          navigateToPage(currentPage - 1, 'backward');
        }
      }

      touchStartRef.current = null;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPage, pages.length, isTransitioning]);

  const navigateToPage = (pageIndex: number, dir: 'forward' | 'backward') => {
    if (pageIndex === currentPage || isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection(dir);
    setCurrentPage(pageIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const pageVariants = {
    initial: (direction: string) => ({
      x: direction === 'forward' ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200,
        duration: 0.8
      }
    },
    exit: (direction: string) => ({
      x: direction === 'forward' ? '-100%' : '100%',
      opacity: 0,
      scale: 1.2,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200,
        duration: 0.8
      }
    })
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Background */}
      <motion.div
        key={`bg-${currentPage}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
        style={{ 
          background: pages[currentPage]?.background || 'linear-gradient(180deg, #000000 0%, #030712 100%)'
        }}
      />

      {/* Page Content */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {pages[currentPage]?.component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation UI */}
      <div className="fixed top-8 left-8 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMenu(!showMenu)}
          className="w-12 h-12 glass-refined rounded-lg flex items-center justify-center text-cyber-cyan hover:text-cyber-white transition-colors"
        >
          {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Page Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-8 z-40 glass-refined rounded-xl p-6 min-w-64"
          >
            <div className="space-y-3">
              {pages.map((page, index) => (
                <motion.button
                  key={page.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigateToPage(index, index > currentPage ? 'forward' : 'backward');
                    setShowMenu(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                    index === currentPage
                      ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30'
                      : 'text-cyber-dark-300 hover:text-cyber-white hover:bg-cyber-dark-800/50'
                  }`}
                >
                  <div className="font-subtitle text-sm">{page.title}</div>
                  <div className="text-xs opacity-60 mt-1">
                    Page {index + 1} of {pages.length}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Indicators */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col gap-3">
          {pages.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateToPage(index, index > currentPage ? 'forward' : 'backward')}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'bg-cyber-cyan shadow-lg shadow-cyber-cyan/50'
                  : 'bg-cyber-dark-600 hover:bg-cyber-dark-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <AnimatePresence>
        {currentPage > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateToPage(currentPage - 1, 'backward')}
            className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 glass-refined rounded-full flex items-center justify-center text-cyber-cyan hover:text-cyber-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentPage < pages.length - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateToPage(currentPage + 1, 'forward')}
            className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 glass-refined rounded-full flex items-center justify-center text-cyber-cyan hover:text-cyber-white transition-colors mr-20"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-cyber-dark-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-mint-bright"
          initial={{ width: 0 }}
          animate={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Navigation Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 glass-refined rounded-lg px-6 py-3 text-center"
      >
        <div className="text-xs text-cyber-dark-300">
          Use arrow keys, scroll, or swipe to navigate • Press ESC to close menu
        </div>
      </motion.div>

    </div>
  );
}