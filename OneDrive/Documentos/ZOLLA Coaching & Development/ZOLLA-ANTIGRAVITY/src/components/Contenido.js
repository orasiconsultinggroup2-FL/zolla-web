window.Contenido = {
   state: {
      activePost: null,
      showPreview: false,
      previewMode: 'edit',
      authorSignature: 'Juan Ramon Zolla'
   },

   render: () => {
      const posts = window.ZollaStore.state.posts;
      const themes = [
         { t: 'Vocería Corporativa bajo Presión', icon: 'fa-microphone-alt', color: 'emerald' },
         { t: 'Gestión del cambio', icon: 'fa-sync-alt', color: 'emerald' },
         { t: 'Formación de Liderazgo', icon: 'fa-user-graduate', color: 'emerald' },
         { t: 'Asuntos públicos', icon: 'fa-landmark', color: 'emerald' },
         { t: 'Manejo de crisis reputacional', icon: 'fa-fire-extinguisher', color: 'emerald' },
         { t: 'Negociaciones multiactor', icon: 'fa-handshake', color: 'emerald' },
         { t: 'Liderazgo en Entornos de Alta Exigencia', icon: 'fa-mountain', color: 'emerald' },
         { t: 'Negociación Estratégica en Tiempos de Crisis', icon: 'fa-chess-knight', color: 'emerald' }
      ];

      return `
      <div class="animate-fade-in space-y-12 pb-32 w-full text-slate-900">
         <div class="flex items-center justify-between border-b border-slate-200 pb-12 mb-12">
            <div>
               <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-3">Narrative & Strategy Hub</p>
               <h2 class="text-5xl font-black text-slate-900 tracking-tighter flex items-center gap-6">
                  Centro de Narrativa <span class="bg-emerald-600 text-white text-[10px] px-4 py-1.5 rounded-full border border-emerald-700 uppercase tracking-widest shadow-lg shadow-emerald-500/20">Unified Suite</span>
               </h2>
               <p class="text-slate-500 text-base mt-4 font-medium max-w-2xl leading-relaxed italic">"El centro neurálgico para tu narrativa institucional: genera con IA, importa activos y publica en todos tus canales desde un solo lugar."</p>
            </div>
            <div class="flex gap-4">
               <button onclick="window.Contenido.setupZapier()" class="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-white border border-slate-200 hover:border-emerald-500 transition-all shadow-sm flex items-center justify-center group" title="Ajustes de Publicación">
                  <i class="fas fa-cog text-2xl group-hover:rotate-90 transition-transform"></i>
               </button>
            </div>
         </div>

         <!-- Unified Action Center -->
         <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div onclick="navigateTo('blogia')" class="group relative bg-slate-900 rounded-[3rem] p-10 overflow-hidden shadow-2xl hover:scale-[1.02] transition-all cursor-pointer border border-white/10">
               <i class="fas fa-bolt absolute top-10 right-10 text-7xl text-emerald-500/10 group-hover:text-emerald-500/20 transition-all -rotate-12"></i>
               <div class="relative z-10">
                  <div class="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-xl shadow-emerald-500/30">
                     <i class="fas fa-magic"></i>
                  </div>
                  <h3 class="text-2xl font-black text-white mb-3 tracking-tight">Generar con IA</h3>
                  <p class="text-slate-400 text-[8px] font-black leading-relaxed max-w-xs uppercase tracking-[0.2em]">Motor de inteligencia narrativa estratétiga.</p>
               </div>
               <div class="absolute bottom-10 right-10 text-white/50 bg-white/10 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/5">Iniciar →</div>
            </div>

            <div onclick="navigateTo('biblioteca')" class="group relative bg-white rounded-[3rem] p-10 overflow-hidden shadow-xl hover:scale-[1.02] transition-all cursor-pointer border border-slate-100">
               <i class="fas fa-server absolute top-10 right-10 text-7xl text-indigo-500/10 group-hover:text-indigo-500/20 transition-all -rotate-12"></i>
               <div class="relative z-10">
                  <div class="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-xl shadow-indigo-500/30">
                     <i class="fas fa-file-import"></i>
                  </div>
                  <h3 class="text-2xl font-black text-slate-900 mb-3 tracking-tight">Importar Hub</h3>
                   <p class="text-slate-500 text-[8px] font-black leading-relaxed max-w-xs uppercase tracking-[0.2em]">Sube archivos Word/Excel institucionales.</p>
               </div>
               <div class="absolute bottom-10 right-10 text-slate-400 bg-slate-50 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">Acceder →</div>
            </div>

            <div onclick="window.Contenido.createManualPost()" class="group relative bg-amber-50 rounded-[3rem] p-10 overflow-hidden shadow-xl border border-amber-100 hover:scale-[1.02] transition-all cursor-pointer">
               <i class="fas fa-pen-nib absolute top-10 right-10 text-7xl text-amber-500/10 group-hover:text-amber-500/20 transition-all -rotate-12"></i>
               <div class="relative z-10">
                  <div class="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-xl shadow-amber-500/30">
                     <i class="fas fa-keyboard"></i>
                  </div>
                  <h3 class="text-2xl font-black text-slate-900 mb-3 tracking-tight">Redactar Manual</h3>
                  <p class="text-slate-500 text-[8px] font-black leading-relaxed max-w-xs uppercase tracking-[0.2em]">Escribe tu propio artículo sin asistencia de IA.</p>
               </div>
               <div class="absolute bottom-10 right-10 text-amber-600 bg-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-amber-200 group-hover:bg-amber-500 group-hover:text-white transition-all">Crear →</div>
            </div>
         </div>

         <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-5 space-y-8">
               <div class="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
                  <h3 class="font-bold text-slate-800 text-lg mb-8 flex items-center gap-3"><span class="w-1.5 h-6 bg-emerald-500 rounded-full"></span> Ejes de Servicio</h3>
                  <div class="grid grid-cols-2 gap-4">
                     ${themes.map(theme => `
                        <div onclick="window.Contenido.createDraft('${theme.t}')" class="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-500/30 hover:bg-emerald-50/30 transition-all cursor-pointer group">
                           <i class="fas ${theme.icon} text-slate-400 group-hover:text-emerald-500 mb-4 text-xl transition-colors"></i>
                           <h4 class="text-xs font-black text-slate-700 group-hover:text-slate-900 uppercase tracking-wider">${theme.t}</h4>
                        </div>
                     `).join('')}
                  </div>
               </div>

               <div class="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
                  <div class="flex justify-between items-center mb-8">
                     <h3 class="font-bold text-slate-800 text-lg flex items-center gap-3"><span class="w-1.5 h-6 bg-blue-500 rounded-full"></span> Calendario Editorial</h3>
                     <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${new Date().toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div class="grid grid-cols-7 gap-1 text-[10px] font-bold text-slate-400 uppercase mb-4 text-center">
                     ${['D', 'L', 'M', 'X', 'J', 'V', 'S'].map(d => `<span>${d}</span>`).join('')}
                  </div>
                  <div class="grid grid-cols-7 gap-1 text-xs">
                     ${[...Array(31)].map((_, i) => {
         const day = i + 1;
         const date = new Date();
         const isToday = day === date.getDate();
         const hasPost = posts.some(p => {
            const pDate = new Date(parseInt(p.id));
            return pDate.getDate() === day && pDate.getMonth() === date.getMonth();
         });
         return `
                           <div class="flex flex-col items-center justify-center h-10 rounded-lg transition-all border border-transparent 
                              ${isToday ? 'bg-emerald-50 border-emerald-200 font-bold text-emerald-700' : 'hover:bg-slate-50 text-slate-600'}">
                              <span>${day}</span>
                              ${hasPost ? '<div class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 scale-75"></div>' : ''}
                           </div>`;
      }).join('')}
                  </div>
               </div>
            </div>

            <div class="col-span-12 xl:col-span-7 space-y-6">
               <div class="flex items-center justify-between mb-2">
                  <h3 class="font-bold text-slate-800 text-lg flex items-center gap-3"><span class="w-1.5 h-6 bg-emerald-500 rounded-full"></span> Archivador Histórico</h3>
                  <div class="flex items-center gap-4">
                     <button onclick="window.Contenido.clearHistory()" class="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors mr-2">
                        <i class="fas fa-trash-alt mr-1"></i> Borrar Todo
                     </button>
                     <span class="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-200">${posts.length} Documentos</span>
                  </div>
               </div>
               <div class="space-y-4">
                  ${posts.length === 0 ? `
                     <div class="p-20 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem]">
                        <i class="fas fa-file-alt text-slate-200 text-6xl mb-6"></i>
                        <p class="text-slate-400 font-bold italic uppercase tracking-widest text-[10px]">Sin actividad registrada en el archivador.</p>
                     </div>
                  ` : posts.map(post => `
                     <div class="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition-all group overflow-hidden relative">
                        <div class="flex gap-6 items-start relative z-10">
                           <div class="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                              <img src="${post.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=200'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
                           </div>
                           <div class="flex-grow">
                              <div class="flex justify-between items-start mb-3">
                                 <span class="text-[9px] font-black text-emerald-700 uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-md border border-emerald-100">${post.theme}</span>
                                  <div class="flex gap-2 text-slate-500 items-center">
                                     <span class="text-[9px] font-black text-slate-400 lowercase italic border-r border-slate-200 pr-2">${new Date(parseInt(post.id)).toLocaleDateString('es-ES')} · ${new Date(parseInt(post.id)).toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit'})}</span>
                                     <span class="text-[9px] ${post.published ? 'text-blue-600 border-blue-100 bg-blue-50' : 'text-emerald-600 border-emerald-100 bg-emerald-50'} font-black italic uppercase px-2 py-0.5 rounded border">${post.published ? 'Publicado' : 'Borrador'}</span>
                                     <!-- Botón Eliminar Individual -->
                                     <button onclick="window.Contenido.deleteSinglePost('${post.id}')" class="ml-2 text-slate-300 hover:text-red-500 transition-colors p-1" title="Eliminar este documento">
                                        <i class="fas fa-trash-alt text-[10px]"></i>
                                     </button>
                                  </div>
                               </div>
                                <h4 class="text-slate-900 font-black text-xl mb-3 leading-tight truncate-2">${(() => {
                                    let t = (post.title || '').replace(/^art[ií]culo\s*\d*/gi,'').replace(/^post\s*\d*/gi,'').replace(/[:#*]+/g,'').trim();
                                    if (!t) {
                                      t = (post.content || '').replace(/<[^>]*>/g,'').split('\n').map(l=>l.trim()).find(l=>l.length>5&&l.length<120) || post.theme;
                                    }
                                    return t || '(Sin Título)';
                                 })()}</h4>

                               <div class="flex gap-5">
                                  <button onclick="window.Contenido.openPreview('${post.id}')" class="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-2">
                                     <i class="fas fa-eye text-xs"></i> Revisión
                                  </button>
                                  ${!post.published ? `
                                     <button onclick="window.Contenido.openPreview('${post.id}')" class="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2">
                                        <i class="fas fa-paper-plane text-xs"></i> Publicar
                                     </button>
                                  ` : ''}
                               </div>
                           </div>
                        </div>
                        ${post.published ? '<div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rotate-45 translate-x-16 -translate-y-16"></div>' : ''}
                     </div>
                  `).join('')}
               </div>
            </div>
         </div>

         ${window.Contenido.state.showPreview ? window.Contenido.renderPreview() : ''}
      </div>`;
   },

   createDraft: (theme, forcedContent = null, forcedImage = null) => {
      let initialArticle = null;
      if (!forcedContent) {
         const articles = window.ArticleBank[theme] || [];
         const existingTitles = window.ZollaStore.state.posts.map(p => p.title);
         const availableArticles = articles.filter(a => !existingTitles.includes(a.title));
         
         initialArticle = availableArticles.length > 0 
             ? availableArticles[Math.floor(Math.random() * availableArticles.length)] 
             : window.generateInfiniteArticle(theme);
      }

      window.ZollaStore.addPost({
         theme: theme,
         title: forcedContent ? 'Importado de Biblioteca' : initialArticle.title,
         content: forcedContent || (initialArticle.title + "\n\n" + initialArticle.content),
         image: forcedImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400',
         published: false,
         platform: 'NA'
      });
      
      const addedPost = window.ZollaStore.state.posts[0]; 
      
      window.Contenido.refresh();
      window.Contenido.openPreview(addedPost.id);
   },

   createManualPost: () => {
      const newId = Date.now();
      const newPost = {
         id: newId,
         theme: 'Editorial Propio',
         content: `Escribe aquí tu título...\n\nEscribe aquí el cuerpo de tu artículo...`,
         image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800',
         published: false
      };
      window.ZollaStore.state.posts.unshift(newPost);
      window.ZollaStore.save();
      window.Contenido.openPreview(newId);
      window.showNotification("Editor Manual", "Lienzo en blanco listo para tu narrativa.", "info");
   },

   handleImageUpload: (event) => {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
         window.showNotification("Error", "Por favor selecciona un archivo de imagen válido.", "warning");
         return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
         const base64Image = e.target.result;
         window.Contenido.state.activePost.image = base64Image;
         window.ZollaStore.save();
         window.Contenido.refresh();
         window.showNotification("Foto Actualizada", "Tu imagen personalizada ha sido cargada con éxito.", "success");
      };
      reader.readAsDataURL(file);
   },

   changeImage: () => {
      // Si el post es 'Editorial Propio', forzamos el upload. 
      // Si es de eje, permitimos elegir del banco o subir.
      const post = window.Contenido.state.activePost;
      if (post.theme === 'Editorial Propio' || confirm("¿Deseas subir una foto propia? (Cancelar para elegir una del banco)")) {
         document.getElementById('manual-image-input').click();
      } else {
         const bank = [
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400',
            'https://images.unsplash.com/photo-1507679799987-c71c1955b23d?q=80&w=400',
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400'
         ];
         post.image = bank[Math.floor(Math.random() * bank.length)];
         window.ZollaStore.save();
         window.Contenido.refresh();
      }
   },
   openPreview: (id) => {
      const post = window.ZollaStore.state.posts.find(p => p.id == id);
      window.Contenido.state.activePost = post;
      window.Contenido.state.showPreview = true;
      window.Contenido.refresh();
   },

   renderPreview: () => {
      const post = window.Contenido.state.activePost;
      const s = window.Contenido.state;
      return `
      <div class="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[9000] flex items-center justify-center p-8 animate-fade-in text-slate-900">
         <div class="bg-white w-full max-w-5xl h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/20">
            <div class="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50/50">
               <div class="flex items-center gap-4 text-slate-900">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                     <i class="fas fa-file-signature text-xl"></i>
                  </div>
                  <div>
                     <h3 class="text-slate-900 font-black text-xl italic tracking-tighter">${post.title || post.theme}</h3>
                     <p class="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5 italic">Editor de Despliegue Estratégico · Unified Suite</p>
                  </div>
               </div>
               <button onclick="window.Contenido.state.showPreview = false; window.Contenido.refresh()" class="w-12 h-12 rounded-2xl hover:bg-slate-200 transition-all text-slate-400 flex items-center justify-center group">
                  <i class="fas fa-times text-xl group-hover:rotate-90 transition-transform"></i>
               </button>
            </div>
            
            <div class="flex-grow flex p-10 gap-10 overflow-hidden bg-white">
               <div class="flex-grow flex flex-col space-y-6 overflow-hidden">
                  <div class="flex justify-between items-center px-2">
                     <p class="text-slate-400 text-[10px] font-black uppercase tracking-widest">Área de Visualización</p>
                     <div class="flex bg-slate-100 rounded-lg p-1">
                        <button onclick="window.Contenido.state.previewMode = 'edit'; window.Contenido.refresh()" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${(!window.Contenido.state.previewMode || window.Contenido.state.previewMode === 'edit') ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}">Editor</button>
                        <button onclick="window.Contenido.state.previewMode = 'linkedin'; window.Contenido.refresh()" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${(window.Contenido.state.previewMode === 'linkedin') ? 'bg-[#0A66C2] shadow-sm text-white' : 'text-slate-400 hover:text-slate-600 flex items-center gap-2'}"><i class="fab fa-linkedin-in"></i> Preview Real</button>
                     </div>
                  </div>
                  <div class="flex-grow bg-white rounded-3xl p-6 border border-slate-100 relative overflow-hidden flex flex-col items-center">
                     ${(!window.Contenido.state.previewMode || window.Contenido.state.previewMode === 'edit') ? `
                        <!-- Título Editable -->
                        <div class="w-full mb-4 px-4">
                           <input type="text" 
                                  value="${post.title || ''}" 
                                  placeholder="TÍTULO ESTRATÉGICO..." 
                                  class="w-full bg-slate-50 border-b-2 border-slate-100 focus:border-emerald-500 outline-none py-3 text-xl font-black text-slate-800 uppercase tracking-tight transition-all"
                                  oninput="window.ZollaStore.updatePost('${post.id}', { title: this.value })">
                        </div>
                        
                        <!-- Rich Toolbar -->
                        <div class="w-full flex items-center gap-2 mb-4 p-2 bg-slate-50 rounded-xl border border-slate-100 flex-shrink-0">
                           <button onmousedown="event.preventDefault(); document.execCommand('bold', false, null)" class="w-8 h-8 rounded-lg hover:bg-white text-slate-600 flex items-center justify-center transition-all border border-transparent hover:border-slate-200" title="Negrita"><i class="fas fa-bold text-xs"></i></button>
                           <button onmousedown="event.preventDefault(); document.execCommand('italic', false, null)" class="w-8 h-8 rounded-lg hover:bg-white text-slate-600 flex items-center justify-center transition-all border border-transparent hover:border-slate-200" title="Cursiva"><i class="fas fa-italic text-xs"></i></button>
                           <button onmousedown="event.preventDefault(); document.execCommand('underline', false, null)" class="w-8 h-8 rounded-lg hover:bg-white text-slate-600 flex items-center justify-center transition-all border border-transparent hover:border-slate-200" title="Subrayado"><i class="fas fa-underline text-xs"></i></button>
                           <div class="w-px h-4 bg-slate-200 mx-2"></div>
                           <select onchange="document.execCommand('fontName', false, this.value)" class="bg-transparent text-[10px] font-bold text-slate-500 outline-none cursor-pointer">
                              <option value="Arial">Sans</option>
                              <option value="Georgia">Serif</option>
                           </select>
                        </div>
                        <div id="rich-editor-contenido" 
                             contenteditable="true" 
                             class="w-full h-full bg-transparent border-none outline-none text-slate-700 font-sans text-xl leading-relaxed overflow-y-auto p-4" 
                             onblur="window.ZollaStore.updatePost('${post.id}', { content: this.innerHTML })" 
                             oninput="window.Contenido.state.activePost.content = this.innerHTML">${post.content}</div>
                     ` : `
                        <!-- LinkedIn Realistic Preview -->
                        <div class="bg-white rounded-lg shadow-md border border-slate-200 w-full max-w-[400px] font-sans flex-shrink-0 mb-6 relative overflow-y-auto max-h-full">
                           <div class="flex items-center gap-3 p-4 sticky top-0 bg-white z-10 border-b border-slate-50">
                              <div class="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-emerald-400 font-black text-xl shadow-inner">Z</div>
                              <div>
                                 <h4 class="font-bold text-sm text-slate-900 leading-tight">ZOLLA Coaching & Development</h4>
                                 <p class="text-xs text-slate-500 leading-tight">Estrategia Directiva | Meta-Management</p>
                                 <p class="text-[10px] text-slate-400 leading-tight mt-0.5">Recién ahora • 🌎</p>
                              </div>
                           </div>
                           <div class="px-4 pb-3 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">${window.LinkedInPublisher.formatForLinkedIn(post.title || "", post.content, post.theme)}</div>
                           <div class="w-full bg-slate-100 flex items-center justify-center overflow-hidden" style="max-height: 350px;">
                              <img src="${post.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400'}" class="w-full h-auto object-cover">
                           </div>
                           <div class="p-3 border-t border-slate-100 flex justify-between px-6 text-slate-500 text-xs font-bold bg-slate-50/50">
                              <div class="flex items-center gap-2 p-2 rounded transition-colors"><i class="far fa-thumbs-up text-lg"></i> Recomendar</div>
                              <div class="flex items-center gap-2 p-2 rounded transition-colors"><i class="far fa-comment text-lg"></i> Comentar</div>
                              <div class="flex items-center gap-2 p-2 rounded transition-colors"><i class="fas fa-share text-lg"></i> Compartir</div>
                           </div>
                           ${window.LinkedInPublisher.lastCommentBuffer ? `
                           <div class="p-4 bg-slate-50 border-t border-slate-200">
                              <p class="text-[10px] text-slate-400 font-bold uppercase mb-2 italic">Primer Comentario (Auto-generado):</p>
                              <div class="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-600 italic">
                                 ${window.LinkedInPublisher.lastCommentBuffer.substring(0, 100)}...
                              </div>
                           </div>
                           ` : ''}
                        </div>
                     `}
                  </div>
                  
                  <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between shadow-inner gap-6">
                     <div class="flex gap-4">
                        <button onclick="window.LinkedInPublisher.publish('${(post.title || post.theme).replace(/'/g, "\\'")}', window.Contenido.state.activePost.content, '${post.theme}')" 
                                class="bg-[#0A66C2] text-white px-8 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-105 transition-all flex items-center gap-2">
                           <i class="fab fa-linkedin-in text-base"></i> LinkedIn
                        </button>
                        <button onclick="window.Contenido.confirmWebOnly()" class="bg-emerald-600 text-white px-8 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all flex items-center gap-2 border border-emerald-400/30">
                           <i class="fas fa-globe text-base"></i> PUBLICAR WEB
                        </button>
                     </div>
                  </div>
               </div>
               
               <div class="w-80 flex flex-col gap-6 flex-shrink-0">
                  <div class="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                     <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Arte Estratégico</h4>
                     <div class="aspect-square bg-slate-200 rounded-3xl overflow-hidden mb-6 border-4 border-white shadow-md group relative">
                         <img src="${post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400'}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                         <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                            <button onclick="window.Contenido.changeImage()" class="bg-white text-slate-900 px-4 py-2 rounded-xl shadow-lg hover:scale-110 active:scale-90 transition-all font-black text-[10px] uppercase tracking-widest mb-2">
                               <i class="fas fa-upload mr-2"></i> Subir Mi Foto
                            </button>
                            <input type="file" id="manual-image-input" class="hidden" accept="image/*" onchange="window.Contenido.handleImageUpload(event)">
                         </div>
                      </div>
                      <button onclick="window.Contenido.changeImage()" class="w-full py-4 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 transition-all border border-dashed border-slate-300 rounded-xl bg-white hover:bg-emerald-50">Cambiar Portada</button>
                   </div>
                  
                  <div class="flex-grow"></div>
                  <p class="text-[8px] text-slate-400 font-bold uppercase text-center tracking-widest italic">Zolla Narrative Hub v46</p>
               </div>
            </div>
         </div>
      </div>`;
   },

   importFromLibrary: () => {
      window.ZollaLibraryHelper.showSelector((item) => {
         window.Contenido.createDraft(item.category || 'Biblioteca', item.content, item.image);
      });
   },

   setupZapier: () => {
      const current = localStorage.getItem('zolla_zapier_webhook') || '';
      const url = prompt("Configura tu Webhook de Zapier (LinkedIn Post):", current);
      if (url !== null) {
         localStorage.setItem('zolla_zapier_webhook', url);
         window.showNotification("Configurado", "Zapier Webhook actualizado.", "success");
      }
   },

   confirmWebOnly: async () => {
      const post = window.Contenido.state.activePost;
      const confirm = window.confirm("¿Publicar en Canal Web oficial (zolla.com.pe)?");
      if (!confirm) return;

      window.showNotification("Sincronizando...", "Despliegue en curso...", "info");
      const cleanTitle = post.title || post.theme;
      const fullClean = window.cleanTextForPublishing(post.content, post.theme, cleanTitle);
      const paragraphs = fullClean.split(/\n\n+/);
      const excerptStr = paragraphs[0];
      const actualBody = window.cleanTextForPublishing(paragraphs.slice(1).join('\n\n'), post.theme, cleanTitle, excerptStr);

      try {
         const blogPost = {
            title: cleanTitle,
            excerpt: excerptStr.substring(0, 300), 
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            category: post.theme,
            image: post.image,
            content: actualBody || excerptStr // Si solo hay un párrafo, lo dejamos como contenido principal
         };

         const response = await fetch('https://www.zolla.com.pe/api/sync-blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blogPost)
         });

         if (response.ok) {
            window.ZollaStore.publishPost(post.id);
            window.showNotification("Publicación Exitosa", `Artículo desplegado en Web.`, "success");
            window.Contenido.state.showPreview = false;
            window.Contenido.refresh();
         }
      } catch (err) {
         console.error(err);
         window.showNotification("Error", "Fallo al conectar con la Web.", "error");
      }
   },

   clearHistory: () => {
      if (confirm("¿Borrar todo el historial?")) {
         window.ZollaStore.state.posts = [];
         window.ZollaStore.save();
         window.Contenido.refresh();
      }
   },

   deleteSinglePost: (id) => {
      if (confirm(`¿Eliminar permanentemente?`)) {
         window.ZollaStore.deletePost(parseInt(id));
         window.Contenido.refresh();
      }
   },

   refresh: () => {
      const main = document.getElementById('main-content');
      if (main) main.innerHTML = window.Contenido.render();
   }
};
