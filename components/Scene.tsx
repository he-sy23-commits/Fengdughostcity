import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import DigitalMountain from './DigitalMountain';
import { SectionId } from '../types';

// Fix for missing R3F types
const Color = 'color' as any;
const Fog = 'fog' as any;

interface SceneProps {
  activeSection: SectionId;
  isDispersed: boolean;
  rotationTarget: number | null;
  onSpotClick: (name: string) => void;
}

const Scene: React.FC<SceneProps> = ({ activeSection, isDispersed, rotationTarget, onSpotClick }) => {
  return (
    <Canvas
      camera={{ position: [20, 10, 40], fov: 30 }}
      dpr={[1, 2]} // Restore higher DPR for sharper look
    >
      <Color attach="background" args={['#020408']} />
      
      <Fog attach="fog" args={['#020408', 20, 100]} />

      <Suspense fallback={null}>
        <DigitalMountain 
            activeSection={activeSection} 
            isDispersed={isDispersed}
            rotationTarget={rotationTarget}
            onSpotClick={onSpotClick}
        />
        
        <Stars 
          radius={150} 
          depth={80} 
          count={3000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.1} 
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