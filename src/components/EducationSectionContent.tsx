
import React, { useState } from 'react';
import { GraduationCap, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const EducationSectionContent: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  
  const education = [
    {
      degree: "Master of Computer Science",
      institution: "University of Technology",
      location: "Tech City",
      period: "2018 - 2020",
      description: "Specialized in Artificial Intelligence and Machine Learning. Completed thesis on Neural Networks.",
      achievements: ["3.9 GPA", "President's Honor List", "Algorithms Competition Winner"],
      skills: ["Machine Learning", "Neural Networks", "Algorithm Design"],
      courses: [
        "Advanced Machine Learning",
        "Neural Network Architectures",
        "Natural Language Processing",
        "Computer Vision Systems",
        "Data Mining & Analysis"
      ]
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "State University",
      location: "Innovation Valley",
      period: "2014 - 2018",
      description: "Focused on Software Engineering and Data Structures. Participated in multiple hackathons.",
      achievements: ["3.8 GPA", "Dean's List", "Best Project Award"],
      skills: ["Java", "Python", "Data Structures", "Algorithms"],
      courses: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Database Systems",
        "Web Development",
        "Computer Networks"
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-3xl font-pixel text-retro-purple mb-6">
        <span className="text-retro-terminal-green">&gt;</span> EDUCATION QUEST LOG
      </h2>
      
      <div className="space-y-8">
        {education.map((edu, index) => (
          <Collapsible 
            key={index}
            open={openItems[index]}
            onOpenChange={() => toggleItem(index)}
            className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners transition-all duration-300 hover:border-retro-terminal-green"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <CollapsibleTrigger className="flex items-center cursor-pointer w-full text-left">
                  <h3 className="text-retro-terminal-green font-pixel text-lg mr-2">{edu.degree}</h3>
                  {openItems[index] ? 
                    <ChevronUp size={16} className="text-retro-terminal-green" /> : 
                    <ChevronDown size={16} className="text-retro-terminal-green" />
                  }
                </CollapsibleTrigger>
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
            
            <CollapsibleContent className="animate-accordion-down space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-retro-pixel-yellow font-pixel text-sm mb-2">ACHIEVEMENTS</h4>
                  <ul className="list-disc list-inside text-retro-terminal-green font-mono">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="mb-1">{achievement}</li>
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
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default EducationSectionContent;
