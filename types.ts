
export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  tech: string[];
  type: 'defense' | 'automotive' | 'analysis';
  image?: string;
  details: {
    role: string;
    timeline: string;
    location: string;
    specs: Record<string, string>;
    objectives: string[];
    outcomes: string[];
  };
}

export enum ViewState {
  HOME = 'HOME',
  PROJECT = 'PROJECT'
}
