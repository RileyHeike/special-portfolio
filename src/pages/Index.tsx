
import React, { useState, useEffect } from 'react';
import TerminalLoader from '@/components/TerminalLoader';
import MainLayout from '@/components/MainLayout';
import HomeSectionContent from '@/components/HomeSectionContent';
import EducationSectionContent from '@/components/EducationSectionContent';
import ExperienceSectionContent from '@/components/ExperienceSectionContent';
import ProjectsSectionContent from '@/components/ProjectsSectionContent';
import AboutSectionContent from '@/components/AboutSectionContent';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  // Apply CRT effect to the body
  useEffect(() => {
    document.body.classList.add('crt');
    return () => {
      document.body.classList.remove('crt');
    };
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSectionContent />;
      case 'education':
        return <EducationSectionContent />;
      case 'experience':
        return <ExperienceSectionContent />;
      case 'projects':
        return <ProjectsSectionContent />;
      case 'about':
        return <AboutSectionContent />;
      default:
        return <HomeSectionContent />;
    }
  };

  return (
    <>
      {loading ? (
        <TerminalLoader onComplete={handleLoaderComplete} />
      ) : (
        <MainLayout activeSection={activeSection} setActiveSection={setActiveSection}>
          {renderContent()}
        </MainLayout>
      )}
    </>
  );
};

export default Index;
