window.Biblioteca = {
   state: {
      activeItem: null,
      showPreview: false,
      previewMode: 'edit',
      selectionMode: false,
      selectedIds: []
   },
   render: () => {
      const library = window.ZollaStore.state.library || [];
      const s = window.Biblioteca.state;
      
      return `
      <div class="animate-fade-in space-y-10 pb-32 w-full text-slate-900">
         <div class="flex items-center justify-between border-b border-slate-200 pb-10 mb-12">
            <div>
               <p class="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-2 font-sans italic">Automated Content Hub</p>
               <h2 class="text-4xl font-black text-slate-900 flex items-center gap-4 italic tracking-tighter">
                  Biblioteca Inteligente <span class="bg-indigo-100 text-indigo-700 text-[10px] px-3 py-1 rounded-full border border-indigo-200 uppercase tracking-widest font-black italic">Sync v46</span>
               </h2>
               <p class="text-slate-500 text-sm mt-3 font-medium italic">"Tus activos externos procesados y listos para la narrativa institucional."</p>
            </div>
            <div class="flex gap-4">
               ${library.length > 0 ? `
                  <button onclick="Biblioteca.toggleSelectionMode()" class="${s.selectionMode ? 'bg-amber-500 text-white border-amber-400' : 'bg-white text-slate-600 border-slate-200'} px-6 py-4 rounded-2xl hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest border shadow-sm flex items-center gap-2">
                     <i class="fas ${s.selectionMode ? 'fa-times' : 'fa-check-double'}"></i> ${s.selectionMode ? 'Cancelar Selección' : 'Seleccionar'}
                  </button>
               ` : ''}
               
               ${s.selectionMode && s.selectedIds.length > 0 ? `
                  <button onclick="Biblioteca.deleteSelected()" class="bg-red-600 text-white px-8 py-4 rounded-2xl hover:bg-red-500 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-200 flex items-center gap-2 border border-white/20">
                     <i class="fas fa-trash-alt"></i> Borrar (${s.selectedIds.length})
                  </button>
               ` : `
                  <button onclick="Biblioteca.openNewItemModal()" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl hover:bg-indigo-500 transition-all font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-200 flex items-center gap-3">
                     <i class="fas fa-file-upload text-lg"></i> Importación Masiva
                  </button>
               `}
               <button onclick="navigateTo('contenido')" class="bg-slate-100 text-slate-500 px-6 py-4 rounded-2xl hover:bg-slate-200 transition-all font-black text-[10px] uppercase tracking-widest border border-slate-200">Volver al Centro</button>
            </div>
         </div>

         <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            ${library.length === 0 ? `
               <div class="col-span-full py-32 text-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem]">
                  <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 border border-slate-100 italic font-serif text-4xl">B</div>
                  <h3 class="text-xl font-bold text-slate-400 italic">"La biblioteca está lista para tus activos."</h3>
               </div>
            ` : library.map(item => {
               const isSelected = s.selectedIds.includes(String(item.id));
               return `
               <div onclick="${s.selectionMode ? `Biblioteca.toggleSelectItem('${item.id}')` : `Biblioteca.openPreview('${item.id}')`}" 
                    class="bg-white border-2 ${isSelected ? 'border-indigo-500 shadow-2xl ring-4 ring-indigo-500/10' : 'border-slate-100 shadow-sm'} rounded-[2.5rem] p-8 hover:shadow-2xl hover:border-indigo-500/30 transition-all group flex flex-col h-full relative overflow-hidden cursor-pointer">
                  
                  <div class="absolute top-0 right-0 w-24 h-24 bg-slate-50 rotate-45 translate-x-12 -translate-y-12"></div>
                  
                  ${s.selectionMode ? `
                     <div class="absolute top-6 left-6 z-20">
                        <div class="w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-slate-200 text-transparent'}">
                           <i class="fas fa-check text-xs"></i>
                        </div>
                     </div>
                  ` : ''}

                  <div class="flex justify-between items-start mb-6 relative z-10 ${s.selectionMode ? 'pl-10' : ''}">
                     <span class="px-3 py-1 bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase tracking-widest rounded-lg border border-indigo-100">${item.category || 'General'}</span>
                     ${!s.selectionMode ? `
                        <button onclick="event.stopPropagation(); Biblioteca.deleteItem(${item.id})" class="text-slate-200 hover:text-red-500 transition-all w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center"><i class="fas fa-trash-alt text-xs"></i></button>
                     ` : ''}
                  </div>

                  <h3 class="text-lg font-black text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight italic">${item.title}</h3>
                  <div class="flex-grow">
                     <p class="text-slate-500 text-[13px] leading-relaxed line-clamp-6 italic">"${item.content.replace(/<[^>]*>/g, '').substring(0, 300)}..."</p>
                  </div>

                  <div class="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                     <div class="bg-indigo-600 text-white py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 w-full group-hover:scale-[1.02] transition-transform">
                        <i class="fas ${s.selectionMode ? (isSelected ? 'fa-minus-circle' : 'fa-plus-circle') : 'fa-eye'} text-xs"></i> 
                        ${s.selectionMode ? (isSelected ? 'Deseleccionar' : 'Seleccionar Activo') : 'Revisar y Publicar'}
                     </div>
                  </div>
               </div>
            `}).join('')}
         </div>

         <!-- Modal Nueva Entrada -->
         <div id="new-library-modal" class="hidden fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[9000] flex items-center justify-center p-8 transition-all">
            <div class="bg-white w-full max-w-2xl rounded-[3rem] shadow-3xl overflow-hidden border border-white/20 animate-pop-in">
               <div class="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
                  <div class="flex items-center gap-5">
                     <div class="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-indigo-600/20">
                        <i class="fas fa-cloud-upload-alt"></i>
                     </div>
                     <div>
                        <h3 class="text-2xl font-black text-slate-900 tracking-tight italic">Carga Automática</h3>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic font-sans">Hub de Contenido Masivo</p>
                     </div>
                  </div>
                  <button onclick="Biblioteca.closeModal()" class="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all group">
                     <i class="fas fa-times text-xl group-hover:rotate-90 transition-transform"></i>
                  </button>
               </div>
               <div class="p-10 space-y-6">
                  <div onclick="Biblioteca.triggerWordImport()" class="p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-blue-600 hover:bg-blue-50 transition-all cursor-pointer group">
                     <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                        <i class="fas fa-file-word text-3xl"></i>
                     </div>
                     <div class="text-center">
                        <h3 class="text-lg font-black text-slate-900 uppercase tracking-tight italic">Documentos Word (.docx)</h3>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Extrae artículos automáticamente</p>
                     </div>
                     <input type="file" id="word-auto-input" accept=".docx" class="hidden" onchange="Biblioteca.handleAutoImport(this, 'word')">
                  </div>

                  <div onclick="Biblioteca.triggerExcelImport()" class="p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-emerald-600 hover:bg-emerald-50 transition-all cursor-pointer group">
                     <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                        <i class="fas fa-file-excel text-3xl"></i>
                     </div>
                     <div class="text-center">
                        <h3 class="text-lg font-black text-slate-900 uppercase tracking-tight italic">Excel o CSV</h3>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Procesar base de datos institucional</p>
                     </div>
                     <input type="file" id="excel-auto-input" accept=".xlsx, .xls, .csv" class="hidden" onchange="Biblioteca.handleAutoImport(this, 'excel')">
                  </div>
               </div>
               <div class="p-10 border-t border-slate-100 flex gap-6 bg-slate-50/50">
                  <button onclick="Biblioteca.closeModal()" class="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl transition-all w-full">Cerrar Hub</button>
               </div>
            </div>
         </div>

         ${window.Biblioteca.state.showPreview ? window.Biblioteca.renderPreview() : ''}
      </div>`;
   },

   toggleSelectionMode: () => {
      window.Biblioteca.state.selectionMode = !window.Biblioteca.state.selectionMode;
      window.Biblioteca.state.selectedIds = [];
      window.Biblioteca.refresh();
   },

   toggleSelectItem: (id) => {
      id = String(id);
      if (window.Biblioteca.state.selectedIds.includes(id)) {
         window.Biblioteca.state.selectedIds = window.Biblioteca.state.selectedIds.filter(x => x !== id);
      } else {
         window.Biblioteca.state.selectedIds.push(id);
      }
      window.Biblioteca.refresh();
   },

   deleteSelected: () => {
      const count = window.Biblioteca.state.selectedIds.length;
      if (confirm(`¿Eliminar permanentemente los ${count} activos seleccionados?`)) {
         window.Biblioteca.state.selectedIds.forEach(id => {
            window.ZollaStore.deleteLibraryItem(parseInt(id));
         });
         window.Biblioteca.state.selectedIds = [];
         window.Biblioteca.state.selectionMode = false;
         window.Biblioteca.refresh();
         window.showNotification("Biblioteca Actualizada", `${count} activos eliminados.`, "success");
      }
   },

   openNewItemModal: () => {
      document.getElementById('new-library-modal').classList.remove('hidden');
   },

   closeModal: () => {
      document.getElementById('new-library-modal').classList.add('hidden');
   },

   triggerWordImport: () => {
      document.getElementById('word-auto-input').click();
   },

   triggerExcelImport: () => {
      document.getElementById('excel-auto-input').click();
   },

   handleAutoImport: (input, type) => {
      const file = input.files[0];
      if (!file) return;
      window.showNotification("Procesando...", "Extrayendo narrativa estratégica...", "info");
      if (type === 'word') {
         Biblioteca.processWord(file);
      } else {
         Biblioteca.processExcel(file);
      }
      input.value = ''; 
   },

   processWord: (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
         const arrayBuffer = event.target.result;
         window.mammoth.extractRawText({ arrayBuffer: arrayBuffer })
            .then(result => {
               const text = result.value;
               const articleRegex = /(ART[ÍI]CULO\s+\d+|POST\s+\d+|TEMA\s+\d+|[ÁA]REA\s+\d+|TITULO:)/gi;
               const matches = [...text.matchAll(articleRegex)];

               const itemsToSave = [];
               if (matches.length > 1) {
                  for (let i = 0; i < matches.length; i++) {
                     const start = matches[i].index;
                     const end = matches[i+1] ? matches[i+1].index : text.length;
                     const chunk = text.substring(start, end).trim();
                     if (!chunk) continue;

                     const lines = chunk.split('\n').filter(l => l.trim());
                     let rawTitle = lines[0] || `Activo ${i+1}`;
                     rawTitle = rawTitle.replace(/ART[ÍI]CULO\s+\d+/i, '').replace(/[:*#]/g, '').trim();

                     itemsToSave.push({
                        title: (rawTitle || 'Nuevo Artículo de Biblioteca').substring(0, 100).toUpperCase(),
                        category: 'Blog',
                        theme: 'General',
                        content: chunk
                     });
                  }
               } else {
                  const lines = text.split('\n').filter(l => l.trim());
                  itemsToSave.push({
                     title: (lines[0] || file.name).substring(0, 100).toUpperCase(),
                     category: 'General',
                     theme: 'General',
                     content: text
                  });
               }

               itemsToSave.forEach(item => window.ZollaStore.addLibraryItem(item));
               window.showNotification("Éxito", `${itemsToSave.length} activos guardados.`, "success");
               Biblioteca.closeModal();
            });
      };
      reader.readAsArrayBuffer(file);
   },

   processExcel: (file) => {
      const reader = new FileReader();
      const isCsv = file.name.endsWith('.csv');
      reader.onload = (event) => {
         if (isCsv) {
            window.Papa.parse(event.target.result, {
               header: true,
               complete: (results) => { Biblioteca.saveExcelData(results.data); }
            });
         } else {
            const data = new Uint8Array(event.target.result);
            const workbook = window.xlsx.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = window.xlsx.utils.sheet_to_json(firstSheet);
            Biblioteca.saveExcelData(jsonData);
         }
      };
      if (isCsv) { reader.readAsText(file); } else { reader.readAsArrayBuffer(file); }
   },

   saveExcelData: (data) => {
      let count = 0;
      data.forEach(row => {
         const title = row.Titulo || row.Title || row.Nombre || row.Empresa || Object.values(row)[0];
         const content = row.Contenido || row.Description || row.Nota || JSON.stringify(row);
         const category = row.Categoria || row.Status || 'Base de Datos';
         if (title && content) {
            window.ZollaStore.addLibraryItem({
               title: String(title).toUpperCase(),
               category: String(category),
               theme: 'BBDD',
               content: String(content)
            });
            count++;
         }
      });
      window.showNotification("Hub Sincronizado", `${count} registros importadores.`, "success");
      Biblioteca.closeModal();
   },

   deleteItem: (id) => {
      if (confirm("¿Eliminar permanentemente?")) {
         window.ZollaStore.deleteLibraryItem(id);
         window.Biblioteca.refresh();
      }
   },

   openPreview: (id) => {
      const item = window.ZollaStore.state.library.find(i => i.id == id);
      window.Biblioteca.state.activeItem = item;
      window.Biblioteca.state.showPreview = true;
      window.Biblioteca.refresh();
   },

   renderPreview: () => {
      const item = window.Biblioteca.state.activeItem;
      const s = window.Biblioteca.state;
      return `
      <div class="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[9000] flex items-center justify-center p-8 animate-fade-in text-slate-900">
         <div class="bg-white w-full max-w-5xl h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/20">
            <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50/50">
               <div class="flex items-center gap-4 text-slate-900">
                  <div class="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                     <i class="fas fa-file-alt text-xl"></i>
                  </div>
                  <div>
                     <h3 class="text-slate-900 font-black text-xl italic tracking-tighter">${item.title}</h3>
                     <p class="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5 italic">Editor Hub de Biblioteca · Unified Suite</p>
                  </div>
               </div>
               <button onclick="window.Biblioteca.state.showPreview = false; window.Biblioteca.refresh()" class="w-12 h-12 rounded-2xl hover:bg-slate-200 transition-all text-slate-400 flex items-center justify-center group">
                  <i class="fas fa-times text-xl group-hover:rotate-90 transition-transform"></i>
               </button>
            </div>
            
            <div class="flex-grow flex p-10 gap-10 overflow-hidden bg-white">
               <div class="flex-grow flex flex-col space-y-6 overflow-hidden">
                  <div class="flex justify-between items-center px-2">
                     <p class="text-slate-400 text-[10px] font-black uppercase tracking-widest italic font-sans">Área de Visualización</p>
                     <div class="flex bg-slate-100 rounded-lg p-1">
                        <button onclick="window.Biblioteca.state.previewMode = 'edit'; window.Biblioteca.refresh()" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${(!s.previewMode || s.previewMode === 'edit') ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}">Editor</button>
                        <button onclick="window.Biblioteca.state.previewMode = 'linkedin'; window.Biblioteca.refresh()" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${(s.previewMode === 'linkedin') ? 'bg-[#0A66C2] shadow-sm text-white' : 'text-slate-400 hover:text-slate-600 flex items-center gap-2'}"><i class="fab fa-linkedin-in"></i> Preview Real</button>
                     </div>
                  </div>
                  <div class="flex-grow bg-white rounded-3xl p-6 border border-slate-100 relative overflow-hidden flex flex-col items-center">
                     ${(!s.previewMode || s.previewMode === 'edit') ? `
                        <div class="w-full mb-4 px-4">
                           <input type="text" 
                                  value="${item.title.replace(/ART[ÍI]CULO\s+\d+/i, '').trim()}" 
                                  placeholder="COMPLETA EL TÍTULO ESTRATÉGICO..." 
                                  class="w-full bg-slate-50 border-b-2 border-slate-100 focus:border-indigo-500 outline-none py-3 text-xl font-black text-slate-800 uppercase tracking-tight transition-all italic tracking-tighter"
                                  oninput="window.ZollaStore.updateLibraryItem('${item.id}', { title: this.value })">
                        </div>

                        <div class="w-full flex items-center gap-2 mb-4 p-2 bg-slate-50 rounded-xl border border-slate-100 flex-shrink-0">
                           <button onmousedown="event.preventDefault(); document.execCommand('bold', false, null)" class="w-8 h-8 rounded-lg hover:bg-white text-slate-600 flex items-center justify-center border border-transparent hover:border-slate-200"><i class="fas fa-bold text-xs"></i></button>
                           <button onmousedown="event.preventDefault(); document.execCommand('italic', false, null)" class="w-8 h-8 rounded-lg hover:bg-white text-slate-600 flex items-center justify-center border border-transparent hover:border-slate-200"><i class="fas fa-italic text-xs"></i></button>
                           <button onmousedown="event.preventDefault(); document.execCommand('underline', false, null)" class="w-8 h-8 rounded-lg hover:bg-white text-slate-600 flex items-center justify-center border border-transparent hover:border-slate-200"><i class="fas fa-underline text-xs"></i></button>
                        </div>
                        <div id="rich-editor-library" 
                             contenteditable="true" 
                             class="w-full h-full bg-transparent border-none outline-none text-slate-700 font-sans text-xl leading-relaxed overflow-y-auto p-4" 
                             onblur="window.ZollaStore.updateLibraryItem('${item.id}', { content: this.innerHTML })" 
                             oninput="window.Biblioteca.state.activeItem.content = this.innerHTML">${item.content}</div>
                     ` : `
                        <div class="bg-white rounded-lg shadow-md border border-slate-200 w-full max-w-[400px] font-sans flex-shrink-0 mb-6 relative overflow-y-auto max-h-full">
                           <div class="flex items-center gap-3 p-4 sticky top-0 bg-white z-10 border-b border-slate-50">
                              <div class="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-xl shadow-inner italic">Z</div>
                              <div>
                                 <h4 class="font-bold text-sm text-slate-900 leading-tight">ZOLLA Coaching & Development</h4>
                                 <p class="text-xs text-slate-500 leading-tight">Estrategia Directiva | Meta-Management</p>
                                 <p class="text-[10px] text-slate-400 leading-tight mt-0.5 italic">Ahora • 🌎</p>
                              </div>
                           </div>
                           <div class="px-4 pb-3 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">${window.LinkedInPublisher.formatForLinkedIn(item.title, item.content, item.category || 'General')}</div>
                           <div class="w-full bg-slate-100 flex items-center justify-center overflow-hidden" style="max-height: 350px;">
                              <img src="${item.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400'}" class="w-full h-auto object-cover">
                           </div>
                        </div>
                     `}
                  </div>
                  
                  <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between shadow-inner gap-6">
                     <div class="flex gap-4">
                        <button onclick="window.Biblioteca.publishDirectly('linkedin')" 
                                class="bg-slate-900 text-white px-8 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/20 hover:scale-105 transition-all flex items-center gap-2">
                           <i class="fab fa-linkedin-in text-base text-blue-400"></i> Preparar LinkedIn
                        </button>
                        <button onclick="window.Biblioteca.publishDirectly('web')" class="bg-indigo-600 text-white px-8 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/30 hover:scale-105 transition-all flex items-center gap-2 border border-indigo-400/30 font-sans italic">
                           <i class="fas fa-globe text-base"></i> PUBLICAR WEB
                        </button>
                     </div>
                  </div>
               </div>

               <div class="w-80 flex flex-col gap-6 flex-shrink-0">
                  <div class="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                     <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic font-sans">Arte Estratégico</h4>
                     <div class="aspect-square bg-slate-200 rounded-3xl overflow-hidden mb-6 border-4 border-white shadow-md group relative">
                        <img src="${item.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400'}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        <div class="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button onclick="window.Biblioteca.suggestIAImage()" class="bg-white text-indigo-600 p-3 rounded-xl shadow-lg hover:rotate-180 transition-all font-sans italic">
                              <i class="fas fa-sync-alt"></i>
                           </button>
                        </div>
                     </div>
                     <button onclick="window.Biblioteca.suggestIAImage()" class="w-full py-4 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-all border border-dashed border-slate-300 rounded-xl bg-white mb-2 italic font-sans">Alternar Visual</button>
                     <button onclick="document.getElementById('biblioteca-img-upload').click()" class="w-full py-4 text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:text-white transition-all border border-indigo-500 rounded-xl bg-indigo-50 hover:bg-indigo-600 flex justify-center items-center gap-2 italic font-sans">
                        <i class="fas fa-camera"></i> Subir Mi Propia Foto
                     </button>
                     <input type="file" id="biblioteca-img-upload" accept="image/*" class="hidden" onchange="window.Biblioteca.uploadImage(this)">
                  </div>
                  
                  <div class="flex-grow"></div>
                  <p class="text-[8px] text-slate-400 font-bold uppercase text-center tracking-widest italic font-sans">Zolla Narrative Hub v46</p>
               </div>
            </div>
         </div>
      </div>`;
   },

   suggestIAImage: () => {
      const item = window.Biblioteca.state.activeItem;
      window.ZollaImageHelper.showSelector(item.category || 'General', (img) => {
         item.image = img;
         window.ZollaStore.save();
         window.Biblioteca.refresh();
      });
   },

   uploadImage: (input) => {
      if(input.files && input.files[0]) {
         const reader = new FileReader();
         reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const MAX_WIDTH = 800;
                let width = img.width;
                let height = img.height;
                if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                window.Biblioteca.state.activeItem.image = dataUrl;
                window.ZollaStore.save();
                window.Biblioteca.refresh();
            };
            img.src = e.target.result;
         }
         reader.readAsDataURL(input.files[0]);
      }
   },

   publishDirectly: async (platform) => {
      const item = window.Biblioteca.state.activeItem;
      const theme = item.category || 'Biblioteca';
      const cleanContent = window.cleanTextForPublishing(item.content, theme);
       // Extraer el verdadero título (jamás "ARTÍCULO XX", "POST XX", etc.)
       let cleanTitle = (item.title || '')
          .replace(/^art[ií]culo\s*\d*/gi, '')
          .replace(/^post\s*\d*/gi, '')
          .replace(/^tema\s*\d*/gi, '')
          .replace(/[:#*]+/g, '')
          .trim();
       // Si quedó vacío, extraer primera línea significativa del contenido
       if (!cleanTitle) {
          const firstLine = item.content.replace(/<[^>]*>/g, '').split('\n').map(l => l.trim()).find(l => l.length > 5 && l.length < 120);
          cleanTitle = firstLine || theme;
       }


      if (platform === 'web') {
         window.showNotification("Sincronizando...", "Despliegue Institucional...", "info");
         
         const paragraphs = cleanContent.split(/\n\n+/);
         const excerptStr = paragraphs[0];
         const actualContent = paragraphs.slice(1).join('\n\n');

         const blogPost = { 
            title: cleanTitle, 
            excerpt: excerptStr.substring(0, 300), 
            date: new Date().toLocaleDateString('es-ES'), 
            category: theme, 
            image: item.image, 
            content: actualContent || excerptStr 
         };

         try {
            const response = await fetch('https://www.zolla.com.pe/api/sync-blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blogPost) });
            if (response.ok) {
               window.ZollaStore.addPost({ theme: theme, title: cleanTitle, content: actualContent || excerptStr, image: item.image, published: true, platform: 'WEB' });
               window.showNotification("Éxito", "Artículo en Web.", "success");
               window.Biblioteca.state.showPreview = false;
               window.Biblioteca.refresh();
            }
         } catch (err) { window.showNotification("Error", "Fallo al publicar.", "error"); }
      } else {
         window.LinkedInPublisher.publish(cleanTitle, item.content, theme, item.image);
         window.ZollaStore.addPost({ theme: theme, title: cleanTitle, content: item.content, image: item.image, published: true, platform: 'LINKEDIN' });
         window.showNotification("LinkedIn", "Copiado y enviado.", "success");
      }
   },

   refresh: () => {
      const main = document.getElementById('main-content');
      if (main) main.innerHTML = window.Biblioteca.render();
   }
};
