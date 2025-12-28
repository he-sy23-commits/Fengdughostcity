import React, { useState } from 'react';
import Header from './components/Header';
import InfoPanel from './components/InfoPanel';
import Scene from './components/Scene';
import HandController from './components/HandController';
import VideoOverlay from './components/VideoOverlay';
import { SectionId, SECTIONS } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('origins');
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  
  // Interactive State
  const [isDispersed, setIsDispersed] = useState(false);
  const [rotationTarget, setRotationTarget] = useState<number | null>(null);

  const handleSectionChange = (id: SectionId) => {
    setActiveSection(id);
  };

  const handleSpotClick = (name: string) => {
    setSelectedSpot(name);
  };

  const handleVideoClose = () => {
    setSelectedSpot(null);
  };

  return (
    <div className="relative w-full h-screen bg-[#020408] overflow-hidden text-stone-200 selection:bg-white/20 selection:text-white">
      {/* Video Overlay Layer */}
      {selectedSpot && (
        <VideoOverlay spotName={selectedSpot} onClose={handleVideoClose} />
      )}

      {/* Main 3D App Layer - Hidden when video is playing for better performance/focus */}
      <div className={`w-full h-full transition-opacity duration-700 ${selectedSpot ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Hand Gesture Controller */}
        <HandController 
            onDisperse={setIsDispersed}
            onRotate={setRotationTarget}
        />

        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
            <Scene 
                activeSection={activeSection} 
                isDispersed={isDispersed}
                rotationTarget={rotationTarget}
                onSpotClick={handleSpotClick}
            />
        </div>

        {/* UI Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
            {/* Top Header */}
            <div className="pointer-events-auto">
            <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
            </div>

            {/* Bottom Panel - Expanded max-width for Carousel */}
            <div className="pointer-events-auto pb-8 md:pb-12 pl-0 md:pl-20 w-full md:w-auto md:max-w-[90%] lg:max-w-4xl">
            <InfoPanel data={SECTIONS[activeSection]} />
            </div>
        </div>
        
        {/* Subtle Frame */}
        <div className="absolute inset-4 border border-white/5 rounded-3xl pointer-events-none z-20 mix-blend-screen" />
      </div>
    </div>
  );
};

export default App;