
/**
 * PRESENTATION LAYER: Custom Hook (Controller)
 * Manages state and connects the View to the Application Layer.
 */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageEntity } from '../../core/types/domain';
import { RefundAnalysisUseCase } from '../../application/RefundAnalysisUseCase';

export const useRefundAgent = () => {
  const [messages, setMessages] = useState<MessageEntity[]>([
    {
      id: 'init',
      content: "🛡️ **iFood Nexus Operacional**\nSistema conectado à Base de Políticas. Aguardando input do caso para validação de regras.",
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
        content: "⚠️ **Erro de Sistema.**\nFalha na comunicação com o motor de regras. Verifique sua conexão e tente novamente.",
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