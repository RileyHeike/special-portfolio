
import React from 'react';
import { Heart, Star, Coffee, Music, Gamepad, Book, Mountain } from 'lucide-react';
import InterestsPanel from './about/InterestsPanel';
import SkillBar, { Skill } from './about/SkillBar';
import ConnectPanel from './about/ConnectPanel';
import { Interest } from './about/InterestItem';

const AboutSectionContent: React.FC = () => {
  const personalInfo = {
    bio: "Hi there! I'm glad you found your way to my portfolio. As a Finance/CS double-major, I am interested in data, the intersection between technology and the business world, and financial services. When I'm not coding, you can find me exploring the outdoors, reading a good book, or enjoying a cup of coffee. Feel free to reach out to me at kchereath@scu.edu or connect with me using the links below!",
    interests: [
      { 
        icon: <Mountain size={16} />, 
        text: "Outdoors",
        description: "I love to hike, backpack and explore the great outdoors. Whether it's a weekend trip to the mountains or a day hike in a local park, I find peace and inspiration in nature.",
        fact: "I spent a weekend in the Italian Dolomites last fall!"
      },
      { 
        icon: <Book size={16} />, 
        text: "Reading",
        description: "I like to wind down by reading, preferably in a nice chair in the sun. I enjoy a wide range of genres, and I'm always looking for new recommendations.",
        fact: "My favorite book is 'The Alchemist' by Paulo Coelho, which I find incredibly inspiring."
      },
      { 
        icon: <Music size={16} />, 
        text: "Music",
        description: "I have a radio show on KSCU radio station, where I play a mix of indie, classic rock, and country music. I love discovering new artists and sharing my favorites with others.",
        fact: "My top artist on Spotify last year was Taylor Swift."
      },
      { 
        icon: <Coffee size={16} />, 
        text: "Coffee",
        description: "If I make it out of bed in the morning, it's not without a cup of coffee. I enjoy trying different cafes, and always love a good pour-over.",
        fact: "I used to have 3 shots of espresso every morning, but now I prefer a single pour-over to start my day."
      }
    ] as Interest[],
    funFacts: [
      "I have a dog named Lulu, who is my favorite thing in the world",
      "I have a collection of over 70 CDs",
      "I can play the piano and the harmonica",
    ],
    skills: {
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
          
          <ConnectPanel />
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
