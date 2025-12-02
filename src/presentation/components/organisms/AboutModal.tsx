import React from 'react';
import { APP_CONFIG } from '../../../main/config/constants';
import { modalStyles } from '../../styles/componentStyles';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.backdrop} onClick={onClose} />
      
      <div className={`${modalStyles.container} max-w-lg`}>
        {/* Header */}
        <div className={modalStyles.header}>
          <h2 className={modalStyles.title}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#EA1D2C]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Sobre o {APP_CONFIG.TITLE}
          </h2>
          <button onClick={onClose} className={modalStyles.closeButton}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className={modalStyles.content}>
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="w-16 h-16 bg-[#EA1D2C] rounded-full flex items-center justify-center text-white font-black text-2xl shadow-lg mb-4">
              iN
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{APP_CONFIG.TITLE}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{APP_CONFIG.SUBTITLE}</p>
            <span className="mt-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-mono rounded-full border border-gray-200 dark:border-gray-700">
              Versão 1.0.0 (Enterprise Beta)
            </span>
          </div>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 text-justify leading-relaxed">
            <p>
              O <strong>iFood Nexus</strong> é uma ferramenta interna de Inteligência Artificial desenvolvida para auxiliar o time de Customer Experience (CX) e Operações na tomada de decisão sobre reembolsos e cancelamentos.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded-r-lg">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 text-xs uppercase mb-1">Como Funciona</h4>
              <p className="text-blue-700 dark:text-blue-200 text-xs">
                Utilizamos uma arquitetura Neuro-Simbólica que consulta a Base de Conhecimento Oficial (CSV) antes de gerar qualquer resposta, garantindo alinhamento com as políticas vigentes.
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-3 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 dark:text-yellow-300 text-xs uppercase mb-1">Aviso Importante</h4>
              <p className="text-yellow-700 dark:text-yellow-200 text-xs">
                Esta é uma ferramenta de <strong>apoio à decisão</strong>. A responsabilidade final sobre o ticket é sempre do analista humano. Em caso de dúvida ou baixa confiança na IA, siga o procedimento manual.
              </p>
            </div>

             <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4 text-center">
               <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest">
                 Propriedade Intelectual iFood • Uso Interno
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};