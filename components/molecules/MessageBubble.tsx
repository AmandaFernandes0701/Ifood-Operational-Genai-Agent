
import React from 'react';
import { MessageEntity } from '../../types';
import { formatMessageContent } from '../../utils/textFormatting';
import { extractAnalysisAndResponse } from '../../utils/messageParser';
import { AnalysisWidget } from './AnalysisWidget';

interface MessageBubbleProps {
  message: MessageEntity;
}

const bubbleStyles = {
  base: "relative px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed overflow-hidden transition-colors duration-300",
  botVariant: "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tl-none",
  userVariant: "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tr-none",
  errorVariant: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400",
  timestampBase: "text-[10px] mt-2 opacity-60 text-right w-full",
  timestampBot: "text-gray-400 dark:text-gray-500",
  timestampUser: "text-gray-500 dark:text-gray-400"
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const isError = message.metadata?.isError;

  // Compose dynamic classes based on state
  let bubbleClass = bubbleStyles.base;
  
  if (isBot) {
    bubbleClass += ` ${bubbleStyles.botVariant}`;
  } else {
    bubbleClass += ` ${bubbleStyles.userVariant}`;
  }

  if (isError) {
    bubbleClass += ` ${bubbleStyles.errorVariant}`;
  }

  const timestampClass = `${bubbleStyles.timestampBase} ${isBot ? bubbleStyles.timestampBot : bubbleStyles.timestampUser}`;

  // Parse Content
  const { analysis, cleanText } = extractAnalysisAndResponse(message.content);

  return (
    <div className={bubbleClass}>
      {/* If this is a bot message and has analysis data, show the widget */}
      {isBot && analysis && (
        <AnalysisWidget data={analysis} />
      )}

      {/* Main Text Content */}
      <div className="prose-sm dark:prose-invert">
        {formatMessageContent(cleanText)}
      </div>
      
      <div className={timestampClass}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};
