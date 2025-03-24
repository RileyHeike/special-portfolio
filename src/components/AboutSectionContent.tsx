
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Terminal, 
  Coffee, 
  Code, 
  Gamepad, 
  BookOpen, 
  Music, 
  Camera 
} from 'lucide-react';
import Coin from '@/components/Coin';

interface AboutSectionContentProps {
  onCollectCoin?: (id: string, value: number) => void;
  coins?: Record<string, boolean>;
}

const AboutSectionContent: React.FC<AboutSectionContentProps> = ({ 
  onCollectCoin,
  coins = {}
}) => {
  return (
    <div className="p-4">
      <h2 className="text-xl md:text-3xl font-pixel text-retro-purple mb-6">
        <span className="text-retro-terminal-green">&gt;</span> ABOUT ME
      </h2>
      
      <ScrollArea className="h-[65vh] pr-4 scrollbar-hidden">
        <div className="space-y-8">
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners relative">
            <h3 className="text-retro-terminal-green font-pixel text-lg mb-4 flex items-center">
              <Terminal className="mr-2" size={20} />
              BIO
            </h3>
            <div className="text-retro-terminal-green font-mono space-y-4 relative">
              <p>
                Hello! I'm a passionate developer with a love for both front-end and back-end technologies.
                I enjoy creating responsive, user-friendly applications that solve real-world problems.
              </p>
              <p>
                My journey in tech began with humble HTML and CSS experiments, which quickly evolved into
                a deep fascination with JavaScript frameworks and server-side programming.
              </p>
              <p>
                When I'm not coding, you can find me gaming, reading sci-fi novels, or exploring the outdoors.
                I believe in continuous learning and am always excited to tackle new challenges.
              </p>
              
              {/* Add coin in the bio section */}
              {onCollectCoin && (
                <div className="absolute bottom-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Coin 
                    id="about-bio-coin" 
                    value={50} 
                    onCollect={onCollectCoin}
                    isCollected={coins['about-bio-coin'] || false}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
            <h3 className="text-retro-terminal-green font-pixel text-lg mb-4 flex items-center">
              <Code className="mr-2" size={20} />
              DEVELOPMENT PHILOSOPHY
            </h3>
            <div className="text-retro-terminal-green font-mono space-y-4">
              <p>
                I believe in clean, maintainable code that prioritizes user experience.
                My approach combines thoughtful planning with agile execution.
              </p>
              <p>
                I value elegant solutions that balance technical excellence with practical considerations.
                Every project is an opportunity to refine my craft and expand my skillset.
              </p>
            </div>
          </div>
          
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
            <h3 className="text-retro-terminal-green font-pixel text-lg mb-4 flex items-center">
              <Coffee className="mr-2" size={20} />
              DAILY ROUTINE
            </h3>
            <div className="text-retro-terminal-green font-mono">
              <ul className="list-disc list-inside space-y-2">
                <li>Morning code review with coffee</li>
                <li>Focused development sprints</li>
                <li>Team collaboration and knowledge sharing</li>
                <li>Learning new technologies</li>
                <li>Evening wind-down with tech articles</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
            <h3 className="text-retro-terminal-green font-pixel text-lg mb-4 flex items-center">
              <Gamepad className="mr-2" size={20} />
              HOBBIES & INTERESTS
            </h3>
            <div className="grid grid-cols-2 gap-4 text-retro-terminal-green font-mono">
              <div>
                <h4 className="text-retro-pixel-yellow font-pixel text-sm mb-2 flex items-center">
                  <BookOpen className="mr-1" size={16} />
                  READING
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Science Fiction</li>
                  <li>Technical books</li>
                  <li>Fantasy novels</li>
                </ul>
              </div>
              <div>
                <h4 className="text-retro-pixel-yellow font-pixel text-sm mb-2 flex items-center">
                  <Gamepad className="mr-1" size={16} />
                  GAMING
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Retro arcade games</li>
                  <li>RPGs</li>
                  <li>Strategy games</li>
                </ul>
              </div>
              <div>
                <h4 className="text-retro-pixel-yellow font-pixel text-sm mb-2 flex items-center">
                  <Music className="mr-1" size={16} />
                  MUSIC
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Electronic</li>
                  <li>Lo-fi</li>
                  <li>Ambient</li>
                </ul>
              </div>
              <div>
                <h4 className="text-retro-pixel-yellow font-pixel text-sm mb-2 flex items-center">
                  <Camera className="mr-1" size={16} />
                  PHOTOGRAPHY
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Urban landscapes</li>
                  <li>Night photography</li>
                  <li>Tech setups</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AboutSectionContent;
