import React from 'react';
import { MessageEntity } from '../types';
import { Avatar } from './atoms/Avatar';
import { MessageBubble } from './molecules/MessageBubble';

interface ChatMessageProps {
  message: MessageEntity;
}

const messageRowStyles = {
  containerBase: "flex w-full mb-4 animate-fade-in",
  alignLeft: "justify-start",
  alignRight: "justify-end",
  contentWrapperBase: "flex max-w-[90%] md:max-w-[85%]",
  rowNormal: "flex-row",
  rowReverse: "flex-row-reverse"
};

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