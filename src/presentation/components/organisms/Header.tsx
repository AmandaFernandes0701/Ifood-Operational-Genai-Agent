
import React, { useState } from 'react';
import { APP_CONFIG } from '../../../main/config/constants';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { headerStyles } from '../../styles/componentStyles';

interface HeaderProps {
  onOpenPolicies: () => void;
  onOpenInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPolicies, onOpenInfo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobilePolicyClick = () => {
    onOpenPolicies();
    setIsMenuOpen(false);
  };
  
  return (
    <header className={headerStyles.container}>
      <div className={headerStyles.brandGroup}>
        <div className={headerStyles.logoWrapper}>
          <div className={headerStyles.logoCircle}>
            iN
          </div>
        </div>
        <div className={headerStyles.textGroup}>
          <h1 className={headerStyles.title}>{APP_CONFIG.TITLE}</h1>
          <p className={headerStyles.subtitle}>{APP_CONFIG.SUBTITLE}</p>
        </div>
      </div>
      
      {/* Right Side Actions Container */}
      <div className="flex items-center gap-2 md:gap-3">
        
        {/* Policies Button (Desktop Only) */}
        <button 
          onClick={onOpenPolicies}
          className={`${headerStyles.policyButton} hidden md:flex`}
          title="Consultar Políticas Internas"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span>Consultar Políticas</span>
        </button>

        {/* Info Button (Always Visible) */}
        <button
          onClick={onOpenInfo}
          className="p-2 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          title="Sobre o Sistema"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </button>

        {/* Theme Toggle (Always Visible) */}
        <ThemeToggle />

        {/* Mobile Hamburger Button (Visible only on mobile) */}
        <button 
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title="Mais opções"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#EA1D2C] shadow-xl border-t border-white/10 md:hidden animate-fade-in flex flex-col p-2 z-50">
          <button onClick={handleMobilePolicyClick} className="flex items-center gap-3 p-4 text-white hover:bg-white/10 rounded-xl transition-colors text-sm font-semibold">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Consultar Políticas
          </button>
        </div>
      )}
    </header>
  );
};
