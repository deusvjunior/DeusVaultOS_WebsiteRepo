import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeJSSceneProps {
  currentSection: number;
  reducedMotion?: boolean;
  observationMode?: boolean;
  setObservationMode?: (mode: boolean) => void;
}

const ThreeJSScene: React.FC<ThreeJSSceneProps> = ({ 
  currentSection, 
  reducedMotion = false,
  observationMode = false,
  setObservationMode
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const hexagonRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const blobsRef = useRef<any[]>([]); // Persistent blob reference

  // Camera control states
  const isMouseDown = useRef(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cameraRotation = useRef({ x: 0, y: 0 });
  const originalCameraPosition = useRef(new THREE.Vector3());

  // Physics simulation for rotation
  const currentRotationY = useRef(0);
  const targetRotationY = useRef(0);
  const velocityRef = useRef(0);
  const isInteractingRef = useRef(false);
  const [isInteracting, setIsInteracting] = useState(false);

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
  const createLivingBlobs = (scene: THREE.Scene) => {
    const blobs = [];
    const numBlobs = 8; // Reduced for better performance and less clutter
    
    for (let i = 0; i < numBlobs; i++) {
      // Create unique blob geometry with smaller, more contained sizes
      const geometry = new THREE.SphereGeometry(
        0.08 + Math.random() * 0.15, // Much smaller: 0.08 to 0.23
        16 + Math.floor(Math.random() * 8), // Segment variation: 16-24
        8 + Math.floor(Math.random() * 6)   // Ring variation: 8-14
      );
      
      // Create cyan/neon yellow materials with gradient blending and emission
      const colorChoice = Math.random();
      let baseColor, emissiveColor;
      
      if (colorChoice < 0.6) {
        // Cyan variants (60%)
        baseColor = new THREE.Color().setHSL(0.5, 0.8 + Math.random() * 0.2, 0.4 + Math.random() * 0.3);
        emissiveColor = new THREE.Color().setHSL(0.5, 0.6, 0.15 + Math.random() * 0.1);
      } else {
        // Neon yellow variants (40%)
        baseColor = new THREE.Color().setHSL(0.16, 0.9 + Math.random() * 0.1, 0.5 + Math.random() * 0.2);
        emissiveColor = new THREE.Color().setHSL(0.16, 0.7, 0.12 + Math.random() * 0.08);
      }
      
      // Enhanced materials with smooth emission and gradients
      const material = new THREE.MeshStandardMaterial({
        color: baseColor,
        metalness: 0.1 + Math.random() * 0.2,
        roughness: 0.3 + Math.random() * 0.4,
        emissive: emissiveColor,
        emissiveIntensity: 0.3 + Math.random() * 0.2,
        transparent: false,
        opacity: 1.0
      });
      
      const blob = new THREE.Mesh(geometry, material);
      
      // More centered positioning around the hexagon
      const radius = 2 + Math.random() * 4; // Closer to center: 2-6 units
      const theta = Math.random() * Math.PI * 2; // Random angle
      const phi = Math.PI * 0.3 + Math.random() * Math.PI * 0.4; // Elevation: 30% to 70% (more centered)
      
      blob.position.x = radius * Math.sin(phi) * Math.cos(theta);
      blob.position.y = Math.max(1, radius * Math.cos(phi)); // Ensure Y is always above 1
      blob.position.z = radius * Math.sin(phi) * Math.sin(theta);
      
      // Random initial rotation
      blob.rotation.x = Math.random() * Math.PI * 2;
      blob.rotation.y = Math.random() * Math.PI * 2;
      blob.rotation.z = Math.random() * Math.PI * 2;
      
      // Smaller scale variation
      const scale = 0.8 + Math.random() * 0.4; // Scale: 0.8x to 1.2x
      blob.scale.setScalar(scale);
      
      // Smooth personality traits for organic movement
      blob.userData = {
        // Movement behavior - simpler, smoother
        behaviorType: Math.floor(Math.random() * 3), // Only 3 smooth behavior types
        
        // Gentle swimming behavior
        swimSpeed: 0.1 + Math.random() * 0.3, // Slower: 0.1 to 0.4
        swimDirection: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 0.2, // Very limited Y movement
          (Math.random() - 0.5) * 2
        ).normalize(),
        
        // Reduced personality traits for smoother movement
        isFloater: Math.random() < 0.5, // 50% prefer floating
        isPulser: Math.random() < 0.3, // 30% do gentle pulsing
        
        energy: 0.3 + Math.random() * 0.4, // Lower energy level: 0.3-0.7
        
        // Gentle breathing/pulsing
        breathingRate: 0.5 + Math.random() * 1.0, // Slower breathing
        breathingIntensity: 0.02 + Math.random() * 0.06, // Subtle scale variation
        
        // Smooth rotation behavior
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01, // Much slower rotation
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        },
        
        // Gentle orbital motion
        orbitRadius: 0.3 + Math.random() * 1.5, // Smaller orbit radius
        orbitSpeed: (Math.random() - 0.5) * 0.008, // Much slower orbiting
        orbitAngle: Math.random() * Math.PI * 2,
        orbitTilt: (Math.random() - 0.5) * Math.PI * 0.1, // Minimal tilt
        
        // Subtle bobbing motion
        bobSpeed: 0.3 + Math.random() * 0.7,
        bobIntensity: 0.1 + Math.random() * 0.3, // Gentle bobbing
        
        // Original position for reference
        originalPosition: blob.position.clone(),
        
        // Time offset for unique animation timing
        timeOffset: Math.random() * Math.PI * 2,
        
        // Individual pulsing emission
        emissionPulseSpeed: 0.8 + Math.random() * 1.2,
        emissionPulseIntensity: 0.1 + Math.random() * 0.2,
        originalEmissiveIntensity: material.emissiveIntensity,
        
        // Color info for emission pulsing
        originalHue: colorChoice < 0.6 ? 180 : 60 // Cyan or Yellow base hue
      };
      
      blobs.push(blob);
      scene.add(blob);
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
  const createAppleGradeHexagon = (group: THREE.Group) => {
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

    // Add living blobs and enhanced particles (only create once)
    if (blobsRef.current.length === 0) {
      const blobs = createLivingBlobs(sceneRef.current!);
      blobsRef.current = blobs;
      
      // Store reference in group for animation updates
      (group as any).blobs = blobs;
    } else {
      // Reuse existing blobs
      blobsRef.current.forEach(blob => {
        if (blob.parent !== sceneRef.current) {
          sceneRef.current!.add(blob);
        }
      });
      (group as any).blobs = blobsRef.current;
    }
    
    const particles = createEnhancedParticles(group);
    
    // Store references for animation updates
    (group as any).particles = particles;
  };

  // Advanced material updates with living blob animation
  const updateAdvancedMaterials = (elapsedTime: number, deltaTime: number) => {
    if (!hexagonRef.current) return;

    // Animate glow ring
    const ring = hexagonRef.current.children.find((child: any) => 
      child.geometry instanceof THREE.RingGeometry
    ) as THREE.Mesh;
    
    if (ring && ring.material instanceof THREE.MeshBasicMaterial) {
      ring.material.opacity = 0.2 + Math.sin(elapsedTime * 0.3) * 0.1; // Slower pulsing
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

    // Animate enhanced living blobs with smooth organic swimming motion
    const blobs = (hexagonRef.current as any).blobs;
    if (blobs) {
      blobs.forEach((blob: any, index: number) => {
        if (!blob || !blob.userData) return; // Safety check
        
        const time = elapsedTime;
        const userData = blob.userData;
        const timeWithOffset = time + userData.timeOffset;
        
        // Smooth behavior-based movement system with gentle containment
        switch (userData.behaviorType) {
          case 0: // Gentle orbital swimmers
            {
              const orbitX = Math.cos(timeWithOffset * userData.orbitSpeed + userData.orbitAngle) * userData.orbitRadius;
              const orbitZ = Math.sin(timeWithOffset * userData.orbitSpeed + userData.orbitAngle) * userData.orbitRadius;
              const orbitY = Math.sin(timeWithOffset * userData.orbitSpeed * 0.3 + userData.orbitTilt) * userData.orbitRadius * 0.1;
              
              blob.position.x = userData.originalPosition.x + orbitX;
              blob.position.y = Math.max(1, userData.originalPosition.y + orbitY);
              blob.position.z = userData.originalPosition.z + orbitZ;
            }
            break;
            
          case 1: // Smooth sine wave swimmers
            {
              const swimTime = timeWithOffset * userData.swimSpeed;
              const waveX = Math.sin(swimTime) * 0.8;
              const waveZ = Math.sin(swimTime * 0.7) * 0.6;
              const waveY = Math.cos(swimTime * 0.4) * 0.3;
              
              blob.position.x = userData.originalPosition.x + waveX;
              blob.position.y = Math.max(1, userData.originalPosition.y + waveY);
              blob.position.z = userData.originalPosition.z + waveZ;
            }
            break;
            
          case 2: // Gentle floating with subtle drift
            {
              const floatX = Math.sin(timeWithOffset * 0.3) * 0.5;
              const floatY = Math.cos(timeWithOffset * 0.2) * 0.2;
              const floatZ = Math.sin(timeWithOffset * 0.4) * 0.4;
              
              blob.position.x = userData.originalPosition.x + floatX;
              blob.position.y = Math.max(1, userData.originalPosition.y + floatY);
              blob.position.z = userData.originalPosition.z + floatZ;
            }
            break;
            
          default: // Very gentle bobbing in place
            {
              const bobX = Math.sin(timeWithOffset * userData.bobSpeed) * 0.2;
              const bobY = Math.cos(timeWithOffset * userData.bobSpeed * 0.8) * 0.15;
              const bobZ = Math.sin(timeWithOffset * userData.bobSpeed * 1.2) * 0.2;
              
              blob.position.x = userData.originalPosition.x + bobX;
              blob.position.y = Math.max(1, userData.originalPosition.y + bobY);
              blob.position.z = userData.originalPosition.z + bobZ;
            }
        }
        
        // Smooth rotation
        blob.rotation.x += userData.rotationSpeed.x;
        blob.rotation.y += userData.rotationSpeed.y;
        blob.rotation.z += userData.rotationSpeed.z;
        
        // Gentle breathing animation
        const breathing = 1 + Math.sin(timeWithOffset * userData.breathingRate) * userData.breathingIntensity;
        blob.scale.setScalar(breathing);
        
        // Individual emission pulsing for cute effect
        if (blob.material && blob.material.emissive) {
          const emissionPulse = Math.sin(timeWithOffset * userData.emissionPulseSpeed) * userData.emissionPulseIntensity;
          blob.material.emissiveIntensity = userData.originalEmissiveIntensity + emissionPulse;
        }
        
        // Gentle containment - keep blobs near center
        const containmentRadius = 8; // Smaller containment
        const currentPos = blob.position;
        const distanceFromCenter = currentPos.length();
        
        if (distanceFromCenter > containmentRadius) {
          currentPos.normalize().multiplyScalar(containmentRadius * 0.9);
          userData.originalPosition = currentPos.clone();
        }
        
        // Floor prevention
        if (currentPos.y < 1) {
          currentPos.y = 1;
          userData.originalPosition.y = Math.max(1, userData.originalPosition.y);
        }
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

  // Very subtle camera movement for depth perception (ULTRA GENTLE)
  const updateCameraMovement = (elapsedTime: number) => {
    if (!cameraRef.current || observationMode) return; // Don't move camera in observation mode
    
    // Ultra-gentle breathing motion
    const breathingOffset = Math.sin(elapsedTime * 0.15) * 0.02; // Much more subtle
    cameraRef.current.position.y = breathingOffset;
    
    // Minimal parallax for subtle depth
    cameraRef.current.position.x = 0;
    cameraRef.current.position.z = 10;
    
    cameraRef.current.lookAt(0, 0, 0);
  };

  // Apple-grade rotation with physics simulation (MUCH SMOOTHER)
  const updateRotationWithPhysics = (_deltaTime: number) => {
    if (!isInteractingRef.current && !reducedMotion && !observationMode) {
      targetRotationY.current = faceAngles[currentSection];
    }

    // Enhanced physics-based rotation with ultra-smooth spring damping
    const springStrength = 0.012; // Much gentler spring for smoother motion
    const damping = 0.95; // Higher damping for ultra-smooth motion
    
    const angleDifference = targetRotationY.current - currentRotationY.current;
    
    // Handle angle wrapping for shortest path
    let normalizedDifference = angleDifference;
    if (normalizedDifference > Math.PI) {
      normalizedDifference -= 2 * Math.PI;
    } else if (normalizedDifference < -Math.PI) {
      normalizedDifference += 2 * Math.PI;
    }
    
    const force = normalizedDifference * springStrength;
    velocityRef.current += force;
    velocityRef.current *= damping;
    currentRotationY.current += velocityRef.current;
    
    // Normalize rotation to 0-2π range
    currentRotationY.current = ((currentRotationY.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    
    if (hexagonRef.current) {
      hexagonRef.current.rotation.y = currentRotationY.current;
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Store original camera position when entering observation mode
    if (observationMode && cameraRef.current) {
      originalCameraPosition.current.copy(cameraRef.current.position);
    }

    // Reset camera position when exiting observation mode
    if (!observationMode && cameraRef.current) {
      cameraRef.current.position.copy(originalCameraPosition.current);
      cameraRef.current.lookAt(0, 0, 0);
      cameraRotation.current = { x: 0, y: 0 };
    }
  }, [observationMode]);

  // Mouse event handlers for observation mode
  useEffect(() => {
    if (!mountRef.current || !observationMode) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (!observationMode) return; // Extra check
      isMouseDown.current = true;
      mousePosition.current = { x: event.clientX, y: event.clientY };
      if (setObservationMode) {
        // Signal that we're actively interacting to prevent navigation interference
        isInteractingRef.current = true;
        setIsInteracting(true);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown.current || !cameraRef.current || !observationMode) return;

      const deltaX = event.clientX - mousePosition.current.x;
      const deltaY = event.clientY - mousePosition.current.y;

      // Update camera rotation with smoother sensitivity
      cameraRotation.current.y += deltaX * 0.003; // Reduced sensitivity
      cameraRotation.current.x += deltaY * 0.003;

      // Clamp vertical rotation
      cameraRotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, cameraRotation.current.x));

      // Apply rotation to camera with smooth orbital movement
      const radius = 18; // Slightly closer
      cameraRef.current.position.x = radius * Math.cos(cameraRotation.current.x) * Math.sin(cameraRotation.current.y);
      cameraRef.current.position.y = radius * Math.sin(cameraRotation.current.x);
      cameraRef.current.position.z = radius * Math.cos(cameraRotation.current.x) * Math.cos(cameraRotation.current.y);
      
      cameraRef.current.lookAt(0, 0, 0);

      mousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
      if (setObservationMode) {
        // Release interaction lock after a brief delay
        setTimeout(() => {
          isInteractingRef.current = false;
          setIsInteracting(false);
        }, 100);
      }
    };

    const element = mountRef.current;
    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove); // Listen on document for better tracking
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [observationMode, setObservationMode]);

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
    createAppleGradeHexagon(hexagonGroup);
    
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
  }, [reducedMotion]); // Removed currentSection dependency to prevent regeneration

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 z-0 ${observationMode ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
      style={{ 
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d20 50%, #131619 100%)'
      }}
    />
  );
};

export default ThreeJSScene;
