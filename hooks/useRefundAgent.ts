/**
 * PRESENTATION LAYER: Custom Hook (Controller)
 * Manages state and connects the View to the Application Layer.
 */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageEntity } from '../types';
import { RefundAnalysisUseCase } from '../application/RefundAnalysisUseCase';

export const useRefundAgent = () => {
  const [messages, setMessages] = useState<MessageEntity[]>([
    {
      id: 'init',
      content: "Olá, Foodlover! Sou seu apoio operacional para análise de reembolsos e cancelamentos. Estou conectado à base de políticas oficiais para te ajudar a validar a decisão correta. Qual caso vamos analisar agora?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Singleton instance of the UseCase
  const useCase = new RefundAnalysisUseCase();

  const sendMessage = async (text: string) => {
    // Optimistic UI Update
    const userMsg: MessageEntity = {
      id: uuidv4(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      // Execute Application Logic
      const response = await useCase.execute(text);

      const botMsg: MessageEntity = {
        id: uuidv4(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: MessageEntity = {
        id: uuidv4(),
        content: "Erro crítico no sistema.",
        sender: 'bot',
        timestamp: new Date(),
        metadata: { isError: true }
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    messages,
    isProcessing,
    sendMessage
  };
};
