
import React from 'react';

interface StatsPanelProps {
  title: string;
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  title,
  color,
  children,
  onClick
}) => {
  const colorClasses = {
    amber: "text-retro-amber hover:border-retro-amber",
    neon: "text-retro-neon-blue hover:border-retro-neon-blue",
    green: "text-retro-pixel-green hover:border-retro-pixel-green"
  };
  
  const titleColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.green;
  
  return (
    <div 
      className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners hover:border-retro-terminal-green transition-colors duration-300 cursor-pointer" 
      onClick={onClick}
    >
      <h3 className={`font-pixel text-sm mb-2 ${titleColor}`}>{title}</h3>
      {children}
    </div>
  );
};

export default StatsPanel;
