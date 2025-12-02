
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { inputStyles } from '../../styles/componentStyles';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onOpenPolicies: () => void;
}

const MAX_CHARS = 2000;

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, onOpenPolicies }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize logic
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight for shrinking
      textareaRef.current.style.height = 'auto';
      // Set height to scrollHeight to expand
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      // Reset height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setInput(text);
    }
  };

  const isButtonEnabled = input.trim() && !isLoading;
  const buttonStyle = `${inputStyles.sendButtonBase} ${isButtonEnabled ? inputStyles.sendButtonActive : inputStyles.sendButtonDisabled}`;

  return (
    <div className={inputStyles.container}>
      <div className={inputStyles.inputWrapper}>
        
        {/* Quick Policy Access Button */}
        <button
          onClick={onOpenPolicies}
          className={inputStyles.policyButtonInput}
          title="Ver Políticas Oficiais"
          aria-label="Ver Políticas Oficiais"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Digite o caso para análise (Ex: Cliente pede reembolso por atraso...)"
          className={inputStyles.textInput}
          disabled={isLoading}
          rows={1}
          maxLength={MAX_CHARS}
        />
        <button
          onClick={handleSend}
          disabled={!isButtonEnabled}
          className={buttonStyle}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          )}
        </button>
      </div>
      <div className={inputStyles.footerWrapper}>
        <p className={inputStyles.securityLabel}>
          IA sujeita a erros. Valide as respostas e proteja dados sensíveis (LGPD).
        </p>
        <span className={inputStyles.charCount}>
          {input.length}/{MAX_CHARS}
        </span>
      </div>
    </div>
  );
};
