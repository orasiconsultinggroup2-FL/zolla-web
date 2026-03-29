window.BlogManager = {
    state: {
        posts: [],
        loading: false,
        error: null
    },

    init: async () => {
        await window.BlogManager.fetchPosts();
    },

    fetchPosts: async () => {
        window.BlogManager.state.loading = true;
        window.BlogManager.refresh();
        try {
            const response = await fetch('https://www.zolla.com.pe/api/sync-blog');
            const data = await response.json();
            window.BlogManager.state.posts = data.posts || [];
            window.BlogManager.state.loading = false;
        } catch (err) {
            console.error("Error fetching blog posts:", err);
            window.BlogManager.state.error = "No se pudo conectar con el servidor del Blog.";
            window.BlogManager.state.loading = false;
        }
        window.BlogManager.refresh();
    },

    deletePost: async (slug) => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar permanentemente el artículo "${slug}" del Blog público? Esta acción no se puede deshacer.`)) return;

        window.showNotification("Borrando...", "Eliminando artículo de la web...", "info");
        try {
            const response = await fetch('https://www.zolla.com.pe/api/sync-blog', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug })
            });

            if (response.ok) {
                window.showNotification("Éxito", "El artículo ha sido eliminado del Blog.", "success");
                await window.BlogManager.fetchPosts();
            } else {
                throw new Error("Error en la respuesta del servidor");
            }
        } catch (err) {
            console.error("Error deleting post:", err);
            window.showNotification("Error", "No se pudo eliminar el artículo.", "error");
        }
    },

    render: () => {
        const s = window.BlogManager.state;
        
        if (s.loading && s.posts.length === 0) {
            return `
                <div class="flex flex-col items-center justify-center h-[60vh] text-slate-400">
                    <div class="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
                    <p class="text-xs font-black uppercase tracking-widest">Sincronizando con zolla.com.pe...</p>
                </div>
            `;
        }

        return `
            <div class="p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <!-- Header -->
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div class="flex items-center gap-3 mb-4">
                            <span class="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-500/20">Live Sync</span>
                            <h1 class="text-4xl lg:text-5xl font-black text-white tracking-tighter">Control del <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Blog Público</span></h1>
                        </div>
                        <p class="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed">Gestiona todo el contenido publicado actualmente en <span class="text-white font-bold">zolla.com.pe</span> en tiempo real.</p>
                    </div>
                    <button onclick="window.BlogManager.fetchPosts()" class="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-[11px] font-black uppercase tracking-widest rounded-xl border border-white/10 transition-all flex items-center gap-2">
                        <i class="fas fa-sync-alt ${s.loading ? 'animate-spin' : ''}"></i> Actualizar Lista
                    </button>
                </div>

                ${s.posts.length === 0 ? `
                    <div class="bg-white/5 border border-white/10 rounded-3xl p-20 text-center">
                        <div class="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/5">
                            <i class="fas fa-cloud text-3xl text-slate-600"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-2 tracking-tight">No hay artículos publicados</h3>
                        <p class="text-slate-400 text-sm mb-8">Parece que aún no has desplegado contenido a la web desde la aplicación.</p>
                        <button onclick="navigateTo('contenido')" class="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 transition-all">Ir al Centro de Estrategia</button>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 gap-6">
                        ${s.posts.map(post => `
                            <div class="group bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/[0.07] hover:border-emerald-500/30 flex flex-col md:flex-row items-center gap-8">
                                <!-- Image Preview -->
                                <div class="w-full md:w-32 h-24 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/5">
                                    <img src="${post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=200'}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>

                                <!-- Post Info -->
                                <div class="flex-grow min-w-0">
                                    <div class="flex items-center gap-3 mb-2">
                                        <span class="text-[9px] font-black uppercase tracking-widest text-emerald-400">${post.category || 'General'}</span>
                                        <span class="text-[9px] font-bold text-slate-500">${post.date || 'Reciente'}</span>
                                    </div>
                                    <h3 class="text-lg font-bold text-white mb-2 tracking-tight truncate">${post.title}</h3>
                                    <p class="text-slate-400 text-xs line-clamp-2 leading-relaxed">${post.excerpt || 'Sin resumen disponible...'}</p>
                                </div>

                                <!-- Actions -->
                                <div class="flex items-center gap-3 flex-shrink-0">
                                    <a href="https://www.zolla.com.pe/blog/${post.slug}" target="_blank" class="p-4 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                        <i class="fas fa-external-link-alt text-xs"></i> Ver
                                    </a>
                                    <button onclick="window.BlogManager.deletePost('${post.slug}')" class="p-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                        <i class="fas fa-trash-alt"></i> Borrar
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
                
                <!-- Legend -->
                <div class="mt-12 p-6 bg-slate-900/50 border border-white/5 rounded-2xl flex items-center gap-4">
                    <div class="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <div>
                        <p class="text-[10px] font-black uppercase tracking-widest text-white mb-1">Nota de Control</p>
                        <p class="text-slate-400 text-[10px] uppercase tracking-wide leading-relaxed">Los cambios realizados aquí son inmediatos en el sitio público. Si eliminas un artículo, este desaparecerá del índice y de su URL directa.</p>
                    </div>
                </div>
            </div>
        `;
    },

    refresh: () => {
        const main = document.getElementById('main-content');
        if (main && window.currentView === 'blogmanager') {
            main.innerHTML = window.BlogManager.render();
        }
    }
};
