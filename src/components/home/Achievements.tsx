
import React from 'react';
import { Trophy } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export interface Achievement {
  id: number;
  name: string;
  description: string;
  scoreThreshold: number;
  unlocked: boolean;
}

interface AchievementsProps {
  achievements: Achievement[];
  score: number;
  className?: string;
}

const Achievements: React.FC<AchievementsProps> = ({ 
  achievements, 
  score,
  className = '' 
}) => {
  return (
    <div className={`bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners hover:border-retro-pixel-yellow transition-colors duration-300 ${className}`}>
      <h3 className="text-retro-terminal-green font-pixel text-sm mb-2">ACHIEVEMENTS</h3>
      <p className="text-xs text-retro-terminal-green mb-4">Explore the portfolio to collect points and unlock achievements. Find hidden coins, discover secrets, and try special key combinations!</p>
      <div className="flex justify-around">
        {achievements.slice(0, 5).map((achievement, index) => (
          <HoverCard key={achievement.id} openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <div 
                className={`p-2 rounded-full border-2 
                  ${achievement.unlocked 
                    ? 'border-retro-pixel-yellow bg-retro-dark-purple' 
                    : 'border-retro-purple/30 bg-retro-dark-purple/30'
                  }`}
              >
                <Trophy 
                  size={20} 
                  className={achievement.unlocked ? 'text-retro-pixel-yellow' : 'text-retro-purple/30'} 
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent 
              className="w-64 bg-retro-terminal-black border border-retro-purple text-retro-terminal-green p-4" 
              side="top"
              align={index === 0 ? "start" : index === 4 ? "end" : "center"}
              avoidCollisions={true}
              sticky="always"
              sideOffset={5}
            >
              <p className="text-xs font-pixel mb-1">{achievement.name}</p>
              <p className="text-xs mb-2">{achievement.description}</p>
              <p className="text-xs">
                {achievement.unlocked 
                  ? 'Achievement unlocked!' 
                  : `Unlock at ${achievement.scoreThreshold} points (current: ${score})`}
              </p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
