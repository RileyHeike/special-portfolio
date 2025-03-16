
import React, { useState, useEffect } from 'react';
import PixelSprite from './PixelSprite';
import { Progress } from './ui/progress';
import { Trophy, Zap, Swords, Gamepad, Heart, Trophy as TrophyIcon } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

interface HomeSectionContentProps {
  onInteraction?: () => void;
}

const HomeSectionContent: React.FC<HomeSectionContentProps> = ({ onInteraction }) => {
  const [typedText, setTypedText] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [gameStats, setGameStats] = useState({
    strength: 65,
    agility: 75,
    intellect: 85,
    charisma: 70,
    luck: 50
  });
  const [achievements, setAchievements] = useState([
    { id: 1, name: "First Visitor", unlocked: true },
    { id: 2, name: "Explorer", unlocked: false },
    { id: 3, name: "Code Master", unlocked: false }
  ]);
  const [healthPoints, setHealthPoints] = useState(100);
  const fullText = "WELCOME TO MY RETRO PORTFOLIO GAME! EXPLORE THE DIFFERENT SECTIONS TO LEARN MORE ABOUT ME AND MY WORK. CLICK ON THE SPRITE TO INTERACT.";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  // Handle click interactions
  const handleSpriteClick = () => {
    if (onInteraction && !hasInteracted) {
      onInteraction();
      setHasInteracted(true);
      // Reset after a delay to allow multiple interactions
      setTimeout(() => setHasInteracted(false), 2000);
    }
  };

  // Handle stat boost
  const handleStatBoost = (stat: keyof typeof gameStats) => {
    if (gameStats[stat] < 100) {
      setGameStats(prev => ({
        ...prev,
        [stat]: Math.min(prev[stat] + 5, 100)
      }));
    }
  };

  // Handle achievement unlock
  const unlockAchievement = (id: number) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id ? { ...achievement, unlocked: true } : achievement
      )
    );
  };

  // Handle health change
  const handleHealthChange = (amount: number) => {
    setHealthPoints(prev => Math.max(0, Math.min(prev + amount, 100)));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Banner that spans the full width */}
      <div className="w-full mb-6">
        <h2 className="text-xl md:text-3xl font-pixel text-retro-purple">
          <span className="text-retro-terminal-green">&gt;</span> PLAYER ONE READY
        </h2>
      </div>
      
      {/* Content area with aligned columns */}
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 flex-grow">
        <div className="w-full md:w-1/2 flex flex-col space-y-6">
          {/* Fixed height for the welcome message box based on full text length */}
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners h-32">
            <p className="font-mono text-retro-terminal-green">
              {typedText}
              <span className="animate-blink inline-block h-4 w-2 ml-1 bg-retro-terminal-green"></span>
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners hover:border-retro-amber transition-colors duration-300 cursor-pointer" onClick={onInteraction}>
              <h3 className="text-retro-amber font-pixel text-sm mb-2">SKILL LEVEL</h3>
              <div className="w-full h-4 bg-retro-dark-purple rounded-sm overflow-hidden">
                <div className="h-full bg-retro-amber" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners hover:border-retro-neon-blue transition-colors duration-300 cursor-pointer" onClick={onInteraction}>
              <h3 className="text-retro-neon-blue font-pixel text-sm mb-2">EXP POINTS</h3>
              <div className="flex justify-center items-center">
                <span className="text-retro-neon-blue font-pixel text-lg">9,350</span>
              </div>
            </div>
          </div>
          
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners hover:border-retro-pixel-green transition-colors duration-300 cursor-pointer" onClick={onInteraction}>
            <h3 className="text-retro-pixel-green font-pixel text-sm mb-2">QUICK STATS</h3>
            <div className="grid grid-cols-2 gap-y-2 text-xs text-retro-terminal-green">
              <div>CLASS: <span className="text-retro-purple">Developer</span></div>
              <div>LEVEL: <span className="text-retro-purple">Senior</span></div>
              <div>SPECIALTY: <span className="text-retro-purple">Frontend</span></div>
              <div>ALIGNMENT: <span className="text-retro-purple">Chaotic Good</span></div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col h-full">
          {/* Character container with same height as the left column */}
          <div className="bg-retro-terminal-black p-6 border-2 border-retro-purple rounded-lg pixel-corners w-full h-full flex flex-col items-center justify-between hover:border-retro-pixel-yellow transition-colors duration-300">
            <h3 className="text-retro-pixel-yellow font-pixel text-lg">YOUR CHARACTER</h3>
            
            {/* Health bar */}
            <div className="w-full px-4 mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-retro-terminal-green font-pixel text-xs">HP</span>
                <span className="text-retro-terminal-green font-pixel text-xs">{healthPoints}/100</span>
              </div>
              <div className="w-full h-3 bg-retro-dark-purple rounded-sm overflow-hidden">
                <div 
                  className="h-full transition-all duration-300 ease-in-out" 
                  style={{ 
                    width: `${healthPoints}%`,
                    backgroundColor: healthPoints > 50 ? '#50fa7b' : healthPoints > 25 ? '#ffb86c' : '#ff5555'
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <button 
                  onClick={() => handleHealthChange(-10)}
                  className="text-xs px-2 py-1 bg-retro-dark-purple border border-retro-purple text-retro-terminal-green hover:bg-retro-purple hover:text-black transition-colors duration-200 rounded"
                >
                  -10 HP
                </button>
                <button 
                  onClick={() => handleHealthChange(10)}
                  className="text-xs px-2 py-1 bg-retro-dark-purple border border-retro-purple text-retro-terminal-green hover:bg-retro-purple hover:text-black transition-colors duration-200 rounded"
                >
                  +10 HP
                </button>
              </div>
            </div>
            
            <PixelSprite className="my-4" onClick={handleSpriteClick} />
            
            {/* Stat boosters */}
            <div className="w-full px-4 mb-4">
              <h4 className="text-retro-terminal-green font-pixel text-sm mb-2">STATS (CLICK TO BOOST)</h4>
              <div className="space-y-2 w-full">
                {Object.entries(gameStats).map(([stat, value]) => (
                  <HoverCard key={stat}>
                    <HoverCardTrigger asChild>
                      <div 
                        className="cursor-pointer group flex items-center" 
                        onClick={() => handleStatBoost(stat as keyof typeof gameStats)}
                      >
                        <span className="text-retro-terminal-green font-pixel text-xs w-24 capitalize">{stat}</span>
                        <Progress 
                          value={value} 
                          className="h-2 flex-grow bg-retro-dark-purple group-hover:bg-retro-dark-purple/70"
                        />
                        <span className="text-retro-terminal-green font-pixel text-xs ml-2 w-8">{value}</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 bg-retro-terminal-black border border-retro-purple text-retro-terminal-green p-4">
                      <p className="text-xs">Click to boost your {stat} stat by 5 points!</p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
            
            {/* Mini achievements section */}
            <div className="w-full px-4">
              <h4 className="text-retro-terminal-green font-pixel text-sm mb-2">ACHIEVEMENTS</h4>
              <div className="flex justify-around">
                {achievements.map((achievement) => (
                  <HoverCard key={achievement.id}>
                    <HoverCardTrigger asChild>
                      <div 
                        className={`cursor-pointer p-2 rounded-full border-2 
                          ${achievement.unlocked 
                            ? 'border-retro-pixel-yellow bg-retro-dark-purple' 
                            : 'border-retro-purple/30 bg-retro-dark-purple/30'
                          }`}
                        onClick={() => !achievement.unlocked && unlockAchievement(achievement.id)}
                      >
                        <TrophyIcon 
                          size={20} 
                          className={achievement.unlocked ? 'text-retro-pixel-yellow' : 'text-retro-purple/30'} 
                        />
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 bg-retro-terminal-black border border-retro-purple text-retro-terminal-green p-4">
                      <p className="text-xs font-pixel mb-1">{achievement.name}</p>
                      <p className="text-xs">
                        {achievement.unlocked 
                          ? 'Achievement unlocked!' 
                          : 'Click to unlock this achievement!'}
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
            
            <p className="text-retro-terminal-green font-mono text-center text-sm mt-4">
              Click the sprite to interact!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSectionContent;
