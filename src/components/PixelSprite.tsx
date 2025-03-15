
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface PixelSpriteProps {
  className?: string;
  onClick?: () => void;
}

const PixelSprite: React.FC<PixelSpriteProps> = ({ className = '', onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = () => {
    if (onClick && !isAnimating) {
      setIsAnimating(true);
      onClick();
      
      // Reset animation state after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };
  
  return (
    <div 
      className={`cursor-pointer ${isAnimating ? 'animate-pixel-bounce' : 'hover:animate-float'} ${className}`}
      onClick={handleClick}
    >
      <Avatar className="w-24 h-24 border-4 border-retro-purple bg-retro-terminal-black">
        <AvatarImage src="/lovable-uploads/cc6a630e-173e-4881-b6b5-37abb23f360b.png" alt="Pixel character" />
        <AvatarFallback className="bg-retro-dark-purple text-retro-purple text-2xl font-pixel">
          8bit
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default PixelSprite;
