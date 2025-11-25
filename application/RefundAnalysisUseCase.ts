/**
 * APPLICATION LAYER: Orchestrator
 * Coordinates the flow between User Input -> Symbolic Rules -> Neural Model -> Response.
 */

import { SafetyNet } from "../domain/rules/safetyNet";
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

    // 2. Neural Layer Execution (Probabilistic)
    try {
      return await this.llmAdapter.sendMessage(userMessage);
    } catch (error) {
      console.error("[Application] UseCase Execution Failed", error);
      return "Desculpe, sistema temporariamente indisponível. Por favor, acione o suporte Nível 2.";
    }
  }
}
