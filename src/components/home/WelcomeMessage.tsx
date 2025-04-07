
import React, { useState, useEffect } from 'react';

interface WelcomeMessageProps {
  message: string;
  typingSpeed?: number;
  onClick?: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ 
  message, 
  typingSpeed = 35,
  onClick 
}) => {
  const [typedText, setTypedText] = useState("");
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= message.length) {
        setTypedText(message.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [message, typingSpeed]);
  
  return (
    <div 
      className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners h-32 hover:border-retro-terminal-green transition-colors duration-300 cursor-pointer" 
      onClick={onClick}
    >
      <p className="font-mono text-retro-terminal-green">
        {typedText}
        <span className="animate-blink inline-block h-4 w-2 ml-1 bg-retro-terminal-green"></span>
      </p>
    </div>
  );
};

export default WelcomeMessage;
