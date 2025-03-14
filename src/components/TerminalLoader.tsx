
import React, { useState, useEffect } from 'react';

interface TerminalLoaderProps {
  onComplete: () => void;
}

const TerminalLoader: React.FC<TerminalLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const bootLines = [
    "SYSTEM BOOT v2.5",
    "INITIALIZING...",
    "LOADING SYSTEM COMPONENTS...",
    "CONNECTING TO NETWORK...",
    "LOADING PERSONAL DATA...",
    "RENDERING USER INTERFACE...",
    "SYSTEM READY!"
  ];

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Progress increment
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // Line increment
    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= bootLines.length - 1) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(progressInterval);
      clearInterval(lineInterval);
    };
  }, [onComplete, bootLines.length]);

  return (
    <div className="fixed inset-0 bg-retro-terminal-black text-retro-terminal-green font-mono z-50 flex items-center justify-center">
      <div className="w-full max-w-lg p-8">
        <div className="mb-8">
          {bootLines.slice(0, currentLine + 1).map((line, index) => (
            <div key={index} className="mb-2 flex">
              <span className="mr-2">$&gt;</span>
              <span className="animate-typing overflow-hidden whitespace-nowrap">
                {line}
              </span>
              {index === currentLine && showCursor && <span className="text-retro-terminal-green animate-blink">_</span>}
            </div>
          ))}
        </div>
        
        <div className="mb-4">
          <div className="w-full h-4 bg-retro-dark-purple rounded-sm overflow-hidden pixel-corners">
            <div 
              className="h-full bg-retro-terminal-green" 
              style={{ width: `${progress}%`, transition: 'width 0.1s' }}
            ></div>
          </div>
          <div className="text-right mt-1">{progress}%</div>
        </div>
      </div>
      
      <div className="scanline"></div>
    </div>
  );
};

export default TerminalLoader;
