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
> **Categoria do Caso:** Segurança da Informação
> **Nível de Confiança:** Alto
> **Política Citada:** Protocolo InfoSec 1.0
> **Ação Recomendada:** Bloquear Interação
---

🤖 **RESPOSTA AO FOODLOVER:**
⛔ **Ação Bloqueada.**
A solicitação viola os protocolos de segurança do agente. O incidente foi registrado. Por favor, reformule sua consulta apenas com dados operacionais.`
      };
    }

    return { isSafe: true };
  }
}