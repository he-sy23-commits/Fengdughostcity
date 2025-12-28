import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import DigitalMountain from './DigitalMountain';
import { SectionId } from '../types';

interface SceneProps {
  activeSection: SectionId;
  isDispersed: boolean;
  rotationTarget: number | null;
  onSpotClick: (name: string) => void;
}

const Scene: React.FC<SceneProps> = ({ activeSection, isDispersed, rotationTarget, onSpotClick }) => {
  return (
    <Canvas
      camera={{ position: [20, 10, 40], fov: 30 }} // Adjusted for a slightly more direct, cinematic view
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#020408']} />
      
      {/* Fog matched to background - Deep Dark Blue/Black */}
      <fog attach="fog" args={['#020408', 20, 90]} />

      <Suspense fallback={null}>
        <DigitalMountain 
            activeSection={activeSection} 
            isDispersed={isDispersed}
            rotationTarget={rotationTarget}
            onSpotClick={onSpotClick}
        />
        
        {/* Layer 1: Distant background stars */}
        <Stars 
          radius={150} 
          depth={80} 
          count={3000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.1} 
        />
        
        {/* Layer 2: Closer, brighter stars for depth */}
        <Stars 
          radius={80} 
          depth={20} 
          count={1000} 
          factor={2} 
          saturation={0.5} 
          fade 
          speed={0.2} 
        />
      </Suspense>

      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2 - 0.05}
        autoRotate={false} 
        rotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default Scene;