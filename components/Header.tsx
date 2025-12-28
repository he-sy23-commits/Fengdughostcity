import React from 'react';
import { SectionId, SECTIONS } from '../types';
import { Mountain } from 'lucide-react';

interface HeaderProps {
  activeSection: SectionId;
  onSectionChange: (id: SectionId) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center px-8 py-6 bg-gradient-to-b from-[#020408]/90 to-transparent">
      {/* Left: Branding */}
      <div className="flex items-center gap-5 mb-6 md:mb-0">
        <div className="relative group cursor-default opacity-90">
            <div className="relative p-2 border border-white/20 rounded-full">
                <Mountain className="w-5 h-5 text-stone-300" strokeWidth={1} />
            </div>
        </div>
        <div className="flex flex-col border-l border-white/10 pl-5">
          <h1 className="text-2xl tracking-[0.2em] text-stone-100 font-serif-cn">
            丰都 <span className="text-stone-400">名山</span>
          </h1>
          <span className="text-xs tracking-[0.25em] text-stone-500 font-serif-en mt-1 italic">
            Ming Shan · The Spirit Mountain
          </span>
        </div>
      </div>

      {/* Right: Navigation */}
      <nav className="flex gap-4 md:gap-10 px-4 py-2">
        {(Object.keys(SECTIONS) as SectionId[]).map((key) => {
          const isActive = activeSection === key;
          return (
            <button
              key={key}
              onClick={() => onSectionChange(key)}
              className={`relative py-2 transition-all duration-700 group`}
            >
              <span className={`text-sm font-serif-cn tracking-widest transition-colors duration-500 ${isActive ? 'text-white' : 'text-stone-600 group-hover:text-stone-400'}`}>
                {SECTIONS[key].label}
              </span>
              
              {/* Active Indicator - Subtle Glow Dot */}
              {isActive && (
                <span className="absolute -bottom-1.5 left-1/2 w-0.5 h-0.5 bg-white rounded-full transform -translate-x-1/2 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;