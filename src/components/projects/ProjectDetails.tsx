
import React from 'react';
import { FolderGit2, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Coin from '@/components/Coin';
import { Project } from './ProjectTypes';
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

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
  return (
    <DialogContent className="bg-retro-dark-purple border-2 border-retro-purple rounded-lg pixel-corners p-6 max-w-2xl w-full">
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
      
      <DialogHeader>
        <DialogTitle className="text-retro-terminal-green font-pixel text-xl">{project.title}</DialogTitle>
        <DialogDescription className="sr-only">Project details for {project.title}</DialogDescription>
      </DialogHeader>
      
      <div className="h-48 bg-retro-terminal-black mb-4 flex items-center justify-center overflow-hidden rounded-lg">
        <FolderGit2 size={80} className="text-retro-purple opacity-50" />
      </div>
      
      <p className="text-retro-terminal-green font-mono mb-4">{project.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-retro-pixel-yellow font-pixel text-sm mb-2">KEY FEATURES</h4>
          <ul className="list-disc list-inside text-retro-terminal-green font-mono">
            {project.features.map((feature, i) => (
              <li key={i} className="mb-1">{feature}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-retro-pixel-green font-pixel text-sm mb-2">TECHNOLOGIES</h4>
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
      
      <div className="flex justify-center space-x-4">
        {project.githubUrl && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs border-retro-purple text-retro-purple hover:bg-retro-purple hover:text-retro-dark-purple font-pixel flex items-center"
            onClick={() => window.open(project.githubUrl, '_blank')}
          >
            <Github size={16} className="mr-2" />
            VIEW CODE
          </Button>
        )}
        
        {project.liveUrl && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs border-retro-purple text-retro-purple hover:bg-retro-purple hover:text-retro-dark-purple font-pixel flex items-center"
            onClick={() => window.open(project.liveUrl, '_blank')}
          >
            <ExternalLink size={16} className="mr-2" />
            LIVE DEMO
          </Button>
        )}
      </div>
    </DialogContent>
  );
};

export default ProjectDetails;
