import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface GlobeProps {
  selectedRegion: string;
  metrics: {
    temperature: string;
    precipitation: string;
    seaLevel: string;
    extremeEvents: string;
  };
}

const Globe = ({ selectedRegion, metrics }: GlobeProps) => {
  const globeRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhongMaterial>(null);
  
  useEffect(() => {
    if (!materialRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Create gradient based on temperature and sea level
    const temp = parseFloat(metrics.temperature);
    const seaLevel = parseFloat(metrics.seaLevel);
    
    // Temperature color scale
    const getTemperatureColor = (t: number) => {
      if (t > 2) return '#ef4444'; // Red for high temp
      if (t > 1) return '#f97316'; // Orange for medium temp
      return '#22c55e'; // Green for low temp
    };

    // Create base gradient
    const tempColor = getTemperatureColor(temp);
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, tempColor);
    gradient.addColorStop(1, '#3b82f6'); // Blue for water

    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add region highlight
    if (selectedRegion !== 'Global') {
      const regions: Record<string, [number, number, number, number]> = {
        'North America': [200, 50, 300, 150],
        'Europe': [450, 50, 150, 100],
        'Asia': [600, 50, 250, 200],
        'Africa': [450, 150, 150, 200],
        'South America': [300, 200, 150, 200],
        'Oceania': [700, 250, 200, 150]
      };

      const region = regions[selectedRegion];
      if (region) {
        ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;
        ctx.fillRect(...region);
      }
    }

    // Add climate impact visualization
    const precipChange = parseFloat(metrics.precipitation);
    const extremeEvents = parseFloat(metrics.extremeEvents);

    // Add precipitation patterns
    for (let i = 0; i < precipChange * 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + (precipChange / 20)})`;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add extreme event indicators
    for (let i = 0; i < extremeEvents / 2; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillStyle = 'rgba(255, 200, 0, 0.3)';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 5, y + 10);
      ctx.lineTo(x - 5, y + 10);
      ctx.closePath();
      ctx.fill();
    }

    // Update texture
    const texture = new THREE.CanvasTexture(canvas);
    materialRef.current.map = texture;
    materialRef.current.needsUpdate = true;
  }, [selectedRegion, metrics]);

  // Rotate the globe
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshPhongMaterial
        ref={materialRef}
        specular={new THREE.Color(0x333333)}
        shininess={5}
      />
    </mesh>
  );
};

const ClimateGlobe = ({ selectedRegion, metrics }: GlobeProps) => {
  return (
    <div className="w-full h-[600px] bg-background rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Globe selectedRegion={selectedRegion} metrics={metrics} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={8}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ClimateGlobe;