window.currentMonth = localStorage.getItem('zolla_month') || 'marzo';

const components = {
    dashboard: window.Dashboard,
    objetivos: window.Dashboard, // Temporal, apunta a Dashboard
    pipeline: window.Pipeline,
    contenido: window.Contenido,
    cronograma: window.Cronograma,
    tareas: window.Tareas,
    emails: window.Emails,
    kpis: window.KPIs,
    blogia: window.BlogIA,
    biblioteca: window.Biblioteca,
    blogmanager: window.BlogManager,
    daily: window.DailyView,
    diagnostic: window.Diagnostic,
    login: window.LoginScreen
};

// Use Tenant Config for global titles
const config = window.getTenantConfig();
document.title = `${config.brand.logoText} IA • Meta-Strategist`;

window.currentView = 'dashboard';

window.navigateTo = (screen) => {
    try {
        // Redirigir a login si no hay sesión y no es diagnóstico
        if (screen !== 'login' && screen !== 'diagnostic' && (!window.Auth || !window.Auth.state.user)) {
            screen = 'login';
        }

        // Protección de rutas por roles
        if (window.Auth && window.Auth.state.user && screen !== 'login' && screen !== 'diagnostic') {
            if (!window.Auth.canAccess(screen)) {
                window.showNotification("Acceso Restringido", `Tu rol (${window.Auth.state.role}) no tiene permisos para el módulo ${screen}.`, "warning");
                return;
            }
        }

        window.currentView = screen;
        const mainContent = document.getElementById('main-content');
        if (!mainContent) throw new Error("Main content container not found");

        const comp = components[screen];

        if (comp) {
            try {
                // Manejo de UI según el tipo de vista
                const sidebar = document.querySelector('.sidebar-container');
                const mainWrapper = document.querySelector('.main-content-wrapper');

                if (screen === 'login' || screen === 'diagnostic') {
                    if (sidebar) sidebar.style.display = 'none';
                    if (mainWrapper) {
                        mainWrapper.style.marginLeft = '0';
                        mainWrapper.style.width = '100%';
                    }
                } else {
                    if (sidebar) sidebar.style.display = 'flex';
                    if (mainWrapper) {
                        mainWrapper.style.marginLeft = '22rem'; // Match original sidebar width
                        mainWrapper.style.width = 'calc(100% - 22rem)';
                    }
                }

                mainContent.innerHTML = comp.render();
                if (comp.init) comp.init();

                // Update Nav Active State
                document.querySelectorAll('.nav-item').forEach(el => {
                    el.classList.remove('active');
                });
                const navId = `nav-${screen}`;
                const navEl = document.getElementById(navId);
                if (navEl) navEl.classList.add('active');
                
                // Track current view in localStorage (except public ones)
                if (screen !== 'login' && screen !== 'diagnostic') {
                    localStorage.setItem('zolla_current_view', screen);
                }
            } catch (renderError) {
                console.error(`Render Error in ${screen}:`, renderError);
                mainContent.innerHTML = `
                    <div class="flex flex-col items-center justify-center p-12 text-slate-400 space-y-4 h-full">
                        <i class="fas fa-exclamation-triangle text-6xl text-amber-500"></i>
                        <h2 class="text-2xl font-black text-slate-800 italic uppercase">Error de Renderizado</h2>
                        <p class="text-sm font-medium">No se pudo cargar la vista "${screen}": ${renderError.message}</p>
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
    // Initialize Auth first
    if (window.Auth) {
        window.Auth.init();
    }

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

    // Handle hash routing for public pages
    if (window.location.hash === '#/diagnostico') {
        window.navigateTo('diagnostic');
    } else if (window.location.hash === '#/login') {
        window.navigateTo('login');
    } else {
        const lastView = localStorage.getItem('zolla_current_view') || 'dashboard';
        window.navigateTo(lastView);
    }

    // Show Onboarding for new users after login
    if (window.Auth && window.Auth.state.user && !localStorage.getItem('zolla_onboarding_done')) {
        setTimeout(() => {
            if (window.Onboarding) window.Onboarding.show();
        }, 1200);
    }
});
