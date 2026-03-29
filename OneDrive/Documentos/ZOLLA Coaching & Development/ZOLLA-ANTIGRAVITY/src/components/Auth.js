window.Auth = {
    state: {
        user: null,
        role: null,
        loading: true
    },

    init: () => {
        // En una implementación real, aquí se conectaría con Firebase Auth onAuthStateChanged
        const storedUser = localStorage.getItem('zolla_auth_user');
        if (storedUser) {
            window.Auth.state.user = JSON.parse(storedUser);
            window.Auth.state.role = window.Auth.state.user.role || 'Partner';
        }
        window.Auth.state.loading = false;
        
        // Redirigir si no hay sesión y no estamos en diagnóstico
        if (!window.Auth.state.user && window.currentView !== 'diagnostic') {
            window.navigateTo('login');
        }
    },

    login: (email, pass) => {
        // Mock authentication for demonstration
        if (email === 'admin@zolla.com.pe' && pass === 'zolla2026') {
            const user = { email, role: 'Admin', name: 'Administrador' };
            localStorage.setItem('zolla_auth_user', JSON.stringify(user));
            window.Auth.state.user = user;
            window.Auth.state.role = 'Admin';
            window.navigateTo('dashboard');
        } else if (email === 'demo@consultora.com') {
            const user = { email, role: 'Partner', name: 'Consultor Demo' };
            localStorage.setItem('zolla_auth_user', JSON.stringify(user));
            window.Auth.state.user = user;
            window.Auth.state.role = 'Partner';
            window.navigateTo('dashboard');
        } else {
            window.showNotification("Error de Acceso", "Credenciales no reconocidas en el sistema.", "warning");
        }
    },

    logout: () => {
        localStorage.removeItem('zolla_auth_user');
        window.Auth.state.user = null;
        window.Auth.state.role = null;
        window.navigateTo('login');
    },

    canAccess: (module) => {
        if (!window.Auth.state.user) return false;
        if (window.Auth.state.role === 'Admin') return true;
        
        const restrictions = {
            viewer: ['dashboard', 'kpis'], // Viewer solo ve data agregada
            partner: ['dashboard', 'pipeline', 'tareas', 'emails', 'contenido', 'cronograma', 'blogia', 'biblioteca', 'blogmanager', 'kpis', 'daily']
        };

        const role = window.Auth.state.role.toLowerCase();
        return restrictions[role]?.includes(module) || false;
    }
};

window.LoginScreen = {
    render: () => {
        const config = window.getTenantConfig();
        return `
        <div class="h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent"></div>
            
            <div class="w-full max-w-sm relative z-10 space-y-12 animate-pop-in">
                <div class="text-center space-y-6">
                    <div class="w-20 h-20 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-2xl shadow-emerald-500/20">
                        <i class="fas fa-key"></i>
                    </div>
                    <div>
                        <h2 class="text-3xl font-black tracking-tighter uppercase italic">${config.brand.logoText} <span class="text-emerald-400">IA</span></h2>
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">${config.brand.tagline}</p>
                    </div>
                </div>

                <div class="space-y-6">
                    <div class="space-y-4">
                        <div class="relative">
                            <i class="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-xs text-xs"></i>
                            <input type="email" id="login-email" placeholder="Usuario Corporativo" class="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 transition-all font-bold text-sm text-white">
                        </div>
                        <div class="relative">
                            <i class="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                            <input type="password" id="login-pass" placeholder="Contraseña Segura" class="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 transition-all font-bold text-sm text-white">
                        </div>
                    </div>
                    <button onclick="window.Auth.login(document.getElementById('login-email').value, document.getElementById('login-pass').value)" class="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-500/20 hover:scale-105 transition-all">Acceder al Control Room</button>
                    
                    <div class="flex justify-between items-center px-2">
                        <a href="mailto:soporte@zolla.com.pe" class="text-[9px] text-slate-500 font-bold uppercase tracking-widest hover:text-emerald-400 transition-all">Recuperar acceso</a>
                        <span class="text-[9px] text-slate-500 font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">v3.5 Build Alpha</span>
                    </div>
                </div>
            </div>
            
            <div class="absolute bottom-10 text-center">
                <p class="text-[9px] text-white/20 font-black tracking-[0.6em] uppercase italic">ZOLLA Antigravity SaaS Platform</p>
            </div>
        </div>
        `;
    },
    init: () => {}
};
