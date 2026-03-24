window.Dashboard = {
   render: () => {
      const monthKey = window.ZollaStore.state.month || 'marzo';
      const week = window.ZollaStore.state.week || 'todas';
      const data = window.StrategyData?.[monthKey] || { fokus: [], objetivo: 'Sin datos', label: '' };
      const kpis = window.ZollaStore.state.kpis || {};
      const pipeline = window.ZollaStore.state.pipeline || [];

      const activePipelineCount = Object.values(pipeline).length;
      const safeFokus = Array.isArray(data.fokus) ? data.fokus : Object.values(data.fokus || {});
      const filteredFokus = week === 'todas' ? safeFokus : safeFokus.filter(t => (t.w || '1') === String(week));
      const totalTasks = filteredFokus.length;
      
      const rawTasks = window.ZollaStore.state.tasks || [];
      const safeTasks = Array.isArray(rawTasks) ? rawTasks : Object.values(rawTasks);
      const storeTasks = week === 'todas' ? safeTasks : safeTasks.filter(t => t.w === String(week));

      const pyramidPath = `./src/assets/pyramid_3d.png`;
      const fallbackImg = `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800`;

      return `
      <div class="w-full space-y-12 animate-fade-in pb-32">
        
         <!-- HEADER: Command Input & User Profile -->
         <header class="flex items-center justify-between gap-12 bg-white border border-slate-200 p-10 rounded-3xl shadow-premium">
            <div class="flex-1 max-w-5xl flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-8 py-5 focus-within:border-emerald-500/50 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all relative group shadow-inner">
               <i class="fas fa-terminal text-emerald-500 mr-5 text-sm"></i>
               <input type="text" 
                      id="ia-command-bar"
                      onkeypress="if(event.key === 'Enter') Dashboard.handleCommand(this.value)"
                      placeholder="Escribe lo que quieres hacer..." 
                      class="bg-transparent !border-none !outline-none text-base font-semibold text-slate-800 w-full placeholder:text-slate-400 !p-0">
            </div>
            
            <div class="flex items-center gap-6 pr-4">
               <div class="text-right">
                  <p class="text-sm font-black text-slate-900 leading-none">Fernando Zolla</p>
                  <p class="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-2">Operations Director</p>
               </div>
               <div class="w-14 h-14 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center font-bold text-emerald-600 shadow-sm hover:scale-105 transition-transform cursor-pointer overflow-hidden">
                  <img src="${pyramidPath}" onerror="this.src='${fallbackImg}';" class="w-full h-full object-cover" alt="FZ">
               </div>
            </div>
         </header>

        <!-- MAIN GRID 12 cols -->
        <div class="grid grid-cols-12 gap-8">
           
           <!-- COLUMN LEFT (4): Strategic Vision -->
           <div class="col-span-12 xl:col-span-4 space-y-8">
              <div class="premium-card flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden text-center group">
                 <h3 class="text-sm font-black text-slate-800 mb-10 flex items-center gap-3">
                    <i class="fas fa-microchip text-emerald-500"></i> Arquitectura ORASI Lab
                 </h3>

                 <div class="relative w-full max-w-[280px] mb-10 transform transition-transform group-hover:scale-105 duration-500">
                    <img src="${pyramidPath}" 
                         onerror="this.src='${fallbackImg}'; this.className='w-full aspect-square object-cover rounded-3xl opacity-50'"
                         class="w-full h-auto drop-shadow-xl">
                 </div>

                 <div class="w-full bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-inner">
                    <div class="flex justify-between items-end mb-3 px-1">
                       <p class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Ecosistema Digital</p>
                       <p class="text-xs font-black text-emerald-600">Optimizado</p>
                    </div>
                    <div class="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                       <div class="h-full bg-emerald-500 rounded-full" style="width: 88%"></div>
                    </div>
                 </div>
              </div>
           </div>

           <!-- COLUMN RIGHT (8): Roadmap & Operations -->
           <div class="col-span-12 xl:col-span-8 flex flex-col gap-8">
              
              <div class="flex gap-4 p-3 bg-white rounded-2xl shadow-premium border border-slate-200">
                 ${['MARZO', 'ABRIL', 'MAYO', 'JUNIO'].map(m => `
                   <div onclick="window.ZollaStore.setMonth('${m.toLowerCase()}'); window.navigateTo('dashboard');" 
                        class="flex-1 text-center py-4 rounded-xl text-[11px] font-black uppercase tracking-widest cursor-pointer transition-all ${monthKey === m.toLowerCase() ? 'bg-emerald-600 text-white shadow-lg scale-105 z-10' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}">
                     ${m}
                   </div>
                 `).join('')}
              </div>

              <div class="grid grid-cols-3 gap-8">
                 <div class="premium-card !p-8 flex flex-col justify-between group hover:!border-emerald-500 transition-all cursor-default">
                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">Misión Global</p>
                    <div class="flex items-center justify-between">
                       <span class="text-5xl font-black text-slate-900">${totalTasks}</span>
                       <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-all">
                           <i class="fas fa-bullseye text-slate-400 group-hover:text-emerald-500 transition-all text-2xl"></i>
                       </div>
                    </div>
                 </div>
                 <div class="premium-card !p-8 flex flex-col justify-between group hover:!border-blue-500 transition-all cursor-default">
                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">Entidades Activas</p>
                    <div class="flex items-center justify-between">
                       <span class="text-5xl font-black text-slate-900">${activePipelineCount}</span>
                       <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-all">
                           <i class="fas fa-users-viewfinder text-slate-400 group-hover:text-blue-500 transition-all text-2xl"></i>
                       </div>
                    </div>
                 </div>
                 <div class="premium-card !p-8 !bg-emerald-600 border-emerald-500 flex flex-col justify-between group transition-all cursor-default shadow-emerald-500/20">
                    <p class="text-[10px] font-black text-emerald-100 uppercase tracking-widest mb-10 text-emerald-100/70">Forecast Q1</p>
                    <div class="flex items-center justify-between">
                       <span class="text-4xl font-black text-white">$${(activePipelineCount * 5.0).toFixed(3)}</span>
                       <div class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                           <i class="fas fa-sack-dollar text-2xl"></i>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- OPERATIONS BOARD -->
              <div class="premium-card flex-1 flex flex-col overflow-hidden relative">
                 <div class="absolute top-0 right-0 p-8">
                    <div class="px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-md text-[9px] font-bold text-emerald-600 uppercase tracking-widest">${week === 'todas' ? 'Todas las Semanas' : 'Iteración S0' + week}</div>
                 </div>
                 
                  <div class="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                     <div class="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
                        <i class="fas fa-crosshairs text-slate-400"></i>
                     </div>
                     <div>
                        <p class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Objetivo Principal</p>
                        <h4 class="text-lg font-black text-slate-900 mt-1">${data.objetivo}</h4>
                     </div>
                  </div>

                 <div class="space-y-4 overflow-y-auto pr-2 scrollbar-hide">
                    ${filteredFokus.map((task, i) => `
                      <div class="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:shadow-md hover:border-emerald-500/30 transition-all cursor-pointer group">
                         <div class="flex items-center gap-6">
                            <div class="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                                <span class="text-[11px] font-bold text-slate-500 group-hover:text-emerald-600 transition-all">0${i + 1}</span>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-all leading-tight">${task.t}</p>
                                <p class="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-1.5">${task.d}</p>
                            </div>
                         </div>
                         <div class="flex items-center gap-4">
                            <span class="text-[9px] font-bold text-amber-500 bg-amber-50 px-3 py-1 rounded border border-amber-100 uppercase tracking-widest group-hover:bg-amber-100 transition-all">S0${task.w || '1'}</span>
                         </div>
                      </div>
                    `).join('')}
                    ${(storeTasks || []).map(task => `
                      <div class="flex items-center justify-between p-5 bg-emerald-50 border border-emerald-100 rounded-2xl hover:shadow-md transition-all cursor-pointer group">
                         <div class="flex items-center gap-6">
                            <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                                <i class="fas fa-plus text-emerald-600 text-[10px]"></i>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-emerald-800 leading-tight">${task.t}</p>
                                <p class="text-[10px] text-emerald-600 font-medium uppercase tracking-widest mt-1.5">Tarea Manual | ${task.d}</p>
                            </div>
                         </div>
                         <div class="flex items-center gap-4">
                            <span class="text-[9px] font-bold text-emerald-600 bg-white px-3 py-1 rounded border border-emerald-200 uppercase tracking-widest shadow-sm">${task.s || 'Pendiente'}</span>
                         </div>
                      </div>
                    `).join('')}
                 </div>
              </div>

           </div>
        </div>
      </div>
    `;
   },

   handleCommand: (val) => {
      if (!val) return;
      const cmd = val.toLowerCase();
      if (cmd.includes('post') || cmd.includes('narrativa')) window.navigateTo('contenido');
      else if (cmd.includes('email') || cmd.includes('guion')) window.navigateTo('emails');
      else if (cmd.includes('tarea') || cmd.includes('mision')) window.navigateTo('tareas');
      else if (cmd.includes('foto') || cmd.includes('kpi')) window.navigateTo('kpis');
      else window.showNotification("Análisis Iniciado", "Análisis Táctico iniciado para: " + val, "success");
      document.getElementById('ia-command-bar').value = '';
   }
};
