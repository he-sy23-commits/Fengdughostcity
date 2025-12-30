import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SectionId } from '../types';

// Fix for missing R3F types
const Group = 'group' as any;
const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const ShaderMaterial = 'shaderMaterial' as any;

interface DigitalMountainProps {
  activeSection: SectionId;
  isDispersed: boolean;
  rotationTarget: number | null;
  onSpotClick: (name: string) => void;
}

export const SPOTS = [
  { name: '名山牌坊', x: 14, z: 18, y: 1.5 },
  { name: '哼哈祠', x: 11, z: 14, y: 2.0 },
  { name: '报恩殿', x: 13, z: 9, y: 2.8 },
  { name: '奈何桥', x: 9, z: 4, y: 4.5 },
  { name: '鬼门关', x: 5, z: 3, y: 5.8 },
  { name: '黄泉路', x: 0, z: 4, y: 5.5 },
  { name: '望乡台', x: -5, z: 2, y: 6.0 },
  { name: '天子殿', x: 0, z: 0, y: 7.8 }, // Peak
  { name: '王母殿', x: 4, z: -4, y: 5.5 },
  { name: '二仙楼', x: 9, z: -9, y: 2.5 },
  { name: '双桂山', x: -22, z: 5, y: 1.0 }, // Side mountain
];

const vertexShader = `
  uniform float uTime;
  uniform float uScale;
  uniform float uDisperse; 
  
  attribute float aScale;
  attribute float aRandom;
  
  varying float vElevation;
  varying float vRandom;
  varying float vDistance; 
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // EXTREMELY SLOW, DREAM-LIKE MOVEMENT
    // Slowed down from 0.08 to 0.02
    float time = uTime * 0.02; 
    float randomPhase = aRandom * 6.28;
    
    // 1. Subtle Horizontal Drift 
    float xOffset = cos(time + modelPosition.y * 0.2 + randomPhase) * 0.1;
    float zOffset = sin(time + modelPosition.x * 0.2 + randomPhase) * 0.1;
    
    modelPosition.x += xOffset;
    modelPosition.z += zOffset;
    
    // 2. Slow Vertical Breathing
    float breathe = sin(time * 0.5 + modelPosition.z * 0.1 + randomPhase) * 0.2;
    modelPosition.y += breathe;

    // --- DISPERSION LOGIC ---
    float explode = uDisperse * 35.0; // Increased range for grander effect
    
    if (uDisperse > 0.01) {
        vec3 noiseVec = vec3(
            cos(aRandom * 10.0 + uTime * 0.1) * 2.0, // Slowed down internal noise
            sin(aRandom * 15.0) * 5.0 + 2.0, 
            sin(aRandom * 20.0 + uTime * 0.1) * 2.0
        );
        
        modelPosition.xyz += noiseVec * explode * aRandom;
        
        // Spiral motion during dispersion
        float angle = uDisperse * 3.14 * 0.5; // Slight twist
        float s = sin(angle);
        float c = cos(angle);
        float x = modelPosition.x;
        float z = modelPosition.z;
        modelPosition.x = x * c - z * s;
        modelPosition.z = x * s + z * c;
    }
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectionPosition;
    
    gl_PointSize = uScale * aScale * (100.0 / -viewPosition.z);
    
    vElevation = modelPosition.y; 
    vRandom = aRandom;
    vDistance = length(modelPosition.xz);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorBottom;
  uniform vec3 uColorTop;
  
  varying float vElevation;
  varying float vRandom;
  varying float vDistance;
  
  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);
    
    float normalizedHeight = (vElevation + 2.0) / 8.0; 
    normalizedHeight = clamp(normalizedHeight, 0.0, 1.0);
    
    float mixStr = smoothstep(0.1, 0.9, normalizedHeight);
    
    vec3 color = mix(uColorBottom, uColorTop, mixStr);
    
    // Slow twinkle
    float flicker = sin(uTime * 0.1 + vRandom * 50.0);
    float light = smoothstep(-1.0, 1.0, flicker) * 0.5 + 0.5;
    
    float sparkle = step(0.985, sin(uTime * 0.15 + vRandom * 80.0));
    light += sparkle * 1.5; 
    
    float edgeFade = 1.0 - smoothstep(12.0, 30.0, vDistance);
    
    float alpha = strength * light * edgeFade;
    
    vec3 finalColor = color + vec3(sparkle * 0.8);

    gl_FragColor = vec4(finalColor, alpha);
    
    if (gl_FragColor.a < 0.01) discard;
  }
`;

const DigitalMountain: React.FC<DigitalMountainProps> = ({ activeSection, isDispersed, rotationTarget, onSpotClick }) => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const particles = useMemo(() => {
    const count = 30000;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randoms = new Float32Array(count);
    
    const width = 65; 
    const depth = 65;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const x = (Math.random() - 0.5) * width;
      const z = (Math.random() - 0.5) * depth;
      const r = Math.sqrt(x * x + z * z);
      
      let y = 7.5 * Math.exp(- (r * r) / 50); 
      y += Math.sin(x * 0.4) * Math.cos(z * 0.4) * 1.2;
      y += Math.sin(x * 0.9 + 2) * Math.cos(z * 1.1 + 1) * 0.6;
      y += Math.cos(x * 2.2) * Math.sin(z * 2.5) * 0.3;
      y += (Math.random() - 0.5) * 0.2;

      if (r > 25) y *= 0.6; 
      if (y < -3) y = -3;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      scales[i] = Math.random() * 0.6 + 0.1; 
      randoms[i] = Math.random();
    }
    
    return { positions, scales, randoms };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScale: { value: 5.5 }, 
    uDisperse: { value: 0 },
    uColorBottom: { value: new THREE.Color('#0F172A') }, 
    uColorTop: { value: new THREE.Color('#F8FAFC') }, 
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      const targetDisperse = isDispersed ? 1.0 : 0.0;
      // VERY SLOW LERP for dreamy transition
      materialRef.current.uniforms.uDisperse.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uDisperse.value,
        targetDisperse,
        0.005 // Reduced from 0.01 to 0.005 for super slow motion
      );
    }

    if (meshRef.current) {
      if (rotationTarget !== null) {
        // Smooth manual control
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          rotationTarget,
          0.02 
        );
      } else {
        // Very slow auto rotate
        meshRef.current.rotation.y += 0.0005; 
      }
    }
  });

  return (
    <Group>
      <Group ref={meshRef}>
        <Points>
          <BufferGeometry>
            <BufferAttribute
              attach="attributes-position"
              count={particles.positions.length / 3}
              array={particles.positions}
              itemSize={3}
            />
            <BufferAttribute
              attach="attributes-aScale"
              count={particles.scales.length}
              array={particles.scales}
              itemSize={1}
            />
            <BufferAttribute
              attach="attributes-aRandom"
              count={particles.randoms.length}
              array={particles.randoms}
              itemSize={1}
            />
          </BufferGeometry>
          <ShaderMaterial
            ref={materialRef}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            vertexColors={false}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            transparent={true}
          />
        </Points>
      </Group>

      {!isDispersed && SPOTS.map((spot, index) => (
        <Html
          key={index}
          position={[spot.x, spot.y + 0.8, spot.z]}
          center
          distanceFactor={15}
          style={{ pointerEvents: 'none' }} 
        >
          <div 
            onClick={(e) => {
                e.stopPropagation(); 
                onSpotClick(spot.name);
            }}
            className="flex flex-col items-center group cursor-pointer pointer-events-auto"
           >
            <div className="
                relative px-5 py-2
                bg-gradient-to-br from-stone-900/90 via-stone-800/90 to-stone-900/90
                backdrop-blur-md 
                border border-white/20 
                rounded-full 
                shadow-[0_8px_20px_rgba(0,0,0,0.6)]
                transition-all duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275) origin-bottom
                group-hover:scale-125 
                group-hover:bg-stone-800 
                group-hover:border-white/60 
                group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] 
                group-hover:-translate-y-3
                active:scale-95 active:bg-stone-950
            ">
              <span className="text-sm text-stone-100 font-serif-cn tracking-[0.15em] whitespace-nowrap drop-shadow-lg">
                {spot.name}
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="w-[1px] h-6 bg-gradient-to-b from-white/30 to-transparent mt-[-1px] transition-all duration-300 group-hover:h-12 group-hover:bg-white/50 group-hover:w-[1.5px]"></div>
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300 group-hover:bg-white group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.9)]"></div>
          </div>
        </Html>
      ))}
    </Group>
  );
};

export default DigitalMountain;