
import React from 'react';

export interface Skill {
  name: string;
  level: number;
}

interface SkillBarProps {
  skill: Skill;
  colorClass: string;
  bgColorClass?: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ 
  skill, 
  colorClass, 
  bgColorClass = "bg-retro-dark-purple" 
}) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-retro-terminal-green font-mono">{skill.name}</span>
        <span className={`${colorClass} font-mono`}>{skill.level}/100</span>
      </div>
      <div className={`w-full h-3 ${bgColorClass} rounded-sm overflow-hidden`}>
        <div 
          className={`h-full ${colorClass}`} 
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
