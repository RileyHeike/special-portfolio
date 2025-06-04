
import React, { useState } from 'react';
import { GraduationCap, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface EducationSectionContentProps {
  isSoundOn?: boolean;
}

const EducationSectionContent: React.FC<EducationSectionContentProps> = ({ isSoundOn = false }) => {
  const playExpandSound = () => {
    if (!isSoundOn) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Expand sound
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.2);
    
    oscillator.type = 'triangle';
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const education = [
    {
      degree: "Finance and Computer Science",
      institution: "Santa Clara University",
      location: "Santa Clara, CA",
      period: "2022 - 2026",
      description: "Computer Science and Finance double major with a Math minor.",
      activities: ["Alpha Kappa Psi", "Taiwanese Student Association", "KSCU", "Theta Tau", "SCU Imaginarium"],
      skills: ["Python", "C++", "Data Structures", "Algorithms", "Machine Learning", "Finance Fundamentals"],
      courses: [
        "Advanced Programming",
        "Data Structures & Algorithms",
        "Object Oriented Programming",
        "Applied Valuation for M&A",
        "Financial Modeling",
        "Corporate Banking",
      ]
    },
    {
      degree: "High School Diploma",
      institution: "Middlesex County Academy for Allied Health & Biomedical Sciences",
      location: "New Jersey",
      period: "2018 - 2022",
      description: "Clinical and Biomedical Sciences program with a focus on Computer Science.",
      activities: ["Varsity Basketball Captain"],
      skills: ["Clinical Research", "Biomedical Data Analysis", "Programming Fundamentals"],
      courses: ["Capstone Project: Correlation of Sedentary Electronic Device Usage with Joint ROM"]
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-3xl font-pixel text-retro-purple mb-6">
        <span className="text-retro-terminal-green">&gt;</span> EDUCATION QUEST LOG
      </h2>
      
      <div className="space-y-8">
        {education.map((edu, index) => (
          <div 
            key={index}
            className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners transition-all duration-300 hover:border-retro-terminal-green"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-retro-terminal-green font-pixel text-lg">{edu.degree}</h3>
                <div className="flex items-center mt-2 text-retro-purple">
                  <GraduationCap size={16} className="mr-2" />
                  <span className="font-mono">{edu.institution}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                <div className="flex items-center text-retro-amber">
                  <Calendar size={16} className="mr-2" />
                  <span className="font-mono">{edu.period}</span>
                </div>
                <div className="flex items-center mt-1 text-retro-neon-blue">
                  <MapPin size={16} className="mr-2" />
                  <span className="font-mono">{edu.location}</span>
                </div>
              </div>
            </div>
            
            <p className="text-retro-terminal-green font-mono mb-4">{edu.description}</p>
            
            <Accordion type="single" collapsible className="border-0" onValueChange={(value) => value && playExpandSound()}>
              <AccordionItem value={`item-${index}`} className="border-0">
                <AccordionTrigger className="py-0 hover:no-underline">
                  <div className="bg-retro-dark-purple text-retro-terminal-green px-3 py-1 rounded font-mono text-xs flex items-center">
                    <span>Show Details</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-retro-pixel-yellow font-pixel text-sm mb-2">INVOLVEMENTS</h4>
                      <ul className="list-disc list-inside text-retro-terminal-green font-mono">
                        {edu.activities.map((involvement, i) => (
                          <li key={i} className="mb-1">{involvement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-retro-pixel-green font-pixel text-sm mb-2">SKILLS ACQUIRED</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.skills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="bg-retro-dark-purple text-retro-terminal-green px-2 py-1 rounded font-mono text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-retro-pixel-blue font-pixel text-sm mb-2">KEY COURSES</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-retro-terminal-green font-mono">
                      {edu.courses.map((course, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-retro-purple mr-2">•</span>
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSectionContent;
