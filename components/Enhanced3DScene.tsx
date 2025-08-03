import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Enhanced3DSceneProps {
  currentSection: number;
  subpageContext?: string;
  reducedMotion: boolean;
}

export function Enhanced3DScene({ currentSection, subpageContext, reducedMotion }: Enhanced3DSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>();

  // Define scene configurations for different contexts
  const getSceneConfig = () => {
    const sectionNames = ['hero', 'features', 'marketplace', 'user-segments', 'therion', 'cta'];
    const currentPage = sectionNames[currentSection] || 'hero';
    
    // If we have a subpage context, use enhanced scene
    if (subpageContext) {
      return {
        cameraPosition: { x: 15, y: 8, z: 20 }, // Zoomed in view for subpages
        environment: 'subpage_focus',
        atmosphere: 'detailed'
      };
    }
    
    // Main carousel scenes
    switch (currentPage) {
      case 'marketplace':
        return {
          cameraPosition: { x: 8, y: 2, z: 12 },
          environment: 'digital_bazaar',
          atmosphere: 'vibrant'
        };
      case 'features':
        return {
          cameraPosition: { x: -5, y: 3, z: 10 },
          environment: 'tech_showcase',
          atmosphere: 'dynamic'
        };
      default:
        return {
          cameraPosition: { x: 0, y: 0, z: 15 },
          environment: 'corporate_hologram',
          atmosphere: 'professional'
        };
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize THREE.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Add basic lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(ambientLight, directionalLight);

    // Add some animated objects
    const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff, 
      transparent: true, 
      opacity: 0.6,
      wireframe: true 
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (!reducedMotion) {
        const time = Date.now() * 0.001;
        torus.rotation.x = time * 0.5;
        torus.rotation.y = time * 0.3;
        
        // Subtle camera movement
        camera.position.y += Math.sin(time) * 0.01;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update camera position when section changes
  useEffect(() => {
    if (!cameraRef.current) return;
    
    const config = getSceneConfig();
    const camera = cameraRef.current;
    
    // Smooth transition to new camera position
    const targetPos = config.cameraPosition;
    const startPos = { ...camera.position };
    
    let progress = 0;
    const duration = reducedMotion ? 500 : 1500;
    const startTime = Date.now();

    const animateCamera = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(elapsed / duration, 1);
      
      const eased = 1 - Math.pow(1 - progress, 3);
      
      camera.position.x = startPos.x + (targetPos.x - startPos.x) * eased;
      camera.position.y = startPos.y + (targetPos.y - startPos.y) * eased;
      camera.position.z = startPos.z + (targetPos.z - startPos.z) * eased;
      
      camera.lookAt(0, 0, 0);
      
      if (progress < 1) {
        requestAnimationFrame(animateCamera);
      }
    };
    
    animateCamera();
  }, [currentSection, subpageContext, reducedMotion]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
