import React from 'react';
import { CardItem } from '../types';
import { PlayCircle, Eye } from 'lucide-react';

interface GalleryViewProps {
  items: CardItem[];
  onSpotClick: (name: string) => void;
  title?: string;
  subtitle?: string;
}

const GalleryView: React.FC<GalleryViewProps> = ({ 
    items, 
    onSpotClick, 
    title = '艺术 · 画廊', 
    subtitle = 'Curated Artworks & Cultural Relics' 
}) => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center pt-24 pb-10 px-4 md:px-12 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Title / Header for the Gallery Page */}
      <div className="text-center mb-8 md:mb-12 pointer-events-auto">
        <h2 className="text-3xl md:text-5xl font-serif-cn text-stone-100 tracking-[0.2em] mb-3 drop-shadow-xl">
            {title}
        </h2>
        <p className="text-xs md:text-sm font-serif-en text-stone-400 tracking-[0.3em] uppercase opacity-80">
            {subtitle}
        </p>
      </div>

      {/* Grid Container */}
      <div className="w-full max-w-7xl h-full overflow-y-auto scrollbar-hide pointer-events-auto pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, index) => (
            <div 
                key={index}
                onClick={() => onSpotClick(item.title)}
                className="group relative aspect-[3/4] md:aspect-[4/5] bg-stone-900/40 border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-500 shadow-2xl"
            >
                {/* Image */}
                {item.image ? (
                    <img 
                        src={item.image} 
                        alt={item.titleEn} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    />
                ) : (
                    <div className="w-full h-full bg-stone-800 flex items-center justify-center">
                        <span className="text-stone-600 font-serif-en text-lg">No Image</span>
                    </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="border-l-2 border-white/50 pl-4 mb-2">
                        <h3 className="text-xl font-serif-cn text-stone-100 tracking-wider mb-1">
                            {item.title}
                        </h3>
                        <p className="text-[10px] font-serif-en text-stone-400 tracking-widest uppercase">
                            {item.titleEn}
                        </p>
                    </div>
                    
                    <p className="text-xs font-serif-cn text-stone-400 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {item.content}
                    </p>

                    {/* View Icon Button */}
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Eye className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Index Number */}
                <div className="absolute top-4 left-4 text-[10px] font-serif-en text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded-full">
                    NO. {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
            </div>
          ))}
        </div>
        
        {/* Footer for Gallery */}
        <div className="mt-12 text-center">
            <div className="w-16 h-[1px] bg-white/10 mx-auto mb-4" />
            <p className="text-[10px] text-stone-600 font-serif-en tracking-widest">End of Collection</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;