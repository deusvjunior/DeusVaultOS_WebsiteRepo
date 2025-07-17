import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeJSSceneProps {
  className?: string;
  pageIndex?: number;
  currentSection?: number;
  reducedMotion?: boolean;
}

function ThreeJSScene({ className = '', pageIndex = 0, currentSection = 0, reducedMotion = false }: ThreeJSSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const hexagonRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number | null>(null);
  const clockRef = useRef(new THREE.Clock());

  // Physics simulation for rotation
  const currentRotationY = useRef(0);
  const targetRotationY = useRef(0);
  const velocityRef = useRef(0);
  const [isInteracting, _setIsInteracting] = useState(false);

  // Section rotation mapping (60 degrees per section)
  const faceAngles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3];

  // Professional lighting setup for depth and atmosphere
  const setupAdvancedLighting = (scene: THREE.Scene) => {
    // Key light - primary illumination (brighter)
    const keyLight = new THREE.DirectionalLight(0x00e1ff, 1.2);
    keyLight.position.set(10, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    scene.add(keyLight);

    // Fill light - soften shadows (brighter)
    const fillLight = new THREE.DirectionalLight(0x39ff14, 0.6);
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);

    // Rim light - edge definition (brighter)
    const rimLight = new THREE.DirectionalLight(0xffd700, 0.8);
    rimLight.position.set(0, -5, -10);
    scene.add(rimLight);

    // Ambient light - global illumination
    const ambientLight = new THREE.AmbientLight(0x1a1d20, 0.2);
    scene.add(ambientLight);

    // Environment light for reflections
    const hemisphereLight = new THREE.HemisphereLight(0x00e1ff, 0x131619, 0.3);
    scene.add(hemisphereLight);
  };

  // Enhanced living blobs with organic movement and personality
  const createPageSpecificBlobs = (pageIndex: number, scene: THREE.Scene) => {
    const blobs: any[] = [];
    const blobCount = 15 + Math.floor(Math.random() * 10); // 15-25 blobs
    
    for (let i = 0; i < blobCount; i++) {
      // Much smaller blobs, gathered in center
      const baseScale = 0.05 + Math.random() * 0.15; // 0.05 to 0.2 (much smaller)
      const scale = new THREE.Vector3(
        baseScale * (0.9 + Math.random() * 0.2),
        baseScale * (0.9 + Math.random() * 0.2),
        baseScale * (0.9 + Math.random() * 0.2)
      );
      
      // Rare black blobs with white eyes (1/100 chance)
      const isRareBlackBlob = Math.random() < 0.01;
      
      // Create blob geometry with more detail for smaller size
      const geometry = new THREE.SphereGeometry(1, 12, 10);
      
      // Opaque materials with varied colors
      let material;
      if (isRareBlackBlob) {
        material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(0x0a0a0a),
          transparent: false,
          shininess: 80
        });
      } else {
        const hue = Math.random() * 360;
        const saturation = 40 + Math.random() * 60;
        const lightness = 25 + Math.random() * 50;
        
        material = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(hue / 360, saturation / 100, lightness / 100),
          transparent: false, // Fully opaque
          shininess: 20 + Math.random() * 40
        });
      }
      
      const blob = new THREE.Mesh(geometry, material);
      
      // Position much closer to center
      const angle = (i / blobCount) * Math.PI * 2 + Math.random() * 0.3;
      const radius = 0.5 + Math.random() * 1.5; // Much smaller radius
      blob.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1.5, // Smaller Y spread
        Math.sin(angle) * radius
      );
      
      blob.scale.copy(scale);
      
      // Page-specific behaviors
      let behaviorType = 'swim';
      switch (pageIndex) {
        case 0: // Homepage - merging/splitting behavior
          behaviorType = Math.random() < 0.3 ? 'merge' : 'swim';
          break;
        case 1: // Who Is This For - curious exploration
          behaviorType = Math.random() < 0.4 ? 'explore' : 'swim';
          break;
        case 2: // Platform Features - organized patterns
          behaviorType = Math.random() < 0.5 ? 'pattern' : 'swim';
          break;
        case 3: // Features & Roadmap - goal-oriented movement
          behaviorType = Math.random() < 0.3 ? 'goal' : 'swim';
          break;
        case 4: // Contact - social clustering
          behaviorType = Math.random() < 0.4 ? 'cluster' : 'swim';
          break;
        case 5: // CTA - excited behavior
          behaviorType = Math.random() < 0.6 ? 'excited' : 'swim';
          break;
      }
      
      // Add enhanced personality and movement properties
      blob.userData = {
        originalPosition: blob.position.clone(),
        originalScale: scale.clone(),
        swimmingSpeed: 0.2 + Math.random() * 0.4,
        swimmingDirection: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 1,
          (Math.random() - 0.5) * 2
        ).normalize(),
        breathingPhase: Math.random() * Math.PI * 2,
        breathingSpeed: 0.3 + Math.random() * 0.7,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        isRareBlackBlob,
        age: 0,
        orbitalRadius: radius,
        orbitalSpeed: 0.05 + Math.random() * 0.1,
        orbitalPhase: angle,
        behaviorType,
        mergeTarget: null,
        splitCooldown: 0,
        currentSize: baseScale,
        maxSize: baseScale * 4,
        energy: 0.3 + Math.random() * 0.7,
        socialRadius: 0.3 + Math.random() * 0.2,
        goalPosition: null,
        patternPhase: Math.random() * Math.PI * 2
      };
      
      // Add black eyes (no red eyes)
      if (!isRareBlackBlob) {
        const eyeGeometry = new THREE.SphereGeometry(0.15, 8, 6);
        const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        
        leftEye.position.set(-0.3, 0.2, 0.7);
        rightEye.position.set(0.3, 0.2, 0.7);
        
        blob.add(leftEye);
        blob.add(rightEye);
      } else {
        // White eyes for rare black blobs
        const eyeGeometry = new THREE.SphereGeometry(0.15, 8, 6);
        const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        
        leftEye.position.set(-0.3, 0.2, 0.7);
        rightEye.position.set(0.3, 0.2, 0.7);
        
        blob.add(leftEye);
        blob.add(rightEye);
      }
      
      scene.add(blob);
      blobs.push(blob);
    }
    
    return blobs;
  };  // Enhanced particle system with smaller, dynamic particles
  const createEnhancedParticles = (group: THREE.Group) => {
    const particleCount = 150; // Reduced for performance
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00e1ff);
    const color2 = new THREE.Color(0x39ff14);
    const color3 = new THREE.Color(0xffd700);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Distribute particles in hexagonal space
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 6;
      const height = (Math.random() - 0.5) * 4;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;
      
      // Smaller, more dynamic velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // More varied colors
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.4) color = color1;
      else if (colorChoice < 0.7) color = color2;
      else color = color3;
      
      const mixRatio = Math.random() * 0.3;
      const finalColor = color.clone().lerp(new THREE.Color(0xffffff), mixRatio);
      colors[i3] = finalColor.r;
      colors[i3 + 1] = finalColor.g;
      colors[i3 + 2] = finalColor.b;
      
      // Smaller particle sizes
      sizes[i] = Math.random() * 0.8 + 0.2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Distance-based sizing and alpha
          float distance = length(mvPosition.xyz);
          gl_PointSize = size * (200.0 / distance);
          vAlpha = 1.0 - smoothstep(1.0, 8.0, distance);
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          // Twinkling effect
          float twinkle = sin(gl_FragCoord.x * 0.01 + gl_FragCoord.y * 0.01) * 0.5 + 0.5;
          alpha *= vAlpha * (0.7 + twinkle * 0.3);
          
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.userData = { 
      isParticles: true, 
      velocities,
      originalPositions: positions.slice()
    };
    group.add(particles);

    return particles;
  };

  // Apple-grade hexagon with premium materials and effects
  const createAppleGradeHexagon = (group: THREE.Group, scene: THREE.Scene) => {
    // Create spaceship-style base platform
    const baseGeometry = new THREE.CylinderGeometry(6.5, 7.0, 0.3, 32);
    const baseMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2a2a3a,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x001122,
      emissiveIntensity: 0.1,
    });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.y = -1.0;
    group.add(baseMesh);

    // Create glow ring around base
    const ringGeometry = new THREE.RingGeometry(6.0, 6.8, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e1ff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.y = -0.8;
    ringMesh.rotation.x = -Math.PI / 2;
    group.add(ringMesh);

    // Create hexagon faces as monitor screens
    const sections = 6;
    const radius = 5.0;

    for (let i = 0; i < sections; i++) {
      const angle = (i * Math.PI * 2) / sections;
      
      // Screen frame with granite material
      const frameGeometry = new THREE.BoxGeometry(3.5, 2.5, 0.3);
      const frameMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x4a4a4a,
        metalness: 0.3,
        roughness: 0.6,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        reflectivity: 0.4,
        normalScale: new THREE.Vector2(0.5, 0.5),
      });

      const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      frameMesh.position.set(x, 0, z);
      frameMesh.lookAt(0, 0, 0);
      
      // Screen content (monitor display)
      const screenGeometry = new THREE.PlaneGeometry(3.0, 2.0);
      const screenMaterial = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0x00e1ff : 0x1a1d20,
        emissive: i === 0 ? 0x003344 : 0x000000,
        emissiveIntensity: i === 0 ? 0.5 : 0.1,
      });
      
      const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      screenMesh.position.set(x * 1.01, 0, z * 1.01);
      screenMesh.lookAt(0, 0, 0);
      
      group.add(frameMesh);
      group.add(screenMesh);
      
      // Store references for updates
      (group as any)[`screen_${i}`] = screenMesh;
      (group as any)[`frame_${i}`] = frameMesh;
    }

    // Add living blobs and enhanced particles
    // Create page-specific blobs instead of living blobs
    const blobs = createPageSpecificBlobs(pageIndex, scene);
    const particles = createEnhancedParticles(group);
    
    // Store references for animation updates
    (group as any).blobs = blobs;
    (group as any).particles = particles;
  };

  // Advanced material updates with page-specific blob animation
  const updateAdvancedMaterials = (elapsedTime: number, deltaTime: number) => {
    if (!hexagonRef.current) return;

    // Animate glow ring
    const ring = hexagonRef.current.children.find((child: any) => 
      child.geometry instanceof THREE.RingGeometry
    ) as THREE.Mesh;
    
    if (ring && ring.material instanceof THREE.MeshBasicMaterial) {
      ring.material.opacity = 0.2 + Math.sin(elapsedTime * 0.3) * 0.1;
    }

    // Update screen materials based on current section
    for (let i = 0; i < 6; i++) {
      const screen = (hexagonRef.current as any)[`screen_${i}`] as THREE.Mesh;
      if (screen && screen.material instanceof THREE.MeshStandardMaterial) {
        const isActive = i === currentSection;
        screen.material.color.setHex(isActive ? 0x00e1ff : 0x1a1d20);
        screen.material.emissive.setHex(isActive ? 0x003344 : 0x000000);
        screen.material.emissiveIntensity = isActive ? 0.5 : 0.1;
      }
    }

    // Animate page-specific blobs with procedural behaviors
    const blobs = (hexagonRef.current as any).blobs;
    if (blobs && Array.isArray(blobs)) {
      blobs.forEach((blob: any, index: number) => {
        const userData = blob.userData;
        if (!userData) return;
        
        userData.age += deltaTime;
        const time = elapsedTime;
        
        // Base swimming motion
        const swimmingOffset = new THREE.Vector3()
          .copy(userData.swimmingDirection)
          .multiplyScalar(Math.sin(time * userData.swimmingSpeed) * 0.3);
        
        // Breathing animation
        const breathingScale = 1 + Math.sin(time * userData.breathingSpeed + userData.breathingPhase) * 0.1;
        blob.scale.copy(userData.originalScale).multiplyScalar(breathingScale);
        
        // Rotation
        blob.rotation.x += userData.rotationSpeed.x;
        blob.rotation.y += userData.rotationSpeed.y;
        blob.rotation.z += userData.rotationSpeed.z;
        
        // Apply swimming motion
        blob.position.add(swimmingOffset);
        
        // Keep within bounds
        const maxDistance = 2.5;
        if (blob.position.length() > maxDistance) {
          blob.position.normalize().multiplyScalar(maxDistance);
          userData.swimmingDirection.negate();
        }
        
        // Orbital movement
        const orbitalAngle = userData.orbitalPhase + time * userData.orbitalSpeed;
        const orbitalX = Math.cos(orbitalAngle) * userData.orbitalRadius * 0.3;
        const orbitalZ = Math.sin(orbitalAngle) * userData.orbitalRadius * 0.3;
        
        blob.position.x += (orbitalX - blob.position.x) * 0.02;
        blob.position.z += (orbitalZ - blob.position.z) * 0.02;
      });
    }

    // Animate enhanced particles
    const particles = (hexagonRef.current as any).particles;
    if (particles) {
      particles.rotation.y += 0.0005; // Slower rotation
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const velocities = particles.userData.velocities;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Apply velocities
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Gentle wave motion
        positions[i + 1] += Math.sin(elapsedTime * 2 + i * 0.1) * 0.002;
        
        // Boundary wrapping
        if (Math.abs(positions[i]) > 8) velocities[i] *= -0.8;
        if (Math.abs(positions[i + 1]) > 4) velocities[i + 1] *= -0.8;
        if (Math.abs(positions[i + 2]) > 8) velocities[i + 2] *= -0.8;
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
    }
  };

  // Subtle camera movement for depth perception (GENTLER)
  const updateCameraMovement = (elapsedTime: number) => {
    if (!cameraRef.current) return;
    
    // Much gentler breathing motion
    const breathingOffset = Math.sin(elapsedTime * 0.2) * 0.05; // Half the jiggle
    cameraRef.current.position.y = breathingOffset;
    
    // Minimal parallax for mouse interaction
    const mouseInfluence = 0.01; // Half the movement
    cameraRef.current.position.x = mouseInfluence;
    cameraRef.current.position.z = 10 + mouseInfluence;
    
    cameraRef.current.lookAt(0, 0, 0);
  };

  // Apple-grade rotation with physics simulation (SLOWER & SMOOTHER)
  const updateRotationWithPhysics = (_deltaTime: number) => {
    if (!isInteracting && !reducedMotion) {
      targetRotationY.current = faceAngles[currentSection];
    }

    // Physics-based rotation with gentler spring damping
    const springStrength = 0.025; // Half the original speed
    const damping = 0.9; // Higher damping for smoother motion
    
    const force = (targetRotationY.current - currentRotationY.current) * springStrength;
    velocityRef.current += force;
    velocityRef.current *= damping;
    currentRotationY.current += velocityRef.current;
    
    if (hexagonRef.current) {
      hexagonRef.current.rotation.y = currentRotationY.current;
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Advanced scene setup with Apple-grade rendering
    const scene = new THREE.Scene();
    scene.background = null; // Transparent for layering
    scene.fog = new THREE.Fog(0x000000, 5, 25); // Depth perception
    sceneRef.current = scene;

    // Professional camera setup with film-like characteristics
    const camera = new THREE.PerspectiveCamera(
      45, // Narrower FOV for more cinematic feel
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 12); // Elevated perspective
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Advanced renderer with Apple-grade quality
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create advanced hexagon group with proper transforms
    const hexagonGroup = new THREE.Group();
    hexagonRef.current = hexagonGroup;
    scene.add(hexagonGroup);

    // Professional lighting setup
    setupAdvancedLighting(scene);
    
    // Create Apple-grade hexagon structure
    createAppleGradeHexagon(hexagonGroup, scene);
    
    // Advanced animation loop with proper frame timing
    let lastTime = 0;
    const animate = (currentTime: number) => {
      frameRef.current = requestAnimationFrame(animate);
      
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      const elapsedTime = clockRef.current.getElapsedTime();

      // Apple-grade rotation with physics-based easing
      updateRotationWithPhysics(deltaTime);

      // Advanced material updates with performance optimization
      updateAdvancedMaterials(elapsedTime, deltaTime);
      
      // Subtle camera movements for depth
      updateCameraMovement(elapsedTime);

      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate(0);

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [currentSection, reducedMotion]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d20 50%, #131619 100%)'
      }}
    />
  );
};

export default ThreeJSScene;
