
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PixelSpriteProps {
  className?: string;
  onClick?: () => void;
}

const PixelSprite: React.FC<PixelSpriteProps> = ({ className = '', onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    "Erm...",
    "Slay Queen!",
    "Did you know there's a secret code somewhere?",
    "Idk why I bother living",
    "Riley Heike is the coolest person I know tbh"
  ];
  
  const handleClick = () => {
    if (onClick && !isAnimating) {
      onClick();
    }
    
    // Set animation state
    setIsAnimating(true);
    
    // Show message and cycle through messages
    setShowMessage(true);
    setCurrentMessage((prev) => (prev + 1) % messages.length);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };
  
  return (
    <Popover open={showMessage} onOpenChange={setShowMessage}>
      <PopoverTrigger asChild>
        <div 
          className={`cursor-pointer ${isAnimating ? 'animate-pixel-bounce' : 'hover:animate-float'} ${className}`}
          onClick={handleClick}
        >
          <img 
            src="/lovable-uploads/cc6a630e-173e-4881-b6b5-37abb23f360b.png" 
            alt="Pixel character" 
            className="w-48 h-48 object-contain" // Doubled from 24 to 48
          />
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="bg-retro-terminal-black border-2 border-retro-purple text-retro-terminal-green font-pixel p-4 pixel-corners w-64"
        side="top"
        align="center"
      >
        <div className="text-sm text-center">
          {messages[currentMessage]}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PixelSprite;
