/**
 * INFRASTRUCTURE LAYER: LLM Adapter
 * Concrete implementation of the AI Service.
 */
import { GoogleGenAI, Chat } from "@google/genai";
import { APP_CONFIG } from "../constants";
import { PromptFactory } from "./prompts";

export class GeminiAdapter {
  private static instance: GeminiAdapter;
  private chatSession: Chat | null = null;
  private client: GoogleGenAI;

  private constructor() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("CRITICAL: API_KEY missing.");
    this.client = new GoogleGenAI({ apiKey });
  }

  public static getInstance(): GeminiAdapter {
    if (!GeminiAdapter.instance) {
      GeminiAdapter.instance = new GeminiAdapter();
    }
    return GeminiAdapter.instance;
  }

  public async getChatSession(): Promise<Chat> {
    if (!this.chatSession) {
      this.chatSession = this.client.chats.create({
        model: APP_CONFIG.MODEL_NAME,
        config: {
          systemInstruction: PromptFactory.getSystemPrompt(),
          temperature: APP_CONFIG.TEMPERATURE,
        },
      });
    }
    return this.chatSession;
  }

  public async sendMessage(message: string): Promise<string> {
    try {
      const session = await this.getChatSession();
      const result = await session.sendMessage({ message });
      return result.text || "Erro: Resposta vazia do modelo.";
    } catch (error) {
      console.error("[Infrastructure] Gemini API Error:", error);
      this.chatSession = null; // Invalidate session on error
      throw new Error("Falha na comunicação com o serviço de IA.");
    }
  }
}
