
import React, { useState, ReactNode, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Coin from '@/components/Coin';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Home, 
  GraduationCap, 
  Briefcase, 
  Users, 
  User, 
  Gamepad2,
  Trophy,
  Volume2,
  VolumeX
} from 'lucide-react';

interface MainLayoutProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  children: ReactNode;
  score?: number;
  onCollectCoin?: (id: string, value: number) => void;
  coins?: Record<string, boolean>;
  isSoundOn?: boolean;
  setIsSoundOn?: (value: boolean) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  activeSection, 
  setActiveSection, 
  children,
  score = 0,
  onCollectCoin,
  coins = {},
  isSoundOn = false,
  setIsSoundOn
}) => {
  const { toast } = useToast();
  const [headerClickCount, setHeaderClickCount] = useState(0);
  const isMobile = useIsMobile();
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(false);

  // Check for very small screens
  useEffect(() => {
    const checkScreenSize = () => {
      setIsVerySmallScreen(window.innerWidth < 400);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const playSound = (type: 'click' | 'coin' | 'success') => {
    if (!isSoundOn) return;
    
    // Create simple beep sounds using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different sound types
    switch (type) {
      case 'click':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        break;
      case 'coin':
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
        break;
      case 'success':
        oscillator.frequency.setValueAtTime(1500, audioContext.currentTime);
        break;
    }
    
    oscillator.type = 'square';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const toggleSound = () => {
    if (setIsSoundOn) {
      setIsSoundOn(!isSoundOn);
      playSound('click');
      toast({
        title: isSoundOn ? "Sound OFF" : "Sound ON",
        description: isSoundOn ? "Game sound effects disabled" : "Game sound effects enabled",
        duration: 1500,
      });
    }
  };

  const handleHeaderClick = () => {
    playSound('click');
    setHeaderClickCount(prev => prev + 1);
    
    // Easter egg: Click header 5 times
    if (headerClickCount === 4 && onCollectCoin) {
      onCollectCoin('header-easter-egg', 100);
      playSound('success');
      toast({
        title: "SECRET FOUND!",
        description: "You found a hidden easter egg! +100 points!",
        duration: 2000,
      });
    }
  };

  const handleNavClick = (section: string) => {
    playSound('click');
    setActiveSection(section);
  };

  const navItems = [
    { id: 'home', label: 'HOME', icon: <Home size={16} /> },
    { id: 'education', label: 'EDUCATION', icon: <GraduationCap size={16} /> },
    { id: 'experience', label: 'EXPERIENCE', icon: <Briefcase size={16} /> },
    { id: 'projects', label: 'LEADERSHIP', icon: <Users size={16} /> },
    { id: 'about', label: 'ABOUT ME', icon: <User size={16} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header 
        className="p-4 border-b border-retro-purple bg-retro-dark-purple"
        onClick={handleHeaderClick}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="text-retro-purple" size={24} />
            <h1 className="text-lg md:text-2xl font-pixel text-retro-purple tracking-wider">
              {isVerySmallScreen ? "KRISTY" : "KRISTY CHEREATH"}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            {/* Score display - same height as sound button */}
            <div className="h-9 flex items-center space-x-2 bg-retro-terminal-black px-3 py-1 rounded border border-retro-purple">
              <Trophy size={16} className="text-retro-pixel-yellow" />
              {!isMobile && (
                <span className="font-pixel text-retro-pixel-yellow text-xs">SCORE: {score}</span>
              )}
              {isMobile && (
                <span className="font-pixel text-retro-pixel-yellow text-xs">{score}</span>
              )}
            </div>
            
            {/* Sound toggle - using Button with size="sm" which is h-9 */}
            <Button 
              variant="outline" 
              size="sm"
              className="font-pixel text-xs border-retro-purple text-retro-purple hover:bg-retro-purple hover:text-retro-dark-purple"
              onClick={toggleSound}
            >
              {isMobile ? (
                isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} />
              ) : (
                isSoundOn ? 'SOUND: ON' : 'SOUND: OFF'
              )}
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
                onClick={() => handleNavClick(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4 overflow-hidden">
        <div className="bg-retro-dark-purple border-2 border-retro-purple p-4 rounded-lg pixel-corners min-h-[70vh] overflow-hidden">
          {children}
        </div>
      </main>

      <footer className="p-4 border-t border-retro-purple bg-retro-dark-purple text-center text-xs font-mono text-retro-purple relative">
        {/* Hidden coin in the footer */}
        <div className="absolute bottom-3 right-3 opacity-30 hover:opacity-100 transition-opacity duration-300">
          {onCollectCoin && (
            <Coin 
              id="footer-coin" 
              value={25} 
              onCollect={onCollectCoin}
              isCollected={coins['footer-coin'] || false}
            />
          )}
        </div>
        
        <p>&copy; 2025 KRISTY CHEREATH</p>
      </footer>

      <div className="scanline"></div>
    </div>
  );
};

export default MainLayout;
