import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeJSSceneProps {
  currentSection: number;
  onSectionChange?: (section: number) => void;
}

export function ThreeJSScene({ currentSection, onSectionChange }: ThreeJSSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const hexagonGroupRef = useRef<THREE.Group>();
  const clockRef = useRef(new THREE.Clock());

  // Setup lighting system with space background
  const setupLighting = (scene: THREE.Scene) => {
    // Enhanced key light - primary blob illumination
    const keyLight = new THREE.DirectionalLight(0x00ccff, 2.2);
    keyLight.position.set(10, 15, 10);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Enhanced fill light - fabric detail illumination
    const fillLight = new THREE.DirectionalLight(0xff6633, 1.4);
    fillLight.position.set(-8, 10, -8);
    scene.add(fillLight);

    // Enhanced rim light - edge definition and depth
    const rimLight = new THREE.DirectionalLight(0x9933ff, 1.6);
    rimLight.position.set(0, -5, -15);
    scene.add(rimLight);

    // Enhanced ambient light - soft fabric base
    const ambientLight = new THREE.AmbientLight(0x223344, 0.7);
    scene.add(ambientLight);

    // Enhanced hemisphere light for natural fabric gradation
    const hemisphereLight = new THREE.HemisphereLight(0x4488aa, 0x332211, 0.8);
    scene.add(hemisphereLight);

    // Point lights for local blob enhancement
    const pointLight1 = new THREE.PointLight(0x00ffff, 2.8, 20);
    pointLight1.position.set(8, 5, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0099, 2.2, 18);
    pointLight2.position.set(-6, 8, -6);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x66ff00, 1.8, 15);
    pointLight3.position.set(0, -8, 10);
    scene.add(pointLight3);
    
    // Create space background
    createSpaceBackground(scene);
  };

  // Create space background with stars and nebula
  const createSpaceBackground = (scene: THREE.Scene) => {
    const skyGeometry = new THREE.SphereGeometry(500, 32, 16);
    
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Deep space gradient
      const gradient = ctx.createRadialGradient(256, 128, 0, 256, 128, 200);
      gradient.addColorStop(0, '#001a33');
      gradient.addColorStop(0.5, '#000a1a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 256);
      
      // Add bright stars
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const size = Math.random() * 1.8 + 0.2;
        const brightness = Math.random() * 0.9 + 0.1;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.fill();
        
        // Star glow effect
        if (Math.random() > 0.8) {
          ctx.beginPath();
          ctx.arc(x, y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 200, 255, ${brightness * 0.3})`;
          ctx.fill();
        }
      }
      
      // Nebula clouds
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const radius = 20 + Math.random() * 60;
        
        const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const colors = ['#0099ff', '#00ccff', '#0066cc'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        nebulaGradient.addColorStop(0, color + '60');
        nebulaGradient.addColorStop(0.5, color + '30');
        nebulaGradient.addColorStop(1, color + '00');
        
        ctx.fillStyle = nebulaGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const skyTexture = new THREE.CanvasTexture(canvas);
    const skyMaterial = new THREE.MeshBasicMaterial({
      map: skyTexture,
      side: THREE.BackSide
    });
    
    const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skyMesh);
  };

  // Monitor Setup Switching Hexagon - Optimized Performance + Granite Material
  const createAppleGradeHexagon = (group: THREE.Group) => {
    const hexRadius = 5.0; // Optimized size for performance
    const hexHeight = 1.2; // Reduced for better performance
    const segments = 6;

    // Main hexagon - Premium granite material with reflections
    const hexGeometry = new THREE.CylinderGeometry(hexRadius, hexRadius, hexHeight, segments, 1);
    const graniteMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0f, // Dark granite
      metalness: 0.3,
      roughness: 0.6,
      clearcoat: 0.8,
      clearcoatRoughness: 0.3,
      reflectivity: 0.4,
      ior: 1.5,
      transparent: false
    });

    const hexMesh = new THREE.Mesh(hexGeometry, graniteMaterial);
    hexMesh.position.set(0, 0, 0);
    hexMesh.rotation.x = Math.PI / 2;
    group.add(hexMesh);

    // Atmospheric spaceship glow base - Cyberpunk style
    const glowRadius = hexRadius * 1.4;
    const glowGeometry = new THREE.CylinderGeometry(glowRadius, glowRadius * 0.8, 0.1, 32, 1);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.15
    });
    const glowBase = new THREE.Mesh(glowGeometry, glowMaterial);
    glowBase.rotation.x = Math.PI / 2;
    glowBase.position.y = -0.7;
    group.add(glowBase);

    // Neon reflection ring
    const ringGeometry = new THREE.RingGeometry(hexRadius * 0.9, hexRadius * 1.1, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.1;
    group.add(ring);

    // Monitor screens representing different pages
    const screenData = [
      { number: 1, name: 'Hero', color: 0x00ffff },
      { number: 2, name: 'Users', color: 0x0099ff },
      { number: 3, name: 'Features', color: 0x3366ff },
      { number: 4, name: 'Market', color: 0x6600ff },
      { number: 5, name: 'Compare', color: 0xff0099 },
      { number: 6, name: 'Contact', color: 0xff6600 }
    ];

    screenData.forEach((screen, index) => {
      // Screen face - Optimized geometry
      const screenGeometry = new THREE.PlaneGeometry(2.2, 1.6, 1, 1);
      const screenMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a2e,
        emissive: screen.color,
        emissiveIntensity: 0.08, // Subtle glow
        transmission: 0.05,
        opacity: 0.95,
        roughness: 0.1,
        metalness: 0.7,
        clearcoat: 0.9,
        transparent: true
      });
      
      const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      
      // Position screens around hexagon
      const angle = (index / 6) * Math.PI * 2;
      const x = Math.cos(angle) * (hexRadius - 0.1);
      const z = Math.sin(angle) * (hexRadius - 0.1);
      
      screenMesh.position.set(x, 0, z);
      screenMesh.lookAt(0, 0, 0);
      screenMesh.userData = { 
        sectionIndex: index, 
        isHexagonFace: true,
        originalEmissiveIntensity: 0.08
      };
      group.add(screenMesh);

      // Optimized screen content texture
      const canvas = document.createElement('canvas');
      canvas.width = 256; // Reduced resolution for performance
      canvas.height = 192;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Screen background with monitor-like effect
        const gradient = ctx.createLinearGradient(0, 0, 0, 192);
        gradient.addColorStop(0, '#001122');
        gradient.addColorStop(1, '#000811');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 192);
        
        // Screen border
        ctx.strokeStyle = `#${screen.color.toString(16).padStart(6, '0')}`;
        ctx.lineWidth = 3;
        ctx.strokeRect(4, 4, 248, 184);
        
        // Screen number
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(screen.number.toString(), 128, 80);
        
        // Screen name
        ctx.font = 'bold 18px monospace';
        ctx.fillText(screen.name, 128, 120);
        
        // Active indicator
        ctx.fillStyle = `#${screen.color.toString(16).padStart(6, '0')}`;
        ctx.beginPath();
        ctx.arc(128, 150, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      
      const textTexture = new THREE.CanvasTexture(canvas);
      textTexture.minFilter = THREE.LinearFilter;
      textTexture.magFilter = THREE.LinearFilter;
      
      const textMaterial = new THREE.MeshBasicMaterial({ 
        map: textTexture, 
        transparent: true,
        opacity: 0.9
      });
      
      const textGeometry = new THREE.PlaneGeometry(2.0, 1.4);
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.copy(screenMesh.position);
      textMesh.position.add(screenMesh.getWorldDirection(new THREE.Vector3()).multiplyScalar(0.05));
      textMesh.lookAt(0, 0, 0);
      textMesh.userData = { 
        sectionIndex: index, 
        isHexagonFace: true 
      };
      group.add(textMesh);
    });

    return group;
  };

  // Create spectacular atmospheric particle system (375+ particles)
  const createEnergyParticles = (scene: THREE.Scene) => {
    // Main Energy Blobs (60 enhanced blobs)
    createMainBlobs(scene);
    
    // Atmospheric Dust (100 particles)
    createAtmosphericDust(scene);
    
    // Distant Stars (200 twinkling stars)
    createDistantStars(scene);
    
    // Floating Orbs (15 diamond-like orbs)
    createFloatingOrbs(scene);
  };

  const createMainBlobs = (scene: THREE.Scene) => {
    const blobCount = 60;
    
    for (let i = 0; i < blobCount; i++) {
      const baseSize = 0.8 + Math.random() * 1.2;
      // High resolution for smooth fabric-like appearance
      const blobGeometry = new THREE.SphereGeometry(baseSize, 32, 24);
      
      // Apply organic deformation
      const vertices = blobGeometry.attributes.position.array;
      for (let j = 0; j < vertices.length; j += 3) {
        const x = vertices[j];
        const z = vertices[j + 2];
        
        const wobble = Math.sin(x * 8) * Math.cos(z * 8) * 0.08;
        vertices[j] += wobble;
        vertices[j + 1] += wobble * 0.6;
        vertices[j + 2] += wobble;
      }
      blobGeometry.attributes.position.needsUpdate = true;
      blobGeometry.computeVertexNormals();

      // Enhanced neon gradient
      const t = i / blobCount;
      let blobColor;
      if (t < 0.2) {
        blobColor = new THREE.Color().lerpColors(
          new THREE.Color(0x00ffff), 
          new THREE.Color(0x0099ff), 
          t * 5
        );
      } else if (t < 0.4) {
        blobColor = new THREE.Color().lerpColors(
          new THREE.Color(0x0099ff), 
          new THREE.Color(0x3366ff), 
          (t - 0.2) * 5
        );
      } else if (t < 0.6) {
        blobColor = new THREE.Color().lerpColors(
          new THREE.Color(0x3366ff), 
          new THREE.Color(0x6600ff), 
          (t - 0.4) * 5
        );
      } else if (t < 0.8) {
        blobColor = new THREE.Color().lerpColors(
          new THREE.Color(0x6600ff), 
          new THREE.Color(0xff0099), 
          (t - 0.6) * 5
        );
      } else {
        blobColor = new THREE.Color().lerpColors(
          new THREE.Color(0xff0099), 
          new THREE.Color(0xff6600), 
          (t - 0.8) * 5
        );
      }

      // Premium smooth fabric-like material
      const blobMaterial = new THREE.MeshPhysicalMaterial({
        color: blobColor,
        emissive: blobColor,
        emissiveIntensity: 0.3,
        transmission: 0.4,
        opacity: 0.9,
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        sheen: 1.0,
        sheenColor: 0xffffff,
        sheenRoughness: 0.1,
        ior: 1.4,
        iridescence: 0.5,
        iridescenceIOR: 1.3,
        transparent: true
      });

      const blob = new THREE.Mesh(blobGeometry, blobMaterial);

      // Enhanced 3D positioning
      const radius = 12 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      blob.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) + Math.random() * 8 - 4,
        radius * Math.sin(phi) * Math.sin(theta)
      );

      // Store animation data
      blob.userData = {
        basePosition: blob.position.clone(),
        speed: 0.3 + Math.random() * 0.7,
        orbitRadius: radius,
        phase: Math.random() * Math.PI * 2,
        wobblePhase: Math.random() * Math.PI * 2,
        isBlob: true
      };

      scene.add(blob);
    }
  };

  const createAtmosphericDust = (scene: THREE.Scene) => {
    const dustCount = 100;
    
    for (let i = 0; i < dustCount; i++) {
      const dustGeometry = new THREE.SphereGeometry(0.05 + Math.random() * 0.1, 6, 4);
      const dustMaterial = new THREE.MeshBasicMaterial({
        color: 0x66aaff,
        transparent: true,
        opacity: 0.2 + Math.random() * 0.3
      });
      
      const dust = new THREE.Mesh(dustGeometry, dustMaterial);
      
      const radius = 30 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      dust.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        (Math.random() - 0.5) * 40,
        radius * Math.sin(phi) * Math.sin(theta)
      );
      
      dust.userData = {
        baseY: dust.position.y,
        speed: 0.1 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        isDust: true
      };
      
      scene.add(dust);
    }
  };

  const createDistantStars = (scene: THREE.Scene) => {
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
      const starGeometry = new THREE.SphereGeometry(0.02 + Math.random() * 0.04, 6, 4);
      const starMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6 + Math.random() * 0.4
      });
      
      const star = new THREE.Mesh(starGeometry, starMaterial);
      
      const radius = 80 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      star.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        (Math.random() - 0.5) * 100,
        radius * Math.sin(phi) * Math.sin(theta)
      );
      
      star.userData = {
        twinkleSpeed: 1 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
        isStar: true
      };
      
      scene.add(star);
    }
  };

  const createFloatingOrbs = (scene: THREE.Scene) => {
    const orbCount = 15;
    
    for (let i = 0; i < orbCount; i++) {
      const orbGeometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.4, 12, 8);
      
      // Diamond-like material
      const orbMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.95,
        opacity: 0.1,
        roughness: 0.0,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        ior: 2.4,
        sheen: 1.0,
        sheenColor: 0x99ddff,
        transparent: true
      });
      
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      
      const radius = 20 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      orb.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        (Math.random() - 0.5) * 20,
        radius * Math.sin(phi) * Math.sin(theta)
      );
      
      orb.userData = {
        basePosition: orb.position.clone(),
        speed: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        isOrb: true
      };
      
      scene.add(orb);
    }
  };

  // Create spectacular particle ring around hexagon
  const createHexagonParticleRing = (scene: THREE.Scene) => {
    const particleCount = 60;
    const ringRadius = 12;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const x = Math.cos(angle) * ringRadius;
      const z = Math.sin(angle) * ringRadius;
      
      const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL((i / particleCount), 0.8, 0.6),
        transparent: true,
        opacity: 0.8
      });
      
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(x, Math.sin(angle * 3) * 2, z);
      
      particle.userData = {
        isRingParticle: true,
        angle: angle,
        baseRadius: ringRadius,
        originalY: particle.position.y,
        speed: 0.5 + Math.random() * 0.5
      };
      
      scene.add(particle);
    }
  };

  // Animation loop
  const animationLoop = () => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !hexagonGroupRef.current) return;

    const elapsedTime = clockRef.current.getElapsedTime();
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const hexagonGroup = hexagonGroupRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Monitor Setup Hexagon Rotation - Shows current screen/page transition
    if (!reducedMotion) {
      // Calculate target rotation based on current section (monitor switching)
      const targetRotationY = -(currentSection * (Math.PI / 3)); // 60 degrees per section
      
      // Smooth rotation to show current monitor/screen
      const currentRotY = hexagonGroup.rotation.y;
      const rotationDiff = targetRotationY - currentRotY;
      
      // Normalize rotation difference to shortest path
      let normalizedDiff = ((rotationDiff % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      
      // Smooth interpolation for monitor switching animation
      hexagonGroup.rotation.y += normalizedDiff * 0.08;
      
      // Subtle floating effect like floating monitor setup
      hexagonGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.3;
      
      // Glow intensity based on activity
      hexagonGroup.traverse((child) => {
        if (child.userData.isHexagonFace && child instanceof THREE.Mesh) {
          const isCurrentScreen = child.userData.sectionIndex === currentSection;
          const material = child.material as THREE.MeshPhysicalMaterial;
          
          if (isCurrentScreen) {
            // Active monitor screen - enhanced glow
            material.emissiveIntensity = 0.25 + Math.sin(elapsedTime * 3) * 0.1;
            material.clearcoat = 1.0;
          } else {
            // Inactive monitor screens - subtle presence
            material.emissiveIntensity = child.userData.originalEmissiveIntensity || 0.08;
            material.clearcoat = 0.7;
          }
        }
      });
    }

    // Optimized particle animations
    scene.traverse((child) => {
      // Main blob animation - optimized
      if (child.userData.isBlob && child instanceof THREE.Mesh && !reducedMotion) {
        const blobData = child.userData;
        
        const orbitSpeed = blobData.speed * 0.2;
        const orbitX = Math.cos(elapsedTime * orbitSpeed + blobData.phase) * blobData.orbitRadius;
        const orbitZ = Math.sin(elapsedTime * orbitSpeed + blobData.phase) * blobData.orbitRadius;
        const verticalFloat = Math.sin(elapsedTime * 0.4 + blobData.wobblePhase) * 2;
        
        child.position.set(orbitX, blobData.basePosition.y + verticalFloat, orbitZ);
      }

      // Atmospheric dust animation
      if (child.userData.isDust && child instanceof THREE.Mesh && !reducedMotion) {
        const dustData = child.userData;
        const verticalDrift = Math.sin(elapsedTime * 0.05 + dustData.phase) * 1;
        child.position.y = dustData.baseY + verticalDrift;
        
        if (child.material instanceof THREE.MeshBasicMaterial) {
          const opacity = 0.2 + Math.sin(elapsedTime * 0.8 + dustData.phase) * 0.2;
          child.material.opacity = opacity;
        }
      }

      // Star twinkling
      if (child.userData.isStar && child instanceof THREE.Mesh && !reducedMotion) {
        const starData = child.userData;
        if (child.material instanceof THREE.MeshBasicMaterial) {
          const twinkle = Math.sin(elapsedTime * starData.twinkleSpeed + starData.phase) * 0.4 + 0.6;
          child.material.opacity = twinkle;
        }
      }

      // Floating orbs animation
      if (child.userData.isOrb && child instanceof THREE.Mesh && !reducedMotion) {
        const orbData = child.userData;
        const floatY = Math.sin(elapsedTime * orbData.speed + orbData.phase) * 2;
        child.position.y = orbData.basePosition.y + floatY;
        child.rotation.x += 0.01;
        child.rotation.y += 0.005;
      }
    });

    renderer.render(scene, camera);
  };

  // Initialize scene
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000422, 50, 200);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 20);
    cameraRef.current = camera;

    // Create renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Enhanced post-processing
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create hexagon group
    const hexagonGroup = new THREE.Group();
    scene.add(hexagonGroup);
    hexagonGroupRef.current = hexagonGroup;

    // Setup lighting and space background
    setupLighting(scene);
    
    // Create hexagon
    createAppleGradeHexagon(hexagonGroup);

    // Create spectacular particle ring
    createHexagonParticleRing(scene);

    // Create particle system
    createEnergyParticles(scene);

    // Create hexagon particle ring
    createHexagonParticleRing(scene);

    // Remove orbit controls - hexagon should be clickable, not draggable
    // Camera auto-positioning for optimal hexagon viewing
    camera.position.set(0, 2, 12);
    camera.lookAt(0, 0, 0);

    // Start spectacular animation
    const animate = () => {
      animationLoop();
      
      // Dramatic auto-rotate camera around the hexagon
      const time = Date.now() * 0.0008;
      camera.position.x = Math.sin(time) * 18;
      camera.position.z = Math.cos(time) * 18;
      camera.position.y = 3 + Math.sin(time * 0.5) * 2; // Vertical movement
      camera.lookAt(0, 0, 0);
      
      // Auto-rotate hexagon for spectacular effect
      if (hexagonGroup) {
        hexagonGroup.rotation.y += 0.008;
        hexagonGroup.rotation.x = Math.sin(time) * 0.1;
        
        // Pulsing scale effect
        const pulseScale = 1 + Math.sin(time * 2) * 0.05;
        hexagonGroup.scale.setScalar(pulseScale);
        
        // Update hexagon face highlighting and pulsing
        hexagonGroup.traverse((child) => {
          if (child.userData.isHexagonFace && child instanceof THREE.Mesh) {
            const isActive = child.userData.sectionIndex === currentSection;
            const material = child.material as THREE.MeshPhysicalMaterial;
            
            if (isActive) {
              // Dramatic pulsing for active section
              material.emissiveIntensity = 0.5 + Math.sin(time * 4) * 0.3;
              material.clearcoat = 1.0;
              const activePulse = 1 + Math.sin(time * 3) * 0.1;
              child.scale.setScalar(activePulse);
            } else {
              material.emissiveIntensity = 0.2 + Math.sin(time * 2 + child.userData.sectionIndex) * 0.1;
              material.clearcoat = 0.7;
              child.scale.setScalar(1);
            }
          }
        });
      }
      
      requestAnimationFrame(animate);
    };
    animate();

    // Raycaster for hexagon navigation
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      if (!camera || !scene) return;
      
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      
      // Check for hexagon face intersections
      const hexagonMeshes = scene.children.filter(child => 
        child.userData.isHexagonFace === true
      );
      
      if (hexagonGroup) {
        hexagonGroup.traverse((child) => {
          if (child.userData.isHexagonFace) {
            hexagonMeshes.push(child);
          }
        });
      }
      
      const intersects = raycaster.intersectObjects(hexagonMeshes);
      
      if (intersects.length > 0) {
        const clickedFace = intersects[0].object;
        const sectionIndex = clickedFace.userData.sectionIndex;
        
        if (typeof sectionIndex === 'number' && onSectionChange) {
          // Visual feedback
          const originalScale = clickedFace.scale.clone();
          clickedFace.scale.multiplyScalar(1.15);
          
          setTimeout(() => {
            clickedFace.scale.copy(originalScale);
          }, 250);
          
          // Navigate to section
          onSectionChange(sectionIndex);
          
          // Scroll to section
          const element = document.getElementById(`section-${sectionIndex}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    container.addEventListener('click', handleClick);

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer || !container) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleClick);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSectionChange]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
