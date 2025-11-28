import React from 'react';
import { MessageEntity } from '../../../core/types/domain';
import { Avatar } from '../atoms/Avatar';
import { MessageBubble } from '../molecules/MessageBubble';
import { messageRowStyles } from '../../styles/componentStyles';

interface ChatMessageProps {
  message: MessageEntity;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  const containerClass = `${messageRowStyles.containerBase} ${isBot ? messageRowStyles.alignLeft : messageRowStyles.alignRight}`;
  const wrapperClass = `${messageRowStyles.contentWrapperBase} ${isBot ? messageRowStyles.rowNormal : messageRowStyles.rowReverse}`;

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <Avatar sender={message.sender} />
        <MessageBubble message={message} />
      </div>
    </div>
  );
};