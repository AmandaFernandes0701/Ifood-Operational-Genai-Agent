export type SenderType = 'user' | 'bot';

export interface MessageEntity {
  id: string;
  content: string;
  sender: SenderType;
  timestamp: Date;
  metadata?: {
    isError?: boolean;
    processingTimeMs?: number;
    confidenceScore?: 'High' | 'Medium' | 'Low';
  };
}

export interface RefundCaseState {
  messages: MessageEntity[];
  isProcessing: boolean;
}

export interface LLMResponse {
  text: string;
  raw: any;
}
