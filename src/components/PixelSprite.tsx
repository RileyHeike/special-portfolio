
import React, { useState, useEffect } from 'react';

interface PixelSpriteProps {
  className?: string;
}

const PixelSprite: React.FC<PixelSpriteProps> = ({ className }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // This is a placeholder for your actual pixel sprite
  // Replace with your own pixel art when ready
  
  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };
  
  return (
    <div 
      className={`relative cursor-pointer ${isAnimating ? 'animate-pixel-bounce' : 'animate-float'} ${className}`}
      onClick={handleClick}
    >
      {/* Placeholder sprite - replace with your own */}
      <div className="w-16 h-24 relative">
        {/* Head */}
        <div className="absolute top-0 left-3 w-10 h-10 bg-retro-pixel-yellow rounded-full"></div>
        
        {/* Body */}
        <div className="absolute top-8 left-4 w-8 h-12 bg-retro-pixel-blue"></div>
        
        {/* Arms */}
        <div className="absolute top-8 left-1 w-3 h-8 bg-retro-pixel-blue"></div>
        <div className="absolute top-8 right-1 w-3 h-8 bg-retro-pixel-blue"></div>
        
        {/* Legs */}
        <div className="absolute bottom-0 left-4 w-3 h-4 bg-retro-pixel-green"></div>
        <div className="absolute bottom-0 right-4 w-3 h-4 bg-retro-pixel-green"></div>
        
        {/* Face */}
        <div className="absolute top-3 left-5 w-2 h-2 bg-black rounded-full"></div>
        <div className="absolute top-3 right-5 w-2 h-2 bg-black rounded-full"></div>
        <div className="absolute top-6 left-6 w-4 h-1 bg-black rounded-full"></div>
      </div>
      
      {/* Speech bubble - shows when clicked */}
      {isAnimating && (
        <div className="absolute -top-12 left-0 right-0 bg-white text-black p-2 rounded-lg text-xs font-pixel animate-fade-in">
          Hello there!
        </div>
      )}
    </div>
  );
};

export default PixelSprite;
