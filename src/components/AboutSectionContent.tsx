
import React from 'react';
import { Heart, Star, Coffee, Music, Gamepad, Book } from 'lucide-react';
import InterestsPanel from './about/InterestsPanel';
import SkillBar, { Skill } from './about/SkillBar';
import { Interest } from './about/InterestItem';

const AboutSectionContent: React.FC = () => {
  const personalInfo = {
    bio: "Hi there! I'm a passionate web developer with a love for creating engaging user experiences. When I'm not coding, you can find me playing retro games, hiking in nature, or experimenting with new recipes.",
    interests: [
      { 
        icon: <Gamepad size={16} />, 
        text: "Retro Gaming",
        description: "I collect and play classic games from the 80s and 90s. My favorites include Super Metroid, Chrono Trigger, and the original Legend of Zelda. I even maintain a small collection of working retro consoles!",
        fact: "I once participated in a 24-hour retro gaming marathon for charity."
      },
      { 
        icon: <Book size={16} />, 
        text: "Sci-Fi Novels",
        description: "I'm an avid reader of science fiction, especially works by Asimov, Le Guin, and Gibson. The blend of futuristic technology and human experience fascinates me.",
        fact: "I have a first edition of Neuromancer in my book collection."
      },
      { 
        icon: <Music size={16} />, 
        text: "Synth Music",
        description: "I'm passionate about synthesizer music and electronic production. I even create my own tracks using a modest home studio setup with analog and digital synthesizers.",
        fact: "I released a small EP of synthwave tracks on Bandcamp last year."
      },
      { 
        icon: <Coffee size={16} />, 
        text: "Coffee Brewing",
        description: "I'm a coffee enthusiast who enjoys experimenting with different brewing methods. From pour-over to AeroPress, I'm always looking to perfect the extraction.",
        fact: "I roast small batches of coffee beans at home using a modified popcorn maker."
      }
    ] as Interest[],
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
      ] as Skill[],
      soft: [
        { name: "Problem Solving", level: 90 },
        { name: "Communication", level: 85 },
        { name: "Teamwork", level: 85 },
        { name: "Adaptability", level: 80 },
        { name: "Time Management", level: 75 }
      ] as Skill[]
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
            <InterestsPanel interests={personalInfo.interests} />
            
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
                <SkillBar 
                  key={index} 
                  skill={skill} 
                  colorClass="bg-retro-neon-blue text-retro-neon-blue" 
                />
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
                <SkillBar 
                  key={index} 
                  skill={skill} 
                  colorClass="bg-retro-amber text-retro-amber" 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSectionContent;
