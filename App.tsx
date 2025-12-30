import React, { useState } from 'react';
import Header from './components/Header';
import InfoPanel from './components/InfoPanel';
import Scene from './components/Scene';
import HandController from './components/HandController';
import VideoOverlay from './components/VideoOverlay';
import GalleryView from './components/GalleryView';
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

  // Determine if we are in Grid View Mode (Gallery or Origins)
  const isGridView = activeSection === 'gallery' || activeSection === 'origins';

  // Get current section data
  const currentSectionData = SECTIONS[activeSection];

  return (
    <div className="relative w-full h-screen bg-[#020408] overflow-hidden text-stone-200 selection:bg-white/20 selection:text-white">
      
      {/* Main 3D App Layer - Hidden when video is playing for better performance/focus */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${selectedSpot ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Hand Gesture Controller */}
        <HandController 
            onDisperse={setIsDispersed}
            onRotate={setRotationTarget}
        />

        {/* 3D Background - Blurred in Grid View Mode */}
        <div className={`absolute inset-0 z-0 transition-all duration-1000 ${isGridView ? 'blur-xl scale-110 opacity-30' : 'blur-0 scale-100 opacity-100'}`}>
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
            <div className="pointer-events-auto relative z-30">
                <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
            </div>

            {/* Content Area Switcher */}
            {isGridView ? (
                // Full Screen Grid View for Gallery and Origins
                <GalleryView 
                    title={currentSectionData.label}
                    subtitle={currentSectionData.labelEn}
                    items={currentSectionData.items} 
                    onSpotClick={handleSpotClick} 
                />
            ) : (
                // Bottom Info Panel for Standard Sections
                <div className="pointer-events-auto pb-8 md:pb-12 pl-0 md:pl-20 w-full md:w-auto md:max-w-[90%] lg:max-w-4xl">
                    <InfoPanel data={currentSectionData} onSpotClick={handleSpotClick} />
                </div>
            )}
        </div>
        
        {/* Subtle Frame */}
        <div className="absolute inset-4 border border-white/5 rounded-3xl pointer-events-none z-20 mix-blend-screen" />
      </div>

      {/* Video Overlay Layer - Rendered last to ensure it sits on top of everything in the stacking context */}
      {selectedSpot && (
        <VideoOverlay spotName={selectedSpot} onClose={handleVideoClose} />
      )}
    </div>
  );
};

export default App;