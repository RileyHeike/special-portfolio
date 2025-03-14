
import React, { useState } from 'react';
import { Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CoinProps {
  onCollect: () => void;
  value?: number;
  hidden?: boolean;
  position?: string;
  tooltip?: string;
}

const Coin: React.FC<CoinProps> = ({ 
  onCollect, 
  value = 50, 
  hidden = true,
  position = "relative",
  tooltip = "You found a coin!"
}) => {
  const [collected, setCollected] = useState(false);
  const { toast } = useToast();

  const handleClick = () => {
    if (!collected) {
      setCollected(true);
      onCollect();
      toast({
        title: "COIN COLLECTED!",
        description: `+${value} points added to your score!`,
        variant: "default",
        duration: 3000,
      });
    }
  };

  if (collected) return null;

  return (
    <div 
      className={`${position} ${hidden ? 'opacity-30 hover:opacity-100' : ''} cursor-pointer transition-all duration-300 hover:scale-125 group`}
      onClick={handleClick}
    >
      <div className="relative">
        <Coins className="text-retro-pixel-yellow animate-pulse" size={24} />
        
        {tooltip && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-retro-terminal-black border border-retro-purple rounded px-2 py-1 text-xs font-pixel text-retro-terminal-green opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            {tooltip}
          </div>
        )}
      </div>
    </div>
  );
};

export default Coin;
