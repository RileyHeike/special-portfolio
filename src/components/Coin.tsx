
import React, { useState } from 'react';
import { Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CoinProps {
  id: string;
  value?: number;
  position?: string;
  onCollect: (id: string, value: number) => void;
  isCollected: boolean;
}

const Coin: React.FC<CoinProps> = ({ 
  id, 
  value = 50, 
  position = 'relative', 
  onCollect,
  isCollected
}) => {
  const [hover, setHover] = useState(false);
  const { toast } = useToast();

  const handleCollect = () => {
    if (!isCollected) {
      onCollect(id, value);
      
      // Show toast
      toast({
        title: `COIN COLLECTED! +${value}`,
        description: "You found a hidden coin!",
        duration: 2000,
      });
    }
  };

  if (isCollected) {
    return null; // Don't render if already collected
  }

  return (
    <div 
      className={`${position} cursor-pointer transition-all duration-300`}
      onClick={handleCollect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`
        p-1 rounded-full 
        ${hover ? 'animate-bounce bg-retro-dark-purple/30' : ''} 
        transition-all duration-300
      `}>
        <Coins 
          size={24} 
          className={`text-retro-pixel-yellow ${hover ? 'animate-pulse' : ''}`} 
        />
      </div>
    </div>
  );
};

export default Coin;
