import React from 'react';
import { layoutStyles } from '../styles/componentStyles';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={layoutStyles.rootContainer}>
      <div className={layoutStyles.centralCard}>
        {children}
      </div>
    </div>
  );
};