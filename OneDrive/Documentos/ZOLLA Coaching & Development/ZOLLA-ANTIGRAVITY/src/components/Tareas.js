window.Tareas = {
   viewMode: 'calendario',

   render: () => {
      const monthKey = window.ZollaStore.state.month || 'marzo';
      const week = window.ZollaStore.state.week || 'todas';
      const data = window.StrategyData?.[monthKey] || { fokus: [], label: monthKey };
      const tasks = window.ZollaStore.state.tasks || [];

      const filteredTasks = week === 'todas' ? tasks : tasks.filter(t => t.w === String(week));

      if (!window.ZollaStore.state.completedPlanTasks) {
         try {
            window.ZollaStore.state.completedPlanTasks = JSON.parse(localStorage.getItem('zolla_completed_plan')) || [];
         } catch(e) {
            window.ZollaStore.state.completedPlanTasks = [];
         }
      }

       const hiddenPlan = window.ZollaStore.state.hiddenPlanTasks || [];
       const filteredPlanTasks = data.fokus.map((task, i) => {
          const id = 'p-' + monthKey + '-' + i;
          return {
             id,
             t: task.t,
             d: 'Plan Táctico ' + monthKey.charAt(0).toUpperCase() + monthKey.slice(1),
             c: task.d || 'NO ASIGNADO',
             p: 'Principal',
             dl: 'Semana ' + (task.w || '1'),
             w: task.w || '1',
             status: window.ZollaStore.state.completedPlanTasks.includes(id) ? 'Completada' : 'Pendiente',
             isPlan: true,
             isHidden: hiddenPlan.includes(id)
          };
       }).filter(t => !t.isHidden && (week === 'todas' || t.w === String(week)));

      let cronogramaTasks = [];
      if (window.Cronograma2026 && (monthKey === 'marzo' || monthKey === 'abril')) {
         cronogramaTasks = window.Cronograma2026.map((art, i) => {
            const isCurrentMonth = art.date.includes(monthKey === 'marzo' ? '-03-' : '-04-');
            if (!isCurrentMonth) return null;

            const dObj = new Date(art.date + 'T12:00:00Z');
            const d = dObj.getDate();
            const w = Math.ceil(d / 7);

            return {
               id: 'crono-' + i,
               t: 'Publicar: ' + art.title.substring(0, 30) + '...',
               d: 'Plan Editorial Viral',
               c: 'LinkedIn / Blog',
               p: 'Secundaria',
               w: String(w),
               status: 'Pendiente', 
               isPlan: false,
               isArticle: true,
               f: art.date 
            };
         }).filter(Boolean);
      }

      const allTasks = [...filteredPlanTasks, ...filteredTasks, ...cronogramaTasks];
      const viewMode = window.Tareas.viewMode || 'calendario';

      return `
      <div class="animate-fade-in space-y-12 pb-32 w-full">
         <div class="flex items-center justify-between border-b border-slate-200 pb-10 mb-12">
             <div class="flex items-center gap-4">
                 <div class="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400">
                     <i class="fas fa-clipboard-list text-xl text-slate-600"></i>
                 </div>
                 <div>
                     <h2 class="text-2xl font-bold text-slate-800 uppercase tracking-tighter italic">Hitos de Gestión</h2>
                     <p class="text-[11px] text-slate-500 font-medium tracking-widest uppercase">Planificación y seguimiento mensual</p>
                 </div>
             </div>
             <div class="flex items-center gap-4">
                 <div class="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
                     <button onclick="window.Tareas.viewMode='lista'; window.navigateTo('tareas');" class="${viewMode === 'lista' ? 'bg-slate-900 text-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'} px-6 py-2 rounded-md text-xs transition-all uppercase tracking-widest">Lista</button>
                     <button onclick="window.Tareas.viewMode='calendario'; window.navigateTo('tareas');" class="${viewMode === 'calendario' ? 'bg-slate-900 text-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'} px-6 py-2 rounded-md text-xs transition-all uppercase tracking-widest">Calendario</button>
                 </div>
                  <button onclick="Tareas.openModal()" class="bg-emerald-600 text-white px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center gap-2 border border-white/20">
                      <i class="fas fa-plus"></i> Añadir Hito
                  </button>
                  ${allTasks.length > 0 ? `
                  <button onclick="Tareas.confirmDeleteAll()" class="bg-white text-red-500 border border-red-200 px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all shadow-sm flex items-center gap-2">
                      <i class="fas fa-trash-alt"></i> Vaciar Todo
                  </button>
                  ` : ''}
              </div>
         </div>

         ${viewMode === 'lista' ? `
         <div class="grid grid-cols-1 gap-6">
            <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden min-h-[500px]">
                <div class="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 class="font-black text-slate-900 text-sm uppercase tracking-tight italic">Hitos Activos: ${week === 'todas' ? 'Todas las Semanas' : 'Semana ' + week}</h3>
                  <span class="px-5 py-2 rounded-full border border-emerald-100 bg-emerald-50 text-[10px] font-black text-emerald-600 tracking-widest uppercase shadow-sm animate-pulse">${allTasks.filter(t => t.status !== 'Completada').length} Pendientes</span>
               </div>
               <div class="p-10 space-y-4">
                  ${allTasks.map(task => `
                    <div class="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-2xl hover:border-emerald-500/30 transition-all cursor-pointer group">
                        <div class="flex items-center gap-6 flex-1" onclick="window.Tareas.openStatusModal('${task.id}', '${task.status}')">
                          <div class="w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${task.status === 'Completada' ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-200 group-hover:border-emerald-400 bg-white text-transparent'}">
                             <i class="fas fa-check text-xs"></i>
                          </div>
                           <div class="flex-1">
                              <h4 class="text-sm font-black ${task.status === 'Completada' ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-900'} uppercase tracking-tight">${task.t}</h4>
                              <p class="text-[9px] text-slate-500 font-bold mt-1 uppercase tracking-widest">${task.d} • <span class="text-slate-900">${task.c || 'Fernando'}</span> • <span class="text-indigo-600">WA ${task.w}</span></p>
                              ${task.status === 'Atrasada' && task.motive ? `
                                <div class="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl space-y-2">
                                   <p class="text-[9px] text-red-700 font-black uppercase tracking-tight">Motivo: <span class="font-bold lowercase">${task.motive}</span></p>
                                   ${task.nextStep ? `<p class="text-[9px] text-emerald-700 font-black uppercase tracking-tight">Estrategia: <span class="font-bold lowercase">${task.nextStep}</span></p>` : ''}
                                </div>
                              ` : ''}
                           </div>
                        </div>
                        <div class="flex items-center gap-4">
                           <span class="text-[8px] font-black ${task.p === 'Secundaria' ? 'text-slate-400 bg-slate-50' : 'text-emerald-700 bg-emerald-50 border-emerald-200'} px-4 py-1.5 rounded-lg border tracking-[0.2em] uppercase">${task.p || 'Directivo'}</span>
                           ${task.linkedContent ? `
                             <button onclick="Tareas.openPreview('${task.id}')" class="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                                <i class="fas fa-eye mr-2"></i> Previa
                             </button>
                           ` : ''}
                           <button onclick="${task.isPlan ? `window.ZollaStore.togglePlanTaskVisibility('${task.id}')` : `window.ZollaStore.deleteTask('${task.id}')`}; window.navigateTo('tareas');" 
                                   class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-500 transition-all border border-transparent hover:shadow-xl">
                              <i class="fas ${task.isPlan ? 'fa-eye-slash' : 'fa-trash-alt'} text-xs"></i>
                           </button>
                        </div>
                    </div>
                  `).join('')}
               </div>
            </div>
         </div>
         ` : `
         <div class="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden min-h-[85vh]">
             <div class="p-8 border-b border-slate-200 flex justify-between items-center bg-white">
                 <button class="text-slate-400 hover:text-slate-800 p-2 hover:bg-slate-50 rounded-lg transition-all"><i class="fas fa-chevron-left text-xl"></i></button>
                 <div class="text-center">
                     <span class="font-black text-slate-900 text-2xl uppercase tracking-tighter italic">${monthKey} 2026</span>
                     <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Sincronizado v46</p>
                 </div>
                 <button class="text-slate-400 hover:text-slate-800 p-2 hover:bg-slate-50 rounded-lg transition-all"><i class="fas fa-chevron-right text-xl"></i></button>
             </div>
             <div class="grid grid-cols-7 border-b border-slate-200 bg-slate-50/50">
                 ${['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => `<div class="p-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">${d}</div>`).join('')}
             </div>
             <div class="grid grid-cols-7 grid-rows-5 bg-slate-100/50 gap-[1px] border-b border-slate-200">
                 ${[...Array(35)].map((_, i) => {
          const dayNum = i + 1; 
          const isToday = dayNum === 2; 
          if (dayNum > 31) return '<div class="bg-slate-50/20 min-h-[140px] p-2"></div>';

          const dayTasks = allTasks.filter(t => {
             if (t.f) {
                const monthStr = monthKey === 'marzo' ? '-03-' : (monthKey === 'abril' ? '-04-' : '-XX-');
                if (t.f.includes(`${monthStr}${dayNum.toString().padStart(2, '0')}`)) {
                   return true;
                }
             }
             if (!t.f) {
                const w = parseInt(t.w);
                if (w === 1 && dayNum >= 1 && dayNum <= 7) return (dayNum % 7 === 3); 
                if (w === 2 && dayNum >= 8 && dayNum <= 14) return (dayNum % 7 === 3);
                if (w === 3 && dayNum >= 15 && dayNum <= 21) return (dayNum % 7 === 3);
                if (w === 4 && dayNum >= 22 && dayNum <= 31) return (dayNum % 10 === 3);
             }
             return false;
          });

          return `
          <div class="bg-white min-h-[160px] p-4 transition-all hover:bg-emerald-50/30 cursor-default flex flex-col border border-transparent hover:border-emerald-100 relative group/cal">
             <span class="font-black text-[12px] mb-3 self-end ${isToday ? 'text-white bg-emerald-600 w-7 h-7 rounded-xl flex items-center justify-center shadow-lg animate-pulse' : 'text-slate-300'}">${dayNum}</span>
             <div class="space-y-2 overflow-y-auto max-h-[110px] scrollbar-hide">
                 ${dayTasks.map(t => `
                    <div class="flex items-center gap-1 group/item">
                       <div onclick="${t.isArticle ? `window.navigateTo('cronograma')` : (t.linkedContent ? `Tareas.openPreview('${t.id}')` : `window.Tareas.openStatusModal('${t.id}', '${t.status}')`)}" 
                            class="flex-grow px-2 py-2 rounded-lg text-[9px] font-bold border truncate transition-all cursor-pointer ${t.status === 'Completada' ? 'bg-slate-50 text-slate-400 border-slate-100 line-through' : (t.isArticle ? 'bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20 hover:border-[#0A66C2] hover:bg-[#0A66C2]/20' : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:shadow-lg shadow-sm')}">
                           <i class="fas ${t.isArticle ? 'fa-calendar-alt text-[#0A66C2]' : (t.status === 'Completada' ? 'fa-check text-emerald-500' : 'fa-circle text-emerald-400 animate-pulse')} mr-1.5 text-[7px]"></i>
                           ${t.t}
                        </div>
                        <button onclick="${t.isPlan ? `window.ZollaStore.togglePlanTaskVisibility('${t.id}')` : `window.ZollaStore.deleteTask('${t.id}')`}; window.navigateTo('tareas');" 
                                class="w-7 h-7 rounded-lg flex items-center justify-center text-slate-200 hover:text-white hover:bg-red-500 transition-all border border-slate-50 hover:shadow-lg flex-shrink-0">
                           <i class="fas ${t.isPlan ? 'fa-eye-slash' : 'fa-trash-alt'} text-[8px]"></i>
                        </button>
                    </div>
                 `).join('')}
             </div>
          </div>`;
       }).join('')}
             </div>
         </div>
         `}

         <!-- MODALS -->
         <div id="new-task-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-8 transition-all">
            <div class="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
               <div class="p-8 border-b border-slate-100 flex items-center justify-between">
                  <h3 class="text-xl font-black text-slate-900 tracking-tight italic">NUEVO HITO DIRECTIVO</h3>
                  <button onclick="Tareas.closeModal()" class="text-slate-400 hover:text-slate-800"><i class="fas fa-times text-xl"></i></button>
               </div>
               <div class="p-10 space-y-6">
                  <div>
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-3 px-1">Título de Tarea</label>
                     <input type="text" id="task-title" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm text-slate-800 outline-none focus:border-emerald-500 transition-all" placeholder="Ej: Llamar a clientes prioritarios B2B">
                  </div>
                  <div class="grid grid-cols-2 gap-8">
                     <div>
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-3 px-1">Concepto</label>
                        <input type="text" id="task-dept" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm text-slate-800" value="Fernando">
                     </div>
                     <div>
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-3 px-1">SemanaWA</label>
                        <select id="task-week" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none">
                           <option value="1">Semana 1</option>
                           <option value="2">Semana 2</option>
                           <option value="3">Semana 3</option>
                           <option value="4">Semana 4</option>
                        </select>
                     </div>
                  </div>
               </div>
               <div class="p-10 border-t border-slate-100 flex gap-4 bg-slate-50/50">
                  <button onclick="Tareas.closeModal()" class="px-10 py-5 rounded-2xl text-[10px] font-black text-slate-400 bg-white border border-slate-200 uppercase tracking-widest w-1/3">Cancelar</button>
                  <button onclick="Tareas.createTask()" class="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-200 flex-1 hover:bg-emerald-700">Crear Hito</button>
               </div>
            </div>
         </div>

         <!-- Status Modal -->
         <div id="task-status-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[210] flex items-center justify-center p-8 transition-all">
            <div class="bg-white w-full max-w-lg rounded-3xl shadow-3xl border border-slate-100">
               <div class="p-10 border-b border-slate-100">
                  <h3 class="text-xl font-black text-slate-800 italic">ESTADO DEL HITO</h3>
               </div>
               <div class="p-10 space-y-8">
                  <div>
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block italic">Acción Correctiva o Cierre</label>
                     <select id="task-new-status" onchange="Tareas.handleStatusUI(this.value)" class="w-full bg-slate-900 text-white rounded-2xl px-6 py-5 font-bold text-xs uppercase tracking-widest shadow-xl outline-none">
                        <option value="Pendiente">PENDIENTE</option>
                        <option value="Completada">COMPLETADA ✅</option>
                        <option value="Atrasada">NO COMPLETADA ⚠️</option>
                     </select>
                  </div>
                  <div id="failure-fields" class="hidden space-y-6 animate-fade-in">
                    <div>
                       <label class="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">Motivo de Desviación</label>
                       <textarea id="task-motive" rows="3" class="w-full bg-red-50 border border-red-100 rounded-2xl px-6 py-4 font-bold text-xs text-red-900 outline-none" placeholder="Escribe el obstáculo..."></textarea>
                    </div>
                    <div>
                       <label class="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-1">Próximo Paso Estratégico</label>
                       <input type="text" id="task-next-step" class="w-full bg-emerald-50 border border-emerald-100 rounded-2xl px-6 py-4 font-bold text-xs text-emerald-900 outline-none" placeholder="¿Cómo lo resolvemos?">
                    </div>
                  </div>
               </div>
               <div class="p-10 border-t border-slate-100 flex gap-4 bg-slate-50/50">
                  <button onclick="Tareas.closeStatusModal()" class="px-8 py-5 rounded-2xl text-[10px] font-black text-slate-500 bg-white border border-slate-200 flex-1 uppercase tracking-widest">Cerrar</button>
                  <button onclick="Tareas.updateTaskStatus()" class="bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex-1 shadow-2xl">ACEPTAR CAMBIOS</button>
               </div>
            </div>
         </div>
      </div>`;
   },

   openModal: () => {
      const modal = document.getElementById('new-task-modal');
      if (modal) {
         modal.classList.remove('hidden');
         const titleEl = document.getElementById('task-title');
         if (titleEl) { titleEl.value = ''; titleEl.focus(); }
      }
   },

   closeModal: () => {
      document.getElementById('new-task-modal')?.classList.add('hidden');
   },

   openStatusModal: (id, currentStatus) => {
      window.activeTaskId = id;
      const modal = document.getElementById('task-status-modal');
      const statusSelect = document.getElementById('task-new-status');
      if (modal && statusSelect) {
         statusSelect.value = currentStatus;
         
         const task = window.ZollaStore.state.tasks.find(tk => tk.id == id);
         const planTask = !task && id.startsWith('p-');
         
         document.getElementById('task-motive').value = task?.motive || '';
         document.getElementById('task-next-step').value = task?.nextStep || '';

         Tareas.handleStatusUI(currentStatus);
         modal.classList.remove('hidden');
      }
   },

   closeStatusModal: () => {
      document.getElementById('task-status-modal')?.classList.add('hidden');
      window.activeTaskId = null;
   },

   handleStatusUI: (status) => {
      const ff = document.getElementById('failure-fields');
      if (status === 'Atrasada') ff?.classList.remove('hidden');
      else ff?.classList.add('hidden');
   },

   updateTaskStatus: () => {
      const id = window.activeTaskId;
      const status = document.getElementById('task-new-status').value;
      const motive = document.getElementById('task-motive').value;
      const nextStep = document.getElementById('task-next-step').value;

      if (!id) return;

      if (id.startsWith('p-')) {
         if (status === 'Completada') {
            if (!window.ZollaStore.state.completedPlanTasks.includes(id)) 
               window.ZollaStore.state.completedPlanTasks.push(id);
         } else {
            window.ZollaStore.state.completedPlanTasks = window.ZollaStore.state.completedPlanTasks.filter(x => x !== id);
         }
         localStorage.setItem('zolla_completed_plan', JSON.stringify(window.ZollaStore.state.completedPlanTasks));
      } else {
         window.ZollaStore.updateTask(id, { status, motive, nextStep });
      }

      Tareas.closeStatusModal();
      window.navigateTo('tareas');
   },

   createTask: () => {
      const t = document.getElementById('task-title')?.value?.trim();
      const d = document.getElementById('task-dept')?.value?.trim() || 'Fernando';
      const w = document.getElementById('task-week')?.value || '1';
      if (!t) return window.showNotification('Campo requerido', 'Ingresa un título.', 'warning');
      window.ZollaStore.addTask({ t, d, w, p: 'Principal', status: 'Pendiente' });
      Tareas.closeModal();
      window.navigateTo('tareas');
      window.showNotification('Éxito', 'Hito añadido.', 'success');
   },

   confirmDeleteAll: () => {
      if (confirm('¿Vaciar planificador completo?')) {
         window.ZollaStore.deleteAllTasks();
         window.navigateTo('tareas');
      }
   },

   init: () => { }
};
