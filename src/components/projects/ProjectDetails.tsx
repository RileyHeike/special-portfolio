
import React from 'react';
import { FolderGit2 } from 'lucide-react';
import Coin from '@/components/Coin';
import { Project } from './ProjectTypes';
import { 
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectDetailsProps {
  project: Project;
  onCollectCoin?: (id: string, value: number) => void;
  coins?: Record<string, boolean>;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ 
  project, 
  onCollectCoin,
  coins = {}
}) => {
  const isMobile = useIsMobile();

  const content = (
    <>
      {project.id === 3 && onCollectCoin && (
        <div className="absolute top-2 right-12 opacity-0 hover:opacity-100 coin-hidden transition-opacity duration-300">
          <Coin 
            id={`project-modal-${project.id}-coin`} 
            value={100} 
            onCollect={onCollectCoin}
            isCollected={coins[`project-modal-${project.id}-coin`] || false}
          />
        </div>
      )}
      
      <DialogTitle className="text-retro-terminal-green font-pixel text-xl mb-4">{project.title}</DialogTitle>
      
      <div className="h-48 bg-retro-terminal-black mb-4 flex items-center justify-center overflow-hidden rounded-lg">
        <FolderGit2 size={80} className="text-retro-purple opacity-50" />
      </div>
      
      {(project.organization || project.duration) && (
        <div className="mb-4">
          <h4 className="text-retro-pixel-yellow font-pixel text-sm mb-1">ORGANIZATION</h4>
          <p className="text-retro-terminal-green font-mono">
            {project.organization}
            {project.organization && project.duration && ' • '}
            {project.duration}
          </p>
        </div>
      )}
      
      <div className="mb-4">
        <h4 className="text-retro-pixel-green font-pixel text-sm mb-2">DESCRIPTION</h4>
        <p className="text-retro-terminal-green font-mono leading-relaxed">{project.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-retro-pixel-yellow font-pixel text-sm mb-2">KEY ACHIEVEMENTS</h4>
          <ul className="list-disc list-inside text-retro-terminal-green font-mono">
            {project.features.map((feature, i) => (
              <li key={i} className="mb-1">{feature}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-retro-pixel-green font-pixel text-sm mb-2">SKILLS DEVELOPED</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
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
    </>
  );

  return (
    <DialogContent className="bg-retro-dark-purple border-2 border-retro-purple rounded-lg pixel-corners p-6 max-w-2xl w-full">
      {isMobile ? (
        <ScrollArea className="h-[70vh] pr-4">
          {content}
        </ScrollArea>
      ) : (
        content
      )}
    </DialogContent>
  );
};

export default ProjectDetails;
