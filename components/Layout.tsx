import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const layoutStyles = {
  rootContainer: "flex flex-col h-screen bg-gray-100 dark:bg-gray-950 font-sans transition-colors duration-300",
  centralCard: "flex-1 flex flex-col max-w-5xl mx-auto w-full shadow-2xl bg-white dark:bg-gray-900 h-full md:h-[95vh] md:my-auto md:rounded-xl overflow-hidden transition-colors duration-300 border border-transparent dark:border-gray-800"
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={layoutStyles.rootContainer}>
      <div className={layoutStyles.centralCard}>
        {children}
      </div>
    </div>
  );
};