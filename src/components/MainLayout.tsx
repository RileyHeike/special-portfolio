
import React, { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Home, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  User, 
  Gamepad2,
  Trophy,
  Coins
} from 'lucide-react';
import Coin from './Coin';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

interface MainLayoutProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  children: ReactNode;
  score?: number;
  onHeaderClick?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  activeSection, 
  setActiveSection, 
  children,
  score = 0,
  onHeaderClick
}) => {
  const { toast } = useToast();
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    toast({
      title: isSoundOn ? "Sound OFF" : "Sound ON",
      description: isSoundOn ? "Game sound effects disabled" : "Game sound effects enabled",
      duration: 1500,
    });
  };

  const handleHeaderClick = () => {
    const now = Date.now();
    if (now - lastClickTime < 500) { // Double click detected
      if (onHeaderClick) onHeaderClick();
    }
    setLastClickTime(now);
  };

  const navItems = [
    { id: 'home', label: 'HOME', icon: <Home size={16} /> },
    { id: 'education', label: 'EDUCATION', icon: <GraduationCap size={16} /> },
    { id: 'experience', label: 'EXPERIENCE', icon: <Briefcase size={16} /> },
    { id: 'projects', label: 'PROJECTS', icon: <FolderGit2 size={16} /> },
    { id: 'about', label: 'ABOUT ME', icon: <User size={16} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header 
        className="p-4 border-b border-retro-purple bg-retro-dark-purple"
        onDoubleClick={handleHeaderClick}
      >
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="text-retro-purple" size={24} />
            <h1 className="text-lg md:text-2xl font-pixel text-retro-purple tracking-wider">RETRO PORTFOLIO</h1>
          </div>
          <div className="flex items-center space-x-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center space-x-2 bg-retro-terminal-black px-3 py-1 rounded border border-retro-purple cursor-help">
                  <Trophy size={16} className="text-retro-pixel-yellow" />
                  <span className="font-pixel text-retro-pixel-yellow text-xs">SCORE: {score}</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="bg-retro-terminal-black border border-retro-purple text-retro-terminal-green font-pixel">
                <p>Find hidden coins to increase your score!</p>
                <p className="mt-2">Tip: Try Alt+Shift+C to reveal coins</p>
              </HoverCardContent>
            </HoverCard>
            <Button 
              variant="outline" 
              size="sm" 
              className="font-pixel text-xs border-retro-purple text-retro-purple hover:bg-retro-purple hover:text-retro-dark-purple"
              onClick={toggleSound}
            >
              {isSoundOn ? 'SOUND: ON' : 'SOUND: OFF'}
            </Button>
          </div>
        </div>
      </header>

      <nav className="bg-retro-dark-purple border-b border-retro-purple">
        <div className="container mx-auto overflow-x-auto scrollbar-hidden">
          <div className="flex min-w-max">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`px-4 py-3 flex items-center space-x-2 font-pixel text-xs transition-colors ${
                  activeSection === item.id ? 
                  'text-retro-terminal-green border-b-2 border-retro-terminal-green' : 
                  'text-retro-purple hover:text-retro-terminal-green'
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4">
        <div className="bg-retro-dark-purple border-2 border-retro-purple p-4 rounded-lg pixel-corners min-h-[70vh]">
          {children}
        </div>
      </main>

      <footer className="p-4 border-t border-retro-purple bg-retro-dark-purple text-center text-xs font-mono text-retro-purple">
        <p>&copy; 2023 RETRO PORTFOLIO | FIND ALL HIDDEN COINS FOR BONUS POINTS</p>
        {score > 0 && (
          <p className="mt-2 font-pixel text-retro-pixel-yellow">YOUR CURRENT SCORE: {score}</p>
        )}
        <div className="opacity-0 hover:opacity-100 transition-opacity mt-2" data-coin="footer">
          <Coin 
            onCollect={() => {
              const event = new CustomEvent('coin-collected', { 
                detail: { id: 'footer-coin', value: 100 } 
              });
              document.dispatchEvent(event);
            }} 
            value={100}
            tooltip="Secret footer coin!"
          />
        </div>
      </footer>

      <div className="scanline"></div>
    </div>
  );
};

export default MainLayout;
