
import React, { useState } from 'react';
import PixelSprite from './PixelSprite';
import { Heart, Star, Coffee, Music, Gamepad, Book, X } from 'lucide-react';
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from './ui/dialog';

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
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className="flex items-center cursor-pointer hover:bg-retro-dark-purple/50 p-2 rounded transition-colors">
                        <div className="mr-2 text-retro-purple">{interest.icon}</div>
                        <span className="text-retro-terminal-green font-mono">{interest.text}</span>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-retro-terminal-black border-2 border-retro-purple pixel-corners max-w-md animate-in data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-5">
                      <DialogHeader>
                        <DialogTitle className="text-retro-pixel-yellow font-pixel flex items-center">
                          <div className="mr-2 text-retro-purple">{interest.icon}</div>
                          {interest.text}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 text-retro-terminal-green font-mono">
                        <p className="mb-4">{interest.description}</p>
                        <div className="bg-retro-dark-purple p-3 rounded-lg mb-2">
                          <p className="text-sm font-pixel text-retro-pixel-yellow mb-1">FUN FACT</p>
                          <p className="text-sm">{interest.fact}</p>
                        </div>
                      </div>
                      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4 text-retro-pixel-yellow" />
                        <span className="sr-only">Close</span>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
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
