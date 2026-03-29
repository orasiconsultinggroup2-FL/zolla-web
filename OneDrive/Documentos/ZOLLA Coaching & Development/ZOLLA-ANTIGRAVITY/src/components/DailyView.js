window.DailyView = {
    render: () => {
        const pipeline = window.ZollaStore.state.pipeline || [];
        const tasks = window.ZollaStore.state.tasks || [];
        const today = new Date();
        
        // 1. Leads that need contact (>7 days without contact or no contact)
        const leadsNeedContact = pipeline.filter(l => {
            if (!l.lastContact) return true;
            const diffDays = Math.floor((today - new Date(l.lastContact)) / (1000 * 60 * 60 * 24));
            return diffDays >= 7;
        }).slice(0, 3);

        // 2. Proposals that have been waiting for >3 days without response
        const proposalWaiting = pipeline.filter(l => {
            if (l.status !== 'propuesta') return false;
            if (!l.lastContact) return true;
            const diffDays = Math.floor((today - new Date(l.lastContact)) / (1000 * 60 * 60 * 24));
            return diffDays >= 3;
        }).slice(0, 2);

        // 3. Articles planned for today or this week
        const currentMonth = window.ZollaStore.state.month;
        const currentWeek = window.ZollaStore.state.week === 'todas' ? '1' : window.ZollaStore.state.week;
        const articles = (window.Cronograma2026 || []).filter(a => 
            a.date.toLowerCase().includes(currentMonth) && (a.week === currentWeek || !a.week)
        ).slice(0, 1);

        return `
        <div class="animate-fade-in space-y-12 pb-32 w-full max-w-4xl mx-auto">
            <div class="text-center space-y-2 border-b border-slate-200 pb-10">
                <h2 class="text-4xl font-black text-slate-800 tracking-tighter">Modo Ejecución Diaria</h2>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Resumen de 30 segundos: ${today.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- LEADS A CONTACTAR -->
                <div class="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
                    <div class="flex items-center gap-4 border-b border-slate-50 pb-4">
                        <div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-lg">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">Leads Necesitan Contacto</h3>
                    </div>
                    <div class="space-y-4">
                        ${leadsNeedContact.length === 0 ? '<p class="text-xs text-slate-400 italic">Todo al día. No hay leads urgentes.</p>' : 
                            leadsNeedContact.map(l => `
                            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-black text-slate-800">${l.name}</p>
                                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">${l.contact}</p>
                                </div>
                                <button onclick="navigateTo('emails'); window.Emails.state.selectedClient='${l.id}'; window.Emails.refresh();" class="w-8 h-8 bg-white text-emerald-500 rounded-lg shadow-sm flex items-center justify-center border border-slate-100"><i class="fas fa-paper-plane"></i></button>
                            </div>
                            `).join('')}
                    </div>
                </div>

                <!-- PROPUESTAS EN ESPERA -->
                <div class="bg-white p-8 rounded-[2.5rem] border border-rose-100 shadow-xl shadow-rose-500/5 space-y-6">
                    <div class="flex items-center gap-4 border-b border-slate-50 pb-4">
                        <div class="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-lg">
                            <i class="fas fa-clock"></i>
                        </div>
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">Propuestas sin Respuesta</h3>
                    </div>
                    <div class="space-y-4">
                        ${proposalWaiting.length === 0 ? '<p class="text-xs text-slate-400 italic">No hay propuestas retrasadas.</p>' : 
                            proposalWaiting.map(l => `
                            <div class="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-black text-slate-800">${l.name}</p>
                                    <p class="text-[10px] text-rose-500 font-bold uppercase tracking-widest">Enviada hace ${Math.floor((today - new Date(l.lastContact)) / (1000 * 60 * 60 * 24))} días</p>
                                </div>
                                <button onclick="navigateTo('emails'); window.Emails.state.selectedClient='${l.id}'; window.Emails.refresh();" class="w-8 h-8 bg-white text-rose-500 rounded-lg shadow-sm flex items-center justify-center border border-rose-100"><i class="fas fa-redo"></i></button>
                            </div>
                            `).join('')}
                    </div>
                </div>

                <!-- CONTENIDO PARA HOY -->
                <div class="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl space-y-6 col-span-1 md:col-span-2 relative overflow-hidden">
                    <div class="flex items-center gap-4 border-b border-white/5 pb-4 relative z-10">
                        <div class="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-lg">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <h3 class="text-sm font-black text-white uppercase tracking-widest">Artículo para ejecutar hoy</h3>
                    </div>
                    ${articles.length === 0 ? '<p class="text-xs text-slate-500 italic relative z-10">Sin publicaciones programadas para hoy.</p>' : 
                        articles.map(a => `
                        <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                            <div class="flex-1 space-y-4">
                                <span class="bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded border border-emerald-500/20">${a.theme}</span>
                                <h4 class="text-2xl font-black text-white leading-tight">${a.title}</h4>
                                <p class="text-slate-400 text-sm line-clamp-2">${a.content.substring(0, 200)}...</p>
                                <button onclick="navigateTo('cronograma')" class="bg-white text-slate-900 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Ver y Publicar</button>
                            </div>
                            <div class="w-full md:w-64 h-40 bg-slate-800 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <img src="${a.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400'}" class="w-full h-full object-cover grayscale opacity-50">
                            </div>
                        </div>
                        `).join('')}
                    
                    <i class="fas fa-rocket absolute -bottom-10 -right-10 text-[10rem] text-white/5 -rotate-12"></i>
                </div>
            </div>

            <div class="flex justify-center pt-10">
                <button onclick="navigateTo('dashboard')" class="text-slate-400 hover:text-slate-800 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-all">
                    Finalizar Revisión Rápida <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        `;
    },
    init: () => {}
};
