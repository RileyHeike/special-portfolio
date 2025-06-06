
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  organization?: string;
  duration?: string;
  teamSize?: string;
}
