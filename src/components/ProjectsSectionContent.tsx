
import React, { useState } from 'react';
import { FolderGit2, Globe, Github, ExternalLink, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Coin from '@/components/Coin';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
}

interface ProjectsSectionContentProps {
  onCollectCoin?: (id: string, value: number) => void;
  coins?: Record<string, boolean>;
}

const ProjectsSectionContent: React.FC<ProjectsSectionContentProps> = ({ 
  onCollectCoin,
  coins = {}
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product listings, cart functionality, and secure checkout.",
      image: "https://placeholder.svg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      githubUrl: "https://github.com/username/e-commerce",
      liveUrl: "https://example.com/e-commerce",
      features: [
        "Product search and filtering",
        "User authentication",
        "Shopping cart",
        "Payment processing",
        "Order history"
      ]
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description: "An interactive weather application showing current conditions and forecasts for any location.",
      image: "https://placeholder.svg",
      technologies: ["JavaScript", "OpenWeather API", "CSS", "HTML5", "Chart.js"],
      githubUrl: "https://github.com/username/weather-app",
      liveUrl: "https://example.com/weather",
      features: [
        "5-day forecast",
        "Interactive maps",
        "Location search",
        "Weather alerts",
        "Unit conversion"
      ]
    },
    {
      id: 3,
      title: "Task Management App",
      description: "A productivity application for managing tasks, projects, and deadlines with team collaboration features.",
      image: "https://placeholder.svg",
      technologies: ["Vue.js", "Firebase", "Vuex", "TailwindCSS"],
      githubUrl: "https://github.com/username/task-manager",
      liveUrl: "https://example.com/tasks",
      features: [
        "Drag-and-drop task organization",
        "Team collaboration",
        "Deadline notifications",
        "Progress tracking",
        "File attachments"
      ]
    },
    {
      id: 4,
      title: "Fitness Tracker",
      description: "An application to track workouts, nutrition, and fitness goals with visual progress reports.",
      image: "https://placeholder.svg",
      technologies: ["React Native", "GraphQL", "Apollo", "Expo"],
      githubUrl: "https://github.com/username/fitness-app",
      features: [
        "Workout routines",
        "Nutrition logging",
        "Progress charts",
        "Goal setting",
        "Social sharing"
      ]
    }
  ];

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-3xl font-pixel text-retro-purple mb-6">
        <span className="text-retro-terminal-green">&gt;</span> PROJECT INVENTORY
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners cursor-pointer hover:border-retro-terminal-green transition-colors relative"
            onClick={() => openProjectDetails(project)}
          >
            {/* Hidden coin in a random project */}
            {project.id === 2 && onCollectCoin && (
              <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 coin-hidden transition-opacity duration-300">
                <Coin 
                  id={`project-${project.id}-coin`} 
                  value={75} 
                  onCollect={onCollectCoin}
                  isCollected={coins[`project-${project.id}-coin`] || false}
                />
              </div>
            )}
            
            <div className="h-40 bg-retro-dark-purple mb-4 flex items-center justify-center overflow-hidden rounded-lg">
              <FolderGit2 size={64} className="text-retro-purple opacity-50" />
            </div>
            
            <h3 className="text-retro-terminal-green font-pixel text-lg mb-2">{project.title}</h3>
            <p className="text-retro-terminal-green font-mono text-sm mb-4 h-12 overflow-hidden">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span 
                  key={i} 
                  className="bg-retro-dark-purple text-retro-terminal-green px-2 py-1 rounded font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="bg-retro-dark-purple text-retro-terminal-green px-2 py-1 rounded font-mono text-xs">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-retro-purple text-retro-purple hover:bg-retro-purple hover:text-retro-dark-purple font-pixel"
                onClick={(e) => {
                  e.stopPropagation();
                  openProjectDetails(project);
                }}
              >
                VIEW DETAILS
              </Button>
              
              <div className="flex space-x-2">
                {project.githubUrl && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-retro-terminal-green hover:text-retro-purple"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubUrl, '_blank');
                    }}
                  >
                    <Github size={18} />
                  </Button>
                )}
                
                {project.liveUrl && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-retro-terminal-green hover:text-retro-purple"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.liveUrl, '_blank');
                    }}
                  >
                    <Globe size={18} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-80"
            onClick={closeProjectDetails}
          ></div>
          
          <div className="bg-retro-dark-purple border-2 border-retro-purple rounded-lg pixel-corners p-6 max-w-2xl w-full z-10 relative">
            {/* Hidden coin in modal details */}
            {selectedProject.id === 3 && onCollectCoin && (
              <div className="absolute top-2 right-12 opacity-0 hover:opacity-100 coin-hidden transition-opacity duration-300">
                <Coin 
                  id={`project-modal-${selectedProject.id}-coin`} 
                  value={100} 
                  onCollect={onCollectCoin}
                  isCollected={coins[`project-modal-${selectedProject.id}-coin`] || false}
                />
              </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-retro-terminal-green font-pixel text-xl">{selectedProject.title}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-retro-terminal-green hover:text-retro-purple"
                onClick={closeProjectDetails}
              >
                X
              </Button>
            </div>
            
            <div className="h-48 bg-retro-terminal-black mb-4 flex items-center justify-center overflow-hidden rounded-lg">
              <FolderGit2 size={80} className="text-retro-purple opacity-50" />
            </div>
            
            <p className="text-retro-terminal-green font-mono mb-4">{selectedProject.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-retro-pixel-yellow font-pixel text-sm mb-2">KEY FEATURES</h4>
                <ul className="list-disc list-inside text-retro-terminal-green font-mono">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="mb-1">{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-retro-pixel-green font-pixel text-sm mb-2">TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="bg-retro-terminal-black text-retro-terminal-green px-2 py-1 rounded font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              {selectedProject.githubUrl && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs border-retro-purple text-retro-purple hover:bg-retro-purple hover:text-retro-dark-purple font-pixel flex items-center"
                  onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                >
                  <Github size={16} className="mr-2" />
                  VIEW CODE
                </Button>
              )}
              
              {selectedProject.liveUrl && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs border-retro-purple text-retro-purple hover:bg-retro-purple hover:text-retro-dark-purple font-pixel flex items-center"
                  onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                >
                  <ExternalLink size={16} className="mr-2" />
                  LIVE DEMO
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSectionContent;
