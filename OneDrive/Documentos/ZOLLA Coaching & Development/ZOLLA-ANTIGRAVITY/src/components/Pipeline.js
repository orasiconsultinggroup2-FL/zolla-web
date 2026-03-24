window.Pipeline = {
   render: () => {
      const pipeline = window.ZollaStore.state.pipeline;
      const stages = [
         { id: 'contactado', label: '📞 Contactado', color: 'slate-500' },
         { id: 'cita', label: '🤝 Cita Programada', color: 'blue-500' },
         { id: 'propuesta', label: '💼 Propuesta Enviada', color: 'red-500' },
         { id: 'cierre', label: '🎯 Fase de Cierre', color: 'red-600' }
      ];

      return `
      <div class="animate-fade-in space-y-10 pb-32 w-full">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-200 pb-10 mb-12">
          <div>
            <h2 class="text-3xl font-black text-slate-800 flex items-center gap-3">
               <i class="fas fa-filter text-emerald-500"></i> PIPELINE CRM
            </h2>
            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1.5">Control de Entidades en Conversión</p>
          </div>
          <div class="flex gap-3">
             <input type="file" id="excel-import" class="hidden" accept=".xlsx, .xls, .csv" onchange="Pipeline.importExcel(event)" />
             <button onclick="Pipeline.openBBDDModal()" class="bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-300 px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                <i class="fas fa-database mr-2"></i> Base de Datos
             </button>
             <button onclick="window.showNotification('Módulo Activo', 'El Pipeline CRM ya se encuentra activo en pantalla.', 'success')" class="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm">
                <i class="fas fa-columns mr-2"></i> Pipeline
             </button>
             <button onclick="Pipeline.openModal()" class="bg-emerald-600 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-md hover:bg-emerald-500 hover:scale-105 transition-all">
                <i class="fas fa-plus mr-2"></i> Añadir Cliente
             </button>
          </div>
        </div>

        <!-- Pipeline Board -->
        <div class="flex gap-8 h-full min-h-[700px] items-start overflow-x-auto pb-6 scrollbar-thin">
          ${stages.map((stage, i) => `
            <div class="flex flex-col gap-6 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-200 shadow-sm relative min-w-[320px]">
               <div class="flex items-center justify-between mb-2">
                  <h3 class="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                      <span class="${i === 3 ? 'text-emerald-600' : 'text-slate-400'}">${stage.label.split(' ')[0]}</span> 
                      ${stage.label.split(' ').slice(1).join(' ')}
                  </h3>
                  <span class="bg-white border border-slate-200 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 shadow-sm">${pipeline.filter(c => c.status === stage.id).length}</span>
               </div>
               
               <div id="stage-${stage.id}" class="flex-1 space-y-5 min-h-[600px] overflow-y-auto pr-1 scrollbar-hide py-2">
                  ${pipeline.filter(c => c.status === stage.id).map(client => {
                    const headers = window.ZollaStore.state.bbddHeaders || [];
                    const empresaKey = headers.find(h => h.toLowerCase().includes('empresa') || h.toLowerCase().includes('cliente')) || 'Empresa';
                    const contactoKey = headers.find(h => h.toLowerCase().includes('contacto') || h.toLowerCase().includes('representante')) || 'Contacto';
                    const linkedinKey = headers.find(h => h.toLowerCase().includes('linkedin') || h.toLowerCase().includes('url')) || 'URL Linkedin';

                    // Fallback robusto para datos antiguos e importaciones nuevas
                    const dispName = client[empresaKey] || client._metadata?.name || client.name || 
                                     Object.entries(client).find(([k]) => k.toLowerCase().includes('empresa') || k.toLowerCase().includes('cliente'))?.[1] || 'S/N';
                    
                    const dispContact = client[contactoKey] || client._metadata?.contact || client.contact || 
                                        Object.entries(client).find(([k]) => k.toLowerCase().includes('contacto') || k.toLowerCase().includes('nombre'))?.[1] || 'S/C';
                    
                    const dispLinkedin = client[linkedinKey] || client._metadata?.linkedin || client.linkedin || 
                                         Object.entries(client).find(([k]) => k.toLowerCase().includes('linkedin') || k.toLowerCase().includes('url'))?.[1] || '';

                    const dispSegment = client._metadata?.segment || client.segment || 'B';
                    
                    return `
                    <div data-id="${client.id}" class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-premium transition-all group cursor-grab active:cursor-grabbing">
                       <div class="flex justify-between items-start mb-4">
                          <span class="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">TYPE ${dispSegment}</span>
                          <div class="flex items-center gap-2">
                             ${dispLinkedin ? `<a href="${dispLinkedin}" target="_blank" class="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-[10px] border border-blue-100 hover:bg-blue-600 hover:text-white transition-all"><i class="fab fa-linkedin-in"></i></a>` : ''}
                             <span class="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 shadow-inner">$${(client.value || 5.0).toFixed(3)}K</span>
                          </div>
                       </div>
                       <div class="space-y-4">
                          <div class="flex flex-col gap-1.5">
                             <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Organización</p>
                             <h4 class="text-[14px] font-black text-slate-900 group-hover:text-emerald-700 transition-all leading-tight bg-slate-50/50 p-2.5 rounded-xl border border-dashed border-slate-200">
                                <i class="fas fa-building text-emerald-500/50 mr-2 text-[10px]"></i>${dispName}
                             </h4>
                          </div>
                          <div class="flex flex-col gap-1.5">
                             <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Contacto Directo</p>
                             <p class="text-[12px] text-slate-700 font-bold bg-emerald-50/30 px-3 py-2.5 rounded-xl border border-emerald-100/50 flex items-center gap-2">
                                <i class="fas fa-user-circle text-blue-500/50 text-xs"></i>${dispContact}
                             </p>
                          </div>
                       </div>
                       <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                          <div class="flex gap-2 items-center">
                              <div class="w-2 h-2 rounded-full ${i === 3 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-blue-400'}"></div>
                              <span class="text-[9px] text-slate-400 font-black uppercase tracking-widest">${i === 3 ? 'En Cierre' : 'En Proceso'}</span>
                          </div>
                          <button class="text-slate-300 hover:text-emerald-500 transition-all"><i class="fas fa-arrow-right-long text-xs"></i></button>
                       </div>
                    </div>
                  `}).join('')}
               </div>
            </div>
          `).join('')}
        </div>

        <!-- BBDD MODAL (DYNAMIC BASED ON BBDD) -->
        <div id="bbdd-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-start justify-center p-2 overflow-y-auto">
           <div class="bg-white w-full max-w-[99vw] shadow-2xl rounded-[1.5rem] border border-slate-200 overflow-hidden animate-pop-in h-[98vh] flex flex-col">
              <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                 <div class="flex items-center gap-4">
                     <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm border border-emerald-100 flex items-center justify-center text-xl">
                         <i class="fas fa-database"></i>
                     </div>
                     <div>
                        <h3 class="text-xl text-slate-800 font-black tracking-tight">Base de Datos Central</h3>
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Campos y denominaciones del archivo original</p>
                     </div>
                 </div>
                 <div class="flex items-center gap-4">
                    <button onclick="document.getElementById('excel-import').click()" class="bg-indigo-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 hover:bg-indigo-500 transition-all flex items-center gap-2">
                       <i class="fas fa-file-excel text-base"></i> IMPORTAR EXCEL
                    </button>
                    <button onclick="Pipeline.closeBBDDModal()" class="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-all"><i class="fas fa-times text-xl"></i></button>
                 </div>
              </div>
              
              <div class="p-4 flex-1 overflow-hidden bg-slate-50 relative">
                  <div class="bg-white rounded-2xl border border-slate-200 shadow-inner overflow-auto h-full w-full">
                     <table class="w-full text-left border-collapse table-auto min-w-max">
                        <thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-20">
                           <tr>
                              <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 border-r border-slate-100">#</th>
                              ${(window.ZollaStore.state.bbddHeaders || []).map(h => `
                                 <th class="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap bg-slate-50 border-r border-slate-100 last:border-0">${h}</th>
                              `).join('')}
                           </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                           ${window.ZollaStore.state.clients.map((c, idx) => `
                              <tr class="hover:bg-emerald-50/30 transition-colors group">
                                 <td class="px-6 py-4 text-[10px] font-bold text-slate-400 bg-slate-50 group-hover:bg-emerald-50/50 border-r border-slate-100">${idx + 1}</td>
                                 ${(window.ZollaStore.state.bbddHeaders || []).map(h => `
                                    <td class="px-6 py-4 text-xs font-bold text-slate-700 whitespace-nowrap border-r border-slate-50 last:border-0">${c[h] || '-'}</td>
                                 `).join('')}
                              </tr>
                           `).join('')}
                        </tbody>
                     </table>
                  </div>
               </div>
           </div>
        </div>

        <!-- NEW CLIENT MODAL (DYNAMIC BASED ON BBDD) -->
        <div id="new-client-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-start justify-center p-4 overflow-y-auto">
           <div class="bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-slate-200 overflow-hidden animate-pop-in mt-4 mb-20 flex flex-col">
              <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-white text-slate-800">
                 <div class="flex items-center gap-4">
                     <div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
                         <i class="fas fa-plus-circle text-lg"></i>
                     </div>
                     <h3 class="text-xl font-bold tracking-tight">Registro de Entidad</h3>
                 </div>
                 <button onclick="Pipeline.closeModal()" class="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all"><i class="fas fa-times"></i></button>
              </div>
              <div class="p-8 overflow-y-auto bg-white flex-1">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="dynamic-client-fields">
                    ${(window.ZollaStore.state.bbddHeaders || []).map(h => `
                       <div class="${h.toLowerCase().includes('empresa') || h.toLowerCase().includes('cliente') ? 'md:col-span-2' : ''}">
                          <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-1">${h}</label>
                          <input type="text" data-field="${h}" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-slate-700 transition-all placeholder:text-slate-400" placeholder="Ingresar ${h}...">
                       </div>
                    `).join('')}
                 </div>
                 <div class="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <p class="text-[10px] text-amber-700 font-bold flex items-center gap-2">
                       <i class="fas fa-info-circle"></i> CAMPOS SINCRONIZADOS CON LA BBDD ACTUAL
                    </p>
                 </div>
              </div>
              <div class="px-8 py-6 border-t border-slate-100 flex gap-4 bg-slate-50">
                 <button onclick="Pipeline.closeModal()" class="px-8 py-3.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-all w-1/3 uppercase tracking-widest text-center shadow-sm">Cancelar</button>
                 <button onclick="Pipeline.createClient()" class="bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md hover:bg-emerald-500 hover:shadow-lg transition-all flex-1 text-center">Inyectar en Pipeline</button>
              </div>
           </div>
        </div>
      </div>
    `;
   },

   init: () => {
      if (typeof window.Sortable === 'undefined') {
         console.warn('Sortable.js not loaded yet, retrying...');
         setTimeout(window.Pipeline.init, 500);
         return;
      }
      const stages = ['contactado', 'cita', 'propuesta', 'cierre'];
      stages.forEach(s => {
         const el = document.getElementById('stage-' + s);
         if (el) {
            new window.Sortable(el, {
               group: 'pipeline',
               animation: 150,
               ghostClass: 'opacity-50',
               onEnd: (evt) => {
                  const cardId = evt.item.getAttribute('data-id');
                  const newStatus = evt.to.id.replace('stage-', '');
                  if (cardId && newStatus) {
                     window.ZollaStore.movePipeline(cardId, newStatus);
                     window.navigateTo('pipeline');
                  }
               }
            });
         }
      });
   },

   openModal: () => {
      const modal = document.getElementById('new-client-modal');
      if (modal) modal.classList.remove('hidden');
   },
   closeModal: () => {
      const modal = document.getElementById('new-client-modal');
      if (modal) modal.classList.add('hidden');
   },

   openBBDDModal: () => {
      const modal = document.getElementById('bbdd-modal');
      if (modal) modal.classList.remove('hidden');
   },
   closeBBDDModal: () => {
      const modal = document.getElementById('bbdd-modal');
      if (modal) modal.classList.add('hidden');
   },

   createClient: () => {
      const fieldInputs = document.querySelectorAll('#dynamic-client-fields [data-field]');
      const newClientData = {};
      
      fieldInputs.forEach(input => {
         const field = input.getAttribute('data-field');
         newClientData[field] = input.value?.trim() || '';
      });

      // Mapeo inteligente para tarjetas
      const headers = window.ZollaStore.state.bbddHeaders || [];
      const nameKey = headers.find(h => h.toLowerCase().includes('empresa') || h.toLowerCase().includes('cliente')) || headers[1] || headers[0];
      const contactKey = headers.find(h => h.toLowerCase().includes('contacto') || h.toLowerCase().includes('representante')) || headers[0];
      const linkedinKey = headers.find(h => h.toLowerCase().includes('linkedin') || h.toLowerCase().includes('url')) || 'URL Linkedin';
      const segmentKey = headers.find(h => h.toLowerCase().includes('segmento') || h.toLowerCase().includes('tier')) || headers[2];

      const name = newClientData[nameKey] || 'S/N';
      const contact = newClientData[contactKey] || 'S/C';
      const linkedin = newClientData[linkedinKey] || '';
      const segment = newClientData[segmentKey] || 'B';

      if (Object.values(newClientData).some(v => v !== '')) {
         const newId = 'c' + Date.now();
         const newClient = {
            id: newId,
            ...newClientData,
            name: name,
            contact: contact,
            linkedin: linkedin,
            _metadata: { name, contact, linkedin, segment },
            status: 'base'
         };

         window.ZollaStore.state.clients.push(newClient);
         window.ZollaStore.state.pipeline.push({ ...newClient, status: 'contactado', value: 0, desc: 'Registro manual' });
         window.ZollaStore.save();
         Pipeline.closeModal();
         window.navigateTo('pipeline');
         window.showNotification('Cliente Registrado', `${name} ha sido inyectado al Pipeline CRM.`, 'success');
      } else {
         window.showNotification('Datos Vacíos', 'Por favor ingresa al menos un dato relevante.', 'warning');
      }
   },

   importExcel: (event) => {
      const file = event.target?.files?.[0];
      if (!file) return;

      if (typeof window.XLSX === 'undefined') {
         window.showNotification('Error', 'La librería de Excel no está cargada. Recarga la página.', 'warning');
         return;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
         try {
            const data = new Uint8Array(e.target.result);
            const workbook = window.XLSX.read(data, { type: 'array' });
            
            // SIEMPRE usar la primera pestaña
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            
            // Obtener cabeceras en el orden exacto del archivo (usando decodificación de rango real)
            const range = window.XLSX.utils.decode_range(worksheet['!ref']);
            const headers = [];
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell = worksheet[window.XLSX.utils.encode_cell({ r: range.s.r, c: C })];
                let hdr = cell ? String(cell.v).trim() : `Col_${C + 1}`;
                if (hdr === "") hdr = `Col_${C + 1}`;
                headers.push(hdr);
            }
            
            window.ZollaStore.state.bbddHeaders = headers;

            // Procesar todas las filas convirtiéndolas a objetos JSON respetando cabeceras
            const excelRows = window.XLSX.utils.sheet_to_json(worksheet, { defval: '' });

            if (excelRows.length > 0) {
               let importedCount = 0;
               // Reiniciar base para asegurar sincronización total y limpia
               window.ZollaStore.state.clients = [];
               window.ZollaStore.state.pipeline = [];
               
               excelRows.forEach(row => {
                  const r = {};
                  // Normalizar llaves para detección automática robusta de campos clave
                  Object.keys(row).forEach(key => {
                     const normKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
                     r[normKey] = row[key];
                  });

                  // Mapeo inteligente para visualización en Tarjetas y Selectores
                  // EMPRESA (name): Priorizar 'empresa', 'cliente', 'organizacion'. Fallback al 2do campo (Zolla standard) o 1er campo.
                  const name = r['empresa'] || r['cliente'] || r['razon social'] || r['organizacion'] || Object.values(row)[1] || Object.values(row)[0] || 'S/N';
                  
                  // CONTACTO (contact): Priorizar 'contacto', 'nombre', 'referente'. Fallback al 1er campo (Zolla standard).
                  const contact = r['contacto'] || r['representante'] || r['responsable'] || r['persona'] || r['nombre contacto'] || Object.values(row)[0] || 'S/C';
                  
                  const linkedin = r['linkedin'] || r['url linkedin'] || r['perfil'] || r['url'] || '';
                  const segment = r['segmento'] || r['tier'] || r['categoria'] || r['nivel'] || 'B';

                  const newClient = {
                     id: 'c' + Date.now() + Math.random().toString(36).substr(2, 5),
                     ...row, // Preservar todos los datos originales bajo sus cabeceras
                     name: name, // Alias para compatibilidad con lógica antigua (Empresa)
                     contact: contact, // Alias para compatibilidad con lógica antigua (Contacto)
                     linkedin: linkedin,
                     _metadata: { name, contact, linkedin, segment }
                  };

                  window.ZollaStore.state.clients.push(newClient);
                  window.ZollaStore.state.pipeline.push({
                     ...newClient,
                     status: 'contactado',
                     value: 0,
                     desc: 'Importado de BBDD'
                  });
                  importedCount++;
               });

               window.ZollaStore.save();
               window.navigateTo('pipeline');
               window.showNotification('BBDD Sincronizada', `Importados ${importedCount} registros de "${firstSheetName}" con ${headers.length} columnas.`, 'success');
            } else {
               window.showNotification('Error', 'El archivo no contiene registros válidos en la primera pestaña.', 'warning');
            }
         } catch (err) {
            console.error('Excel Import Error:', err);
            window.showNotification('Error de Importación', 'Hubo un error procesando el archivo. Asegúrate que sea un formato válido.', 'warning');
         }
         event.target.value = '';
      };

      reader.readAsArrayBuffer(file);
   }

};
