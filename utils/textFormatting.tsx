
import React from 'react';

/**
 * Parses **bold** markdown syntax into React elements.
 */
export const parseBold = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900 dark:text-gray-100">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

/**
 * Standard line parser.
 */
export const parseStandardLine = (line: string, index: number): React.ReactNode => {
  if (line.trim() === '---') return null;
  if (line.trim() === '') return <div key={index} className="h-3" />;
  
  return (
    <div key={index} className="min-h-[1.5em] mb-1">
      {parseBold(line)}
    </div>
  );
};

/**
 * Simplified formatter that assumes analysis blocks have already been stripped.
 */
export const formatMessageContent = (text: string): React.ReactNode => {
  return (
    <div>
        {text.split('\n').map((line, i) => parseStandardLine(line, i))}
    </div>
  );
};
