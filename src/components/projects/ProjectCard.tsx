
import React from 'react';
import { FolderGit2, Github, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Coin from '@/components/Coin';
import { Project } from './ProjectTypes';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  onCollectCoin?: (id: string, value: number) => void;
  coins?: Record<string, boolean>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onOpenDetails,
  onCollectCoin,
  coins = {} 
}) => {
  return (
    <div 
      className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners cursor-pointer hover:border-retro-terminal-green transition-colors relative flex flex-col h-full"
      onClick={() => onOpenDetails(project)}
    >
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
      
      <div className="flex justify-between items-center mt-auto">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs border-retro-purple text-retro-purple hover:bg-retro-purple hover:text-retro-dark-purple font-pixel"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(project);
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
  );
};

export default ProjectCard;
