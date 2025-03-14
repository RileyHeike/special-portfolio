
import React from 'react';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';

const ExperienceSectionContent: React.FC = () => {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "Silicon Valley",
      period: "2020 - Present",
      description: "Leading a team of 5 developers on mission-critical web applications. Implementing modern React architecture and performance optimizations.",
      highlights: [
        "Reduced application load time by 40%",
        "Implemented CI/CD pipeline",
        "Developed component library used across multiple projects"
      ],
      technologies: ["React", "TypeScript", "Redux", "Next.js", "GraphQL", "TailwindCSS"]
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions Ltd.",
      location: "Tech Hub City",
      period: "2018 - 2020",
      description: "Developed responsive web applications for enterprise clients. Collaborated with UX/UI designers to implement pixel-perfect interfaces.",
      highlights: [
        "Built 3 major client-facing applications",
        "Improved accessibility compliance across all products",
        "Mentored junior developers"
      ],
      technologies: ["JavaScript", "Vue.js", "SCSS", "Jest", "Webpack", "REST APIs"]
    },
    {
      title: "Web Developer Intern",
      company: "Startup Accelerator",
      location: "Innovation District",
      period: "2017 - 2018",
      description: "Assisted in developing web applications for startups. Gained hands-on experience with modern web technologies.",
      highlights: [
        "Created responsive landing pages for 5 startups",
        "Implemented analytics tracking",
        "Designed and developed interactive UI components"
      ],
      technologies: ["HTML/CSS", "JavaScript", "Bootstrap", "jQuery", "PHP", "MySQL"]
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-3xl font-pixel text-retro-purple mb-6">
        <span className="text-retro-terminal-green">&gt;</span> CAREER BATTLE LOG
      </h2>
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners transition-transform hover:translate-x-1 hover:-translate-y-1"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-retro-terminal-green font-pixel text-lg">{exp.title}</h3>
                <div className="flex items-center mt-2 text-retro-purple">
                  <Briefcase size={16} className="mr-2" />
                  <span className="font-mono">{exp.company}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                <div className="flex items-center text-retro-amber">
                  <Calendar size={16} className="mr-2" />
                  <span className="font-mono">{exp.period}</span>
                </div>
                <div className="flex items-center mt-1 text-retro-neon-blue">
                  <MapPin size={16} className="mr-2" />
                  <span className="font-mono">{exp.location}</span>
                </div>
              </div>
            </div>
            
            <p className="text-retro-terminal-green font-mono mb-4">{exp.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-retro-pixel-yellow font-pixel text-sm mb-2 flex items-center">
                  <Award size={14} className="mr-2" />
                  KEY ACHIEVEMENTS
                </h4>
                <ul className="list-disc list-inside text-retro-terminal-green font-mono">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="mb-1">{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-retro-pixel-green font-pixel text-sm mb-2">TECH SKILLS</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="bg-retro-dark-purple text-retro-terminal-green px-2 py-1 rounded font-mono text-xs"
                    >
                      {tech}
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

export default ExperienceSectionContent;
