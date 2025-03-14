
import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const EducationSectionContent: React.FC = () => {
  const education = [
    {
      degree: "Master of Computer Science",
      institution: "University of Technology",
      location: "Tech City",
      period: "2018 - 2020",
      description: "Specialized in Artificial Intelligence and Machine Learning. Completed thesis on Neural Networks.",
      achievements: ["3.9 GPA", "President's Honor List", "Algorithms Competition Winner"],
      skills: ["Machine Learning", "Neural Networks", "Algorithm Design"]
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "State University",
      location: "Innovation Valley",
      period: "2014 - 2018",
      description: "Focused on Software Engineering and Data Structures. Participated in multiple hackathons.",
      achievements: ["3.8 GPA", "Dean's List", "Best Project Award"],
      skills: ["Java", "Python", "Data Structures", "Algorithms"]
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
            className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners transition-transform hover:translate-x-1 hover:-translate-y-1"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSectionContent;
