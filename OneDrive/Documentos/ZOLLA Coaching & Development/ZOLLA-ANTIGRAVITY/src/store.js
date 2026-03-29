// Updated Centralized State Management for Zolla Pro
const DEFAULT_CLIENTS = [
    { id: 'c1', name: 'Inmobiliaria Central', contact: 'Ana Garcia', email: 'ana@incentral.com', segment: 'A', status: 'base' },
    { id: 'c2', name: 'Banco del Sur', contact: 'Roberto Meza', email: 'r.meza@bancosur.com', segment: 'A', status: 'base' },
    { id: 'c3', name: 'AgroExport SAC', contact: 'Luis Torres', email: 'ltorres@agroexport.pe', segment: 'B', status: 'base' },
    { id: 'c4', name: 'Mining Solutions', contact: 'Carla Luna', email: 'cluna@miningsol.com', segment: 'C', status: 'base' }
];

const DEFAULT_TASKS = [
    { id: 1, t: 'Exportar cartera histórica', d: 'Sacar todos los clientes de 20 años', f: '2026-03-03', o: 'Fernando', p: 'alta', c: 'Comercial', status: 'Pendiente', w: '1' },
    { id: 2, t: 'Segmentar clientes A/B/C', d: 'Clasificar toda la cartera', f: '2026-03-07', o: 'Fernando', p: 'alta', c: 'Comercial', status: 'Pendiente', w: '1' },
    { id: 3, t: 'Definir Top 20 y Top 50', d: 'Seleccionar clientes prioritarios', f: '2026-03-10', o: 'Fernando', p: 'alta', c: 'Comercial', status: 'Pendiente', w: '2' },
    { id: 4, t: 'Crear mensaje de reingreso 2026', d: 'Guion para contactar clientes', f: '2026-03-15', o: 'Fernando', p: 'alta', c: 'Contenido', status: 'Pendiente', w: '3' },
    { id: 5, t: 'Armar presentación corta', d: '5 slides de presentación', f: '2026-03-18', o: 'Moncho', p: 'media', c: 'Comercial', status: 'Pendiente', w: '3' }
];

window.ZollaStore = {
    state: {
        month: 'marzo',
        week: '1',
        clients: DEFAULT_CLIENTS,
        pipeline: [],
        tasks: DEFAULT_TASKS,
        kpis: {
            'c-1': 0, 'c-2': 0, 'c-3': 0, 'c-4': 0,
            'm-1': 0, 'm-2': 0, 'm-3': 0
        },
        posts: [],
        library: [],
        hiddenPlanTasks: [],
        bbddHeaders: ['Contacto', 'Empresa', 'Cargo', 'Teléfono(s)', 'Email(s)', 'Producto a Ofrecer', 'URL Linkedin']
    },

    init() {
        try {
            const keys = ['month', 'week', 'clients', 'pipeline', 'tasks', 'kpis', 'posts', 'library', 'hiddenPlanTasks', 'bbddHeaders'];
            keys.forEach(key => {
                const stored = localStorage.getItem('zolla_' + key);
                if (stored) {
                    try {
                        if (key === 'month' || key === 'week') {
                            this.state[key] = stored;
                        } else {
                            const parsed = JSON.parse(stored);
                            if (parsed && (Array.isArray(parsed) || typeof parsed === 'object')) {
                                this.state[key] = parsed;
                            }
                        }
                    } catch (e) {
                        console.error(`Error parsing ${key} from storage:`, e);
                    }
                }
            });
        } catch (err) {
            console.error("Critical error during store initialization:", err);
        }
    },

    save(shouldPush = true) {
        try {
            localStorage.setItem('zolla_month', this.state.month);
            localStorage.setItem('zolla_week', this.state.week);
            localStorage.setItem('zolla_clients', JSON.stringify(this.state.clients));
            localStorage.setItem('zolla_pipeline', JSON.stringify(this.state.pipeline));
            localStorage.setItem('zolla_tasks', JSON.stringify(this.state.tasks));
            localStorage.setItem('zolla_kpis', JSON.stringify(this.state.kpis));
            localStorage.setItem('zolla_posts', JSON.stringify(this.state.posts));
            localStorage.setItem('zolla_library', JSON.stringify(this.state.library));
            localStorage.setItem('zolla_hiddenPlanTasks', JSON.stringify(this.state.hiddenPlanTasks));
            localStorage.setItem('zolla_bbddHeaders', JSON.stringify(this.state.bbddHeaders));
        } catch (err) {
            console.error("Persistent Storage Error:", err);
            if (err.name === 'QuotaExceededError') {
                window.showNotification("Error de Memoria", "El almacenamiento está lleno. Borra algunos posts antiguos.", "warning");
            }
        } finally {
            // After local save, push to cloud if possible
            if (shouldPush && window.ZollaSync) {
                window.ZollaSync.push();
            }
        }
    },

    // State Mutators
    setMonth(m) { 
        if (!m) return;
        this.state.month = m; 
        this.save(); 
    },

    setWeek(w) {
        if (!w) return;
        this.state.week = w;
        this.save();
        if (window.currentView) {
            window.navigateTo(window.currentView);
        }
    },

    updateKPI(id, val) {
        if (!id) return;
        this.state.kpis[id] = Math.max(0, (this.state.kpis[id] || 0) + val);
        this.save();
        return this.state.kpis[id];
    },

    // Client & Pipeline Management
    addClient(client) {
        if (!client || !client.name) return;
        const newClient = {
            ...client,
            id: 'c' + Date.now(),
            status: client.status || 'base'
        };
        this.state.clients.push(newClient);
        this.save();
    },

    importClients(newClients) {
        if (!Array.isArray(newClients)) return;
        this.state.clients = [...this.state.clients, ...newClients];
        this.save();
    },

    moveToPipeline(clientId) {
        const client = this.state.clients.find(c => c.id === clientId);
        if (client && !this.state.pipeline.find(p => p.id === clientId)) {
            const pipelineItem = { 
                ...client, 
                status: 'contactado', 
                value: client.value || 0, 
                desc: client.desc || 'Nuevo contacto' 
            };
            this.state.pipeline.push(pipelineItem);
            this.save();
        }
    },

    movePipeline(cardId, newStatus) {
        if (!cardId || !newStatus) return;
        const card = this.state.pipeline.find(c => c.id === cardId);
        if (card) {
            card.status = newStatus;
            this.save();
        }
    },

    registerInteraction(clientId, type, detail) {
        const lead = this.state.pipeline.find(l => l.id === clientId);
        if (lead) {
            if (!lead.interactions) lead.interactions = [];
            
            const interaction = {
                date: new Date().toISOString(),
                type: type, // 'email', 'meeting', 'call'
                detail: detail
            };
            
            lead.interactions.unshift(interaction);
            lead.lastContact = interaction.date;
            
            // Auto-update KPI "Contactos hechos"
            this.updateKPI('c-1', 1); // c-1 is usually "Contactos hechos" in StrategyData
            
            this.save();
            return true;
        }
        return false;
    },

    updateLeadField(cardId, field, value) {
        const lead = this.state.pipeline.find(l => l.id === cardId);
        if (lead) {
            lead[field] = value;
            this.save();
            return true;
        }
        return false;
    },

    // Task Management
    addTask(task) {
        if (!task || !task.t) return;
        const newTask = {
            ...task,
            id: Date.now(),
            w: task.w || (this.state.week === 'todas' ? '1' : this.state.week),
            status: task.status || 'Pendiente'
        };
        this.state.tasks.push(newTask);
        this.save();
    },

    updateTask(id, data) {
        const task = this.state.tasks.find(t => t.id == id);
        if (task) {
            Object.assign(task, data);
            this.save();
            return true;
        }
        return false;
    },

    toggleTask(id) {
        const task = this.state.tasks.find(t => t.id == id);
        if (task) {
            task.status = task.status === 'Completada' ? 'Pendiente' : 'Completada';
            this.save();
        }
    },

    deleteTask(id) {
        this.state.tasks = this.state.tasks.filter(t => t.id != id);
        this.save();
    },

    deleteAllTasks() {
        this.state.tasks = [];
        this.state.hiddenPlanTasks = [];
        this.save();
    },

    togglePlanTaskVisibility(id) {
        if (this.state.hiddenPlanTasks.includes(id)) {
            this.state.hiddenPlanTasks = this.state.hiddenPlanTasks.filter(x => x !== id);
        } else {
            this.state.hiddenPlanTasks.push(id);
        }
        this.save();
    },

    // Content Management
    addPost(post) {
        if (!post || !post.content) return;
        
        // Prevención de duplicados: No permitir el mismo contenido exactamente en los últimos 10 segundos
        const now = Date.now();
        const isDuplicate = this.state.posts.some(p => 
            p.content === post.content && 
            p.platform === post.platform && 
            (now - (parseInt(p.id) || 0) < 10000)
        );
        
        if (isDuplicate) {
            console.warn("Post duplicado detectado, ignorando...");
            return;
        }

        const newPost = {
            ...post,
            id: now,
            published: post.published || false
        };
        this.state.posts.unshift(newPost);
        this.save();
    },

    publishPost(id) {
        const post = this.state.posts.find(p => p.id === id);
        if (post) {
            post.published = true;
            this.save();
        }
    },

    updatePost(id, data) {
        const post = this.state.posts.find(p => p.id == id);
        if (post) {
            Object.assign(post, data);
            this.save();
            return true;
        }
        return false;
    },

    deletePost(id) {
        this.state.posts = this.state.posts.filter(p => p.id !== id);
        this.save();
    },

    // Library Management
    addLibraryItem(item) {
        if (!item || !item.content) return;
        const newItem = {
            ...item,
            id: Date.now(),
            added: new Date().toISOString()
        };
        this.state.library.unshift(newItem);
        this.save();
    },

    updateLibraryItem(id, data) {
        const item = this.state.library.find(i => i.id == id);
        if (item) {
            Object.assign(item, data);
            this.save();
            return true;
        }
        return false;
    },

    deleteLibraryItem(id) {
        this.state.library = this.state.library.filter(i => i.id != id);
        this.save();
    }
};

window.ZollaStore.init();

// Cloud Sync will be initialized from main.js to ensure correct order

