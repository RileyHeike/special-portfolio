
import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import ProjectCard from './projects/ProjectCard';
import ProjectDetails from './projects/ProjectDetails';
import { Project } from './projects/ProjectTypes';

interface ProjectsSectionContentProps {
  onCollectCoin?: (id: string, value: number) => void;
  coins?: Record<string, boolean>;
  isSoundOn?: boolean;
}

const ProjectsSectionContent: React.FC<ProjectsSectionContentProps> = ({ 
  onCollectCoin,
  coins = {},
  isSoundOn = false
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const playModalSound = () => {
    if (!isSoundOn) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Modal open sound
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.3);
    
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "Project Manager - SCU Imaginarium",
      description: "Co-led an interdisciplinary research team studying the cognitive effects of short-form and split-screen video content on learning, attention, and information retention.",
      image: "https://placeholder.svg",
      organization: "Santa Clara University",
      duration: "January 2025 - Present",
      teamSize: "Executive team of 12 members",
      technologies: ["Project Management", "Data Analysis"],
      features: [
        "Oversaw the development of a custom website for experimental trials",
        "Managed participant/researcher coordination, and directed data collection and data analysis",
        "Streamlined project timelines and operations to consistently meet critical research milestones",
      ]
    },
    {
      id: 2,
      title: "Vice President",
      description: "Established the first Taiwanese community group at SCU, and connected with Taiwanese clubs at different schools for collaborative events",
      image: "https://placeholder.svg",
      organization: "SCU Taiwanese Student Association",
      duration: "May 2023 - June 2024",
      teamSize: "120 members",
      technologies: ["Community Building", "Event Planning", "Leadership", "Team Management"],
      features: [
        "Helped organize events for 120+ members to promote Taiwanese culture and community",
        "Increased event attendance by 50% through targeted outreach and engagement strategies",
        "Created a digital resource hub for members to access cultural materials and event information"
      ]
    },
    {
      id: 3,
      title: "Visitor Services Ambassador",
      description: "Supervise galleries and create a welcoming environment for visitors ",
      image: "https://placeholder.svg",
      organization: "de Saisset Museum, Santa Clara University",
      duration: "September 2023 - Present",
      teamSize: "",
      technologies: ["Customer Service", "Visitor Engagement", "Event Support", "Training Development"],
      features: [
        "Participated in varoius projects ranging from art installation to administrative support",
        "Developed training materials that improved volunteer retention by 20%",
        "Implemented a new visitor feedback system that increased satisfaction ratings by 15%",
      ]
    },
    {
      id: 4,
      title: "Interview Co-Chair",
      description: "Co-direct and manage interview process for an on-campus professional business fraternity, including scheduling, training interviewers, and providing feedback to candidates.",
      image: "https://placeholder.svg",
      organization: "Alpha Kappa Psi, Santa Clara University",
      duration: "March 2025 - Present",
      teamSize: "2 co-chairs, 20 interviewers",
      technologies: ["Interview Management", "Team Leadership", "Feedback Systems", "Training Development"],
      features: [
        "Created over 100+ interview questions and evaluation rubrics to standardize the interview process",
        "Trained and managed a team over 20 interviewers to ensure consistent and fair evaluations",
        "Provided constructive feedback to candidates, helping them improve their interview skills and confidence"
      ]
    }
  ];
  
  const openProjectDetails = (project: Project) => {
    playModalSound();
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-3xl font-pixel text-retro-purple mb-6">
        <span className="text-retro-terminal-green">&gt;</span> LEADERSHIP EXPERIENCES
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
