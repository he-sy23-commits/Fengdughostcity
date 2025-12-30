import React, { Suspense, useMemo, useState, useRef, useEffect } from 'react';
import { X, Loader2, Cuboid, Image as ImageIcon, BookOpen, Scroll, Award, Feather, Eye, ScanEye, Umbrella, Type, PenTool, Utensils, Waves, Shield, Zap, Wind, Mountain, Wine, Grape, ExternalLink, Map as MapIcon, LocateFixed, PlayCircle, CloudFog, Droplets } from 'lucide-react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stage, Center, Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import { SECTIONS, CardItem, SectionId } from '../types';
import { SPOTS } from './DigitalMountain';

// Fix for missing R3F types
const Primitive = 'primitive' as any;
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;

interface VideoOverlayProps {
  spotName: string;
  onClose: () => void;
}

// Icon Mapping for Symbols
const SYMBOL_ICONS: Record<string, React.ReactNode> = {
  'bird': <Feather className="w-5 h-5" />,
  'eye': <ScanEye className="w-5 h-5" />,
  'hat': <Type className="w-5 h-5" />,
  'umbrella': <Umbrella className="w-5 h-5" />,
  'book': <BookOpen className="w-5 h-5" />,
  'pen': <PenTool className="w-5 h-5" />,
  'cup': <Utensils className="w-5 h-5" />,
  'bridge': <Waves className="w-5 h-5" />,
  'axe': <Shield className="w-5 h-5" />, // Use Shield as generic defense/weapon icon
  'chain': <Cuboid className="w-5 h-5" />, // Abstract for chain
  'wind': <Wind className="w-5 h-5" />,
  'zap': <Zap className="w-5 h-5" />,
  'gourd': <Scroll className="w-5 h-5" />, // Scroll for Taoist knowledge
  'wine': <Wine className="w-5 h-5" />,
  'fruit': <Grape className="w-5 h-5" />,
  'mountain': <Mountain className="w-5 h-5" />
};

// Video Source Configuration
const VIDEO_PLACEHOLDER = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

const VIDEO_SOURCES: Record<string, string> = {
  'default': 'BV16s4y1z7nu',
  '天子殿': 'BV16s4y1z7nu', // Remains Bilibili/Default for now as it's primarily 3D model view
  // Map spots - Unified placeholder
  '名山牌坊': VIDEO_PLACEHOLDER,
  '哼哈祠': VIDEO_PLACEHOLDER,
  '报恩殿': VIDEO_PLACEHOLDER,
  '奈何桥': VIDEO_PLACEHOLDER,
  '鬼门关': VIDEO_PLACEHOLDER,
  '黄泉路': VIDEO_PLACEHOLDER,
  '望乡台': VIDEO_PLACEHOLDER,
  '王母殿': VIDEO_PLACEHOLDER,
  '二仙楼': VIDEO_PLACEHOLDER,
  '双桂山': VIDEO_PLACEHOLDER
};

// Image Source Configuration
const IMAGE_SOURCES: Record<string, string> = {
  // Figures
  '药王': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D7299479165198763019%26skey%3D%40crypt_c64eccd3_22ca122c60c2ebb47ab22a5864fa691e%26mmweb_appid%3Dwx_webfilehelper.jpeg',
  '黑白无常': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/ghost.jpg',
  '崔判官': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D3444650223526484849%26skey%3D%40crypt_c64eccd3_22ca122c60c2ebb47ab22a5864fa691e%26mmweb_appid%3Dwx_webfilehelper.jpeg',
  '孟婆': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/mengpo.jpg',
  '牛头马面': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/2.jpg',
  '哼哈二将': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/3.jpg',
  '二仙': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/5.jpg',
  '麻姑': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/4.jpg',
  
  // Map Spots
  '名山牌坊': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/6.jpg',
  '哼哈祠': 'https://images.unsplash.com/photo-1590499092429-1a4d46700465?q=80&w=600&auto=format&fit=crop',
  '报恩殿': 'https://images.unsplash.com/photo-1600609842388-2950942526dc?q=80&w=600&auto=format&fit=crop',
  '奈何桥': 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=600&auto=format&fit=crop',
  '鬼门关': 'https://images.unsplash.com/photo-1598000534273-0498a442e39e?q=80&w=600&auto=format&fit=crop',
  '黄泉路': 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=600&auto=format&fit=crop',
  '望乡台': 'https://images.unsplash.com/photo-1506259091721-347f798196d4?q=80&w=600&auto=format&fit=crop',
  '天子殿': 'https://images.unsplash.com/photo-1542645976-15582b13fae3?q=80&w=600&auto=format&fit=crop',
  '王母殿': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__%26MsgID%3D4065588999941971063%26skey%3D%40crypt_c64eccd3_3eb71958fa2405b84acb24bf4c76e589%26mmweb_appid%3Dwx_webfilehelper.jpeg',
  '二仙楼': 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=600&auto=format&fit=crop',
  '双桂山': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/000.jpg',

  // Gallery
  '幽都秋色': 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/youdushiying.jpeg'
};

// 3D Model Configuration
const MODEL_URL = 'https://raw.githubusercontent.com/he-sy23-commits/Project/main/1.obj';

// ============================================================================
// SHADERS & COMPONENTS FOR IMAGE DEFORMATION EFFECT
// ============================================================================

const deformationVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const deformationFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Smooth wave distortion based on hover
    float waveStrength = 0.02 * uHover;
    float waveSpeed = 2.0;
    
    // Subtle sine wave displacement
    uv.x += sin(uv.y * 10.0 + uTime * waveSpeed) * waveStrength;
    uv.y += cos(uv.x * 10.0 + uTime * waveSpeed) * waveStrength;
    
    vec4 color = texture2D(uTexture, uv);
    
    // Slight chromatic aberration on hover
    float shift = 0.005 * uHover;
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
    
    // Discard transparent pixels
    if (color.a < 0.1) discard;

    gl_FragColor = vec4(r, color.g, b, color.a);
  }
`;

const DistortedImage = ({ url }: { url: string }) => {
    const texture = useLoader(THREE.TextureLoader, url);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const hoverTarget = useRef(0);
    
    // Determine layout dimensions
    const aspect = texture.image.width / texture.image.height;
    const height = 9; // Base height in world units
    const width = height * aspect;

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uTime: { value: 0 },
        uHover: { value: 0 }
    }), [texture]);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            // Smoothly interpolate hover state
            materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uHover.value,
                hoverTarget.current,
                0.05
            );
        }
    });
    
    return (
        <Center>
            <mesh 
                onPointerOver={() => (hoverTarget.current = 1)}
                onPointerOut={() => (hoverTarget.current = 0)}
            >
                <planeGeometry args={[width, height, 32, 32]} />
                <shaderMaterial 
                    ref={materialRef}
                    vertexShader={deformationVertexShader}
                    fragmentShader={deformationFragmentShader}
                    uniforms={uniforms}
                    transparent={true}
                    depthWrite={false}
                />
            </mesh>
        </Center>
    )
};

// Sub-component to load and render the OBJ model
const ModelContent = () => {
  const obj = useLoader(OBJLoader, MODEL_URL);
  
  const scene = useMemo(() => {
    const clone = obj.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
         const mesh = child as THREE.Mesh;
         mesh.material = new THREE.MeshStandardMaterial({
             color: '#d4d4d8', 
             roughness: 0.6,
             metalness: 0.1,
             side: THREE.DoubleSide 
         });
         mesh.castShadow = true;
         mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [obj]);

  return (
    <Center>
      <Primitive object={scene} /> 
    </Center>
  );
};

const VideoOverlay: React.FC<VideoOverlayProps> = ({ spotName, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isPlayingGif, setIsPlayingGif] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const isModelView = spotName === '天子殿';
  const isMengPo = spotName === '孟婆';
  const isMagu = spotName === '麻姑';
  
  // Find the full item data
  const { itemData, sectionType } = useMemo(() => {
    for (const key of Object.keys(SECTIONS) as SectionId[]) {
        const found = SECTIONS[key].items.find(i => i.title === spotName);
        if (found) return { itemData: found, sectionType: key };
    }
    return { itemData: null, sectionType: null };
  }, [spotName]);

  const imageSource = IMAGE_SOURCES[spotName] || itemData?.image;

  const hasDetails = !!itemData?.details;
  const isArchitecture = sectionType === 'architecture';
  const isFigure = sectionType === 'figures';
  const isGallery = sectionType === 'gallery';
  const isOrigins = sectionType === 'origins';

  let bioLabel = '生平事迹';
  let influenceLabel = '后世影响';

  if (isArchitecture) {
      bioLabel = '景点介绍';
      influenceLabel = '文化价值';
  } else if (isGallery) {
      bioLabel = '作品简介';
      influenceLabel = '艺术鉴赏';
  } else if (isOrigins) {
      bioLabel = '详细溯源';
      influenceLabel = '历史意义';
  }
  
  // Determine video source only if not a model and not an image
  const videoSource = VIDEO_SOURCES[spotName] || VIDEO_SOURCES['default'];
  const isBilibili = !videoSource.startsWith('http');
  const hasNativeVideo = videoSource.endsWith('.mp4');

  // Handle Play/Pause Logic
  const handlePlayVideo = () => {
      if (hasNativeVideo) {
        setIsPlayingVideo(true);
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        console.error("Video play failed:", e);
                    });
                }
            }
        }, 50);
      } else if (isMengPo || isMagu) {
        setIsPlayingGif(true);
      } else {
        setIsZoomed(!isZoomed);
      }
  };

  const handleCloseVideo = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsPlayingVideo(false);
      // Pause immediately when closing
      if (videoRef.current) {
          videoRef.current.pause();
      }
  };

  const handleCloseGif = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsPlayingGif(false);
  };

  // Map Visualization Constants
  const MAP_BOUNDS = { minX: -30, maxX: 20, minZ: -15, maxZ: 25 };
  
  const getMapPosition = (x: number, z: number) => {
    const width = MAP_BOUNDS.maxX - MAP_BOUNDS.minX;
    const height = MAP_BOUNDS.maxZ - MAP_BOUNDS.minZ;
    const left = ((x - MAP_BOUNDS.minX) / width) * 100;
    const top = ((z - MAP_BOUNDS.minZ) / height) * 100;
    return { left: `${left}%`, top: `${top}%` };
  };

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-1000">
      {/* Background Media Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
            {isModelView ? (
                // 3D MODEL VIEWER
                <div className="w-full h-full relative bg-gradient-to-b from-stone-900 to-black">
                     <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
                        <AmbientLight intensity={0.5} />
                        <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                        <Suspense fallback={null}>
                            <Stage environment="sunset" intensity={1} adjustCamera={1.2} shadows={true}>
                                <ModelContent />
                            </Stage>
                        </Suspense>
                        <OrbitControls autoRotate autoRotateSpeed={1.0} enableZoom={true} minDistance={2} maxDistance={50} />
                    </Canvas>
                </div>
            ) : ((isFigure || isGallery || isOrigins) && imageSource && !hasNativeVideo) ? (
                // INTERACTIVE DISTORTED IMAGE VIEWER FOR FIGURES & GALLERY & ORIGINS
                <div className="w-full h-full relative bg-black">
                     <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
                        <AmbientLight intensity={0.5} />
                        <Suspense fallback={<Html center><Loader2 className="w-8 h-8 animate-spin text-stone-500" /></Html>}>
                            <DistortedImage url={imageSource} />
                        </Suspense>
                    </Canvas>

                    {/* Overlay Click Handler for Interactions (Meng Po & Magu GIF trigger etc) */}
                    <div 
                        className="absolute inset-0 z-10 cursor-pointer"
                        onClick={handlePlayVideo}
                    >
                         {/* Hint Overlay for Meng Po or Magu */}
                         {(isMengPo || isMagu) && !isPlayingGif && (
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none group">
                                <div className="p-6 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/50">
                                    <PlayCircle className="w-8 h-8 text-white/90" strokeWidth={1} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : imageSource ? (
                // STATIC IMAGE VIEWER (Fallback for other types or architecture)
                <div 
                    className={`
                        w-full h-full relative bg-black flex items-center justify-center 
                        transition-colors duration-500 group/image
                        ${isZoomed ? 'cursor-zoom-out' : (hasNativeVideo || isMengPo || isMagu) ? 'cursor-pointer' : 'cursor-zoom-in'}
                    `}
                    onClick={handlePlayVideo}
                >
                    <img 
                        src={imageSource} 
                        alt={spotName} 
                        className={`
                            w-full h-full object-contain 
                            transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                            ${isZoomed ? 'scale-125 opacity-100' : 'scale-100 animate-in zoom-in-95'}
                            ${!isZoomed && hasDetails ? 'opacity-40 md:opacity-100' : ''}
                        `}
                    />
                    
                    {/* Radial Masks */}
                    <div className={`
                        absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 md:block hidden pointer-events-none
                        transition-opacity duration-1000 ease-in-out
                        ${isZoomed ? 'opacity-0' : 'opacity-100'}
                    `} />
                    <div className={`
                         absolute inset-0 bg-black/70 md:hidden block pointer-events-none
                         transition-opacity duration-1000 ease-in-out
                         ${isZoomed ? 'opacity-0' : 'opacity-100'}
                    `} />

                    {/* Play Button Overlay for Native Video Supported Spots */}
                    {hasNativeVideo && !isPlayingVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                            <div className="p-6 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 group-hover/image:bg-black/50 group-hover/image:scale-110 transition-all duration-500">
                                <PlayCircle className="w-12 h-12 text-white/90" strokeWidth={1} />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // VIDEO PLAYER (Standard Iframe for Bilibili/Drive fallback)
                <iframe
                    className="w-full h-full absolute inset-0"
                    src={isBilibili 
                        ? `//player.bilibili.com/player.html?bvid=${videoSource}&page=1&high_quality=1&danmaku=0&autoplay=1`
                        : videoSource
                    }
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    title={`Video for ${spotName}`}
                />
            )}

            {/* Custom Video Player Overlay for Native Videos */}
            {hasNativeVideo && (
                <div className={`
                    absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-2 md:p-6
                    transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                    ${isPlayingVideo ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}
                `}>
                    <div className="relative w-[90vw] md:w-[85vw] max-w-[1600px] aspect-video">
                         <video
                            ref={videoRef}
                            className="w-full h-full rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                            controls
                            playsInline
                            poster={IMAGE_SOURCES[spotName] || itemData?.image}
                        >
                            <source src={VIDEO_SOURCES[spotName]} type="video/mp4" />
                            您的浏览器不支持 video 标签。
                        </video>
                    </div>
                    
                    {/* Exit Button for Video */}
                    <button 
                        onClick={handleCloseVideo}
                        className={`
                            absolute top-8 right-8 z-50 
                            p-3 rounded-full 
                            bg-black/50 backdrop-blur-md border border-white/20 
                            text-white/80 hover:text-white hover:bg-white/10 hover:rotate-90
                            transition-all duration-500
                            ${isPlayingVideo ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
                        `}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            )}
            
            {/* Custom GIF Player Overlay for Meng Po & Magu */}
            {(isMengPo || isMagu) && (
                <div className={`
                    absolute inset-0 z-50 bg-black flex items-center justify-center
                    transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                    ${isPlayingGif ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}
                `}>
                    <img
                        src={isMengPo 
                            ? "https://raw.githubusercontent.com/he-sy23-commits/Project/main/1229-ezgif.com-optimize.gif" 
                            : "https://raw.githubusercontent.com/he-sy23-commits/Project/main/x-ezgif.com-optimize.gif"
                        }
                        alt="Character Animation"
                        className="w-full h-full object-contain"
                    />
                    
                    {/* Exit Button for GIF */}
                    <button 
                        onClick={handleCloseGif}
                        className={`
                            absolute top-8 right-8 z-50 
                            p-3 rounded-full 
                            bg-black/50 backdrop-blur-md border border-white/20 
                            text-white/80 hover:text-white hover:bg-white/10 hover:rotate-90
                            transition-all duration-500
                            ${isPlayingGif ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
                        `}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            )}
      </div>
      
      {/* Foreground Content Layer - Fades/Hides when Zoomed OR Playing Video OR Playing GIF */}
      <div className={`
            relative z-10 w-full h-full pointer-events-none flex flex-col
            transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]
            ${(isZoomed || isPlayingVideo || isPlayingGif) ? 'opacity-0 translate-y-8 blur-sm scale-105' : 'opacity-100 translate-y-0 blur-0 scale-100'}
      `}>
        
        {/* Header (Top) */}
        <div className="flex justify-between items-start p-6 md:p-10 pointer-events-auto">
             <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-lg border border-white/10 animate-in slide-in-from-top-4 duration-700 delay-200">
                <h2 className="text-xl md:text-3xl font-serif-cn text-white tracking-[0.15em] drop-shadow-lg">
                    {spotName}
                </h2>
                <span className="text-[10px] text-stone-400 font-serif-en tracking-widest uppercase flex items-center gap-2 mt-1">
                     {itemData?.titleEn}
                </span>
            </div>

            <button 
                onClick={onClose}
                className="group flex items-center gap-2 px-5 py-2 bg-black/60 hover:bg-white/10 backdrop-blur-md border border-white/20 rounded-full transition-all duration-300"
            >
                <span className="text-xs font-serif-en tracking-widest text-stone-300 group-hover:text-white">RETURN</span>
                <div className="p-1 bg-white/10 rounded-full group-hover:bg-white/20">
                    <X className="w-4 h-4 text-white" />
                </div>
            </button>
        </div>

        {/* Main Content Area (Split Left/Right) */}
        {hasDetails && itemData?.details && (
            <div className="flex-grow flex flex-col md:flex-row justify-between items-start px-6 md:px-12 pb-12 overflow-y-auto md:overflow-hidden gap-6 md:gap-0">
                
                {/* LEFT PANEL: Bio */}
                <div className="w-full md:w-1/4 flex flex-col justify-center pointer-events-auto mt-0 md:mt-20">
                    <div className="bg-black/20 backdrop-blur-lg border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:bg-black/40 transition-colors animate-in slide-in-from-left-8 fade-in duration-1000 delay-300 fill-mode-both">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-stone-500 to-transparent opacity-50" />
                        
                        <div className="flex items-center gap-3 mb-4 text-stone-300">
                             <BookOpen className="w-5 h-5 opacity-70" />
                             <h3 className="font-serif-cn text-lg tracking-widest">{bioLabel}</h3>
                        </div>
                        <div className="space-y-4">
                            {/* Simulate paragraph staggered loading */}
                            <p className="font-serif-cn text-stone-300 leading-loose text-justify text-sm opacity-90 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500 fill-mode-both">
                                {itemData.details.bio?.split('。')[0]}。
                            </p>
                            <p className="font-serif-cn text-stone-300 leading-loose text-justify text-sm opacity-90 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-700 fill-mode-both">
                                {itemData.details.bio?.split('。').slice(1).join('。')}
                            </p>
                        </div>
                        
                         {/* GALLERY: Inserted here if available */}
                        {itemData.details.gallery && (
                             <div className="mt-6 border-t border-white/10 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
                                 <div className="flex items-center gap-2 mb-3 text-stone-300">
                                     <ImageIcon className="w-4 h-4 opacity-70" />
                                     <h4 className="font-serif-cn text-md tracking-widest">造像来源</h4>
                                 </div>
                                 <div className="grid grid-cols-2 gap-3">
                                     {itemData.details.gallery.map((img, idx) => (
                                         <div key={idx} className="group/img relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-black/20 cursor-pointer">
                                             <a href={img.linkUrl || '#'} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                                <img src={img.imgUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110 opacity-80 group-hover/img:opacity-100" />
                                                {img.linkUrl && (
                                                    <div className="absolute top-2 right-2 bg-black/40 p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                                                        <ExternalLink className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-1.5 text-center translate-y-full group-hover/img:translate-y-0 transition-transform duration-300">
                                                    <span className="text-[10px] text-stone-200 font-serif-cn">{img.caption}</span>
                                                </div>
                                             </a>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                        )}

                        {/* MAP VISUALIZATION: Added here */}
                        {isArchitecture && (
                        <div className="mt-6 border-t border-white/10 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900">
                            {/* Map Header */}
                            <div className="flex items-center gap-2 mb-3 text-stone-300">
                                <MapIcon className="w-4 h-4 opacity-70" />
                                <h4 className="font-serif-cn text-md tracking-widest">景区地图</h4>
                            </div>
                            
                            {/* Map Container */}
                            <div className="relative w-full aspect-[4/3] bg-[#0A0A0A] rounded-lg border border-white/10 overflow-hidden shadow-inner group/map">
                                {/* Grid Lines */}
                                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5"></div>
                                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5"></div>
                                
                                {/* Compass */}
                                <div className="absolute top-2 right-2 text-[8px] text-stone-600 font-serif-en border border-white/5 px-1 rounded">N</div>

                                {/* Spots */}
                                {SPOTS.map((spot, idx) => {
                                    const isActive = spot.name === spotName;
                                    const { left, top } = getMapPosition(spot.x, spot.z);
                                    
                                    return (
                                        <div 
                                            key={idx}
                                            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-500"
                                            style={{ left, top }}
                                        >
                                            {isActive && (
                                                <div className="absolute w-8 h-8 rounded-full border border-white/30 animate-ping opacity-50"></div>
                                            )}
                                            <div className={`
                                                w-1.5 h-1.5 rounded-full transition-all duration-300
                                                ${isActive ? 'bg-white shadow-[0_0_8px_white] scale-150' : 'bg-white/30 hover:bg-white/60'}
                                            `} />
                                            {isActive && (
                                                <div className="absolute top-3 whitespace-nowrap bg-black/80 text-[10px] text-white px-1.5 py-0.5 rounded border border-white/20 backdrop-blur-sm z-10">
                                                    <div className="flex items-center gap-1">
                                                        <LocateFixed className="w-2 h-2" />
                                                        {spot.name}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* WEATHER SECTION */}
                            <div className="mt-3 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-1000">
                                <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center gap-3 hover:bg-white/10 transition-colors">
                                     <div className="p-2 bg-white/5 rounded-full text-stone-300">
                                         <CloudFog className="w-5 h-5" strokeWidth={1.5} />
                                     </div>
                                     <div>
                                         <div className="text-[10px] text-stone-500 font-serif-en tracking-wider uppercase">WEATHER</div>
                                         <div className="text-xs text-stone-200 font-serif-cn">多云转阴</div>
                                     </div>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors">
                                    <div>
                                         <div className="text-[10px] text-stone-500 font-serif-en tracking-wider uppercase">TEMP</div>
                                         <div className="text-sm text-stone-200 font-serif-en">18°C</div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1.5">
                                         <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
                                             <Droplets className="w-3 h-3" strokeWidth={1.5} /> 
                                             <span>82%</span>
                                         </div>
                                         <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
                                             <Wind className="w-3 h-3" strokeWidth={1.5} /> 
                                             <span>2m/s</span>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}

                    </div>
                </div>

                {/* CENTER: Space for Image */}
                <div className="flex-grow hidden md:block" />

                {/* RIGHT PANEL: Connection & Influence & Symbols */}
                <div className="w-full md:w-1/4 flex flex-col gap-4 pointer-events-auto mt-0 md:mt-20">
                    
                    {/* Symbols Analysis (New Section) */}
                    {itemData.details.symbols && (
                        <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-5 rounded-2xl animate-in slide-in-from-right-8 fade-in duration-1000 delay-500 fill-mode-both">
                            <div className="flex items-center gap-2 mb-3 text-stone-200">
                                <ScanEye className="w-4 h-4 opacity-80" />
                                <h3 className="font-serif-cn text-md tracking-widest">关键符号解析</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {itemData.details.symbols.map((symbol, idx) => (
                                    <div key={idx} className="flex gap-3 items-start bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: `${800 + idx * 200}ms`, animationFillMode: 'both' }}>
                                        <div className="p-2 bg-stone-800 rounded-full text-stone-300 mt-0.5 shrink-0">
                                            {SYMBOL_ICONS[symbol.iconKey] || <Feather className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <h4 className="text-stone-200 font-serif-cn text-sm mb-1">{symbol.name}</h4>
                                            <p className="text-[11px] text-stone-400 leading-relaxed font-serif-cn">{symbol.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Connection */}
                    {itemData.details.connection && (
                        <div className="bg-black/20 backdrop-blur-lg border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:bg-black/40 transition-colors animate-in slide-in-from-right-8 fade-in duration-1000 delay-700 fill-mode-both">
                             <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-stone-500 to-transparent opacity-50" />
                            <div className="flex items-center gap-3 mb-3 text-stone-300 flex-row-reverse md:flex-row">
                                <Scroll className="w-4 h-4 opacity-70" />
                                <h3 className="font-serif-cn text-md tracking-widest">文化渊源</h3>
                            </div>
                            <p className="font-serif-cn text-stone-300 leading-loose text-justify text-xs opacity-90 animate-in fade-in duration-1000 delay-1000 fill-mode-both">
                                {itemData.details.connection}
                            </p>
                        </div>
                    )}

                    {/* Influence */}
                    {itemData.details.influence && (
                        <div className="bg-black/20 backdrop-blur-lg border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:bg-black/40 transition-colors animate-in slide-in-from-right-8 fade-in duration-1000 delay-1200 fill-mode-both">
                             <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-stone-500 to-transparent opacity-50" />
                            <div className="flex items-center gap-3 mb-3 text-stone-300 flex-row-reverse md:flex-row">
                                <Award className="w-4 h-4 opacity-70" />
                                <h3 className="font-serif-cn text-md tracking-widest">{influenceLabel}</h3>
                            </div>
                            <p className="font-serif-cn text-stone-300 leading-loose text-justify text-xs opacity-90 animate-in fade-in duration-1000 delay-1200 fill-mode-both">
                                {itemData.details.influence}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Footer (If no details, or at very bottom) */}
        {!hasDetails && (
             <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
                 <span className="text-[10px] text-stone-500 font-serif-en tracking-[0.3em] uppercase opacity-60 animate-pulse">
                    Fengdu Ming Shan · Digital Archive
                </span>
            </div>
        )}
      </div>
    </div>
  );
};

export default VideoOverlay;