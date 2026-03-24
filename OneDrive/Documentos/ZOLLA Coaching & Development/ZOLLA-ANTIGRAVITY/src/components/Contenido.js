window.Contenido = {
   state: {
      activePost: null,
      showPreview: false,
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
      <div class="animate-fade-in space-y-10 pb-32 w-full text-slate-900">
         <div class="flex items-center justify-between border-b border-slate-200 pb-10 mb-12">
            <div>
               <p class="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-2">Content Strategy Management</p>
               <h2 class="text-4xl font-black text-slate-900 flex items-center gap-4">
                  Centro de Contenido <span class="bg-emerald-100 text-emerald-700 text-[10px] px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-widest">Live Engine</span>
               </h2>
               <p class="text-slate-500 text-sm mt-3 font-medium">Gestión integral de narrativa para LinkedIn y ZollaWeb.</p>
            </div>
            <div class="flex gap-4">
               <button onclick="window.Contenido.setupZapier()" class="p-3 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all border border-slate-200" title="Configurar Zapier">
                  <i class="fas fa-cog text-xl"></i>
               </button>
               <button onclick="navigateTo('dashboard')" class="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl hover:bg-slate-200 transition-all font-bold text-[10px] uppercase tracking-widest border border-slate-200">Panel Principal</button>
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
                     
                     <div onclick="window.Contenido.importFromLibrary()" class="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer group">
                        <i class="fas fa-book-open text-indigo-400 group-hover:text-indigo-600 mb-4 text-xl transition-colors"></i>
                        <h4 class="text-xs font-black text-indigo-700 group-hover:text-indigo-900 uppercase tracking-wider">BIBLIOTECA (IMPORTAR)</h4>
                     </div>
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
            const pDate = new Date(p.id);
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
                        <p class="text-slate-400 font-bold">Sin actividad registrada.</p>
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
                                 <div class="flex gap-2 text-slate-500">
                                    <span class="text-[9px] font-black">${new Date(post.id).toLocaleDateString('es-ES')}</span>
                                    <span class="text-[9px] ${post.published ? 'text-blue-600' : 'text-amber-600'} font-black italic uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-100">${post.published ? 'Publicado' : 'Borrador'}</span>
                                 </div>
                              </div>
                              <h4 class="text-slate-900 font-black text-xl mb-3 leading-tight truncate-2">${post.content.split('\n')[0].replace(/[#*]/g, '').substring(0, 60)}...</h4>
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

      const newPost = window.ZollaStore.addPost({
         theme: theme,
         title: forcedContent ? 'Importado de Biblioteca' : initialArticle.title,
         content: forcedContent || (initialArticle.title + "\n\n" + initialArticle.content),
         image: forcedImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400',
         published: false,
         platform: 'NA'
      });
      
      const addedPost = window.ZollaStore.state.posts[0]; // Assuming addPost unshifts
      
      window.Contenido.refresh();
      window.Contenido.openPreview(addedPost.id);
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
                     <h3 class="text-slate-900 font-black text-xl italic">${post.theme}</h3>
                     <p class="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">Editor de Despliegue Estratégico</p>
                  </div>
               </div>
               <button onclick="window.Contenido.state.showPreview = false; window.Contenido.refresh()" class="w-12 h-12 rounded-2xl hover:bg-slate-200 transition-all text-slate-400 flex items-center justify-center group">
                  <i class="fas fa-times text-xl group-hover:rotate-90 transition-transform"></i>
               </button>
            </div>
            
            <div class="flex-grow flex p-10 gap-10 overflow-hidden">
               <div class="flex-grow flex flex-col space-y-6 overflow-hidden">
                  <div class="flex justify-between items-center px-2">
                     <p class="text-slate-400 text-[10px] font-black uppercase tracking-widest">Área de Visualización</p>
                     <div class="flex bg-slate-100 rounded-lg p-1">
                        <button onclick="window.Contenido.state.previewMode = 'edit'; window.Contenido.refresh()" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${(!window.Contenido.state.previewMode || window.Contenido.state.previewMode === 'edit') ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}">Editor</button>
                        <button onclick="window.Contenido.state.previewMode = 'linkedin'; window.Contenido.refresh()" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${(window.Contenido.state.previewMode === 'linkedin') ? 'bg-[#0A66C2] shadow-sm text-white' : 'text-slate-400 hover:text-slate-600 flex items-center gap-2'}"><i class="fab fa-linkedin-in"></i> Preview Real</button>
                     </div>
                  </div>
                  <div class="flex-grow bg-slate-50 rounded-3xl p-6 border border-slate-100 relative overflow-hidden flex flex-col items-center">
                     ${(!window.Contenido.state.previewMode || window.Contenido.state.previewMode === 'edit') ? `
                        <textarea id="post-editor" spellcheck="false" class="w-full h-full bg-transparent border-none outline-none text-slate-700 font-serif text-xl leading-relaxed resize-none p-4" 
                        onchange="window.ZollaStore.updatePost('${post.id}', { content: window.cleanTextForPublishing(this.value, '${post.theme}') })" 
                        oninput="window.Contenido.state.activePost.content = this.value">${post.content}</textarea>
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
                           <div class="px-4 pb-3 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">${post.content}</div>
                           <div class="w-full bg-slate-100 flex items-center justify-center overflow-hidden" style="max-height: 350px;">
                              <img src="${post.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400'}" class="w-full h-auto object-cover">
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
                     <div class="flex items-center gap-4">
                        <button onclick="window.Contenido.generateAlternativeContent()" class="bg-indigo-50 border border-indigo-100 text-indigo-600 px-6 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-sm hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2">
                           <i class="fas fa-magic"></i> Generar Nueva Variante IA
                        </button>
                     </div>
                     <div class="flex gap-4">
                        <button onclick="window.LinkedInPublisher.publish('${post.theme.replace(/'/g, "\\'")}', window.Contenido.state.activePost.content, '${post.theme}')" 
                                class="bg-[#0A66C2] text-white px-8 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                           <i class="fab fa-linkedin-in text-base"></i> LinkedIn
                        </button>
                        <button onclick="window.Contenido.confirmWebOnly()" class="bg-emerald-600 text-white px-8 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-emerald-500/30 hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-emerald-400/30">
                           <i class="fas fa-globe text-base"></i> PUBLICAR WEB
                        </button>
                     </div>
                  </div>
               </div>
               
               <div class="w-80 flex flex-col gap-6 flex-shrink-0">
                  <div class="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                     <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Arte del Post</h4>
                     <div class="aspect-square bg-slate-200 rounded-3xl overflow-hidden mb-6 border-4 border-white shadow-md group relative">
                        <img src="${post.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400'}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        <div class="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button onclick="window.Contenido.changeImage()" class="bg-white text-emerald-600 p-3 rounded-xl shadow-lg hover:scale-110 active:scale-90 transition-all">
                              <i class="fas fa-sync-alt"></i>
                           </button>
                        </div>
                     </div>
                     <button onclick="window.Contenido.changeImage()" class="w-full py-4 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 transition-all border border-dashed border-slate-300 rounded-xl bg-white hover:bg-emerald-50 mb-2">Sugerir Imagen IA</button>
                     <button onclick="document.getElementById('content-img-upload').click()" class="w-full py-4 text-[9px] font-black uppercase tracking-widest text-emerald-600 hover:text-white transition-all border border-emerald-500 rounded-xl bg-emerald-50 hover:bg-emerald-600 flex justify-center items-center gap-2">
                        <i class="fas fa-camera"></i> Subir Mi Propia Foto
                     </button>
                     <input type="file" id="content-img-upload" accept="image/*" class="hidden" onchange="window.Contenido.uploadImage(this)">
                  </div>
                  
                  <div class="bg-emerald-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-500/20">
                     <i class="fas fa-bullhorn absolute -bottom-4 -right-4 text-8xl text-emerald-400/20 -rotate-12"></i>
                     <h4 class="text-[9px] font-black uppercase tracking-widest mb-4 text-emerald-100">Meta Estrategia</h4>
                     <p class="text-[11px] font-bold leading-relaxed mb-6 italic text-emerald-50">"Este contenido será desplegado de forma anónima para resaltar la voz institucional de la marca."</p>
                  </div>

                  <div class="flex-grow"></div>
                  <p class="text-[8px] text-slate-400 font-bold uppercase text-center tracking-widest">ZOLLA Antigravity v2.1</p>
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

   changeImage: () => {
      const post = window.Contenido.state.activePost;
      window.ZollaImageHelper.showSelector(post.theme, (img) => {
         post.image = img;
         window.ZollaStore.save();
         window.Contenido.refresh();
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
                 window.Contenido.state.activePost.image = dataUrl;
                 window.ZollaStore.save();
                 window.Contenido.refresh();
             };
             img.src = e.target.result;
         }
         reader.readAsDataURL(input.files[0]);
      }
   },

   generateAlternativeContent: () => {
      const post = window.Contenido.state.activePost;
      if(!post) return;
      
      const theme = post.theme;
      
      const articles = window.ArticleBank[theme] || [];
      if(articles.length > 0) {
         // Elegir un artículo al azar que no sea el mismo que ya está
         let newArticle;
         do {
            newArticle = articles[Math.floor(Math.random() * articles.length)];
         } while (articles.length > 1 && newArticle.content === post.content);
         
         post.content = newArticle.title + "\n\n" + newArticle.content;
      } else {
         post.content = `🎯 ${theme}: Nueva Perspectiva Estratégica\n\nAbordar el desafío de ${theme} requiere un cambio de paradigma profundo desde la máxima dirección. En ZOLLA Coaching & Development diseñamos este enfoque alineando capacidades críticas con la estrategia del negocio.`;
      }
      
      window.ZollaStore.save();
      window.Contenido.refresh();
      window.showNotification("Nueva Narrativa Generada", "Se ha sobreescrito el contenido con una variante única.", "success");
   },

   setupZapier: () => {
      const current = localStorage.getItem('zolla_zapier_webhook') || '';
      const url = prompt("Configura tu Webhook de Zapier (LinkedIn Post):", current);
      if (url !== null) {
         localStorage.setItem('zolla_zapier_webhook', url);
         window.showNotification("Configurado", "Zapier Webhook actualizado exitosamente.", "success");
      }
   },

   confirmWebOnly: async () => {
      const post = window.Contenido.state.activePost;
      
      const confirm = window.confirm("¿Deseas publicar este artículo en la Web oficial (zolla.com.pe)?");
      if (!confirm) return;

      window.showNotification("Sincronizando...", "Iniciando despliegue institucional...", "info");

      const cleanTitle = post.title && post.title.length > 5 ? post.title : post.theme;
      const cleanContent = window.cleanTextForPublishing(post.content, post.theme);

      try {
         const blogPost = {
            title: cleanTitle,
            excerpt: cleanContent.substring(0, 150).replace(/\n/g, ' ') + '...',
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            category: post.theme,
            image: post.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400",
            slug: cleanTitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^\w-]/g, ''),
            content: cleanContent
         };

         const response = await fetch('https://www.zolla.com.pe/api/sync-blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blogPost)
         });

         if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.error || `Error HTTP: ${response.status}`);
         }

         window.ZollaStore.publishPost(post.id);
         post.content = cleanContent;
         window.showNotification("Publicación Exitosa", `Artículo desplegado en Canal Web con éxito.`, "success");

         window.Contenido.state.showPreview = false;
         window.Contenido.refresh();
      } catch (err) {
         console.error("Blog Sync Error:", err);
         window.showNotification("Error Canal Web", `Fallo al publicar en el blog: ${err.message}.`, "error");
      }
   },

   publish: async (platform, text, theme) => {
      const cleanTitle = text.split('\n')[0].replace(/[#*]/g, '').trim();
      const cleanContent = window.cleanTextForPublishing(text, theme);

      if (platform === 'linkedin') {
         const post = window.Contenido.state.activePost;
         window.LinkedInPublisher.publish(cleanTitle.length > 5 ? cleanTitle : theme, cleanContent, theme, post.image);
         window.showNotification("LinkedIn", "Copiado y enviado.", "success");
      }
   },

   clearHistory: () => {
      if (confirm("¿Estás seguro de que quieres borrar todo el historial? Se eliminarán todos los borradores y publicaciones registradas.")) {
         window.ZollaStore.state.posts = [];
         window.ZollaStore.save();
         window.Contenido.refresh();
         window.showNotification("Historial Vaciado", "Se han eliminado todos los documentos del archivador.", "info");
      }
   },

   refresh: () => {
      const main = document.getElementById('main-content');
      if (main) main.innerHTML = window.Contenido.render();
   }
};
