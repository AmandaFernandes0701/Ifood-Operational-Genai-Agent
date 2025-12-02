/**
 * INFRASTRUCTURE LAYER: Data Repository
 * Acts as the Source of Truth for policies.
 * In a full backend, this would connect to a Vector Database (Pinecone/Weaviate).
 */

export const RAW_POLICY_CSV = `
categoria,pergunta,resposta,fonte
reembolso,Quando o cliente tem direito a reembolso total?,Quando o restaurante cancela o pedido ou quando há erro comprovado na entrega.,Política 3.2
reembolso,O cliente pode pedir reembolso após o pedido sair para entrega?,"Apenas quando houver falha do restaurante, app ou entregador. Caso seja desistência do cliente, pode não ser elegível.",Política 3.2
reembolso,Erro do restaurante garante reembolso?,"Sim, cancelamentos por falha do restaurante geram reembolso total.",Política 2.1
cancelamento,O que fazer se o restaurante não tiver o item pedido?,Pedido deve ser cancelado e o cliente tem direito a reembolso automático.,Política 2.3
cancelamento,Cancelamento por falta de ingrediente.,"Reembolso automático, salvo exceções operacionais específicas.",Política 2.3
financeiro,Cliente foi cobrado após cancelamento.,"É necessário validar o status do estorno. Em alguns métodos de pagamento, a devolução pode levar até 14 dias.",Fluxo Financeiro
financeiro,O cliente pode ser cobrado duas vezes?,"Não é esperado. Se houver suspeita, abrir ticket para validação financeira.",Fluxo Financeiro
financeiro,Estorno é automático em qual situação?,Quando o cancelamento ocorre antes da preparação do pedido ou em falha operacional comprovada.,Política 3.5
excecoes,Há situações em que o reembolso não se aplica?,"Sim. Em casos de desistência do cliente após saída para entrega, pode não haver reembolso.",Política 4.1
excecoes,"Pedido saiu para entrega, mas o cliente afirma que não autorizou.",Encaminhar para avaliação manual e possível abertura de ticket interno.,Política 4.4
suporte,Quando o agente deve gerar orientação de ticket?,Quando a política não for clara ou houver divergência entre status financeiro e do pedido.,Fluxo Suporte
suporte,Links de suporte devem ser fornecidos quando?,Sempre que o agente não conseguir concluir decisão com confiança alta.,Fluxo Suporte
entrega,Falha do entregador pode gerar reembolso?,"Sim, casos de entrega incorreta ou extravio devem ser elegíveis.",Política 2.2
entrega,"O pedido não chegou, mas consta como entregue.",Orientar validação manual e possível reembolso após análise.,Fluxo de Entrega
pedido,Como verificar status do pedido?,Consultar API interna ou fonte equivalente para validar andamento.,Integração API
financeiro,Estorno parcial é possível?,"Sim, em casos específicos de desacordo parcial ou compensações comerciais.",Política Financeira
cancelamento,Cancelamento por erro do app.,"Reembolso total, salvo fraude.",Política 2.1
cancelamento,Cancelamento solicitado após despacho.,Reembolsável apenas quando erro não é do cliente.,Política 3.2
fraude,Suspeita de fraude no método de pagamento.,Encaminhar para avaliação manual e bloqueio preventivo.,Fluxo Segurança
fraude,Tentativa de múltiplos reembolsos seguidos.,Sinalizar equipe antifraude.,Fluxo Segurança
`;

export interface PolicyRule {
  category: string;
  scenario: string;
  rule: string;
  source: string;
}

export interface GroupedPolicy {
  sourceName: string;
  rules: PolicyRule[];
}

export class PolicyRepository {
  static getFullContext(): string {
    return `--- BASE DE CONHECIMENTO (OFFICIAL POLICY) ---\n${RAW_POLICY_CSV}\n----------------------------------`;
  }

  /**
   * Parses the CSV to be displayed in the UI.
   * Logic handles quoted strings containing commas.
   */
  static getStructuredPolicies(): GroupedPolicy[] {
    const lines = RAW_POLICY_CSV.trim().split('\n');
    const rules: PolicyRule[] = [];

    // Skip header (index 0)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Regex to split by comma ONLY if not inside quotes
      const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      
      if (parts.length >= 4) {
        rules.push({
          category: parts[0].trim(),
          scenario: parts[1].trim().replace(/^"|"$/g, ''), // Remove surrounding quotes
          rule: parts[2].trim().replace(/^"|"$/g, ''),
          source: parts[3].trim()
        });
      }
    }

    // Group by Source
    const groups: { [key: string]: PolicyRule[] } = {};
    rules.forEach(rule => {
      if (!groups[rule.source]) {
        groups[rule.source] = [];
      }
      groups[rule.source].push(rule);
    });

    return Object.keys(groups).map(source => ({
      sourceName: source,
      rules: groups[source]
    })).sort((a, b) => a.sourceName.localeCompare(b.sourceName));
  }
}