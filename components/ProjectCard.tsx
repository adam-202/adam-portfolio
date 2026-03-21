
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Shield, Activity } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const getIcon = () => {
    switch (project.type) {
      case 'defense': return <Shield className="w-6 h-6 text-blueprint" />;
      case 'automotive': return <Cpu className="w-6 h-6 text-blueprint" />;
      case 'analysis': return <Activity className="w-6 h-6 text-blueprint" />;
      default: return <Cpu className="w-6 h-6 text-blueprint" />;
    }
  };

  return (
    <motion.div 
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: '0 0 25px rgba(34, 211, 238, 0.2)',
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: 'rgba(34, 211, 238, 0.6)'
      }}
      initial={{ y: 0, scale: 1 }}
      className="relative bg-slate-900/50 border border-slate-800 overflow-hidden clip-angle-inv group cursor-pointer transition-colors"
      onClick={() => onSelect(project.id)}
    >
      {/* Image Section */}
      <div className="h-48 w-full overflow-hidden relative border-b border-slate-800 group-hover:border-blueprint/30 transition-colors">
        <img 
          src={project.image || "https://placehold.co/600x400/0f172a/22d3ee?text=CLASSIFIED"} 
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
          <div className="w-2 h-2 bg-blueprint rounded-full shadow-glow" />
        </div>

        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-sm">
            {getIcon()}
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{project.category}</span>
        </div>

        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blueprint transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, 3).map((t, i) => (
            <span key={i} className="px-2 py-1 text-[10px] font-mono text-blueprint border border-blueprint/20 bg-blueprint/5">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center text-sm font-bold text-slate-300 group-hover:text-blueprint transition-colors">
          <span>INITIATE PROTOCOL</span>
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      
      {/* Corner Accents */}
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blueprint opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blueprint opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default ProjectCard;
