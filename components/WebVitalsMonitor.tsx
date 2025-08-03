import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

interface WebVitalsProps {
  onMetricsUpdate?: (metrics: Partial<PerformanceMetrics>) => void;
  enableReporting?: boolean;
}

export function WebVitalsMonitor({ onMetricsUpdate, enableReporting = false }: WebVitalsProps) {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const observerRef = useRef<PerformanceObserver | null>(null);

  useEffect(() => {
    if (!window.performance || !window.PerformanceObserver) {
      console.warn('Performance APIs not supported');
      return;
    }

    // Measure Core Web Vitals
    const measureWebVitals = () => {
      // First Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            const fcp = entry.startTime;
            updateMetric('fcp', fcp);
          }
        }
      }).observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        updateMetric('lcp', lcp);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = (entry as any).processingStart - entry.startTime;
          updateMetric('fid', fid);
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        updateMetric('cls', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });

      // Time to First Byte
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        updateMetric('ttfb', ttfb);
      }
    };

    const updateMetric = (key: keyof PerformanceMetrics, value: number) => {
      setMetrics(prev => {
        const updated = { ...prev, [key]: value };
        onMetricsUpdate?.(updated);
        
        if (enableReporting) {
          reportToAnalytics(key, value);
        }
        
        return updated;
      });
    };

    const reportToAnalytics = (metric: string, value: number) => {
      // Report to Google Analytics
      (window as any).gtag?.('event', 'web_vitals', {
        event_category: 'performance',
        event_label: metric,
        value: Math.round(value),
        non_interaction: true
      });

      // Report to custom analytics endpoint
      if (window.location.hostname !== 'localhost') {
        fetch('/api/analytics/web-vitals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metric,
            value,
            url: window.location.href,
            timestamp: Date.now()
          })
        }).catch(console.error);
      }
    };

    // Start measuring after page load
    if (document.readyState === 'complete') {
      measureWebVitals();
    } else {
      window.addEventListener('load', measureWebVitals);
    }

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('load', measureWebVitals);
    };
  }, [onMetricsUpdate, enableReporting]);

  // Development mode debug panel
  if (window.location.hostname === 'localhost') {
    return (
      <div className="fixed bottom-32 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
        <div className="font-bold mb-2">Core Web Vitals</div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>FCP:</span>
            <span className={metrics.fcp ? (metrics.fcp < 1800 ? 'text-green-400' : metrics.fcp < 3000 ? 'text-yellow-400' : 'text-red-400') : 'text-gray-400'}>
              {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : '—'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>LCP:</span>
            <span className={metrics.lcp ? (metrics.lcp < 2500 ? 'text-green-400' : metrics.lcp < 4000 ? 'text-yellow-400' : 'text-red-400') : 'text-gray-400'}>
              {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '—'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>FID:</span>
            <span className={metrics.fid ? (metrics.fid < 100 ? 'text-green-400' : metrics.fid < 300 ? 'text-yellow-400' : 'text-red-400') : 'text-gray-400'}>
              {metrics.fid ? `${Math.round(metrics.fid)}ms` : '—'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>CLS:</span>
            <span className={metrics.cls !== undefined ? (metrics.cls < 0.1 ? 'text-green-400' : metrics.cls < 0.25 ? 'text-yellow-400' : 'text-red-400') : 'text-gray-400'}>
              {metrics.cls !== undefined ? metrics.cls.toFixed(3) : '—'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>TTFB:</span>
            <span className={metrics.ttfb ? (metrics.ttfb < 800 ? 'text-green-400' : metrics.ttfb < 1800 ? 'text-yellow-400' : 'text-red-400') : 'text-gray-400'}>
              {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : '—'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Hook for accessing performance metrics
export function useWebVitals() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});

  return {
    metrics,
    updateMetrics: setMetrics
  };
}

// Performance budget checker
export function checkPerformanceBudget(metrics: Partial<PerformanceMetrics>) {
  const budgets = {
    fcp: 1800, // 1.8s
    lcp: 2500, // 2.5s
    fid: 100,  // 100ms
    cls: 0.1,  // 0.1
    ttfb: 800  // 800ms
  };

  const results = Object.entries(budgets).map(([metric, budget]) => {
    const value = metrics[metric as keyof PerformanceMetrics];
    return {
      metric,
      budget,
      value,
      withinBudget: value !== undefined ? value <= budget : null,
      performance: value !== undefined ? 
        (value <= budget ? 'good' : value <= budget * 1.5 ? 'needs-improvement' : 'poor') : 
        'unknown'
    };
  });

  return results;
}
