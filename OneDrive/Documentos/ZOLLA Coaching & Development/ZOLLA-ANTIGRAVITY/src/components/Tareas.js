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

      const filteredPlanTasks = data.fokus.map((task, i) => ({
         id: 'p-' + monthKey + '-' + i,
         t: task.t,
         d: 'Plan Táctico ' + monthKey.charAt(0).toUpperCase() + monthKey.slice(1),
         c: task.d || 'NO ASIGNADO',
         p: 'Principal',
         dl: 'Semana ' + (task.w || '1'),
         w: task.w || '1',
         status: window.ZollaStore.state.completedPlanTasks.includes('p-' + monthKey + '-' + i) ? 'Completada' : 'Pendiente',
         isPlan: true
      })).filter(t => week === 'todas' || t.w === String(week));

      const allTasks = [...filteredPlanTasks, ...filteredTasks];
      const viewMode = window.Tareas.viewMode || 'calendario';

      return `
      <div class="animate-fade-in space-y-12 pb-32 w-full">
         <div class="flex items-center justify-between border-b border-slate-200 pb-10 mb-12">
             <div class="flex items-center gap-4">
                 <div class="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400">
                     <i class="fas fa-clipboard-list text-xl text-slate-600"></i>
                 </div>
                 <div>
                     <h2 class="text-2xl font-bold text-slate-800">Tareas</h2>
                     <p class="text-[11px] text-slate-500 font-medium">Planificación y seguimiento</p>
                 </div>
             </div>
             <div class="flex items-center gap-4">
                 <div class="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
                     <button onclick="window.Tareas.viewMode='lista'; window.navigateTo('tareas');" class="${viewMode === 'lista' ? 'bg-emerald-500 text-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'} px-6 py-2 rounded-md text-xs transition-all">Lista</button>
                     <button onclick="window.Tareas.viewMode='calendario'; window.navigateTo('tareas');" class="${viewMode === 'calendario' ? 'bg-emerald-500 text-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'} px-6 py-2 rounded-md text-xs transition-all">Calendario</button>
                 </div>
                 <button onclick="Tareas.openModal()" class="bg-emerald-500 text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-emerald-600 transition-all shadow-sm flex items-center gap-2">
                     <i class="fas fa-plus"></i> Nueva Tarea
                 </button>
             </div>
         </div>

         ${viewMode === 'lista' ? `
         <div class="grid grid-cols-1 gap-6">
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 class="font-bold text-slate-800 text-sm">Hitos Activos: ${week === 'todas' ? 'Todas las Semanas' : 'Semana ' + week}</h3>
                  <span class="px-4 py-1.5 rounded-full border border-slate-200 bg-white text-[10px] font-bold text-slate-500 tracking-wider shadow-sm">${allTasks.filter(t => t.status !== 'Completada').length} Pendientes</span>
               </div>
               <div class="p-8 space-y-4">
                  ${allTasks.map(task => `
                    <div class="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-emerald-500/30 transition-all cursor-pointer group">
                        <div class="flex items-center gap-5 flex-1" onclick="window.Tareas.openStatusModal('${task.id}', '${task.status}')">
                          <div class="w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${task.status === 'Completada' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 group-hover:border-emerald-400 bg-white'}">
                             ${task.status === 'Completada' ? '<i class="fas fa-check text-emerald-500 text-xs"></i>' : ''}
                          </div>
                           <div class="flex-1">
                              <h4 class="text-sm font-black ${task.status === 'Completada' ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-900'}">${task.t}</h4>
                              <p class="text-[10px] text-slate-600 font-bold mt-1 uppercase tracking-widest">${task.d} • Responsable: <span class="text-slate-900 font-black">${task.c || 'NO ASIGNADO'}</span> • Deadline: <span class="text-slate-900 font-black">${task.dl || 'S' + task.w}</span></p>
                              ${task.status === 'Atrasada' && task.motive ? `
                                <div class="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl space-y-2">
                                   <p class="text-[10px] text-red-700 font-black uppercase tracking-tight">Motivo: <span class="font-bold lowercase">${task.motive}</span></p>
                                   ${task.nextStep ? `<p class="text-[10px] text-emerald-700 font-black uppercase tracking-tight">Próximo Paso: <span class="font-bold lowercase">${task.nextStep}</span></p>` : ''}
                                </div>
                              ` : ''}
                           </div>
                       </div>
                       <div class="flex items-center gap-3">
                          <span class="text-[9px] font-bold ${task.p === 'Secundaria' ? 'text-slate-500 bg-slate-100' : 'text-emerald-700 bg-emerald-50 border-emerald-200'} px-3 py-1 rounded-full border tracking-wider">${task.p || 'Principal'}</span>
                          ${task.linkedContent ? `
                            <button onclick="Tareas.openPreview('${task.id}')" class="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all">
                               <i class="fas fa-eye mr-2"></i> Ver Previa
                            </button>
                          ` : ''}
                          ${task.isPlan ? `
                            <span class="text-[10px] font-bold text-slate-400 ml-2 bg-slate-50 px-2 py-1 rounded-md border border-slate-100"><i class="fas fa-lock text-[8px] mr-1"></i> Fijo</span>
                          ` : `
                            <button onclick="window.ZollaStore.deleteTask('${task.id}'); window.navigateTo('tareas');" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all ml-2">
                               <i class="fas fa-trash-alt text-xs"></i>
                            </button>
                          `}
                       </div>
                    </div>
                  `).join('')}
               </div>
            </div>
         </div>
         ` : `
         <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[85vh]">
             <div class="p-6 border-b border-slate-200 flex justify-between items-center bg-white">
                 <button class="text-slate-400 hover:text-slate-800 p-2 hover:bg-slate-50 rounded-lg transition-all"><i class="fas fa-chevron-left"></i></button>
                 <div class="text-center">
                     <span class="font-black text-slate-800 text-lg uppercase tracking-tight">Marzo 2026</span>
                     <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Vista Mensual Operativa</p>
                 </div>
                 <button class="text-slate-400 hover:text-slate-800 p-2 hover:bg-slate-50 rounded-lg transition-all"><i class="fas fa-chevron-right"></i></button>
             </div>
             <div class="grid grid-cols-7 border-b border-slate-200 bg-slate-50/50">
                 ${['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => `<div class="p-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">${d}</div>`).join('')}
             </div>
             <div class="grid grid-cols-7 grid-rows-5 bg-slate-200 gap-[1px] border-b border-slate-200">
                 ${[...Array(35)].map((_, i) => {
          const dayNum = i + 1; 
          const isToday = dayNum === 2; 
          if (dayNum > 31) return '<div class="bg-slate-50/50 min-h-[140px] p-2"></div>';

          const dayTasks = allTasks.filter(t => {
             if (t.f && t.f.includes(`-03-${dayNum.toString().padStart(2, '0')}`)) return true;
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
          <div class="bg-white min-h-[140px] p-3 transition-all hover:bg-emerald-50/20 cursor-pointer flex flex-col ${isToday ? 'ring-2 ring-emerald-500/10 z-10' : ''}">
             <span class="font-black text-[11px] mb-2 ${isToday ? 'text-emerald-600 bg-emerald-50 w-6 h-6 rounded-lg flex items-center justify-center border border-emerald-100' : 'text-slate-400'}">${dayNum}</span>
             <div class="space-y-1.5 overflow-y-auto max-h-[100px] scrollbar-hide">
                ${dayTasks.map(t => `
                   <div onclick="${t.linkedContent ? `Tareas.openPreview('${t.id}')` : `window.Tareas.openStatusModal('${t.id}', '${t.status}')`}" class="px-2 py-1.5 rounded-lg text-[9px] font-bold border truncate transition-all ${t.status === 'Completada' ? 'bg-slate-50 text-slate-400 border-slate-100 line-through decoration-slate-300' : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300 shadow-sm shadow-emerald-700/5'}">
                      <i class="fas ${t.status === 'Completada' ? 'fa-check-circle' : 'fa-circle-dot'} mr-1 text-[7px] ${t.status === 'Completada' ? 'text-emerald-500' : 'text-emerald-400 animate-pulse'}"></i>
                      ${t.t}
                   </div>
                `).join('')}
             </div>
          </div>`;
       }).join('')}
             </div>
         </div>
         `}

         <!-- NEW TASK MODAL -->
         <div id="new-task-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-8 transition-all">
            <div class="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
               <div class="p-8 border-b border-slate-100 flex items-center justify-between">
                  <h3 class="text-xl font-black text-slate-800 tracking-tight">NUEVO HITO OPERATIVO</h3>
                  <button onclick="Tareas.closeModal()" class="text-slate-400 hover:text-slate-800"><i class="fas fa-times text-xl"></i></button>
               </div>
               <div class="p-8 space-y-6">
                  <div>
                     <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Título de Tarea</label>
                     <input type="text" id="task-title" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-sm text-slate-800" placeholder="Ej: Llamar a clientes potenciales">
                  </div>
                  <div class="grid grid-cols-2 gap-6">
                     <div>
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Concepto</label>
                        <input type="text" id="task-dept" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-sm text-slate-800" value="Fernando">
                     </div>
                     <div>
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Semana</label>
                        <select id="task-week" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-sm">
                           <option value="1">Semana 1</option>
                           <option value="2">Semana 2</option>
                           <option value="3">Semana 3</option>
                           <option value="4">Semana 4</option>
                        </select>
                     </div>
                  </div>
               </div>
               <div class="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
                  <button onclick="Tareas.closeModal()" class="px-8 py-3.5 rounded-2xl text-[10px] font-black text-slate-500 bg-white border border-slate-200 uppercase tracking-widest w-1/3">Cancelar</button>
                  <button onclick="Tareas.createTask()" class="bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-200 flex-1">Crear Tarea</button>
               </div>
            </div>
         </div>

         <!-- STATUS MODAL -->
         <div id="task-status-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[210] flex items-center justify-center p-8 transition-all">
            <div class="bg-white w-full max-w-lg rounded-3xl shadow-3xl border border-slate-200">
               <div class="p-8 border-b border-slate-100">
                  <h3 class="text-xl font-black text-slate-800 tracking-tight">ESTADO DEL HITO</h3>
               </div>
               <div class="p-8 space-y-6">
                  <div>
                     <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Nuevo Estado</label>
                     <select id="task-new-status" onchange="Tareas.handleStatusUI(this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-sm">
                        <option value="Pendiente">Pendiente</option>
                        <option value="Completada">Completada</option>
                        <option value="Atrasada">No Completada</option>
                     </select>
                  </div>
                  <div id="failure-fields" class="hidden space-y-6">
                    <div>
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Motivo</label>
                       <textarea id="task-motive" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-sm text-slate-800" placeholder="¿Por qué no se completó?"></textarea>
                    </div>
                    <div>
                       <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Próximo Paso</label>
                       <input type="text" id="task-next-step" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-sm text-slate-800" placeholder="¿Cómo lo resolvemos?">
                    </div>
                  </div>
               </div>
               <div class="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
                  <button onclick="Tareas.closeStatusModal()" class="px-8 py-3.5 rounded-2xl text-[10px] font-black text-slate-500 bg-white border border-slate-200 flex-1 uppercase tracking-widest">Cerrar</button>
                  <button onclick="Tareas.updateTaskStatus()" class="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex-1">Actualizar</button>
               </div>
            </div>
         </div>

         <!-- PREVIEW MODAL (VISTA PREVIA DE PUBLICACIÓN) -->
         <div id="content-preview-modal" class="hidden fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[300] flex items-center justify-center p-8 transition-all">
            <div class="bg-white w-full max-w-4xl rounded-[3rem] shadow-4xl border border-white/20 animate-pop-in flex flex-col max-h-[90vh]">
               <div class="p-10 border-b border-slate-100 flex items-center justify-between">
                  <div class="flex items-center gap-4">
                     <div id="preview-icon-platform" class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl">
                        <i class="fab fa-linkedin-in"></i>
                     </div>
                     <div>
                        <h3 class="text-2xl font-black text-slate-800 tracking-tight">Vista Previa Estratégica</h3>
                        <p id="preview-platform-text" class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Simulación de publicación</p>
                     </div>
                  </div>
                  <button onclick="document.getElementById('content-preview-modal').classList.add('hidden')" class="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all">
                     <i class="fas fa-times text-xl"></i>
                  </button>
               </div>
               <div id="preview-body" class="p-10 overflow-y-auto bg-slate-50/30 flex-grow">
                  <div class="max-w-xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-200 p-10">
                     <div id="preview-content-render" class="whitespace-pre-wrap font-serif text-lg leading-relaxed text-slate-700 italic border-l-4 border-indigo-500 pl-8">
                        <!-- Content here -->
                     </div>
                  </div>
               </div>
               <div class="p-10 border-t border-slate-100 bg-white flex justify-between items-center">
                  <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">¿Todo listo para enviar?</p>
                  <div class="flex gap-4">
                     <button onclick="document.getElementById('content-preview-modal').classList.add('hidden')" class="px-10 py-4 rounded-2xl text-[10px] font-black text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all uppercase tracking-widest">Ajustar Tarea</button>
                     <button onclick="Tareas.publishNow()" class="bg-emerald-600 text-white px-12 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-500 transition-all">Publicar Ahora</button>
                  </div>
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

   openPreview: (id) => {
      const task = window.ZollaStore.state.tasks.find(tk => tk.id == id);
      if (!task || !task.linkedContent) return;

      window.activeTaskId = id;
      const modal = document.getElementById('content-preview-modal');
      const render = document.getElementById('preview-content-render');
      const icon = document.getElementById('preview-icon-platform');
      const text = document.getElementById('preview-platform-text');

      render.innerText = task.linkedContent;
      
      if (task.t.toLowerCase().includes('linkedin')) {
         icon.innerHTML = '<i class="fab fa-linkedin-in"></i>';
         icon.className = 'w-12 h-12 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center text-xl';
         text.innerText = 'Simulación LinkedIn Premium';
      } else {
         icon.innerHTML = '<i class="fas fa-globe"></i>';
         icon.className = 'w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl';
         text.innerText = 'Vista Previa Blog / Web';
      }

      modal.classList.remove('hidden');
   },

   publishNow: () => {
      const id = window.activeTaskId;
      const task = window.ZollaStore.state.tasks.find(tk => tk.id == id);
      
      if (task) {
         // 1. Copiar al portapapeles
         navigator.clipboard.writeText(task.linkedContent).then(() => {
            // 2. Marcar como completada
            window.ZollaStore.updateTask(id, { status: 'Completada' });
            
            // 3. Notificar y cerrar
            window.showNotification("Publicación Exitosa", "Contenido copiado al portapapeles y hito marcado como completado.", "success");
            document.getElementById('content-preview-modal').classList.add('hidden');
            window.navigateTo('tareas');
         });
      }
   },

   createTask: () => {
      const titleEl = document.getElementById('task-title');
      const t = titleEl?.value?.trim();
      const d = document.getElementById('task-dept')?.value?.trim() || 'Fernando';
      const w = document.getElementById('task-week')?.value || '1';
      if (!t) {
         if (titleEl) {
            titleEl.style.borderColor = '#ef4444';
            titleEl.placeholder = '⚠️ Ingresa el título de la tarea';
            setTimeout(() => { titleEl.style.borderColor = ''; titleEl.placeholder = 'Ej: Llamar a clientes potenciales'; }, 3000);
         }
         window.showNotification('Campo requerido', 'Por favor ingresa un título para la tarea.', 'warning');
         return;
      }
      window.ZollaStore.addTask({ t, d, w, p: 'Principal', status: 'Pendiente' });
      Tareas.closeModal();
      window.navigateTo('tareas');
      window.showNotification('Tarea Creada', `"${t}" ha sido agregada al planificador.`, 'success');
   },

   openStatusModal: (id, currentStatus) => {
      window.activeTaskId = id;
      const modal = document.getElementById('task-status-modal');
      const statusSelect = document.getElementById('task-new-status');
      if (modal && statusSelect) {
         statusSelect.value = currentStatus;
         
         const task = window.ZollaStore.state.tasks.find(tk => tk.id == id);
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

   init: () => { }
};
