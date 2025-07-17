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

  // Professional lighting setup for depth and atmosphere
  const setupAdvancedLighting = (scene: THREE.Scene) => {
    // Key light - primary illumination (much brighter with extended range)
    const keyLight = new THREE.DirectionalLight(0x00e1ff, 2.5); // Increased from 1.2
    keyLight.position.set(10, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 4096; // Increased resolution
    keyLight.shadow.mapSize.height = 4096;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 100; // Extended range
    keyLight.shadow.camera.left = -30;
    keyLight.shadow.camera.right = 30;
    keyLight.shadow.camera.top = 30;
    keyLight.shadow.camera.bottom = -30;
    scene.add(keyLight);

    // Fill light - soften shadows (enhanced)
    const fillLight = new THREE.DirectionalLight(0x39ff14, 1.2); // Increased from 0.6
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);

    // Rim light - edge definition (enhanced)
    const rimLight = new THREE.DirectionalLight(0xffd700, 1.5); // Increased from 0.8
    rimLight.position.set(0, -5, -10);
    scene.add(rimLight);

    // Additional directional light from opposite side
    const backLight = new THREE.DirectionalLight(0x00ffff, 1.0);
    backLight.position.set(-10, -10, -8);
    scene.add(backLight);

    // Ambient light - global illumination (brighter)
    const ambientLight = new THREE.AmbientLight(0x1a1d20, 0.8); // Increased from 0.2
    scene.add(ambientLight);

    // Environment light for reflections (enhanced)
    const hemisphereLight = new THREE.HemisphereLight(0x00e1ff, 0x131619, 0.7); // Increased from 0.3
    scene.add(hemisphereLight);

    // Additional point lights for enhanced depth
    const pointLight1 = new THREE.PointLight(0x00ffff, 1.5, 40); // Cyan with extended range
    pointLight1.position.set(-12, 8, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x39ff14, 1.2, 35); // Green accent
    pointLight2.position.set(12, -5, 6);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffff00, 1.0, 30); // Yellow accent
    pointLight3.position.set(0, 12, -8);
    scene.add(pointLight3);
  };

  // Enhanced living blobs with organic movement and personality
  const createLivingBlobs = (group: THREE.Group) => {
    const blobCount = 8; // Reduced count to prevent overcrowding
    const blobs: any[] = [];
    const hexagonRadius = 6; // Define hexagon boundary for collision detection

    for (let i = 0; i < blobCount; i++) {
      // Smaller, more uniform blob sizes
      const baseSize = 0.3 + Math.random() * 0.4; // 0.3 to 0.7 (smaller than before)
      
      // Perfect sphere geometry (no stretching)
      const blobGeometry = new THREE.SphereGeometry(baseSize, 32, 24); // Higher quality sphere
      
      // Neon cyan/yellow color palette with green accents
      const colorOptions = [
        0x00ffff, // Neon cyan
        0xffff00, // Neon yellow  
        0x00ff88, // Light green accent
        0x88ffff, // Light cyan
        0xffff88, // Light yellow
      ];
      const selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      
      const blobMaterial = new THREE.MeshPhysicalMaterial({
        color: selectedColor,
        metalness: 0.1,
        roughness: 0.3,
        clearcoat: 0.8,
        transmission: 0, // Fully opaque
        transparent: false, // No transparency
        opacity: 1.0, // Fully opaque
        emissive: selectedColor,
        emissiveIntensity: 0.1 + Math.random() * 0.2, // Subtle pulsating emission
      });

      const blobMesh = new THREE.Mesh(blobGeometry, blobMaterial);
      
      // Position within hexagon boundaries with collision detection
      let positionValid = false;
      let attempts = 0;
      let x, y, z;
      
      while (!positionValid && attempts < 50) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (hexagonRadius - baseSize - 1); // Keep away from edges
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        y = (Math.random() - 0.5) * 3; // Limited height range
        
        // Check collision with existing blobs
        let collides = false;
        for (const existingBlob of blobs) {
          const distance = Math.sqrt(
            Math.pow(x - existingBlob.position.x, 2) +
            Math.pow(y - existingBlob.position.y, 2) +
            Math.pow(z - existingBlob.position.z, 2)
          );
          if (distance < (baseSize + existingBlob.userData.size + 0.5)) {
            collides = true;
            break;
          }
        }
        
        positionValid = !collides;
        attempts++;
      }
      
      blobMesh.position.set(x || 0, y || 0, z || 0);
      
      // No scale distortion - keep perfect sphere shape
      blobMesh.scale.set(1, 1, 1);
      
      // Random initial rotation
      blobMesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      // Create eyes with neon glow
      const eyeSize = baseSize * 0.12;
      const eyeGeometry = new THREE.SphereGeometry(eyeSize, 16, 12);
      const eyeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff
      });
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      
      // Position eyes based on blob size
      const eyeOffset = baseSize * 0.3;
      leftEye.position.set(-eyeOffset, eyeOffset * 0.5, baseSize * 0.8);
      rightEye.position.set(eyeOffset, eyeOffset * 0.5, baseSize * 0.8);
      
      blobMesh.add(leftEye);
      blobMesh.add(rightEye);

      // Store blob data for animation
      blobMesh.userData = {
        size: baseSize,
        originalPosition: blobMesh.position.clone(),
        leftEye,
        rightEye,
        
        // Slower swimming motion parameters
        swimSpeed: 0.1 + Math.random() * 0.3, // Much slower: 0.1 to 0.4
        swimOffset: Math.random() * Math.PI * 2,
        swimAmplitude: 0.3 + Math.random() * 0.5, // Smaller movement range
        swimDirectionX: (Math.random() - 0.5) * 0.5,
        swimDirectionY: (Math.random() - 0.5) * 0.3,
        swimDirectionZ: (Math.random() - 0.5) * 0.5,
        
        // Slower rotation animation
        rotationSpeedX: (Math.random() - 0.5) * 0.005,
        rotationSpeedY: (Math.random() - 0.5) * 0.005,
        rotationSpeedZ: (Math.random() - 0.5) * 0.005,
        
        // Gentle breathing animation
        breathingSpeed: 0.2 + Math.random() * 0.4,
        breathingOffset: Math.random() * Math.PI * 2,
        breathingAmplitude: 0.05 + Math.random() * 0.1,
        
        // Eye animation
        blinkTimer: Math.random() * 5,
        blinkDuration: 0.1 + Math.random() * 0.1,
        isBlinking: false,
        lookDirection: new THREE.Vector3(),
        lookTimer: Math.random() * 3,
        lookSpeed: 0.01 + Math.random() * 0.02,
        
        // Gentle orbital motion
        orbitalAngle: Math.random() * Math.PI * 2,
        orbitalSpeed: (Math.random() - 0.5) * 0.002, // Much slower orbital motion
        orbitalRadius: Math.sqrt((x||0)*(x||0) + (z||0)*(z||0)),
        
        // Personality traits
        isHyperactive: Math.random() > 0.8, // 20% chance of hyperactivity
        isShy: Math.random() > 0.8, // 20% chance of being shy
        energy: Math.random(), // Overall energy level
        
        // Emission pulsing
        originalEmissiveIntensity: blobMaterial.emissiveIntensity,
        pulseSpeed: 0.5 + Math.random() * 1.0,
        pulseOffset: Math.random() * Math.PI * 2,
      };

      blobs.push(blobMesh);
      group.add(blobMesh);
    }

    return blobs;
  };

  // Enhanced particle system with smaller, dynamic particles
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
    const blobs = createLivingBlobs(group);
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

    // Animate enhanced living blobs with organic swimming motion and boundary checking
    const blobs = (hexagonRef.current as any).blobs;
    if (blobs) {
      const hexagonRadius = 6; // Boundary radius
      
      blobs.forEach((blob: any, index: number) => {
        const userData = blob.userData;
        const time = elapsedTime;
        
        // Slower, more elegant swimming motion
        const swimTimeX = time * userData.swimSpeed + userData.swimOffset;
        const swimTimeY = time * userData.swimSpeed * 0.7 + userData.swimOffset * 1.3;
        const swimTimeZ = time * userData.swimSpeed * 1.1 + userData.swimOffset * 0.8;
        
        // Gentle organic swimming patterns
        const swimX = Math.sin(swimTimeX) * userData.swimAmplitude * userData.swimDirectionX;
        const swimY = Math.sin(swimTimeY) * userData.swimAmplitude * 0.5 * userData.swimDirectionY;
        const swimZ = Math.cos(swimTimeZ) * userData.swimAmplitude * userData.swimDirectionZ;
        
        // Calculate new position
        let newX = userData.originalPosition.x + swimX;
        let newY = userData.originalPosition.y + swimY;
        let newZ = userData.originalPosition.z + swimZ;
        
        // Add gentle orbital motion
        userData.orbitalAngle += userData.orbitalSpeed * (userData.energy + 0.5);
        const orbitalX = Math.cos(userData.orbitalAngle) * userData.orbitalRadius * 0.1;
        const orbitalZ = Math.sin(userData.orbitalAngle) * userData.orbitalRadius * 0.1;
        newX += orbitalX;
        newZ += orbitalZ;
        
        // Boundary checking - keep within hexagon
        const distanceFromCenter = Math.sqrt(newX * newX + newZ * newZ);
        if (distanceFromCenter > hexagonRadius - userData.size) {
          // Bounce off walls by reversing direction
          const angle = Math.atan2(newZ, newX);
          newX = Math.cos(angle) * (hexagonRadius - userData.size);
          newZ = Math.sin(angle) * (hexagonRadius - userData.size);
          
          // Reverse swimming direction to create bounce effect
          userData.swimDirectionX *= -0.8;
          userData.swimDirectionZ *= -0.8;
        }
        
        // Keep vertical movement within bounds
        if (newY > 3) {
          newY = 3;
          userData.swimDirectionY *= -0.8;
        } else if (newY < -3) {
          newY = -3;
          userData.swimDirectionY *= -0.8;
        }
        
        // Collision detection with other blobs
        blobs.forEach((otherBlob: any, otherIndex: number) => {
          if (index !== otherIndex) {
            const otherUserData = otherBlob.userData;
            const dx = newX - otherBlob.position.x;
            const dy = newY - otherBlob.position.y;
            const dz = newZ - otherBlob.position.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const minDistance = userData.size + otherUserData.size + 0.2;
            
            if (distance < minDistance) {
              // Push blobs apart gently
              const pushFactor = (minDistance - distance) * 0.5;
              const pushX = (dx / distance) * pushFactor;
              const pushY = (dy / distance) * pushFactor;
              const pushZ = (dz / distance) * pushFactor;
              
              newX += pushX;
              newY += pushY;
              newZ += pushZ;
            }
          }
        });
        
        // Apply new position
        blob.position.set(newX, newY, newZ);
        
        // Slower rotation animation
        blob.rotation.x += userData.rotationSpeedX * (userData.isHyperactive ? 1.5 : 1);
        blob.rotation.y += userData.rotationSpeedY * (userData.isHyperactive ? 1.5 : 1);
        blob.rotation.z += userData.rotationSpeedZ * (userData.isHyperactive ? 1.5 : 1);
        
        // Gentle breathing/pulsing scale animation
        const breathingTime = time * userData.breathingSpeed + userData.breathingOffset;
        const breathingScale = 1 + Math.sin(breathingTime) * userData.breathingAmplitude;
        blob.scale.setScalar(breathingScale); // Keep perfect sphere shape
        
        // Subtle emission pulsing for neon glow
        const pulseTime = time * userData.pulseSpeed + userData.pulseOffset;
        const pulseIntensity = userData.originalEmissiveIntensity * (1 + Math.sin(pulseTime) * 0.3);
        blob.material.emissiveIntensity = pulseIntensity;
        
        // Eye blinking animation
        userData.blinkTimer -= deltaTime;
        if (userData.blinkTimer <= 0) {
          userData.blinkTimer = userData.isShy ? (1 + Math.random() * 2) : (2 + Math.random() * 4);
          userData.isBlinking = true;
          
          // Synchronized eye blinking
          userData.leftEye.scale.y = 0.1;
          userData.rightEye.scale.y = 0.1;
          
          setTimeout(() => {
            userData.leftEye.scale.y = 1;
            userData.rightEye.scale.y = 1;
            userData.isBlinking = false;
          }, userData.blinkDuration * 1000);
        }
        
        // Gentle eye tracking
        userData.lookTimer -= deltaTime;
        if (userData.lookTimer <= 0) {
          userData.lookTimer = 1 + Math.random() * 3;
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
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d20 50%, #131619 100%)'
      }}
    />
  );
};

export default ThreeJSScene;
