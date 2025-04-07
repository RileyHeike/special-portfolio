
import React from 'react';
import { Star } from 'lucide-react';
import InterestItem, { Interest } from './InterestItem';

interface InterestsPanelProps {
  interests: Interest[];
}

const InterestsPanel: React.FC<InterestsPanelProps> = ({ interests }) => {
  return (
    <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
      <h3 className="text-retro-pixel-yellow font-pixel text-lg mb-3 flex items-center">
        <Star size={16} className="mr-2 text-retro-pixel-yellow" />
        INTERESTS
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {interests.map((interest, index) => (
          <InterestItem key={index} interest={interest} index={index} />
        ))}
      </div>
    </div>
  );
};

export default InterestsPanel;
