'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Marble } from '@/data/marbles';

interface Marble3DProps {
  marble: Marble;
  autoRotate?: boolean;
}

function Marble3D({ marble, autoRotate = true }: Marble3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Create material based on marble properties
  const getMarbleMaterial = () => {
    const baseColor = getColorFromName(marble.color);
    
    switch (marble.category.toLowerCase()) {
      case 'swirl':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          metalness: 0.1,
          roughness: 0.2,
          transparent: true,
          opacity: 0.9,
        });
      
      case 'metallic':
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          metalness: 0.8,
          roughness: 0.1,
          envMapIntensity: 1.5,
        });
      
      case 'crystal':
      case 'clear':
        return new THREE.MeshPhysicalMaterial({
          color: baseColor,
          metalness: 0.0,
          roughness: 0.0,
          transmission: 0.9,
          thickness: 0.5,
          clearcoat: 1.0,
          clearcoatRoughness: 0.0,
        });
      
      default:
        return new THREE.MeshStandardMaterial({
          color: baseColor,
          metalness: 0.3,
          roughness: 0.4,
        });
    }
  };

  const getColorFromName = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'deep purple': '#4a148c',
      'electric blue': '#0277bd',
      'gold & orange': '#ff8f00',
      'neon green': '#00e676',
      'multi-color': '#ff6b6b',
      'deep black': '#212121',
      'clear': '#ffffff',
      'rose gold': '#e91e63',
      'blue & white': '#2196f3',
      'red & orange': '#ff5722',
      'silver': '#9e9e9e',
      'green & purple': '#4caf50',
    };
    
    return colorMap[colorName.toLowerCase()] || '#666666';
  };

  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += hovered ? 0.01 : 0.002;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1, 64, 64]}
      material={getMarbleMaterial()}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    />
  );
}

interface Marble3DPreviewProps {
  marble: Marble;
  className?: string;
  autoRotate?: boolean;
  controls?: boolean;
}

export default function Marble3DPreview({ 
  marble, 
  className = '', 
  autoRotate = true,
  controls = true 
}: Marble3DPreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg ${className}`}>
        <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        className="rounded-lg"
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00ffff" />
        <pointLight position={[10, -10, -5]} intensity={0.5} color="#ff00ff" />
        
        {/* Environment */}
        <Environment preset="studio" />
        
        {/* Marble */}
        <Marble3D marble={marble} autoRotate={autoRotate} />
        
        {/* Controls */}
        {controls && (
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        )}
      </Canvas>
      
      {/* Overlay Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="glass-dark rounded-lg p-3 backdrop-blur-sm">
          <div className="text-white text-sm font-medium">{marble.name}</div>
          <div className="text-white/60 text-xs">{marble.category} • {marble.size}</div>
        </div>
      </div>
    </div>
  );
}
