
import React, { useState, useEffect } from 'react';
import WelcomeMessage from './home/WelcomeMessage';
import StatsPanel from './home/StatsPanel';
import Achievements from './home/Achievements';
import CharacterPanel from './home/CharacterPanel';
import { Achievement } from './home/Achievements';
import { CharacterClass } from './home/CharacterPanel';

interface HomeSectionContentProps {
  onInteraction?: () => void;
  score?: number;
}

// Character class definitions with preset stats
const characterClasses: CharacterClass[] = [
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

// Achievement system with score thresholds
const achievementDefinitions = [
  { id: 1, name: "First Visitor", description: "Visit the portfolio for the first time", scoreThreshold: 0 },
  { id: 2, name: "Explorer", description: "Find your first hidden coin", scoreThreshold: 25 },
  { id: 3, name: "Treasure Hunter", description: "Collect 100 points", scoreThreshold: 100 },
  { id: 4, name: "Code Master", description: "Collect 300 points", scoreThreshold: 300 },
  { id: 5, name: "Portfolio Champion", description: "Collect 600 points", scoreThreshold: 600 }
];

const HomeSectionContent: React.FC<HomeSectionContentProps> = ({ onInteraction, score = 0 }) => {
  // Interaction state
  const [hasInteracted, setHasInteracted] = useState(false);
  const [healthPoints] = useState(10); // Character health (max 10)
  const [achievements, setAchievements] = useState<Achievement[]>(achievementDefinitions.map(a => ({
    ...a,
    unlocked: a.scoreThreshold <= score
  })));
  
  // Welcome message text
  const fullText = "WELCOME TO MY PERSONAL PORTFOLIO! EXPLORE THE DIFFERENT SECTIONS TO LEARN MORE ABOUT ME AND MY WORK. FIND HIDDEN COINS AND EASTER EGGS TO IMPROVE YOUR SCORE.";
  
  // Update achievements when score changes
  useEffect(() => {
    setAchievements(achievementDefinitions.map(a => ({
      ...a,
      unlocked: a.scoreThreshold <= score
    })));
  }, [score]);

  // Handle sprite click interactions
  const handleSpriteClick = () => {
    if (onInteraction && !hasInteracted) {
      onInteraction();
      setHasInteracted(true);
      // Reset after delay to allow multiple interactions
      setTimeout(() => setHasInteracted(false), 2000);
    }
  };

  return (
    <div className="p-4">
      {/* Section header */}
      <h2 className="text-xl md:text-3xl font-pixel text-retro-purple mb-6">
        <span className="text-retro-terminal-green">&gt;</span> PLAYER ONE READY
      </h2>
      
      {/* Main content grid */}
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 flex-grow">
        {/* Left column - Stats and welcome */}
        <div className="w-full md:w-1/2 flex flex-col space-y-6">
          <WelcomeMessage message={fullText} onClick={onInteraction} />
          
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatsPanel title="SKILL LEVEL" color="amber" onClick={onInteraction}>
              <div className="w-full h-4 bg-retro-dark-purple rounded-sm overflow-hidden">
                <div className="h-full bg-retro-amber" style={{ width: '85%' }}></div>
              </div>
            </StatsPanel>
            
            <StatsPanel title="EXP POINTS" color="neon" onClick={onInteraction}>
              <div className="flex justify-center items-center">
                <span className="text-retro-neon-blue font-pixel text-lg">{score}</span>
              </div>
            </StatsPanel>
          </div>
          
          {/* Quick stats panel */}
          <StatsPanel title="QUICK STATS" color="green" onClick={onInteraction}>
            <div className="grid grid-cols-2 gap-y-2 text-xs text-retro-terminal-green">
              <div>LEVEL: <span className="text-retro-purple">Collegiate</span></div>
              <div>CLASS: <span className="text-retro-purple">Senior</span></div>
              <div>SPECIALTY: <span className="text-retro-purple">Finance</span></div>
              <div>ALIGNMENT: <span className="text-retro-purple">Chaotic Neutral</span></div>
            </div>
          </StatsPanel>
          
          {/* Achievements section */}
          <Achievements 
            achievements={achievements} 
            score={score} 
          />
        </div>
        
        {/* Right column - Character panel */}
        <div className="w-full md:w-1/2 flex flex-col h-full">
          <CharacterPanel 
            classes={characterClasses}
            healthPoints={healthPoints}
            onSpriteClick={handleSpriteClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSectionContent;
