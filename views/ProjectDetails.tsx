
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Database, Layers, Cpu } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack }) => {
  return (
    <div className="pt-32 md:pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Back - Larger touch target for mobile */}
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-blueprint mb-8 font-mono text-sm group px-2 py-2 -ml-2 rounded-lg hover:bg-slate-800/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold">RETURN TO COMMAND CENTER</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-slate-900/80 border border-slate-800 p-8 clip-angle-inv relative overflow-hidden shadow-glow-lg"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-blueprint/30" />
              
              {/* --- PROJECT IMAGE VISUALIZER --- */}
              <div className="w-full h-64 md:h-96 mb-8 overflow-hidden border border-slate-800 relative bg-slate-950">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 uppercase tracking-wide leading-tight">{project.title}</h1>
              <p className="text-blueprint font-mono text-sm mb-6">{project.details.role} | {project.details.timeline}</p>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  {project.summary}
                </p>
                
                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Database className="w-5 h-5 text-blueprint" />
                  MISSION OBJECTIVES
                </h3>
                <motion.ul 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3 mb-8"
                >
                  {project.details.objectives.map((obj, i) => (
                    <motion.li key={i} variants={itemVariants} className="flex items-start gap-3 text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-blueprint flex-shrink-0" />
                      <span>{obj}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blueprint" />
                  OPERATIONAL OUTCOMES
                </h3>
                <motion.ul 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {project.details.outcomes.map((out, i) => (
                    <motion.li key={i} variants={itemVariants} className="flex items-start gap-3 text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)] flex-shrink-0" />
                      <span>{out}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>

            {/* Custom UI based on Project Type */}
            {project.type === 'defense' && <DefenseDataSheet specs={project.details.specs} />}
            {project.type === 'automotive' && <DiagnosticView specs={project.details.specs} />}
            {project.type === 'analysis' && <FEAVisualizer specs={project.details.specs} />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/50 border border-slate-800 p-6 hover:border-blueprint/30 transition-colors"
            >
              <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-widest">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-mono text-blueprint border border-blueprint/20 bg-blueprint/5">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="bg-slate-900/50 border border-slate-800 p-6"
            >
              <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-widest">Location</h3>
              <p className="text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                {project.details.location}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* --- Specific Project Components --- */

const DefenseDataSheet: React.FC<{ specs: Record<string, string> }> = ({ specs }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="bg-slate-950 border border-slate-700 p-6 font-mono text-sm relative"
  >
    <div className="absolute top-2 right-2 text-xs text-red-500 border border-red-500 px-2 py-0.5 animate-pulse">CLASSIFIED</div>
    <h3 className="text-slate-400 mb-4 uppercase border-b border-slate-800 pb-2">Technical Specifications [MIL-STD]</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 border border-slate-800">
      {Object.entries(specs).map(([key, value], i) => (
        <motion.div 
          key={key} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="contents"
        >
          <div className="bg-slate-900/90 p-3 text-slate-400 break-words">{key}</div>
          <div className="bg-slate-900/90 p-3 text-blueprint font-bold text-right break-words">{value}</div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const DiagnosticView: React.FC<{ specs: Record<string, string> }> = ({ specs }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-black border-2 border-slate-700 p-6 font-mono relative rounded-lg overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-pulse" />
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-green-500 font-bold">OBD-II DIAGNOSTIC LINK</h3>
      <span className="text-xs text-slate-500">CONN: ACTIVE</span>
    </div>
    
    <div className="space-y-4">
      {Object.entries(specs).map(([key, value], i) => (
        <div key={key}>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{key}</span>
            <span>{value}</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${80 + (i * 5)}%` }}
              transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
              viewport={{ once: true }}
              className={`h-full ${i === 0 ? 'bg-green-500' : 'bg-blueprint'}`}
            />
          </div>
        </div>
      ))}
    </div>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="mt-6 p-2 bg-slate-900 text-xs text-green-400 font-mono"
    >
      {">"} SYSTEM SCAN COMPLETE...<br/>
      {">"} NO FAULTS DETECTED.<br/>
      {">"} READY FOR DEPLOYMENT_
    </motion.div>
  </motion.div>
);

const FEAVisualizer: React.FC<{ specs: Record<string, string> }> = ({ specs }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="bg-slate-900 border border-slate-800 p-6 relative"
  >
    <h3 className="text-slate-300 font-bold mb-4 flex items-center gap-2">
      <Cpu className="w-4 h-4 text-orange-500" />
      STRESS DISTRIBUTION ANALYSIS
    </h3>
    
    <div className="flex gap-4 items-end h-40 mb-6 border-b border-l border-slate-700 p-4 relative bg-slate-950/50">
      {/* Histogram Bars */}
      {[20, 45, 30, 60, 85, 50, 30, 15].map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: "backOut" }}
          className="flex-1 bg-gradient-to-t from-blue-600 via-green-500 to-red-500 opacity-80 rounded-t-sm"
        />
      ))}
      <div className="absolute right-2 top-2 text-[10px] text-slate-500">Von Mises (MPa)</div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {Object.entries(specs).map(([key, value], i) => (
        <motion.div 
          key={key} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + (i * 0.1) }}
          className="border border-slate-800 p-3 hover:border-orange-500/50 transition-colors"
        >
          <div className="text-[10px] text-slate-500 uppercase">{key}</div>
          <div className="text-orange-400 font-mono font-bold">{value}</div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default ProjectDetails;
