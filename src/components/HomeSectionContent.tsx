
import React, { useState, useEffect } from 'react';
import PixelSprite from './PixelSprite';
import { Progress } from './ui/progress';
import { Trophy, Zap, Swords, Gamepad, Heart, Trophy as TrophyIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

interface HomeSectionContentProps {
  onInteraction?: () => void;
  score?: number;
}

// Character classes with preset stats
const characterClasses = [
  {
    name: "Warrior",
    stats: { strength: 90, agility: 60, intellect: 40, charisma: 50, luck: 70 },
    description: "A mighty warrior with exceptional strength and combat skills."
  },
  {
    name: "Mage",
    stats: { strength: 30, agility: 50, intellect: 95, charisma: 65, luck: 60 },
    description: "A powerful spellcaster with superior intellect and magical abilities."
  },
  {
    name: "Rogue",
    stats: { strength: 55, agility: 90, intellect: 60, charisma: 50, luck: 80 },
    description: "A stealthy rogue with exceptional agility and luck."
  },
  {
    name: "Bard",
    stats: { strength: 40, agility: 60, intellect: 70, charisma: 95, luck: 65 },
    description: "A charismatic performer with exceptional people skills."
  }
];

// Achievement definitions with score thresholds
const achievementDefinitions = [
  { id: 1, name: "First Visitor", description: "Visit the portfolio for the first time", scoreThreshold: 0 },
  { id: 2, name: "Explorer", description: "Find your first hidden coin", scoreThreshold: 25 },
  { id: 3, name: "Treasure Hunter", description: "Collect 100 points", scoreThreshold: 100 },
  { id: 4, name: "Code Master", description: "Collect 250 points", scoreThreshold: 250 },
  { id: 5, name: "Portfolio Champion", description: "Collect 500 points", scoreThreshold: 500 }
];

const HomeSectionContent: React.FC<HomeSectionContentProps> = ({ onInteraction, score = 0 }) => {
  const [typedText, setTypedText] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [healthPoints, setHealthPoints] = useState(10); // Max 10 hearts
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);
  const [achievements, setAchievements] = useState(achievementDefinitions.map(a => ({
    ...a,
    unlocked: a.scoreThreshold <= score
  })));
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

  // Update achievements based on score
  useEffect(() => {
    setAchievements(achievementDefinitions.map(a => ({
      ...a,
      unlocked: a.scoreThreshold <= score
    })));
  }, [score]);

  // Handle click interactions
  const handleSpriteClick = () => {
    if (onInteraction && !hasInteracted) {
      onInteraction();
      setHasInteracted(true);
      // Reset after a delay to allow multiple interactions
      setTimeout(() => setHasInteracted(false), 2000);
    }
  };

  // Handle class selection
  const handlePreviousClass = () => {
    setSelectedClassIndex(prev => (prev > 0 ? prev - 1 : characterClasses.length - 1));
  };

  const handleNextClass = () => {
    setSelectedClassIndex(prev => (prev < characterClasses.length - 1 ? prev + 1 : 0));
  };

  // Handle health change
  const handleHealthChange = (amount: number) => {
    setHealthPoints(prev => Math.max(0, Math.min(prev + amount, 10)));
  };

  // Get the currently selected class
  const selectedClass = characterClasses[selectedClassIndex];

  // Render hearts for health
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 10; i++) {
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
                <span className="text-retro-neon-blue font-pixel text-lg">{score}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners hover:border-retro-pixel-green transition-colors duration-300 cursor-pointer" onClick={onInteraction}>
            <h3 className="text-retro-pixel-green font-pixel text-sm mb-2">QUICK STATS</h3>
            <div className="grid grid-cols-2 gap-y-2 text-xs text-retro-terminal-green">
              <div>CLASS: <span className="text-retro-purple">{selectedClass.name}</span></div>
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
            
            {/* Health as hearts */}
            <div className="w-full px-4 mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-retro-terminal-green font-pixel text-xs">HP</span>
                <span className="text-retro-terminal-green font-pixel text-xs">{healthPoints}/10</span>
              </div>
              <div className="flex flex-wrap gap-1 justify-center my-2">
                {renderHearts()}
              </div>
              <div className="flex justify-between mt-2">
                <button 
                  onClick={() => handleHealthChange(-1)}
                  className="text-xs px-2 py-1 bg-retro-dark-purple border border-retro-purple text-retro-terminal-green hover:bg-retro-purple hover:text-black transition-colors duration-200 rounded"
                >
                  -1 HP
                </button>
                <button 
                  onClick={() => handleHealthChange(1)}
                  className="text-xs px-2 py-1 bg-retro-dark-purple border border-retro-purple text-retro-terminal-green hover:bg-retro-purple hover:text-black transition-colors duration-200 rounded"
                >
                  +1 HP
                </button>
              </div>
            </div>
            
            {/* Class selection */}
            <div className="w-full px-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-retro-terminal-green font-pixel text-sm">CHARACTER CLASS</h4>
                <div className="text-retro-pixel-yellow font-pixel">{selectedClass.name}</div>
              </div>
              <div className="flex items-center justify-between">
                <button 
                  onClick={handlePreviousClass} 
                  className="p-2 rounded-full border-2 border-retro-purple bg-retro-dark-purple hover:bg-retro-purple/50 transition-colors"
                >
                  <ArrowLeft size={16} className="text-retro-terminal-green" />
                </button>
                <div className="text-xs text-retro-terminal-green text-center px-4">
                  {selectedClass.description}
                </div>
                <button 
                  onClick={handleNextClass} 
                  className="p-2 rounded-full border-2 border-retro-purple bg-retro-dark-purple hover:bg-retro-purple/50 transition-colors"
                >
                  <ArrowRight size={16} className="text-retro-terminal-green" />
                </button>
              </div>
            </div>
            
            <PixelSprite className="my-4" onClick={handleSpriteClick} />
            
            {/* Stats based on selected class */}
            <div className="w-full px-4 mb-4">
              <h4 className="text-retro-terminal-green font-pixel text-sm mb-2">CLASS STATS</h4>
              <div className="space-y-2 w-full">
                {Object.entries(selectedClass.stats).map(([stat, value]) => (
                  <HoverCard key={stat}>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center group">
                        <span className="text-retro-terminal-green font-pixel text-xs w-24 capitalize">{stat}</span>
                        <Progress 
                          value={value} 
                          className="h-2 flex-grow bg-retro-dark-purple"
                        />
                        <span className="text-retro-terminal-green font-pixel text-xs ml-2 w-8">{value}</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 bg-retro-terminal-black border border-retro-purple text-retro-terminal-green p-4">
                      <p className="text-xs">The {selectedClass.name} class has {value}% {stat}.</p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
            
            {/* Achievements based on score */}
            <div className="w-full px-4">
              <h4 className="text-retro-terminal-green font-pixel text-sm mb-2">ACHIEVEMENTS</h4>
              <div className="flex justify-around">
                {achievements.slice(0, 5).map((achievement) => (
                  <HoverCard key={achievement.id}>
                    <HoverCardTrigger asChild>
                      <div 
                        className={`p-2 rounded-full border-2 
                          ${achievement.unlocked 
                            ? 'border-retro-pixel-yellow bg-retro-dark-purple' 
                            : 'border-retro-purple/30 bg-retro-dark-purple/30'
                          }`}
                      >
                        <TrophyIcon 
                          size={20} 
                          className={achievement.unlocked ? 'text-retro-pixel-yellow' : 'text-retro-purple/30'} 
                        />
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 bg-retro-terminal-black border border-retro-purple text-retro-terminal-green p-4">
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
