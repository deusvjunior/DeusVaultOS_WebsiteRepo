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

  // Camera control states
  const isMouseDown = useRef(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cameraRotation = useRef({ x: 0, y: 0 });
  const originalCameraPosition = useRef(new THREE.Vector3());

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
  const createLivingBlobs = (scene: THREE.Scene) => {
    const blobs = [];
    const numBlobs = 15; // More blobs for richer environment
    
    for (let i = 0; i < numBlobs; i++) {
      // Create unique blob geometry with varied complexity
      const geometry = new THREE.SphereGeometry(
        0.3 + Math.random() * 0.8, // Size variation: 0.3 to 1.1
        20 + Math.floor(Math.random() * 12), // Segment variation: 20-32
        10 + Math.floor(Math.random() * 10)  // Ring variation: 10-20
      );
      
      // Create fully opaque materials with rich colors and varied finishes
      const hue = Math.random() * 360;
      const saturation = 0.6 + Math.random() * 0.4; // 60-100% saturation for vibrancy
      const lightness = 0.4 + Math.random() * 0.3;  // 40-70% lightness
      
      // Different material types for variety
      const materialType = Math.random();
      let material;
      
      if (materialType < 0.3) {
        // Metallic finish (30%)
        material = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(hue / 360, saturation, lightness),
          metalness: 0.7 + Math.random() * 0.3,
          roughness: 0.1 + Math.random() * 0.3,
          emissive: new THREE.Color().setHSL(hue / 360, saturation * 0.5, lightness * 0.1)
        });
      } else if (materialType < 0.6) {
        // Glossy finish (30%)
        material = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(hue / 360, saturation, lightness),
          shininess: 80 + Math.random() * 120,
          specular: new THREE.Color(0.2, 0.2, 0.2),
          emissive: new THREE.Color().setHSL(hue / 360, saturation * 0.3, lightness * 0.05)
        });
      } else {
        // Matte/Lambert finish (40%)
        material = new THREE.MeshLambertMaterial({
          color: new THREE.Color().setHSL(hue / 360, saturation, lightness),
          emissive: new THREE.Color().setHSL(hue / 360, saturation * 0.2, lightness * 0.03)
        });
      }
      
      const blob = new THREE.Mesh(geometry, material);
      
      // More varied positioning in 3D space
      const radius = 6 + Math.random() * 16; // Distance from center: 6-22 units
      const theta = Math.random() * Math.PI * 2; // Random angle
      const phi = Math.random() * Math.PI; // Random elevation
      
      blob.position.x = radius * Math.sin(phi) * Math.cos(theta);
      blob.position.y = (Math.random() - 0.5) * 20; // Y: -10 to 10
      blob.position.z = radius * Math.sin(phi) * Math.sin(theta);
      
      // Random initial rotation
      blob.rotation.x = Math.random() * Math.PI * 2;
      blob.rotation.y = Math.random() * Math.PI * 2;
      blob.rotation.z = Math.random() * Math.PI * 2;
      
      // More varied scale
      const scale = 0.4 + Math.random() * 1.2; // Scale: 0.4x to 1.6x
      blob.scale.setScalar(scale);
      
      // Enhanced personality traits for more distinct behaviors
      blob.userData = {
        // Movement behavior types
        behaviorType: Math.floor(Math.random() * 5), // 5 different behavior types
        
        // Swimming behavior
        swimSpeed: 0.2 + Math.random() * 0.8, // Speed: 0.2 to 1.0
        swimDirection: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 0.6, // Slightly more Y movement
          (Math.random() - 0.5) * 2
        ).normalize(),
        
        // Enhanced personality traits
        isHyperactive: Math.random() < 0.25, // 25% are hyperactive
        isShy: Math.random() < 0.15, // 15% are shy
        isFloater: Math.random() < 0.3, // 30% prefer floating
        isPulser: Math.random() < 0.4, // 40% do pulsing animations
        isSpinner: Math.random() < 0.35, // 35% are spinners
        
        energy: Math.random(), // Energy level 0-1
        
        // Breathing/pulsing with more variation
        breathingRate: 0.3 + Math.random() * 2.0, // Breathing speed
        breathingIntensity: 0.03 + Math.random() * 0.15, // Scale variation
        
        // Enhanced rotation behavior
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.04,
          y: (Math.random() - 0.5) * 0.04,
          z: (Math.random() - 0.5) * 0.04
        },
        
        // Orbital motion with more complexity
        orbitRadius: 1 + Math.random() * 7,
        orbitSpeed: (Math.random() - 0.5) * 0.025,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitTilt: (Math.random() - 0.5) * Math.PI * 0.5, // Tilted orbits
        
        // Bobbing motion
        bobSpeed: 0.5 + Math.random() * 1.5,
        bobIntensity: 0.5 + Math.random() * 2.0,
        
        // Original position for reference
        originalPosition: blob.position.clone(),
        
        // Time offset for unique animation timing
        timeOffset: Math.random() * Math.PI * 2,
        
        // Color shifting for some blobs
        colorShift: Math.random() < 0.2, // 20% change colors slowly
        originalHue: hue
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

    // Add living blobs and enhanced particles
    const blobs = createLivingBlobs(sceneRef.current!);
    const particles = createEnhancedParticles(group);
    
    // Store references for animation updates
    (group as any).blobs = blobs;
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

    // Animate enhanced living blobs with organic swimming motion
    const blobs = (hexagonRef.current as any).blobs;
    if (blobs) {
      blobs.forEach((blobData: any, index: number) => {
        const time = elapsedTime;
        const userData = blobData;
        const timeWithOffset = time + userData.timeOffset;
        
        // Behavior-based movement system
        switch (userData.behaviorType) {
          case 0: // Orbital swimmers
            {
              const orbitX = Math.cos(timeWithOffset * userData.orbitSpeed + userData.orbitAngle) * userData.orbitRadius;
              const orbitZ = Math.sin(timeWithOffset * userData.orbitSpeed + userData.orbitAngle) * userData.orbitRadius;
              const orbitY = Math.sin(timeWithOffset * userData.orbitSpeed * 0.5 + userData.orbitTilt) * userData.orbitRadius * 0.3;
              
              blobData.mesh.position.x = userData.originalPosition.x + orbitX;
              blobData.mesh.position.y = userData.originalPosition.y + orbitY;
              blobData.mesh.position.z = userData.originalPosition.z + orbitZ;
            }
            break;
            
          case 1: // Figure-8 swimmers
            {
              const swimTime = timeWithOffset * userData.swimSpeed;
              const figureX = Math.sin(swimTime) * 4;
              const figureZ = Math.sin(swimTime * 2) * 2;
              const figureY = Math.cos(swimTime * 0.5) * 1.5;
              
              blobData.mesh.position.x = userData.originalPosition.x + figureX;
              blobData.mesh.position.y = userData.originalPosition.y + figureY;
              blobData.mesh.position.z = userData.originalPosition.z + figureZ;
            }
            break;
            
          case 2: // Pulsing floaters
            {
              const pulseIntensity = userData.isPulser ? 3 : 1;
              const pulseX = Math.sin(timeWithOffset * 0.7) * pulseIntensity;
              const pulseY = Math.cos(timeWithOffset * 0.5) * pulseIntensity;
              const pulseZ = Math.sin(timeWithOffset * 0.9) * pulseIntensity;
              
              blobData.mesh.position.x = userData.originalPosition.x + pulseX;
              blobData.mesh.position.y = userData.originalPosition.y + pulseY;
              blobData.mesh.position.z = userData.originalPosition.z + pulseZ;
            }
            break;
            
          case 3: // Linear swimmers with direction changes
            {
              const direction = userData.swimDirection || new THREE.Vector3(1, 0, 1).normalize();
              // Change direction occasionally
              if (Math.floor(timeWithOffset * 0.2) % 10 === 0) {
                direction.x += (Math.random() - 0.5) * 0.1;
                direction.z += (Math.random() - 0.5) * 0.1;
                direction.normalize();
              }
              
              const swimDistance = timeWithOffset * userData.swimSpeed * 2;
              blobData.mesh.position.x = userData.originalPosition.x + direction.x * swimDistance;
              blobData.mesh.position.y = userData.originalPosition.y + Math.sin(timeWithOffset * (userData.bobSpeed || 1)) * (userData.bobIntensity || 1);
              blobData.mesh.position.z = userData.originalPosition.z + direction.z * swimDistance;
            }
            break;
            
          case 4: // Spiral swimmers
            {
              const spiralTime = timeWithOffset * userData.swimSpeed;
              const spiralRadius = 2 + Math.sin(spiralTime * 0.3) * 2;
              const spiralHeight = spiralTime * 0.5;
              
              blobData.mesh.position.x = userData.originalPosition.x + Math.cos(spiralTime) * spiralRadius;
              blobData.mesh.position.y = userData.originalPosition.y + Math.sin(spiralHeight) * 3;
              blobData.mesh.position.z = userData.originalPosition.z + Math.sin(spiralTime) * spiralRadius;
            }
            break;
            
          default: // Fallback to original swimming
            {
              const swimTimeX = time * userData.swimSpeed + (userData.swimOffset || 0);
              const swimTimeY = time * userData.swimSpeed * 0.7 + (userData.swimOffset || 0) * 1.3;
              const swimTimeZ = time * userData.swimSpeed * 1.1 + (userData.swimOffset || 0) * 0.8;
              
              const swimX = Math.sin(swimTimeX) * (userData.swimAmplitude || 1) * (userData.swimDirectionX || 1);
              const swimY = Math.sin(swimTimeY) * (userData.swimAmplitude || 1) * 0.5 * (userData.swimDirectionY || 1);
              const swimZ = Math.cos(swimTimeZ) * (userData.swimAmplitude || 1) * (userData.swimDirectionZ || 1);
              
              blobData.mesh.position.x = userData.originalPosition.x + swimX;
              blobData.mesh.position.y = userData.originalPosition.y + swimY;
              blobData.mesh.position.z = userData.originalPosition.z + swimZ;
            }
        }
        
        // Enhanced rotation with personality
        if (userData.isSpinner) {
          blobData.mesh.rotation.x += (userData.rotationSpeed?.x || 0.01) * 3; // Spinners rotate faster
          blobData.mesh.rotation.y += (userData.rotationSpeed?.y || 0.01) * 3;
          blobData.mesh.rotation.z += (userData.rotationSpeed?.z || 0.01) * 3;
        } else {
          blobData.mesh.rotation.x += userData.rotationSpeed?.x || userData.rotationSpeedX || 0.01;
          blobData.mesh.rotation.y += userData.rotationSpeed?.y || userData.rotationSpeedY || 0.01;
          blobData.mesh.rotation.z += userData.rotationSpeed?.z || userData.rotationSpeedZ || 0.01;
        }
        
        // Enhanced breathing animation
        if (userData.isPulser) {
          const breathing = 1 + Math.sin(timeWithOffset * (userData.breathingRate || 1)) * (userData.breathingIntensity || 0.1) * 2;
          blobData.mesh.scale.setScalar(breathing);
        } else {
          const breathing = 1 + Math.sin(timeWithOffset * (userData.breathingRate || userData.breathingSpeed || 1)) * (userData.breathingIntensity || userData.breathingAmplitude || 0.1);
          blobData.mesh.scale.setScalar(breathing);
        }
        
        // Hyperactive behavior - more erratic movement
        if (userData.isHyperactive) {
          const jitter = 0.3;
          blobData.mesh.position.x += (Math.random() - 0.5) * jitter;
          blobData.mesh.position.y += (Math.random() - 0.5) * jitter;
          blobData.mesh.position.z += (Math.random() - 0.5) * jitter;
        }
        
        // Color shifting for dynamic blobs
        if (userData.colorShift && Math.random() < 0.001) {
          const material = blobData.mesh.material;
          const newHue = (userData.originalHue + time * 10) % 360;
          material.color.setHSL(newHue / 360, 0.7, 0.5);
          if (material.emissive) {
            material.emissive.setHSL(newHue / 360, 0.3, 0.1);
          }
        }
        
        // Keep blobs within bounds and create wrapping effect
        const maxDistance = 25;
        if (blobData.mesh.position.length() > maxDistance) {
          blobData.mesh.position.normalize().multiplyScalar(maxDistance);
          // Randomly adjust original position to create variety
          userData.originalPosition = blobData.mesh.position.clone();
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
      isMouseDown.current = true;
      mousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown.current || !cameraRef.current) return;

      const deltaX = event.clientX - mousePosition.current.x;
      const deltaY = event.clientY - mousePosition.current.y;

      // Update camera rotation
      cameraRotation.current.y += deltaX * 0.005;
      cameraRotation.current.x += deltaY * 0.005;

      // Clamp vertical rotation
      cameraRotation.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraRotation.current.x));

      // Apply rotation to camera
      const radius = 25;
      cameraRef.current.position.x = radius * Math.cos(cameraRotation.current.x) * Math.cos(cameraRotation.current.y);
      cameraRef.current.position.y = radius * Math.sin(cameraRotation.current.x);
      cameraRef.current.position.z = radius * Math.cos(cameraRotation.current.x) * Math.sin(cameraRotation.current.y);
      
      cameraRef.current.lookAt(0, 0, 0);

      mousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const element = mountRef.current;
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [observationMode]);

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
  }, [currentSection, reducedMotion]);

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
