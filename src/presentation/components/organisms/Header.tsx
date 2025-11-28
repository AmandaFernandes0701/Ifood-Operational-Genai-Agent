import React from 'react';
import { APP_CONFIG } from '../../../main/config/constants';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { headerStyles } from '../../styles/componentStyles';

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