window.cleanTextForPublishing = (text, theme, title = '', subtitle = '') => {
    if (!text) return "";
    let clean = text.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<[^>]*>/g, '');
    clean = clean.replace(/^#+\s+/gm, '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/__(.*?)__/g, '$1').replace(/---/g, '').replace(/&nbsp;/gi, ' '); 
    clean = clean.replace(/Concepto:/gi, '').replace(/Título:/gi, '').replace(/TÍTULO:/gi, '').replace(/Subtítulo:/gi, '').replace(/SUBTÍTULO:/gi, '').replace(/Gancho:/gi, '').replace(/Contenido:/gi, '');
    let lines = clean.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let changed = true;
    while (changed && lines.length > 0) {
        changed = false;
        const firstLine = lines[0].toLowerCase();
        if (title && (firstLine === title.toLowerCase() || (title.length > 15 && firstLine.includes(title.toLowerCase().substring(0, 20))))) { lines.shift(); changed = true; continue; }
        if (subtitle && (firstLine === subtitle.toLowerCase() || (subtitle.length > 15 && firstLine.includes(subtitle.toLowerCase().substring(0, 20))))) { lines.shift(); changed = true; continue; }
    }
    return lines.join('\n\n').trim();
};

window.ZollaImageHelper = {
    keywords: {
        'Vocería Corporativa bajo Presión': ['press conference', 'microphone reporter', 'executive speaking', 'crisis management'],
        'Gestión del cambio': ['business transformation', 'team building', 'strategy meeting', 'innovation office'],
        'Formación de Liderazgo': ['mentor', 'leadership coaching', 'climbing mountain executive', 'business growth'],
        'Asuntos públicos': ['government building', 'diplomacy', 'institutional relations', 'monument boardroom'],
        'Manejo de crisis reputacional': ['shield', 'security', 'protection', 'reputation digital'],
        'Negociaciones multiactor': ['handshake', 'deal closing', 'international business', 'stakeholders meeting']
    },
    showSelector: (theme, onSelect) => {
        const images = [
           { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800', k: 'Sugerencia Premium' },
           { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800', k: 'Sugerencia Premium' },
           { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800', k: 'Sugerencia Premium' },
           { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800', k: 'Sugerencia Premium' }
        ];
        const modal = document.createElement('div');
        modal.id = 'zolla-image-selector';
        modal.className = 'fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[9999] flex items-center justify-center p-8 animate-fade-in';
        modal.innerHTML = `
            <div class="bg-white w-full max-w-4xl rounded-[3rem] shadow-3xl overflow-hidden border border-white/20 animate-pop-in flex flex-col max-h-[90vh]">
                <div class="p-10 border-b border-slate-100 flex items-center justify-between">
                   <h3 class="text-2xl font-black text-slate-900 tracking-tight">Sugerencias Meta-IA</h3>
                   <button onclick="document.getElementById('zolla-image-selector').remove()" class="text-slate-400 hover:text-slate-800"><i class="fas fa-times"></i></button>
                </div>
                <div class="p-10 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-6">
                    ${images.map(img => `<img src="${img.url}" onclick="window.ZollaImageHelper.select('${img.url}')" class="h-48 rounded-3xl object-cover cursor-pointer hover:scale-105 transition-all">`).join('')}
                </div>
            </div>
        `;
        window._onImageSelect = onSelect;
        document.body.appendChild(modal);
    },
    select: (url) => { if (window._onImageSelect) window._onImageSelect(url); document.getElementById('zolla-image-selector').remove(); }
};

window.ZollaLibraryHelper = {
    showSelector: (onSelect) => {
        const library = window.ZollaStore.state.library;
        const modal = document.createElement('div');
        modal.id = 'zolla-library-selector';
        modal.className = 'fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[9999] flex items-center justify-center p-8 animate-fade-in';
        modal.innerHTML = `
            <div class="bg-white w-full max-w-4xl rounded-[3rem] shadow-3xl overflow-hidden border border-white/20 animate-pop-in flex flex-col max-h-[90vh]">
                <div class="p-10 border-b border-slate-100 flex items-center justify-between">
                   <h3 class="text-2xl font-black text-slate-900 tracking-tight">Importar desde Biblioteca</h3>
                   <button onclick="document.getElementById('zolla-library-selector').remove()" class="text-slate-400 hover:text-slate-800"><i class="fas fa-times"></i></button>
                </div>
                <div class="p-10 overflow-y-auto space-y-4">
                    ${library.map(item => `<div onclick="window.ZollaLibraryHelper.select('${item.id}')" class="p-6 rounded-2xl border border-slate-100 hover:border-indigo-500 cursor-pointer text-xs font-bold">${item.title || item.content.substring(0,50)}</div>`).join('')}
                </div>
            </div>
        `;
        window._onLibrarySelect = onSelect;
        document.body.appendChild(modal);
    },
    select: (id) => { const item = window.ZollaStore.state.library.find(i => i.id == id); if (item && window._onLibrarySelect) window._onLibrarySelect(item); document.getElementById('zolla-library-selector').remove(); }
};
