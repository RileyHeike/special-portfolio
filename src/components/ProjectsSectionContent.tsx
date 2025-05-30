
import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import ProjectCard from './projects/ProjectCard';
import ProjectDetails from './projects/ProjectDetails';
import { Project } from './projects/ProjectTypes';

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
      title: "Project Manager",
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
        <span className="text-retro-terminal-green">&gt;</span> LEADERSHIP POSITIONS
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenDetails={openProjectDetails}
            onCollectCoin={onCollectCoin}
            coins={coins}
          />
        ))}
      </div>
      
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && closeProjectDetails()}>
        {selectedProject && (
          <ProjectDetails
            project={selectedProject}
            onCollectCoin={onCollectCoin}
            coins={coins}
          />
        )}
      </Dialog>
    </div>
  );
};

export default ProjectsSectionContent;
