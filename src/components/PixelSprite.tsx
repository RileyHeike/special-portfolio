
import React, { useState, useEffect } from 'react';
import { Heart, Star, Zap, Sparkles } from 'lucide-react';

interface PixelSpriteProps {
  className?: string;
  onClick?: () => void;
}

const PixelSprite: React.FC<PixelSpriteProps> = ({ className, onClick }) => {
  const [animation, setAnimation] = useState('animate-float');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(<Heart size={16} className="text-retro-pixel-red" />);

  // Array of fun messages for speech bubble
  const messages = [
    "Hello there!",
    "Want to see my projects?",
    "Click around to explore!",
    "I'm pixel perfect!",
    "Level up your skills!",
    "High score achieved!",
    "Game on!",
    "Press START to continue...",
    "Achievement unlocked!",
    "Power up!"
  ];

  // Array of emoji components
  const emojis = [
    <Heart key="heart" size={16} className="text-retro-pixel-red" />,
    <Star key="star" size={16} className="text-retro-pixel-yellow" />,
    <Zap key="zap" size={16} className="text-retro-amber" />,
    <Sparkles key="sparkles" size={16} className="text-retro-neon-blue" />
  ];

  // Array of animations
  const animations = [
    'animate-pixel-bounce',
    'animate-spin',
    'animate-pulse',
    'animate-ping'
  ];

  const handleClick = () => {
    // Get random message, emoji, and animation
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    
    setMessage(randomMessage);
    setCurrentEmoji(randomEmoji);
    setAnimation(randomAnimation);
    setShowMessage(true);
    setShowEmoji(true);
    
    // Call onClick prop if provided
    if (onClick) {
      onClick();
    }
    
    // Reset animation and hide message after delay
    setTimeout(() => {
      setAnimation('animate-float');
      setShowMessage(false);
    }, 2000);
    
    // Show emoji particles that float up and disappear
    setTimeout(() => {
      setShowEmoji(false);
    }, 1500);
  };
  
  return (
    <div 
      className={`relative cursor-pointer ${animation} ${className}`}
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
      {showMessage && (
        <div className="absolute -top-12 left-0 right-0 bg-white text-black p-2 rounded-lg text-xs font-pixel animate-fade-in">
          {message}
        </div>
      )}
      
      {/* Emoji particles */}
      {showEmoji && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-8 left-2 animate-float opacity-80">{currentEmoji}</div>
          <div className="absolute -top-6 right-2 animate-float opacity-80 delay-100">{currentEmoji}</div>
          <div className="absolute -top-4 left-8 animate-float opacity-80 delay-200">{currentEmoji}</div>
        </div>
      )}
    </div>
  );
};

export default PixelSprite;
