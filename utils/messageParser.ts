
export interface AnalysisData {
  category: string;
  confidence: 'Baixo' | 'Médio' | 'Alto';
  policy: string;
  action: 'Aprovar' | 'Negar' | 'Solicitar Validação Humana';
  raw: string;
}

export interface ParsedMessage {
  analysis: AnalysisData | null;
  cleanText: string;
}

/**
 * Extracts the "ANÁLISE INTERNA" block and separates it from the user response.
 */
export const extractAnalysisAndResponse = (fullText: string): ParsedMessage => {
  if (!fullText.includes('ANÁLISE INTERNA')) {
    return { analysis: null, cleanText: fullText };
  }

  const sections = fullText.split('---').map(s => s.trim());
  let analysis: AnalysisData | null = null;
  let cleanTextParts: string[] = [];

  sections.forEach(section => {
    if (section.includes('ANÁLISE INTERNA')) {
      analysis = parseAnalysisBlock(section);
    } else if (section.includes('RESPOSTA AO FOODLOVER')) {
      const text = section
        .replace(/🤖 \*\*RESPOSTA AO FOODLOVER:\*\*/g, '')
        .replace(/RESPOSTA AO FOODLOVER:/g, '')
        .trim();
      cleanTextParts.push(text);
    } else if (section.length > 0) {
      cleanTextParts.push(section);
    }
  });

  return {
    analysis,
    cleanText: cleanTextParts.join('\n\n')
  };
};

const parseAnalysisBlock = (block: string): AnalysisData => {
  const getVal = (key: string) => {
    const regex = new RegExp(`\\*\\*${key}:\\*\\*\\s*(.*)`);
    const match = block.match(regex);
    return match ? match[1].trim() : 'N/A';
  };

  return {
    category: getVal('Categoria do Caso'),
    confidence: getVal('Nível de Confiança') as any,
    policy: getVal('Política Citada'),
    action: getVal('Ação Recomendada') as any,
    raw: block
  };
};
