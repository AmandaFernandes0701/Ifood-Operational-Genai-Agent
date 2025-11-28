import React from 'react';
import { MessageEntity } from '../../../core/types/domain';
import { formatMessageContent } from '../../utils/textFormatting';
import { extractAnalysisAndResponse } from '../../utils/messageParser';
import { AnalysisWidget } from './AnalysisWidget';
import { bubbleStyles } from '../../styles/componentStyles';

interface MessageBubbleProps {
  message: MessageEntity;
}

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