
import React from 'react';
import { APP_CONFIG } from '../constants';
import { ThemeToggle } from './ThemeToggle';

const headerStyles = {
  container: "bg-[#EA1D2C] text-white p-4 flex items-center justify-between shadow-md z-10 transition-colors duration-300",
  brandGroup: "flex items-center",
  logoWrapper: "flex-shrink-0 mr-4",
  logoCircle: "w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#EA1D2C] font-black text-xl shadow-sm tracking-tighter",
  textGroup: "flex flex-col",
  title: "text-lg font-bold leading-tight tracking-tight",
  subtitle: "text-xs text-red-100 font-medium tracking-wide opacity-90"
};

export const Header: React.FC = () => {
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
      
      <ThemeToggle />
    </header>
  );
};
