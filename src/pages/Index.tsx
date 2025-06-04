
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
  const [isSoundOn, setIsSoundOn] = useState(false);
  const { toast } = useToast();

  const playScoreSound = () => {
    if (!isSoundOn) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Higher pitched sound for score increase
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1500, audioContext.currentTime + 0.2);
    
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

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
    const konamiCode = [
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
          setScore(prev => prev + 300);
          playScoreSound();
          toast({
            title: "SECRET CODE!",
            description: "You found the Konami code! +300 points!",
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
  }, [toast, isSoundOn]);

  const handleCollectCoin = (coinId: string, value: number = 50) => {
    if (!coins[coinId]) {
      setCoins(prev => ({ ...prev, [coinId]: true }));
      setScore(prev => prev + value);
      playScoreSound();
      
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
        return <HomeSectionContent onInteraction={() => {}} score={score} />;
      case 'education':
        return <EducationSectionContent isSoundOn={isSoundOn} />;
      case 'experience':
        return <ExperienceSectionContent />;
      case 'projects':
        return <ProjectsSectionContent onCollectCoin={handleCollectCoin} coins={coins} isSoundOn={isSoundOn} />;
      case 'about':
        return <AboutSectionContent />;
      default:
        return <HomeSectionContent onInteraction={() => {}} score={score} />;
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
          isSoundOn={isSoundOn}
          setIsSoundOn={setIsSoundOn}
        >
          {renderContent()}
        </MainLayout>
      )}
    </>
  );
};

export default Index;
