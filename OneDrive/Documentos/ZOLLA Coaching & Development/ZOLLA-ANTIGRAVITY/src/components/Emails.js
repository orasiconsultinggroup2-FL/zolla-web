window.Emails = {
   state: {
      selectedTemplate: null,
      selectedClient: '',
      draftContent: '',
      mode: 'email', 
      sender: 'juanramon@zolla.com.pe', 
      templates: [
         { 
            id: 1, 
            name: 'Envío de Propuesta', 
            category: 'Propuesta', 
            color: '#8b5cf6', 
            icon: 'fa-file-invoice-dollar', 
            subject: 'Propuesta comercial - {{empresa}}', 
            body: 'Estimado(a) {nombre},\n\nUn gusto saludarle.\n\nTal como conversamos en nuestra última reunión, adjunto la propuesta comercial para su evaluación.\n\nQuedo atento a cualquier comentario o ajuste que considere necesario para avanzar con los siguientes pasos.\n\nSaludos cordiales,\n\nJuan Ramón\nZOLLA Coaching & Development',
            linkedinBody: 'Hola {nombre},\n\nTal como acordamos, te envío la propuesta comercial para tu revisión.\n\nQuedo atento a tus comentarios para avanzar.\n\nSaludos,'
         },
         { 
            id: 2, 
            name: 'Seguimiento', 
            category: 'Seguimiento', 
            color: '#3b82f6', 
            icon: 'fa-calendar-check', 
            subject: 'Seguimiento a la propuesta - {{empresa}}', 
            body: 'Estimado(a) {nombre},\n\nEspero que se encuentre bien.\n\nSolo quería confirmar si recibió la propuesta que le envié recientemente y si tuvo oportunidad de revisarla con su equipo.\n\nQuedo atento a cualquier comentario.\n\nSaludos cordiales,\n\nJuan Ramón\nZOLLA Coaching & Development',
            linkedinBody: 'Hola {nombre}, Solo quería confirmar que recibiste la propuesta y saber si tuviste oportunidad de revisarla.\n\nQuedo atento.'
         },
         { 
            id: 3, 
            name: 'Reactivación', 
            category: 'Reactivación', 
            color: '#f97316', 
            icon: 'fa-envelope-open-text', 
            subject: 'Retomando contacto - {{empresa}}', 
            body: 'Hola {nombre} , gusto de saludarte. Espero que estés bien.\n\nHe pensado en ti y en tu organización porque lo que viene ocurriendo en los mercados globales —desde la crisis del petróleo hasta la presión cambiaria local— ya se está sintiendo en las empresas peruanas. Y precisamente para afrontar esos desafíos con equipos bien preparados es que hemos rediseñado nuestra propuesta de valor que me gustaría conozcas.\n\n¿Podríamos tener una conversación telefónica para conversar al respecto?\nSi te parece, coordinamos una llamada de 10 minutos\nQuedo atento a respuesta\n\nQue tengas un excelente día\n\nAD. Brochure',
            linkedinBody: 'Hola {nombre} , gusto de saludarte. Espero que estés bien.\n\nHe pensado en ti y en tu organización porque lo que viene ocurriendo en los mercados globales —desde la crisis del petróleo hasta la presión cambiaria local— ya se está sintiendo en las empresas peruanas. Y precisamente para afrontar esos desafíos con equipos bien preparados es que hemos rediseñado nuestra propuesta de valor que me gustaría conozcas.\n\n¿Podríamos tener una conversación telefónica para conversar al respecto?\nSi te parece, coordinamos una llamada de 10 minutos\nQuedo atento a respuesta\n\nQue tengas un excelente día\n\nAD. Brochure'
         },
         { 
            id: 4, 
            name: 'Presentación Zolla', 
            category: 'Presentacion', 
            color: '#10b981', 
            icon: 'fa-lightbulb', 
            subject: 'Presentación de Servicios: {{empresa}}', 
            body: 'Hola {nombre}, espero que estés muy bien.\nDesde ZOLLA Coaching & Development venimos trabajando con organizaciones que buscan preparar mejor a sus líderes ante la incertidumbre generada por los movimientos globales recientes. Hemos desarrollado soluciones estratégicas que están ayudando a elevar la productividad ejecutiva y consolidar culturas de alto rendimiento.\nMe gustaría presentarte estos enfoques y explorar si alguno podría aportar valor a tu organización.\nSi lo considera pertinente, con gusto coordinamos un momento para conversar o puedo enviarle más información.\nQuedo atento.',
            linkedinBody: 'Hola {nombre}, un gusto saludarte.\nEn ZOLLA Coaching & Development estamos trabajando con equipos ejecutivos que buscan responder mejor a los desafíos actuales del entorno global. Hemos desarrollado enfoques estratégicos que están generando mejoras concretas en productividad y desempeño.\nCreo que podría ser valioso comentarte algunos de estos aprendizajes.\nSi te parece, podemos agendar una breve conversación esta semana y ver si hay oportunidades de aportar valor.\nSaludos'
         }
      ]
   },

   render: () => {
      const clients = window.ZollaStore.state.clients || [];
      const templates = window.Emails.state.templates;
      const mode = window.Emails.state.mode;

      return `
      <div class="animate-fade-in space-y-12 pb-32 w-full">
        <!-- Header con Identidad Juan Ramón -->
        <div class="flex items-center justify-between border-b border-slate-200 pb-10 mb-12">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 bg-[#002f5a] text-white rounded-[1.5rem] flex items-center justify-center text-2xl shadow-xl shadow-slate-200">
               <i class="fas fa-shield-alt"></i>
            </div>
            <div>
              <div class="flex items-center gap-3 text-slate-400 mb-1">
                 <i class="fas fa-globe text-[8px]"></i>
                 <span class="text-[9px] font-black uppercase tracking-[0.2em]">Detectado: Entorno IONOS Webmail</span>
              </div>
              <h2 class="text-3xl font-black text-slate-800 flex items-center gap-3">
                 ${window.Emails.state.sender}
              </h2>
              <p class="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">Evitando cuenta predeterminada de Outlook</p>
            </div>
          </div>
          <button onclick="navigateTo('dashboard')" class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">Cerrar</button>
        </div>

        <div class="grid grid-cols-12 gap-12">
          <!-- Templates Column -->
          <div class="col-span-4 space-y-6">
             <h3 class="font-bold text-slate-700 text-[12px] flex items-center gap-3 mb-6 uppercase tracking-[0.2em]">
                Plantillas para Zolla
             </h3>
             <div class="space-y-4">
                ${templates.map(t => `
                   <div onclick="window.Emails.selectTemplate(${t.id})" 
                        class="bg-white p-5 rounded-3xl cursor-pointer group hover:shadow-2xl hover:-translate-y-1 transition-all border-2 border-transparent flex items-center gap-5 shadow-sm overflow-hidden relative">
                      <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-all z-10" style="background-color: ${t.color}">
                         <i class="fas ${t.icon}"></i>
                      </div>
                      <div class="z-10">
                         <h4 class="text-sm font-bold text-slate-700 leading-tight">${t.name}</h4>
                         <p class="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">${t.category}</p>
                      </div>
                   </div>
                `).join('')}
             </div>
          </div>

          <!-- Composer Column -->
          <div class="col-span-8">
             <div class="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 relative h-full flex flex-col">
                <div class="flex items-center justify-between mb-10">
                   <h3 class="text-lg font-black text-slate-800 uppercase tracking-tight">Redacción Profesional</h3>
                </div>
                
                <div class="space-y-8 relative z-10 flex-1 flex flex-col">
                   <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                         <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3 px-1">Elegir Destinatario</label>
                         <select onchange="window.Emails.handleClientSelection(this.value)" id="email-client-select" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 font-bold text-sm text-slate-700 appearance-none cursor-pointer transition-all">
                            <option value="">-- Buscar en BBDD --</option>
                             ${clients.map(c => `<option value="${c.id}">${c.name || 'Empresa'} — ${c.contact || 'S/N'}</option>`).join('')}
                         </select>
                      </div>
                      <div>
                         <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3 px-1">Email Manual</label>
                         <input type="text" id="email-manual" oninput="window.Emails.updateDraft()" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 font-bold text-sm text-slate-800 transition-all placeholder:text-slate-300" placeholder="ejemplo@correo.com">
                      </div>
                   </div>

                   <div>
                      <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3 px-1">Asunto Oficial</label>
                      <input type="text" id="email-subject" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 font-bold text-sm text-slate-800 transition-all placeholder:text-slate-300" placeholder="Asunto del correo">
                   </div>

                   <div class="flex-1 flex flex-col min-h-[300px]">
                      <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1 px-1">Cuerpo del Mensaje</label>
                      <textarea id="email-body" class="w-full bg-slate-50 border border-slate-200 rounded-3xl p-8 outline-none focus:border-blue-500 font-serif text-lg leading-relaxed text-slate-700 resize-none flex-1 placeholder:text-slate-300" placeholder="Redacta aquí..."></textarea>
                   </div>

                   <!-- BOTONES OPTIMIZADOS PARA IONOS -->
                   <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-6">
                      <button onclick="window.Emails.sendIonosWeb()" class="bg-[#002f5a] text-white px-4 py-6 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-900 transition-all flex flex-col items-center justify-center gap-1 group">
                         <span class="flex items-center gap-2 italic uppercase">1. ABRIR IONOS WEBMAIL <i class="fas fa-external-link-alt text-[8px]"></i></span>
                         <span class="text-[8px] opacity-70">Usa tu cuenta de zolla.com.pe directamente</span>
                      </button>
                      <button onclick="window.Emails.copyAndNotify()" class="bg-indigo-600 text-white px-4 py-6 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex flex-col items-center justify-center gap-1">
                         <span class="flex items-center gap-2 italic uppercase">2. COPIAR Y YA <i class="fas fa-copy text-[8px]"></i></span>
                         <span class="text-[8px] opacity-70">Copia el texto para pegarlo donde quieras</span>
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      `;
   },

   selectTemplate: (id) => {
      const template = window.Emails.state.templates.find(t => t.id === id);
      if (!template) return;
      window.Emails.state.selectedTemplate = template;
      window.Emails.updateDraft();
   },

   handleClientSelection: (clientId) => {
      const emailManualEl = document.getElementById('email-manual');
      if (clientId) {
         const client = (window.ZollaStore.state.clients || []).find(c => c.id == clientId);
         if (client && emailManualEl) emailManualEl.value = client.email || '';
      }
      window.Emails.updateDraft();
   },

   updateDraft: () => {
      const clientSelectEl = document.getElementById('email-client-select');
      const subjectEl = document.getElementById('email-subject');
      const bodyEl = document.getElementById('email-body');
      const template = window.Emails.state.selectedTemplate;

      if (!template) return;

      let subj = template.subject || '';
      let body = template.body;

      const clientId = clientSelectEl?.value;
      if (clientId) {
         const client = (window.ZollaStore.state.clients || []).find(c => c.id == clientId);
         if (client) {
            subj = subj.replace(/{{empresa}}|{empresa}/g, client.name || '');
            body = body.replace(/{{contacto}}|{nombre}/g, client.contact || '').replace(/{{empresa}}|{empresa}/g, client.name || '');
         }
      }

      if (subjectEl) subjectEl.value = subj;
      if (bodyEl) bodyEl.value = body;
   },

    sendIonosWeb: () => {
      const clientId = document.getElementById('email-client-select')?.value;
      const subj = document.getElementById('email-subject')?.value?.trim();
      const body = document.getElementById('email-body')?.value?.trim();
      const templateName = window.Emails.state.selectedTemplate?.name || 'Manual';

      if (!subj || !body) return window.showNotification("Datos faltantes", "Completa el asunto y el mensaje.", "warning");

      // Register interaction in Pipeline if a client was selected
      if (clientId && window.ZollaStore) {
         window.ZollaStore.registerInteraction(clientId, 'email', `Plantilla: ${templateName}`);
      }

      // Copiamos el cuerpo automáticamente para que el usuario solo pegue en IONOS
      navigator.clipboard.writeText(body).then(() => {
         window.showNotification("Cuerpo Copiado", "Solo pégalo en el mensaje nuevo de IONOS.", "success");
         // Abrimos el dashboard pincipal de IONOS
         window.open('https://email.ionos.com/appsuite/', '_blank');
      });
    },

    copyAndNotify: () => {
      const clientId = document.getElementById('email-client-select')?.value;
      const body = document.getElementById('email-body')?.value?.trim();
      const templateName = window.Emails.state.selectedTemplate?.name || 'Manual';

      if (!body) return;
      
      // Register interaction in Pipeline if a client was selected
      if (clientId && window.ZollaStore) {
         window.ZollaStore.registerInteraction(clientId, 'email', `Copiado: ${templateName}`);
      }

      navigator.clipboard.writeText(body).then(() => {
         window.showNotification("Copiado", "Texto listo para pegar.", "success");
      });
    },

   init: () => { }
};
