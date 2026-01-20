import React from 'react';

const Editor: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-dark">
      <header className="h-16 flex items-center justify-between border-b border-border-dark px-6 bg-background-dark shrink-0 z-10">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-text-secondary">notes</span>
          <nav className="flex items-center gap-2 text-sm text-text-secondary">
            <span>Borradores</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-white font-medium">El Futuro del Trabajo Remoto</span>
          </nav>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/20">GUARDADO</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2">
            <span>Exportar</span>
            <span className="material-symbols-outlined text-[18px]">ios_share</span>
          </button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <section className="w-[300px] flex-shrink-0 flex flex-col border-r border-border-dark bg-panel-dark relative z-0 hidden lg:flex">
          <div className="p-4 border-b border-border-dark bg-panel-dark">
            <h2 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">smart_toy</span>
              Herramientas IA
            </h2>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            <div className="bg-surface-dark border border-border-dark rounded-lg p-3">
               <h3 className="text-sm font-medium text-white mb-2">Resumir</h3>
               <p className="text-xs text-text-secondary mb-3">Genera un breve resumen del texto seleccionado.</p>
               <button className="w-full py-1.5 bg-[#232f48] hover:bg-primary text-xs text-white rounded transition-colors">Ejecutar</button>
            </div>
            <div className="bg-surface-dark border border-border-dark rounded-lg p-3">
               <h3 className="text-sm font-medium text-white mb-2">Cambiar Tono</h3>
               <p className="text-xs text-text-secondary mb-3">Reescribe para coincidir con tu voz de marca.</p>
               <button className="w-full py-1.5 bg-[#232f48] hover:bg-primary text-xs text-white rounded transition-colors">Ejecutar</button>
            </div>
          </div>
        </section>
        <section className="flex-1 flex flex-col bg-background-dark min-w-0 relative">
          <div className="flex-1 overflow-y-auto relative">
            <div className="max-w-[850px] mx-auto py-12 px-12 min-h-full">
              <input className="w-full bg-transparent text-4xl font-bold text-white mb-6 border-none focus:ring-0 p-0 placeholder:text-text-secondary/30 outline-none" placeholder="Documento Sin Título" type="text" defaultValue="El Futuro del Trabajo Remoto"/>
              <div className="editor-content text-lg leading-relaxed text-gray-300 font-light space-y-6 outline-none" contentEditable="true">
                <p>El trabajo remoto ha pasado de ser un beneficio raro a una necesidad global...</p>
                <h2 className="text-2xl font-bold text-white pt-4">Más allá de la oficina</h2>
                <p>La línea borrosa entre el hogar y la oficina...</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Editor;