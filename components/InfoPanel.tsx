import React from 'react';
import { MenuItem } from '../types';
import { MapPin } from 'lucide-react';

interface InfoPanelProps {
  data: MenuItem;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ data }) => {
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
      <div className="relative w-full">
        {/* Gradient Fade Masks for Scrolling hint */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#020408] to-transparent z-10 pointer-events-none md:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020408] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-x-auto gap-4 pb-8 pt-2 px-4 md:px-0 snap-x snap-mandatory scrollbar-hide">
            {data.items.map((item, index) => {
              const hasImage = !!item.image;
              
              return (
                <div 
                    key={index}
                    className={`
                      snap-center shrink-0 
                      ${hasImage ? 'w-[300px] md:w-[360px] h-[420px]' : 'w-[280px] md:w-[320px] h-[200px]'}
                      bg-white/5 border border-white/10 backdrop-blur-md rounded-xl 
                      overflow-hidden hover:bg-white/10 transition-all duration-500 group flex flex-col justify-between
                    `}
                >
                    {hasImage && (
                      <div className="relative w-full h-1/2 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.titleEn} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020408] to-transparent opacity-60" />
                        
                        {/* Number badge for image cards */}
                        <div className="absolute top-3 right-3 text-[10px] text-white/80 font-serif-en tracking-wider uppercase border border-white/20 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded">
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </div>
                      </div>
                    )}

                    <div className={`flex flex-col flex-grow ${hasImage ? 'p-5 justify-start' : 'p-6 justify-between'}`}>
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-xl text-stone-200 font-serif-cn tracking-wider group-hover:text-white transition-colors">
                                    {item.title}
                                </h4>
                                {!hasImage && (
                                  <span className="text-[10px] text-stone-600 font-serif-en tracking-wider uppercase border border-stone-800 px-1.5 py-0.5 rounded">
                                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                  </span>
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