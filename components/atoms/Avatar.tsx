import React from 'react';
import { SenderType } from '../../types';

interface AvatarProps {
  sender: SenderType;
}

const avatarStyles = {
  base: "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold mx-2 mt-1 shadow-sm border transition-colors duration-300",
  botVariant: "bg-white dark:bg-gray-800 border-red-100 dark:border-gray-700 text-[#EA1D2C]",
  userVariant: "bg-[#EA1D2C] border-[#EA1D2C] text-white"
};

export const Avatar: React.FC<AvatarProps> = ({ sender }) => {
  const isBot = sender === 'bot';
  const className = `${avatarStyles.base} ${isBot ? avatarStyles.botVariant : avatarStyles.userVariant}`;
  
  return (
    <div className={className}>
      {isBot ? 'IA' : 'FL'}
    </div>
  );
};