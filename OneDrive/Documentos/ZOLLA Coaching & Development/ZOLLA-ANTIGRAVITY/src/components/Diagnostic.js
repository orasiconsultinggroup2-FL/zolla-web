window.Diagnostic = {
    state: {
        step: 0,
        responses: [],
        questions: [
            { q: '¿Cuál es el mayor reto actual de tu equipo?', a: ['Comunicación bajo presión', 'Resistencia al cambio', 'Conflictos en negociaciones'], profiles: ['A', 'B', 'C'] },
            { q: '¿Cómo calificarías el clima organizacional?', a: ['Incierto / Crisis', 'En transformación', 'Tradicional / Estático'], profiles: ['A', 'B', 'C'] },
            { q: '¿Cuál es el perfil de liderazgo predominante?', a: ['Estratégico', 'Operativo', 'Relacional'], profiles: ['A', 'B', 'C'] },
            { q: '¿Qué tan frecuente es el feedback directo?', a: ['Raro', 'Semanal', 'Diario'], profiles: ['B', 'A', 'A'] },
            { q: '¿Cómo se manejan las crisis de reputación?', a: ['Reactivamente', 'Protocolos claros', 'No tenemos protocolos'], profiles: ['A', 'A', 'B'] },
            { q: '¿Qué tan alineados están los objetivos?', a: ['Totalmente', 'Parcialmente', 'Cada quien por su lado'], profiles: ['B', 'B', 'C'] },
            { q: '¿Cuál es el nivel de digitalización?', a: ['Alto', 'Medio', 'Bajo'], profiles: ['B', 'B', 'A'] },
            { q: '¿Qué buscas hoy para tu empresa?', a: ['Vocería experta', 'Gestión de cambio real', 'Cerrar mejores acuerdos'], profiles: ['A', 'B', 'C'] }
        ]
    },

    render: () => {
        const s = window.Diagnostic.state;
        if (s.step >= s.questions.length) return window.Diagnostic.renderResult();

        const q = s.questions[s.step];

        return `
        <div class="h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
            
            <div class="w-full max-w-xl relative z-10 space-y-8 animate-fade-in">
                <div class="text-center space-y-4">
                    <span class="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em]">Diagnóstico de Liderazgo v1.0</span>
                    <h2 class="text-3xl font-black tracking-tighter leading-tight">${q.q}</h2>
                    <div class="flex justify-center gap-1">
                        ${s.questions.map((_, i) => `<div class="h-1 w-8 rounded-full ${i <= s.step ? 'bg-emerald-500' : 'bg-white/10'} transition-all"></div>`).join('')}
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-4">
                    ${q.a.map((opt, idx) => `
                    <button onclick="window.Diagnostic.answer(${idx})" 
                            class="p-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:bg-emerald-500 hover:border-emerald-400 transition-all group group relative overflow-hidden">
                        <span class="text-xs font-bold relative z-10">${opt}</span>
                        <div class="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </button>
                    `).join('')}
                </div>
                
                <p class="text-center text-white/30 text-[9px] font-bold uppercase tracking-widest pt-8">Tu respuesta es 100% confidencial</p>
            </div>
            
            <div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
                <p class="text-[10px] text-white/20 font-black tracking-widest uppercase italic">Powered by ZOLLA Antigravity</p>
            </div>
        </div>
        `;
    },

    answer: (idx) => {
        const q = window.Diagnostic.state.questions[window.Diagnostic.state.step];
        window.Diagnostic.state.responses.push(q.profiles[idx]);
        window.Diagnostic.state.step++;
        window.Diagnostic.refresh();
    },

    renderResult: () => {
        // Calculate predominant profile
        const counts = { A: 0, B: 0, C: 0 };
        window.Diagnostic.state.responses.forEach(r => counts[r]++);
        const resultProfile = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        
        const profilesData = {
            A: { t: 'Perfil Comunicación & Vocería', d: 'Tu organización necesita fortalecer su escudo reputacional y la claridad de sus mensajes directivos.' },
            B: { t: 'Perfil Gestión de Cambio', d: 'Tu foco debe estar en la alineación de equipos y la adaptación a nuevos ecosistemas digitales.' },
            C: { t: 'Perfil Negociación de Valor', d: 'El éxito de tu empresa depende hoy de cerrar acuerdos estratégicos multiactor con mayor firmeza.' }
        };

        const res = profilesData[resultProfile];

        return `
        <div class="h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
            <div class="w-full max-w-xl relative z-10 space-y-12 animate-pop-in text-center">
                <div class="w-24 h-24 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-2xl shadow-emerald-500/20">
                    <i class="fas fa-award"></i>
                </div>
                
                <div class="space-y-4">
                    <span class="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em]">Resultado del Diagnóstico</span>
                    <h2 class="text-4xl font-black tracking-tighter leading-tight">${res.t}</h2>
                    <p class="text-slate-400 text-sm leading-relaxed">${res.d}</p>
                </div>

                <div class="space-y-6 pt-6">
                    <p class="text-[10px] text-white/30 font-bold uppercase tracking-widest">Para recibir tu reporte detallado:</p>
                    <div class="space-y-4">
                        <input type="text" id="diag-name" placeholder="Tu Nombre Completo" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all font-bold text-sm">
                        <input type="email" id="diag-email" placeholder="Correo Corporativo" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all font-bold text-sm">
                    </div>
                    <button onclick="window.Diagnostic.finish('${resultProfile}')" class="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-500/20 hover:scale-105 transition-all">Generar mi Hoja de Ruta</button>
                </div>
            </div>
        </div>
        `;
    },

    finish: (profile) => {
        const name = document.getElementById('diag-name').value;
        const email = document.getElementById('diag-email').value;
        
        if (!name || !email) return window.showNotification("Faltan datos", "Necesitamos tu contacto para enviarte el reporte.", "warning");

        // FEED THE PIPELINE AUTOMATICALLY
        if (window.ZollaStore) {
            const newLead = {
                name: `Lead: ${name.split(' ')[0]} (Diagnosis)`,
                contact: name,
                email: email,
                segment: 'A',
                serviceProfile: profile,
                status: 'contactado',
                desc: `Interés en: ${profile}. Diagnóstico completado.`
            };
            window.ZollaStore.addClient(newLead);
            window.ZollaStore.moveToPipeline(newLead.id || 'c' + Date.now()); // Re-use the addClient logic
        }

        alert("¡Diagnóstico completado! Un consultor senior de ZOLLA te contactará en breve con tu reporte detallado.");
        window.location.href = '#'; // Or a thank you page
    },

    refresh: () => {
        const main = document.getElementById('main-content');
        if (main) main.innerHTML = window.Diagnostic.render();
    },

    init: () => {}
};
