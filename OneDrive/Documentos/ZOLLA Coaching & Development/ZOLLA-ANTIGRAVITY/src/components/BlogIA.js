window.LinkedInPublisher = {
   lastCommentBuffer: "",

    formatForLinkedIn: (title, text, category) => {
       const hashtagMap = {
          'Vocería Corporativa bajo Presión': '#Vocería #Crisis #Liderazgo #ZOLLA',
          'Gestión del cambio': '#CambioOrganizacional #Liderazgo #ZOLLA',
          'Formación de Liderazgo': '#Coaching #LiderazgoEfectivo #ZOLLA',
          'Asuntos públicos': '#RelacionesInstitucionales #ZOLLA',
          'Manejo de crisis reputacional': '#Reputación #Comunicación #ZOLLA',
          'Negociaciones multiactor': '#Negociación #Estrategia #ZOLLA',
          'Liderazgo en Entornos de Alta Exigencia': '#AltoRendimiento #Liderazgo #ZOLLA',
          'Negociación Estratégica en Tiempos de Crisis': '#NegociaciónEstratégica #Crisis #ZOLLA',
          'Editorial Propio': '#Estrategia #BusinessIntelligence #ZOLLA'
       };

       // --- PASO 0: Limpiar título (jamás "ARTÍCULO XX") ---
       // Extraer el verdadero título del contenido si el nombre del ítem es "ARTÍCULO XX"
       let cleanTitle = (title || '')
          .replace(/^art[ií]culo\s*\d*/gi, '')
          .replace(/^post\s*\d*/gi, '')
          .replace(/[:#*]+/g, '')
          .trim();
       // Si quedó vacío, buscar primera línea real del contenido
       if (!cleanTitle) {
          const firstLine = text.replace(/<[^>]*>/g, '').split('\n').map(l => l.trim()).find(l => l.length > 5 && l.length < 120);
          cleanTitle = firstLine || category; // Assuming 'category' can act as a fallback theme
       }

       const normalizedCat = Object.keys(hashtagMap).find(k => k.toLowerCase() === (category || '').toLowerCase()) || category;
       const hashtags = hashtagMap[normalizedCat] || '#Estrategia #Liderazgo #ZOLLA';
       
       // --- PASO 1: Limpiar HTML ---
       let cleanText = text
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<\/p>/gi, '\n\n')
          .replace(/<\/li>/gi, '\n')
          .replace(/<[^>]*>/gm, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/\n{3,}/g, '\n\n')
          .trim();

       // --- PASO 2: Motor de Estructura Inteligente ---
       // Divide el texto en bloques separados por líneas en blanco
       const blocks = cleanText.split(/\n\n+/);
       const emojis = ['🚀', '🎯', '✅', '💡', '🔥', '📈', '👔', '🔑', '🏆', '📌'];
       let emojiIndex = 0;
       const nextEmoji = () => emojis[emojiIndex++ % emojis.length];

       const transformedBlocks = blocks.map(block => {
          const rawLines = block.split('\n').map(l => l.trim()).filter(Boolean);
          if (rawLines.length === 0) return null;

          // Caso: una sola línea corta → puede ser un título de sección
          if (rawLines.length === 1) {
             const l = rawLines[0];
             // Si es una pregunta → resaltarla
             if (l.includes('?') && l.length < 150) return `❓ ${l}`;
             // Si es una línea de lista ("-", "*", "n.") → emoji
             if (l.match(/^[-*]\s/) || l.match(/^\d+\.\s/)) {
                const content = l.replace(/^[-*\d.]+\s*/, '');
                return `${nextEmoji()} ${content}`;
             }
             // Si es un par clave-valor tipo "X: Y" → emoji
             if (l.includes(':') && l.indexOf(':') < 30 && l.length < 150) {
                return `${nextEmoji()} ${l}`;
             }
             return l; // Línea simple → dejar tal cual
          }

          // Caso: múltiples líneas en el mismo bloque
          // → la primera línea es el ENCABEZADO, las siguientes son el CUERPO
          const heading = rawLines[0];
          const bodyLines = rawLines.slice(1);

          // Si el cuerpo son listas/frases cortas → numerarlas con emojis
          const isStructuredList = bodyLines.every(l => l.length < 200);
          if (isStructuredList && bodyLines.length >= 2) {
             const numberedBody = bodyLines.map((l, i) => {
                const content = l.replace(/^[-*\d.]+\s*/, '');
                return `${i + 1}️⃣ ${content}`;
             }).join('\n');
             return `📌 ${heading}\n\n${numberedBody}`;
          }

          // Si el cuerpo es un párrafo largo → dejarlo con el heading en negrita (estilo LinkedIn)
          return `💡 ${heading}\n\n${bodyLines.join(' ')}`;
       }).filter(Boolean);

       // --- PASO 3: Ensamblar el post final ---
       const headline = cleanTitle ? `🎯 ${cleanTitle.toUpperCase()}\n\n` : '';
       const intro = `¿Por qué muchas organizaciones fallan en ${(normalizedCat || category).toLowerCase()} cuando más importa?\n\nLa respuesta está en la estrategia, no en la improvisación. 👇\n\n`;
       const body = transformedBlocks.join('\n\n');
       const suffix = `\n\n---\n💡 ¿Cómo maneja tu equipo este desafío? Te leo en comentarios.\n\n${hashtags} #ZOLLACoaching #Estrategia #Management`;

       let finalResult = `${headline}${intro}${body}${suffix}`;

       const MAX_BODY = 2800;
       window.LinkedInPublisher.lastCommentBuffer = '';
       if (finalResult.length > MAX_BODY) {
           const cutPoint = finalResult.lastIndexOf('\n', MAX_BODY - 100);
           const main = finalResult.substring(0, cutPoint) + '\n\n(Continúa en el primer comentario ↓)';
           window.LinkedInPublisher.lastCommentBuffer = finalResult.substring(cutPoint).trim();
           return main;
       }

       return finalResult;
    },

   publish: async (title, content, category, imageUrl = null) => {
      try {
         const formattedPost = window.LinkedInPublisher.formatForLinkedIn(title, content, category);

         // 1. Copiar al portapapeles
         await navigator.clipboard.writeText(formattedPost);

         // 2. Mostrar modal de instrucciones
         window.LinkedInPublisher.showPublishModal(formattedPost, imageUrl);

      } catch (err) {
         console.error('LinkedIn Publisher Error:', err);
         window.showNotification('Error', 'No se pudo copiar el contenido.', 'warning');
      }
   },

   showPublishModal: (text, imageUrl = null) => {
       const existing = document.getElementById('li-publish-modal');
       if (existing) existing.remove();

       const modal = document.createElement('div');
       modal.id = 'li-publish-modal';
       modal.className = 'fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[9000] flex items-center justify-center p-8 animate-fade-in';
       modal.innerHTML = `
          <div class="bg-white w-full max-w-2xl rounded-[3rem] shadow-3xl overflow-hidden border border-white/20 animate-pop-in flex flex-col">
             <div class="bg-[#0A66C2] px-10 py-10 flex items-center justify-between text-white">
                <div class="flex items-center gap-5">
                   <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/10">
                      <i class="fab fa-linkedin-in"></i>
                   </div>
                   <div>
                      <h3 class="text-2xl font-black tracking-tight">Publicar en LinkedIn</h3>
                      <p class="text-[10px] text-blue-100 font-bold uppercase tracking-widest mt-1 opacity-80">ZOLLA Coaching & Development</p>
                   </div>
                </div>
                <button onclick="document.getElementById('li-publish-modal').remove()" class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                   <i class="fas fa-times text-xl"></i>
                </button>
               <div class="px-10 py-10 space-y-6 bg-white flex-grow overflow-y-auto max-h-[75vh]">
                <!-- PASO 1 -->
                <div class="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-6">
                   <div class="w-12 h-12 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center font-black">1</div>
                   <div class="flex-grow">
                      <h4 class="text-slate-900 font-black text-xs uppercase tracking-widest italic">Paso 1: El Texto</h4>
                      <p class="text-slate-500 text-[11px] font-medium leading-tight">El texto ya se copió. Solo tendrás que darle <b>Pegar (Ctrl+V)</b>.</p>
                   </div>
                   <div class="text-emerald-500 text-xl"><i class="fas fa-check-circle"></i></div>
                </div>

                <!-- PASO 2: IMAGEN -->
                ${imageUrl ? `
                <div class="p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-200 flex flex-col items-center gap-6 shadow-xl shadow-emerald-500/10">
                   <div class="flex items-center gap-4 w-full">
                      <div class="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black shadow-lg">2</div>
                      <h4 class="text-emerald-900 font-black text-xs uppercase tracking-widest italic">Paso 2: La Foto</h4>
                   </div>
                   
                   <div class="w-40 h-40 rounded-3xl overflow-hidden border-4 border-white shadow-2xl rotate-2 hover:rotate-0 transition-transform">
                      <img src="${imageUrl}" class="w-full h-full object-cover">
                   </div>

                   <div class="text-center space-y-4 w-full">
                      <p class="text-emerald-800 text-xs font-bold leading-tight uppercase italic px-4">LinkedIn no permite subir fotos automáticamente.</p>
                      <button onclick="window.LinkedInPublisher.downloadImage('${imageUrl}')" 
                              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 border border-emerald-400">
                         <i class="fas fa-download text-lg"></i> PRIMERO: DESCARGAR FOTO A MI PC
                      </button>
                      <div class="p-4 bg-white/50 rounded-xl border border-emerald-100 flex items-center gap-3">
                         <i class="fas fa-info-circle text-emerald-500"></i>
                         <p class="text-emerald-700 text-[10px] font-bold italic leading-tight text-left">Luego, cuando estés en LinkedIn, arrastras la foto descargada al post.</p>
                      </div>
                   </div>
                </div>
                ` : ''}

                <!-- PASO EXTRA: COMENTARIOS -->
                ${window.LinkedInPublisher.lastCommentBuffer ? `
                <div class="p-6 bg-amber-50 rounded-3xl border border-amber-200 flex items-center gap-6">
                   <div class="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl shadow-lg rotate-12"><i class="fas fa-comment-dots"></i></div>
                   <div class="flex-grow">
                      <h4 class="text-amber-900 font-black text-xs uppercase tracking-widest italic">Extra: Comentarios</h4>
                      <p class="text-amber-700 text-[10px] font-medium leading-tight mb-3">Tu artículo es largo. Copia el final abajo.</p>
                      <button onclick="navigator.clipboard.writeText(window.LinkedInPublisher.lastCommentBuffer); this.innerHTML='<i class=\'fas fa-check mr-2\'></i> COPIADO PARA COMENTARIO'; this.classList.remove('bg-amber-600'); this.classList.add('bg-emerald-600');" 
                              class="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2">
                         <i class="fas fa-copy"></i> COPIAR RESTO
                      </button>
                   </div>
                </div>
                ` : ''}

                <!-- PASO FINAL -->
                <div class="pt-6">
                   <div class="flex items-center gap-4 mb-4">
                      <div class="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-black">3</div>
                      <h4 class="text-slate-900 font-black text-xs uppercase tracking-widest italic">Paso Final: Publicar</h4>
                   </div>
                   <button onclick="window.LinkedInPublisher.openFullPage();" class="bg-[#0A66C2] hover:bg-[#004182] text-white px-10 py-7 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.4em] shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all w-full flex items-center justify-center gap-4 border border-blue-400">
                      <i class="fab fa-linkedin text-2xl"></i> IR A LINKEDIN AHORA
                   </button>
                </div>
             </div>iv>
             </div>
          </div>`;

       document.body.appendChild(modal);
   },

   openFullPage: () => {
       window.open('https://www.linkedin.com/company/zolla-coaching-development/posts/?feedView=all', '_blank');
   },

   downloadImage: (url) => {
       const link = document.createElement('a');
       link.href = url;
       link.download = `zolla-linkedin-${Date.now()}.jpg`;
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
       window.showNotification('Éxito', 'Imagen descargada. Recuerda arrastrarla al post.', 'success');
   }
};

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
               <div class="premium-card p-10 bg-slate-900 text-white relative h-fit">
                  <h3 class="font-black text-xs uppercase tracking-[0.3em] text-emerald-400 mb-8 flex items-center justify-between">
                     Estrategia IA <span class="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-[8px] border border-emerald-500/30">Activa</span>
                  </h3>
                  <div class="space-y-6">
                     <div class="flex items-center gap-5">
                        <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 text-xl"><i class="fas fa-search"></i></div>
                        <div>
                           <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest">Enfoque Actual</p>
                           <p class="text-xs font-bold text-white">${s.category}</p>
                        </div>
                     </div>
                     <div class="flex items-center gap-5">
                        <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 text-xl"><i class="fas fa-chart-line"></i></div>
                        <div>
                           <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest">SEO Score Estimado</p>
                           <p class="text-xs font-bold text-white">${s.seoScore}% Narrativa Directiva</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div class="premium-card p-10 bg-white h-fit">
                  <h3 class="font-black text-xs uppercase tracking-[0.3em] text-slate-400 mb-8">Últimos Despliegues</h3>
                  <div class="space-y-6">
                     ${posts.length === 0 ? '<p class="text-[10px] font-bold text-slate-400 italic">No hay publicaciones recientes.</p>' : posts.map(p => `
                        <div class="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 cursor-default">
                           <div class="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200"><img src="${p.image}" class="w-full h-full object-cover grayscale"></div>
                           <div class="flex-grow min-w-0">
                              <h4 class="text-[11px] font-black text-slate-800 truncate tracking-tight uppercase">${p.title}</h4>
                              <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">${p.theme}</p>
                           </div>
                        </div>
                     `).join('')}
                  </div>
               </div>
            </div>
         </div>
      </div>`;
   },

   renderStep1: () => {
      const s = window.BlogIA.state;
      return `
      <div class="max-w-2xl mx-auto w-full animate-slide-up">
         <div class="text-center mb-16">
            <span class="bg-emerald-50 text-emerald-600 text-[10px] px-6 py-2 rounded-full border border-emerald-100 uppercase tracking-[0.4em] font-black mb-6 inline-block">Paso 01 · Conceptualización</span>
            <h3 class="text-5xl font-black text-slate-900 tracking-tighter mb-4 italic">¿Qué vamos a desplegar hoy?</h3>
            <p class="text-slate-500 font-medium text-lg leading-relaxed italic">Selecciona el eje estratégico para inicializar el motor narrativo de ZOLLA.</p>
         </div>
         
         <div class="grid grid-cols-2 gap-6">
            ${window.BlogIA.categories.map(cat => `
               <button onclick="window.BlogIA.selectCategory('${cat}')" 
                       class="p-8 rounded-[2rem] border-2 transition-all text-left group overflow-hidden relative shadow-sm hover:shadow-xl
                       ${s.category === cat ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 hover:border-emerald-500 text-slate-600'}">
                  <div class="relative z-10 flex flex-col h-full justify-between">
                     <i class="fas fa-layer-group text-3xl mb-12 ${s.category === cat ? 'text-emerald-400' : 'text-slate-200 group-hover:text-emerald-500'} transition-colors"></i>
                     <h4 class="text-sm font-black uppercase tracking-tight leading-tight">${cat}</h4>
                  </div>
                  <div class="absolute -right-4 -bottom-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                     <i class="fas fa-circle-nodes text-[120px]"></i>
                  </div>
               </button>
            `).join('')}
         </div>
         
         <div class="mt-16 flex justify-center">
            <button onclick="window.BlogIA.generateTitles()" 
                    class="bg-emerald-600 text-white px-20 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-emerald-500/40 hover:scale-[1.05] active:scale-95 transition-all w-full md:w-auto border border-emerald-400 border-opacity-30">
               Inicializar Motor IA <i class="fas fa-arrow-right ml-4"></i>
            </button>
         </div>
      </div>`;
   },

   renderStep2: () => {
      const s = window.BlogIA.state;
      return `
      <div class="max-w-3xl mx-auto w-full animate-slide-up">
         <div class="text-center mb-16">
            <span class="bg-emerald-50 text-emerald-600 text-[10px] px-6 py-2 rounded-full border border-emerald-100 uppercase tracking-[0.4em] font-black mb-6 inline-block">Paso 02 · Títulos de Alto Impacto</span>
            <h3 class="text-5xl font-black text-slate-900 tracking-tighter mb-4 italic">Elige tu Gancho Estratégico</h3>
            <p class="text-slate-500 font-medium text-lg italic uppercase tracking-widest text-[11px]">Enfoque: <span class="text-slate-900 font-black">${s.category}</span></p>
         </div>

         <div class="space-y-4 mb-16">
            ${s.suggestedTitles.map((title, i) => `
               <button onclick="window.BlogIA.selectTitle('${title.replace(/'/g, "\\'")}')" 
                       class="w-full p-8 rounded-[2rem] border-2 transition-all text-left flex items-center justify-between group shadow-sm hover:shadow-lg
                       ${s.selectedTitle === title ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 hover:border-emerald-500 text-slate-700'}">
                  <div class="flex items-center gap-8 min-w-0">
                     <span class="text-xl font-black text-emerald-500 italic opacity-50">0${i+1}</span>
                     <h4 class="text-xl font-black tracking-tight leading-tight truncate-2 italic">${title}</h4>
                  </div>
                  <i class="fas fa-check-circle text-2xl ${s.selectedTitle === title ? 'text-emerald-400' : 'text-slate-100 group-hover:text-emerald-50 transition-colors'}"></i>
               </button>
            `).join('')}
         </div>

         <div class="flex gap-4">
            <button onclick="window.BlogIA.state.step = 1; window.BlogIA.refresh()" class="bg-white text-slate-400 px-10 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest border border-slate-200">Atrás</button>
            <button onclick="window.BlogIA.generateContent()" 
                    class="flex-grow bg-emerald-600 text-white px-10 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4">
               Generar Narrativa Completa <i class="fas fa-bolt"></i>
            </button>
         </div>
      </div>`;
   },

   renderStep3: () => {
      const s = window.BlogIA.state;
      return `
      <div class="w-full flex flex-col h-full animate-fade-in text-slate-900">
         <div class="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
            <div class="flex items-center gap-6">
               <div class="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                  <i class="fas fa-pen-fancy text-3xl"></i>
               </div>
               <div>
                  <h3 class="text-3xl font-black text-slate-900 tracking-tighter italic">Narrativa Generada</h3>
                  <p class="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Estrategia ZOLLA Pro • SEO Optimized</p>
               </div>
            </div>
            <div class="flex bg-slate-100 p-2 rounded-2xl border border-slate-200">
               <button onclick="window.BlogIA.changeImage()" class="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-600 text-[10px] font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
                  <i class="fas fa-sync-alt text-emerald-500"></i> Alternar Asset Visual
               </button>
            </div>
         </div>

         <div class="flex-grow grid grid-cols-12 gap-10 overflow-hidden">
            <div class="col-span-12 xl:col-span-12 flex flex-col overflow-hidden">
               <div class="flex-grow bg-slate-50/50 rounded-[3rem] p-12 border border-slate-100 shadow-inner relative overflow-y-auto custom-scrollbar">
                  <div class="max-w-2xl mx-auto space-y-10">
                     <div class="w-full h-[500px] rounded-[3rem] overflow-hidden shadow-3xl mb-16 border-8 border-white group relative">
                        <img src="${s.selectedImage}" id="gen-image" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                        <div class="absolute inset-0 bg-emerald-600/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     </div>
                     <h1 id="gen-title" contenteditable="true" class="text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-4 italic outline-none focus:text-emerald-700 transition-colors uppercase">${s.selectedTitle}</h1>
                     <div id="gen-body" contenteditable="true" class="prose prose-2xl prose-slate max-w-none text-slate-700 font-sans leading-relaxed outline-none focus:bg-white p-4 rounded-3xl transition-all">${s.generatedContent}</div>
                     
                     <div class="py-20 border-t border-slate-200 mt-20 text-center">
                        <div class="w-24 h-24 bg-slate-900 rounded-full mx-auto mb-8 flex items-center justify-center text-emerald-400 font-serif text-3xl italic shadow-2xl">Z</div>
                        <p class="text-slate-400 text-[12px] font-black uppercase tracking-[0.5em] mb-4 italic">ZOLLA Strategy Core</p>
                        <p class="text-slate-300 text-[10px] font-medium italic">© 2026 ZOLLA Coaching & Development • Todos los derechos reservados.</p>
                     </div>
                  </div>
               </div>
               
               <div class="mt-8 p-10 bg-slate-900 rounded-[3rem] flex items-center justify-between shadow-2xl border border-white/5 gap-8">
                  <div class="flex items-center gap-4 text-emerald-400">
                     <i class="fas fa-shield-halved text-2xl opacity-50"></i>
                     <p class="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Previsualización del Despliegue Automatizado</p>
                  </div>
                  <div class="flex gap-6">
                     <button onclick="window.BlogIA.publish('linkedin')" class="bg-[#0A66C2] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 border border-blue-400 border-opacity-30">
                        <i class="fab fa-linkedin-in text-lg"></i> Desplegar en LinkedIn
                     </button>
                     <button onclick="window.BlogIA.publish('web')" class="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 border border-emerald-400 border-opacity-30">
                        <i class="fas fa-globe text-lg"></i> Publicar en Web de ZOLLA
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>`;
   },

   selectCategory: (cat) => {
      window.BlogIA.state.category = cat;
      window.BlogIA.refresh();
   },

   generateTitles: () => {
      const themes = {
         'Vocería Corporativa bajo Presión': [
            'Dominio ante la Prensa: Manual de Crisis Directiva',
            'La Anatomía del Perdón Corporativo: Por qué pedir disculpas no es debilidad',
            'Vocerías bajo Fuego: 5 Errores fatales en conferencias de crisis'
         ],
         'Gestión del cambio': [
            'Resiliencia Organizacional: Reconstruindo la cultura post-fusión',
            'El Factor Humano en la Transformación: Más allá del ERP',
            'Cambio sin Caos: Cómo liderar equipos en entornos VUCA'
         ],
         'Formación de Liderazgo': [
            'Liderazgo 2026: De Jefes de Equipo a Arquitectos Estratégicos',
            'Conversaciones Cruciales: El arte de dar feeback de alto valor',
            'Mentoring Ejecutivo: Cómo acelerar el talento crítico en 90 días'
         ],
         'Asuntos públicos': [
            'Incidencia Corporativa: Construyendo puentes con el sector público',
            'Diplomacia Institucional: El valor del diálogo multiactor',
            'Gestión de Intereses: Transparencia y valor compartido'
         ],
         'Manejo de crisis reputacional': [
            'Escudos Digitales: Cómo proteger la marca en la era del algoritmo',
            'La Verdad como Estrategia: Gestión de rumores y fake news',
            'Reputación Institucional: Construyendo activos de confianza'
         ],
         'Negociaciones multiactor': [
            'Acuerdos de Alto Impacto: El Método Harvard en contextos de crisis',
            'Stakeholder Management: Alianzas que sostienen el negocio',
            'Mediación Estratégica: Transformando conflictos en oportunidades'
         ],
         'Liderazgo en Entornos de Alta Exigencia': [
            'Liderazgo al Límite: Toma de decisiones en escenarios críticos',
            'Equipos de Alto Rendimiento: Manteniendo la tracción bajo presión',
            'Cultura de Excelencia: Sistemas de gestión de alto valor'
         ],
         'Negociación Estratégica en Tiempos de Crisis': [
            'Poder de Negociación: Cómo ganar cuando crees que vas perdiendo',
            'Contratos en Tiempos de Inflación: Renegociación de alto valor',
            'Estrategias de Compromiso: Cerrando tratos que perduren'
         ]
      };

      window.BlogIA.state.suggestedTitles = themes[window.BlogIA.state.category] || [
         'Visión Estratégica: El Futuro del Management',
         'Innovación Operativa para la Alta Dirección',
         'Resultados de Alto Impacto en su Organización'
      ];
      window.BlogIA.state.step = 2;
      window.BlogIA.state.selectedTitle = window.BlogIA.state.suggestedTitles[0];
      window.BlogIA.refresh();
   },

   selectTitle: (title) => {
      window.BlogIA.state.selectedTitle = title;
      window.BlogIA.refresh();
   },

   generateContent: () => {
      const category = window.BlogIA.state.category;
      const title = window.BlogIA.state.selectedTitle;
      
      let baseText = "";
      if (window.ArticleBank[category]) {
         const article = window.ArticleBank[category].find(a => a.title === title);
         baseText = article ? article.content : `
            <p>Abordar el desafío de <strong>${category}</strong> requiere un cambio de paradigma profundo desde la máxima dirección. En ZOLLA Coaching & Development diseñamos este enfoque alineando capacidades críticas con la estrategia del negocio.</p>
            <p>La clave reside en la anticipación y en la estructura de respuesta rápida que su organización pueda desplegar frente a la incertidumbre. Este contenido ha sido generado bajo los estándares de mentoría de Juan Ramon Zolla.</p>
         `;
      } else {
         baseText = `
            <p>Abordar el desafío de <strong>${category}</strong> requiere un cambio de paradigma profundo desde la máxima dirección. En ZOLLA Coaching & Development diseñamos este enfoque alineando capacidades críticas con la estrategia del negocio.</p>
            <p>La clave reside en la anticipación y en la estructura de respuesta rápida que su organización pueda desplegar frente a la incertidumbre. Este contenido ha sido generado bajo los estándares de mentoría de Juan Ramon Zolla.</p>
         `;
      }
      
      window.BlogIA.state.generatedContent = baseText;
      window.BlogIA.state.step = 3;
      window.BlogIA.refresh();
      window.showNotification("Narrativa Generada", "Motor IA ha completado el artículo.", "success");
   },

   changeImage: () => {
      window.ZollaImageHelper.showSelector(window.BlogIA.state.category, (img) => {
         window.BlogIA.state.selectedImage = img;
         window.BlogIA.refresh();
      });
   },

   publish: async (platform) => {
      const title = document.getElementById('gen-title').innerText;
      const content = document.getElementById('gen-body').innerHTML;
      const category = window.BlogIA.state.category;
      const image = window.BlogIA.state.selectedImage;

      if (platform === 'linkedin') {
         window.LinkedInPublisher.publish(title, content, category, image);
      } else if (platform === 'web') {
         window.showNotification("Sincronizando...", "Enviando artículo a zolla.com.pe...", "info");
         
         const fullClean = window.cleanTextForPublishing(content, category, title);
         const paragraphs = fullClean.split(/\n\n+/);
         const excerptStr = paragraphs[0];
         
         // Limpiamos el cuerpo final pasando también el extracto para que lo quite si está repetido
         const actualBody = window.cleanTextForPublishing(paragraphs.slice(1).join('\n\n'), category, title, excerptStr);

         const blogPost = {
            title: title || category,
            excerpt: excerptStr.substring(0, 300),
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            category: category,
            image: image,
            slug: (title || category).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^\w-]/g, ''),
            content: actualBody || excerptStr
         };

         try {
            const response = await fetch('https://www.zolla.com.pe/api/sync-blog', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(blogPost)
            });

            if (response.ok) {
               window.ZollaStore.addPost({
                   theme: category,
                   title: title,
                   content: content,
                   image: image,
                   published: true,
                   platform: 'web'
               });
               window.showNotification("Publicación Exitosa", `Artículo desplegado con éxito.`, "success");
               navigateTo('contenido');
            } else {
               throw new Error("Respuesta no OK");
            }
         } catch (err) {
            window.showNotification("Error", "Fallo al conectar con el servidor Web.", "error");
         }
      }
   },

   reset: () => {
      window.BlogIA.state.step = 1;
      window.BlogIA.state.generatedContent = '';
      window.BlogIA.state.selectedTitle = '';
      window.BlogIA.refresh();
   },

   refresh: () => {
      const main = document.getElementById('main-content');
      if (main) main.innerHTML = window.BlogIA.render();
   }
};
