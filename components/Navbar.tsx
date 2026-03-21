
import React, { useState } from 'react';
import { Terminal, User, Linkedin, Menu, X, Download } from 'lucide-react';

interface NavbarProps {
  onHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHome }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-midnight/90 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onHome}
          >
            <div className="w-10 h-10 bg-slate-900 border border-blueprint flex items-center justify-center clip-angle group-hover:shadow-glow transition-all">
              <span className="text-xl font-bold text-blueprint">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-100 tracking-wider">ADAM ABDELNABY</span>
              <span className="text-[10px] font-mono text-blueprint uppercase tracking-[0.2em]">Mechatronics Engineer</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <NavItem icon={<Terminal size={16} />} text="PROJECTS" active onClick={onHome} />
            
            {/* DOWNLOAD CV BUTTON - Relative path fix */}
            <a 
              href="Adam-Abdelnaby-CV.pdf" 
              download 
              className="flex items-center gap-2 px-4 py-2 text-sm font-mono tracking-widest border border-blueprint/30 text-slate-300 hover:bg-blueprint/10 hover:border-blueprint transition-all duration-300 clip-angle"
            >
              <Download size={16} className="text-blueprint" />
              DOWNLOAD_CV
            </a>

            <div className="h-8 w-[1px] bg-slate-800 mx-2" />
            
            <a 
              href="https://www.linkedin.com/in/adam-abdelnaby-8b4a95235" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-transparent text-slate-400 hover:text-blueprint hover:border-blueprint/30 hover:bg-blueprint/5 transition-all clip-angle"
            >
              <Linkedin size={20} />
            </a>
            
            <NavItem icon={<User size={16} />} text="CONTACT" onClick={() => window.location.href = "mailto:eng-a20@outlook.com"} />
            
            <div className="ml-2 flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-slate-400">SYSTEM ONLINE</span>
            </div>
          </div>

          {/* Mobile Menu & Actions */}
          <div className="md:hidden flex items-center gap-1">
            {/* LinkedIn Icon - Visible on Mobile Header */}
            <a 
              href="https://www.linkedin.com/in/adam-abdelnaby-8b4a95235" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-blueprint transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-blueprint p-2 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-slate-800 p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <NavItemMobile 
            icon={<Terminal size={18} />} 
            text="PROJECTS" 
            active 
            onClick={() => handleNav(onHome)} 
          />

          {/* Mobile Download CV - Relative path fix */}
          <a 
            href="Adam-Abdelnaby-CV.pdf" 
            download
            className="flex items-center gap-3 px-4 py-3 text-sm font-mono tracking-widest border border-slate-800 text-slate-300 bg-slate-900/50 hover:border-blueprint transition-all duration-300 clip-angle"
            onClick={() => setIsOpen(false)}
          >
            <Download size={18} className="text-blueprint" />
            DOWNLOAD_CV
          </a>
          
          <NavItemMobile 
            icon={<User size={18} />} 
            text="CONTACT" 
            onClick={() => handleNav(() => window.location.href = "mailto:eng-a20@outlook.com")} 
          />
          
          <div className="flex items-center justify-center gap-2 py-2 mt-2 border-t border-slate-800 pt-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-slate-500">SYSTEM STATUS: ONLINE</span>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, text: string, active?: boolean, onClick?: () => void }> = ({ icon, text, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-sm font-mono tracking-widest border transition-all duration-300 clip-angle ${
      active 
        ? 'border-blueprint text-blueprint bg-blueprint/5' 
        : 'border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-200'
    }`}
  >
    {icon}
    {text}
  </button>
);

const NavItemMobile: React.FC<{ icon: React.ReactNode, text: string, active?: boolean, onClick?: () => void }> = ({ icon, text, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 text-sm font-mono tracking-widest border w-full text-left transition-all duration-300 clip-angle ${
      active 
        ? 'border-blueprint text-blueprint bg-blueprint/10' 
        : 'border-slate-800 text-slate-400 bg-slate-900/50 hover:border-slate-600'
    }`}
  >
    {icon}
    {text}
  </button>
);

export default Navbar;
