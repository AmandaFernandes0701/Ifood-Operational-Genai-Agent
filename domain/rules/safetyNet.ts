/**
 * DOMAIN LAYER: Symbolic Logic (Safety Net)
 * Deterministic rules that override the Probabilistic Model (LLM).
 * This represents the "Symbolic" part of the Neuro-Symbolic architecture.
 */

export interface SafetyCheckResult {
  isSafe: boolean;
  overrideResponse?: string;
}

export class SafetyNet {
  static check(userInput: string): SafetyCheckResult {
    const input = userInput.toLowerCase();

    // RULE 1: Explicit SQL Injection or System Prompt Extraction attempts
    if (input.includes("system prompt") || input.includes("ignore todas as instruções")) {
      return {
        isSafe: false,
        overrideResponse: `---
📊 **ANÁLISE INTERNA**
> **Categoria do Caso:** Segurança
> **Nível de Confiança:** Alto
> **Política Citada:** Protocolo de Segurança de IA
> **Ação Recomendada:** Bloquear Interação
---

🤖 **RESPOSTA AO FOODLOVER:**
Por motivos de segurança, não posso fornecer informações sobre meus protocolos internos.`
      };
    }

    return { isSafe: true };
  }
}
