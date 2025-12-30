import React, { useRef } from 'react';
import { MenuItem } from '../types';
import { MapPin, PlayCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface InfoPanelProps {
  data: MenuItem;
  onSpotClick: (name: string) => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ data, onSpotClick }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Scroll by approx one card width (300px) + gap
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 w-full">
      {/* Header Section: Coordinates & Title */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 px-4 md:px-0 mb-2">
        <div>
           {/* Location Tag */}
            <div className="flex items-center gap-2 text-stone-100 font-serif-en text-base tracking-widest w-max bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm mb-3">
                <MapPin className="w-4 h-4 text-white" />
                <span className="font-medium">{data.coordinates}</span>
            </div>
            
            <div className="flex items-baseline gap-4">
                <h2 className="text-3xl md:text-4xl text-stone-100 font-serif-cn tracking-widest">
                {data.label}
                </h2>
                <h3 className="text-sm font-serif-en text-stone-500 tracking-[0.2em] italic">
                {data.labelEn}
                </h3>
            </div>
        </div>
      </div>

      {/* Scrollable Card Carousel */}
      <div className="relative w-full group/carousel">
        {/* Gradient Fade Masks for Scrolling hint */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#020408] to-transparent z-10 pointer-events-none md:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020408] to-transparent z-10 pointer-events-none" />

        {/* Navigation Buttons - Visible on Desktop, appear on hover or always visible */}
        <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 border border-white/10 text-stone-300 hover:text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-md transition-all duration-300 hidden md:flex items-center justify-center group/btn -ml-5 opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:ml-0"
            aria-label="Scroll Left"
        >
            <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" strokeWidth={1.5} />
        </button>

        <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 border border-white/10 text-stone-300 hover:text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-md transition-all duration-300 hidden md:flex items-center justify-center group/btn -mr-5 opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:mr-0"
            aria-label="Scroll Right"
        >
            <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" strokeWidth={1.5} />
        </button>

        <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-8 pt-2 px-4 md:px-0 snap-x snap-mandatory scrollbar-hide relative z-0"
        >
            {data.items.map((item, index) => {
              const hasImage = !!item.image;
              const hasLink = !!item.link;
              const isVideo = hasImage && !hasLink && (!item.mediaType || item.mediaType === 'video');
              const imagePosition = item.imagePosition || 'object-center';
              
              return (
                <div 
                    key={index}
                    onClick={() => {
                        if (item.link) {
                            window.open(item.link, '_blank');
                        } else {
                            onSpotClick(item.title);
                        }
                    }}
                    className={`
                      snap-center shrink-0 cursor-pointer
                      ${hasImage ? 'w-[300px] md:w-[360px] h-[420px]' : 'w-[280px] md:w-[320px] h-[200px]'}
                      bg-white/5 border border-white/10 backdrop-blur-md rounded-xl 
                      overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all duration-500 group flex flex-col justify-between
                      relative
                    `}
                >
                    {hasImage && (
                      <div className="relative w-full h-1/2 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.titleEn} 
                          className={`w-full h-full object-cover ${imagePosition} transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020408] to-transparent opacity-60" />
                        
                        {/* Number badge for image cards */}
                        <div className="absolute top-3 right-3 text-[10px] text-white/80 font-serif-en tracking-wider uppercase border border-white/20 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded">
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </div>

                        {/* Play Icon Hint on Hover - ONLY FOR VIDEO ITEMS */}
                        {isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                 <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm border border-white/20">
                                    <PlayCircle className="w-8 h-8 text-white" strokeWidth={1.5} />
                                 </div>
                            </div>
                        )}
                      </div>
                    )}

                    <div className={`flex flex-col flex-grow ${hasImage ? 'p-5 justify-start' : 'p-6 justify-between'}`}>
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-xl text-stone-200 font-serif-cn tracking-wider group-hover:text-white transition-colors">
                                    {item.title}
                                </h4>
                                {!hasImage && !hasLink && (
                                  <span className="text-[10px] text-stone-600 font-serif-en tracking-wider uppercase border border-stone-800 px-1.5 py-0.5 rounded">
                                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                  </span>
                                )}
                                {hasLink && (
                                    <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors" />
                                )}
                            </div>
                            <p className="text-xs text-stone-500 font-serif-en mb-3 italic tracking-wider">
                                {item.titleEn}
                            </p>
                            <p className={`text-sm text-stone-400 font-serif-cn leading-relaxed text-justify opacity-90 group-hover:opacity-100 transition-opacity ${hasImage ? 'line-clamp-6' : ''}`}>
                                {item.content}
                            </p>
                        </div>
                        
                        {/* Decorative bottom line */}
                        <div className={`w-8 h-[1px] bg-white/20 group-hover:w-full transition-all duration-700 ease-out ${hasImage ? 'mt-auto' : 'mt-4'}`} />
                    </div>
                </div>
              );
            })}
            
            {/* Spacer for right padding in scroll view */}
            <div className="w-8 shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;