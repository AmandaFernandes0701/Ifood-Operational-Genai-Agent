import React from 'react';
import { PolicyRepository, GroupedPolicy } from '../../../infrastructure/data/PolicyRepository';
import { modalStyles } from '../../styles/componentStyles';

interface PoliciesModalProps {
  onClose: () => void;
}

export const PoliciesModal: React.FC<PoliciesModalProps> = ({ onClose }) => {
  const policies: GroupedPolicy[] = PolicyRepository.getStructuredPolicies();

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.backdrop} onClick={onClose} />
      
      <div className={modalStyles.container}>
        {/* Header */}
        <div className={modalStyles.header}>
          <h2 className={modalStyles.title}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#EA1D2C]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Políticas & Diretrizes Oficiais
          </h2>
          <button onClick={onClose} className={modalStyles.closeButton}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className={modalStyles.content}>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Abaixo estão listadas todas as regras vigentes importadas da Base de Conhecimento Operacional do iFood Nexus.
              Utilize estas diretrizes para embasar suas decisões.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {policies.map((group, index) => (
              <div key={index} className="bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#EA1D2C]"></div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wide">
                    {group.sourceName}
                  </h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {group.rules.map((rule, rIndex) => (
                    <div key={rIndex} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          {rule.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        {rule.scenario}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {rule.rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};