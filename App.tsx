import { PageRouter } from './components/PageRouter';
import LoadingScreen from './components/LoadingScreen';
import { WebVitalsMonitor } from "./components/WebVitalsMonitor";
import { SEOOptimizer, seoConfigs } from "./components/SEOOptimizer";
import { useState, useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for assets and Three.js initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="App">
      {/* SEO Optimization */}
      <SEOOptimizer {...seoConfigs.home} />
      
      {/* Web Vitals Monitoring */}
      <WebVitalsMonitor enableReporting={true} />
      
      {/* Main Page Router */}
      <PageRouter />
    </div>
  );
}

export default App;