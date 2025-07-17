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

  // Enhanced living blobs with organic movement and personality - INDEPENDENT OF PAGE
  const createOrganicBlobs = (group: THREE.Group) => {
    const blobs: any[] = [];
    const blobCount = 18 + Math.floor(Math.random() * 7); // 18-25 blobs
    
    // Create blobs with better spacing to prevent overlap
    const positions: THREE.Vector3[] = [];
    
    for (let i = 0; i < blobCount; i++) {
      // Generate position with collision avoidance
      let position: THREE.Vector3;
      let attempts = 0;
      const maxAttempts = 50;
      
      do {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.8 + Math.random() * 2.2; // 0.8 to 3.0 radius
        const height = (Math.random() - 0.5) * 2.0; // -1.0 to 1.0 height
        
        position = new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        );
        attempts++;
      } while (attempts < maxAttempts && positions.some(pos => pos.distanceTo(position) < 0.4));
      
      positions.push(position);
      
      // Much smaller blobs for better density
      const baseScale = 0.06 + Math.random() * 0.12; // 0.06 to 0.18 (smaller)
      const scale = new THREE.Vector3(
        baseScale * (0.9 + Math.random() * 0.2),
        baseScale * (0.9 + Math.random() * 0.2),
        baseScale * (0.9 + Math.random() * 0.2)
      );
      
      // Rare black blobs with white eyes (1/100 chance)
      const isRareBlackBlob = Math.random() < 0.01;
      
      // Create blob geometry
      const geometry = new THREE.SphereGeometry(1, 12, 10);
      
      // Strict neon palette: cyan, yellow, and in-between
      const neonPalette = [
        { color: 0x00ffff, emissive: 0x00eedd, type: 'cyan' },
        { color: 0xffff00, emissive: 0xeedd00, type: 'yellow' },
        { color: 0x88ffee, emissive: 0x44eecc, type: 'mix' },
        { color: 0xffee88, emissive: 0xeedd44, type: 'mix' }
      ];
      const isUnique = Math.random() < 0.08;
      let paletteChoice = neonPalette[Math.floor(Math.random() * neonPalette.length)];
      if (isUnique) {
        paletteChoice = { color: 0xffffff, emissive: 0x00ffff, type: 'unique' };
      }
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(paletteChoice.color),
        emissive: new THREE.Color(paletteChoice.emissive),
        emissiveIntensity: isUnique ? 0.8 : 0.6,
        transparent: false,
        shininess: 90
      });
      const blob = new THREE.Mesh(geometry, material);
      blob.position.copy(position);
      blob.scale.copy(scale);
      // Random start rotation for organic look
      blob.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      // --- Eyes ---
      const eyeGeometry = new THREE.SphereGeometry(isUnique ? 0.15 : 0.12, 8, 6); // Bigger eyes
      const eyeMaterial = new THREE.MeshPhongMaterial({
        color: isUnique ? 0xffffff : 0x000000,
        emissive: isUnique ? 0x00ffff : 0x001133,
        emissiveIntensity: isUnique ? 0.6 : 0.3,
        shininess: 100
      });
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.28, 0.18, 0.85);
      rightEye.position.set(0.28, 0.18, 0.85);
      blob.add(leftEye);
      blob.add(rightEye);
      blob.userData.leftEye = leftEye;
      blob.userData.rightEye = rightEye;
      
      // --- Personality & Energy ---
      let energy = 1.0;
      let behaviorType = 'neutral';
      if (paletteChoice.type === 'cyan') {
        energy = 0.5 + Math.random() * 0.3;
        behaviorType = 'calm';
      } else if (paletteChoice.type === 'yellow') {
        energy = 1.2 + Math.random() * 0.4;
        behaviorType = 'energetic';
      } else if (paletteChoice.type === 'unique') {
        energy = 1.5;
        behaviorType = 'unique';
      }
      
      // Personality-driven behavior (independent of page)
      blob.userData = {
        originalPosition: blob.position.clone(),
        originalScale: scale.clone(),
        
        // More fluid swimming behavior for aquarium effect
        swimmingSpeed: 0.4 + Math.random() * 0.8, // 0.4-1.2 speed
        swimmingDirection: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 2
        ).normalize(),
        swimmingPhase: Math.random() * Math.PI * 2,
        
        // More pronounced organic pulsing
        breathingPhase: Math.random() * Math.PI * 2,
        breathingSpeed: 1.0 + Math.random() * 1.0, // 1.0-2.0
        
        // Natural rotation and bobbing
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        bobbingPhase: Math.random() * Math.PI * 2,
        bobbingSpeed: 0.8 + Math.random() * 0.6, // 0.8-1.4
        
        // Individual characteristics
        isRareBlackBlob,
        personalityType: Math.floor(Math.random() * 4), // 0: curious, 1: shy, 2: playful, 3: lazy
        
        // Swimming territory
        homePosition: position.clone(),
        wanderRadius: 1.2 + Math.random() * 1.8, // 1.2-3.0 wander distance
        currentTarget: null,
        targetReachTime: 0,
        avoidanceRadius: 0.25, // Closer for more interaction
        
        // Activity cycles
        restCycle: Math.random() * 400 + 200, // Rest every 3-10 seconds
        restDuration: Math.random() * 150 + 50, // Rest for 1-3 seconds
        isResting: false,
        restTimer: 0,
        
        // Eye movement
        eyeLookDirection: new THREE.Vector3(0, 0, 1),
        eyeBlinkTimer: Math.random() * 180,
        
        // Collision avoidance
        neighbors: [],
        separationForce: new THREE.Vector3(),
        
        energy
      };
      
      // Add proper neon eyes that glow
      if (!isRareBlackBlob) {
        // Regular blob with glowing black eyes
        const eyeGeometry = new THREE.SphereGeometry(0.09, 8, 6); // Slightly larger
        const eyeMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x000000,
          emissive: 0x001133,
          emissiveIntensity: 0.2,
          shininess: 100
        });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        
        // Position eyes on the front face, more prominent
        leftEye.position.set(-0.25, 0.15, 0.85);
        rightEye.position.set(0.25, 0.15, 0.85);
        
        blob.add(leftEye);
        blob.add(rightEye);
        
        // Store eye references for animation
        blob.userData.leftEye = leftEye;
        blob.userData.rightEye = rightEye;
        
      } else {
        // Rare black blob with bright glowing white/cyan eyes
        const eyeGeometry = new THREE.SphereGeometry(0.09, 8, 6);
        const eyeMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xffffff,
          emissive: 0x00ffff,
          emissiveIntensity: 0.6,
          shininess: 100
        });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        
        leftEye.position.set(-0.25, 0.15, 0.85);
        rightEye.position.set(0.25, 0.15, 0.85);
        
        blob.add(leftEye);
        blob.add(rightEye);
        
        // Store eye references for animation
        blob.userData.leftEye = leftEye;
        blob.userData.rightEye = rightEye;
      }
      
      group.add(blob);
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

    // Add living blobs and enhanced particles - INDEPENDENT OF PAGE CHANGES
    const blobs = createOrganicBlobs(group); // Independent swimming behavior, now part of rotating group
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

    // Animate living blobs with natural swimming behavior and collision avoidance
    const blobs = (hexagonRef.current as any).blobs;
    if (blobs && Array.isArray(blobs)) {
      // First pass: calculate neighbors and separation forces
      blobs.forEach((blob: any, index: number) => {
        const userData = blob.userData;
        if (!userData) return;
        
        userData.neighbors = [];
        userData.separationForce.set(0, 0, 0);
        
        // Find nearby blobs for collision avoidance
        blobs.forEach((otherBlob: any, otherIndex: number) => {
          if (index === otherIndex || !otherBlob.userData) return;
          
          const distance = blob.position.distanceTo(otherBlob.position);
          if (distance < userData.avoidanceRadius) {
            userData.neighbors.push(otherBlob);
            
            // Calculate separation force
            const separation = new THREE.Vector3()
              .subVectors(blob.position, otherBlob.position)
              .normalize()
              .multiplyScalar((userData.avoidanceRadius - distance) * 0.01);
            
            userData.separationForce.add(separation);
          }
        });
      });
      
      // Second pass: update positions and animations
      blobs.forEach((blob: any, index: number) => {
        const userData = blob.userData;
        if (!userData) return;
        
        userData.age += deltaTime;
        userData.restTimer += deltaTime * 60;
        
        // Rest cycle - more natural timing
        if (userData.restTimer >= userData.restCycle) {
          userData.isResting = true;
          userData.restTimer = 0;
        }
        
        if (userData.isResting && userData.restTimer >= userData.restDuration) {
          userData.isResting = false;
          userData.restCycle = Math.random() * 400 + 200; // 3-10 seconds
          userData.restDuration = Math.random() * 150 + 50; // 1-3 seconds
          
          // Choose new swimming direction after rest
          userData.swimmingDirection = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 0.6,
            (Math.random() - 0.5) * 2
          ).normalize();
        }
        
        // Natural breathing - varies with personality and activity + aquarium bobbing
        const breathingIntensity = userData.isResting ? 0.04 : 
                                   userData.personalityType === 2 ? 0.15 : // playful
                                   userData.personalityType === 3 ? 0.06 : // lazy
                                   0.10; // normal
        
        const breathingScale = 1 + Math.sin(elapsedTime * userData.breathingSpeed + userData.breathingPhase) * breathingIntensity;
        blob.scale.copy(userData.originalScale).multiplyScalar(breathingScale);
        
        // Add aquarium-like floating and bobbing motion
        const floatBob = Math.sin(elapsedTime * userData.breathingSpeed * 0.6 + userData.swimmingPhase) * 0.12;
        const slowDrift = Math.sin(elapsedTime * 0.15 + index * 2.1) * 0.08;
        const baseY = userData.homePosition.y + floatBob + slowDrift;
        
        if (!userData.isResting) {
          // Swimming movement with personality + enhanced aquarium motion
          const personalitySpeed = userData.personalityType === 2 ? 1.3 : // playful
                                   userData.personalityType === 3 ? 0.5 : // lazy
                                   userData.personalityType === 1 ? 0.7 : // shy
                                   1.0; // curious
          
          const swimmingWave = Math.sin(elapsedTime * userData.swimmingSpeed + userData.swimmingPhase);
          const swimmingOffset = new THREE.Vector3()
            .copy(userData.swimmingDirection)
            .multiplyScalar(swimmingWave * 0.006 * personalitySpeed);
          
          // Apply collision avoidance
          swimmingOffset.add(userData.separationForce);
          
          blob.position.add(swimmingOffset);
          blob.position.y = baseY; // Maintain floating motion
          
          // Enhanced natural rotation while swimming with aquarium-like motion
          const rotationIntensity = 0.3 + swimmingWave * 0.7;
          const aquariumSway = Math.sin(elapsedTime * 0.8 + userData.swimmingPhase) * 0.004;
          blob.rotation.x += userData.rotationSpeed.x * rotationIntensity + aquariumSway;
          blob.rotation.y += userData.rotationSpeed.y * rotationIntensity;
          blob.rotation.z += userData.rotationSpeed.z * rotationIntensity + aquariumSway * 0.5;
          
          // Organic wandering behavior
          if (!userData.currentTarget || userData.targetReachTime > 400) {
            const wanderAngle = Math.random() * Math.PI * 2;
            const wanderDistance = Math.random() * userData.wanderRadius;
            userData.currentTarget = new THREE.Vector3(
              userData.homePosition.x + Math.cos(wanderAngle) * wanderDistance,
              userData.homePosition.y + (Math.random() - 0.5) * 0.8,
              userData.homePosition.z + Math.sin(wanderAngle) * wanderDistance
            );
            userData.targetReachTime = 0;
          }
          
          // Gentle movement toward target
          if (userData.currentTarget) {
            const directionToTarget = new THREE.Vector3()
              .subVectors(userData.currentTarget, blob.position)
              .normalize()
              .multiplyScalar(0.003);
            
            blob.position.add(directionToTarget);
            userData.targetReachTime++;
            
            if (blob.position.distanceTo(userData.currentTarget) < 0.15) {
              userData.currentTarget = null;
            }
          }
        }
        
        // Soft boundary keeping - gentle containment
        const distanceFromCenter = blob.position.length();
        if (distanceFromCenter > 3.0) {
          const returnForce = new THREE.Vector3()
            .copy(blob.position)
            .normalize()
            .multiplyScalar(-0.008 * (distanceFromCenter - 3.0));
          
          blob.position.add(returnForce);
          
          // Gradually adjust home position to prevent edge clustering
          if (distanceFromCenter > 2.5) {
            userData.homePosition.lerp(new THREE.Vector3(0, 0, 0), 0.01);
          }
        }
        
        // Enhanced eye animation with natural movement tracking and aquarium curiosity
        if (userData.leftEye && userData.rightEye) {
          userData.eyeBlinkTimer++;
          
          // Enhanced eye tracking with aquarium curiosity behavior
          const lookDirection = new THREE.Vector3(
            Math.sin(elapsedTime * 0.4 + index) * 0.35,
            Math.cos(elapsedTime * 0.3 + index) * 0.25,
            0
          );
          
          // Apply eye movement
          userData.leftEye.position.x = -0.25 + lookDirection.x;
          userData.leftEye.position.y = 0.15 + lookDirection.y;
          userData.rightEye.position.x = 0.25 + lookDirection.x;
          userData.rightEye.position.y = 0.15 + lookDirection.y;
          
          // Natural blinking with enhanced glow effects
          if (userData.eyeBlinkTimer > 180 + Math.random() * 360) {
            const blinkProgress = (userData.eyeBlinkTimer - 180) / 40;
            const blinkScale = Math.max(0.1, 1.0 - Math.sin(blinkProgress * Math.PI) * 0.9);
            userData.leftEye.scale.y = blinkScale;
            userData.rightEye.scale.y = blinkScale;
            
            if (blinkProgress > 1.0) {
              userData.eyeBlinkTimer = 0;
            }
          } else {
            userData.leftEye.scale.y = 1;
            userData.rightEye.scale.y = 1;
            
            // Enhanced pulsing glow for eyes based on personality and aquarium ambiance
            const baseGlow = userData.personalityType === 0 ? 0.25 : // curious - brighter
                             userData.personalityType === 2 ? 0.35 : // playful - brightest  
                             0.15; // others - dimmer
            
            const glowPulse = Math.sin(elapsedTime * 2.5 + userData.breathingPhase) * 0.15;
            const finalGlow = baseGlow + glowPulse;
            
            if (userData.leftEye.material && userData.leftEye.material.emissiveIntensity !== undefined) {
              userData.leftEye.material.emissiveIntensity = finalGlow;
              userData.rightEye.material.emissiveIntensity = finalGlow;
            }
          }
        }
        
        // Enhanced body glow pulsing tied to breathing and aquarium ambiance
        if (blob.material && blob.material.emissive) {
          const breathingPulse = Math.sin(elapsedTime * userData.breathingSpeed + userData.breathingPhase) * 0.2;
          const personalityBoost = userData.personalityType === 2 ? 0.15 : // playful gets extra glow
                                   userData.personalityType === 0 ? 0.1 : // curious gets some glow
                                   0; // others normal
          
          const baseEmission = 0.4;
          const finalEmission = Math.min(0.8, baseEmission + breathingPulse + personalityBoost);
          blob.material.emissiveIntensity = finalEmission;
        }
      });
    }

    // Animate enhanced particles with aquarium ambiance
    const particles = (hexagonRef.current as any).particles;
    if (particles && particles.userData) {
      particles.rotation.y += 0.0005; // Slower rotation
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const velocities = particles.userData.velocities;
      const originalPositions = particles.userData.originalPositions;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Apply velocities with aquarium floating motion
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Enhanced gentle wave motion for aquarium feel
        positions[i] = originalPositions[i] + Math.sin(elapsedTime * 1.5 + i * 0.1) * 0.003;
        positions[i + 1] = originalPositions[i + 1] + Math.sin(elapsedTime * 2 + i * 0.1) * 0.002;
        positions[i + 2] = originalPositions[i + 2] + Math.cos(elapsedTime * 1.8 + i * 0.1) * 0.003;
        
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
