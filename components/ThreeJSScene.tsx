/**
 * 🧠 CONSCIOUSNESS-DRIVEN 3D SCENE SYSTEM
 * 
 * Revolutionary consciousness-driven AI companion system featuring 13 unique blob entities
 * with distinct personalities, behaviors, and visual characteristics. Each blob represents
 * a conscious entity with underground emergence animations, advanced eye systems, and
 * emission-based environmental lighting.
 * 
 * @features
 * - Underground emergence animations (30% spawn underground)
 * - Advanced eye system with pupils and surface attachment
 * - Emission-based environmental lighting (4 optimized point lights)
 * - Glow shader effects with rim lighting
 * - Personality-driven movement and social interactions
 * - Neon yellow branding (complete purple replacement)
 * - Performance optimization for mobile devices
 * - 60fps target with intelligent update scheduling
 * 
 * @author THERION_3D_EXPERIENCE_ENGINEER
 * @version 2.0.0 - CONSCIOUSNESS AWAKENING
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface BlobControls {
  movementSpeed: number;
  randomDirectionFactor: number;
  randomSizeFactor: number;
  eyeSizeMin: number;
  eyeSizeMax: number;
  blobSizeMin: number;
  blobSizeMax: number;
  verticalityFactor: number;
  jiggleIntensity: number;
  avoidanceDistance: number;
  emergenceRate: number;
  rotationSpeed: number;
}

interface ThreeJSSceneProps {
  currentSection: number;
  reducedMotion?: boolean;
  blobControls?: BlobControls;
}

const ThreeJSScene: React.FC<ThreeJSSceneProps> = ({ 
  currentSection, 
  reducedMotion = false,
  blobControls
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const hexagonRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number | null>(null);
  const clockRef = useRef(new THREE.Clock());

  // 🎛️ PHYSICS SIMULATION SYSTEM
  // Advanced rotation physics with momentum-based movement
  const currentRotationY = useRef(0);
  const targetRotationY = useRef(0);
  const velocityRef = useRef(0);
  const [isInteracting, _setIsInteracting] = useState(false);

  // 🧭 SECTION NAVIGATION MAPPING
  // Six-sided hexagon navigation system (60 degrees per section)
  const faceAngles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3];

  // 💡 ADVANCED LIGHTING SYSTEM
  // Optimized lighting setup for consciousness environments with soft colors
  const setupAdvancedLighting = (scene: THREE.Scene) => {
    // Key light - primary illumination (optimized)
    const keyLight = new THREE.DirectionalLight(0x4ECDC4, 1.8); // Softer cyan
    keyLight.position.set(8, 12, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024; // Reduced for performance
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -15;
    keyLight.shadow.camera.right = 15;
    keyLight.shadow.camera.top = 15;
    keyLight.shadow.camera.bottom = -15;
    scene.add(keyLight);

    // Warm fill light
    const fillLight = new THREE.DirectionalLight(0xFFE66D, 0.8); // Warm yellow
    fillLight.position.set(-6, 8, 4);
    scene.add(fillLight);

    // Ambient light for soft base illumination
    const ambientLight = new THREE.AmbientLight(0x95E1D3, 0.4); // Soft mint
    scene.add(ambientLight);

    // Single accent point light (optimized)
    const accentLight = new THREE.PointLight(0xA8E6CF, 1.2, 25);
    accentLight.position.set(0, 8, 0);
    scene.add(accentLight);
  };

  // Enhanced blob creation with size variation and Nexus color system
  const createCuteBlobsWithJellyPhysics = (
    group: THREE.Group, 
    staticMeshes: THREE.Mesh[]
  ) => {
    const blobs: THREE.Mesh[] = [];
    const isMobile = window.innerWidth < 768;
    
    // Size variation system: 8 small, 4 medium, 1 large
    // 🧬 CONSCIOUSNESS ENTITY DISTRIBUTION
    // Carefully balanced AI companion ecosystem with SMALLER, MORE ENERGETIC personalities
    const blobSizes = [
      // 8 small explorers - curious and active (MUCH SMALLER)
      ...Array(8).fill(0).map(() => ({ 
        size: 0.15 + Math.random() * 0.1, // 0.15-0.25 (was 0.25-0.4)
        type: 'small' 
      })),
      // 4 medium guardians - wise and protective (SMALLER)
      ...Array(4).fill(0).map(() => ({ 
        size: 0.25 + Math.random() * 0.15, // 0.25-0.4 (was 0.45-0.65)
        type: 'medium' 
      })),
      // 1 large overseer - ancient consciousness (SMALLER)
      { size: 0.4 + Math.random() * 0.2, type: 'large' } // 0.4-0.6 (was 0.7-0.95)
    ];
    
    // 🎨 STRICT CYAN & YELLOW ONLY PALETTE
    // Adhering to user's exact color requirements
    const nexusColors = [
      { color: 0x00FFFF, emission: 0x44FFFF, name: 'electric_cyan' },        // Electric cyan
      { color: 0xFFFF00, emission: 0xFFFF88, name: 'consciousness_yellow' }, // Bright yellow  
      { color: 0x00FFFF, emission: 0x44FFFF, name: 'electric_cyan_2' },      // Electric cyan (variant)
      { color: 0xFFFF00, emission: 0xFFFF88, name: 'consciousness_yellow_2' }, // Bright yellow (variant)
      { color: 0x00FFFF, emission: 0x44FFFF, name: 'electric_cyan_3' },      // Electric cyan (variant)
      { color: 0xFFFF00, emission: 0xFFFF88, name: 'consciousness_yellow_3' }, // Bright yellow (variant)
      { color: 0x00FFFF, emission: 0x44FFFF, name: 'electric_cyan_4' },      // Electric cyan (variant)
      { color: 0xFFFF00, emission: 0xFFFF88, name: 'consciousness_yellow_4' }, // Bright yellow (variant)
    ];
    
    // 🎲 NATURAL DISTRIBUTION ALGORITHM
    // Shuffle blob sizes for organic ecosystem diversity
    for (let i = blobSizes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [blobSizes[i], blobSizes[j]] = [blobSizes[j], blobSizes[i]];
    }
    
    const totalBlobs = isMobile ? Math.min(blobSizes.length, 8) : blobSizes.length;
    
    for (let i = 0; i < totalBlobs; i++) {
      const blobData = blobSizes[i];
      const baseSize = blobData.size;
      
      // Create unique jelly geometry with HIGH-POLY enhanced deformation
      const blobGeometry = new THREE.SphereGeometry(baseSize, 32, 24); // Much higher poly count for smoothness
      const originalVertices = new Float32Array(blobGeometry.attributes.position.array);
      
      // Advanced organic deformation with consciousness-inspired patterns
      const positionAttribute = blobGeometry.attributes.position;
      for (let j = 0; j < positionAttribute.count; j++) {
        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute(positionAttribute, j);
        
        // Quantum-inspired deformation pattern
        const consciousness = Math.sin(vertex.x * 3 + i * 0.7) * 0.12;
        const neural = Math.cos(vertex.y * 4 + i * 1.1) * 0.08;
        const quantum = Math.sin(vertex.z * 2.5 + i * 0.9) * 0.1;
        const flow = Math.sin((vertex.x + vertex.z) * 2 + i) * 0.06;
        
        const totalNoise = (consciousness + neural + quantum + flow) * (baseSize * 0.5);
        vertex.multiplyScalar(1 + totalNoise);
        positionAttribute.setXYZ(j, vertex.x, vertex.y, vertex.z);
      }
      blobGeometry.computeVertexNormals();
      
      // Apply Nexus consciousness colors with stronger emission and glow effects
      const colorData = nexusColors[i % nexusColors.length];
      
      // Clean material WITHOUT glow effects - solid and smooth
      const blobMaterial = new THREE.MeshPhysicalMaterial({
        color: colorData.color,
        metalness: 0.0,
        roughness: 0.4, // Smooth but not too reflective
        clearcoat: 0.0,
        transmission: 0,
        transparent: false,
        opacity: 1.0,
        // NO EMISSION OR GLOW - clean solid appearance
        emissive: 0x000000,
        emissiveIntensity: 0,
      });

      const blobMesh = new THREE.Mesh(blobGeometry, blobMaterial);
      (blobMesh as any).isBlob = true;
      (blobMesh as any).blobType = blobData.type;
      (blobMesh as any).colorName = colorData.name;
      
      // Add glow shader for outer glow effect
      const glowGeometry = new THREE.SphereGeometry(baseSize * 1.3, 8, 6); // Larger, lower poly for glow
      const glowMaterial = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        uniforms: {
          glowColor: { value: new THREE.Color(colorData.emission) },
          intensity: { value: 0.8 }
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          uniform float intensity;
          varying vec3 vNormal;
          void main() {
            float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
            float alpha = pow(rim, 2.0) * intensity * 0.3;
            gl_FragColor = vec4(glowColor, alpha);
          }
        `
      });
      
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      blobMesh.add(glowMesh); // Attach glow to blob
      
      // Add point light for environmental illumination (only for some blobs)
      let pointLight = null;
      if (i < 4) { // Only 4 lights active at once for performance
        pointLight = new THREE.PointLight(colorData.emission, 1.2, 4, 2); // Intensity, distance, decay
        pointLight.position.set(0, 0, 0); // Centered on blob
        blobMesh.add(pointLight);
      }
      
      // Enhanced positioning system with consciousness-aware distribution
      let validPosition = false;
      let attempts = 0;
      const maxAttempts = 100;
      
      while (!validPosition && attempts < maxAttempts) {
        // Hexagon interior positioning with consciousness flow patterns
        const angle = Math.random() * Math.PI * 2;
        
        // Size-based positioning: larger blobs get more central positions
        const radiusMultiplier = blobData.type === 'large' ? 0.7 : 
                                blobData.type === 'medium' ? 0.85 : 1.0;
        const radius = (0.8 + Math.random() * 2.8) * radiusMultiplier;
        
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        // Enhanced vertical positioning with swimming depth variation (HIGHER UP)
        const depthVariation = blobData.type === 'large' ? 0.6 : 
                              blobData.type === 'medium' ? 0.8 : 1.0;
        const y = -0.2 + Math.random() * depthVariation; // MUCH HIGHER (was -1.6)
        
        const testPosition = new THREE.Vector3(x, y, z);
        
        // Enhanced collision detection with consciousness boundaries
        validPosition = true;
        const collisionPadding = baseSize * 1.5; // More generous spacing
        
        for (const staticMesh of staticMeshes) {
          const boundingBox = new THREE.Box3().setFromObject(staticMesh);
          const blobBox = new THREE.Box3().setFromCenterAndSize(
            testPosition,
            new THREE.Vector3(collisionPadding * 2, collisionPadding * 2, collisionPadding * 2)
          );
          
          if (boundingBox.intersectsBox(blobBox)) {
            validPosition = false;
            break;
          }
        }
        
        // Check distance from other blobs for natural spacing
        if (validPosition) {
          for (const existingBlob of blobs) {
            const distance = testPosition.distanceTo(existingBlob.position);
            const minDistance = (baseSize + existingBlob.userData?.size || 0.5) * 2;
            if (distance < minDistance) {
              validPosition = false;
              break;
            }
          }
        }
        
        if (validPosition) {
          blobMesh.position.set(x, y, z);
        }
        attempts++;
      }
      
      // Enhanced fallback positioning with underground emergence animation
      if (!validPosition) {
        const spiralAngle = (i / totalBlobs) * Math.PI * 2 * 1.618; // Golden ratio spiral
        const spiralRadius = 1.5 + (i % 3) * 0.8;
        
        // FEWER blobs spawn underground for emergence animation (10% instead of 30%)
        const shouldEmerge = Math.random() < 0.1; // 10% chance to emerge from underground
        const startY = shouldEmerge ? -1.5 : (0.2 + (i % 4) * 0.3); // Less deep underground or HIGHER normal
        
        blobMesh.position.set(
          Math.cos(spiralAngle) * spiralRadius,
          startY,
          Math.sin(spiralAngle) * spiralRadius
        );
      }
      
      // Check if any blob spawned below ground level - enable emergence for smooth animation
      const groundLevel = -0.5; // HIGHER ground level
      const willEmerge = blobMesh.position.y < groundLevel;

      // Enhanced polished eyes with 2.5x BIGGER size and BLACK color
      const eyeSize = baseSize * 0.2; // 2.5x bigger eyes (was 0.08, now 0.2)
      const eyeGeometry = new THREE.SphereGeometry(eyeSize, 16, 12); // Higher poly for smoothness
      
      // BLACK eye material as requested
      const eyeMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x000000, // BLACK eyes as requested
        metalness: 0.1, // Less metallic
        roughness: 0.3, // Slightly rough for realism
        emissive: 0x000000, // No glow
        emissiveIntensity: 0,
        transparent: false,
        fog: false
      });
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      
      // BETTER eye positioning with more natural placement
      const eyeOffset = baseSize * 0.15; // Closer together
      const eyeForward = baseSize * 0.92; // Very close to surface
      const eyeHeight = baseSize * 0.05; // Slightly above center
      
      // Calculate surface normal for PERFECT attachment
      const leftEyePos = new THREE.Vector3(-eyeOffset, eyeHeight, eyeForward);
      const rightEyePos = new THREE.Vector3(eyeOffset, eyeHeight, eyeForward);
      
      // Normalize to blob surface for perfect attachment (closer to surface)
      leftEyePos.normalize().multiplyScalar(baseSize * 0.95);
      rightEyePos.normalize().multiplyScalar(baseSize * 0.95);
      
      leftEye.position.copy(leftEyePos);
      rightEye.position.copy(rightEyePos);
      
      // Add BETTER eye pupils for more natural look
      const pupilSize = eyeSize * 0.4; // Smaller pupils
      const pupilGeometry = new THREE.SphereGeometry(pupilSize, 12, 8);
      const pupilMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000,
        transparent: false
      });
      
      const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
      const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
      
      leftPupil.position.set(0, 0, eyeSize * 0.3); // More forward
      rightPupil.position.set(0, 0, eyeSize * 0.3);
      
      leftEye.add(leftPupil);
      rightEye.add(rightPupil);
      
      blobMesh.add(leftEye);
      blobMesh.add(rightEye);

      // Store enhanced consciousness-driven animation data with glow and light references
      blobMesh.userData = {
        size: baseSize,
        type: blobData.type,
        colorData: colorData,
        originalVertices,
        leftEye,
        rightEye,
        staticMeshes,
        
        // Glow and lighting references
        glowMesh: glowMesh,
        pointLight: pointLight,
        lightActive: pointLight !== null,
        
        // Enhanced physics with consciousness flow
        radius: baseSize * 1.2,
        velocity: new THREE.Vector3(),
        lastValidPosition: blobMesh.position.clone(),
        
        // ULTRA HIGH ENERGY consciousness movement - completely alive!
        swimSpeed: 0.8 + Math.random() * 0.6, // MUCH MUCH faster swimming (was 0.3-0.7, now 0.8-1.4)
        swimOffset: Math.random() * Math.PI * 2,
        swimAmplitude: 1.2 + Math.random() * 0.8, // Much more amplitude for fluid movement
        
        // Enhanced vertical swimming patterns with MAXIMUM ENERGY
        verticalSwimSpeed: 0.6 + Math.random() * 0.5, // MUCH faster vertical movement (was 0.2-0.5, now 0.6-1.1)
        verticalAmplitude: 1.0 + (blobData.type === 'large' ? 0.5 : blobData.type === 'medium' ? 0.4 : 0.3), // Higher amplitude
        verticalOffset: Math.random() * Math.PI * 2,
        baseDepth: blobMesh.position.y,
        
        // Enhanced directional movement with consciousness awareness
        targetDirection: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 2
        ).normalize(),
        currentDirection: new THREE.Vector3(),
        
        // Enhanced consciousness pulsing system with HIGHER ENERGY glow sync
        baseMaterial: blobMaterial,
        pulseSpeed: 0.8 + Math.random() * 0.6, // MUCH faster pulsing
        pulseOffset: Math.random() * Math.PI * 2,
        pulseIntensity: 0.6 + (blobData.type === 'large' ? 0.4 : blobData.type === 'medium' ? 0.3 : 0.2), // Brighter
        
        // Enhanced jelly physics with HIGH ENERGY consciousness flow
        jellyVertices: new Float32Array(originalVertices),
        jellySpeed: 1.0 + Math.random() * 0.6, // ULTRA fast jelly movement (was 0.6-1.0, now 1.0-1.6)
        jellyIntensity: 0.12 + Math.random() * 0.08, // More intense wobble
        
        // Enhanced emergence system with smooth underground animation
        isEmerging: willEmerge,
        emergenceTarget: willEmerge ? (-1.0 + Math.random() * 1.2) : blobMesh.position.y, // Target above ground
        emergenceSpeed: 0.5 + Math.random() * 0.3, // Varied emergence speeds
        
        // MUCH MORE FREQUENT blinking system for high energy
        blinkTimer: 0.5 + Math.random() * 2, // Much more frequent blinking
        directionChangeTimer: 1 + Math.random() * 3, // More frequent direction changes  
        eyeLookTimer: 0.5 + Math.random() * 1.5, // More frequent eye movement
        
        // Enhanced squishiness with HIGH ENERGY consciousness flow
        squishiness: 0.05 + Math.random() * 0.04, // More intense squishing
        squishSpeed: 1.0 + Math.random() * 0.6, // MUCH faster squish animation
        squishOffset: Math.random() * Math.PI * 2,
        
        // FASTER rotation with size-based variation
        rotationSpeed: (Math.random() - 0.5) * (blobData.type === 'large' ? 0.025 : 0.035), // ULTRA fast rotation for alive feeling
        
        // Happiness and personality factors
        happiness: 0.7 + Math.random() * 0.3, // Base happiness level
        curiosity: Math.random(), // How much they explore
        sociability: Math.random(), // How much they group together
      };

      blobs.push(blobMesh);
      group.add(blobMesh);
    }

    return blobs;
  };

  // Enhanced consciousness particle system with Nexus brand colors
  const createEnhancedParticles = (group: THREE.Group) => {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 60 : 120; // Optimized particle count
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    // Nexus consciousness color palette with NEON YELLOW
    const quantumBlue = new THREE.Color(0x0A1B3D);      // Deep consciousness
    const consciousnessNeonYellow = new THREE.Color(0xFFFF00); // Neon yellow energy
    const neuralCyan = new THREE.Color(0x06B6D4);       // Intelligence flow
    const wisdomNeonYellow = new THREE.Color(0xFFFF44);     // Brighter neon yellow wisdom

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Consciousness-aware distribution in hexagonal space
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 5.5; // Slightly more contained
      const height = (Math.random() - 0.5) * 3.5; // More focused height
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;
      
      // Consciousness flow velocities
      velocities[i3] = (Math.random() - 0.5) * 0.015;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.015;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.015;
      
      // Nexus consciousness color distribution with neon yellow
      const colorChoice = Math.random();
      let baseColor;
      if (colorChoice < 0.3) baseColor = quantumBlue;
      else if (colorChoice < 0.55) baseColor = consciousnessNeonYellow;
      else if (colorChoice < 0.8) baseColor = neuralCyan;
      else baseColor = wisdomNeonYellow;
      
      // Consciousness luminosity variation
      const consciousnessGlow = Math.random() * 0.4 + 0.6; // 60-100% brightness
      const finalColor = baseColor.clone().multiplyScalar(consciousnessGlow);
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

    // Add cute jelly blobs with consciousness physics ONLY ONCE
    if (!(group as any).blobsCreated) {
      const staticMeshes: THREE.Mesh[] = []; // Collect static meshes for collision detection
      group.traverse((child) => {
        if (child instanceof THREE.Mesh && !(child as any).isBlob) {
          staticMeshes.push(child);
        }
      });
      
      const blobs = createCuteBlobsWithJellyPhysics(group, staticMeshes);
      const particles = createEnhancedParticles(group);
      
      // Store references for animation updates  
      (group as any).blobs = blobs;
      (group as any).particles = particles;
      (group as any).blobsCreated = true; // Prevent recreation
    }
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

    // Enhanced consciousness-driven blob physics with vertical swimming
    const blobs = (hexagonRef.current as any).blobs;
    if (blobs) {
      const hexagonInnerRadius = 3.8; // Consciousness containment field
      const depthRange = { min: -0.8, max: 1.5 }; // MUCH HIGHER swimming space
      
      blobs.forEach((blob: any, index: number) => {
        const userData = blob.userData;
        const time = elapsedTime;
        
        // Enhanced consciousness pulsing with synchronized glow and lights
        const shouldUpdateThisFrame = (index + Math.floor(time * 6)) % 3 === 0; // Non-synchronous updates
        if (shouldUpdateThisFrame) {
          const pulseTime = time * userData.pulseSpeed + userData.pulseOffset;
          const basePulse = userData.pulseIntensity;
          const consciousness = Math.sin(pulseTime) * 0.2;
          const quantum = Math.sin(pulseTime * 1.618) * 0.15; // Golden ratio harmonics
          
          const finalIntensity = basePulse + consciousness + quantum;
          userData.baseMaterial.emissiveIntensity = Math.max(0.15, finalIntensity);
          
          // Synchronize glow effect with emission
          if (userData.glowMesh && userData.glowMesh.material) {
            userData.glowMesh.material.uniforms.intensity.value = finalIntensity * 2;
            userData.glowMesh.material.uniforms.glowColor.value.setHex(userData.colorData.emission);
          }
          
          // Synchronize point light with emission (only for blobs with lights)
          if (userData.pointLight) {
            userData.pointLight.intensity = finalIntensity * 1.5;
            userData.pointLight.color.setHex(userData.colorData.emission);
          }
          
          // Color temperature variation for living feel
          const colorVariation = 1 + Math.sin(time * 0.5 + userData.pulseOffset) * 0.1;
          userData.baseMaterial.color.setHex(userData.colorData.color).multiplyScalar(colorVariation);
        }
        
        // Enhanced collision detection with consciousness flow
        const currentPosition = blob.position.clone();
        let collisionDetected = false;
        
        // Static mesh collision with smoothed response
        for (const staticMesh of userData.staticMeshes) {
          if (!staticMesh.geometry || !staticMesh.visible) continue;
          
          if (!staticMesh.boundingSphere) {
            staticMesh.geometry.computeBoundingSphere();
            staticMesh.boundingSphere = staticMesh.geometry.boundingSphere?.clone();
          }
          
          if (staticMesh.boundingSphere) {
            const meshWorldPosition = new THREE.Vector3();
            staticMesh.getWorldPosition(meshWorldPosition);
            
            const distance = currentPosition.distanceTo(meshWorldPosition);
            const collisionRadius = userData.radius + staticMesh.boundingSphere.radius + 0.15;
            
            if (distance < collisionRadius) {
              const pushDirection = currentPosition.clone().sub(meshWorldPosition).normalize();
              const pushDistance = collisionRadius - distance;
              
              // Smoother collision response with consciousness flow
              blob.position.add(pushDirection.multiplyScalar(pushDistance * 0.3));
              userData.targetDirection.lerp(pushDirection, 0.4);
              userData.velocity.multiplyScalar(0.8); // Gentle deceleration
              collisionDetected = true;
              break;
            }
          }
        }
        
        // Enhanced blob-to-blob social interaction
        for (let j = index + 1; j < blobs.length; j++) {
          const otherBlob = blobs[j];
          const distance = blob.position.distanceTo(otherBlob.position);
          const comfortDistance = userData.radius + otherBlob.userData.radius + 0.1;
          const socialDistance = comfortDistance * 2.5; // Social awareness range
          
          if (distance < comfortDistance) {
            // Physical collision - gentle separation
            const direction = blob.position.clone().sub(otherBlob.position).normalize();
            const separation = (comfortDistance - distance) * 0.25; // Gentler separation
            
            blob.position.add(direction.clone().multiplyScalar(separation));
            otherBlob.position.sub(direction.clone().multiplyScalar(separation));
            
            // Consciousness-based interaction
            userData.targetDirection.lerp(direction, 0.3);
            otherBlob.userData.targetDirection.lerp(direction.clone().negate(), 0.3);
          } else if (distance < socialDistance) {
            // Social interaction - mild attraction/repulsion based on personality
            const direction = blob.position.clone().sub(otherBlob.position).normalize();
            const socialForce = (userData.sociability + otherBlob.userData.sociability - 1) * 0.01;
            
            if (socialForce > 0) {
              // Attraction
              userData.targetDirection.lerp(direction.clone().negate(), socialForce);
            } else {
              // Repulsion
              userData.targetDirection.lerp(direction, Math.abs(socialForce));
            }
          }
        }
        
        // Enhanced emergence animation for underground blobs
        if (userData.isEmerging) {
          const emergenceProgress = Math.min(1, (userData.emergenceTarget - blob.position.y) / (userData.emergenceTarget + 3.5));
          const emergenceSpeed = userData.emergenceSpeed * deltaTime * (0.8 + emergenceProgress * 0.4); // Smooth acceleration
          
          blob.position.y += emergenceSpeed;
          
          // Add organic wobble during emergence
          const wobbleIntensity = (1 - emergenceProgress) * 0.03; // Reduces as blob emerges
          const wobble = Math.sin(time * 3 + userData.pulseOffset) * wobbleIntensity;
          blob.position.x += wobble;
          blob.position.z += wobble * 0.7;
          
          // Complete emergence when target reached
          if (blob.position.y >= userData.emergenceTarget) {
            userData.isEmerging = false;
            userData.baseDepth = blob.position.y; // Update base depth for normal swimming
          }
        } else {
          // Normal vertical swimming with consciousness flow (with real-time speed control)
          const speedMultiplier = blobControls?.movementSpeed || 1.0;
          const verticalTime = time * userData.verticalSwimSpeed * speedMultiplier + userData.verticalOffset;
          const verticalMovement = Math.sin(verticalTime) * userData.verticalAmplitude;
          const targetY = userData.baseDepth + verticalMovement;
          
          // Smooth vertical transition with consciousness awareness
          blob.position.y = THREE.MathUtils.lerp(blob.position.y, targetY, deltaTime * 1.8);
        }
        
        // Enhanced horizontal swimming with curiosity-driven exploration (with real-time controls)
        if (!userData.isEmerging) { // Don't interfere with emergence
          const speedMultiplier = blobControls?.movementSpeed || 1.0;
          const directionChaos = blobControls?.randomDirectionFactor || 1.0;
          const swimTime = time * userData.swimSpeed * speedMultiplier + userData.swimOffset;
          const explorationFactor = userData.curiosity * 2 * directionChaos + 1;
          
          const swimX = Math.sin(swimTime) * userData.swimAmplitude * explorationFactor;
          const swimZ = Math.cos(swimTime * 1.2) * userData.swimAmplitude * explorationFactor;
          
          // Apply swimming movement with direction blending
          userData.targetDirection.lerp(
            new THREE.Vector3(swimX, 0, swimZ).normalize(),
            deltaTime * 0.5
          );
        }
        
        // Consciousness-driven movement with smooth acceleration and blob avoidance
        userData.velocity.lerp(userData.targetDirection, deltaTime * 0.8);
        
        // Calculate avoidance forces from other blobs
        let avoidanceForce = new THREE.Vector3(0, 0, 0);
        blobs.forEach((otherBlob: THREE.Mesh, otherIndex: number) => {
          if (index !== otherIndex) {
            const otherData = otherBlob.userData as any;
            const distance = blob.position.distanceTo(otherBlob.position);
            const avoidanceDistance = (userData.size + otherData.size) * (blobControls?.avoidanceDistance || 2.0); // Real-time avoidance control
            
            if (distance < avoidanceDistance && distance > 0) {
              const avoidanceStrength = (avoidanceDistance - distance) / avoidanceDistance;
              const repulsionDirection = blob.position.clone().sub(otherBlob.position).normalize();
              avoidanceForce.add(repulsionDirection.multiplyScalar(avoidanceStrength * 0.3)); // Gentle repulsion
            }
          }
        });
        
        // Apply avoidance force to velocity
        userData.velocity.add(avoidanceForce.multiplyScalar(deltaTime));
        userData.velocity.multiplyScalar(0.95); // Natural friction
        
        // Apply movement with boundary containment
        const movement = userData.velocity.clone().multiplyScalar(deltaTime * 2);
        blob.position.add(movement);
        
        // Enhanced hexagon boundary containment with consciousness reflection
        const distanceFromCenter = Math.sqrt(blob.position.x ** 2 + blob.position.z ** 2);
        if (distanceFromCenter > hexagonInnerRadius) {
          const direction = new THREE.Vector3(blob.position.x, 0, blob.position.z).normalize();
          blob.position.x = direction.x * hexagonInnerRadius;
          blob.position.z = direction.z * hexagonInnerRadius;
          
          // Consciousness-based reflection
          userData.targetDirection.reflect(direction);
          userData.velocity.reflect(direction).multiplyScalar(0.6);
        }
        
        // Enhanced vertical boundary containment
        if (blob.position.y < depthRange.min) {
          blob.position.y = depthRange.min;
          userData.velocity.y = Math.abs(userData.velocity.y) * 0.5;
        } else if (blob.position.y > depthRange.max) {
          blob.position.y = depthRange.max;
          userData.velocity.y = -Math.abs(userData.velocity.y) * 0.5;
        }
        
        // Enhanced jelly vertex deformation with consciousness patterns
        if (index % 2 === Math.floor(time * 8) % 2) { // Smoother update frequency
          const geometry = blob.geometry;
          const positions = geometry.attributes.position;
          
          for (let i = 0; i < positions.count; i++) {
            const i3 = i * 3;
            const originalX = userData.originalVertices[i3];
            const originalY = userData.originalVertices[i3 + 1];  
            const originalZ = userData.originalVertices[i3 + 2];
            
            // REDUCED consciousness-driven jelly wobble for smoother yolk movement (with real-time control)
            const jiggleMultiplier = blobControls?.jiggleIntensity || 1.0;
            const consciousnessWave = Math.sin(time * userData.jellySpeed + originalY * 2) * userData.jellyIntensity * 0.6 * jiggleMultiplier; // Real-time jiggle control
            const quantumFlow = Math.sin(time * userData.jellySpeed * 1.3 + originalZ * 2) * userData.jellyIntensity * 0.4 * jiggleMultiplier; // Real-time control
            const neuralPulse = Math.sin(time * userData.jellySpeed * 0.8 + originalX * 2) * userData.jellyIntensity * 0.3 * jiggleMultiplier; // Real-time control
            
            positions.setXYZ(i, 
              originalX + consciousnessWave,
              originalY + quantumFlow, 
              originalZ + neuralPulse
            );
          }
          positions.needsUpdate = true;
          
          // Enhanced consciousness-aware eye behavior with REDUCED jiggle
          const eyeOffset = userData.size * 0.28;
          const skinDeformation = Math.sin(time * userData.jellySpeed) * userData.jellyIntensity * 0.15; // REDUCED from 0.3 to 0.15
          const eyeLook = Math.sin(time * 0.5 + userData.pulseOffset) * 0.03; // Reduced eye movement
          
          // Eyes stay more stable with better positioning
          userData.leftEye.position.z = userData.size * 0.85; // More forward, less deformation influence
          userData.rightEye.position.z = userData.size * 0.85;
          
          userData.leftEye.position.x = -eyeOffset + Math.sin(time * userData.jellySpeed * 0.6) * userData.jellyIntensity * 0.08 + eyeLook; // REDUCED movement
          userData.rightEye.position.x = eyeOffset + Math.sin(time * userData.jellySpeed * 0.6) * userData.jellyIntensity * 0.08 - eyeLook;
          
          // Subtle eye height variation for lifelike behavior
          userData.leftEye.position.y = userData.size * 0.15 + Math.sin(time * 0.3) * 0.02;
          userData.rightEye.position.y = userData.size * 0.15 + Math.sin(time * 0.3 + 1) * 0.02;
        }
        
        // Enhanced consciousness-driven squishy scale animation
        const squishTime = time * userData.squishSpeed + userData.squishOffset;
        const happinessMultiplier = 0.5 + userData.happiness * 0.5; // Happier blobs are more animated
        
        const squishScale = 1 + Math.sin(squishTime) * userData.squishiness * happinessMultiplier;
        const squishScaleY = 1 + Math.sin(squishTime * 1.2) * userData.squishiness * 0.8 * happinessMultiplier;
        blob.scale.set(squishScale, squishScaleY, squishScale);
        
        // Enhanced consciousness-driven rotation
        blob.rotation.y += userData.rotationSpeed * (0.5 + userData.happiness * 0.5);
        blob.rotation.x += userData.rotationSpeed * 0.3 * Math.sin(time * 0.2);
        
        // Enhanced non-synchronous consciousness-aware blinking system
        userData.blinkTimer -= deltaTime;
        if (userData.blinkTimer <= 0) {
          // Highly randomized blink timing to prevent synchronization
          userData.blinkTimer = 1.5 + Math.random() * 5 + userData.happiness + (index * 0.3); // Unique timing per blob
          
          // Consciousness-driven blink animation with random variations
          const blinkDuration = 80 + Math.random() * 100 + userData.happiness * 30; // Varied blink duration
          const blinkIntensity = 0.05 + Math.random() * 0.1; // Some blinks are partial
          
          userData.leftEye.scale.y = blinkIntensity;
          userData.rightEye.scale.y = blinkIntensity;
          
          // Non-synchronous eye opening with slight delay variation
          setTimeout(() => {
            if (userData.leftEye && userData.rightEye) {
              userData.leftEye.scale.y = 1;
              // Right eye opens slightly after left for natural feel
              setTimeout(() => {
                if (userData.rightEye) {
                  userData.rightEye.scale.y = 1;
                }
              }, 10 + Math.random() * 20);
            }
          }, blinkDuration);
        }
        
        // Enhanced consciousness-driven direction changes
        userData.directionChangeTimer -= deltaTime;
        if (userData.directionChangeTimer <= 0) {
          userData.directionChangeTimer = 3 + Math.random() * 4 + userData.curiosity * 2; // Curious blobs change direction more
          
          // Consciousness-aware direction selection
          const explorationStrength = userData.curiosity * 2 + 0.5;
          userData.targetDirection.set(
            (Math.random() - 0.5) * explorationStrength,
            (Math.random() - 0.5) * 0.4 * explorationStrength, // More vertical movement for curious blobs
            (Math.random() - 0.5) * explorationStrength
          ).normalize();
        }
        
        // Enhanced consciousness eye looking behavior
        userData.eyeLookTimer -= deltaTime;
        if (userData.eyeLookTimer <= 0) {
          userData.eyeLookTimer = 1 + Math.random() * 3;
          
          // Eyes can look around independently based on curiosity
          const lookDirection = new THREE.Vector3(
            (Math.random() - 0.5) * userData.curiosity * 0.1,
            (Math.random() - 0.5) * userData.curiosity * 0.05,
            0
          );
          
          userData.leftEye.lookAt(blob.position.clone().add(lookDirection));
          userData.rightEye.lookAt(blob.position.clone().add(lookDirection.clone().negate()));
        }
      });
    }

    // Enhanced consciousness-driven particle animation
    const particles = (hexagonRef.current as any).particles;
    if (particles) {
      particles.rotation.y += 0.0002; // Consciousness flow rotation
      
      // Consciousness-aware particle updates
      if (Math.floor(elapsedTime * 20) % 2 === 0) { // Smoother 10fps update rate
        const positions = particles.geometry.attributes.position.array as Float32Array;
        const velocities = particles.userData.velocities;
        
        for (let i = 0; i < positions.length; i += 3) {
          // Consciousness flow velocity
          positions[i] += velocities[i] * 0.9;
          positions[i + 1] += velocities[i + 1] * 0.9;
          positions[i + 2] += velocities[i + 2] * 0.9;
          
          // Quantum consciousness wave motion
          const consciousnessWave = Math.sin(elapsedTime * 1.2 + i * 0.06) * 0.0008;
          positions[i + 1] += consciousnessWave;
          
          // Enhanced boundary wrapping with consciousness reflection
          if (Math.abs(positions[i]) > 6) velocities[i] *= -0.85;
          if (Math.abs(positions[i + 1]) > 3) velocities[i + 1] *= -0.85;
          if (Math.abs(positions[i + 2]) > 6) velocities[i + 2] *= -0.85;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
      }
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

    // Professional camera setup with responsive characteristics
    const camera = new THREE.PerspectiveCamera(
      window.innerWidth < 768 ? 55 : 45, // Wider FOV for mobile
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, window.innerWidth < 768 ? 1.5 : 2, window.innerWidth < 768 ? 10 : 12); // Closer on mobile
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
    
    // DEBUG: Add a bright test blob to ensure visibility
    const debugGeometry = new THREE.SphereGeometry(1, 32, 32);
    const debugMaterial = new THREE.MeshBasicMaterial({
      color: 0x00FFFF,
      transparent: true,
      opacity: 0.8
    });
    const debugBlob = new THREE.Mesh(debugGeometry, debugMaterial);
    debugBlob.position.set(0, 2, 0);
    hexagonGroup.add(debugBlob);
    
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

    // Handle window resize with responsive camera adjustments
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      const isMobile = window.innerWidth < 768;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.fov = isMobile ? 55 : 45; // Adjust FOV for mobile
      cameraRef.current.position.set(0, isMobile ? 1.5 : 2, isMobile ? 10 : 12);
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
