/**
 * APPLICATION LAYER: Orchestrator
 * Coordinates the flow between User Input -> Symbolic Rules -> Neural Model -> Response.
 */

import { SafetyNet } from "../domain/rules/SafetyNet";
import { GeminiAdapter } from "../infrastructure/llmClient";

export class RefundAnalysisUseCase {
  private llmAdapter: GeminiAdapter;

  constructor() {
    this.llmAdapter = GeminiAdapter.getInstance();
  }

  async execute(userMessage: string): Promise<string> {
    // 1. Symbolic Layer Check (Deterministic)
    const safetyCheck = SafetyNet.check(userMessage);
    if (!safetyCheck.isSafe && safetyCheck.overrideResponse) {
      return safetyCheck.overrideResponse;
    }

    // 2. Context Injection (Prompt Engineering Layer)
    // We wrap the user input to explicitly tell the LLM that this comes from an employee, NOT a customer.
    // This prevents the "Helpful Chatbot" hallucination.
    const augmentedInput = `
[METADATA DO SISTEMA: O remetente desta mensagem é um ANALISTA DE SUPORTE (Funcionário Interno). O texto abaixo é um relato de um caso de terceiro. NÃO responda como se estivesse falando com o cliente final.]

RELATO DO CASO:
"${userMessage}"
`;

    // 3. Neural Layer Execution (Probabilistic)
    try {
      return await this.llmAdapter.sendMessage(augmentedInput);
    } catch (error) {
      console.error("[Application] UseCase Execution Failed", error);
      return "⚠️ **Erro de Sistema.**\nO motor de decisão está temporariamente indisponível. Por favor, consulte a política manualmente ou acione o suporte Nível 2.";
    }
  }
}