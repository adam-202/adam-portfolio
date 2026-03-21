
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, skills } from './data';
import { ViewState } from './types';
import Navbar from './components/Navbar';
import BackgroundGrid from './components/BackgroundGrid';
import Hero3D from './components/Hero3D';
import ProjectCard from './components/ProjectCard';
import ProjectDetails from './views/ProjectDetails';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Handle Browser History & Swipe Back Navigation
  useEffect(() => {
    // 1. Handle initial load with hash (e.g. user refreshes on #tank-loader)
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
      const project = projects.find(p => p.id === initialHash);
      if (project) {
        setSelectedProjectId(project.id);
        setViewState(ViewState.PROJECT);
        // Ensure current history state matches the UI
        window.history.replaceState({ projectId: project.id }, '', `#${project.id}`);
      }
    }

    // 2. Handle PopState (Back Button / Swipe Back)
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.projectId) {
        // We are going forward/back into a Project state
        setSelectedProjectId(event.state.projectId);
        setViewState(ViewState.PROJECT);
      } else {
        // We are going back to Home (null state)
        setSelectedProjectId(null);
        setViewState(ViewState.HOME);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleProjectSelect = (id: string) => {
    setSelectedProjectId(id);
    setViewState(ViewState.PROJECT);
    window.scrollTo(0, 0);
    // Push new history state so "Back" works
    window.history.pushState({ projectId: id }, '', `#${id}`);
  };

  const handleHome = () => {
    // Navigate back in history if we are in project view.
    // This triggers handlePopState, which updates the UI.
    // This ensures consistency whether user clicks "Return" or swipes back.
    if (viewState === ViewState.PROJECT) {
      window.history.back(); 
    } else {
      setViewState(ViewState.HOME);
      setSelectedProjectId(null);
    }
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="min-h-screen text-slate-200">
      <BackgroundGrid />
      <Navbar onHome={handleHome} />

      <AnimatePresence mode="wait">
        {viewState === ViewState.HOME ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pt-20"
          >
            {/* Hero Section */}
            <section className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight pointer-events-none z-10" />
              <Hero3D />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pointer-events-none flex flex-col items-center text-center">
                <div className="bg-slate-950/80 backdrop-blur border border-slate-800 p-8 clip-angle pointer-events-auto shadow-glow-lg">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                    ADAM ABDELNABY
                  </h1>
                  <h2 className="text-xl md:text-2xl font-mono text-blueprint mb-6">
                    MECHATRONICS ENGINEER.
                  </h2>
                  <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
                    Specializing in Automotive Systems and Defense Robotics. 
                    Merging mechanical design, control systems, and structural analysis 
                    to build robust, mission-critical machinery.
                  </p>
                </div>
              </div>
            </section>

            {/* Skills Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
               <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-slate-700" />
                <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest">Technical Proficiency</h3>
                <div className="w-full h-px bg-slate-800" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-900/50 border border-slate-800 p-4 clip-angle-inv flex items-center gap-3 hover:border-blueprint/30 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-blueprint shadow-glow" />
                    <span className="text-sm font-bold text-slate-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Projects Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-px bg-blueprint" />
                <h3 className="text-xl font-bold tracking-widest text-white">PROJECT PROTOCOLS</h3>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onSelect={handleProjectSelect} 
                  />
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 bg-slate-950 py-12 text-center">
              <p className="text-slate-500 text-sm font-mono">
                © 2026 ADAM ABDELNABY. SYSTEM STATUS: ONLINE.
              </p>
            </footer>
          </motion.main>
        ) : (
          <motion.div
            key="project"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedProject && (
              <ProjectDetails project={selectedProject} onBack={handleHome} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
