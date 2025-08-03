import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SubpageSceneManagerProps {
  currentPage: string;
  currentSection: number;
  reducedMotion: boolean;
}

export function SubpageSceneManager({ currentPage, currentSection, reducedMotion }: SubpageSceneManagerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Scene configurations for different contexts
  const sceneConfigs = {
    // Main carousel navigation (existing scenes)
    hero: {
      cameraPosition: { x: 0, y: 0, z: 10 },
      environment: 'corporate_hologram',
      atmosphere: 'professional'
    },
    features: {
      cameraPosition: { x: -5, y: 3, z: 8 },
      environment: 'tech_showcase',
      atmosphere: 'dynamic'
    },
    marketplace: {
      cameraPosition: { x: 8, y: 2, z: 6 },
      environment: 'digital_bazaar',
      atmosphere: 'vibrant'
    },
    
    // SUBPAGE-SPECIFIC SCENE TRANSITIONS
    // When user enters marketplace subpages
    'marketplace-agents': {
      cameraPosition: { x: 12, y: 5, z: 15 }, // Zoom into agent showcase area
      environment: 'agent_gallery',
      atmosphere: 'focused',
      models: ['ai_agent_holograms', 'capability_displays']
    },
    'marketplace-templates': {
      cameraPosition: { x: -8, y: 8, z: 12 }, // Different angle for templates
      environment: 'template_workshop',
      atmosphere: 'creative',
      models: ['code_fragments', 'building_blocks']
    },
    'marketplace-enterprise': {
      cameraPosition: { x: 0, y: 15, z: 20 }, // High overview for enterprise
      environment: 'enterprise_command',
      atmosphere: 'authoritative',
      models: ['corporate_networks', 'scalability_visuals']
    },
    
    // Features subpages with different technical focuses
    'features-ai-engine': {
      cameraPosition: { x: -10, y: 0, z: 8 },
      environment: 'neural_core',
      atmosphere: 'intelligent',
      models: ['brain_networks', 'data_flows']
    },
    'features-development': {
      cameraPosition: { x: 5, y: -3, z: 12 },
      environment: 'code_matrix',
      atmosphere: 'technical',
      models: ['ide_interfaces', 'compiler_visuals']
    },
    'features-deployment': {
      cameraPosition: { x: 0, y: 10, z: 5 },
      environment: 'cloud_infrastructure',
      atmosphere: 'scalable',
      models: ['server_clusters', 'deployment_pipelines']
    },
    
    // Documentation subpages with different learning contexts
    'docs-getting-started': {
      cameraPosition: { x: -3, y: 1, z: 6 },
      environment: 'tutorial_space',
      atmosphere: 'welcoming',
      models: ['step_by_step_guides', 'progress_indicators']
    },
    'docs-api-reference': {
      cameraPosition: { x: 8, y: -2, z: 10 },
      environment: 'reference_library',
      atmosphere: 'systematic',
      models: ['api_endpoints', 'documentation_trees']
    },
    'docs-examples': {
      cameraPosition: { x: 0, y: 5, z: 8 },
      environment: 'example_showcase',
      atmosphere: 'inspirational',
      models: ['code_samples', 'implementation_demos']
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

    // Create the initial scene based on current page
    createContextualScene(currentPage);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (!reducedMotion) {
        // Subtle camera breathing and environmental effects
        const time = Date.now() * 0.0005;
        camera.position.y += Math.sin(time) * 0.002;
        camera.position.x += Math.cos(time * 0.7) * 0.001;
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

  // Scene transition when page changes
  useEffect(() => {
    if (sceneRef.current && cameraRef.current) {
      transitionToScene(currentPage);
    }
  }, [currentPage, currentSection]);

  const createContextualScene = (pageId: string) => {
    if (!sceneRef.current) return;

    const config = sceneConfigs[pageId as keyof typeof sceneConfigs] || sceneConfigs.hero;
    const scene = sceneRef.current;

    // Clear existing scene objects
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }

    // Add contextual lighting based on environment
    addEnvironmentalLighting(config.atmosphere);
    
    // Add scene-specific models and effects
    addSceneModels(config);
    
    // Set initial camera position
    if (cameraRef.current) {
      cameraRef.current.position.set(
        config.cameraPosition.x,
        config.cameraPosition.y,
        config.cameraPosition.z
      );
    }
  };

  const transitionToScene = (newPageId: string) => {
    if (!cameraRef.current || !sceneRef.current) return;

    setIsTransitioning(true);
    
    const newConfig = sceneConfigs[newPageId as keyof typeof sceneConfigs] || sceneConfigs.hero;
    const camera = cameraRef.current;
    
    // Smooth camera transition
    const startPos = { ...camera.position };
    const endPos = newConfig.cameraPosition;
    
    let progress = 0;
    const transitionDuration = reducedMotion ? 500 : 1500;
    const startTime = Date.now();

    const animateTransition = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(elapsed / transitionDuration, 1);
      
      // Easing function for smooth transition
      const eased = 1 - Math.pow(1 - progress, 3);
      
      camera.position.x = startPos.x + (endPos.x - startPos.x) * eased;
      camera.position.y = startPos.y + (endPos.y - startPos.y) * eased;
      camera.position.z = startPos.z + (endPos.z - startPos.z) * eased;
      
      if (progress < 1) {
        requestAnimationFrame(animateTransition);
      } else {
        setIsTransitioning(false);
        // Update scene models after transition
        createContextualScene(newPageId);
      }
    };
    
    animateTransition();
  };

  const addEnvironmentalLighting = (atmosphere: string) => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;
    
    switch (atmosphere) {
      case 'professional':
        // Clean, corporate lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        scene.add(ambientLight, directionalLight);
        break;
        
      case 'vibrant':
        // Colorful marketplace lighting
        const colorfulAmbient = new THREE.AmbientLight(0x606040, 0.4);
        const cyan = new THREE.PointLight(0x00ffff, 1, 100);
        const yellow = new THREE.PointLight(0xffff00, 1, 100);
        cyan.position.set(-10, 5, 10);
        yellow.position.set(10, 5, -10);
        scene.add(colorfulAmbient, cyan, yellow);
        break;
        
      case 'technical':
        // Matrix-style technical lighting
        const techAmbient = new THREE.AmbientLight(0x002200, 0.3);
        const greenSpot = new THREE.SpotLight(0x00ff00, 2, 100, Math.PI / 6);
        greenSpot.position.set(0, 20, 0);
        scene.add(techAmbient, greenSpot);
        break;
        
      default:
        // Default lighting
        const defaultAmbient = new THREE.AmbientLight(0x404040, 0.5);
        const defaultDirect = new THREE.DirectionalLight(0xffffff, 0.7);
        defaultDirect.position.set(5, 10, 5);
        scene.add(defaultAmbient, defaultDirect);
    }
  };

  const addSceneModels = (config: any) => {
    if (!sceneRef.current || !config.models) return;

    const scene = sceneRef.current;
    
    config.models.forEach((modelType: string, index: number) => {
      // Create placeholder geometries for different model types
      let geometry, material;
      
      switch (modelType) {
        case 'ai_agent_holograms':
          geometry = new THREE.SphereGeometry(1, 32, 32);
          material = new THREE.MeshBasicMaterial({ 
            color: 0x00ffff, 
            transparent: true, 
            opacity: 0.6,
            wireframe: true 
          });
          break;
          
        case 'code_fragments':
          geometry = new THREE.BoxGeometry(2, 0.1, 3);
          material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00, 
            transparent: true, 
            opacity: 0.7 
          });
          break;
          
        case 'server_clusters':
          geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 8);
          material = new THREE.MeshBasicMaterial({ 
            color: 0x4444ff, 
            transparent: true, 
            opacity: 0.8 
          });
          break;
          
        default:
          geometry = new THREE.TetrahedronGeometry(1);
          material = new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            transparent: true, 
            opacity: 0.5 
          });
      }
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (index - 1) * 4,
        Math.sin(index) * 2,
        -5 + index * 2
      );
      
      scene.add(mesh);
    });
  };

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${
        isTransitioning ? 'opacity-50' : 'opacity-100'
      }`}
    />
  );
}
