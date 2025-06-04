
import React from 'react';
import { ExternalLink, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConnectPanel: React.FC = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kristy-chereath/",
      icon: "linkedin",
      color: "text-blue-400 hover:text-blue-300"
    },
    {
      name: "Instagram", 
      url: "https://instagram.com/kc13577",
      icon: "instagram",
      color: "text-pink-400 hover:text-pink-300"
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/user/o4zax9vw42tnfmkpspbx9zck8?si=1b938c9814d54242",
      icon: "spotify", 
      color: "text-green-400 hover:text-green-300"
    }
  ];


  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Assuming resume.pdf is in the /public folder
    link.download = "Heike, Riley Resume.pdf"; // This is the filename for the download
    link.click();
  };
  

  return (
    <div className="bg-retro-terminal-black p-4 border-2 border-retro-purple rounded-lg pixel-corners">
      <h3 className="text-retro-neon-blue font-pixel text-lg mb-4">CONNECT WITH ME</h3>
      
      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-center space-x-3 p-2 bg-retro-dark-purple rounded border border-retro-purple">
          <Mail size={20} className="text-retro-terminal-green" />
          <div>
            <div className="font-pixel text-xs text-retro-terminal-green">EMAIL</div>
            <a 
              href="mailto:kchereath@scu.edu"
              className="text-retro-terminal-green font-mono text-sm hover:text-retro-neon-blue transition-colors"
            >
              kchereath@scu.edu
            </a>
          </div>
        </div>

        {/* Social Links */}
        {socialLinks.map((link, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 bg-retro-dark-purple rounded border border-retro-purple">
            <ExternalLink size={20} className="text-retro-terminal-green" />
            <div className="flex-grow">
              <div className="font-pixel text-xs text-retro-terminal-green">{link.name.toUpperCase()}</div>
              <a 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-mono text-sm transition-colors ${link.color}`}
              >
                {link.name === "LinkedIn" ? "kristy-chereath" : 
                 link.name === "Instagram" ? "@kc13577" :
                 "kc1357"}
              </a>
            </div>
          </div>
        ))}

        {/* Resume Download */}
        <Button
          onClick={handleDownloadResume}
          className="w-full bg-retro-purple hover:bg-retro-neon-blue text-retro-dark-purple font-pixel text-sm py-2 px-4 border border-retro-purple hover:border-retro-neon-blue transition-colors"
        >
          <Download size={16} className="mr-2" />
          DOWNLOAD RESUME
        </Button>
      </div>
    </div>
  );
};

export default ConnectPanel;
