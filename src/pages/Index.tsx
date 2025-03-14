
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
  const { toast } = useToast();

  const handleLoaderComplete = () => {
    setLoading(false);
    
    // Show welcome toast
    toast({
      title: "GAME LOADED",
      description: "Welcome to my retro portfolio! Click around to increase your score!",
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
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.classList.remove('crt');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toast]);

  const incrementScore = () => {
    setScore(prev => prev + 10);
    if (score >= 100 && score % 100 === 0) {
      toast({
        title: "LEVEL UP!",
        description: `You reached ${score} points! Keep exploring!`,
        duration: 2000,
      });
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSectionContent onInteraction={incrementScore} />;
      case 'education':
        return <EducationSectionContent />;
      case 'experience':
        return <ExperienceSectionContent />;
      case 'projects':
        return <ProjectsSectionContent />;
      case 'about':
        return <AboutSectionContent />;
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
        >
          {renderContent()}
        </MainLayout>
      )}
    </>
  );
};

export default Index;
