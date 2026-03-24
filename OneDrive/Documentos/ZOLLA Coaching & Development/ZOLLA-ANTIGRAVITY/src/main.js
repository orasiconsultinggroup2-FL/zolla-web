window.currentMonth = localStorage.getItem('zolla_month') || 'marzo';

const components = {
    dashboard: window.Dashboard,
    objetivos: window.Dashboard, // Temporal, apunta a Dashboard
    pipeline: window.Pipeline,
    contenido: window.Contenido,
    tareas: window.Tareas,
    emails: window.Emails,
    kpis: window.KPIs,
    blogia: window.BlogIA,
    biblioteca: window.Biblioteca
};

window.currentView = 'dashboard';

window.cleanTextForPublishing = (text, theme) => {
    if (!text) return "";
    
    // 1. Quitar basura de Markdown y etiquetas sobrantes
    let clean = text.replace(/^#+\s+/gm, ''); // Quita headers markdown (## )
    clean = clean.replace(/\*\*(.*?)\*\*/g, '$1'); // Quita negritas markdown (**algo**)
    clean = clean.replace(/\*(.*?)\*/g, '$1'); // Quita cursivas markdown (*algo*)
    clean = clean.replace(/__(.*?)__/g, '$1'); // Quita subrayados
    clean = clean.replace(/---/g, ''); // Quita lineas divisorias

    // Eliminar etiquetas técnicas del AI si es que se cuelan
    clean = clean.replace(/Concepto:/gi, '');
    clean = clean.replace(/Título:/gi, '');
    clean = clean.replace(/TÍTULO:/gi, '');
    clean = clean.replace(/Contenido:/gi, '');

    clean = clean.trim();
    
    // 2. Agregar Hashtags ejecutivos basados en el 'theme' y generales de la empresa
    const hashtags = ['#EstrategiaCorporativa', '#AltoValor', '#LiderazgoZOLLA', '#Management'];
    if (theme) {
        let t = theme.replace(/[\s\-]/g, '');
        if (t.length > 3) hashtags.unshift('#' + t);
    }
    
    let finalTags = hashtags.join(' ');
    
    // Si el texto ya tiene hashtags de zolla al fondo, evitar duplicar, si no agregarlo.
    if (!clean.includes('#LiderazgoZOLLA')) {
        clean = clean + "\n\n" + finalTags;
    }
    
    return clean;
};

window.ZollaImageHelper = {
    keywords: {
        'Vocería Corporativa bajo Presión': ['press conference', 'microphone reporter', 'executive speaking', 'crisis management'],
        'Gestión del cambio': ['business transformation', 'team building', 'strategy meeting', 'innovation office'],
        'Formación de Liderazgo': ['mentor', 'leadership coaching', 'climbing mountain executive', 'business growth'],
        'Asuntos públicos': ['government building', 'diplomacy', 'institutional relations', 'monument boardroom'],
        'Manejo de crisis reputacional': ['shield', 'security', 'protection', 'reputation digital'],
        'Negociaciones multiactor': ['handshake', 'deal closing', 'international business', 'stakeholders meeting'],
        'Liderazgo en Entornos de Alta Exigencia': ['formula 1 pit stop', 'mountain peak', 'elite performance', 'executive pressure'],
        'Negociación Estratégica en Tiempos de Crisis': ['chess strategy', 'negotiation table', 'difficult agreement', 'professional conflict'],
        'General': ['modern office', 'skyline business', 'abstract corporate', 'premium workspace']
    },

    showSelector: (theme, onSelect) => {
        const keywords = window.ZollaImageHelper.keywords[theme] || window.ZollaImageHelper.keywords['General'];
        const images = keywords.map((k, i) => ({
            url: `https://images.unsplash.com/featured/?${encodeURIComponent(k)}&sig=${Math.random() + i}`,
            keyword: k
        }));

        // Añadir algunas imágenes directas de alta calidad del banco premium
        const premiumBank = [
           'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800',
           'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800',
           'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800',
           'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=800'
        ];
        
        premiumBank.forEach(url => images.push({ url, keyword: 'Premium Asset' }));

        const modal = document.createElement('div');
        modal.id = 'zolla-image-selector';
        modal.className = 'fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[9999] flex items-center justify-center p-8 animate-fade-in';
        modal.innerHTML = `
            <div class="bg-white w-full max-w-4xl rounded-[3rem] shadow-3xl overflow-hidden border border-white/20 animate-pop-in flex flex-col max-h-[90vh]">
                <div class="p-10 border-b border-slate-100 flex items-center justify-between">
                   <div class="flex items-center gap-5">
                      <div class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-emerald-500/20">
                         <i class="fas fa-wand-magic-sparkles"></i>
                      </div>
                      <div>
                         <h3 class="text-2xl font-black text-slate-900 tracking-tight">Sugerencias Meta-IA</h3>
                         <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Selecciona el Asset Visual para: ${theme}</p>
                      </div>
                   </div>
                   <button onclick="document.getElementById('zolla-image-selector').remove()" class="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all">
                      <i class="fas fa-times text-xl"></i>
                   </button>
                </div>
                
                <div class="p-10 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-6 scrollbar-hide">
                    ${images.map(img => `
                        <div onclick="window.ZollaImageHelper.select('${img.url}')" class="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-emerald-500 transition-all shadow-md">
                            <img src="${img.url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <span class="text-[8px] font-black text-white uppercase tracking-widest">${img.keyword}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="p-10 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                    <p class="text-[9px] text-slate-400 font-bold italic max-w-xs">Estas imágenes son sugerencias de alta fidelidad basadas en el núcleo semántico del artículo.</p>
                    <button onclick="document.getElementById('zolla-image-selector').remove()" class="bg-slate-900 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all">Cancelar</button>
                </div>
            </div>
        `;
        
        window._onImageSelect = onSelect;
        document.body.appendChild(modal);
    },

    select: (url) => {
        if (window._onImageSelect) window._onImageSelect(url);
        document.getElementById('zolla-image-selector').remove();
    }
};

window.ZollaLibraryHelper = {
    showSelector: (onSelect) => {
        const library = window.ZollaStore.state.library;
        
        if (!library || library.length === 0) {
            return window.showNotification("Biblioteca Vacía", "No hay artículos guardados para importar.", "warning");
        }

        const modal = document.createElement('div');
        modal.id = 'zolla-library-selector';
        modal.className = 'fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[9999] flex items-center justify-center p-8 animate-fade-in';
        modal.innerHTML = `
            <div class="bg-white w-full max-w-4xl rounded-[3rem] shadow-3xl overflow-hidden border border-white/20 animate-pop-in flex flex-col max-h-[90vh]">
                <div class="p-10 border-b border-slate-100 flex items-center justify-between bg-indigo-50/30">
                   <div class="flex items-center gap-5">
                      <div class="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-indigo-500/20">
                         <i class="fas fa-book-open"></i>
                      </div>
                      <div>
                         <h3 class="text-2xl font-black text-slate-900 tracking-tight">Importar desde Biblioteca</h3>
                         <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Selecciona un activo guardado para trabajarlo ahora</p>
                      </div>
                   </div>
                   <button onclick="document.getElementById('zolla-library-selector').remove()" class="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all">
                      <i class="fas fa-times text-xl"></i>
                   </button>
                </div>
                
                <div class="p-10 overflow-y-auto space-y-4 scrollbar-hide">
                    ${library.map(item => {
                        const date = new Date(item.added || item.id);
                        const dateStr = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
                        const previewStr = item.content.substring(0, 150).replace(/[#*]/g, '') + '...';
                        return `
                            <div onclick="window.ZollaLibraryHelper.select('${item.id}')" 
                                 class="p-6 rounded-2xl border border-slate-100 bg-white hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer group flex items-start gap-6 relative overflow-hidden">
                                <div class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner font-black text-xs flex-shrink-0">
                                   ${dateStr}
                                </div>
                                <div class="flex-grow">
                                   <div class="flex justify-between items-center mb-2">
                                      <span class="text-[8px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">${item.category || 'Recurso'}</span>
                                   </div>
                                   <p class="text-slate-600 text-[11px] leading-relaxed italic line-clamp-2">${previewStr}</p>
                                </div>
                                <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute right-6 top-1/2 -translate-y-1/2">
                                   <i class="fas fa-chevron-right text-indigo-400"></i>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="p-10 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                    <p class="text-[9px] text-slate-400 font-bold italic max-w-xs">Al seleccionar un artículo, se precargará en el editor actual para su publicación.</p>
                    <button onclick="document.getElementById('zolla-library-selector').remove()" class="bg-slate-900 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all">Cancelar</button>
                </div>
            </div>
        `;
        
        window._onLibrarySelect = onSelect;
        document.body.appendChild(modal);
    },

    select: (id) => {
        const item = window.ZollaStore.state.library.find(i => i.id == id);
        if (item && window._onLibrarySelect) {
            window._onLibrarySelect(item);
        }
        document.getElementById('zolla-library-selector').remove();
    }
};

// Robust Error Handling for Application Level
window.addEventListener('error', (event) => {
    console.error('Global Application Error:', event.error);
    if (window.showNotification) {
        window.showNotification("System Alert", "Se detectó un error interno. Intenta recargar la página.", "warning");
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
});

window.navigateTo = (screen) => {
    try {
        window.currentView = screen;
        const content = document.getElementById('main-content');
        if (!content) throw new Error("Main content container not found");

        const comp = components[screen];

        if (comp) {
            try {
                content.innerHTML = comp.render();
                if (comp.init) comp.init();

                // Update Nav Active State
                document.querySelectorAll('.nav-item').forEach(el => {
                    el.classList.remove('active');
                });
                const navId = `nav-${screen}`;
                const navEl = document.getElementById(navId);
                if (navEl) navEl.classList.add('active');
                
                // Track current view in localStorage for session recovery
                localStorage.setItem('zolla_current_view', screen);
            } catch (renderError) {
                console.error(`Render Error in ${screen}:`, renderError);
                content.innerHTML = `
                    <div class="flex flex-col items-center justify-center p-12 text-slate-400 space-y-4">
                        <i class="fas fa-exclamation-triangle text-6xl text-amber-500"></i>
                        <h2 class="text-2xl font-black text-slate-800 italic">Error de Renderizado</h2>
                        <p class="text-sm font-medium">No se pudo cargar la vista "${screen}": ${renderError.message}</p>
                        <pre class="w-full text-left bg-slate-100 p-4 text-[9px] font-mono text-slate-600 rounded-lg overflow-x-auto whitespace-pre-wrap">${renderError.stack}</pre>
                        <button onclick="window.navigateTo('dashboard')" class="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg mt-4">Regresar al Panel</button>
                    </div>
                `;
            }
        } else {
            console.error(`View ${screen} not found`);
            window.navigateTo('dashboard');
        }
    } catch (criticalError) {
        console.error("Critical Navigation Error:", criticalError);
    }
};

window.changeMonth = (month) => {
    if (window.ZollaStore && window.ZollaStore.setMonth) {
        window.ZollaStore.setMonth(month);
        window.navigateTo(window.currentView);
    }
};

// Global Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Sync Month Select
    const monthSelect = document.getElementById('month-select');
    if (monthSelect) {
        monthSelect.value = window.ZollaStore.state.month;
        monthSelect.addEventListener('change', (e) => {
            window.changeMonth(e.target.value);
        });
    }

    // Sync Week Select
    const weekSelect = document.getElementById('week-select');
    if (weekSelect) {
        weekSelect.value = window.ZollaStore.state.week;
    }

    // Recover last session view if possible
    const lastView = localStorage.getItem('zolla_current_view') || 'dashboard';
    window.navigateTo(lastView);

    // Finally, start cloud synchronization after everything is ready
    if (window.ZollaSync) {
        window.ZollaSync.init();
    }
});
