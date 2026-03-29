/**
 * ZollaSync - Real-time synchronization service for Zolla Partners
 * This service ensures that Juan Ramón, Moncho, and Fernando are always aligned.
 */
window.ZollaSync = {
    vaultUrl: 'https://zolla-strategist-default-rtdb.firebaseio.com/vaults/',
    teamId: 'ZOLLA_MASTER_STRATEGY', // Unique ID for the team
    isSyncing: false,
    lastSync: null,

    /**
     * Initialize connection and pull latest data
     */
    async init() {
        const teamCode = localStorage.getItem('zolla_team_code');
        if (!teamCode) {
            this.showAccessOverlay();
            return false;
        }

        console.log("☁️ ZollaSync: Initializing Cloud Connection...");
        await this.pull();
        this.startAutoSync();
        return true;
    },

    /**
     * Pull data from the cloud and merge with local
     */
    async pull() {
        if (this.isSyncing) return;
        this.isSyncing = true;
        this.updateStatusUI('syncing');

        try {
            const response = await fetch(`${this.vaultUrl}${this.teamId}.json`);
            const remoteData = await response.json();

            if (remoteData) {
                console.log("📥 ZollaSync: Pulling remote updates...");
                
                // Update local store state
                Object.keys(remoteData).forEach(key => {
                    if (remoteData[key] !== undefined && remoteData[key] !== null) {
                        let parsedData = remoteData[key];
                        
                        // Firebase converts sparse arrays to objects. We must normalize them back to arrays
                        // for state properties we know strictly require arrays.
                        if (['clients', 'pipeline', 'tasks', 'posts', 'library', 'bbddHeaders'].includes(key)) {
                            if (typeof parsedData === 'object' && !Array.isArray(parsedData)) {
                                parsedData = Object.values(parsedData);
                            }
                            if (Array.isArray(parsedData)) {
                                parsedData = parsedData.filter(Boolean); // Clean any lingering nulls
                            }
                        }

                        // Only update if the local state has this key (prevents ghost data)
                        if (Object.prototype.hasOwnProperty.call(window.ZollaStore.state, key)) {
                            window.ZollaStore.state[key] = parsedData;
                        }
                    }
                });

                // Persist to local storage to keep offline capability
                window.ZollaStore.save(false); // Do not trigger a push loop
                
                // SMART REFRESH: Avoid flickering during editing
                const isEditing = document.activeElement && 
                                 (document.activeElement.tagName === 'INPUT' || 
                                  document.activeElement.tagName === 'TEXTAREA' || 
                                  document.activeElement.contentEditable === 'true');

                if (!isEditing) {
                    // Only refresh if we are on a static view or if the user is idle
                    if (['dashboard', 'kpis'].includes(window.currentView)) {
                        window.navigateTo(window.currentView);
                    }
                    // For editing views, we don't refresh to avoid losing cursor position
                    // The state is already updated in memory, so the user will see it on next natural re-render
                }
                
                this.lastSync = new Date();
                this.updateStatusUI('online');
            }
        } catch (err) {
            console.error("❌ ZollaSync Error (Pull):", err);
            this.updateStatusUI('error');
        } finally {
            this.isSyncing = false;
        }
    },

    /**
     * Push current local state to the cloud
     */
    async push() {
        if (this.isSyncing) return;
        this.isSyncing = true;
        this.updateStatusUI('syncing');

        try {
            const stateToSync = { ...window.ZollaStore.state };
            
            await fetch(`${this.vaultUrl}${this.teamId}.json`, {
                method: 'PUT',
                body: JSON.stringify(stateToSync)
            });

            console.log("📤 ZollaSync: Pushed local changes to cloud.");
            this.lastSync = new Date();
            this.updateStatusUI('online');
        } catch (err) {
            console.error("❌ ZollaSync Error (Push):", err);
            this.updateStatusUI('error');
        } finally {
            this.isSyncing = false;
        }
    },

    /**
     * Periodically check for remote changes (every 30 seconds)
     */
    startAutoSync() {
        setInterval(() => {
            this.pull();
        }, 30000);
    },

    /**
     * Update the visual indicator in the Sidebar
     */
    updateStatusUI(status) {
        const indicator = document.getElementById('sync-indicator');
        const text = document.getElementById('sync-text');
        
        if (!indicator || !text) return;

        const config = {
            online: { color: 'bg-emerald-500', text: 'Sincronizado' },
            syncing: { color: 'bg-amber-500 animate-pulse', text: 'Sincronizando...' },
            error: { color: 'bg-red-500', text: 'Error de Conexión' },
            offline: { color: 'bg-slate-500', text: 'Modo Local' }
        };

        const { color, text: statusText } = config[status] || config.offline;
        
        indicator.className = `w-2 h-2 rounded-full ${color} transition-all duration-500`;
        text.innerText = statusText;
    },

    /**
     * Show a premium overlay for socio-only access
     */
    showAccessOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'zolla-access-overlay';
        overlay.className = 'fixed inset-0 bg-slate-900 z-[9999] flex items-center justify-center p-6 backdrop-blur-xl';
        overlay.innerHTML = `
            <div class="bg-white max-w-md w-full rounded-[2.5rem] p-12 shadow-2xl text-center animate-pop-in">
                <div class="w-20 h-20 bg-emerald-500 rounded-3xl mx-auto mb-8 flex items-center justify-center text-white text-3xl shadow-xl shadow-emerald-500/30">
                    <i class="fas fa-key"></i>
                </div>
                <h2 class="text-3xl font-black text-slate-800 mb-2">Acceso de Socios</h2>
                <p class="text-slate-500 text-sm mb-10 font-medium">Introduce el código de equipo para sincronizar tu Sala de Control.</p>
                
                <div class="space-y-4 mb-8">
                    <input type="password" id="vault-code" placeholder="CÓDIGO DE ACCESO" class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-center font-black tracking-[0.4em] text-slate-800 focus:border-emerald-500 outline-none transition-all placeholder:tracking-normal placeholder:font-bold placeholder:text-slate-300">
                </div>
                
                <button onclick="window.ZollaSync.verifyCode()" class="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 hover:-translate-y-1 transition-all active:scale-95">
                    Entrar a la Bóveda
                </button>
                
                <p class="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">ZOLLA Strategist Enterprise</p>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    verifyCode() {
        const code = document.getElementById('vault-code').value.trim();
        // The master code for the partners. I'll use 2024ZOLLA as default.
        if (code.toUpperCase() === 'ZOLLA2024' || code.toUpperCase() === 'ESTRATEGIA2026') {
            localStorage.setItem('zolla_team_code', 'CONNECTED');
            window.showNotification("Acceso Autorizado", "Bienvenido de nuevo, socio.", "success");
            document.getElementById('zolla-access-overlay').remove();
            this.init();
        } else {
            window.showNotification("Código Incorrecto", "No tienes permiso para acceder a esta bóveda.", "warning");
            document.getElementById('vault-code').value = '';
            document.getElementById('vault-code').focus();
        }
    }
};
