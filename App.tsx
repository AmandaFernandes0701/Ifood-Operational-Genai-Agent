import React, { useRef, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ThemeProvider } from './contexts/ThemeContext';
import { useRefundAgent } from './hooks/useRefundAgent';

const ChatApp: React.FC = () => {
  // Connection to the Controller/ViewModel
  const { messages, isProcessing, sendMessage } = useRefundAgent();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Layout>
      <Header />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 scrollbar-hide transition-colors duration-300">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={sendMessage} isLoading={isProcessing} />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ChatApp />
    </ThemeProvider>
  );
};

export default App;
