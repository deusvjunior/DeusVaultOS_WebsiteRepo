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

  // Professional lighting setup for depth and atmosphere (ENHANCED)
  const setupAdvancedLighting = (scene: THREE.Scene) => {
    // Key light - primary illumination (MUCH brighter)
    const keyLight = new THREE.DirectionalLight(0x00e1ff, 2.5);
    keyLight.position.set(15, 15, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 4096;
    keyLight.shadow.mapSize.height = 4096;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 100;
    keyLight.shadow.camera.left = -25;
    keyLight.shadow.camera.right = 25;
    keyLight.shadow.camera.top = 25;
    keyLight.shadow.camera.bottom = -25;
    scene.add(keyLight);

    // Fill light - soften shadows (MUCH brighter)
    const fillLight = new THREE.DirectionalLight(0x39ff14, 1.5);
    fillLight.position.set(-10, 8, 10);
    scene.add(fillLight);

    // Rim light - edge definition (MUCH brighter)
    const rimLight = new THREE.DirectionalLight(0xffd700, 1.8);
    rimLight.position.set(0, -8, -15);
    scene.add(rimLight);

    // Strong ambient light for overall brightness
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    // Enhanced environment light for reflections
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x1e3a8a, 0.6);
    scene.add(hemisphereLight);

    // Additional point lights for dynamic illumination
    const pointLight1 = new THREE.PointLight(0x00e1ff, 2.0, 30);
    pointLight1.position.set(8, 5, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x39ff14, 1.8, 25);
    pointLight2.position.set(-8, 5, -8);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffd700, 1.5, 20);
    pointLight3.position.set(0, 10, 0);
    scene.add(pointLight3);
  };

  // Enhanced living blobs with organic movement and personality
  const createLivingBlobs = (group: THREE.Group) => {
    const blobCount = 12; // More blobs for variety
    const blobs: any[] = [];

    for (let i = 0; i < blobCount; i++) {
      // Much more varied blob sizes and shapes
      const baseSize = 0.2 + Math.random() * 0.6; // 0.2 to 0.8
      const scaleX = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
      const scaleY = 0.8 + Math.random() * 0.4;
      const scaleZ = 0.8 + Math.random() * 0.4;
      
      const blobGeometry = new THREE.SphereGeometry(baseSize, 16, 12);
      
      // More varied materials and colors
      const hue = Math.random(); // Full hue range
      const saturation = 0.5 + Math.random() * 0.5; // 0.5 to 1.0
      const lightness = 0.4 + Math.random() * 0.4; // 0.4 to 0.8
      
      const blobMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(hue, saturation, lightness),
        metalness: Math.random() * 0.3,
        roughness: 0.6 + Math.random() * 0.4,
        clearcoat: Math.random() * 0.5,
        transmission: 0.0, // No transparency
        thickness: 0.0,
        transparent: false, // Completely opaque
        opacity: 1.0, // Solid material
        emissive: new THREE.Color().setHSL(hue, saturation * 0.3, lightness * 0.1),
        emissiveIntensity: 0.05,
      });

      const blobMesh = new THREE.Mesh(blobGeometry, blobMaterial);
      
      // Position blobs within hexagon boundaries (radius 5.0)
      const angle = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 3.5; // Keep within hexagon bounds: 1 to 4.5
      const height = Math.max(-0.5, Math.min(1.5, (Math.random() - 0.5) * 3)); // Constrain height: -0.5 to 1.5
      const depth = (Math.random() - 0.5) * 1.5; // Smaller depth variation
      
      blobMesh.position.set(
        Math.cos(angle) * radius + depth * 0.5,
        height,
        Math.sin(angle) * radius + depth * 0.5
      );
      
      // Apply random scale to each blob
      blobMesh.scale.set(scaleX, scaleY, scaleZ);
      
      // Random initial rotation
      blobMesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      // Create eyes with more variation
      const eyeSize = baseSize * 0.15; // Scale eyes with blob size
      const eyeGeometry = new THREE.SphereGeometry(eyeSize, 8, 6);
      const eyeMaterial = new THREE.MeshBasicMaterial({ 
        color: Math.random() > 0.7 ? 0xff0000 : 0x000000 // Some red eyes!
      });
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      
      // Position eyes based on blob size
      const eyeOffset = baseSize * 0.3;
      leftEye.position.set(-eyeOffset, eyeOffset * 0.5, baseSize * 0.8);
      rightEye.position.set(eyeOffset, eyeOffset * 0.5, baseSize * 0.8);
      
      blobMesh.add(leftEye);
      blobMesh.add(rightEye);

      // Enhanced animation data with more personality
      const blobData = {
        mesh: blobMesh,
        leftEye,
        rightEye,
        originalPosition: blobMesh.position.clone(),
        
        // Swimming motion parameters
        swimSpeed: 0.3 + Math.random() * 0.8, // Much more varied speeds
        swimOffset: Math.random() * Math.PI * 2,
        swimAmplitude: 0.5 + Math.random() * 1.5, // Larger movement range
        swimDirectionX: (Math.random() - 0.5) * 2,
        swimDirectionY: (Math.random() - 0.5) * 2,
        swimDirectionZ: (Math.random() - 0.5) * 2,
        
        // Rotation animation
        rotationSpeedX: (Math.random() - 0.5) * 0.02,
        rotationSpeedY: (Math.random() - 0.5) * 0.02,
        rotationSpeedZ: (Math.random() - 0.5) * 0.02,
        
        // Scale breathing animation
        breathingSpeed: 0.5 + Math.random() * 1.0,
        breathingOffset: Math.random() * Math.PI * 2,
        breathingAmplitude: 0.1 + Math.random() * 0.2,
        originalScale: { x: scaleX, y: scaleY, z: scaleZ },
        
        // Eye animation
        blinkTimer: Math.random() * 5,
        blinkDuration: 0.1 + Math.random() * 0.1,
        isBlinking: false,
        lookDirection: new THREE.Vector3(),
        lookTimer: Math.random() * 3,
        lookSpeed: 0.02 + Math.random() * 0.03,
        
        // Orbital motion around center
        orbitalAngle: Math.random() * Math.PI * 2,
        orbitalSpeed: (Math.random() - 0.5) * 0.005, // Some clockwise, some counter
        orbitalRadius: radius,
        
        // Personality traits
        isHyperactive: Math.random() > 0.7, // 30% chance of hyperactivity
        isShy: Math.random() > 0.8, // 20% chance of being shy
        energy: Math.random(), // Overall energy level
      };

      blobs.push(blobData);
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

  // Apple-grade hexagon with premium materials and logo integration
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

    // Create central logo display (replacing hexagon screens)
    const logoGeometry = new THREE.BoxGeometry(6, 4, 0.5);
    const logoMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1d20,
      metalness: 0.3,
      roughness: 0.6,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      emissive: 0x003344,
      emissiveIntensity: 0.3,
    });

    const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
    logoMesh.position.set(0, 0.5, 0);
    group.add(logoMesh);

    // Create logo surface (where the actual logo would be displayed)
    const logoSurfaceGeometry = new THREE.PlaneGeometry(5.5, 3.5);
    const logoSurfaceMaterial = new THREE.MeshStandardMaterial({
      color: 0x87ceeb, // Light blue for logo contrast
      emissive: 0x001f33,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.9,
    });
    
    const logoSurfaceMesh = new THREE.Mesh(logoSurfaceGeometry, logoSurfaceMaterial);
    logoSurfaceMesh.position.set(0, 0.5, 0.26);
    group.add(logoSurfaceMesh);

    // Create shield-like frame around the logo (inspired by the logo shape)
    const shieldGeometry = new THREE.RingGeometry(3.0, 3.5, 8);
    const shieldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4a4a4a,
      metalness: 0.8,
      roughness: 0.3,
      emissive: 0x002244,
      emissiveIntensity: 0.1,
    });
    
    const shieldMesh = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shieldMesh.position.set(0, 0.5, 0.3);
    group.add(shieldMesh);

    // Add decorative elements around the logo
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      
      // Small accent lights
      const accentGeometry = new THREE.SphereGeometry(0.1, 8, 6);
      const accentMaterial = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00e1ff : 0x39ff14,
      });
      
      const accentMesh = new THREE.Mesh(accentGeometry, accentMaterial);
      const x = Math.cos(angle) * 4;
      const z = Math.sin(angle) * 4;
      
      accentMesh.position.set(x, 0.5, z);
      group.add(accentMesh);
    }

    // Add living blobs and enhanced particles
    const blobs = createLivingBlobs(group);
    const particles = createEnhancedParticles(group);
    
    // Store references for animation updates
    (group as any).blobs = blobs;
    (group as any).particles = particles;
    (group as any).logoSurface = logoSurfaceMesh;
    (group as any).shield = shieldMesh;
  };

  // Advanced material updates with living blob animation
  const updateAdvancedMaterials = (elapsedTime: number, deltaTime: number) => {
    if (!hexagonRef.current) return;

    // Animate glow ring
    const ring = hexagonRef.current.children.find((child: any) => 
      child.geometry instanceof THREE.RingGeometry && child.position.y < 0
    ) as THREE.Mesh;
    
    if (ring && ring.material instanceof THREE.MeshBasicMaterial) {
      ring.material.opacity = 0.2 + Math.sin(elapsedTime * 0.3) * 0.1; // Slower pulsing
    }

    // Animate logo surface based on current section
    const logoSurface = (hexagonRef.current as any).logoSurface as THREE.Mesh;
    if (logoSurface && logoSurface.material instanceof THREE.MeshStandardMaterial) {
      // Pulse the logo with a gentle glow effect
      const pulseIntensity = 0.2 + Math.sin(elapsedTime * 0.5) * 0.1;
      logoSurface.material.emissiveIntensity = pulseIntensity;
    }

    // Animate shield frame
    const shield = (hexagonRef.current as any).shield as THREE.Mesh;
    if (shield && shield.material instanceof THREE.MeshPhysicalMaterial) {
      shield.rotation.z += 0.002; // Slow rotation
      const shieldGlow = 0.1 + Math.sin(elapsedTime * 0.4) * 0.05;
      shield.material.emissiveIntensity = shieldGlow;
    }

    // Animate enhanced living blobs with organic swimming motion
    const blobs = (hexagonRef.current as any).blobs;
    if (blobs) {
      blobs.forEach((blobData: any, index: number) => {
        const time = elapsedTime;
        
        // Complex swimming motion - each blob has unique personality
        const swimTimeX = time * blobData.swimSpeed + blobData.swimOffset;
        const swimTimeY = time * blobData.swimSpeed * 0.7 + blobData.swimOffset * 1.3;
        const swimTimeZ = time * blobData.swimSpeed * 1.1 + blobData.swimOffset * 0.8;
        
        // Organic swimming patterns - different for each axis
        const swimX = Math.sin(swimTimeX) * blobData.swimAmplitude * blobData.swimDirectionX;
        const swimY = Math.sin(swimTimeY) * blobData.swimAmplitude * 0.5 * blobData.swimDirectionY;
        const swimZ = Math.cos(swimTimeZ) * blobData.swimAmplitude * blobData.swimDirectionZ;
        
        // Add figure-8 motion for hyperactive blobs
        if (blobData.isHyperactive) {
          const figureEightX = Math.sin(time * 2) * 0.5;
          const figureEightY = Math.sin(time * 4) * 0.3;
        blobData.mesh.position.x = blobData.originalPosition.x + swimX + figureEightX;
        blobData.mesh.position.y = blobData.originalPosition.y + swimY + figureEightY;
      } else {
        blobData.mesh.position.x = blobData.originalPosition.x + swimX;
        blobData.mesh.position.y = blobData.originalPosition.y + swimY;
      }
      blobData.mesh.position.z = blobData.originalPosition.z + swimZ;
      
      // Orbital motion around center
      blobData.orbitalAngle += blobData.orbitalSpeed * (blobData.energy + 0.5);
      const orbitalX = Math.cos(blobData.orbitalAngle) * blobData.orbitalRadius;
      const orbitalZ = Math.sin(blobData.orbitalAngle) * blobData.orbitalRadius;
      blobData.mesh.position.x += orbitalX * 0.1; // Subtle orbital influence
      blobData.mesh.position.z += orbitalZ * 0.1;
      
      // Boundary constraints - keep blobs within hexagon bounds
      const hexagonRadius = 4.5; // Slightly smaller than actual hexagon
      const currentDistance = Math.sqrt(
        blobData.mesh.position.x * blobData.mesh.position.x + 
        blobData.mesh.position.z * blobData.mesh.position.z
      );
      
      if (currentDistance > hexagonRadius) {
        const constraintFactor = hexagonRadius / currentDistance;
        blobData.mesh.position.x *= constraintFactor;
        blobData.mesh.position.z *= constraintFactor;
        
        // Bounce back with reduced velocity
        blobData.swimDirectionX *= -0.5;
        blobData.swimDirectionZ *= -0.5;
      }
      
      // Height constraints - keep above floor and below ceiling
      if (blobData.mesh.position.y > 2.0) {
        blobData.mesh.position.y = 2.0;
        blobData.swimDirectionY *= -0.7;
      } else if (blobData.mesh.position.y < -0.8) {
        blobData.mesh.position.y = -0.8;
        blobData.swimDirectionY *= -0.7;
      }
      
      // Collision detection with other blobs (simple distance check)
      blobs.forEach((otherBlob: any, otherIndex: number) => {
        if (index !== otherIndex) {
          const distance = blobData.mesh.position.distanceTo(otherBlob.mesh.position);
          const minDistance = 0.8; // Minimum distance between blobs
          
          if (distance < minDistance) {
            // Push blobs apart
            const pushDirection = blobData.mesh.position.clone().sub(otherBlob.mesh.position).normalize();
            const pushStrength = (minDistance - distance) * 0.1;
            
            blobData.mesh.position.add(pushDirection.multiplyScalar(pushStrength));
            
            // Reverse swimming directions for bouncing effect
            if (Math.abs(pushDirection.x) > 0.5) blobData.swimDirectionX *= -0.8;
            if (Math.abs(pushDirection.y) > 0.5) blobData.swimDirectionY *= -0.8;
            if (Math.abs(pushDirection.z) > 0.5) blobData.swimDirectionZ *= -0.8;
          }
        }
      });        // Continuous rotation with personality
        blobData.mesh.rotation.x += blobData.rotationSpeedX * (blobData.isHyperactive ? 2 : 1);
        blobData.mesh.rotation.y += blobData.rotationSpeedY * (blobData.isHyperactive ? 2 : 1);
        blobData.mesh.rotation.z += blobData.rotationSpeedZ * (blobData.isHyperactive ? 2 : 1);
        
        // Breathing/pulsing scale animation
        const breathingTime = time * blobData.breathingSpeed + blobData.breathingOffset;
        const breathingScale = 1 + Math.sin(breathingTime) * blobData.breathingAmplitude;
        
        // Apply breathing with original scale variations
        blobData.mesh.scale.x = blobData.originalScale.x * breathingScale;
        blobData.mesh.scale.y = blobData.originalScale.y * (1 + Math.cos(breathingTime * 1.3) * blobData.breathingAmplitude * 0.7);
        blobData.mesh.scale.z = blobData.originalScale.z * breathingScale;
        
        // Advanced eye blinking with personality
        blobData.blinkTimer -= deltaTime;
        if (blobData.blinkTimer <= 0) {
          // Shy blobs blink more often
          blobData.blinkTimer = blobData.isShy ? (1 + Math.random() * 2) : (2 + Math.random() * 4);
          blobData.isBlinking = true;
          
          // Blink animation with slight delay between eyes
          const blinkDelay = Math.random() * 0.05;
          blobData.leftEye.scale.y = 0.1;
          
          setTimeout(() => {
            blobData.rightEye.scale.y = 0.1;
          }, blinkDelay * 1000);
          
          setTimeout(() => {
            blobData.leftEye.scale.y = 1;
            blobData.rightEye.scale.y = 1;
            blobData.isBlinking = false;
          }, (blobData.blinkDuration + blinkDelay) * 1000);
        }
        
        // Advanced looking behavior
        blobData.lookTimer -= deltaTime;
        if (blobData.lookTimer <= 0) {
          blobData.lookTimer = blobData.isShy ? (0.5 + Math.random() * 1) : (1 + Math.random() * 3);
          
          // Shy blobs look away more, hyperactive blobs look around more
          const lookIntensity = blobData.isShy ? 0.5 : (blobData.isHyperactive ? 2 : 1);
          blobData.lookDirection.set(
            (Math.random() - 0.5) * 0.15 * lookIntensity,
            (Math.random() - 0.5) * 0.1 * lookIntensity,
            0
          );
        }
        
        // Smooth eye movement with momentum
        const eyeBaseOffset = blobData.mesh.geometry.parameters.radius * 0.3;
        const currentLookX = blobData.leftEye.position.x + eyeBaseOffset;
        const currentLookY = blobData.leftEye.position.y - eyeBaseOffset * 0.5;
        
        const targetLookX = blobData.lookDirection.x;
        const targetLookY = blobData.lookDirection.y;
        
        const lookLerpX = currentLookX + (targetLookX - currentLookX) * blobData.lookSpeed;
        const lookLerpY = currentLookY + (targetLookY - currentLookY) * blobData.lookSpeed;
        
        blobData.leftEye.position.x = -eyeBaseOffset + lookLerpX;
        blobData.leftEye.position.y = eyeBaseOffset * 0.5 + lookLerpY;
        blobData.rightEye.position.x = eyeBaseOffset + lookLerpX;
        blobData.rightEye.position.y = eyeBaseOffset * 0.5 + lookLerpY;
        
        // Random color shifts for extra life
        if (Math.random() < 0.001) { // Very rare color shifts
          const material = blobData.mesh.material as THREE.MeshPhysicalMaterial;
          const currentHSL = { h: 0, s: 0, l: 0 };
          material.color.getHSL(currentHSL);
          const newHue = currentHSL.h + (Math.random() - 0.5) * 0.1;
          material.color.setHSL(newHue, currentHSL.s, currentHSL.l);
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
