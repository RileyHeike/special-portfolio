
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
      title: "Student Body President",
      description: "Led a diverse student body of 15,000+ students, implementing campus-wide initiatives focused on mental health awareness, sustainability programs, and academic support services. Successfully advocated for policy changes that improved campus dining options and extended library hours during finals week.",
      image: "https://placeholder.svg",
      organization: "University of California, Berkeley",
      duration: "September 2022 - May 2023",
      teamSize: "Executive team of 12 members",
      technologies: ["Public Speaking", "Policy Development", "Budget Management", "Team Leadership", "Crisis Management"],
      features: [
        "Increased student engagement by 40% through innovative programming",
        "Secured $50,000 additional funding for student mental health resources",
        "Implemented campus sustainability initiative reducing waste by 25%",
        "Established mentorship program connecting upperclassmen with freshmen",
        "Led successful campaign for extended campus facility hours"
      ]
    },
    {
      id: 2,
      title: "Team Captain - Varsity Soccer",
      description: "Captained a championship-winning varsity soccer team, fostering team unity and driving performance improvements through strategic leadership and mentorship. Developed training programs that enhanced team performance and maintained high academic standards among team members.",
      image: "https://placeholder.svg",
      organization: "Berkeley High School",
      duration: "August 2021 - June 2022",
      teamSize: "23 team members",
      technologies: ["Athletic Leadership", "Performance Coaching", "Conflict Resolution", "Strategic Planning", "Motivation"],
      features: [
        "Led team to regional championship victory",
        "Improved team GPA from 3.2 to 3.7 through academic accountability program",
        "Reduced team conflicts by 60% through effective communication strategies",
        "Implemented peer mentoring system for younger players",
        "Organized community service initiatives increasing team's local impact"
      ]
    },
    {
      id: 3,
      title: "Volunteer Coordinator",
      description: "Organized and managed volunteer programs for a local non-profit, coordinating efforts across multiple community initiatives. Developed recruitment strategies and training programs that significantly increased volunteer retention and program effectiveness.",
      image: "https://placeholder.svg",
      organization: "Bay Area Community Center",
      duration: "January 2021 - August 2022",
      teamSize: "200+ volunteers managed",
      technologies: ["Volunteer Management", "Program Development", "Community Outreach", "Training Design", "Event Planning"],
      features: [
        "Increased volunteer retention rate from 45% to 78%",
        "Coordinated 15+ community events serving 500+ families",
        "Developed comprehensive volunteer training program",
        "Established partnerships with 8 local schools and organizations",
        "Managed volunteer database and scheduling system for 200+ volunteers"
      ]
    },
    {
      id: 4,
      title: "Youth Leadership Program Director",
      description: "Directed a summer leadership program for at-risk youth, designing curriculum and activities that developed leadership skills, built confidence, and provided mentorship opportunities. Successfully graduated 95% of participants who went on to leadership roles in their schools.",
      image: "https://placeholder.svg",
      organization: "Oakland Youth Foundation",
      duration: "June 2020 - August 2021",
      teamSize: "Program for 30 youth, staff of 8",
      technologies: ["Curriculum Development", "Youth Mentorship", "Program Management", "Educational Leadership", "Community Building"],
      features: [
        "95% program completion rate among at-risk youth participants",
        "Designed leadership curriculum adopted by 3 other organizations",
        "Secured $25,000 in additional funding through grant writing",
        "Established alumni network with 90% ongoing engagement",
        "Created partnerships with local high schools for continued support"
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
