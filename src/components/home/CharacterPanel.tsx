
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PixelSprite from '../PixelSprite';
import CharacterStats from './CharacterStats';
import HealthBar from './HealthBar';

export interface CharacterClass {
  name: string;
  stats: Record<string, number>;
  description: string;
}

interface CharacterPanelProps {
  classes: CharacterClass[];
  initialClassIndex?: number;
  healthPoints?: number;
  onSpriteClick?: () => void;
}

const CharacterPanel: React.FC<CharacterPanelProps> = ({ 
  classes,
  initialClassIndex = 0,
  healthPoints = 10,
  onSpriteClick
}) => {
  // Character class selection state
  const [selectedClassIndex, setSelectedClassIndex] = useState(initialClassIndex);
  
  // Character class navigation
  const handlePreviousClass = () => {
    setSelectedClassIndex(prev => (prev > 0 ? prev - 1 : classes.length - 1));
  };

  const handleNextClass = () => {
    setSelectedClassIndex(prev => (prev < classes.length - 1 ? prev + 1 : 0));
  };

  const selectedClass = classes[selectedClassIndex];

  return (
    <div className="bg-retro-terminal-black p-6 border-2 border-retro-purple rounded-lg pixel-corners w-full h-full flex flex-col items-center justify-between hover:border-retro-pixel-yellow transition-colors duration-300">
      {/* Panel header */}
      <h3 className="text-retro-pixel-yellow font-pixel text-lg">YOUR CHARACTER</h3>
      
      {/* Class selection interface */}
      <div className="w-full px-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-retro-terminal-green font-pixel text-sm">CHARACTER CLASS</h4>
          <div className="text-retro-pixel-yellow font-pixel py-2">{selectedClass.name}</div>
        </div>
        <div className="flex items-center justify-between">
          {/* Previous class button */}
          <button 
            onClick={handlePreviousClass} 
            className="p-2 rounded-full border-2 border-retro-purple bg-retro-dark-purple hover:bg-retro-purple/50 transition-colors"
          >
            <ArrowLeft size={16} className="text-retro-terminal-green" />
          </button>
          {/* Class description */}
          <div className="text-xs text-retro-terminal-green text-center px-4 py-2">
            {selectedClass.description}
          </div>
          {/* Next class button */}
          <button 
            onClick={handleNextClass} 
            className="p-2 rounded-full border-2 border-retro-purple bg-retro-dark-purple hover:bg-retro-purple/50 transition-colors"
          >
            <ArrowRight size={16} className="text-retro-terminal-green" />
          </button>
        </div>
      </div>
      
      {/* Interactive sprite */}
      <PixelSprite className="my-4" onClick={onSpriteClick} />
      
      {/* Character stats display */}
      <CharacterStats stats={selectedClass.stats} />
      
      {/* Health points bar */}
      <HealthBar healthPoints={healthPoints} />
      
      {/* Interaction hint */}
      <p className="text-retro-terminal-green font-mono text-center text-sm mt-4">
        Click the sprite to interact!
      </p>
    </div>
  );
};

export default CharacterPanel;
