window.KPIs = {
   render: () => {
      const monthKey = window.ZollaStore.state.month || 'marzo';
      const data = window.StrategyData?.[monthKey] || { fokus: [], label: monthKey, metrics: [], objetivo: '' };
      const kpis = window.ZollaStore.state.kpis || {};
      const tasks = window.ZollaStore.state.tasks || [];
      const pipeline = window.ZollaStore.state.pipeline || [];

      const tasksCompleted = tasks.filter(t => t.status === 'Completada').length;
      const planTasksCount = Array.isArray(data.fokus) ? data.fokus.length : 0;
      const totalTasks = tasks.length + planTasksCount;
      const completionRate = totalTasks > 0 ? Math.min(100, Math.round((tasksCompleted / totalTasks) * 100)) : 0;

      const pipelineValue = pipeline.length * 5.000;
      const dealsClosed = pipeline.filter(p => p.status === 'cierre').length;

      return `
      <div class="w-full animate-fade-in space-y-12 pb-32">
        
        <!-- Header: Clean Executive Style -->
        <div class="flex items-end justify-between border-b border-slate-200 pb-10 mb-12">
          <div>
            <h2 class="text-3xl font-black text-slate-800 mb-2 flex items-center gap-3">
                <i class="fas fa-camera-retro text-emerald-500"></i> LA FOTO DEL MES
            </h2>
            <div class="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
                <span>Protocolo: <span class="text-slate-800">${data.label}</span></span>
                <span class="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                <span class="flex items-center gap-1.5 text-emerald-600"><div class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Sincronizado</span>
            </div>
          </div>
          <button onclick="window.print()" class="bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-sm transition-all focus:ring-2 focus:ring-emerald-500/20">
             <i class="fas fa-file-pdf mr-3"></i> Exportar Analítica
          </button>
        </div>

        <div class="grid grid-cols-12 gap-8">
          
          <!-- Key Indicators -->
          <div class="col-span-12 lg:col-span-8 space-y-8">
             <div class="grid grid-cols-3 gap-6 relative">
                <!-- Exec Card -->
                <div class="bg-white p-8 text-center border border-slate-200 shadow-sm rounded-3xl flex flex-col items-center justify-center min-h-[250px] group transition-all hover:shadow-md hover:border-emerald-200 relative overflow-hidden">
                   <p class="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-6">Ejecución Operativa</p>
                   <div class="relative w-32 h-32 mb-6">
                       <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                           <path class="text-slate-100" stroke-width="2.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                           <path class="text-emerald-500" stroke-dasharray="${completionRate}, 100" stroke-width="2.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                       </svg>
                       <div class="absolute inset-0 flex items-center justify-center text-3xl text-slate-800 font-black">${completionRate}%</div>
                   </div>
                   <p class="text-[9px] text-slate-500 font-bold uppercase tracking-widest">${tasksCompleted} de ${totalTasks} hitos logrados</p>
                </div>

                <!-- Pipeline Card -->
                <div class="bg-white p-8 text-center border border-slate-200 shadow-sm rounded-3xl flex flex-col items-center justify-center min-h-[250px] group transition-all hover:shadow-md hover:border-emerald-200">
                   <p class="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-6">Valor Proyectado</p>
                   <p class="text-4xl font-black text-slate-800 leading-none mb-6">$${pipelineValue.toFixed(3)}<span class="text-lg text-slate-400 ml-1">K</span></p>
                   <div class="flex gap-1.5 justify-center w-full px-6">
                       ${[1, 2, 3, 4, 5, 6].map(i => `<div class="flex-1 h-3 rounded-full ${i <= (pipeline.length) ? 'bg-emerald-500' : 'bg-slate-100'}"></div>`).join('')}
                   </div>
                </div>

                <!-- Cierre Card -->
                <div class="bg-emerald-50 p-8 text-center border border-emerald-100 shadow-sm rounded-3xl flex flex-col items-center justify-center min-h-[250px] group transition-all relative overflow-hidden">
                   <p class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-6">Conversión Real</p>
                   <p class="text-7xl font-black text-emerald-700 leading-none mb-4 absolute drop-shadow-sm">${dealsClosed}</p>
                   <div class="mt-auto relative z-10 w-full pt-20">
                       <p class="text-[9px] text-emerald-700/70 font-bold uppercase tracking-widest bg-emerald-100/50 py-2 rounded-xl inline-block px-4">Meta Mínima: 1 Cierre / Mes</p>
                   </div>
                </div>
             </div>

             <!-- Detailed Breakdown Table -->
             <div class="bg-white p-10 border border-slate-200 shadow-sm rounded-3xl mt-8">
                <div class="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                   <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shadow-inner border border-blue-100">
                       <i class="fas fa-chart-bar text-xs"></i>
                   </div>
                   <h3 class="text-[15px] font-bold text-slate-800 uppercase tracking-widest">Desglose de Cumplimiento Táctico</h3>
                </div>
                <div class="grid grid-cols-2 gap-x-12 gap-y-8">
                   ${data.metrics.map(m => `
                     <div class="space-y-3 group cursor-default">
                        <div class="flex justify-between items-end px-1">
                           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-amber-600 transition-all">${m.l}</span>
                           <span class="text-xs font-black text-slate-700">${m.v} <span class="text-[9px] text-slate-400 font-medium">/ ${m.m}</span></span>
                        </div>
                        <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div class="h-full bg-amber-400 group-hover:bg-amber-500 transition-all rounded-full" style="width: ${Math.min((m.v / m.m) * 100, 100)}%"></div>
                        </div>
                     </div>
                   `).join('')}
                </div>
             </div>
          </div>

          <!-- Side Insights -->
          <div class="col-span-12 lg:col-span-4 space-y-6">
             <div class="bg-white p-8 border border-slate-200 shadow-sm rounded-3xl">
                <div class="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
                    <i class="fas fa-bullseye text-emerald-500"></i>
                    <h3 class="text-[12px] font-bold text-slate-700 uppercase tracking-widest">Hitos / Logros</h3>
                </div>
                <div class="space-y-5">
                   ${['Pipeline ORASI Lab Sincronizado', 'Auditoría de Cartera Finalizada', 'Mensajería de Reingreso Validada'].map(logro => `
                     <div class="flex gap-3 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <div class="bg-white rounded-full p-1 shadow-sm mt-0.5">
                            <i class="fas fa-check text-emerald-500 text-[9px]"></i>
                        </div>
                        <p class="text-[11px] font-bold text-slate-600 leading-snug pt-0.5">${logro}</p>
                     </div>
                   `).join('')}
                </div>
             </div>

             <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border border-blue-100 shadow-sm rounded-3xl relative overflow-hidden">
                <div class="flex items-center gap-3 mb-5">
                   <div class="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm border border-blue-100">
                       <i class="fas fa-robot text-xs"></i>
                   </div>
                   <h3 class="text-[11px] font-black text-blue-800 uppercase tracking-widest">Zolla IA Insight</h3>
                </div>
                <p class="text-[12px] font-medium leading-relaxed italic text-blue-900/80 relative z-10">
                   "Fernando, el flujo de leads en Marzo está por encima del promedio histórico. Te sugiero priorizar el seguimiento de las 3 oportunidades en Cierre para asegurar el Forecast del Q1."
                </p>
                <!-- Decorative BG icon -->
                <i class="fas fa-quote-right absolute -bottom-4 -right-2 text-7xl text-blue-500/5 rotate-12"></i>
             </div>
          </div>
        </div>
      </div>
    `;
   },

   init: () => { }
};
