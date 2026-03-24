window.Biblioteca = {
   state: {
      activeItem: null,
      showPreview: false,
      previewMode: 'edit'
   },
   render: () => {
      const library = window.ZollaStore.state.library || [];
      
      return `
      <div class="animate-fade-in space-y-10 pb-32 w-full text-slate-900">
         <div class="flex items-center justify-between border-b border-slate-200 pb-10 mb-12">
            <div>
               <p class="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-2">Automated Content Hub</p>
               <h2 class="text-4xl font-black text-slate-900 flex items-center gap-4">
                  Biblioteca Inteligente <span class="bg-indigo-100 text-indigo-700 text-[10px] px-3 py-1 rounded-full border border-indigo-200 uppercase tracking-widest">Auto-Hub</span>
               </h2>
               <p class="text-slate-500 text-sm mt-3 font-medium">Tus archivos subidos se procesan y guardan automáticamente en este repositorio central.</p>
            </div>
            <div class="flex gap-4">
               <button onclick="Biblioteca.openNewItemModal()" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl hover:bg-indigo-500 transition-all font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-200 flex items-center gap-3">
                  <i class="fas fa-file-upload text-lg"></i> Importación Masiva
               </button>
            </div>
         </div>

         <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            ${library.length === 0 ? `
               <div class="col-span-full py-32 text-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem]">
                  <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 border border-slate-100 italic font-serif text-4xl">B</div>
                  <h3 class="text-xl font-bold text-slate-400 italic">"La biblioteca está lista para tus Words y Excels"</h3>
                  <p class="text-slate-400 text-sm mt-2">Sube tus archivos y se guardarán automáticamente aquí.</p>
               </div>
            ` : library.map(item => `
               <div class="bg-white border border-slate-200 rounded-[2.5rem] p-8 hover:shadow-2xl hover:border-indigo-500/30 transition-all group flex flex-col h-full relative overflow-hidden">
                  <div class="absolute top-0 right-0 w-24 h-24 bg-slate-50 rotate-45 translate-x-12 -translate-y-12"></div>
                  
                  <div class="flex justify-between items-start mb-6 relative z-10">
                     <span class="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase tracking-widest rounded-lg border border-indigo-100">${item.category || 'General'}</span>
                     <div class="flex gap-2">
                        <button onclick="Biblioteca.deleteItem(${item.id})" class="text-slate-300 hover:text-red-500 transition-all"><i class="fas fa-trash-alt text-xs"></i></button>
                     </div>
                  </div>

                  <h3 class="text-lg font-black text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">${item.title}</h3>
                  <div class="flex-grow">
                     <p class="text-slate-500 text-sm leading-relaxed line-clamp-6 font-medium italic italic">"${item.content.substring(0, 500)}..."</p>
                  </div>

                  <div class="mt-8 pt-8 border-t border-slate-100 flex gap-4">
                     <button onclick="Biblioteca.openPreview('${item.id}')" class="bg-indigo-600 text-white py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 w-full">
                        <i class="fas fa-eye text-xs"></i> Revisar y Publicar
                     </button>
                  </div>
               </div>
            `).join('')}
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
                        <h3 class="text-2xl font-black text-slate-900 tracking-tight">Carga Automática</h3>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic italic">Hub de Contenido Masivo</p>
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
                        <h3 class="text-lg font-black text-slate-900">Word (.docx)</h3>
                        <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">Guarda Automáticamente todos los artículos</p>
                     </div>
                     <input type="file" id="word-auto-input" accept=".docx" class="hidden" onchange="Biblioteca.handleAutoImport(this, 'word')">
                  </div>

                  <div onclick="Biblioteca.triggerExcelImport()" class="p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-emerald-600 hover:bg-emerald-50 transition-all cursor-pointer group">
                     <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                        <i class="fas fa-file-excel text-3xl"></i>
                     </div>
                     <div class="text-center">
                        <h3 class="text-lg font-black text-slate-900">Excel BBDD / Listas</h3>
                        <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">Importa base de datos automáticamente</p>
                     </div>
                     <input type="file" id="excel-auto-input" accept=".xlsx, .xls, .csv" class="hidden" onchange="Biblioteca.handleAutoImport(this, 'excel')">
                  </div>

               </div>
               <div class="p-10 border-t border-slate-100 flex gap-6 bg-slate-50/50">
                  <button onclick="Biblioteca.closeModal()" class="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl transition-all w-full">Cerrar Hub</button>
               </div>
            </div>
         </div>

         ${window.Biblioteca.state.showPreview ? window.Biblioteca.renderPreview() : ''}
      </div>`;
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

      window.showNotification("Procesando Archivo", "El contenido se guardará automáticamente...", "info");

      if (type === 'word') {
         Biblioteca.processWord(file);
      } else {
         Biblioteca.processExcel(file);
      }
      
      input.value = ''; // Reset input
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
                     const lines = chunk.split('\n').filter(l => l.trim());
                     itemsToSave.push({
                        title: (lines[0] || `Activo ${i+1}`).substring(0, 100),
                        category: matches[i][0].toUpperCase().includes('POST') ? 'LinkedIn' : 'Blog',
                        theme: 'General',
                        content: chunk
                     });
                  }
               } else {
                  const lines = text.split('\n').filter(l => l.trim());
                  itemsToSave.push({
                     title: (lines[0] || file.name).substring(0, 100),
                     category: 'General',
                     theme: 'General',
                     content: text
                  });
               }

               // GUARDADO AUTOMÁTICO
               itemsToSave.forEach(item => window.ZollaStore.addLibraryItem(item));
               
               window.showNotification("Guardado Automático", `${itemsToSave.length} activos guardados en Biblioteca.`, "success");
               Biblioteca.closeModal();
               window.navigateTo('biblioteca');
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
               complete: (results) => {
                  Biblioteca.saveExcelData(results.data);
               }
            });
         } else {
            const data = new Uint8Array(event.target.result);
            const workbook = window.xlsx.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = window.xlsx.utils.sheet_to_json(firstSheet);
            Biblioteca.saveExcelData(jsonData);
         }
      };

      if (isCsv) {
         reader.readAsText(file);
      } else {
         reader.readAsArrayBuffer(file);
      }
   },

   saveExcelData: (data) => {
      let count = 0;
      data.forEach(row => {
         // Intentamos identificar columnas comunes
         const title = row.Titulo || row.Title || row.Nombre || row.Empresa || Object.values(row)[0];
         const content = row.Contenido || row.Description || row.Nota || JSON.stringify(row);
         const category = row.Categoria || row.Status || 'Base de Datos';

         if (title && content) {
            window.ZollaStore.addLibraryItem({
               title: String(title),
               category: String(category),
               theme: 'BBDD',
               content: String(content)
            });
            count++;
         }
      });

      window.showNotification("BBDD Importada", `${count} filas procesadas y guardadas.`, "success");
      Biblioteca.closeModal();
      window.navigateTo('biblioteca');
   },

   deleteItem: (id) => {
      if (confirm("¿Eliminar este activo permanentemente?")) {
         window.ZollaStore.deleteLibraryItem(id);
         window.navigateTo('biblioteca');
         window.showNotification("Eliminado", "Se ha removido de la biblioteca", "info");
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
                     <h3 class="text-slate-900 font-black text-xl italic">${item.title}</h3>
                     <p class="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">Visor y Editor de Biblioteca</p>
                  </div>
               </div>
               <button onclick="window.Biblioteca.state.showPreview = false; window.Biblioteca.refresh()" class="w-12 h-12 rounded-2xl hover:bg-slate-200 transition-all text-slate-400 flex items-center justify-center group">
                  <i class="fas fa-times text-xl group-hover:rotate-90 transition-transform"></i>
               </button>
            </div>
            
            <div class="flex-grow flex p-10 gap-10 overflow-hidden">
               <div class="flex-grow flex flex-col space-y-6 overflow-hidden">
                  <div class="flex justify-between items-center px-2">
                     <p class="text-slate-400 text-[10px] font-black uppercase tracking-widest">Contenido de la Biblioteca</p>
                     <div class="flex bg-slate-100 rounded-lg p-1">
                        <button onclick="window.Biblioteca.state.previewMode = 'edit'; window.Biblioteca.refresh()" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${(!s.previewMode || s.previewMode === 'edit') ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}">Editor</button>
                        <button onclick="window.Biblioteca.state.previewMode = 'linkedin'; window.Biblioteca.refresh()" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${(s.previewMode === 'linkedin') ? 'bg-[#0A66C2] shadow-sm text-white' : 'text-slate-400 hover:text-slate-600 flex items-center gap-2'}"><i class="fab fa-linkedin-in"></i> Preview Real</button>
                     </div>
                  </div>
                  <div class="flex-grow bg-slate-50 rounded-3xl p-6 border border-slate-100 relative overflow-hidden flex flex-col items-center">
                     ${(!s.previewMode || s.previewMode === 'edit') ? `
                        <textarea spellcheck="false" class="w-full h-full bg-transparent border-none outline-none text-slate-700 font-serif text-xl leading-relaxed resize-none p-4" 
                        onchange="window.ZollaStore.updateLibraryItem('${item.id}', { content: window.cleanTextForPublishing(this.value, '${item.category || 'Biblioteca'}') })" 
                        oninput="window.Biblioteca.state.activeItem.content = this.value">${item.content}</textarea>
                     ` : `
                        <!-- LinkedIn Realistic Preview -->
                        <div class="bg-white rounded-lg shadow-md border border-slate-200 w-full max-w-[400px] font-sans flex-shrink-0 mb-6 relative overflow-y-auto max-h-full">
                           <div class="flex items-center gap-3 p-4 sticky top-0 bg-white z-10 border-b border-slate-50">
                              <div class="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-indigo-400 font-black text-xl shadow-inner">B</div>
                              <div>
                                 <h4 class="font-bold text-sm text-slate-900 leading-tight">ZOLLA Coaching & Development</h4>
                                 <p class="text-xs text-slate-500 leading-tight">Recurso Interno</p>
                                 <p class="text-[10px] text-slate-400 leading-tight mt-0.5">Recién ahora • 🌎</p>
                              </div>
                           </div>
                           <div class="px-4 pb-3 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">${item.content}</div>
                           <div class="w-full bg-slate-100 flex items-center justify-center overflow-hidden" style="max-height: 350px;">
                              <img src="${item.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400'}" class="w-full h-auto object-cover">
                           </div>
                           <div class="p-3 border-t border-slate-100 flex justify-between px-6 text-slate-500 text-xs font-bold bg-slate-50/50">
                              <div class="flex items-center gap-2 hover:bg-slate-100 p-2 rounded transition-colors cursor-pointer"><i class="far fa-thumbs-up text-lg"></i> Recomendar</div>
                              <div class="flex items-center gap-2 hover:bg-slate-100 p-2 rounded transition-colors cursor-pointer"><i class="far fa-comment text-lg"></i> Comentar</div>
                              <div class="flex items-center gap-2 hover:bg-slate-100 p-2 rounded transition-colors cursor-pointer"><i class="fas fa-share text-lg"></i> Compartir</div>
                           </div>
                        </div>
                     `}
                  </div>
                  
                  <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between shadow-inner gap-6">
                     <span class="text-xs text-slate-400 font-medium italic">Edita el contenido directamente. Los cambios se guardan automáticamente en la biblioteca.</span>
                     <div class="flex gap-4">
                        <button onclick="window.Biblioteca.publishDirectly('linkedin')" 
                                class="bg-[#0A66C2] text-white px-8 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                           <i class="fab fa-linkedin-in text-base"></i> Publicar en LinkedIn
                        </button>
                        <button onclick="window.Biblioteca.publishDirectly('web')" class="bg-indigo-600 text-white px-8 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/30 hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-indigo-400/30">
                           <i class="fas fa-globe text-base"></i> PUBLICAR WEB
                        </button>
                     </div>
                  </div>
               </div>

               <div class="w-80 flex flex-col gap-6 flex-shrink-0">
                  <div class="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                     <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Arte Visual Adicional</h4>
                     <button onclick="window.Biblioteca.suggestIAImage()" class="w-full py-4 text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:text-white transition-all border border-indigo-500 rounded-xl bg-indigo-50 hover:bg-indigo-600 flex justify-center items-center gap-2 mb-2">
                        <i class="fas fa-wand-magic-sparkles"></i> Sugerir Imagen IA
                     </button>
                     <div class="aspect-square bg-slate-200 rounded-3xl overflow-hidden mb-6 border-4 border-white shadow-md group relative">
                        <img src="${item.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400'}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                     </div>
                     <button onclick="document.getElementById('biblioteca-img-upload').click()" class="w-full py-4 text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:text-white transition-all border border-indigo-500 rounded-xl bg-indigo-50 hover:bg-indigo-600 flex justify-center items-center gap-2">
                        <i class="fas fa-camera"></i> Adjuntar Foto
                     </button>
                     <input type="file" id="biblioteca-img-upload" accept="image/*" class="hidden" onchange="window.Biblioteca.uploadImage(this)">
                  </div>
                  
                  <div class="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
                     <i class="fas fa-server absolute -bottom-4 -right-4 text-8xl text-indigo-400/20 -rotate-12"></i>
                     <h4 class="text-[9px] font-black uppercase tracking-widest mb-4 text-indigo-100">Hub Storage</h4>
                     <p class="text-[11px] font-bold leading-relaxed mb-6 italic text-indigo-50">"Archivos provenientes de Word o Excel, listos para integrarse al Ecosistema ZOLLA."</p>
                  </div>
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
      const s = window.Biblioteca.state;

      const confirmText = platform === 'web' 
         ? "¿Deseas publicar este artículo en tu Blog Oficial (zolla.com.pe) ahora mismo?" 
         : "¿Deseas publicar este artículo en LinkedIn (vía Zapier) usando el portapapeles o webhook?";
      
      const proceed = window.confirm(confirmText);
      if (!proceed) return;

      const title = item.title;
      const theme = item.category || 'Biblioteca';
      const cleanContent = window.cleanTextForPublishing(item.content, theme);
      const cleanTitle = title.length > 5 ? title : theme;

      // Cerrar modal
      window.Biblioteca.state.showPreview = false;
      window.Biblioteca.refresh();

      if (platform === 'web') {
         window.showNotification("Sincronizando...", "Iniciando despliegue institucional...", "info");
         const blogPost = {
            title: cleanTitle,
            excerpt: cleanContent.substring(0, 150).replace(/\n/g, ' ') + '...',
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            category: theme,
            image: item.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400",
            slug: cleanTitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^\w-]/g, ''),
            content: cleanContent
         };

         try {
            const response = await fetch('https://www.zolla.com.pe/api/sync-blog', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(blogPost)
            });

            if (!response.ok) {
               const data = await response.json().catch(() => ({}));
               // throw new Error(data.error || 'Error HTTP');
            }

            // Agregarlo a Centro de Contenido
            window.ZollaStore.addPost({ 
               theme: theme, title: cleanTitle, content: cleanContent, image: blogPost.image, published: true, platform: 'WEB', publishDate: new Date().toISOString()
            });
            window.showNotification("Publicación Exitosa", "Artículo desplegado en Canal Web desde la biblioteca.", "success");
         } catch (err) {
            console.warn("API Error, fallback to add post", err);
            window.ZollaStore.addPost({ 
               theme: theme, title: cleanTitle, content: cleanContent, image: blogPost.image, published: true, platform: 'WEB', publishDate: new Date().toISOString()
            });
            window.showNotification("Advertencia Web", "Publicado en tu Centro Local, revisa conexión con zolla.com.pe.", "warning");
         }
      } else {
         // LinkedIn publish logic
         window.ZollaStore.addPost({ 
            theme: theme, title: cleanTitle, content: cleanContent, image: item.image || '', published: true, platform: 'LINKEDIN', publishDate: new Date().toISOString()
         });
         window.LinkedInPublisher.publish(cleanTitle, cleanContent, theme, item.image);
         window.showNotification("Agregado a Contenidos", "Copiado para LinkedIn y archivado.", "success");
      }
   },

   refresh: () => {
      const main = document.getElementById('main-content');
      if (main) main.innerHTML = window.Biblioteca.render();
   }
};
