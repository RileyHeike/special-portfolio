
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
  const [secretCode, setSecretCode] = useState('');
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

      // Track keys pressed for secret codes
      setSecretCode(prev => {
        const newCode = (prev + e.key).slice(-10);
        // Secret code "showmecoins" - reveals all coin locations temporarily
        if (newCode.includes("showmecoins")) {
          toast({
            title: "COIN REVEALER!",
            description: "All coins are now visible for 5 seconds!",
            duration: 3000,
          });
          
          // Show all coins briefly
          document.body.classList.add('reveal-coins');
          setTimeout(() => {
            document.body.classList.remove('reveal-coins');
          }, 5000);
          
          return '';
        }
        return newCode;
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.classList.remove('crt');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toast]);

  const handleCollectCoin = (coinId: string, value: number = 50) => {
    if (!coins[coinId]) {
      setCoins(prev => ({ ...prev, [coinId]: true }));
      setScore(prev => prev + value);
      
      // Check for milestones
      const newScore = score + value;
      if (newScore >= 100 && Math.floor(newScore / 100) > Math.floor(score / 100)) {
        toast({
          title: "LEVEL UP!",
          description: `You reached ${Math.floor(newScore / 100) * 100} points! Keep exploring!`,
          duration: 2000,
        });
      }
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSectionContent onInteraction={() => {}} />;
      case 'education':
        return <EducationSectionContent />;
      case 'experience':
        return <ExperienceSectionContent />;
      case 'projects':
        return <ProjectsSectionContent onCollectCoin={handleCollectCoin} coins={coins} />;
      case 'about':
        return <AboutSectionContent />;
      default:
        return <HomeSectionContent onInteraction={() => {}} />;
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
          onCollectCoin={handleCollectCoin}
          coins={coins}
        >
          {renderContent()}
        </MainLayout>
      )}
    </>
  );
};

export default Index;
