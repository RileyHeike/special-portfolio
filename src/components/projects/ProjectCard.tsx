
import React from 'react';
import { Award } from 'lucide-react';
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
      
      <div className="h-32 bg-retro-dark-purple mb-4 flex items-center justify-center overflow-hidden rounded-lg">
        <Award size={48} className="text-retro-purple opacity-50" />
      </div>
      
      <h3 className="text-retro-terminal-green font-pixel text-lg mb-2">{project.title}</h3>
      
      {project.organization && (
        <p className="text-retro-pixel-yellow font-mono text-sm mb-2">
          {project.organization}
        </p>
      )}
      
      {project.duration && (
        <p className="text-retro-purple font-mono text-xs mb-3">
          {project.duration}
        </p>
      )}
      
      <p className="text-retro-terminal-green font-mono text-sm mb-4 flex-grow">
        {project.description}
      </p>
      
      <div className="flex justify-center mt-auto">
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
      </div>
    </div>
  );
};

export default ProjectCard;
