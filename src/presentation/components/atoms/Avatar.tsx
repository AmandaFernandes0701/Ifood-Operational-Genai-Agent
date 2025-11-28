import React from 'react';
import { SenderType } from '../../../core/types/domain';
import { avatarStyles } from '../../styles/componentStyles';

interface AvatarProps {
  sender: SenderType;
}

export const Avatar: React.FC<AvatarProps> = ({ sender }) => {
  const isBot = sender === 'bot';
  const className = `${avatarStyles.base} ${isBot ? avatarStyles.botVariant : avatarStyles.userVariant}`;
  
  return (
    <div className={className}>
      {isBot ? (
        // Robot Icon for Bot
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
           <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12h1.5m12 0h1.5m-1.5 3.75h1.5m-1.5 0v1.5m-9-1.5h1.5m-1.5 0v1.5m6-1.5v1.5m-6-9v1.5m6-1.5v1.5M9 21v-1.5m6 0v1.5M7.5 21v-1.5m9 0v1.5M7.5 7.5h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9a2.25 2.25 0 012.25-2.25z" />
        </svg>
      ) : (
        // User Icon for FL
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      )}
    </div>
  );
};