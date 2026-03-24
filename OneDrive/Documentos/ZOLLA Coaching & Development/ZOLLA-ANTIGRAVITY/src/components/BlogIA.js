window.BlogIA = {
   state: {
      step: 1, 
      category: 'Vocería Corporativa bajo Presión',
      selectedTitle: '',
      suggestedTitles: [],
      generatedContent: '',
      authorSignature: 'Juan Ramon Zolla',
      selectedImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800',
      isGenerating: false,
      seoScore: 92
   },

   categories: [
      'Vocería Corporativa bajo Presión', 
      'Gestión del cambio', 
      'Formación de Liderazgo', 
      'Asuntos públicos', 
      'Manejo de crisis reputacional', 
      'Negociaciones multiactor',
      'Liderazgo en Entornos de Alta Exigencia',
      'Negociación Estratégica en Tiempos de Crisis'
   ],

   render: () => {
      const s = window.BlogIA.state;
      const posts = window.ZollaStore.state.posts.filter(p => p.published).slice(0, 5);
      
      return `
      <div class="animate-fade-in space-y-12 pb-32 w-full text-slate-900">
         <!-- Header -->
         <div class="flex items-center justify-between border-b border-slate-200 pb-10 mb-12">
            <div>
               <p class="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-2">Internal Web Content Engine</p>
               <h2 class="text-4xl font-black text-slate-900 flex items-center gap-4">
                  Blog IA <span class="bg-emerald-100 text-emerald-700 text-[10px] px-3 py-1 rounded-full border border-emerald-200 whitespace-nowrap uppercase tracking-widest font-black">v2.1 Enterprise</span>
               </h2>
               <p class="text-slate-500 text-sm mt-3 font-medium">Estrategia de narrativa personalizada para el portafolio de ZOLLA.</p>
            </div>
            <div class="flex gap-4">
               <button onclick="window.BlogIA.reset()" class="bg-white text-slate-600 px-6 py-3 rounded-xl hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest border border-slate-200 shadow-sm">
                  <i class="fas fa-undo mr-2 text-emerald-500"></i> Reiniciar
               </button>
               <button onclick="navigateTo('dashboard')" class="bg-slate-100 text-slate-500 px-6 py-3 rounded-xl hover:bg-slate-200 transition-all font-black text-[10px] uppercase tracking-widest border border-slate-200">Cerrar</button>
            </div>
         </div>

         <div class="grid grid-cols-12 gap-10">
            <div class="col-span-12 xl:col-span-8">
               <div class="premium-card p-12 min-h-[650px] flex flex-col justify-center relative overflow-hidden">
                  ${s.step === 1 ? window.BlogIA.renderStep1() : ''}
                  ${s.step === 2 ? window.BlogIA.renderStep2() : ''}
                  ${s.step === 3 ? window.BlogIA.renderStep3() : ''}
                  <div class="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                     <i class="fas fa-magic text-[200px] text-slate-900"></i>
                  </div>
               </div>
            </div>

            <div class="col-span-12 xl:col-span-4 space-y-8">
               <!-- SEO Progress -->
               <div class="premium-card !p-8">
                  <h3 class="text-slate-800 font-black text-xs uppercase tracking-widest mb-8 border-b border-slate-100 pb-5 flex items-center justify-between">
                     SEO Performance <i class="fas fa-chart-line text-emerald-500"></i>
                  </h3>
                  <div class="flex items-center justify-between mb-8">
                     <div class="relative w-24 h-24">
                        <svg class="w-full h-full transform -rotate-90">
                           <circle cx="48" cy="48" r="42" stroke="currentColor" stroke-width="8" fill="transparent" class="text-slate-100" />
                           <circle cx="48" cy="48" r="42" stroke="currentColor" stroke-width="8" fill="transparent" 
                                    stroke-dasharray="264" 
                                    stroke-dashoffset="${264 - (264 * s.seoScore / 100)}" 
                                    class="text-emerald-500 transition-all duration-1000" />
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center text-3xl font-black text-slate-900 italic">${s.seoScore}</div>
                     </div>
                     <div class="text-right">
                        <p class="text-emerald-600 font-black text-xs uppercase tracking-widest">Optimización</p>
                        <p class="text-slate-400 text-[10px] mt-1 font-bold italic">Auditado en tiempo real</p>
                     </div>
                  </div>
                  <ul class="space-y-4">
                     <li class="flex items-center gap-4 text-xs text-slate-600 font-bold p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <i class="fas fa-check-circle text-emerald-500 text-base"></i> Densidad de Keywords Estratégicas
                     </li>
                     <li class="flex items-center gap-4 text-xs text-slate-600 font-bold p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <i class="fas fa-check-circle text-emerald-500 text-base"></i> Autoridad de Títulos B2B
                     </li>
                  </ul>
               </div>

               <!-- Activity -->
               <div class="premium-card !p-8">
                  <h3 class="text-slate-800 font-black text-xs uppercase tracking-widest mb-6 border-b border-slate-100 pb-5">Actividad Reciente</h3>
                  <div class="space-y-4">
                     ${posts.length === 0 ? `
                        <div class="py-16 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                           <i class="fas fa-history text-slate-200 text-4xl mb-4 block"></i>
                           <p class="text-[10px] text-slate-400 uppercase font-black tracking-widest italic">Sin actividad registrada</p>
                        </div>
                     ` : posts.map(p => {
                        const date = p.publishDate ? new Date(p.publishDate) : new Date(p.id || Date.now());
                        const dateStr = date.toLocaleDateString('es-ES', {day: '2-digit', month: 'short', year: 'numeric'});
                        const timeStr = date.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'});
                        const platform = p.platform || 'WEB';
                        const badgeColor = platform === 'LINKEDIN' ? 'blue' : 'emerald';
                        return `
                        <div class="p-5 rounded-2xl border border-slate-100 bg-white hover:border-${badgeColor}-500/30 hover:shadow-md transition-all cursor-pointer group mb-3">
                           <div class="flex justify-between items-start mb-3 gap-2">
                              <span class="text-[8px] font-black text-slate-500 uppercase tracking-widest border border-slate-100 bg-slate-50 px-2 py-1 rounded-lg truncate max-w-[50%]">${p.theme}</span>
                              <div class="text-right">
                                 <span class="text-[8px] font-black text-${badgeColor}-600 uppercase tracking-[0.2em] bg-${badgeColor}-50 px-2 py-1 rounded inline-flex items-center gap-1">
                                    <i class="fas ${platform === 'LINKEDIN' ? 'fa-linkedin' : 'fa-globe'}"></i> ${platform}
                                 </span>
                                 <div class="text-[8px] text-slate-400 font-bold mt-1 tracking-widest">${dateStr} · ${timeStr}</div>
                              </div>
                           </div>
                           <h4 class="text-xs font-black text-slate-800 group-hover:text-${badgeColor}-700 transition-colors leading-relaxed truncate">${p.title || p.content.split('\n')[0].replace(/[#*]/g, '')}</h4>
                        </div>
                     `}).join('')}
                  </div>
               </div>
            </div>
         </div>
      </div>`;
   },

   renderStep1: () => {
      const s = window.BlogIA.state;
      return `
         <div class="max-w-2xl mx-auto animate-scale-in">
            <h3 class="text-slate-900 text-4xl font-black mb-6 italic">Strategic Deployment</h3>
            <p class="text-slate-500 text-base mb-12 leading-relaxed font-medium">Selecciona el eje estratégico de servicio. Nuestra IA diseñará una narrativa ejecutiva alineada con los objetivos de ZOLLA.</p>
            <div class="grid grid-cols-2 gap-6">
               ${window.BlogIA.categories.map(c => `
                  <div onclick="window.BlogIA.state.category = '${c}'; window.BlogIA.refresh()" 
                       class="p-8 rounded-[2rem] border-2 transition-all cursor-pointer flex flex-col gap-4 ${s.category === c ? 'bg-emerald-50 border-emerald-500 shadow-xl shadow-emerald-500/10 scale-[1.02]' : 'bg-white border-slate-100 hover:border-slate-300 hover:scale-[1.01] shadow-sm'}">
                     <i class="fas ${c.includes('Vocería') ? 'fa-microphone-alt' : c.includes('Gestión') ? 'fa-sync-alt' : c.includes('Formación') ? 'fa-user-graduate' : c.includes('Asuntos') ? 'fa-landmark' : c.includes('Manejo') ? 'fa-fire-extinguisher' : c.includes('Liderazgo') ? 'fa-mountain' : c.includes('Crisis') ? 'fa-chess-knight' : 'fa-handshake'} ${s.category === c ? 'text-emerald-600' : 'text-slate-300'} text-3xl"></i>
                     <span class="text-sm font-black ${s.category === c ? 'text-emerald-900' : 'text-slate-500'} uppercase tracking-wider">${c}</span>
                  </div>
               `).join('')}
               <div onclick="window.BlogIA.importFromLibrary()" 
                    class="p-8 rounded-[2rem] border-2 transition-all cursor-pointer flex flex-col gap-4 bg-indigo-50/50 border-indigo-100 hover:border-indigo-500 hover:scale-[1.02] shadow-sm group">
                  <i class="fas fa-book-open text-indigo-400 group-hover:text-indigo-600 text-3xl transition-colors"></i>
                  <span class="text-sm font-black text-indigo-700 uppercase tracking-wider">Biblioteca (Importar)</span>
               </div>
            </div>
            
            <button onclick="window.BlogIA.generateTitles()" class="w-full mt-12 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-7 rounded-[2rem] shadow-2xl shadow-emerald-500/20 transition-all uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-4">
               ${s.isGenerating ? '<i class="fas fa-spinner fa-spin"></i> Procesando Matrices...' : '<i class="fas fa-magic"></i> Sugerir Ángulos Narrativos'}
            </button>
         </div>`;
   },

   renderStep2: () => {
      const s = window.BlogIA.state;
      return `
         <div class="animate-scale-in">
            <div class="flex items-center gap-6 mb-12">
               <button onclick="window.BlogIA.state.step = 1; window.BlogIA.refresh()" class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-all"><i class="fas fa-arrow-left"></i></button>
               <div>
                  <h3 class="text-slate-900 text-3xl font-black italic">Selección de Ángulo</h3>
                  <p class="text-slate-500 text-xs font-black uppercase tracking-widest mt-2 px-4 py-1.5 bg-emerald-50 rounded-full inline-block border border-emerald-100">Eje Estratégico: <span class="text-emerald-600 underline decoration-2 underline-offset-4">${s.category}</span></p>
               </div>
            </div>
            <div class="grid grid-cols-1 gap-5 max-w-4xl">
               ${s.suggestedTitles.map((title, idx) => `
                  <div onclick="window.BlogIA.selectTitle('${title}')" class="bg-white border border-slate-100 p-8 rounded-[2rem] hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer group flex items-center gap-8 shadow-sm">
                     <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">0${idx+1}</div>
                     <h4 class="text-slate-800 font-black text-xl group-hover:text-emerald-800 transition-colors leading-snug">${title}</h4>
                  </div>
               `).join('')}
            </div>
         </div>`;
   },

   renderStep3: () => {
      const s = window.BlogIA.state;
      return `
         <div class="animate-scale-in space-y-10">
            <div class="flex items-center justify-between">
               <div class="flex items-center gap-6">
                  <button onclick="window.BlogIA.state.step = 2; window.BlogIA.refresh()" class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-all"><i class="fas fa-arrow-left"></i></button>
                  <div class="max-w-xl">
                     <h3 class="text-slate-900 text-2xl font-black italic truncate">${s.selectedTitle}</h3>
                     <p class="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">Revisión Final & Despliegue Institucional</p>
                  </div>
               </div>
               <div class="flex gap-4 items-center">
                  <!-- LinkedIn Section -->
                  <div class="flex flex-col gap-2">
                     <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center">Canal Externo</span>
                     <button onclick="window.BlogIA.confirmLinkedIn()" 
                             class="flex items-center gap-3 bg-[#0A66C2] hover:bg-[#004182] text-white px-8 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all">
                        <i class="fab fa-linkedin-in text-base"></i> LinkedIn
                     </button>
                  </div>

                  <!-- Web Section -->
                  <div class="flex flex-col gap-2">
                     <span class="text-[8px] font-black text-emerald-500 uppercase tracking-widest text-center">Canal Propio</span>
                     <button onclick="window.BlogIA.confirmWeb()" 
                             class="flex items-center gap-4 bg-emerald-600 text-white px-10 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-emerald-500/30 hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all border border-emerald-400/30">
                        <i class="fas fa-globe text-base"></i> EJECUTAR EN WEB
                     </button>
                  </div>
               </div>
            </div>
            </div>
            
            <div class="grid grid-cols-12 gap-10">
               <div class="col-span-12 lg:col-span-8 space-y-6">
                  <div class="flex justify-between items-center px-2">
                     <p class="text-slate-400 text-[10px] font-black uppercase tracking-widest">Área de Visualización</p>
                     <div class="flex bg-slate-100 rounded-lg p-1">
                        <button onclick="window.BlogIA.state.previewMode = 'edit'; window.BlogIA.refresh()" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${(!s.previewMode || s.previewMode === 'edit') ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}">Editor</button>
                        <button onclick="window.BlogIA.state.previewMode = 'linkedin'; window.BlogIA.refresh()" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${(s.previewMode === 'linkedin') ? 'bg-[#0A66C2] shadow-sm text-white' : 'text-slate-400 hover:text-slate-600 flex items-center gap-2'}"><i class="fab fa-linkedin-in"></i> Vista LinkedIn</button>
                        <button onclick="window.BlogIA.state.previewMode = 'web'; window.BlogIA.refresh()" class="px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${(s.previewMode === 'web') ? 'bg-emerald-600 shadow-sm text-white' : 'text-slate-400 hover:text-slate-600 flex items-center gap-2'}"><i class="fas fa-globe"></i> Vista Blog Web</button>
                     </div>
                  </div>
                  <!-- Improved Framing: Clean white background with professional shadow -->
                  <div class="bg-slate-50 rounded-[2.5rem] p-6 border-2 border-slate-100 relative h-[500px] shadow-sm overflow-hidden flex flex-col items-center">
                     <div class="h-full w-full overflow-y-auto pr-4 scrollbar-hide flex justify-center">
                        ${s.isGenerating ? `
                           <div class="absolute inset-0 flex flex-col items-center justify-center space-y-8 bg-white/50 backdrop-blur-sm">
                              <div class="bg-emerald-100 p-8 rounded-full">
                                 <i class="fas fa-spinner fa-spin text-emerald-600 text-5xl"></i>
                              </div>
                              <p class="text-emerald-700 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">Redactando Narrativa Empresarial...</p>
                           </div>
                        ` : (!s.previewMode || s.previewMode === 'edit') ? `
                           <textarea id="blog-editor-final" class="w-full min-h-full bg-white rounded-2xl shadow-sm border border-slate-100 outline-none text-slate-700 font-serif text-xl leading-relaxed resize-none p-8" 
                                     placeholder="Redactando..."
                                     onchange="this.value = window.cleanTextForPublishing(this.value, '${s.category}'); window.BlogIA.state.generatedContent = this.value"
                                     oninput="window.BlogIA.state.generatedContent = this.value">${s.generatedContent}</textarea>
                        ` : s.previewMode === 'linkedin' ? `
                           <!-- LinkedIn Realistic Preview -->
                           <div class="bg-white rounded-lg shadow-md border border-slate-200 w-full max-w-[400px] font-sans flex-shrink-0 mb-6 relative mt-4 overflow-y-auto max-h-full">
                              <div class="flex items-center gap-3 p-4 sticky top-0 bg-white z-10 border-b border-slate-50">
                                 <div class="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-emerald-400 font-black text-xl shadow-inner">Z</div>
                                 <div class="flex flex-col">
                                    <h4 class="font-bold text-sm text-slate-900 leading-tight">ZOLLA Coaching & Development</h4>
                                    <p class="text-xs text-slate-500 leading-tight mt-0.5">Estrategia Directiva | Meta-Management</p>
                                    <p class="text-[10px] text-slate-400 leading-tight mt-1">Recién ahora • 🌎</p>
                                 </div>
                              </div>
                              <div class="px-4 pb-3 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">${s.generatedContent}</div>
                              <div class="w-full bg-slate-100 flex items-center justify-center overflow-hidden" style="max-height: 350px;">
                                 <img src="${s.selectedImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400'}" class="w-full h-auto object-cover">
                              </div>
                              <div class="p-3 border-t border-slate-100 flex justify-between px-6 text-slate-500 text-xs font-bold bg-slate-50/50">
                                 <div class="flex items-center gap-2 hover:bg-slate-100 p-2 rounded transition-colors cursor-pointer"><i class="far fa-thumbs-up text-lg"></i> Recomendar</div>
                                 <div class="flex items-center gap-2 hover:bg-slate-100 p-2 rounded transition-colors cursor-pointer"><i class="far fa-comment text-lg"></i> Comentar</div>
                                 <div class="flex items-center gap-2 hover:bg-slate-100 p-2 rounded transition-colors cursor-pointer"><i class="fas fa-share text-lg"></i> Compartir</div>
                              </div>
                           </div>
                        ` : `
                           <!-- Web Blog Realistic Preview -->
                           <div class="w-full text-left font-sans bg-white rounded-2xl p-10 shadow-md border border-slate-100 h-max overflow-y-auto max-h-full">
                               <div class="w-full h-48 rounded-xl overflow-hidden mb-8 shadow-inner border border-slate-100">
                                   <img src="${s.selectedImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400'}" class="w-full h-full object-cover">
                               </div>
                               <span class="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 inline-block">${s.category || 'ESTRATEGIA'}</span>
                               <h1 class="text-3xl font-black text-slate-900 leading-tight mb-4">${s.selectedTitle || 'Sin Título'}</h1>
                               <p class="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-10 border-b border-slate-100 pb-4">POR ZOLLA C&D • ${new Date().toLocaleDateString('es-ES')}</p>
                               <div class="text-slate-700 font-serif text-lg leading-relaxed whitespace-pre-wrap">${s.generatedContent}</div>
                           </div>
                        `}
                     </div>
                  </div>

                  <div class="bg-white rounded-3xl p-6 border border-slate-200 flex items-center gap-6 shadow-sm">
                     <div class="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                        <i class="fas fa-shield-alt text-xl"></i>
                     </div>
                     <div class="flex-grow">
                        <label class="block text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 font-black">Modo de Publicación</label>
                        <p class="text-slate-800 font-black text-sm uppercase tracking-wider italic">Voz Institucional ZOLLA (Sin Firma)</p>
                     </div>
                     <div class="text-[8px] font-bold text-slate-400 italic max-w-[120px]">El contenido se publicará resaltando el mensaje institucional de la marca.</div>
                  </div>
               </div>
               
               <div class="col-span-12 lg:col-span-4 space-y-8">
                  <div class="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm overflow-hidden relative">
                     <h4 class="text-slate-800 font-black text-[10px] uppercase tracking-widest mb-6 px-1">Asset Visual B2B</h4>
                     <div class="aspect-square bg-slate-50 rounded-3xl mb-8 border border-slate-100 overflow-hidden flex items-center justify-center relative group shadow-inner">
                        ${s.selectedImage ? `<img src="${s.selectedImage}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">` : '<i class="fas fa-image text-4xl text-slate-200"></i>'}
                        <div class="absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button onclick="window.BlogIA.generateAIImage()" class="bg-white text-emerald-700 w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all">
                              <i class="fas fa-sync-alt"></i>
                           </button>
                        </div>
                     </div>
                     <button onclick="window.BlogIA.generateAIImage()" class="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-black py-4 rounded-2xl border border-slate-100 transition-all uppercase text-[10px] tracking-widest flex gap-3 justify-center items-center shadow-sm mb-2">
                        <i class="fas fa-wand-magic-sparkles text-emerald-500"></i> Generar Arte IA
                     </button>
                     <button onclick="document.getElementById('blogia-img-upload').click()" class="w-full py-4 text-[9px] font-black uppercase tracking-widest text-emerald-600 hover:text-white transition-all border border-emerald-500 rounded-xl bg-emerald-50 hover:bg-emerald-600 flex justify-center items-center gap-2">
                        <i class="fas fa-camera"></i> Subir Mi Propia Foto
                     </button>
                     <input type="file" id="blogia-img-upload" accept="image/*" class="hidden" onchange="window.BlogIA.uploadImage(this)">
                  </div>
                  
                  <div class="bg-emerald-50 rounded-[2.5rem] p-10 text-emerald-900 border border-emerald-100 relative overflow-hidden">
                     <i class="fas fa-info-circle absolute top-4 right-4 text-emerald-200"></i>
                     <p class="text-[9px] font-black uppercase tracking-widest mb-3 text-emerald-600">Sincronización</p>
                     <p class="text-xs font-bold leading-snug italic">"Este artículo será desplegado como un post de LinkedIn y una entrada de blog institucional de forma anónima."</p>
                  </div>
               </div>
            </div>
         </div>`;
   },

   importFromLibrary: () => {
      window.ZollaLibraryHelper.showSelector((item) => {
         window.BlogIA.state.category = item.category || 'Gestión del cambio';
         window.BlogIA.state.selectedTitle = 'Importado de Biblioteca';
         window.BlogIA.state.generatedContent = item.content;
         window.BlogIA.state.image = item.image;
         window.BlogIA.state.step = 3;
         window.BlogIA.refresh();
      });
   },

   generateTitles: () => {
      const cat = window.BlogIA.state.category;
      window.BlogIA.state.isGenerating = true;
      window.BlogIA.refresh();

      setTimeout(() => {
         const articles = window.ArticleBank[cat] || [];
         
         // Evitar repetición de artículos generados previamente
         const existingTitles = window.ZollaStore.state.posts.map(p => p.title);
         const availableArticles = articles.filter(a => !existingTitles.includes(a.title));
         
         let selectedArticle;
         if (availableArticles.length > 0) {
             selectedArticle = availableArticles[Math.floor(Math.random() * availableArticles.length)];
         } else {
             // Fallback infinito
             selectedArticle = window.generateInfiniteArticle(cat);
         }

         window.BlogIA.state.selectedTitle = selectedArticle.title;
         window.BlogIA.state.generatedContent = window.cleanTextForPublishing(selectedArticle.title + "\n\n" + selectedArticle.content, cat);
         window.BlogIA.state.selectedImage = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400';
         
         window.BlogIA.state.isGenerating = false;
         // Saltar directamente al editor (Paso 3)
         window.BlogIA.state.step = 3;
         window.BlogIA.refresh();
      }, 1200);
   },

   generateAIImage: () => {
      const s = window.BlogIA.state;
      window.ZollaImageHelper.showSelector(s.category, (img) => {
         s.selectedImage = img;
         window.BlogIA.refresh();
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
                 window.BlogIA.state.selectedImage = dataUrl;
                 window.BlogIA.refresh();
             };
             img.src = e.target.result;
         }
         reader.readAsDataURL(input.files[0]);
      }
   },

   confirmLinkedIn: async () => {
      const s = window.BlogIA.state;
      const alreadyPublished = window.ZollaStore.state.posts.some(p => p.title === s.selectedTitle && p.platform === 'LINKEDIN' && p.published === true);
      if (alreadyPublished) {
         window.showNotification("Aviso", "Este artículo ya fue publicado en LinkedIn anteriormente.", "warning");
         return;
      }

      const confirm = window.confirm("¿Deseas publicar este artículo en LinkedIn (vía Zapier)?");
      if (!confirm) return;

      const wh = localStorage.getItem('zolla_zapier_webhook');
      if (!wh) {
         return window.showNotification("Configuración Requerida", "Configura tu Webhook de Zapier en la pestaña de Contenido.", "warning");
      }

      const cleanText = window.cleanTextForPublishing(s.generatedContent, s.category);
      const finalContent = cleanText;
      window.showNotification("LinkedIn", "Sincronizando con Zapier...", "info");

      try {
         await fetch(wh, {
            method: 'POST', 
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
               theme: s.category, 
               title: s.selectedTitle, 
               content: finalContent, 
               image_url: s.selectedImage, 
               author: 'Institucional' 
            })
         });
         window.showNotification("LinkedIn", "Enviado con éxito a Zapier.", "success");
         
         window.ZollaStore.addPost({ 
            theme: s.category, 
            title: s.selectedTitle,
            content: finalContent, 
            image: s.selectedImage, 
            published: true, 
            platform: 'LINKEDIN',
            publishDate: new Date().toISOString()
         });

         // Also trigger manual modal as backup
         window.LinkedInPublisher.publish(s.selectedTitle, s.generatedContent, s.category, s.image);
      } catch (err) {
         console.error("LinkedIn Error:", err);
         window.showNotification("Error", "No se pudo conectar con LinkedIn.", "error");
      }
   },

   confirmWeb: async () => {
      const s = window.BlogIA.state;
      const alreadyPublished = window.ZollaStore.state.posts.some(p => p.title === s.selectedTitle && p.platform === 'WEB' && p.published === true);
      if (alreadyPublished) {
         window.showNotification("Aviso", "Este artículo ya fue publicado en Web anteriormente.", "warning");
         return;
      }

      const confirm = window.confirm("¿Deseas publicar este artículo en la Web oficial (zolla.com.pe)?");
      if (!confirm) return;

      const cleanText = window.cleanTextForPublishing(s.generatedContent, s.category);
      const finalContent = cleanText;
      window.showNotification("Web", "Sincronizando con zolla.com.pe...", "info");

      try {
         const response = await fetch('https://www.zolla.com.pe/api/sync-blog', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
               title: s.selectedTitle, 
               category: s.category, 
               content: finalContent, 
               image: s.selectedImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800", 
               date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
               slug: s.selectedTitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^\w-]/g, '')
            })
         });
         
         if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.error || `HTTP ${response.status}`);
         }
         
         window.showNotification("Éxito Web", "Artículo publicado en zolla.com.pe correctamente.", "success");
         
         window.ZollaStore.addPost({ 
            theme: s.category, 
            title: s.selectedTitle,
            content: finalContent, 
            image: s.selectedImage, 
            published: true,
            platform: 'WEB',
            publishDate: new Date().toISOString()
         });
      } catch (err) {
         console.error("Web Error:", err);
         window.showNotification("Error Web", `Fallo al publicar en el blog: ${err.message}`, "error");
      }
   },

   reset: () => { 
      window.BlogIA.state.step = 1; 
      window.BlogIA.state.generatedContent = '';
      window.BlogIA.refresh(); 
   },

   refresh: () => {
      const main = document.getElementById('main-content');
      if (main) main.innerHTML = window.BlogIA.render();
   }
};

// ─────────────────────────────────────────────
// LINKEDIN PUBLISHER — ZOLLA Company Page
// Company ID: 80888096
// ─────────────────────────────────────────────
window.LinkedInPublisher = {
   COMPANY_PAGE_URL: 'https://www.linkedin.com/company/80888096/admin/page-posts/published/',
   COMPOSE_URL: 'https://www.linkedin.com/company/80888096/admin/page-posts/published/',

   /**
    * Formatea el contenido del blog para LinkedIn:
    * - Elimina markdown pesado
    * - Añade emojis estratégicos
    * - Limita a ~3000 caracteres (límite de LinkedIn)
    * - Añade hashtags al final
    */
   formatForLinkedIn: (title, content, category) => {
      // Limpiar markdown
      let text = content
         .replace(/\*\*(.*?)\*\*/g, '$1')       // negrita
         .replace(/\*(.*?)\*/g, '$1')             // itálica
         .replace(/#{1,6}\s/g, '')                // encabezados
         .replace(/---/g, '\n')                   // separadores
         .replace(/\n{3,}/g, '\n\n')              // múltiples líneas
         .trim();

      // Construir el post de LinkedIn
      const hashtagMap = {
         'Vocería Corporativa bajo Presión': '#VoceríaBajoPresión #ComunicaciónCrisis #Liderazgo',
         'Gestión del cambio': '#GestiónDelCambio #Transformación #Liderazgo',
         'Formación de Liderazgo': '#Liderazgo #DesarrolloEjecutivo #Coaching',
         'Asuntos públicos': '#AsuntosPúblicos #RelacionesInstitucionales',
         'Manejo de crisis reputacional': '#ManejoDecrisis #Reputación #Comunicación',
         'Negociaciones multiactor': '#Negociación #Stakeholders #Estrategia',
         'Liderazgo en Entornos de Alta Exigencia': '#LiderazgoElite #AltaExigencia #Resiliencia',
         'Negociación Estratégica en Tiempos de Crisis': '#NegociaciónCrisis #HarvardMethod #Estrategia'
      };

      const hashtags = hashtagMap[category] || '#Estrategia #Liderazgo #ZOLLA';

      const liPost = `🎯 ${title}

${text.substring(0, 2500)}

${hashtags} #ZOLLACoaching #Consultoría #B2B #Institucional`;

      return liPost;
   },

   /**
    * Publica en LinkedIn: copia el texto y abre la página de empresa
    */
   publish: async (title, content, category, imageUrl = null) => {
      try {
         const formattedPost = window.LinkedInPublisher.formatForLinkedIn(title, content, category);

         // 1. Copiar al portapapeles
         await navigator.clipboard.writeText(formattedPost);

         // 2. Mostrar modal de instrucciones
         window.LinkedInPublisher.showPublishModal(formattedPost, imageUrl);

      } catch (err) {
         console.error('LinkedIn Publisher Error:', err);
         window.showNotification('Error', 'No se pudo copiar el contenido. Inténtalo de nuevo.', 'warning');
      }
   },

   showPublishModal: (text, imageUrl = null) => {
      // Eliminar modal anterior si existe
      const existing = document.getElementById('li-publish-modal');
      if (existing) existing.remove();

      const modal = document.createElement('div');
      modal.id = 'li-publish-modal';
      modal.className = 'fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[500] flex items-center justify-center p-8';
      modal.innerHTML = `
         <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
            <!-- Header -->
            <div class="bg-[#0A66C2] px-10 py-8 flex items-center justify-between">
               <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                     <i class="fab fa-linkedin-in text-2xl text-white"></i>
                  </div>
                  <div>
                     <h3 class="text-white font-black text-xl">Publicar en LinkedIn</h3>
                     <p class="text-blue-200 text-[11px] font-bold uppercase tracking-widest mt-0.5">ZOLLA Coaching & Development · Empresa</p>
                  </div>
               </div>
               <button onclick="document.getElementById('li-publish-modal').remove()" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                  <i class="fas fa-times"></i>
               </button>
            </div>

            <!-- Steps -->
            <div class="px-10 py-8 space-y-6">
               <div class="flex items-start gap-5 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div class="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">1</div>
                  <div>
                     <p class="font-black text-slate-800 text-sm">Contenido copiado al portapapeles</p>
                     <p class="text-slate-500 text-xs font-medium mt-1">El post ya está listo y formateado para LinkedIn con hashtags estratégicos.</p>
                  </div>
                  <i class="fas fa-check-circle text-emerald-500 text-xl ml-auto mt-0.5"></i>
               </div>
               
               <div class="flex items-start gap-5 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                  <div class="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center text-white font-black text-sm flex-shrink-0">2</div>
                  <div class="flex-1">
                     <p class="font-black text-slate-800 text-sm">Abrir tu página de empresa en LinkedIn</p>
                     <p class="text-slate-500 text-xs font-medium mt-1">Haz clic en "Crear una publicación", pega con <kbd class="bg-slate-100 px-2 py-0.5 rounded font-bold text-xs">Ctrl+V</kbd> y publica.</p>
                  </div>
               </div>

               <!-- Preview del texto -->
               <div class="bg-slate-50 rounded-2xl border border-slate-200 p-6 max-h-40 overflow-y-auto scrollbar-hide">
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Vista previa del post</p>
                  <pre class="text-xs text-slate-600 whitespace-pre-wrap font-sans leading-relaxed">${text.substring(0, 300)}...</pre>
               </div>

               ${imageUrl ? `
               <div class="mt-6 p-6 bg-slate-900 rounded-3xl border border-white/10 shadow-xl flex items-center gap-6 animate-pop-in">
                  <div class="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-700 flex-shrink-0 shadow-inner">
                     <img src="${imageUrl}" class="w-full h-full object-cover">
                  </div>
                  <div class="flex-grow">
                     <p class="text-white font-black text-sm uppercase tracking-wider mb-1">Imagen Lista</p>
                     <p class="text-slate-400 text-[10px] font-bold leading-relaxed">LinkedIn requiere subir la imagen manualmente. Haz clic abajo para guardarla.</p>
                  </div>
                  <a href="${imageUrl}" target="_blank" download="zolla-ia-visual.jpg" 
                     class="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3">
                     <i class="fas fa-download"></i>
                  </a>
               </div>
               ` : ''}
            </div>

            <!-- Actions -->
            <div class="px-10 py-6 border-t border-slate-100 flex gap-4 bg-slate-50">
               <button onclick="document.getElementById('li-publish-modal').remove()" 
                       class="px-6 py-3 rounded-xl text-xs font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 transition-all">
                  Cancelar
               </button>
               <button onclick="window.open('${window.LinkedInPublisher.COMPANY_PAGE_URL}', '_blank'); document.getElementById('li-publish-modal').remove();" 
                       class="flex-1 bg-[#0A66C2] hover:bg-[#004182] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30">
                  <i class="fab fa-linkedin-in text-base"></i>
                  Ir a LinkedIn → Pegar y Publicar
               </button>
            </div>
         </div>`;

      document.body.appendChild(modal);
   }
};

