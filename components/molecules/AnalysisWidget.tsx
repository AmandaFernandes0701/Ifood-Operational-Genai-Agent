
import React, { useState } from 'react';
import { AnalysisData } from '../../utils/messageParser';

interface AnalysisWidgetProps {
  data: AnalysisData;
}

export const AnalysisWidget: React.FC<AnalysisWidgetProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to determine colors based on content
  const getConfidenceColor = (level: string) => {
    switch (level) {
      case 'Alto': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
      case 'Médio': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
      default: return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('Aprovar')) return 'text-green-600 dark:text-green-400';
    if (action.includes('Negar')) return 'text-red-600 dark:text-red-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  return (
    <div className="mb-3">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-auto"
      >
        <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/40 text-[#EA1D2C] dark:text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
          </svg>
          {/* Pulse effect if confidence is low */}
          {data.confidence === 'Baixo' && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          )}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">Dados de IA</span>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 group-hover:text-[#EA1D2C] transition-colors">
            Visualizar Análise Técnica
          </span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-auto text-gray-400 group-hover:translate-x-1 transition-transform">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Modal / Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/30 dark:bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Card Content */}
          <div className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="bg-[#EA1D2C] px-5 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 opacity-90">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-lg tracking-tight">Análise Interna</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              
              {/* Category */}
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categoria</span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{data.category}</span>
              </div>

              {/* Confidence Badge */}
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Confiança IA</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getConfidenceColor(data.confidence)}`}>
                  {data.confidence}
                </span>
              </div>

              {/* Policy Card */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-100 dark:border-gray-600">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Política Citada</span>
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#EA1D2C] mt-0.5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13.5a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V4.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-tight">
                    {data.policy}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 text-center">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Recomendação</span>
                <span className={`text-xl font-bold ${getActionColor(data.action)}`}>
                  {data.action}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
