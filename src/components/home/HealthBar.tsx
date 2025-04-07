
import React from 'react';
import { Heart } from 'lucide-react';

interface HealthBarProps {
  healthPoints: number;
  maxHealth?: number;
  className?: string;
}

const HealthBar: React.FC<HealthBarProps> = ({ 
  healthPoints, 
  maxHealth = 10,
  className = ''
}) => {
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < maxHealth; i++) {
      hearts.push(
        <Heart
          key={i}
          size={16}
          className={i < healthPoints ? 'text-red-500 fill-red-500' : 'text-gray-400'}
        />
      );
    }
    return hearts;
  };

  return (
    <div className={`w-full px-4 mb-4 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-retro-terminal-green font-pixel text-xs">HP</span>
        <div className="flex flex-wrap gap-1 justify-end">
          {renderHearts()}
        </div>
      </div>
    </div>
  );
};

export default HealthBar;
