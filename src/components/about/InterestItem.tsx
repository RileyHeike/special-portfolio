
import React from 'react';
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

export interface Interest {
  icon: React.ReactNode;
  text: string;
  description: string;
  fact: string;
}

interface InterestItemProps {
  interest: Interest;
  index: number;
}

const InterestItem: React.FC<InterestItemProps> = ({ interest, index }) => {
  return (
    <Dialog key={index}>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer hover:bg-retro-dark-purple/50 p-2 rounded transition-colors">
          <div className="mr-2 text-retro-purple">{interest.icon}</div>
          <span className="text-retro-terminal-green font-mono">{interest.text}</span>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-retro-terminal-black border-2 border-retro-purple pixel-corners max-w-md animate-interest-reveal">
        <DialogHeader>
          <DialogTitle className="text-retro-pixel-yellow font-pixel flex items-center">
            <div className="mr-2 text-retro-purple">{interest.icon}</div>
            {interest.text}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-retro-terminal-green font-mono">
          <p className="mb-4">{interest.description}</p>
          <div className="bg-retro-dark-purple p-3 rounded-lg mb-2">
            <p className="text-sm font-pixel text-retro-pixel-yellow mb-1">FUN FACT</p>
            <p className="text-sm">{interest.fact}</p>
          </div>
        </div>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4 text-retro-pixel-yellow" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default InterestItem;
