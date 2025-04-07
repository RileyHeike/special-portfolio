
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface CharacterStat {
  name: string;
  value: number;
}

interface CharacterStatsProps {
  stats: Record<string, number>;
  className?: string;
}

const CharacterStats: React.FC<CharacterStatsProps> = ({ stats, className = '' }) => {
  return (
    <div className={`w-full px-4 mb-4 ${className}`}>
      <h4 className="text-retro-terminal-green font-pixel text-sm mb-2">CLASS STATS</h4>
      <div className="space-y-2 w-full">
        {Object.entries(stats).map(([stat, value]) => (
          <HoverCard key={stat}>
            <HoverCardTrigger asChild>
              <div className="flex items-center group w-full">
                <span className="text-retro-terminal-green font-pixel text-xs w-20 capitalize">
                  {stat}
                </span>
                <div className="ml-auto flex items-center space-x-2 w-[70%]">
                  <Progress 
                    value={value} 
                    className="h-2 w-full bg-retro-dark-purple"
                  />
                  <span className="text-retro-terminal-green font-pixel text-xs min-w-[2rem] text-right">
                    {value}
                  </span>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 bg-retro-terminal-black border border-retro-purple text-retro-terminal-green p-4">
              <p className="text-xs">This character has {value}% {stat}.</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default CharacterStats;
