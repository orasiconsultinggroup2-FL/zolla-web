// Global SaaS Configuration for ZOLLA Antigravity
window.ZollaConfig = {
    // Current Tenant Identification
    tenantId: 'zolla_consulting',
    
    // Identity & Branding
    brand: {
        name: 'ZOLLA Coaching & Development',
        logoText: 'ZOLLA',
        tagline: 'Control Room Pro',
        primaryColor: '#10b981', // Emerald
        secondaryColor: '#0f172a', // Slate 900
        senderEmail: 'juanramon@zolla.com.pe'
    },
    
    // Content Strategy Axes (Customizable per Tenant)
    services: [
        'Vocería Corporativa bajo Presión',
        'Gestión del cambio',
        'Formación de Liderazgo',
        'Asuntos públicos',
        'Manejo de crisis reputacional',
        'Negociaciones multiactor',
        'Liderazgo en Entornos de Alta Exigencia',
        'Negociación Estratégica en Tiempos de Crisis'
    ],
    
    // Pipeline Stages (Customizable per Tenant)
    pipelineStages: [
        { id: 'contactado', label: '📞 Contactado', color: 'slate-500' },
        { id: 'cita', label: '🤝 Cita Programada', color: 'blue-500' },
        { id: 'propuesta', label: '💼 Propuesta Enviada', color: 'rose-500' },
        { id: 'cierre', label: '🎯 Fase de Cierre', color: 'emerald-600' }
    ],
    
    // Strategic Calendar Names
    periods: {
        'marzo': 'Marzo · Orden y activación',
        'abril': 'Abril · Recontacto y Reuniones',
        'mayo': 'Mayo · Conversión y Validación',
        'junio': 'Junio · Tracción Digital'
    },
    
    // Features Toggles
    features: {
        enableBlogSync: true,
        enableGA4: false,
        isDemo: false
    }
};

// Function to get active tenant config (SaaS ready)
window.getTenantConfig = () => {
    // In a real SaaS, this would fetch from an API based on domain or token
    return window.ZollaConfig;
};
