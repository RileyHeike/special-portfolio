import React from 'react';
import PixelSprite from './PixelSprite';
import { Heart, Star, Coffee, Music, Gamepad, Book } from 'lucide-react';

const AboutSectionContent: React.FC = () => {
  const personalInfo = {
    bio: "Hi there! I'm a passionate web developer with a love for creating engaging user experiences. When I'm not coding, you can find me playing retro games, hiking in nature, or experimenting with new recipes.",
    interests: [
      { icon: <Gamepad size={16} />, text: "Retro Gaming" },
      { icon: <Book size={16} />, text: "Sci-Fi Novels" },
      { icon: <Music size={16} />, text: "Synth Music" },
      { icon: <Coffee size={16} />, text: "Coffee Brewing" }
    ],
    funFacts: [
      "I've beaten every Final Fantasy game",
      "I can solve a Rubik's cube in under 2 minutes",
      "I collect vintage gaming consoles",
      "I once wrote a game in BASIC on an Apple II"
    ],
    skills: {
      technical: [
        { name: "React", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "CSS/SCSS", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "GraphQL", level: 70 }
      ],
      soft: [
        { name: "Problem Solving", level: 90 },
        { name: "Communication", level: 85 },
        { name: "Teamwork", level: 85 },
        { name: "Adaptability", level: 80 },
        { name: "Time Management", level: 75 }
      ]
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-3xl font-pixel text-retro-purple mb-6">
        <span className="text-retro-terminal-green">&gt;</span> CHARACTER PROFILE
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners mb-6">
            <h3 className="text-retro-terminal-green font-pixel text-lg mb-3">BIO</h3>
            <p className="text-retro-terminal-green font-mono">{personalInfo.bio}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
              <h3 className="text-retro-pixel-yellow font-pixel text-lg mb-3 flex items-center">
                <Star size={16} className="mr-2 text-retro-pixel-yellow" />
                INTERESTS
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {personalInfo.interests.map((interest, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-2 text-retro-purple">{interest.icon}</div>
                    <span className="text-retro-terminal-green font-mono">{interest.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
              <h3 className="text-retro-pixel-green font-pixel text-lg mb-3 flex items-center">
                <Heart size={16} className="mr-2 text-retro-pixel-red" />
                FUN FACTS
              </h3>
              <ul className="list-disc list-inside text-retro-terminal-green font-mono">
                {personalInfo.funFacts.map((fact, index) => (
                  <li key={index} className="mb-1">{fact}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
            <h3 className="text-retro-neon-blue font-pixel text-lg mb-3">TECHNICAL SKILLS</h3>
            <div className="space-y-3">
              {personalInfo.skills.technical.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-retro-terminal-green font-mono">{skill.name}</span>
                    <span className="text-retro-neon-blue font-mono">{skill.level}/100</span>
                  </div>
                  <div className="w-full h-3 bg-retro-dark-purple rounded-sm overflow-hidden">
                    <div 
                      className="h-full bg-retro-neon-blue" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners mb-6 flex flex-col items-center w-full mx-auto">
            <div className="p-4 bg-retro-dark-purple rounded-lg mb-4 w-full flex justify-center">
              <img src="/about-profile-pic.jpeg" alt="Profile Picture" className="rounded-lg" />
            </div>
          </div>
          
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
            <h3 className="text-retro-amber font-pixel text-lg mb-3">SOFT SKILLS</h3>
            <div className="space-y-3">
              {personalInfo.skills.soft.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-retro-terminal-green font-mono">{skill.name}</span>
                    <span className="text-retro-amber font-mono">{skill.level}/100</span>
                  </div>
                  <div className="w-full h-3 bg-retro-dark-purple rounded-sm overflow-hidden">
                    <div 
                      className="h-full bg-retro-amber" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSectionContent;
