import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const inputStyles = {
  container: "p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300",
  inputWrapper: "relative flex items-center",
  textInput: "w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#EA1D2C] focus:border-transparent transition-all shadow-sm disabled:opacity-50 placeholder-gray-400 dark:placeholder-gray-500",
  sendButtonBase: "absolute right-2 p-2 rounded-full transition-all duration-200",
  sendButtonActive: "bg-[#EA1D2C] text-white hover:bg-red-700 shadow-md transform hover:scale-105",
  sendButtonDisabled: "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed",
  footerWrapper: "text-center mt-2 flex justify-center gap-4",
  securityLabel: "text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest font-bold"
};

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const isButtonEnabled = input.trim() && !isLoading;
  const buttonStyle = `${inputStyles.sendButtonBase} ${isButtonEnabled ? inputStyles.sendButtonActive : inputStyles.sendButtonDisabled}`;

  return (
    <div className={inputStyles.container}>
      <div className={inputStyles.inputWrapper}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite o caso para análise (Ex: Cliente pede reembolso por atraso...)"
          className={inputStyles.textInput}
          disabled={isLoading}
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
      </div>
    </div>
  );
};