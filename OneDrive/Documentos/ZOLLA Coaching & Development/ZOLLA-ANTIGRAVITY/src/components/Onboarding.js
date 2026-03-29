window.Onboarding = {
    state: { step: 0 },
    steps: [
        { t: 'Bienvenido al Control Room', d: 'Esta interfaz está diseñada para que gestiones tu consultoría como una plataforma SaaS de alto impacto.', i: 'fa-rocket' },
        { t: 'Pipeline Inteligente', d: 'Cada lead tiene una "temperatura". Si ves uno en azul (Frío), es momento de activar un recontacto.', i: 'fa-fire' },
        { t: 'Estrategia de Contenido', d: 'El cronograma 2026 ya está cargado. Solo elige un artículo, cópialo y publícalo en LinkedIn.', i: 'fa-calendar-alt' },
        { t: 'Modo Ejecución Diaria', d: 'Usa el botón "Hoy toca esto" cada mañana. Te dará los 3 pasos críticos del día en segundos.', i: 'fa-bolt' }
    ],

    show: () => {
        const modal = document.createElement('div');
        modal.id = 'onboarding-wizard';
        modal.className = 'fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[99999] flex items-center justify-center p-6';
        window.Onboarding.renderStep(modal);
        document.body.appendChild(modal);
    },

    renderStep: (container) => {
        const s = window.Onboarding.state;
        const step = window.Onboarding.steps[s.step];
        
        container.innerHTML = `
        <div class="bg-white w-full max-w-lg rounded-[3.5rem] p-12 text-center shadow-3xl animate-pop-in space-y-8">
            <div class="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center text-4xl border border-emerald-100 italic">
                <i class="fas ${step.i}"></i>
            </div>
            <div class="space-y-4">
                <h3 class="text-2xl font-black text-slate-900 tracking-tight italic uppercase">${step.t}</h3>
                <p class="text-slate-500 text-sm leading-relaxed font-medium">${step.d}</p>
            </div>
            <div class="flex flex-col gap-3">
                <button onclick="window.Onboarding.next()" class="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all">
                    ${s.step === window.Onboarding.steps.length - 1 ? 'Empezar ahora' : 'Siguiente Paso'}
                </button>
                <div class="flex justify-center gap-2">
                    ${window.Onboarding.steps.map((_, i) => `<div class="w-2 h-2 rounded-full ${i === s.step ? 'bg-emerald-500 w-6' : 'bg-slate-200'} transition-all"></div>`).join('')}
                </div>
            </div>
        </div>
        `;
    },

    next: () => {
        const s = window.Onboarding.state;
        if (s.step < window.Onboarding.steps.length - 1) {
            s.step++;
            window.Onboarding.renderStep(document.getElementById('onboarding-wizard'));
        } else {
            document.getElementById('onboarding-wizard').remove();
            localStorage.setItem('zolla_onboarding_done', 'true');
        }
    }
};
