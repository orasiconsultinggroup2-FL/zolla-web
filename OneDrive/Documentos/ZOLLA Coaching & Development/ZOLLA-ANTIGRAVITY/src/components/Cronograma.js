window.Cronograma = {
   state: {
      activeArticleIndex: null,
      previewMode: 'linkedin',
      isEditing: false, 
      articleImages: {}, // { [articleIndex]: base64string }
   },

   generateSlug: (title) => {
      return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, '');
   },

   getSummaryForLinkedIn: (art) => {
      const paragraphs = art.content.split(/\n\n+/).filter(p => p.trim().length > 0);
      const maxParas = Math.min(paragraphs.length, 3);
      const summary = paragraphs.slice(0, maxParas).join('\n\n');
      const link = `\n\n🔗 *Sigue leyendo el artículo completo en nuestro blog:*\nhttps://zolla.com.pe/blog/${window.Cronograma.generateSlug(art.title)}`;
      return summary + link;
   },

   uploadImage: (idx) => {
      const input = document.getElementById('img-upload-input');
      if (!input) return;
      input.setAttribute('data-idx', idx);
      input.click();
   },

   handleImageUpload: (input) => {
      const idx = parseInt(input.getAttribute('data-idx'));
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
         window.Cronograma.state.articleImages[idx] = e.target.result;
         window.Cronograma.refresh();
      };
      reader.readAsDataURL(file);
      input.value = '';
   },

   removeImage: (idx, e) => {
      e.stopPropagation();
      delete window.Cronograma.state.articleImages[idx];
      window.Cronograma.refresh();
   },

   publishWeb: async (idx) => {
      const art = window.Cronograma2026[idx];
      if (!art) return;

      const confirmPublish = window.confirm("¿Publicar este artículo directamente en la Web de ZOLLA (zolla.com.pe)?");
      if (!confirmPublish) return;

      window.showNotification("Sincronizando...", "Enviando artículo al servidor...", "info");

      // Limpiamos el contenido usando la función global para evitar duplicidad de títulos/subtítulos
      const cleanContent = window.cleanTextForPublishing(art.content, art.theme, art.title, art.subtitle);
      
      try {
         const blogPost = {
            title: art.title,
            excerpt: art.subtitle || (cleanContent.substring(0, 150) + '...'),
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            category: art.theme,
            image: window.Cronograma.state.articleImages[idx] || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800',
            content: cleanContent
         };

         const response = await fetch('https://www.zolla.com.pe/api/sync-blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blogPost)
         });

         if (response.ok) {
            window.showNotification("Publicación Exitosa", "El artículo ya está disponible en la web.", "success");
         } else {
            throw new Error("Error en servidor");
         }
      } catch (err) {
         console.error(err);
         window.showNotification("Error", "No se pudo conectar con el servidor de la Web.", "error");
      }
   },

   render: () => {
      // Cargar ediciones de localStorage si existen una sola vez
      if (!window.Cronograma._editsLoaded) {
          const stored = localStorage.getItem('zolla_cronograma_edits');
          if (stored) {
              try {
                  const parsed = JSON.parse(stored);
                  if (Array.isArray(parsed) && parsed.length > 0) {
                      window.Cronograma2026 = parsed;
                  }
              } catch(e) { console.error("Error loading cronograma edits", e); }
          }
          window.Cronograma._editsLoaded = true;
      }

      const articles = window.Cronograma2026 || [];
      const s = window.Cronograma.state;
      const imgSrc = s.activeArticleIndex !== null ? (s.articleImages[s.activeArticleIndex] || null) : null;

      const imgInputHTML = `<input id="img-upload-input" type="file" accept="image/*" class="hidden" onchange="window.Cronograma.handleImageUpload(this)">`;

      // Image zone for Blog view
      const blogImageZone = imgSrc
         ? `<div class="relative w-full h-48 mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm" style="position:relative" onmouseenter="this.querySelector('.img-overlay').style.opacity=1" onmouseleave="this.querySelector('.img-overlay').style.opacity=0">
               <img src="${imgSrc}" class="w-full h-full object-cover" />
               <div class="img-overlay" style="position:absolute;inset:0;background:rgba(0,0,0,0.45);opacity:0;transition:opacity .2s;display:flex;align-items:center;justify-content:center;gap:12px">
                  <button onclick="window.Cronograma.uploadImage(${s.activeArticleIndex})" style="background:#fff;color:#1e293b;border-radius:8px;padding:8px 16px;font-size:10px;font-weight:900;letter-spacing:.1em;border:none;cursor:pointer">&#8635; Cambiar</button>
                  <button onclick="window.Cronograma.removeImage(${s.activeArticleIndex}, event)" style="background:#ef4444;color:#fff;border-radius:8px;padding:8px 16px;font-size:10px;font-weight:900;letter-spacing:.1em;border:none;cursor:pointer">&#128465; Quitar</button>
               </div>
            </div>`
         : `<div onclick="window.Cronograma.uploadImage(${s.activeArticleIndex})" style="cursor:pointer;width:100%;height:192px;background:#f8fafc;border:2px dashed #cbd5e1;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:32px;transition:all .2s" onmouseenter="this.style.background='#ecfdf5';this.style.borderColor='#34d399'" onmouseleave="this.style.background='#f8fafc';this.style.borderColor='#cbd5e1'">
               <i class="fas fa-cloud-upload-alt" style="font-size:2.5rem;color:#94a3b8;margin-bottom:12px"></i>
               <p style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.15em;color:#94a3b8">Haz clic para subir la foto del artículo</p>
               <p style="font-size:9px;color:#cbd5e1;margin-top:4px">JPG, PNG, WEBP</p>
            </div>`;

      // Image zone for LinkedIn view
      const liImageZone = imgSrc
         ? `<div style="position:relative;width:100%;height:192px;overflow:hidden;border-top:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9" onmouseenter="this.querySelector('.li-btn').style.opacity=1" onmouseleave="this.querySelector('.li-btn').style.opacity=0">
               <img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover" />
               <button class="li-btn" onclick="window.Cronograma.uploadImage(${s.activeArticleIndex})" style="opacity:0;position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,0.6);color:#fff;border:none;font-size:9px;font-weight:900;padding:6px 12px;border-radius:6px;cursor:pointer;transition:opacity .2s;letter-spacing:.08em">&#8635; Cambiar</button>
            </div>`
         : `<div onclick="window.Cronograma.uploadImage(${s.activeArticleIndex})" style="cursor:pointer;width:100%;height:192px;background:#f8fafc;display:flex;flex-direction:column;align-items:center;justify-content:center;border-top:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9;transition:all .2s" onmouseenter="this.style.background='#ecfdf5'" onmouseleave="this.style.background='#f8fafc'">
               <i class="fas fa-cloud-upload-alt" style="font-size:2rem;color:#94a3b8;margin-bottom:8px"></i>
               <p style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#94a3b8">Subir foto para LinkedIn</p>
            </div>`;

      return `
      ${imgInputHTML}
      <div class="animate-fade-in space-y-12 pb-32 w-full text-slate-900">
         <div class="flex items-center justify-between border-b border-slate-200 pb-12 mb-12">
            <div>
               <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-3">Planificación y Estrategia</p>
               <h2 class="text-5xl font-black text-slate-900 tracking-tighter flex items-center gap-6">
                  Cronograma 2026 <span class="bg-emerald-600 text-white text-[10px] px-4 py-1.5 rounded-full border border-emerald-700 uppercase tracking-widest shadow-lg shadow-emerald-500/20">Activo</span>
               </h2>
               <p class="text-slate-500 text-base mt-4 font-medium max-w-2xl leading-relaxed italic">"Despliegue estratégico de 13 tácticas. Visualiza y copia cada artículo en formato web o en formato viral para LinkedIn."</p>
            </div>
            <div class="flex gap-4">
               <div class="bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl flex flex-col items-center justify-center">
                  <span class="text-xs font-black uppercase tracking-widest text-slate-400">Total</span>
                  <span class="text-3xl font-black text-slate-800">${articles.length}</span>
               </div>
            </div>
         </div>

         <div class="grid grid-cols-12 gap-8">
            <!-- LISTA DE ARTÍCULOS -->
            <div class="col-span-12 xl:col-span-5 space-y-4 max-h-[750px] overflow-y-auto pr-2 scrollbar-hide">
               ${articles.map((art, idx) => {
                  const isActive = s.activeArticleIndex === idx;
                  const hasImg = !!s.articleImages[idx];
                  const d = new Date(art.date + 'T12:00:00Z');
                  const dayStr = d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' });

                  return `
                  <div onclick="window.Cronograma.openPreview(${idx})" class="${isActive ? 'border-emerald-500 bg-emerald-50/50 shadow-lg' : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'} border rounded-3xl p-6 transition-all cursor-pointer group flex items-start gap-5">
                     <div class="flex-shrink-0 w-14 h-14 rounded-2xl flex flex-col items-center justify-center ${isActive ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-50 text-slate-500'} transition-colors">
                        <span class="text-lg font-black leading-none">${d.getDate()}</span>
                        <span class="text-[8px] font-black uppercase tracking-widest mt-1">${d.toLocaleDateString('es-ES', {month:'short'})}</span>
                     </div>
                     <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-2">
                           <span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${isActive ? 'bg-white text-emerald-700' : 'bg-slate-100 text-slate-500'}">${art.theme}</span>
                           <span class="text-[9px] font-black text-slate-400 uppercase italic">${dayStr}</span>
                           ${hasImg ? `<span class="text-emerald-500 text-[10px]" title="Foto cargada"><i class="fas fa-image"></i></span>` : ''}
                        </div>
                        <h3 class="text-sm font-black text-slate-800 leading-tight mb-2">${art.title}</h3>
                        <p class="text-[10px] text-slate-500 line-clamp-2 italic">${art.content.substring(0,100)}...</p>
                     </div>
                  </div>
                  `;
               }).join('')}
            </div>

            <!-- PREVIEW AREA -->
            <div class="col-span-12 xl:col-span-7">
               ${s.activeArticleIndex !== null ? `
                  <div class="bg-white rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden h-[750px] flex flex-col">
                     <div class="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div>
                           <h4 class="font-black text-lg text-slate-900 tracking-tight">${articles[s.activeArticleIndex].title}</h4>
                           <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Programa: ${articles[s.activeArticleIndex].date}</p>
                        </div>

                        <div class="flex bg-slate-100 rounded-lg p-1 shadow-inner h-10 flex-shrink-0">
                           <button onclick="window.Cronograma.setPreviewMode('blog')" class="px-6 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${s.previewMode === 'blog' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}">
                              <i class="fas fa-globe mr-2"></i>Web / Blog
                           </button>
                           <button onclick="window.Cronograma.setPreviewMode('linkedin')" class="px-6 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${s.previewMode === 'linkedin' ? 'bg-[#0A66C2] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}">
                              <i class="fab fa-linkedin mr-2"></i>LinkedIn
                           </button>
                        </div>
                     </div>

                     <div class="flex-grow p-10 overflow-y-auto bg-slate-50 relative">
                        ${s.previewMode === 'blog' ? `
                           <!-- VERSIÓN BLOG -->
                           <div class="max-w-xl mx-auto space-y-8">
                              <div class="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 text-slate-800 relative group">
                                 <button onclick="window.Cronograma.copyData('blog')" class="absolute top-6 right-6 w-10 h-10 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 text-slate-400 rounded-xl flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm" title="Copiar al portapapeles">
                                    <i class="far fa-copy text-lg"></i>
                                 </button>
                                 <h1 id="edit-title" class="text-2xl font-black mb-8 leading-tight text-center ${s.isEditing ? 'bg-slate-50 p-4 border border-emerald-500/30 rounded-xl outline-none' : ''}" ${s.isEditing ? 'contenteditable="true"' : ''}>${articles[s.activeArticleIndex].title}</h1>

                                 ${blogImageZone}

                                 ${articles[s.activeArticleIndex].subtitle ? `
                                    <div class="mb-8 p-6 bg-slate-50 border-l-4 border-[#ff4e42] rounded-r-xl">
                                       <h3 class="text-[10px] font-black text-[#ff4e42] uppercase tracking-[0.2em] mb-2">SUBTÍTULO / GANCHO (Copiar al Excerpt)</h3>
                                       <p id="edit-subtitle" class="text-[15px] font-medium text-slate-700 italic ${s.isEditing ? 'outline-none border-b border-emerald-500/30 pb-2' : ''}" ${s.isEditing ? 'contenteditable="true"' : ''}>${articles[s.activeArticleIndex].subtitle}</p>
                                    </div>
                                 ` : ''}

                                 <div id="edit-content" class="font-sans text-[14px] leading-relaxed whitespace-pre-wrap ${s.isEditing ? 'bg-slate-50 p-6 border border-emerald-500/30 rounded-2xl outline-none' : ''}" ${s.isEditing ? 'contenteditable="true"' : ''}>${articles[s.activeArticleIndex].content}</div>
                              </div>

                              <!-- AUDIENCIA POTENCIAL (MATCH ARTÍCULO-LEAD) -->
                              <div class="bg-emerald-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                                 <div class="relative z-10">
                                    <div class="flex items-center gap-4 mb-6">
                                       <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center"><i class="fas fa-users"></i></div>
                                       <h4 class="text-xs font-black uppercase tracking-widest">Leads interesados en este Eje</h4>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                       ${(() => {
                                          const theme = articles[s.activeArticleIndex].theme;
                                          const matchingLeads = (window.ZollaStore.state.pipeline || []).filter(l => 
                                             l.serviceProfile === theme || l.desc?.includes(theme)
                                          ).slice(0, 4);
                                          
                                          return matchingLeads.length > 0 ? matchingLeads.map(l => `
                                             <div class="bg-white/10 border border-white/10 p-4 rounded-2xl flex items-center justify-between hover:bg-white/20 transition-all">
                                                <span class="text-xs font-bold">${l.name}</span>
                                                <button onclick="navigateTo('emails'); window.Emails.state.selectedClient='${l.id}'; window.Emails.refresh();" class="text-[10px] font-black uppercase bg-emerald-500 px-3 py-1.5 rounded-lg shadow-lg">Contactar</button>
                                             </div>
                                          `).join('') : '<p class="text-[10px] text-emerald-300 font-bold uppercase italic tracking-widest">No hay leads específicos para este tema aún.</p>';
                                       })()}
                                    </div>
                                 </div>
                                 <i class="fas fa-bullseye absolute -right-4 -bottom-4 text-7xl text-white/5"></i>
                              </div>
                           </div>
                        ` : `
                           <!-- VERSIÓN LINKEDIN (Motor Viral) -->
                           <div class="w-full max-w-[450px] mx-auto bg-white rounded-lg shadow-md border border-slate-200 font-sans relative group">
                              <button onclick="window.Cronograma.copyData('linkedin')" class="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md" title="Copiar para LinkedIn">
                                 <i class="far fa-copy text-lg"></i>
                              </button>
                              <div class="flex items-center gap-3 p-4 border-b border-slate-50">
                                 <div class="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-emerald-400 font-black text-xl shadow-inner">Z</div>
                                 <div>
                                    <h4 class="font-bold text-[13px] text-slate-900 leading-tight">ZOLLA Coaching &amp; Development</h4>
                                    <p class="text-[11px] text-slate-500 leading-tight">Estrategia Directiva | Meta-Management</p>
                                    <p class="text-[10px] text-slate-400 leading-tight mt-0.5">Programa: ${articles[s.activeArticleIndex].date} • 🌎</p>
                                 </div>
                              </div>
                              <div class="px-4 pb-4 pt-2 text-[13px] text-slate-800 whitespace-pre-wrap leading-relaxed">${window.LinkedInPublisher.formatForLinkedIn(articles[s.activeArticleIndex].title, (articles[s.activeArticleIndex].subtitle ? articles[s.activeArticleIndex].subtitle + '\n\n' : '') + window.Cronograma.getSummaryForLinkedIn(articles[s.activeArticleIndex]), articles[s.activeArticleIndex].theme)}</div>
                              ${liImageZone}
                              <div class="p-3 bg-slate-50 flex justify-between px-6 text-slate-500 text-xs font-bold">
                                 <div class="flex items-center gap-2"><i class="far fa-thumbs-up text-lg"></i> Recomendar</div>
                                 <div class="flex items-center gap-2"><i class="far fa-comment text-lg"></i> Comentar</div>
                                 <div class="flex items-center gap-2"><i class="fas fa-share text-lg"></i> Compartir</div>
                              </div>
                           </div>
                        `}
                     </div>

                     <!-- ACTION PANEL -->
                     <div class="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-6">
                        ${s.isEditing ? `
                           <button onclick="window.Cronograma.saveChanges(${s.activeArticleIndex})" class="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-3 border border-emerald-400">
                              <i class="fas fa-save text-base"></i> GUARDAR CAMBIOS
                           </button>
                           <button onclick="window.Cronograma.toggleEdit(false)" class="bg-slate-200 text-slate-700 px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-300 transition-all">
                              CANCELAR
                           </button>
                        ` : `
                           <button onclick="window.Cronograma.publishWeb(${s.activeArticleIndex})" class="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-3 border border-emerald-400">
                              <i class="fas fa-globe text-base"></i> PUBLICAR EN WEB
                           </button>
                           <button onclick="window.Cronograma.toggleEdit(true)" class="bg-white text-slate-700 border border-slate-200 px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm">
                              <i class="fas fa-edit text-base"></i> EDITAR
                           </button>
                        `}
                     </div>
                  </div>
               ` : `
                  <div class="bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 h-[750px] flex flex-col items-center justify-center text-center p-10">
                     <i class="fas fa-calendar-check text-slate-300 text-7xl mb-6"></i>
                     <h3 class="text-2xl font-black text-slate-400">Selecciona un Artículo</h3>
                     <p class="text-sm font-bold text-slate-400 mt-2">Revisa el contenido, aplica el formato necesario y cópialo para iniciar la publicación.</p>
                  </div>
               `}
            </div>
         </div>
      </div>
      `;
   },

   openPreview: (index) => {
      window.Cronograma.state.activeArticleIndex = index;
      window.Cronograma.refresh();
   },

   setPreviewMode: (mode) => {
      window.Cronograma.state.previewMode = mode;
      window.Cronograma.refresh();
   },

   toggleEdit: (val) => {
      window.Cronograma.state.isEditing = val;
      window.Cronograma.refresh();
   },

   saveChanges: (idx) => {
      const art = window.Cronograma2026[idx];
      if (!art) return;

      const newTitle = document.getElementById('edit-title')?.innerText || art.title;
      const newSubtitle = document.getElementById('edit-subtitle')?.innerText || art.subtitle;
      const newContent = document.getElementById('edit-content')?.innerText || art.content;

      art.title = newTitle;
      art.subtitle = newSubtitle;
      art.content = newContent;

      // Persistir si el store está disponible
      if (window.ZollaStore && window.ZollaStore.save) {
         // Guardamos una copia en localStorage bajo una clave especial si el store no tiene cronograma
         localStorage.setItem('zolla_cronograma_edits', JSON.stringify(window.Cronograma2026));
      }

      window.Cronograma.state.isEditing = false;
      window.Cronograma.refresh();
      window.showNotification("Cambios Guardados", "El artículo ha sido actualizado localmente.", "success");
   },

   copyData: (mode) => {
      const idx = window.Cronograma.state.activeArticleIndex;
      if (idx === null) return;
      const art = window.Cronograma2026[idx];

      let textToCopy = '';
      if (mode === 'blog') {
         // Fix: No incluimos el título en el copiado para el blog si se va a pegar en un CMS que ya tiene el título aparte
         // Pero incluimos el subtitulo para que sea facil de pegar
         textToCopy = (art.subtitle ? art.subtitle + '\n\n' : '') + art.content;
      } else {
         textToCopy = window.LinkedInPublisher.formatForLinkedIn(art.title, (art.subtitle ? art.subtitle + '\n\n' : '') + window.Cronograma.getSummaryForLinkedIn(art), art.theme);
      }

      navigator.clipboard.writeText(textToCopy).then(() => {
         if(window.showNotification) {
            window.showNotification('Copiado', 'El contenido está en el portapapeles listo para pegar.', 'success');
         }
      }).catch(err => {
         console.error('Error al copiar: ', err);
      });
   },

   refresh: () => {
      const main = document.getElementById('main-content');
      if (main && window.currentView === 'cronograma') {
         main.innerHTML = window.Cronograma.render();
      }
   },

   init: () => {
      if (window.Cronograma.state.activeArticleIndex === null && window.Cronograma2026 && window.Cronograma2026.length > 0) {
         window.Cronograma.state.activeArticleIndex = 0;
         window.Cronograma.refresh();
      }
   }
};
