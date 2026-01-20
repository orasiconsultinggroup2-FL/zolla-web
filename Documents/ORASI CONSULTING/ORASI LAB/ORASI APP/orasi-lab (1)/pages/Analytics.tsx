import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#111722] overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Análisis de Rendimiento</h1>
            <p className="mt-1 text-[#92a4c9]">Métricas de conexión emocional y sentimiento de la audiencia</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-[#232f48] p-5 border border-transparent hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#92a4c9]">Índice de Conexión</p>
                <h3 className="mt-2 text-2xl font-bold text-white">85%</h3>
              </div>
              <div className="rounded-lg bg-[#0bda5e]/10 p-2 text-[#0bda5e]">
                <span className="material-symbols-outlined text-[24px]">volunteer_activism</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;