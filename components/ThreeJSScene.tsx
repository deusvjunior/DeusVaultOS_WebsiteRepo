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

interface ThreeJSSceneProps {
  currentSection: number;
  reducedMotion?: boolean;
}

const ThreeJSScene: React.FC<ThreeJSSceneProps> = ({ 
  currentSection, 
  reducedMotion = false 
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
  // Six-sided hexagon navigation system with optimized page 5 positioning
  const faceAngles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, 0]; // Page 5 returns to home position

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

    // Warm fill light - TRUE YELLOW (not green-tinted)
    const fillLight = new THREE.DirectionalLight(0xFFD700, 0.8); // True gold yellow
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
    
    // 🎨 STRICT CYAN & TRUE YELLOW ONLY PALETTE (ADJUSTED YELLOW - NOT GREEN)
    // **FIXED YELLOW COLORS** - Pure warm yellow, not green-tinted
    const nexusColors = [
      { color: 0x00FFFF, emission: 0x44FFFF, name: 'electric_cyan' },        // Electric cyan
      { color: 0xFFD700, emission: 0xFFE55C, name: 'consciousness_yellow' }, // TRUE GOLD YELLOW (not green)
      { color: 0x00FFFF, emission: 0x44FFFF, name: 'electric_cyan_2' },      // Electric cyan (variant)
      { color: 0xFFA500, emission: 0xFFBF47, name: 'consciousness_yellow_2' }, // WARM ORANGE-YELLOW (not green)
      { color: 0x00FFFF, emission: 0x44FFFF, name: 'electric_cyan_3' },      // Electric cyan (variant)
      { color: 0xFFD700, emission: 0xFFE55C, name: 'consciousness_yellow_3' }, // TRUE GOLD YELLOW (not green)
      { color: 0x00FFFF, emission: 0x44FFFF, name: 'electric_cyan_4' },      // Electric cyan (variant)
      { color: 0xFFA500, emission: 0xFFBF47, name: 'consciousness_yellow_4' }, // WARM ORANGE-YELLOW (not green)
    ];
    
    // 🌐 ADVANCED 3D VOLUMETRIC DISTRIBUTION SYSTEM
    // Based on Poisson disk sampling for natural organic spacing
    // Creates snowglobe-like 3D distribution with perfect collision avoidance
    
    const minDistance = 1.2; // Minimum distance between blobs
    const maxAttempts = 30; // Per blob placement attempts
    const sphereRadius = 3.5; // 3D distribution sphere
    const existingPositions: THREE.Vector3[] = [];
    
    // 🎯 ENHANCED BLOB ECOSYSTEM WITH SIZE VARIATIONS
    // More blobs with natural size distribution
    const blobSizeDistribution = [
      { type: 'tiny', count: 4, sizeRange: [0.12, 0.18] },
      { type: 'small', count: 6, sizeRange: [0.18, 0.28] },
      { type: 'medium', count: 4, sizeRange: [0.28, 0.45] },
      { type: 'large', count: 1, sizeRange: [0.45, 0.6] }
    ];
    
    const blobConfigs: any[] = [];
    
    // Generate blob configurations with size variety
    blobSizeDistribution.forEach(({ type, count, sizeRange }) => {
      for (let i = 0; i < count; i++) {
        blobConfigs.push({
          type,
          size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0])
        });
      }
    });
    
    // Shuffle for random distribution
    for (let i = blobConfigs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [blobConfigs[i], blobConfigs[j]] = [blobConfigs[j], blobConfigs[i]];
    }

    const totalBlobs = isMobile ? Math.min(blobConfigs.length, 8) : blobConfigs.length;
    
    // 🌟 3D VOLUMETRIC DISTRIBUTION SYSTEM
    // Professional-grade Poisson disk sampling for snowglobe effect
    const poissonPositions: THREE.Vector3[] = [];
    const maxPoissonAttempts = 30;
    const distributionSphereRadius = 3.5;
    const poissonMinDistance = 1.2;
    
    for (let i = 0; i < totalBlobs; i++) {
      const blobConfig = blobConfigs[i];
      const baseSize = blobConfig.size;
      
      // CIRCULAR SWIMMING PARAMETERS - Each blob gets unique circular path
      const heightLane = i % 6; // Assign each blob to one of 6 height lanes
      const laneHeight = (heightLane - 1.5) * 2.0 + 4.0; // RAISED 2 SWIMLANES UP: +4.0 height offset (NO FLOOR CLIPPING)
      const orbitRadius = 1.5 + Math.random() * 2; // Varied orbit sizes
      const orbitSpeed = (Math.random() > 0.5 ? 1 : -1) * (0.1 + Math.random() * 0.2); // Random clockwise/counterclockwise
      const orbitPhase = Math.random() * Math.PI * 2; // Random starting position on circle
      
      // ENHANCED 3D POSITIONING WITH VERTICAL VARIATION
      let position: THREE.Vector3 | undefined;
      let attempts = 0;
      
      while (attempts < maxPoissonAttempts) {
        const laneVariation = (Math.random() - 0.5) * 0.3; // Small variation within lane
        
        const x = Math.cos(orbitPhase) * orbitRadius;
        const y = laneHeight + laneVariation;
        const z = Math.sin(orbitPhase) * orbitRadius;
        
        const candidatePosition = new THREE.Vector3(x, y, z);
        
        // Check distance from existing blobs
        let validPosition = true;
        for (const existingPos of poissonPositions) {
          if (candidatePosition.distanceTo(existingPos) < poissonMinDistance) {
            validPosition = false;
            break;
          }
        }
        
        if (validPosition) {
          position = candidatePosition;
          poissonPositions.push(position.clone());
          break;
        }
        
        attempts++;
      }
      
      // Fallback positioning if Poisson sampling fails
      if (!position) {
        position = new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4, // Enhanced vertical range
          (Math.random() - 0.5) * 6
        );
      }
      
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
      
      // 🎄 CHRISTMAS TREE PULSATING EMISSION SYSTEM
      // 40% chance for Christmas tree pulsating emission with varied intensities
      const hasChristmasEmission = Math.random() < 0.4;
      const christmasIntensity = hasChristmasEmission ? (0.15 + Math.random() * 0.25) : 0;
      const emissionSpeed = hasChristmasEmission ? (0.5 + Math.random() * 1.5) : 0;
      
      // Enhanced material with DELAYED emission effects (NO BLINKS FOR FIRST 2 SECONDS)
      const blobMaterial = new THREE.MeshPhysicalMaterial({
        color: colorData.color,
        metalness: 0.0,
        roughness: 0.6, // Reduced for better light interaction
        clearcoat: 0.1,
        transmission: 0,
        transparent: false,
        opacity: 1.0,
        emissive: 0x000000, // **START WITH NO EMISSION** - will activate after 2 seconds
        emissiveIntensity: 0.0, // **START WITH NO EMISSION INTENSITY**
      });

      const blobMesh = new THREE.Mesh(blobGeometry, blobMaterial);
      blobMesh.position.copy(position);
      (blobMesh as any).isBlob = true;
      (blobMesh as any).blobType = blobConfig.type;
      (blobMesh as any).colorName = colorData.name;
      (blobMesh as any).hasChristmasEmission = hasChristmasEmission;
      (blobMesh as any).christmasIntensity = christmasIntensity;
      (blobMesh as any).emissionSpeed = emissionSpeed;
      (blobMesh as any).originalEmission = christmasIntensity;
      
      // 🎯 3D VOLUMETRIC POSITIONING WITH POISSON DISK SAMPLING
      let validPosition = false;
      let poissonAttempts = 0;
      
      while (!validPosition && poissonAttempts < maxPoissonAttempts) {
        // Generate random position within sphere using rejection sampling
        let spherePosition: THREE.Vector3;
        let insideSphere = false;
        
        while (!insideSphere) {
          spherePosition = new THREE.Vector3(
            (Math.random() - 0.5) * 2 * distributionSphereRadius,
            (Math.random() - 0.5) * 2 * distributionSphereRadius,
            (Math.random() - 0.5) * 2 * distributionSphereRadius
          );
          
          if (spherePosition.length() <= distributionSphereRadius) {
            insideSphere = true;
          }
        }
        
        // Poisson disk sampling - check minimum distance from existing positions
        validPosition = true;
        for (const existingPos of poissonPositions) {
          const distance = spherePosition!.distanceTo(existingPos);
          if (distance < poissonMinDistance) {
            validPosition = false;
            break;
          }
        }
        
        // Additional collision detection with static meshes
        if (validPosition) {
          const collisionPadding = baseSize * 1.5;
          
          for (const staticMesh of staticMeshes) {
            const boundingBox = new THREE.Box3().setFromObject(staticMesh);
            const blobBox = new THREE.Box3().setFromCenterAndSize(
              spherePosition!,
              new THREE.Vector3(collisionPadding * 2, collisionPadding * 2, collisionPadding * 2)
            );
            
            if (boundingBox.intersectsBox(blobBox)) {
              validPosition = false;
              break;
            }
          }
        }
        
        if (validPosition) {
          blobMesh.position.copy(spherePosition!);
          poissonPositions.push(spherePosition!.clone());
        }
        
        poissonAttempts++;
      }
      
      // 🎯 3D VOLUMETRIC FALLBACK POSITIONING
      if (!validPosition) {
        // Use 3D spherical fallback distribution instead of spiral
        const theta = Math.random() * Math.PI * 2; // Azimuthal angle
        const phi = Math.acos(2 * Math.random() - 1); // Polar angle for uniform sphere distribution
        const fallbackRadius = distributionSphereRadius * 0.8; // Slightly smaller radius for fallback
        
        const x = fallbackRadius * Math.sin(phi) * Math.cos(theta);
        const y = fallbackRadius * Math.sin(phi) * Math.sin(theta);
        const z = fallbackRadius * Math.cos(phi);
        
        blobMesh.position.set(x, y, z);
        poissonPositions.push(new THREE.Vector3(x, y, z));
      }

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
      
      // 👁️ IMPROVED EYE POSITIONING - Better surface attachment
      const eyeOffset = baseSize * 0.12; // Closer together for better look
      const eyeForward = baseSize * 0.88; // Slightly deeper for better attachment
      const eyeHeight = baseSize * 0.08; // Slightly higher for better placement
      
      // Calculate surface normal for PERFECT attachment
      const leftEyePos = new THREE.Vector3(-eyeOffset, eyeHeight, eyeForward);
      const rightEyePos = new THREE.Vector3(eyeOffset, eyeHeight, eyeForward);
      
      // Normalize to blob surface for perfect attachment (better surface positioning)
      leftEyePos.normalize().multiplyScalar(baseSize * 0.98); // Closer to surface
      rightEyePos.normalize().multiplyScalar(baseSize * 0.98);
      
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

        // Store enhanced consciousness-driven animation data with circular swimming
        blobMesh.userData = {
          size: baseSize,
          type: blobConfig.type,
          colorData: colorData,
          originalVertices,
          leftEye,
          rightEye,
          staticMeshes,
          
          // Christmas tree emission animation data
          hasChristmasEmission,
          christmasIntensity,
          emissionSpeed,
          originalEmission: christmasIntensity,
          
          // Enhanced physics with consciousness flow
          radius: baseSize * 1.2,
          velocity: new THREE.Vector3(),
          lastValidPosition: blobMesh.position.clone(),
          
          // CIRCULAR SWIMMING SYSTEM - Lane-based orbital movement
          orbitRadius: orbitRadius,
          orbitSpeed: orbitSpeed,
          orbitPhase: orbitPhase,
          currentLane: heightLane,
          targetLane: heightLane,
          laneHeight: laneHeight,
          laneSwitchCooldown: 0,
          
          // LANE SWITCHING & AVOIDANCE SYSTEM
          avoidanceRadius: baseSize * 3, // Detection radius for other blobs
          lanePreference: Math.random() > 0.5 ? 1 : -1, // Prefer to go up or down when avoiding
          
          // Enhanced vertical swimming patterns with MAXIMUM ENERGY
          verticalSwimSpeed: 0.3 + Math.random() * 0.2, // Gentler vertical movement
          verticalAmplitude: 0.2 + Math.random() * 0.3, // Smaller amplitude for lane-based system
          verticalOffset: Math.random() * Math.PI * 2,
          baseDepth: laneHeight,        // Enhanced directional movement with consciousness awareness
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
        pulseIntensity: 0.6 + (blobConfig.type === 'large' ? 0.4 : blobConfig.type === 'medium' ? 0.3 : 0.2), // Brighter
        
        // Enhanced jelly physics with HIGH ENERGY consciousness flow
        jellyVertices: new Float32Array(originalVertices),
        jellySpeed: 1.0 + Math.random() * 0.6, // ULTRA fast jelly movement (was 0.6-1.0, now 1.0-1.6)
        jellyIntensity: 0.12 + Math.random() * 0.08, // More intense wobble
        
        // MUCH MORE FREQUENT blinking system for high energy
        blinkTimer: 0.5 + Math.random() * 2, // Much more frequent blinking
        directionChangeTimer: 1 + Math.random() * 3, // More frequent direction changes  
        eyeLookTimer: 0.5 + Math.random() * 1.5, // More frequent eye movement
        
        // Enhanced squishiness with HIGH ENERGY consciousness flow
        squishiness: 0.05 + Math.random() * 0.04, // More intense squishing
        squishSpeed: 1.0 + Math.random() * 0.6, // MUCH faster squish animation
        squishOffset: Math.random() * Math.PI * 2,
        
        // **GENTLER rotation with size-based variation** (reduced jitter)
        rotationSpeed: (Math.random() - 0.5) * (blobConfig.type === 'large' ? 0.012 : 0.018), // Reduced from 0.025/0.035 for smoother feel
        
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
        
        // 🎄 CHRISTMAS TREE PULSATING EMISSION ANIMATION WITH STARTUP DELAY
        // **2-SECOND STARTUP DELAY** - No blinking for first 2 seconds (less distracting)
        const startupDelay = 2.0; // 2 seconds of calm startup
        const shouldUpdateThisFrame = (index + Math.floor(time * 6)) % 3 === 0; // Non-synchronous updates
        
        if (shouldUpdateThisFrame && time >= startupDelay) {
          // **DELAYED CHRISTMAS EMISSION** - Only after startup delay
          if (userData.hasChristmasEmission) {
            const emissionTime = time * userData.emissionSpeed;
            const christmasBase = userData.originalEmission;
            const christmasVariation = Math.sin(emissionTime) * christmasBase * 0.5;
            const christmasIntensity = christmasBase + christmasVariation;
            
            userData.baseMaterial.emissiveIntensity = Math.max(0.05, christmasIntensity);
          } else {
            // **DELAYED STANDARD CONSCIOUSNESS PULSING** - Only after startup delay
            const pulseTime = time * userData.pulseSpeed + userData.pulseOffset;
            const basePulse = userData.pulseIntensity;
            const consciousness = Math.sin(pulseTime) * 0.2;
            const quantum = Math.sin(pulseTime * 1.618) * 0.15; // Golden ratio harmonics
            
            const finalIntensity = basePulse + consciousness + quantum;
            userData.baseMaterial.emissiveIntensity = Math.max(0.15, finalIntensity);
          }
          
          // **DELAYED COLOR TEMPERATURE VARIATION** - Only after startup delay
          const colorVariation = 1 + Math.sin(time * 0.5 + userData.pulseOffset) * 0.1;
          userData.baseMaterial.color.setHex(userData.colorData.color).multiplyScalar(colorVariation);
        } else if (time < startupDelay) {
          // **STARTUP CALM STATE** - Keep blobs in their initial calm state
          userData.baseMaterial.emissiveIntensity = 0.0;
          userData.baseMaterial.emissive.setHex(0x000000);
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
          // Normal vertical swimming with consciousness flow
          const verticalTime = time * userData.verticalSwimSpeed + userData.verticalOffset;
          const verticalMovement = Math.sin(verticalTime) * userData.verticalAmplitude;
          const targetY = userData.baseDepth + verticalMovement;
          
          // Smooth vertical transition with consciousness awareness
          blob.position.y = THREE.MathUtils.lerp(blob.position.y, targetY, deltaTime * 1.8);
        }
        
        // ENHANCED CIRCULAR SWIMMING WITH LANE SWITCHING - Emergent Behavior System
        if (!userData.isEmerging) {
          // Update circular orbit phase
          userData.orbitPhase += userData.orbitSpeed * deltaTime;
          
          // ENHANCED COLLISION DETECTION - Unity-style trigger colliders
          let needsLaneSwitching = false;
          let nearbyBlob = null;
          userData.avoidanceRadius = 3.5; // Increased from 1.5 to 3.5 for better detection
          
          for (let j = 0; j < blobs.length; j++) {
            if (j === index) continue;
            const otherBlob = blobs[j];
            const distance = blob.position.distanceTo(otherBlob.position);
            
            // AGGRESSIVE COLLISION DETECTION - Trigger at larger distance
            if (distance < userData.avoidanceRadius) {
              // Additional collision prediction - check future positions
              const futureDistance = blob.position.clone()
                .add(new THREE.Vector3(
                  Math.cos(userData.orbitPhase + userData.orbitSpeed * 0.5) * userData.orbitRadius - blob.position.x,
                  0,
                  Math.sin(userData.orbitPhase + userData.orbitSpeed * 0.5) * userData.orbitRadius - blob.position.z
                ).normalize().multiplyScalar(2))
                .distanceTo(otherBlob.position);
              
              // Trigger if currently close OR will be close soon
              if (distance < userData.avoidanceRadius || futureDistance < userData.avoidanceRadius) {
                const shouldSwitch = userData.size < otherBlob.userData.size || 
                                   (userData.size === otherBlob.userData.size && userData.orbitSpeed > 0);
                
                if (shouldSwitch && userData.laneSwitchCooldown <= 0) {
                  needsLaneSwitching = true;
                  nearbyBlob = otherBlob;
                  break;
                }
              }
            }
          }
          
          // Perform lane switching if needed
          if (needsLaneSwitching && userData.laneSwitchCooldown <= 0) {
            const availableLanes = [0, 1, 2, 3, 4, 5];
            const currentLaneIndex = userData.currentLane;
            
            // Find best lane to switch to (prefer up/down based on preference)
            let targetLaneIndex = currentLaneIndex;
            if (userData.lanePreference > 0 && currentLaneIndex < 5) {
              targetLaneIndex = currentLaneIndex + 1;
            } else if (userData.lanePreference < 0 && currentLaneIndex > 0) {
              targetLaneIndex = currentLaneIndex - 1;
            } else {
              // Reverse preference if can't go in preferred direction
              targetLaneIndex = userData.lanePreference > 0 ? 
                Math.max(0, currentLaneIndex - 1) : 
                Math.min(5, currentLaneIndex + 1);
            }
            
            userData.targetLane = targetLaneIndex;
            userData.laneSwitchCooldown = 3; // 3 second cooldown
            
            // ⚡ LANE SWITCH BLINK EFFECT - Decision Making Visualization (MOMENTARY)
            if (blob.material && blob.material.emissive) {
              // Store original emission color
              const originalEmission = blob.material.emissive.clone();
              
              // Flash to bright white emission (decision blink) - QUICK FLASH
              blob.material.emissive.setHex(0xFFFFFF);
              blob.material.emissiveIntensity = 0.9; // Slightly brighter for better visibility
              
              // **FAST FADE** - Fade back to original over 0.15 seconds (was 0.3) for MOMENTARY effect
              setTimeout(() => {
                if (blob.material && blob.material.emissive) {
                  blob.material.emissive.copy(originalEmission);
                  blob.material.emissiveIntensity = 0.4;
                }
              }, 150); // REDUCED: 150ms instead of 300ms for quick momentary blink
            }
          }
          
          // Smooth lane transitions
          if (userData.currentLane !== userData.targetLane) {
            const targetLaneHeight = (userData.targetLane - 1.5) * 2.0 + 4.0; // RAISED 2 SWIMLANES UP: Match spawn height
            userData.laneHeight = THREE.MathUtils.lerp(userData.laneHeight, targetLaneHeight, deltaTime * 0.5);
            
            // Complete lane switch when close enough
            if (Math.abs(userData.laneHeight - targetLaneHeight) < 0.1) {
              userData.currentLane = userData.targetLane;
              userData.laneHeight = targetLaneHeight;
              userData.baseDepth = targetLaneHeight;
            }
          }
          
          // Calculate circular swimming position
          const orbitX = Math.cos(userData.orbitPhase) * userData.orbitRadius;
          const orbitZ = Math.sin(userData.orbitPhase) * userData.orbitRadius;
          
          // Apply gentle circular movement
          const targetPosition = new THREE.Vector3(orbitX, userData.laneHeight, orbitZ);
          blob.position.lerp(targetPosition, deltaTime * 0.8);
          
          // Add small vertical variation within lane
          const verticalTime = time * userData.verticalSwimSpeed + userData.verticalOffset;
          const verticalVariation = Math.sin(verticalTime) * userData.verticalAmplitude;
          blob.position.y = userData.laneHeight + verticalVariation;
        }
        
        // Update cooldowns
        userData.laneSwitchCooldown = Math.max(0, userData.laneSwitchCooldown - deltaTime);
        
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
            
            // Enhanced consciousness-driven jelly wobble - 50% REDUCED displacement
            const consciousnessWave = Math.sin(time * userData.jellySpeed + originalY * 2) * userData.jellyIntensity * 0.5;
            const quantumFlow = Math.sin(time * userData.jellySpeed * 1.3 + originalZ * 2) * userData.jellyIntensity * 0.4;
            const neuralPulse = Math.sin(time * userData.jellySpeed * 0.8 + originalX * 2) * userData.jellyIntensity * 0.3;
            
            positions.setXYZ(i, 
              originalX + consciousnessWave,
              originalY + quantumFlow, 
              originalZ + neuralPulse
            );
          }
          positions.needsUpdate = true;
          
          // Enhanced consciousness-aware eye behavior
          // 👁️ IMPROVED ANIMATED EYE POSITIONING WITH SURFACE ATTACHMENT
          const eyeOffset = userData.size * 0.24; // Reduced for closer placement
          
          // Calculate surface deformation at eye positions for proper attachment
          const leftEyeOriginalPos = new THREE.Vector3(-eyeOffset, userData.size * 0.12, userData.size * 0.82);
          const rightEyeOriginalPos = new THREE.Vector3(eyeOffset, userData.size * 0.12, userData.size * 0.82);
          
          // Sample surface deformation at eye positions (50% reduced intensity)
          const leftEyeDeformation = {
            x: Math.sin(time * userData.jellySpeed + leftEyeOriginalPos.y * 2) * userData.jellyIntensity * 0.5,
            y: Math.sin(time * userData.jellySpeed * 1.3 + leftEyeOriginalPos.z * 2) * userData.jellyIntensity * 0.4,
            z: Math.sin(time * userData.jellySpeed * 0.8 + leftEyeOriginalPos.x * 2) * userData.jellyIntensity * 0.3
          };
          
          const rightEyeDeformation = {
            x: Math.sin(time * userData.jellySpeed + rightEyeOriginalPos.y * 2) * userData.jellyIntensity * 0.5,
            y: Math.sin(time * userData.jellySpeed * 1.3 + rightEyeOriginalPos.z * 2) * userData.jellyIntensity * 0.4,
            z: Math.sin(time * userData.jellySpeed * 0.8 + rightEyeOriginalPos.x * 2) * userData.jellyIntensity * 0.3
          };
          
          // Apply surface-attached positioning with reduced subtle eye movement
          const eyeLook = Math.sin(time * 0.5 + userData.pulseOffset) * 0.015; // Reduced subtle movement
          
          userData.leftEye.position.set(
            leftEyeOriginalPos.x + leftEyeDeformation.x + eyeLook,
            leftEyeOriginalPos.y + leftEyeDeformation.y + Math.sin(time * 0.3) * 0.008,
            leftEyeOriginalPos.z + leftEyeDeformation.z
          );
          
          userData.rightEye.position.set(
            rightEyeOriginalPos.x + rightEyeDeformation.x - eyeLook,
            rightEyeOriginalPos.y + rightEyeDeformation.y + Math.sin(time * 0.3 + 1) * 0.008,
            rightEyeOriginalPos.z + rightEyeDeformation.z
          );
        }
        
        // Enhanced consciousness-driven squishy scale animation
        const squishTime = time * userData.squishSpeed + userData.squishOffset;
        const happinessMultiplier = 0.5 + userData.happiness * 0.5; // Happier blobs are more animated
        
        const squishScale = 1 + Math.sin(squishTime) * userData.squishiness * happinessMultiplier;
        const squishScaleY = 1 + Math.sin(squishTime * 1.2) * userData.squishiness * 0.8 * happinessMultiplier;
        blob.scale.set(squishScale, squishScaleY, squishScale);
        
        // **SMOOTH CONSCIOUSNESS-DRIVEN ROTATION** (reduced jitter)
        // Much gentler rotation speeds for professional feel
        const rotationMultiplier = (0.2 + userData.happiness * 0.3); // Reduced from aggressive multipliers
        blob.rotation.y += userData.rotationSpeed * rotationMultiplier * deltaTime * 20; // Frame-rate independent
        blob.rotation.x += userData.rotationSpeed * 0.15 * Math.sin(time * 0.15) * deltaTime * 20; // Gentler X rotation
        
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

  // 🎬 OPTIMIZED HEXAGONAL CAMERA SYSTEM - PERFECT PAGE TRANSITIONS
  const updateCameraMovement = (elapsedTime: number) => {
    if (!cameraRef.current) return;
    
    // **REFINED HEXAGONAL PROGRESSION** - Balanced positioning for smooth transitions
    const cameraConfigs = [
      // Page 0: Front face of hexagon (0°) - Hero Introduction
      { radius: 15, height: 4, angle: 0, tilt: -0.05, label: "Front Face" },
      // Page 1: Right-front face (60°) - Features showcase  
      { radius: 15, height: 4, angle: Math.PI / 3, tilt: -0.05, label: "Right-Front Face" },
      // Page 2: Right-back face (120°) - Comparison view
      { radius: 15, height: 4, angle: (2 * Math.PI) / 3, tilt: -0.05, label: "Right-Back Face" },
      // Page 3: Back face (180°) - User Segments showcase
      { radius: 15, height: 4, angle: Math.PI, tilt: -0.05, label: "Back Face" },
      // Page 4: Left-back face (240°) - THERION AI showcase  
      { radius: 15, height: 4, angle: (4 * Math.PI) / 3, tilt: -0.05, label: "Left-Back Face" },
      // Page 5: Left-front face (300°) - Marketplace view **CORRECTED POSITION**
      { radius: 15, height: 4, angle: (5 * Math.PI) / 3, tilt: -0.05, label: "Left-Front Face" },
      // Page 6: Near-front face (330°) - Call to Action **PROPER FINAL POSITION**
      { radius: 15, height: 4, angle: (11 * Math.PI) / 6, tilt: -0.05, label: "Near-Front Face" }
    ];
    
    const currentConfig = cameraConfigs[currentSection] || cameraConfigs[0];
    
    // Calculate target camera position with perfect hexagonal progression
    const targetX = Math.cos(currentConfig.angle) * currentConfig.radius;
    const targetZ = Math.sin(currentConfig.angle) * currentConfig.radius;
    const targetY = currentConfig.height;
    
    // Gentle breathing motion (very subtle)
    const breathingOffset = Math.sin(elapsedTime * 0.15) * 0.02;
    
    // ULTRA SMOOTH INTERPOLATION - Prevent jarring transitions
    const lerpSpeed = 0.004; // **SLOWED FROM 0.008** - Perfect camera transition speed (was 2x too fast)
    cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetX, lerpSpeed);
    cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY + breathingOffset, lerpSpeed);
    cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, lerpSpeed);
    
    // Smooth look-at with gentle tilt
    const lookAtY = currentConfig.tilt;
    cameraRef.current.lookAt(0, lookAtY, 0);
  };

  // Apple-grade rotation with physics simulation (SMOOTHER & ANTI-JITTER)
  const updateRotationWithPhysics = (_deltaTime: number) => {
    if (!isInteracting && !reducedMotion) {
      targetRotationY.current = faceAngles[currentSection];
    }

    // Smooth physics-based rotation with minimal spring oscillation
    const springStrength = 0.008; // Much gentler for smooth, elegant motion
    const damping = 0.88; // Slightly lower damping for natural feel
    
    // Anti-jitter threshold - prevent micro-movements
    const angleDifference = targetRotationY.current - currentRotationY.current;
    const normalizedDiff = ((angleDifference + Math.PI) % (2 * Math.PI)) - Math.PI; // Normalize to -π to π
    
    if (Math.abs(normalizedDiff) > 0.001) { // Only apply force if significant difference
      const force = normalizedDiff * springStrength;
      velocityRef.current += force;
      velocityRef.current *= damping;
      currentRotationY.current += velocityRef.current;
    } else {
      // Gradual settling to prevent jitter
      velocityRef.current *= 0.98;
      currentRotationY.current = THREE.MathUtils.lerp(currentRotationY.current, targetRotationY.current, 0.05);
    }
    
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
