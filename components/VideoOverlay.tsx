import React, { useState, useEffect } from 'react';
import { X, Play, Pause } from 'lucide-react';

interface VideoOverlayProps {
  spotName: string;
  onClose: () => void;
}

// Mapping spots to atmospheric video URLs (using high-quality stock footage proxies)
const VIDEO_MAPPING: Record<string, string> = {
  'default': 'https://assets.mixkit.co/videos/preview/mixkit-foggy-mountain-peaks-at-sunset-2679-large.mp4',
  '天子殿': 'https://assets.mixkit.co/videos/preview/mixkit-traditional-chinese-temple-roof-11756-large.mp4',
  '奈何桥': 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-forest-in-fog-at-night-39965-large.mp4',
  '鬼门关': 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-foggy-mountains-at-sunset-3373-large.mp4',
  '名山牌坊': 'https://assets.mixkit.co/videos/preview/mixkit-drone-flying-over-mountains-covered-in-mist-2674-large.mp4'
};

const VideoOverlay: React.FC<VideoOverlayProps> = ({ spotName, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoUrl = VIDEO_MAPPING[spotName] || VIDEO_MAPPING['default'];

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-700">
      {/* Video Container */}
      <div className="relative w-full h-full">
        <video 
          autoPlay 
          loop 
          className="w-full h-full object-cover opacity-80"
          src={videoUrl}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h2 className="text-5xl md:text-7xl font-serif-cn text-white tracking-[0.2em] drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-10 duration-1000 delay-300">
            {spotName}
          </h2>
          <div className="w-16 h-[1px] bg-white/50 mt-6 mb-4 animate-in zoom-in duration-1000 delay-500" />
          <p className="text-stone-300 font-serif-en tracking-widest text-sm uppercase animate-in fade-in duration-1000 delay-700">
            Immersive Experience
          </p>
        </div>

        {/* Controls */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 flex gap-4 pointer-events-auto">
          <button 
            onClick={onClose}
            className="group flex items-center gap-2 px-6 py-2 bg-black/40 hover:bg-white/10 backdrop-blur-md border border-white/20 rounded-full transition-all duration-300"
          >
            <span className="text-xs font-serif-en tracking-widest text-stone-300 group-hover:text-white">RETURN</span>
            <div className="p-1 bg-white/10 rounded-full group-hover:bg-white/20">
                <X className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
            <span className="text-[10px] text-stone-500 font-serif-en tracking-[0.3em] uppercase opacity-60">
                Fengdu Ming Shan Digital Twin · Virtual Tour
            </span>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;