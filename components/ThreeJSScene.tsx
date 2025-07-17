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

  // UE5-grade lighting setup with advanced PBR workflow
  const setupAdvancedLighting = (scene: THREE.Scene) => {
    // Key directional light (sun simulation)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5); // Bright white
    keyLight.position.set(12, 15, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048; // Higher quality shadows
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -20;
    keyLight.shadow.camera.right = 20;
    keyLight.shadow.camera.top = 20;
    keyLight.shadow.camera.bottom = -20;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Fill light for soft shadows
    const fillLight = new THREE.DirectionalLight(0x87CEEB, 1.2); // Sky blue
    fillLight.position.set(-8, 10, -6);
    scene.add(fillLight);

    // Rim light for edge definition (additive white)
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8); // Additive white
    rimLight.position.set(0, 8, -15);
    rimLight.castShadow = false;
    scene.add(rimLight);

    // Enhanced ambient with minimum 2% emission (not black)
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.4); // Dark blue-gray with 2% emission
    scene.add(ambientLight);

    // Point lights for accent
    const pointLight1 = new THREE.PointLight(0x00ffff, 1.5, 30);
    pointLight1.position.set(8, 6, 8);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xfff600, 1.2, 25); // Neon yellow
    pointLight2.position.set(-6, 8, -4);
    scene.add(pointLight2);
    const pointLight3 = new THREE.PointLight(0x4ecdc4, 1.0, 20);
    pointLight3.position.set(0, 12, 0);
    scene.add(pointLight3);
  };

  // Enhanced living blobs with jelly physics, eyes, and cute movement
  const createCuteBlobsWithJellyPhysics = (group: THREE.Group) => {
    const blobCount = 12; // Doubled from 6 to 12
    const blobs: any[] = [];
    const hexagonRadius = 5.5; // Slightly smaller boundary
    const colorOptions = [0x00e1ff, 0xfff600]; // Cyan, neon yellow
    for (let i = 0; i < blobCount; i++) {
      const baseSize = 0.3 + Math.random() * 0.2;
      const blobGeometry = new THREE.SphereGeometry(baseSize, 16, 12);
      const positions = blobGeometry.attributes.position;
      const originalVertices = [];
      for (let j = 0; j < positions.count; j++) {
        originalVertices.push(
          positions.getX(j),
          positions.getY(j), 
          positions.getZ(j)
        );
      }
      const selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      // Only blobs get reflection maps
      const blobMaterial = new THREE.MeshPhysicalMaterial({
        color: selectedColor,
        metalness: 0.25,
        roughness: 0.25,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        reflectivity: 0.95,
        transmission: 0,
        transparent: false,
        opacity: 1.0,
        emissive: selectedColor,
        emissiveIntensity: 0.08 + Math.random() * 0.08, // Pulsating emission
        envMapIntensity: 1.5,
      });
      const blobMesh = new THREE.Mesh(blobGeometry, blobMaterial);
      
      // Position within safe zone with better distribution for more blobs
      const angle = (i / blobCount) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 3; // Spread out more
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = -1 + Math.random() * 2; // Mostly below surface
      
      blobMesh.position.set(x, y, z);

      // Create SINGLE SET of cute black dot eyes (MATTE BLACK - NO SHINE)
      const eyeSize = baseSize * 0.12; // Slightly larger relative to smaller blob
      const eyeGeometry = new THREE.SphereGeometry(eyeSize, 8, 6);
      const eyeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000, // Pure black dots
        transparent: false,
        fog: false // Prevent fog interference
      });
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      
      // Position eyes on front of blob (SINGLE SET ONLY) - ATTACHED TO SKIN
      const eyeOffset = baseSize * 0.35;
      leftEye.position.set(-eyeOffset, eyeOffset * 0.3, baseSize * 0.75); // Closer to surface
      rightEye.position.set(eyeOffset, eyeOffset * 0.3, baseSize * 0.75);
      
      blobMesh.add(leftEye);
      blobMesh.add(rightEye);

        // Store comprehensive animation data with physics collision
        blobMesh.userData = {
          size: baseSize,
          originalVertices,
          leftEye,
          rightEye,
          
        // Physics collision properties (larger colliders)
        radius: baseSize * 1.5, // 50% larger collision sphere
        velocity: new THREE.Vector3(),          // Slow, cute swimming
          swimSpeed: 0.2 + Math.random() * 0.3, // Very slow
          swimOffset: Math.random() * Math.PI * 2,
          swimAmplitude: 0.5 + Math.random() * 0.5,
          
          // Individual direction per blob
          targetDirection: new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 2
          ).normalize(),
          currentDirection: new THREE.Vector3(),
          
          // Material pulsing
          baseMaterial: blobMaterial,
          pulseSpeed: 0.8 + Math.random() * 0.6,
          pulseOffset: Math.random() * Math.PI * 2,        // Jelly physics
        jellyVertices: new Float32Array(originalVertices),
        jellySpeed: 0.5 + Math.random() * 0.5,
        jellyIntensity: 0.1 + Math.random() * 0.1,
        
        // Spiral emergence from ground
        spiralAngle: Math.random() * Math.PI * 2,
        spiralSpeed: 0.3 + Math.random() * 0.4,
        spiralRadius: 0.2 + Math.random() * 0.3,
        isEmerging: y < -0.5,
        emergenceTarget: y + 2,
        
        // Cute blinking
        blinkTimer: 1 + Math.random() * 3,
        isBlinking: false,
        
        // Squishy scale animation  
        squishiness: 0.05 + Math.random() * 0.05,
        squishSpeed: 0.8 + Math.random() * 0.4,
        squishOffset: Math.random() * Math.PI * 2,
        
        // Gentle rotation
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        
        // Ground intersection effect
        groundIntersection: 0,
        intersectionFade: 1,
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

  // UE5-grade hexagon with modern reflective materials
  const createAppleGradeHexagon = (group: THREE.Group) => {
    // Dark-fade mirror ground for blob reflections
    const baseGeometry = new THREE.CylinderGeometry(6.5, 7.0, 0.3, 32);
    const baseMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0f, // Very dark base
      metalness: 0.8, // High metallic for mirror effect
      roughness: 0.3, // Some roughness for dark-fade effect
      clearcoat: 0.9, // Strong clear coat
      clearcoatRoughness: 0.2, // Slightly rough clear coat for fade
      reflectivity: 0.7, // Good reflection but not perfect mirror
      emissive: 0x050508, // Minimum 2% emission
      emissiveIntensity: 0.02,
      envMapIntensity: 0.8, // Moderate environment reflection
    });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.y = -1.0;
    baseMesh.receiveShadow = true;
    baseMesh.castShadow = true;
    group.add(baseMesh);

    // Enhanced glow ring with modern effects
    const ringGeometry = new THREE.RingGeometry(6.0, 6.8, 64);
    const ringMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00e1ff,
      transparent: true,
      opacity: 0.4,
      metalness: 0.0,
      roughness: 0.2,
      clearcoat: 0.0,
      emissive: 0x00e1ff,
      emissiveIntensity: 0.3,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.y = -0.8;
    ringMesh.rotation.x = -Math.PI / 2;
    group.add(ringMesh);

    // Create modern hexagon monitor panels
    const sections = 6;
    const radius = 5.0;
    for (let i = 0; i < sections; i++) {
      const angle = (i * Math.PI * 2) / sections;
      // Dark box frame for better text readability
      const frameGeometry = new THREE.BoxGeometry(3.5, 2.5, 0.3);
      const frameMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0f0f17, // Very dark for readability
        metalness: 0.1, // Minimal metallic
        roughness: 0.8, // Mostly matte
        clearcoat: 0.2, // Subtle clear coat
        reflectivity: 0.1, // Very low reflection
        emissive: 0x0a0a0f, // Dark emission
        emissiveIntensity: 0.02, // Very low emission for readability
      });
      const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      frameMesh.position.set(x, 0, z);
      frameMesh.lookAt(0, 0, 0);
      frameMesh.castShadow = true;
      frameMesh.receiveShadow = true;
      // Glassy screen, not reflective
      const screenGeometry = new THREE.PlaneGeometry(3.0, 2.0);
      const screenMaterial = new THREE.MeshPhysicalMaterial({
        color: i === 0 ? 0x00e1ff : 0x181a1b,
        metalness: 0.0,
        roughness: 0.05, // Glass-like
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        reflectivity: 0.0,
        transmission: 0.1, // Slight transparency
        thickness: 0.5,
        emissive: i === 0 ? 0x00e1ff : 0x000000,
        emissiveIntensity: i === 0 ? 0.18 : 0.05,
      });
      const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      screenMesh.position.set(x * 1.01, 0, z * 1.01);
      screenMesh.lookAt(0, 0, 0);
      group.add(frameMesh);
      group.add(screenMesh);
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

    // Update screen materials based on current section with modern reflections
    for (let i = 0; i < 6; i++) {
      const screen = (hexagonRef.current as any)[`screen_${i}`] as THREE.Mesh;
      if (screen && screen.material instanceof THREE.MeshPhysicalMaterial) {
        const isActive = i === currentSection;
        screen.material.color.setHex(isActive ? 0x00e1ff : 0x181a1b);
        screen.material.emissive.setHex(isActive ? 0x00e1ff : 0x000000);
        screen.material.emissiveIntensity = isActive ? 0.3 : 0.05;
        
        // Dynamic reflection intensity based on activity
        screen.material.envMapIntensity = isActive ? 2.0 : 1.5;
        screen.material.reflectivity = isActive ? 0.98 : 0.92;
      }
    }

    // Animate cute jelly blobs with physics collision and pulsating emission
    const blobs = (hexagonRef.current as any).blobs;
    if (blobs) {
      // Declare boundaries inside updateAdvancedMaterials scope (enhanced collision)
      const hexagonRadius = 5.0; // Smaller boundary for better collision
      const groundLevel = -1.8; // Higher ground level to prevent clipping
      const ceilingLevel = 2.2; // Lower ceiling for better containment
      blobs.forEach((blob: any, index: number) => {
        const userData = blob.userData;
        const time = elapsedTime;
        // Pulsating emission animation (cyan/yellow)
        const pulseTime = time * userData.pulseSpeed + userData.pulseOffset;
        const pulseIntensity = 0.08 + Math.sin(pulseTime) * 0.08;
        userData.baseMaterial.emissiveIntensity = pulseIntensity;
        
        // Enhanced collision detection with other blobs (larger collision spheres)
        for (let j = index + 1; j < blobs.length; j++) {
          const otherBlob = blobs[j];
          const distance = blob.position.distanceTo(otherBlob.position);
          const minDistance = userData.radius + otherBlob.userData.radius + 0.2; // Larger buffer
          
          if (distance < minDistance) {
            // Calculate collision response
            const direction = blob.position.clone().sub(otherBlob.position).normalize();
            const separation = (minDistance - distance) * 0.6; // Stronger separation
            
            // Separate blobs more aggressively
            blob.position.add(direction.clone().multiplyScalar(separation));
            otherBlob.position.sub(direction.clone().multiplyScalar(separation));
            
            // Bounce effect - reverse directions softly
            userData.targetDirection.reflect(direction).multiplyScalar(0.8);
            otherBlob.userData.targetDirection.reflect(direction.clone().negate()).multiplyScalar(0.8);
          }
        }
        
        // Jelly vertex deformation for squishiness
        const geometry = blob.geometry;
        const positions = geometry.attributes.position;
        
        for (let i = 0; i < positions.count; i++) {
          const i3 = i * 3;
          const originalX = userData.originalVertices[i3];
          const originalY = userData.originalVertices[i3 + 1];  
          const originalZ = userData.originalVertices[i3 + 2];
          
          // Add jelly wobble based on position and time
          const wobbleX = Math.sin(time * userData.jellySpeed + originalY * 2) * userData.jellyIntensity;
          const wobbleY = Math.sin(time * userData.jellySpeed * 1.3 + originalZ * 2) * userData.jellyIntensity;
          const wobbleZ = Math.sin(time * userData.jellySpeed * 0.8 + originalX * 2) * userData.jellyIntensity;
          
          positions.setXYZ(i, 
            originalX + wobbleX,
            originalY + wobbleY, 
            originalZ + wobbleZ
          );
        }
        positions.needsUpdate = true;
        
        // Eyes follow skin deformation (stick to surface)
        const eyeOffset = userData.size * 0.35;
        const skinDeformation = Math.sin(time * userData.jellySpeed) * userData.jellyIntensity * 0.5;
        
        userData.leftEye.position.z = userData.size * 0.75 + skinDeformation;
        userData.rightEye.position.z = userData.size * 0.75 + skinDeformation;
        
        // Slight eye movement with jelly physics
        userData.leftEye.position.x = -eyeOffset + Math.sin(time * userData.jellySpeed * 0.8) * userData.jellyIntensity * 0.3;
        userData.rightEye.position.x = eyeOffset + Math.sin(time * userData.jellySpeed * 0.8) * userData.jellyIntensity * 0.3;
        
        // Individual directional movement (slow & cute)
        const moveTime = time * userData.swimSpeed;
        userData.currentDirection.lerp(userData.targetDirection, 0.01);
        
        // Change direction occasionally
        if (Math.random() < 0.002) {
          userData.targetDirection.set(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 2
          ).normalize();
        }
        
        // Spiral emergence from ground effect
        if (userData.isEmerging && blob.position.y < userData.emergenceTarget) {
          userData.spiralAngle += userData.spiralSpeed * deltaTime;
          const spiralX = Math.cos(userData.spiralAngle) * userData.spiralRadius;
          const spiralZ = Math.sin(userData.spiralAngle) * userData.spiralRadius;
          
          blob.position.x += spiralX * deltaTime;
          blob.position.z += spiralZ * deltaTime;
          blob.position.y += userData.spiralSpeed * deltaTime;
          
          // Ground intersection effect (NO OPACITY CHANGES - FULLY OPAQUE)
          if (blob.position.y < 0) {
            userData.intersectionFade = Math.max(0.3, (blob.position.y + 2) / 2);
            // NO opacity change - keep fully opaque
          }
          
          if (blob.position.y >= userData.emergenceTarget) {
            userData.isEmerging = false;
            // NO opacity change - keep fully opaque
          }
        } else {
          // Normal cute swimming motion
          const swimOffset = Math.sin(moveTime + userData.swimOffset);
          const moveDistance = userData.swimAmplitude * deltaTime;
          
          blob.position.add(
            userData.currentDirection.clone().multiplyScalar(moveDistance * swimOffset)
          );
        }
        
        // Box collider boundaries (walls, floor, ceiling) with enhanced collision
        const distanceFromCenter = Math.sqrt(blob.position.x ** 2 + blob.position.z ** 2);
        if (distanceFromCenter > hexagonRadius - userData.radius) {
          const angle = Math.atan2(blob.position.z, blob.position.x);
          blob.position.x = Math.cos(angle) * (hexagonRadius - userData.radius);
          blob.position.z = Math.sin(angle) * (hexagonRadius - userData.radius);
          
          // Bounce off walls with more force
          userData.targetDirection.reflect(new THREE.Vector3(-Math.cos(angle), 0, -Math.sin(angle))).multiplyScalar(0.9);
        }

        // Enhanced box collision detection (prevent clipping through monitor frames)
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI * 2) / 6;
          const boxX = Math.cos(angle) * 5.0;
          const boxZ = Math.sin(angle) * 5.0;
          const boxDistance = Math.sqrt((blob.position.x - boxX) ** 2 + (blob.position.z - boxZ) ** 2);
          
          if (boxDistance < userData.radius + 1.8) { // Box collision radius
            const boxDirection = new THREE.Vector3(blob.position.x - boxX, 0, blob.position.z - boxZ).normalize();
            blob.position.copy(new THREE.Vector3(boxX, blob.position.y, boxZ).add(boxDirection.multiplyScalar(userData.radius + 1.8)));
            userData.targetDirection.reflect(boxDirection.negate()).multiplyScalar(0.8);
          }
        }
        
        // Floor and ceiling collision with better containment
        if (blob.position.y > ceilingLevel - userData.radius) {
          blob.position.y = ceilingLevel - userData.radius;
          userData.targetDirection.y = Math.abs(userData.targetDirection.y) * -0.9; // Stronger bounce down
        } else if (blob.position.y < groundLevel + userData.radius && !userData.isEmerging) {
          blob.position.y = groundLevel + userData.radius;
          userData.targetDirection.y = Math.abs(userData.targetDirection.y) * 0.9; // Stronger bounce up
        }
        
        // Squishy scale animation
        const squishTime = time * userData.squishSpeed + userData.squishOffset;
        const squishScale = 1 + Math.sin(squishTime) * userData.squishiness;
        const squishScaleY = 1 + Math.sin(squishTime * 1.2) * userData.squishiness * 0.8;
        blob.scale.set(squishScale, squishScaleY, squishScale);
        
        // Gentle rotation towards movement direction
        blob.rotation.y += userData.rotationSpeed;
        
        // Cute blinking animation
        userData.blinkTimer -= deltaTime;
        if (userData.blinkTimer <= 0) {
          userData.blinkTimer = 2 + Math.random() * 4; // Slower blinking
          
          // Cute synchronized blink
          userData.leftEye.scale.y = 0.1;
          userData.rightEye.scale.y = 0.1;
          
          setTimeout(() => {
            userData.leftEye.scale.y = 1;
            userData.rightEye.scale.y = 1;
          }, 150);
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

    // UE5-grade renderer with enhanced reflection capabilities
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
    renderer.toneMappingExposure = 1.0; // Reduced for realistic reflections
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
