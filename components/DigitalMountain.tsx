import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SectionId } from '../types';

interface DigitalMountainProps {
  activeSection: SectionId;
  isDispersed: boolean;
  rotationTarget: number | null;
  onSpotClick: (name: string) => void;
}

// Landmark Data with approximate coordinates based on the terrain formula
const SPOTS = [
  { name: '九蟒殿', x: 0, z: 22, y: 0.5 },
  { name: '名山牌坊', x: 6, z: 19, y: 1.2 },
  { name: '哼哈祠', x: 11, z: 14, y: 2.0 },
  { name: '报恩殿', x: 13, z: 9, y: 2.8 },
  { name: '奈何桥', x: 9, z: 4, y: 4.5 },
  { name: '鬼门关', x: 5, z: 3, y: 5.8 },
  { name: '黄泉路', x: 0, z: 4, y: 5.5 },
  { name: '望乡台', x: -5, z: 2, y: 6.0 },
  { name: '天子殿', x: 0, z: 0, y: 7.8 }, // Peak
  { name: '玉皇殿', x: 4, z: -4, y: 5.5 },
  { name: '二仙楼', x: 9, z: -9, y: 2.5 },
  { name: '双桂山', x: -22, z: 5, y: 1.0 }, // Side mountain
];

// Custom Shader for the particles
const vertexShader = `
  uniform float uTime;
  uniform float uScale;
  uniform float uDisperse; // New uniform for dispersion amount (0.0 to 1.0)
  
  attribute float aScale;
  attribute float aRandom;
  
  varying float vElevation;
  varying float vRandom;
  varying float vDistance; 
  
  // Pseudo-random function
  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // VERY SLOW, ETHEREAL MOVEMENT
    float time = uTime * 0.08; 
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
    // When uDisperse increases, particles fly outward and upward
    float explode = uDisperse * 25.0; // Explosion radius
    
    if (uDisperse > 0.01) {
        // Create a chaotic vector based on randomness and position
        vec3 noiseVec = vec3(
            cos(aRandom * 10.0 + uTime) * 2.0, 
            sin(aRandom * 15.0) * 5.0 + 2.0, // Bias upwards
            sin(aRandom * 20.0 + uTime) * 2.0
        );
        
        // Mix between original position and exploded position
        modelPosition.xyz += noiseVec * explode * aRandom;
        
        // Add some spiral motion during dispersion
        float angle = uDisperse * 3.14;
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
    
    // Size attenuation
    gl_PointSize = uScale * aScale * (100.0 / -viewPosition.z);
    
    // Pass varyings to fragment
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
    // Soft circle shape
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);
    
    // GRADIENT MAPPING
    // Adjusted denominator for lower mountain height
    float normalizedHeight = (vElevation + 2.0) / 8.0; 
    normalizedHeight = clamp(normalizedHeight, 0.0, 1.0);
    
    float mixStr = smoothstep(0.1, 0.9, normalizedHeight);
    
    vec3 color = mix(uColorBottom, uColorTop, mixStr);
    
    // TWINKLE EFFECT (EXTREMELY SLOW)
    float flicker = sin(uTime * 0.2 + vRandom * 50.0);
    float light = smoothstep(-1.0, 1.0, flicker) * 0.5 + 0.5;
    
    // Occasional bright sparkle (Very slow)
    float sparkle = step(0.985, sin(uTime * 0.3 + vRandom * 80.0));
    light += sparkle * 1.5; 
    
    // EDGE FADING
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
  
  // Create geometry data
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
      
      // RUGGED LANDSCAPE GENERATION - LOWER HEIGHT
      
      // 1. Main Peak (Lowered multiplier from 13.0 to 7.5)
      let y = 7.5 * Math.exp(- (r * r) / 50); 
      
      // 2. Large Undulations
      y += Math.sin(x * 0.4) * Math.cos(z * 0.4) * 1.2;
      
      // 3. Medium Detail
      y += Math.sin(x * 0.9 + 2) * Math.cos(z * 1.1 + 1) * 0.6;
      
      // 4. High Frequency Noise
      y += Math.cos(x * 2.2) * Math.sin(z * 2.5) * 0.3;
      
      y += (Math.random() - 0.5) * 0.2;

      // Flatten outskirts
      if (r > 25) {
        y *= 0.6; 
      }
      
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
    // Update Material Uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // LERP DISPERSION
      const targetDisperse = isDispersed ? 1.0 : 0.0;
      materialRef.current.uniforms.uDisperse.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uDisperse.value,
        targetDisperse,
        0.05
      );
    }

    // Update Rotation (Mesh Only)
    if (meshRef.current) {
      if (rotationTarget !== null) {
        // Manual control
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          rotationTarget,
          0.1
        );
      } else {
        // Auto rotate
        meshRef.current.rotation.y += 0.001; 
      }
    }
  });

  return (
    <group>
      {/* Rotating Group for the Particles */}
      <group ref={meshRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.positions.length / 3}
              array={particles.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-aScale"
              count={particles.scales.length}
              array={particles.scales}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-aRandom"
              count={particles.randoms.length}
              array={particles.randoms}
              itemSize={1}
            />
          </bufferGeometry>
          <shaderMaterial
            ref={materialRef}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            vertexColors={false}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            transparent={true}
          />
        </points>
      </group>

      {/* Render Labels - OUTSIDE the rotating group so they stay fixed in World Space */}
      {!isDispersed && SPOTS.map((spot, index) => (
        <Html
          key={index}
          position={[spot.x, spot.y + 0.8, spot.z]}
          center
          distanceFactor={15}
          style={{ pointerEvents: 'none' }} // Ensure the HTML overlay doesn't block scene interaction
        >
          <div 
            onClick={(e) => {
                e.stopPropagation(); // Prevent passing click to scene controls
                onSpotClick(spot.name);
            }}
            className="flex flex-col items-center group cursor-pointer pointer-events-auto"
           >
            {/* The Bubble Label */}
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
              
              {/* Inner highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Connecting Line */}
            <div className="w-[1px] h-6 bg-gradient-to-b from-white/30 to-transparent mt-[-1px] transition-all duration-300 group-hover:h-12 group-hover:bg-white/50 group-hover:w-[1.5px]"></div>
            
            {/* Anchor Dot */}
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300 group-hover:bg-white group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.9)]"></div>
          </div>
        </Html>
      ))}
    </group>
  );
};

export default DigitalMountain;