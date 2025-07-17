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

  // Optimized lighting setup for better performance and soft colors
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

  // Enhanced living blobs with jelly physics, eyes, and cute movement
  const createCuteBlobsWithJellyPhysics = (group: THREE.Group) => {
    const blobCount = 12; // Doubled from 6 to 12
    const blobs: any[] = [];
    const hexagonRadius = 5.5; // Slightly smaller boundary

    for (let i = 0; i < blobCount; i++) {
      // Smaller, cuter blob sizes (halved from 0.6-1.0 to 0.3-0.5)
      const baseSize = 0.3 + Math.random() * 0.2; // 0.3 to 0.5
      
      // Create jelly-like geometry with vertex displacement capability
      const blobGeometry = new THREE.SphereGeometry(baseSize, 16, 12); // Lower poly for better performance
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
      
      // Soft, cute colors (FULLY OPAQUE - NO TRANSPARENCY)
      const colorOptions = [
        0x4ECDC4, // Soft cyan
        0xFFE66D, // Warm yellow
        0x95E1D3, // Mint green
        0xA8E6CF, // Light green
        0xFFB6C1, // Light pink
      ];
      const selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      
      // Completely opaque material (NO TRANSPARENCY AT ALL)
      const blobMaterial = new THREE.MeshPhysicalMaterial({
        color: selectedColor,
        metalness: 0.0,
        roughness: 0.4,
        clearcoat: 0.3,
        transmission: 0, // NO TRANSLUCENCY
        transparent: false, // NO TRANSPARENCY
        opacity: 1.0, // FULLY OPAQUE
        emissive: selectedColor,
        emissiveIntensity: 0.02, // Very subtle emission
      });

      const blobMesh = new THREE.Mesh(blobGeometry, blobMaterial);
      
      // Position within safe zone with better distribution for more blobs
      const angle = (i / blobCount) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 3; // Spread out more
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = -1 + Math.random() * 2; // Mostly below surface
      
      blobMesh.position.set(x, y, z);

      // Create SINGLE SET of cute black dot eyes (fixed eye duplication issue)
      const eyeSize = baseSize * 0.12; // Slightly larger relative to smaller blob
      const eyeGeometry = new THREE.SphereGeometry(eyeSize, 8, 6);
      const eyeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000 // Black dots
      });
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      
      // Position eyes on front of blob (SINGLE SET ONLY)
      const eyeOffset = baseSize * 0.35;
      leftEye.position.set(-eyeOffset, eyeOffset * 0.3, baseSize * 0.85);
      rightEye.position.set(eyeOffset, eyeOffset * 0.3, baseSize * 0.85);
      
      blobMesh.add(leftEye);
      blobMesh.add(rightEye);

      // Store comprehensive animation data
      blobMesh.userData = {
        size: baseSize,
        originalVertices,
        leftEye,
        rightEye,
        
        // Slow, cute swimming
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
        
        // Jelly physics
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

    // Animate cute jelly blobs with squishy physics and spiral emergence
    const blobs = (hexagonRef.current as any).blobs;
    if (blobs) {
      const hexagonRadius = 5.5; // Boundary radius
      
      blobs.forEach((blob: any, index: number) => {
        const userData = blob.userData;
        const time = elapsedTime;
        
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
        
        // Soft boundary checking (bounce gently)
        const distanceFromCenter = Math.sqrt(blob.position.x ** 2 + blob.position.z ** 2);
        if (distanceFromCenter > hexagonRadius - userData.size) {
          const angle = Math.atan2(blob.position.z, blob.position.x);
          blob.position.x = Math.cos(angle) * (hexagonRadius - userData.size);
          blob.position.z = Math.sin(angle) * (hexagonRadius - userData.size);
          
          // Gently reverse direction
          userData.targetDirection.multiplyScalar(-0.7);
        }
        
        // Vertical bounds (with ground emergence)
        if (blob.position.y > 2.5) {
          blob.position.y = 2.5;
          userData.targetDirection.y *= -0.8;
        } else if (blob.position.y < -2.5 && !userData.isEmerging) {
          blob.position.y = -2.5;
          userData.targetDirection.y *= -0.8;
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
