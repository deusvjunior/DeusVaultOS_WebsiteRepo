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

  // Physics simulation for rotation
  const currentRotationY = useRef(0);
  const targetRotationY = useRef(0);
  const velocityRef = useRef(0);
  const [isInteracting, _setIsInteracting] = useState(false);

  // Section rotation mapping (60 degrees per section)
  const faceAngles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3];

  // Cyberpunk lighting setup with dramatic rim lighting and bloom
  const setupAdvancedLighting = (scene: THREE.Scene) => {
    // Dramatic orange/yellow rim light from underneath
    const rimLight = new THREE.DirectionalLight(0xFF6600, 2.5); // Intense orange
    rimLight.position.set(0, -10, 0); // From below pointing up
    rimLight.target.position.set(0, 0, 0);
    rimLight.castShadow = false; // No shadows for rim effect
    scene.add(rimLight);
    scene.add(rimLight.target);

    // Secondary yellow rim light for variation
    const yellowRimLight = new THREE.DirectionalLight(0xFFFF00, 1.8); // Bright yellow
    yellowRimLight.position.set(-5, -8, 3); // Angled from below
    yellowRimLight.castShadow = false;
    scene.add(yellowRimLight);

    // Key light - primary illumination (cooler for contrast)
    const keyLight = new THREE.DirectionalLight(0x00FFFF, 1.2); // Cyan key
    keyLight.position.set(8, 12, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048; // Higher quality shadows
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -15;
    keyLight.shadow.camera.right = 15;
    keyLight.shadow.camera.top = 15;
    keyLight.shadow.camera.bottom = -15;
    scene.add(keyLight);

    // Green accent light for neon effect
    const accentLight = new THREE.PointLight(0x00FF00, 2.0, 15);
    accentLight.position.set(0, 3, 0);
    accentLight.castShadow = false;
    scene.add(accentLight);

    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0x004444, 0.3); // Dark cyan ambient
    scene.add(ambientLight);
  };

  // Enhanced living blobs with dramatic size variation and personality
  const createCuteBlobsWithJellyPhysics = (group: THREE.Group) => {
    const isMobile = window.innerWidth < 768;
    const blobCount = isMobile ? 8 : 13; // 8 small + 4 medium + 1 large
    const blobs: any[] = [];
    const hexagonInnerRadius = isMobile ? 3.2 : 3.8;
    const staticMeshes: THREE.Mesh[] = [];

    // Collect all static meshes in the scene for collision detection
    group.traverse((child) => {
      if (child instanceof THREE.Mesh && !(child as any).isBlob) {
        staticMeshes.push(child);
      }
    });

    // Define size categories with personality traits
    const sizeCategories = [
      // 8 Small blobs - energetic and quick
      ...Array(8).fill({ type: 'small', size: [0.2, 0.35], speed: [0.4, 0.8], energy: 'high' }),
      // 4 Medium blobs - balanced behavior  
      ...Array(4).fill({ type: 'medium', size: [0.4, 0.6], speed: [0.2, 0.5], energy: 'medium' }),
      // 1 Large blob - slow and majestic
      { type: 'large', size: [0.8, 1.2], speed: [0.1, 0.3], energy: 'low' }
    ];

    for (let i = 0; i < blobCount; i++) {
      const category = sizeCategories[i];
      const baseSize = category.size[0] + Math.random() * (category.size[1] - category.size[0]);
      
      // Enhanced high-quality geometry with modern smoothness
      const complexity = category.type === 'large' ? [32, 24] : category.type === 'medium' ? [24, 18] : [20, 16];
      const blobGeometry = new THREE.SphereGeometry(baseSize, complexity[0], complexity[1]);
      
      // Smooth normals for modern appearance
      blobGeometry.computeVertexNormals();
      
      const positions = blobGeometry.attributes.position;
      
      // Store original vertices for jelly deformation
      const originalVertices = [];
      for (let j = 0; j < positions.count; j++) {
        originalVertices.push(
          positions.getX(j),
          positions.getY(j), 
          positions.getZ(j)
        );
      }
      
      // Enhanced cyberpunk neon colors with cyan and yellow palette
      const colorsBySize = {
        small: [
          0x00FFFF, // Neon cyan
          0x00E6E6, // Bright cyan
          0x40FFFF, // Light cyan
          0x00CCCC, // Deep cyan
          0x66FFFF, // Soft cyan
          0x00B3B3, // Dark cyan
          0x80FFFF, // Pale cyan
          0x009999, // Teal cyan
        ],
        medium: [
          0xFFFF00, // Pure neon yellow
          0xFFE600, // Bright yellow
          0xFFCC00, // Golden yellow
          0xFFB300, // Orange yellow
        ],
        large: [
          0x00FF00, // Neon green accent - the king blob
        ]
      };
      
      const colorPalette = colorsBySize[category.type as keyof typeof colorsBySize];
      const selectedColor = colorPalette[i % colorPalette.length];
      
      // Enhanced cyberpunk material with neon glow
      const blobMaterial = new THREE.MeshPhysicalMaterial({
        color: selectedColor,
        metalness: 0.1, // Slight metallic for neon effect
        roughness: 0.3, // Smoother for better light reflection
        clearcoat: 0.2, // Slight coating for neon look
        transmission: 0,
        transparent: false,
        opacity: 1.0,
        emissive: selectedColor,
        emissiveIntensity: category.type === 'large' ? 0.25 : category.type === 'medium' ? 0.2 : 0.18, // Stronger neon glow
      });

      const blobMesh = new THREE.Mesh(blobGeometry, blobMaterial);
      (blobMesh as any).isBlob = true;
      
      // Enhanced positioning INSIDE hexagon center area
      let validPosition = false;
      let attempts = 0;
      const maxAttempts = 50;
      
      while (!validPosition && attempts < maxAttempts) {
        // Position blobs in CENTER of hexagon, not edges
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 2.5; // Center area: 0 to 2.5 radius (well within hexagon)
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        // Enhanced size-based vertical layers within center
        let y;
        const centralLayers = {
          small: { min: -1.0, max: 0.5 }, // Upper center waters
          medium: { min: -1.8, max: -0.2 }, // Middle center layer
          large: { min: -2.2, max: -0.8 } // Deep center dwelling
        };
        
        const range = centralLayers[category.type as keyof typeof centralLayers];
        y = range.min + Math.random() * (range.max - range.min);
        
        const testPosition = new THREE.Vector3(x, y, z);
        
        // Check collision with static meshes using bounding boxes
        validPosition = true;
        for (const staticMesh of staticMeshes) {
          const boundingBox = new THREE.Box3().setFromObject(staticMesh);
          const blobBox = new THREE.Box3().setFromCenterAndSize(
            testPosition,
            new THREE.Vector3(baseSize * 2, baseSize * 2, baseSize * 2)
          );
          
          if (boundingBox.intersectsBox(blobBox)) {
            validPosition = false;
            break;
          }
        }
        
        if (validPosition) {
          blobMesh.position.set(x, y, z);
        }
        attempts++;
      }
      
      // Enhanced fallback position in hexagon center
      if (!validPosition) {
        const fallbackAngle = (i / blobCount) * Math.PI * 2;
        const fallbackY = category.type === 'large' ? -1.5 : category.type === 'medium' ? -1.0 : -0.5;
        blobMesh.position.set(
          Math.cos(fallbackAngle) * 1.8, // Center hexagon area
          fallbackY, // Size-appropriate center layer
          Math.sin(fallbackAngle) * 1.8
        );
      }

      // Enhanced eyes with better attachment and personality
      const eyeSize = baseSize * 0.15; // Larger, more expressive eyes
      const eyeGeometry = new THREE.SphereGeometry(eyeSize, 8, 6); // Higher detail for better looks
      const eyeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000, // Pure black dots
        transparent: false,
        fog: false // Prevent fog interference
      });
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      
      // Enhanced eye positioning for better attachment
      const eyeOffset = baseSize * 0.35;
      const eyeHeight = baseSize * 0.25;
      const eyeForward = baseSize * 0.8;
      
      leftEye.position.set(-eyeOffset, eyeHeight, eyeForward);
      rightEye.position.set(eyeOffset, eyeHeight, eyeForward);
      
      blobMesh.add(leftEye);
      blobMesh.add(rightEye);

      // Enhanced physics and personality data
      const speedMultiplier = category.speed[0] + Math.random() * (category.speed[1] - category.speed[0]);
      const movementIntensity = {
        small: { x: 0.6, y: 0.4, z: 0.6 }, // Hyperactive movement
        medium: { x: 0.4, y: 0.3, z: 0.4 }, // Moderate swimming
        large: { x: 0.2, y: 0.15, z: 0.2 } // Slow, majestic movement
      };
      
      const movement = movementIntensity[category.type as keyof typeof movementIntensity];

      // Store comprehensive animation data with enhanced personality
      blobMesh.userData = {
        size: baseSize,
        originalVertices,
        leftEye,
        rightEye,
        staticMeshes, // Reference to static meshes for collision
        
        // Enhanced personality-based physics
        sizeCategory: category.type,
        speedMultiplier,
        movementRange: movement,
        energyLevel: category.energy,
        
        // Enhanced physics collision properties
        radius: baseSize * 1.1, // Slightly larger collision sphere
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * speedMultiplier,
          (Math.random() - 0.5) * speedMultiplier * 0.4, // More vertical movement
          (Math.random() - 0.5) * speedMultiplier
        ),
        lastValidPosition: blobMesh.position.clone(),
        
        // Enhanced personality-based movement parameters
        swimSpeed: speedMultiplier * (0.15 + Math.random() * 0.25), // Speed based on size
        swimOffset: Math.random() * Math.PI * 2,
        swimAmplitude: movement.x * (0.5 + Math.random() * 0.8), // Amplitude based on personality
        
        // Enhanced 3D movement with personality-based direction
        targetDirection: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * movement.y * 2, // Vertical movement based on personality
          (Math.random() - 0.5) * 2
        ).normalize(),
        currentDirection: new THREE.Vector3(),
        
        // Enhanced material pulsing with stronger emission
        baseMaterial: blobMaterial,
        pulseSpeed: category.type === 'small' ? 1.2 + Math.random() * 0.8 : 
                   category.type === 'medium' ? 0.8 + Math.random() * 0.6 : 
                   0.4 + Math.random() * 0.4, // Size-based pulse speed
        pulseOffset: Math.random() * Math.PI * 2,
        baseEmission: category.type === 'large' ? 0.25 : category.type === 'medium' ? 0.2 : 0.18,
        
        // Enhanced jelly physics with personality
        jellyVertices: new Float32Array(originalVertices),
        jellySpeed: speedMultiplier * (0.6 + Math.random() * 0.5),
        jellyIntensity: 0.08 + Math.random() * 0.06,
        
        // Simplified emergence system (keep near ground)
        isEmerging: blobMesh.position.y < -1.5,
        emergenceTarget: -1.4, // Stay close to ground level
        
        // Optimized animation timers
        blinkTimer: 2 + Math.random() * 4,
        directionChangeTimer: 3 + Math.random() * 5,
        
        // Squishy scale animation  
        squishiness: 0.03 + Math.random() * 0.03,
        squishSpeed: 0.6 + Math.random() * 0.3,
        squishOffset: Math.random() * Math.PI * 2,
        
        // Gentle rotation
        rotationSpeed: (Math.random() - 0.5) * 0.008,
      };

      blobs.push(blobMesh);
      group.add(blobMesh);
    }

    return blobs;
  };

  // Enhanced particle system with responsive particle count
  const createEnhancedParticles = (group: THREE.Group) => {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 75 : 150; // Reduce particles on mobile
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
    // Create mirror ground surface
    const mirrorGeometry = new THREE.PlaneGeometry(15, 15);
    const mirrorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x001122,
      metalness: 1.0, // Full metallic for mirror effect
      roughness: 0.0, // Perfect smoothness for reflection
      reflectivity: 1.0,
      transmission: 0,
      transparent: false,
      emissive: 0x000044,
      emissiveIntensity: 0.1,
    });
    const mirrorMesh = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
    mirrorMesh.rotation.x = -Math.PI / 2; // Horizontal
    mirrorMesh.position.y = -2.5; // Below everything
    group.add(mirrorMesh);

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

    // Add cute jelly blobs with physics ONLY ONCE
    if (!(group as any).blobsCreated) {
      const blobs = createCuteBlobsWithJellyPhysics(group);
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

    // Optimized blob physics with hexagon interior containment
    const blobs = (hexagonRef.current as any).blobs;
    if (blobs) {
      const hexagonInnerRadius = 3.8; // Keep blobs INSIDE hexagon, not on perimeter
      const groundLevel = -2.0; // Slightly above ground
      const ceilingLevel = 0.5; // Lower ceiling to keep them near ground
      
      blobs.forEach((blob: any, index: number) => {
        const userData = blob.userData;
        const time = elapsedTime;
        
        // Enhanced pulsating emission with cyberpunk neon intensity
        if (index % 3 === Math.floor(time * 10) % 3) { // Optimized update frequency
          const pulseTime = time * userData.pulseSpeed + userData.pulseOffset;
          const basePulse = userData.baseEmission;
          const pulseAmplitude = userData.sizeCategory === 'large' ? 0.15 : 
                               userData.sizeCategory === 'medium' ? 0.12 : 0.1;
          const pulseIntensity = basePulse + Math.sin(pulseTime) * pulseAmplitude;
          userData.baseMaterial.emissiveIntensity = Math.max(0.1, pulseIntensity);
        }
        
        // Advanced collision detection with static meshes (hexagon structure)
        const currentPosition = blob.position.clone();
        let collisionDetected = false;
        
        // Check collision with static meshes using optimized bounding spheres
        for (const staticMesh of userData.staticMeshes) {
          if (!staticMesh.geometry || !staticMesh.visible) continue;
          
          // Use bounding sphere for faster collision detection
          if (!staticMesh.boundingSphere) {
            staticMesh.geometry.computeBoundingSphere();
            staticMesh.boundingSphere = staticMesh.geometry.boundingSphere?.clone();
          }
          
          if (staticMesh.boundingSphere) {
            const meshWorldPosition = new THREE.Vector3();
            staticMesh.getWorldPosition(meshWorldPosition);
            
            const distance = currentPosition.distanceTo(meshWorldPosition);
            const collisionRadius = userData.radius + staticMesh.boundingSphere.radius + 0.1;
            
            if (distance < collisionRadius) {
              // Collision detected - push blob away gently
              const pushDirection = currentPosition.clone().sub(meshWorldPosition).normalize();
              const pushDistance = collisionRadius - distance;
              
              blob.position.add(pushDirection.multiplyScalar(pushDistance * 0.5));
              userData.targetDirection.reflect(pushDirection).multiplyScalar(0.6);
              collisionDetected = true;
              break; // Exit early for performance
            }
          }
        }
        
        // Optimized blob-to-blob collision (check only nearby blobs)
        for (let j = index + 1; j < blobs.length; j++) {
          const otherBlob = blobs[j];
          const distance = blob.position.distanceTo(otherBlob.position);
          const minDistance = userData.radius + otherBlob.userData.radius + 0.05;
          
          if (distance < minDistance) {
            // Optimized collision response
            const direction = blob.position.clone().sub(otherBlob.position).normalize();
            const separation = (minDistance - distance) * 0.4; // Reduced for smoother movement
            
            blob.position.add(direction.clone().multiplyScalar(separation));
            otherBlob.position.sub(direction.clone().multiplyScalar(separation));
            
            // Soft bounce effect
            userData.targetDirection.reflect(direction).multiplyScalar(0.7);
            otherBlob.userData.targetDirection.reflect(direction.clone().negate()).multiplyScalar(0.7);
          }
        }
        
        // Optimized jelly vertex deformation (reduced frequency for performance)
        if (index % 2 === Math.floor(time * 15) % 2) { // Update half the blobs per frame
          const geometry = blob.geometry;
          const positions = geometry.attributes.position;
          
          for (let i = 0; i < positions.count; i++) {
            const i3 = i * 3;
            const originalX = userData.originalVertices[i3];
            const originalY = userData.originalVertices[i3 + 1];  
            const originalZ = userData.originalVertices[i3 + 2];
            
            // Optimized jelly wobble
            const wobbleX = Math.sin(time * userData.jellySpeed + originalY * 1.5) * userData.jellyIntensity;
            const wobbleY = Math.sin(time * userData.jellySpeed * 1.2 + originalZ * 1.5) * userData.jellyIntensity;
            const wobbleZ = Math.sin(time * userData.jellySpeed * 0.9 + originalX * 1.5) * userData.jellyIntensity;
            
            positions.setXYZ(i, 
              originalX + wobbleX,
              originalY + wobbleY, 
              originalZ + wobbleZ
            );
          }
          positions.needsUpdate = true;
          
          // Enhanced eyes follow skin deformation with better attachment
          const eyeOffset = userData.size * 0.35; // Proportional to blob size
          const skinDeformation = Math.sin(time * userData.jellySpeed) * userData.jellyIntensity * 0.6;
          
          // Enhanced eye positioning with smooth movement
          const eyeHeight = userData.size * 0.25;
          const eyeForward = userData.size * 0.8 + skinDeformation;
          
          userData.leftEye.position.set(
            -eyeOffset + Math.sin(time * userData.jellySpeed * 0.8) * userData.jellyIntensity * 0.3,
            eyeHeight + Math.sin(time * userData.jellySpeed * 0.6) * userData.jellyIntensity * 0.2,
            eyeForward
          );
          userData.rightEye.position.set(
            eyeOffset + Math.sin(time * userData.jellySpeed * 0.8) * userData.jellyIntensity * 0.3,
            eyeHeight + Math.sin(time * userData.jellySpeed * 0.6) * userData.jellyIntensity * 0.2,
            eyeForward
          );
          
          // Enhanced blinking behavior with personality
          userData.blinkTimer -= deltaTime;
          if (userData.blinkTimer <= 0) {
            // Personality-based blink frequency
            const blinkRate = userData.energyLevel === 'high' ? 1.5 + Math.random() * 2 :
                             userData.energyLevel === 'medium' ? 2 + Math.random() * 3 :
                             2.5 + Math.random() * 4;
            userData.blinkTimer = blinkRate;
            
            // Smooth blink animation
            const blinkDuration = 0.15 + Math.random() * 0.1;
            userData.leftEye.scale.y = 0.1;
            userData.rightEye.scale.y = 0.1;
            
            // Reset eyes after blink
            setTimeout(() => {
              userData.leftEye.scale.y = 1;
              userData.rightEye.scale.y = 1;
            }, blinkDuration * 1000);
          }
        }
        
        // Enhanced movement system with personality-based behavior
        const moveTime = time * userData.swimSpeed;
        userData.currentDirection.lerp(userData.targetDirection, 0.012); // Faster response
        
        // Enhanced direction change with personality-based timers
        userData.directionChangeTimer -= deltaTime;
        if (userData.directionChangeTimer <= 0) {
          // Personality-based direction change frequency
          const changeFrequency = userData.energyLevel === 'high' ? 2 + Math.random() * 3 :
                                 userData.energyLevel === 'medium' ? 3 + Math.random() * 4 :
                                 4 + Math.random() * 6;
          userData.directionChangeTimer = changeFrequency;
          
          // Enhanced 3D movement with personality
          userData.targetDirection.set(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * userData.movementRange.y * 2, // Personality-based vertical movement
            (Math.random() - 0.5) * 2
          ).normalize();
        }
        
        // Enhanced emergence or personality-based swimming
        if (userData.isEmerging && blob.position.y < userData.emergenceTarget) {
          blob.position.y += userData.swimSpeed * deltaTime * 0.8; // Faster emergence
          if (blob.position.y >= userData.emergenceTarget) {
            userData.isEmerging = false;
          }
        } else {
          // Enhanced swimming motion with personality-based movement
          const swimOffset = Math.sin(moveTime + userData.swimOffset) * 0.7;
          const moveDistance = userData.swimAmplitude * deltaTime * userData.speedMultiplier * 0.5;
          
          // Smoother movement with velocity smoothing
          const targetVelocity = userData.currentDirection.clone().multiplyScalar(moveDistance * (1 + swimOffset));
          userData.velocity.lerp(targetVelocity, 0.1); // Smooth velocity transitions
          
          blob.position.add(userData.velocity);
        }
        
        // Enhanced boundary collision with hexagon CENTER containment
        const distanceFromCenter = Math.sqrt(blob.position.x ** 2 + blob.position.z ** 2);
        const centerRadius = 2.8; // Keep within center area (well inside hexagon)
        
        if (distanceFromCenter > centerRadius - userData.radius) {
          const angle = Math.atan2(blob.position.z, blob.position.x);
          const targetX = Math.cos(angle) * (centerRadius - userData.radius);
          const targetZ = Math.sin(angle) * (centerRadius - userData.radius);
          
          // Smooth boundary correction instead of instant snap
          blob.position.x = THREE.MathUtils.lerp(blob.position.x, targetX, 0.2);
          blob.position.z = THREE.MathUtils.lerp(blob.position.z, targetZ, 0.2);
          
          // Smoother wall bounce
          const wallNormal = new THREE.Vector3(-Math.cos(angle), 0, -Math.sin(angle));
          userData.targetDirection.reflect(wallNormal).multiplyScalar(0.9);
          userData.velocity.multiplyScalar(0.7); // Dampen velocity on collision
        }
        
        // Enhanced vertical boundaries with personality layers
        const verticalLimits = {
          small: { floor: -2.5, ceiling: 0.5 },
          medium: { floor: -3.0, ceiling: -0.2 },
          large: { floor: -3.5, ceiling: -1.0 }
        };
        
        const limits = verticalLimits[userData.sizeCategory as keyof typeof verticalLimits];
        
        if (blob.position.y > limits.ceiling - userData.radius) {
          blob.position.y = THREE.MathUtils.lerp(blob.position.y, limits.ceiling - userData.radius, 0.2);
          userData.targetDirection.y = -Math.abs(userData.targetDirection.y) * 0.9;
          userData.velocity.y *= 0.7;
        } else if (blob.position.y < limits.floor + userData.radius && !userData.isEmerging) {
          blob.position.y = THREE.MathUtils.lerp(blob.position.y, limits.floor + userData.radius, 0.2);
          userData.targetDirection.y = Math.abs(userData.targetDirection.y) * 0.9;
          userData.velocity.y *= 0.7;
        }
        
        // Optimized squishy scale animation
        const squishTime = time * userData.squishSpeed + userData.squishOffset;
        const squishScale = 1 + Math.sin(squishTime) * userData.squishiness;
        const squishScaleY = 1 + Math.sin(squishTime * 1.1) * userData.squishiness * 0.7;
        blob.scale.set(squishScale, squishScaleY, squishScale);
        
        // Optimized rotation
        blob.rotation.y += userData.rotationSpeed;
        
        // Optimized blinking system
        userData.blinkTimer -= deltaTime;
        if (userData.blinkTimer <= 0) {
          userData.blinkTimer = 3 + Math.random() * 6; // Slower blinking
          
          // Quick blink animation
          userData.leftEye.scale.y = 0.1;
          userData.rightEye.scale.y = 0.1;
          
          setTimeout(() => {
            userData.leftEye.scale.y = 1;
            userData.rightEye.scale.y = 1;
          }, 100);
        }
      });
    }

    // Optimized particle animation with reduced update frequency
    const particles = (hexagonRef.current as any).particles;
    if (particles) {
      particles.rotation.y += 0.0003; // Slower rotation for better performance
      
      // Update particles less frequently for performance
      if (Math.floor(elapsedTime * 30) % 2 === 0) { // 15fps update rate
        const positions = particles.geometry.attributes.position.array as Float32Array;
        const velocities = particles.userData.velocities;
        
        for (let i = 0; i < positions.length; i += 3) {
          // Apply velocities with damping
          positions[i] += velocities[i] * 0.8;
          positions[i + 1] += velocities[i + 1] * 0.8;
          positions[i + 2] += velocities[i + 2] * 0.8;
          
          // Gentler wave motion
          positions[i + 1] += Math.sin(elapsedTime * 1.5 + i * 0.08) * 0.001;
          
          // Optimized boundary wrapping
          if (Math.abs(positions[i]) > 7) velocities[i] *= -0.9;
          if (Math.abs(positions[i + 1]) > 3.5) velocities[i + 1] *= -0.9;
          if (Math.abs(positions[i + 2]) > 7) velocities[i + 2] *= -0.9;
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

  // Ultra-smooth rotation with enhanced physics simulation
  const updateRotationWithPhysics = (_deltaTime: number) => {
    if (!isInteracting && !reducedMotion) {
      targetRotationY.current = faceAngles[currentSection];
    }

    // Enhanced physics-based rotation with ultra-smooth damping
    const springStrength = 0.015; // Even gentler for ultra-smooth movement
    const damping = 0.95; // Higher damping to prevent oscillation
    
    const angleDifference = targetRotationY.current - currentRotationY.current;
    
    // Normalize angle difference to prevent unnecessary full rotations
    let normalizedDiff = angleDifference;
    while (normalizedDiff > Math.PI) normalizedDiff -= 2 * Math.PI;
    while (normalizedDiff < -Math.PI) normalizedDiff += 2 * Math.PI;
    
    const force = normalizedDiff * springStrength;
    velocityRef.current += force;
    velocityRef.current *= damping;
    
    // Apply velocity threshold to prevent micro-movements
    if (Math.abs(velocityRef.current) > 0.001) {
      currentRotationY.current += velocityRef.current;
    } else if (Math.abs(normalizedDiff) < 0.01) {
      // Snap to target when very close to prevent endless micro-adjustments
      currentRotationY.current = targetRotationY.current;
      velocityRef.current = 0;
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

    // Enhanced renderer with bloom and cyberpunk quality
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
      preserveDrawingBuffer: true // For better quality
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ReinhardToneMapping; // Better for neon colors
    renderer.toneMappingExposure = 1.8; // Increased for bloom effect
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
