
import React, { useState, useEffect } from 'react';
import PixelSprite from './PixelSprite';

const HomeSectionContent: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "WELCOME TO MY RETRO PORTFOLIO GAME! EXPLORE THE DIFFERENT SECTIONS TO LEARN MORE ABOUT ME AND MY WORK. CLICK ON THE SPRITE TO INTERACT.";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4 h-full">
      <div className="w-full md:w-1/2 flex flex-col space-y-6">
        <h2 className="text-xl md:text-3xl font-pixel text-retro-purple mb-4">
          <span className="text-retro-terminal-green">&gt;</span> PLAYER ONE READY
        </h2>
        
        <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
          <p className="font-mono text-retro-terminal-green">
            {typedText}
            <span className="animate-blink inline-block h-4 w-2 ml-1 bg-retro-terminal-green"></span>
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
            <h3 className="text-retro-amber font-pixel text-sm mb-2">SKILL LEVEL</h3>
            <div className="w-full h-4 bg-retro-dark-purple rounded-sm overflow-hidden">
              <div className="h-full bg-retro-amber" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
            <h3 className="text-retro-neon-blue font-pixel text-sm mb-2">EXP POINTS</h3>
            <div className="flex justify-center items-center">
              <span className="text-retro-neon-blue font-pixel text-lg">9,350</span>
            </div>
          </div>
        </div>
        
        <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
          <h3 className="text-retro-pixel-green font-pixel text-sm mb-2">QUICK STATS</h3>
          <div className="grid grid-cols-2 gap-y-2 text-xs text-retro-terminal-green">
            <div>CLASS: <span className="text-retro-purple">Developer</span></div>
            <div>LEVEL: <span className="text-retro-purple">Senior</span></div>
            <div>SPECIALTY: <span className="text-retro-purple">Frontend</span></div>
            <div>ALIGNMENT: <span className="text-retro-purple">Chaotic Good</span></div>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="bg-retro-terminal-black p-6 border-2 border-retro-purple rounded-lg pixel-corners w-full h-full flex flex-col items-center justify-center">
          <h3 className="text-retro-pixel-yellow font-pixel text-lg mb-8">YOUR CHARACTER</h3>
          <PixelSprite className="mb-8" />
          <p className="text-retro-terminal-green font-mono text-center text-sm">
            Click the sprite to interact!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSectionContent;
