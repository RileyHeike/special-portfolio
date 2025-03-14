
import React, { useState, useEffect } from 'react';
import TerminalLoader from '@/components/TerminalLoader';
import MainLayout from '@/components/MainLayout';
import HomeSectionContent from '@/components/HomeSectionContent';
import EducationSectionContent from '@/components/EducationSectionContent';
import ExperienceSectionContent from '@/components/ExperienceSectionContent';
import ProjectsSectionContent from '@/components/ProjectsSectionContent';
import AboutSectionContent from '@/components/AboutSectionContent';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleLoaderComplete = () => {
    setLoading(false);
    
    // Show welcome toast
    toast({
      title: "GAME LOADED",
      description: "Welcome to my retro portfolio! Find hidden coins to increase your score!",
      duration: 3000,
    });
  };

  // Apply CRT effect to the body
  useEffect(() => {
    document.body.classList.add('crt');
    
    // Easter egg: Konami code detector
    let konamiCode = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight', 
      'b', 'a'
    ];
    let konamiIndex = 0;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Konami code
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          // Konami code completed!
          setScore(prev => prev + 1000);
          toast({
            title: "CHEAT CODE ACTIVATED!",
            description: "You found the Konami code! +1000 points!",
            variant: "default",
            duration: 3000,
          });
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
      
      // Easter egg: type "coins" to reveal all coins
      if (e.key === 'c' && e.altKey && e.shiftKey) {
        toast({
          title: "COIN DETECTOR ACTIVATED!",
          description: "All coins temporarily revealed! Quick, find them!",
          duration: 3000,
        });
        
        // Flash all coins
        document.querySelectorAll('[data-coin]').forEach(coin => {
          coin.classList.add('opacity-100', 'animate-pulse');
          setTimeout(() => {
            coin.classList.remove('opacity-100', 'animate-pulse');
          }, 5000);
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.classList.remove('crt');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toast]);

  const incrementScore = (amount = 10) => {
    setScore(prev => prev + amount);
    if (score >= 100 && score % 100 === 0) {
      toast({
        title: "LEVEL UP!",
        description: `You reached ${score} points! Keep exploring!`,
        duration: 2000,
      });
    }
  };

  const collectCoin = (coinId: string, value: number = 50) => {
    if (!coins[coinId]) {
      setCoins(prev => ({ ...prev, [coinId]: true }));
      incrementScore(value);
      
      // Check if the user has found all coins
      const totalCoins = 5; // Update this number if you add more coins
      const foundCoins = Object.values(coins).filter(Boolean).length + 1;
      
      if (foundCoins === totalCoins) {
        toast({
          title: "ALL COINS COLLECTED!",
          description: "You found all hidden coins! +500 bonus points!",
          duration: 4000,
        });
        incrementScore(500); // Bonus for finding all coins
      }
    }
  };

  // Special Easter Egg: Double click on the header
  const triggerHeaderEasterEgg = () => {
    toast({
      title: "SECRET FOUND!",
      description: "You discovered a hidden secret! +200 points!",
      duration: 3000,
    });
    incrementScore(200);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSectionContent onInteraction={incrementScore} />;
      case 'education':
        return <EducationSectionContent onCollectCoin={collectCoin} coins={coins} />;
      case 'experience':
        return <ExperienceSectionContent onCollectCoin={collectCoin} coins={coins} />;
      case 'projects':
        return <ProjectsSectionContent onCollectCoin={collectCoin} coins={coins} />;
      case 'about':
        return <AboutSectionContent onCollectCoin={collectCoin} coins={coins} />;
      default:
        return <HomeSectionContent onInteraction={incrementScore} />;
    }
  };

  return (
    <>
      {loading ? (
        <TerminalLoader onComplete={handleLoaderComplete} />
      ) : (
        <MainLayout 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          score={score}
          onHeaderClick={triggerHeaderEasterEgg}
        >
          {renderContent()}
        </MainLayout>
      )}
    </>
  );
};

export default Index;
