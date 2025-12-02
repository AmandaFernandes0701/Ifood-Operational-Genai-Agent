
import React, { useRef, useEffect, useState } from 'react';
import { Layout } from '../presentation/pages/Layout';
import { Header } from '../presentation/components/organisms/Header';
import { ChatMessage } from '../presentation/components/organisms/ChatMessage';
import { ChatInput } from '../presentation/components/organisms/ChatInput';
import { PoliciesModal } from '../presentation/components/organisms/PoliciesModal';
import { AboutModal } from '../presentation/components/organisms/AboutModal';
import { ThemeProvider } from '../presentation/contexts/ThemeContext';
import { useRefundAgent } from '../presentation/hooks/useRefundAgent';

const ChatApp: React.FC = () => {
  // Connection to the Controller/ViewModel
  const { messages, isProcessing, sendMessage } = useRefundAgent();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOpenPolicies = () => setIsPoliciesOpen(true);
  const handleOpenInfo = () => setIsInfoOpen(true);

  return (
    <Layout>
      <Header 
        onOpenPolicies={handleOpenPolicies} 
        onOpenInfo={handleOpenInfo}
      />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 scrollbar-hide transition-colors duration-300">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput 
        onSendMessage={sendMessage} 
        isLoading={isProcessing} 
        onOpenPolicies={handleOpenPolicies}
      />

      {isPoliciesOpen && (
        <PoliciesModal onClose={() => setIsPoliciesOpen(false)} />
      )}

      {isInfoOpen && (
        <AboutModal onClose={() => setIsInfoOpen(false)} />
      )}
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